/**
 * Component rendering peer: FileUploadSelector
 * Merged from Echo3 FileTransfer and old Tucana FileTransfer libraries.
 *
 * @author Rakesh 2008-10-30
 * @version $Id$
 */
echopoint.tucana.FileUploadSelectorSync = Core.extend(echopoint.internal.AbstractContainerSync,
{
  $load: function()
  {
    Echo.Render.registerPeer(echopoint.constants.FILE_UPLOAD_SELECTOR, this);
  },

  $static:
  {
    /**
     * Service URIs.
     */
    _PROGRESS_SERVICE: "?sid=echopoint.tucana.UploadProgressService",
    _RECEIVER_SERVICE: "?sid=echopoint.tucana.UploadReceiverService",

    /** The default polling interval for the progress bar. */
    _DEFAULT_PROGRESS_INTERVAL: 250,

    /** The default width for the file selection dialogue. */
    _DEFAULT_WIDTH: "275px",

    widthHackSlope: null,
    widthHackIntercept: null,
    instances: new Core.Arrays.LargeMap(),

    /** Check to see if we need to apply FireFox width hack */
    needsWidthHack: function()
    {
      var result = false;

      if ( Core.Web.Env.BROWSER_FIREFOX || Core.Web.Env.BROWSER_MOZILLA )
      {
        result = true;
      }

      return result;
    },

    /** Calculate the width hack for FireFox. */
    calculateWidthHack: function()
    {
      if ( ! echopoint.tucana.FileUploadSelectorSync.widthHackSlope )
      {
        var testDiv = document.createElement("div");
        testDiv.style.position = "absolute";
        testDiv.style.left = "-10000px";
        testDiv.style.opacity = "0";
        var testForm = document.createElement("form");
        testDiv.appendChild(testForm);
        var testInput = document.createElement("input");
        testForm.appendChild(testInput);

        document.body.appendChild(testDiv);

        var smallSize = 5;
        var largeSize = 300;

        testInput.setAttribute("size", smallSize.toString());
        var smallWidth = testInput.offsetWidth;
        testInput.setAttribute("size", largeSize.toString());
        var largeWidth = testInput.offsetWidth;

        var slope = (largeWidth - smallWidth) / (largeSize - smallSize);

        var intercept = smallWidth - (slope / smallSize);

        echopoint.tucana.FileUploadSelectorSync.widthHackSlope = slope;
        echopoint.tucana.FileUploadSelectorSync.widthHackIntercept = intercept;

        document.body.removeChild(testDiv);
      }
    },

    /** Return the size for a specified width */
    getSizeForWidth: function( width )
    {
      var size = (width - echopoint.tucana.FileUploadSelectorSync.widthHackIntercept) /
                 echopoint.tucana.FileUploadSelectorSync.widthHackSlope;
      size = parseInt(size);
      size = (size < 1) ? 1 : size;
      return size;
    },

    getAutoDisplayType: function()
    {
      if ( Core.Web.Env.BROWSER_SAFARI )
      {
        return "left";
      }
      else
      {
        return "right";
      }
    },

    setOpacity: function( element, value )
    {
      if ( Core.Web.Env.BROWSER_INTERNET_EXPLORER )
      {
        element.style.zoom = 1;
        element.style.filter = "alpha(opacity=" + value * 100 + ")";
      }
      else
      {
        element.style.opacity = value;
      }
    },

    getInstance: function( renderId )
    {
      return echopoint.tucana.FileUploadSelectorSync.instances[renderId];
    },

    continueSubmit: function( selectorId )
    {
      var instance = echopoint.tucana.FileUploadSelectorSync.getInstance(selectorId);
      instance.continueSubmit();
    }
  },

  uploadCount: 0,
  syncReportInterval: 200,
  asyncPollInterval: 500,

  elements: null,
  button: null,
  width: null,
  widthHack: null,
  progress: null,

  renderAdd: function( update, parentElement )
  {
    echopoint.tucana.FileUploadSelectorSync.instances.map[ this.component.renderId ] = this;
    this.elements = new Object();
    this.button = new Object();
    this.width = new Object();
    this.widthHack = new Object();
    this.progress = new Object();
    this._createElements( parentElement );
    this._renderStyle();
  },

  renderDispose: function( update )
  {
    this.disableWidthHack();
    this.elements.container.removeChild(this.elements.selector);
    if ( this.elements.iframe && this.elements.iframe.parentNode )
    {
      //        EchoDebugManager.consoleWrite("Removing Konq IFrame");
      this.elements.iframe.parentNode.removeChild(this.elements.iframe);
      this.elements.iframe = null;
    }
    if ( this.uploadSession )
    {
      this.uploadSession.cancel();
    }
    this.elements = null;
    this.button = null;
    this.width = null;
    this.widthHack = null;
    this.progress = null;
    echopoint.tucana.FileUploadSelectorSync.instances.remove( this.component.renderId );
  },

  renderUpdate: function( update )
  {
    var element = this.elements.selector;
    var containerElement = element.parentNode;
    this.renderDispose( update );
    containerElement.removeChild( element );
    this.renderAdd( update, containerElement );
    return false;
  },

  _createElements: function( parentElement )
  {
    this.elements.selector = document.createElement("div");
    this.elements.selector.setAttribute("id", this.component.renderId);
    this.renderStyle(this.elements.selector);
    this.elements.container = parentElement;

    /* IE makes us do it this way */
    if ( Core.Web.Env.BROWSER_INTERNET_EXPLORER )
    {
      this.elements.form = document.createElement("<form enctype='multipart/form-data'/>");
    }
    else
    {
      this.elements.form = document.createElement("form");
      this.elements.form.setAttribute("enctype", "multipart/form-data");
    }

    this.elements.form.style.position = "relative";
    this.elements.form.style.margin = "0px";
    this.elements.form.method = "post";
    this.elements.form.action = echopoint.tucana.FileUploadSelectorSync._RECEIVER_SERVICE +
        "&i=" + this.component.renderId + "&x=" + this.uploadCount +
        "&pt=" + this.getProgressPollerType() +
        "&ri=" + this.syncReportInterval;

    this.elements.selector.appendChild(this.elements.form);

    this.elements.table = document.createElement("table");
    this.elements.table.style.borderCollapse = "collapse";
    this.elements.table.appendChild(document.createElement("thead"));
    this.elements.tbody = document.createElement("tbody");
    this.elements.table.appendChild(this.elements.tbody);
    this.elements.tr = document.createElement("tr");
    this.elements.tbody.appendChild(this.elements.tr);
    this.elements.form.appendChild(this.elements.table);

    this.elements.tdSubmitLeft = document.createElement("td");
    this.elements.tdSubmitLeft.style.display = "none";
    this.elements.tdSubmitLeft.style.padding = "0px 2px 0px 0px";
    this.elements.tr.appendChild(this.elements.tdSubmitLeft);

    this.elements.tdInput = document.createElement("td");
    this.elements.tdInput.style.padding = "0px";
    this.elements.tr.appendChild(this.elements.tdInput);
    this.elements.divInput = document.createElement("div");
    this.elements.tdInput.appendChild(this.elements.divInput);
    this.elements.input = document.createElement("input");
    this.elements.input.setAttribute("type", "file");
    this.elements.input.setAttribute("name", "$$file$$");
    this.elements.divInput.appendChild(this.elements.input);

    this.elements.tdSubmitRight = document.createElement("td");
    this.elements.tdSubmitRight.style.display = "none";
    this.elements.tdSubmitRight.style.padding = "0px 0px 0px 2px";
    this.elements.tr.appendChild(this.elements.tdSubmitRight);

    this.elements.submit = document.createElement("input");

    /* Konqueror doesn't work when creating the iframes on the spot.. */
    if ( Core.Web.Env.BROWSER_KONQUEROR )
    {
      var frameId = this.component.renderId + "_iframe";
      this.elements.iframe = document.createElement("iframe");
      this.elements.iframe.src =
      this.client.getResourceUrl("Echo", "resource/Blank.html");
      this.elements.iframe.style.position = "absolute";
      this.elements.iframe.style.left = "-10000px";
      this.elements.iframe.setAttribute("id", frameId);
      this.elements.selector.appendChild(this.elements.iframe);
    }

    this.elements.container.appendChild(this.elements.selector);

    var submitForm = Core.method(this, this._submitForm);
    Core.Web.Event.add(this.elements.form, "submit", submitForm, false);
  },

  _submitForm: function( e )
  {
    this.initialiseSubmit();
    if ( e && e.preventDefault )
    {
      e.preventDefault();
    }

    return false;
  },

  updateWidthHackSize: function()
  {
    var targetWidth = this.elements.divInput.offsetWidth;
    if ( !this.widthHack.oldTargetWidth || this.widthHack.oldTargetWidth != targetWidth )
    {
      var newSize = echopoint.tucana.FileUploadSelectorSync.getSizeForWidth(targetWidth);
      this.elements.input.setAttribute("size", newSize.toString());
      while ( newSize > 1 && this.elements.divInput.scrollWidth > this.elements.divInput.offsetWidth )
      {
        newSize--;
        this.elements.input.setAttribute("size", newSize.toString());
      }
      //        EchoDebugManager.consoleWrite("Size set to: " + newSize);
      this.widthHack.oldTargetWidth = targetWidth;
    }
  },

  enableWidthHack: function()
  {
    if ( echopoint.tucana.FileUploadSelectorSync.needsWidthHack() )
    {
      var instance = this;
      this.elements.divInput.style.overflow = "hidden";
      if ( this.widthHack.interval != null )
      {
        clearInterval(this.widthHack.interval);
      }
      this.widthHack.interval = setInterval(function()
      { instance.updateWidthHackSize(); }, 10);
    }
  },

  disableWidthHack: function()
  {
    this.elements.divInput.style.overflow = "";
    if ( this.widthHack.interval )
    {
      clearInterval(this.widthHack.interval);
      this.widthHack.interval = null;
    }
    this.widthHack.oldTargetWidth = null;
  },

  clearInput: function()
  {
    if ( Core.Web.Env.BROWSER_FIREFOX || Core.Web.Env.BROWSER_MOZILLA ||
         Core.Web.Env.BROWSER_OPERA )
    {
      this.elements.form.reset();
      this.elements.input.disabled = false;
    }
    else
    {
      var newInput = this.elements.input.cloneNode(true);
      this.elements.divInput.replaceChild(newInput, this.elements.input);
      this.elements.input = newInput;
    }
  },

  getProgressPollerType: function()
  {
    if ( ! echopoint.tucana.FileUploadSelectorSync.ListenerManager.getListeners(this.component.renderId) )
    {
      return "none";
    }
    else if ( Core.Web.Env.BROWSER_OPERA )
    {
      return "sync";
    }
    else
    {
      return "async";
    }
  },

  createProgressPoller: function( progressChangeHandler )
  {
    var instance = this;
    this.uploadSession.progress = 0;
    if ( this.getProgressPollerType() == "sync" )
    {
      return function()
      {
        var progressElement = parent.frames[instance.uploadSession.frameId].document.body.lastChild;
        if ( progressElement && progressElement.id != "finished" )
        {
          if ( instance.uploadSession )
          {
            var bytesElement = progressElement.childNodes[0];
            var totalBytesElement = progressElement.childNodes[1];
            var rateElement = progressElement.childNodes[2];

            var bytes = null;
            var totalBytes = null;
            var rate = null;

            if ( bytesElement )
            {
              bytes = parseInt(bytesElement.firstChild.nodeValue)
            }
            if ( totalBytesElement )
            {
              totalBytes = parseInt(totalBytesElement.firstChild.nodeValue)
            }
            if ( rateElement )
            {
              rate = parseFloat(rateElement.firstChild.nodeValue)
            }

            progressChangeHandler(bytes, totalBytes, rate);
          }
        }
      };
    }
    else if ( this.getProgressPollerType() == "async" )
    {
      var connectionLock = new Object();
      connectionLock.connecting = false;

      var handler = function( connection )
      {
        connectionLock.connecting = false;
        var resp = connection.getResponseXml();
        var ts = resp.firstChild;
        if ( instance.uploadSession )
        {
          var bytesElement = ts.childNodes[0];
          var totalBytesElement = ts.childNodes[1];
          var rateElement = ts.childNodes[2];
          var bytes = null;
          var totalBytes = null;
          var rate = null;

          if ( bytesElement )
          {
            bytes = parseInt(bytesElement.firstChild.nodeValue)
          }
          if ( totalBytesElement )
          {
            totalBytes = parseInt(totalBytesElement.firstChild.nodeValue)
          }
          if ( rateElement )
          {
            rate = parseFloat(rateElement.firstChild.nodeValue)
          }

          progressChangeHandler(bytes, totalBytes, rate);
        }
      };

      return function()
      {
        if ( !connectionLock.connecting )
        {
          connectionLock.connecting = true;
          var connection = new Core.Web.HttpConnection(
              echopoint.tucana.FileUploadSelectorSync._PROGRESS_SERVICE +
              "&i=" + instance.component.renderId, "GET", null, null);
          connection.addResponseListener(handler)
          connection.connect();
        }
      };
    }
    else
    {
      return null;
    }
  },

  /** First step: Initialize the submission frame. */
  initialiseSubmit: function()
  {
    if ( this.uploadSession )
    {
      if ( this.uploadSession.supportsCancel() )
      {
        Core.Debug.consoleWrite("CANCELING");
        // upload in progress, cancel.
        this.uploadSession.cancel();
      }
      return false;
    }

    Core.Debug.consoleWrite("HANDLESUBMIT");

    this.uploadSession = new Object();
    var instance = this;
    var us = this.uploadSession;
    // Upload session funcs
    this.uploadSession.cleanUp = function()
    {
      var successStatus = null;
      try
      {
        successStatus = parent.frames[us.frameId].document.body.lastChild.firstChild.nodeValue;
      }
      catch ( e )
      {
      }
      if ( successStatus == null )
      {
        successStatus = "fail";
      }

      var frameContainer = us.frameContainer;
      if ( us.poller != null )
      {
        clearInterval(us.poller);
        us.poller = null;
      }

      if ( us.progressHandler != null && us.progressHandler.finish != null )
      {
        us.progressHandler.finish();
        us.progressHandler = null;
      }

      instance.clearInput();

      /* If we remove the IFrame in this thread, Firefox displays a halfway-busy
       * cursor indefinitely. Removing the frame in a 0ms timeout fixes this issue.
       */
      if ( Core.Web.Env.BROWSER_FIREFOX || Core.Web.Env.BROWSER_MOZILLA )
      {
        setTimeout(function()
        {
          frameContainer.parentNode.removeChild(frameContainer);
        }, 0);
      }
      else
      {
        if ( frameContainer )
        {
          frameContainer.parentNode.removeChild(frameContainer);
        }
      }

      if ( Core.Web.Env.BROWSER_KONQUEROR )
      {
        // reset konq url
        parent.frames[us.frameId].window.location.href =
        instance.client.getResourceUrl("Echo", "resource/Blank.html");
      }

      Core.Debug.consoleWrite("Upload complete: " + successStatus);

      instance.updateButton(false);
    };

    this.uploadSession.cancel = function()
    {
      instance.uploadSession = null;
      if ( us.frame != null )
      {
        var frameWindow = parent.frames[us.frameId].window;
        if ( frameWindow.stop )
        {
          Core.Debug.consoleWrite("WINDOW DOT STOP");
          frameWindow.stop();
        }
        else if ( frameWindow.document && frameWindow.document.execCommand )
        {
          Core.Debug.consoleWrite("EXECCOMMAND STOP");
          frameWindow.document.execCommand("Stop");
        }
        else if ( Core.Web.Env.BROWSER_KONQUEROR )
        {
          frameWindow.location.href =
          instance.client.getResourceUrl("Echo", "resource/Blank.html");
        }
      }
      us.cleanUp();
    };

    this.uploadSession.supportsCancel = function()
    {
      if ( !instance.button.cancelEnabled )
      {
        return false;
      }
      if ( us.frame != null )
      {
        var frameWindow = parent.frames[us.frameId].window;
        Core.Debug.consoleWrite(frameWindow);
        // window.stop()
        if ( frameWindow.stop )
        {
          return true;
        }
        // document.execCommand("Stop")
        else if ( frameWindow.document && frameWindow.document.execCommand )
        {
          return true;
        }
        // window.location.href = ...
        else if ( Core.Web.Env.BROWSER_KONQUEROR )
        {
          return true;
        }
      }
      return false;
    }

    var divElm = document.createElement('div');
    divElm.style.position = "absolute";
    divElm.style.top = "0";
    divElm.style.marginLeft = "-10000px";
    var frameId = this.component.renderId + "|Frame|" + (this.uploadCount++).toString();

    var frame = document.createElement("iframe");
    frame.src = this.client.getResourceUrl( "Echo", "resource/Blank.html" );
    frame.name = frameId;
    frame.id = frameId;
    frame.frameBorder = "0";

    var continueSubmit = Core.method( this, this.continueSubmit );
    if ( Core.Web.Env.BROWSER_INTERNET_EXPLORER )
    {
      Core.Web.Event.add( frame, "load", continueSubmit, false );
    }
    else if ( Core.Web.Env.BROWSER_KONQUEROR )
    {
      /* When using konqueror, we keep an IFrame around with the selector */
      frameId = this.elements.iframe.getAttribute("id");
      this.uploadSession.frame = this.elements.iframe;
    }
    else
    {
      frame.onload = continueSubmit;
    }

    divElm.appendChild(frame);
    this.uploadSession.frame = frame;
    this._getBody().appendChild(divElm)
    this.uploadSession.frameContainer = divElm;
    this.uploadSession.frameId = frameId;

    /* Safari doesn't fire the first onload event, and Konqueror has its iframe
     * created way before (so we miss the onload event).  Therefore, both of
     * these are fired here.
     */
    if ( Core.Web.Env.BROWSER_KONQUEROR )
    {
      this.continueSubmit();
    }
  },

  /** Second step: submit to the frame */
  continueSubmit: function()
  {
    if ( this.uploadSession.alreadyContinued )
    {
      return;
    }
    this.uploadSession.alreadyContinued = true;

    Core.Debug.consoleWrite("CONTINUESUBMIT");
    var instance = this;
    var frame = this.uploadSession.frame;
    var handleSubmit = Core.method(this, this.handleSubmitComplete);
    Core.Web.Event.add(frame, "load", handleSubmit, false);

    var pollTime = -1;
    if ( this.getProgressPollerType() == "sync" )
    {
      pollTime = this.syncReportInterval;
    }
    else if ( this.getProgressPollerType() == "async" )
    {
      pollTime = this.asyncPollInterval;
    }

    var us = this.uploadSession;

    if ( pollTime != -1 )
    {
      var selectorId = this.component.renderId;
      us.totalBytes = 1;
      us.rate = 0;

      var progressHandler = function( bytes, totalBytes, rate )
      {
        us.totalBytes = totalBytes;
        us.rate = rate;
        var listeners =
            echopoint.tucana.FileUploadSelectorSync.ListenerManager.getListeners(selectorId);
        for ( var i in listeners )
        {
          var func = listeners[i];
          if ( func != null )
          {
            func(bytes, totalBytes, rate);
          }
        }
      };

      progressHandler.finish = function()
      {
        var b = (us.totalBytes != 0) ? us.totalBytes : 1;
        progressHandler(b, b, us.rate);
      };

      progressHandler(0, 0, 0);
      var poller = this.createProgressPoller(progressHandler);
      this.uploadSession.poller = setInterval(poller, pollTime);
      this.uploadSession.progressHandler = progressHandler;
    }

    this.elements.form.target = this.uploadSession.frameId;
    this.elements.form.setAttribute("target", this.uploadSession.frameId);
    this.elements.form.submit();
    this.updateButton(true);
    //    this.elements.input.disabled = true;
  },

  /** Third step: clean up after submission finishes */
  handleSubmitComplete: function()
  {
    if ( !this.uploadSession )
    {
      // canceled
      return;
    }
    /*
     * IE reaches this method as soon as the form is submited, and then again
     * when the submission completes.  We only want to do stuff the second time.
     */
    if ( Core.Web.Env.BROWSER_INTERNET_EXPLORER )
    {
      if ( !this.uploadSession.firstCompleteReached )
      {
        this.uploadSession.firstCompleteReached = true;
        return;
      }
    }

    Core.Debug.consoleWrite("HANDLESUBMITCOMPLETE");

    this.uploadSession.cleanUp();
    this.uploadSession = null;

    /* Sync with server */
    /*
     EchoClientMessage.setActionValue(this.component.renderId, "fileUploaded");
     EchoServerTransaction.connect();
     */
  },

  updateButton: function( uploading )
  {
    var parent = this.elements.submit.parentNode;
    if ( parent )
    {
      parent.removeChild(this.elements.submit);
      this.elements.submit = document.createElement("input");
    }
    if ( this.button.mode == "image" )
    {
      var imageSource;
      if ( uploading )
      {
        if ( this.uploadSession.supportsCancel() )
        {
          imageSource = this.button.cancelImageSource;
        }
        else
        {
          imageSource = this.button.waitImageSource;
        }
      }
      else
      {
        imageSource = this.button.uploadImageSource;
      }
      this.elements.submit.style.height = null;
      this.elements.submit.setAttribute("type", "image");
      this.elements.submit.setAttribute("src", imageSource);
    }
    else if ( this.button.mode == "text" )
    {
      var text;
      var disabled = false;
      if ( uploading )
      {
        if ( this.uploadSession.supportsCancel() )
        {
          text = this.button.cancelText;
        }
        else
        {
          text = this.button.waitText;
          disabled = true;
        }
      }
      else
      {
        text = this.button.uploadText;
      }
      this.elements.submit.setAttribute("type", "submit");
      var height = this.elements.input.offsetHeight;
      if ( height < 10 ) height = 22;
      this.elements.submit.style.height = height + "px";
      if ( text == null )
      {
        this.elements.submit.removeAttribute("value");
      }
      else
      {
        this.elements.submit.setAttribute("value", text)
      }
      this.elements.submit.disabled = disabled;
    }
    if ( parent )
    {
      parent.appendChild(this.elements.submit);
    }
  },

  _renderStyle: function()
  {
    var updateButton = true;
    var updateWidth = true;
    var updateButtonDisplay = true;

    this._renderButtonMode();
    this._renderButtonTextUpload();
    this._renderButtonTextCancel();
    this._renderButtonTextWait();

    this._renderButtonImageUpload();
    this._renderButtonImageCancel();
    this._renderButtonImageWait();

    this._renderButtonDisplay();
    this._renderWidthMode();
    this._renderWidthExtent();
    this._renderWidthSize();
    this._renderCancelEnabled();

    if ( updateWidth )
    {
      if ( this.width.mode == "extent" )
      {
        this.elements.input.removeAttribute("size");
        this.elements.table.style.width = this.width.extent;
        this.elements.tdInput.style.width = "100%";
        this.elements.input.style.width = "100%";
        // If we switch to extent mode without clearing the input
        // in IE, IE makes the minimum size of the input the
        // size of the length of the text.
        if ( Core.Web.Env.BROWSER_INTERNET_EXPLORER )
        {
          this.clearInput();
        }
        this.enableWidthHack();
      }
      else if ( this.width.mode == "size" )
      {
        this.disableWidthHack();
        this.elements.input.setAttribute("size", this.width.size);
        this.elements.table.style.width = "";
        this.elements.tdInput.style.width = "";
        this.elements.input.style.width = "";

        if ( Core.Web.Env.BROWSER_OPERA )
        {
          /* Opera has a bug where a table's width is 100%
           * unless we do this.
           */
          var parent = this.elements.table.parentNode;
          parent.removeChild(this.elements.table);
          parent.appendChild(this.elements.table);
        }
      }
    }

    if ( updateButton )
    {
      this.updateButton(this.uploadSession != null);
    }

    if ( updateButtonDisplay )
    {
      var displayType;
      if ( this.button.display == "auto" )
      {
        displayType = echopoint.tucana.FileUploadSelectorSync.getAutoDisplayType();
      }
      else
      {
        displayType = this.button.display;
      }

      if ( displayType == "left" )
      {
        this.elements.tdSubmitLeft.appendChild(this.elements.submit);
        this.elements.tdSubmitLeft.style.display = "";
        this.elements.tdSubmitRight.style.display = "none";
        /* Opera has some bug that puts space between the submit
         * button and the input box unless we do this.
         */
        if ( Core.Web.Env.BROWSER_OPERA )
        {
          this.elements.tdSubmitLeft.width = "1px";
        }
      }
      else if ( displayType == "right" )
      {
        this.elements.tdSubmitRight.appendChild(this.elements.submit);
        this.elements.tdSubmitRight.style.display = "";
        this.elements.tdSubmitLeft.style.display = "none";
      }
      else if ( displayType == "none" )
      {
      }
    }
  },

  _renderButtonMode: function()
  {
    var property = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_MODE );
    if ( property )
    {
      var mode = parseInt(property);
      if ( mode )
        if ( mode == 1 )
        {
          this.button.mode = "image";
        }
        else
        {
          this.button.mode = "text";
        }
    }
    else
    {
      this.button.mode = "text";
    }
  },

  _renderButtonTextUpload: function()
  {
    var property = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_TEXT_UPLOAD );
    if ( property )
    {
      this.button.uploadText = property;
    }
  },

  _renderButtonTextCancel: function()
  {
    var property = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_TEXT_CANCEL );
    if ( property )
    {
      this.button.cancelText = property;
    }
  },

  _renderButtonTextWait: function()
  {
    var property = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_TEXT_WAIT );
    if ( property )
    {
      this.button.waitText = property;
    }
  },

  _renderButtonImageUpload: function()
  {
    var property = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_IMAGE_UPLOAD );
    if ( property )
    {
      this.button.uploadImageSource = property;
    }
  },

  _renderButtonImageWait: function()
  {
    var property = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_IMAGE_WAIT );
    if ( property )
    {
      this.button.waitImageSource = property;
    }
  },

  _renderButtonImageCancel: function()
  {
    var property = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_IMAGE_CANCEL );
    if ( property )
    {
      this.button.cancelImageSource = property;
    }
  },

  _renderButtonDisplay: function()
  {
    var property = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_DISPLAY );
    this.button.display = "auto";

    if ( property )
    {
      var mode = parseInt(property);

      switch ( mode )
          {
        case 0:
          this.button.display = "right";
          break;
        case 1:
          this.button.display = "left";
          break;
        case 3:
          this.button.display = "none";
          break;
        default:
          this.button.display = "auto";
      }
    }
  },

  _renderWidthMode: function()
  {
    var property = this.component.render(
        echopoint.tucana.FileUploadSelector.WIDTH_MODE );
    this.width.mode = "size";

    if ( property )
    {
      var widthMode = parseInt(property);

      if ( widthMode == 1 )
      {
        this.width.mode = "extent";
      }
      else
      {
        this.width.mode = "size";
      }
    }
    this.width.extent = property;
  },

  _renderWidthExtent: function()
  {
    var property = this.component.render(
        echopoint.tucana.FileUploadSelector.WIDTH_EXTENT );

    if ( property )
    {
      this.width.extent = property;
    }
    this.width.size = property;
  },

  _renderWidthSize: function()
  {
    var property = this.component.render(
        echopoint.tucana.FileUploadSelector.WIDTH_SIZE );

    if ( property )
    {
      this.width.size = property;
    }
    this.button.cancelEnabled = ( "true" == property );
  },

  _renderCancelEnabled: function()
  {
    var property = this.component.render(
        echopoint.tucana.FileUploadSelector.CANCEL_ENABLED );

    if ( property )
    {
      this.button.cancelEnabled = ( "true" == property );
    }
  },

  /** Return the body of the main browser frame. */
  _getBody: function()
  {
    return document.getElementsByTagName("body").item(0);
  }
});

echopoint.tucana.FileUploadSelectorSync.ListenerManager = Core.extend(
{
  $static:
  {
    listenerMap: new Object(),

    addListener: function( uploaderId, listenerId, listenerFunc )
    {
      var uploaderListeners = echopoint.tucana.FileUploadSelectorSync.ListenerManager.listenerMap[uploaderId];
      if ( uploaderListeners == null )
      {
        uploaderListeners = new Object();
        echopoint.tucana.FileUploadSelectorSync.ListenerManager.listenerMap[uploaderId] = uploaderListeners;
      }

      uploaderListeners[listenerId] = listenerFunc;
    },

    removeListener: function( uploaderId, listenerId )
    {
      var uploaderListeners = echopoint.tucana.FileUploadSelectorSync.ListenerManager.listenerMap[uploaderId];
      if ( uploaderListeners != null )
      {
        delete uploaderListeners[listenerId];
        if ( uploaderListeners.length == 0 )
        {
          delete echopoint.tucana.FileUploadSelectorSync.ListenerManager.listenerMap[uploaderId];
        }
      }
    },

    getListeners: function( uploaderId )
    {
      return echopoint.tucana.FileUploadSelectorSync.ListenerManager.listenerMap[uploaderId];
    }
  }
});
