/**
 * Component rendering peer: FileUploadSelector
 * Merged from Echo3 FileTransfer and old Tucana FileTransfer libraries.
 *
 * @author Rakesh 2008-10-30
 * @version $Id$
 */
echopoint.tucana.FileUploadSelectorSync = Core.extend( echopoint.internal.AbstractContainerSync,
{
  $load: function()
  {
    Echo.Render.registerPeer(echopoint.constants.FILE_UPLOAD_SELECTOR, this);
  },

  $static:
  {
    _STAGE_LOADED: 1,
    _STAGE_QUEUED: 2,
    _STAGE_UPLOADING: 3,

    /**
     * Service URIs.
     */
    _PROGRESS_SERVICE: "?sid=echopoint.tucana.UploadProgressService",
    _RECEIVER_SERVICE: "?sid=echopoint.tucana.UploadReceiverService",

    /** The default polling interval for the progress bar. */
    _DEFAULT_PROGRESS_INTERVAL: 250,

    /** The default width for the file selection dialogue. */
    _DEFAULT_WIDTH: "275px"
  },

  /** The container element in which the iframe is hidden. */
  _hidden: null,

  /** The parent container in which the upload select interface is rendered. */
  _div: null,

  /** The table used to render the UI. */
  _table: null,

  /** The upload id that represents the serial number for upload requests. */
  _uploadIndex: 0,

  /** The array of iframes created to manage file upload requests. */
  _frames: new Array(),

  /** The form that is used to submit the selected file. */
  _form: null,

  renderAdd: function( update, parentElement )
  {
    this._uploadIndex = this.component.get(
        echopoint.tucana.FileUploadSelector.UPLOAD_INDEX );
    this._createHidden();
    this._createFrame();
    parentElement.appendChild( this._createParent( update ) );
  },

  renderDispose: function( update )
  {
    for ( var uploadId in this._frames )
    {
      this._frames[uploadId]._dispose();
    }

    this._getBody().removeChild( this._hidden );
    this._hidden = null;
    this._div = null;
    this._table = null;
    this._frames = new Array();
    this._form = null;
  },

  renderUpdate: function( update )
  {
    var canceledUploadsUpdate = update.getUpdatedProperty(
        echopoint.tucana.FileUploadSelector.UPLOAD_CANCELLED );

    if ( canceledUploadsUpdate )
    {
      var canceledUploads = canceledUploadsUpdate.newValue.split( "," );

      for ( var i = 0; i < canceledUploads.length; i++ )
      {
        var frame = this._frames[canceledUploads[i]];
        if ( frame ) frame._processCancel();
      }

      return false;
    }

    var element = this._div;
    var containerElement = element.parentNode;
    this.renderDispose( update );
    containerElement.removeChild( element );
    this.renderAdd( update, containerElement );
    return false;
  },

  /** Create the hidden container element that holds the iframe for submission. */
  _createHidden: function()
  {
    this._hidden = document.createElement( "div" );
    this._hidden.style.position = "absolute";
    this._hidden.style.top = "0";
    this._hidden.style.marginLeft = "-10000px";
    this._getBody().appendChild( this._hidden );
  },

  /** Create a new iframe to handle file upload and cancel. */
  _createFrame: function()
  {
    var frame = new echopoint.tucana.FileUploadSelectorSync.Frame(
        this, ++this._uploadIndex );
    frame._renderAdd( this._hidden );
    this._frames[this._uploadIndex] = frame;
  },

  /** Create the parent container that holds the upload select interface. */
  _createParent: function( update )
  {
    this._div = document.createElement("div");
    this._div.id = this.component.renderId;
    this.renderStyle( this._div );

    var form = this._createForm();
    this._createTable( form );
    this._div.appendChild( form );
    return this._div;
  },

  /** Create the form used to select file and submit for uploading. */
  _createForm: function()
  {
    if ( Core.Web.Env.BROWSER_INTERNET_EXPLORER )
    {
      this._form = document.createElement(  "<form enctype='multipart/form-data'/>" );
    }
    else
    {
      this._form = document.createElement( "form" );
      this._form.enctype = "multipart/form-data";
    }

    this._form.id = this.component.renderId + "|Form";
    this._form.method = "POST";
    this._form.style.margin = "0px";
    this._form.style.padding = "0px";
    this._form.style.position = "relative";
    this._form.action = this._createUploadUrl();

    var frame = this._frames[this._uploadIndex];
    Core.Web.Event.add( this._form, "submit",
        Core.method( frame, frame._processSubmit ) );

    return this._form;
  },

  /** Create the table that holds the button used to submit/cancel the upload. */
  _createTable: function( parentElement )
  {
    this._table = new echopoint.tucana.FileUploadSelectorSync.Table( this );
    this._table._renderAdd( parentElement );

    return this._table;
  },

  _createUploadUrl: function()
  {
    return echopoint.tucana.FileUploadSelectorSync._RECEIVER_SERVICE + "&i=" +
           this.component.renderId + "&x=" + this._uploadIndex;
  },

  /**
   * Starts one of the queued uploads if there are any.
   *
   * @return <tt>true</tt> if an upload was started.
   * @type Boolean
   */
  _startNextUpload: function()
  {
    for ( var uploadId in this._frames )
    {
      var frame = this._frames[uploadId];
      if ( frame._loadStage == echopoint.tucana.FileUploadSelectorSync._STAGE_QUEUED )
      {
        frame._startUpload();
        return true;
      }
    }
    return false;
  },

  /**
   * Removes the given upload frame.
   *
   * @param frame {echopoint.tucana.FileUploadSelectorSync}
   */
  _removeFrame: function( frame )
  {
    delete this._frames[frame._uploadIndex];
    frame._dispose();
  },

  /** Return the body of the main browser frame. */
  _getBody: function()
  {
    return document.getElementsByTagName( "body" ).item( 0 );
  }
});

/**
 * Represents an upload frame that is used to manage the file upload process.
 */
echopoint.tucana.FileUploadSelectorSync.Frame = Core.extend(
{
  /** The rendering peer that instantiates this instance. */
  peer: null,

  /** The component associated with the rendering peer. */
  component: null,

  /** The upload index for which this frame is created. */
  _uploadIndex: 0,

  /** A value that indicates the upload stage. */
  _loadStage: null,

  /** The frame that this object encapsulates. */
  _frameElement: null,

  /**
   * @param uploadSelectPeer {Echo.Render.ComponentSync}
   * @param uploadId {Number} the upload index
   */
  $construct: function( uploadSelectPeer, uploadId )
  {
    this.peer = uploadSelectPeer
    this.component = uploadSelectPeer.component;
    this._uploadIndex = uploadId;
    this._submitListenerBound = false;
  },

  _renderAdd: function( parentElement )
  {
    this._frameElement = document.createElement( "iframe" );
    // id needed for Safari, otherwise multiple iframes do not load
    this._frameElement.id = this.component.renderId + "|Frame|" + this._uploadIndex;
    this._frameElement.name = this._frameElement.id;
    this._frameElement.src = this.peer.client.getResourceUrl(
        "Echo", "resource/Blank.html" );
    this._frameElement.scrolling = "no";
    this._frameElement.style.width = "0px";
    this._frameElement.style.height = "0px";

    var processLoad = Core.method( this, this._processLoad );
    if ( Core.Web.Env.BROWSER_INTERNET_EXPLORER )
    {
      Core.Web.Event.add( this._frameElement, "load", processLoad, false );
    }
    else
    {
      this._frameElement.onload = processLoad;
    }

    parentElement.appendChild( this._frameElement );
  },

  /**
   * Starts this upload and starts the progress poller.
   */
  _startUpload: function()
  {
    this._loadStage = echopoint.tucana.FileUploadSelectorSync._STAGE_UPLOADING;
    //this.peer._frames[this._uploadIndex]._frameElement.submit();
    this.peer._form.submit();
    this.peer._table._submit._renderButton( true, this.peer._table );

    if ( !Core.Web.Env.BROWSER_SAFARI )
    {
      // Safari refuses to upload when file element is disabled
      this.peer._table._input.disabled = true;
    }

    this._startProgressPoller();
  },

  /**
   * Instructs this frame that the upload has ended.
   */
  _uploadEnded: function()
  {
    this._stopProgressPoller();

    this.peer._removeFrame();
    this.peer._createFrame();

    this.peer._table._submit._renderButton( true, this.peer._table );
  },

  _pollProgress: function()
  {
    if ( !this._enableProgressPoll )
    {
      return;
    }

    var conn = new Core.Web.HttpConnection(
        this._createProgressUrl(), "GET", null, null );
    conn.addResponseListener(
        Core.method( this, this._processProgressResponse ) );
    conn.connect();
  },

  _processProgressResponse: function( e )
  {
    if ( this._enableProgressPoll )
    {
      this._startProgressPoller();
    }
  },

  _startProgressPoller: function()
  {
    this._enableProgressPoll = true;
    var interval = this.component.render( "progressInterval",
        echopoint.tucana.FileUploadSelectorSync._DEFAULT_PROGRESS_INTERVAL );
    Core.Web.Scheduler.run(
        Core.method( this, this._pollProgress ), interval, false );
  },

  _stopProgressPoller: function()
  {
    this._enableProgressPoll = false;
  },

  _processCancel: function()
  {
    this._uploadEnded();
  },

  _processSubmit: function( e )
  {
    if ( e )
    {
      Core.Web.DOM.preventEventDefault( e );
    }

    if ( ! this.peer._table._input ) return;

    this._loadStage = echopoint.tucana.FileUploadSelectorSync._STAGE_QUEUED;
    // remove listener before document gets disposed
    Core.Web.Event.remove( this.peer._form,
        "submit", Core.method( this, this._processSubmit ), false );
    this._submitListenerBound = false;

    if ( this.component.render( "queueEnabled" ) )
    {
      this.component.peer._createFrame();
    }
    else if ( this._submitElement )
    {
      this._submitElement.disabled = true;
      var text = this.component.render( "sendButtonWaitText" );
      if ( text )
      {
        this._submitElement.value = text;
      }
    }

    this.peer._startNextUpload();
  },

  _processLoad: function()
  {
    if ( this._loadStage )
    {
      this._uploadEnded();
      return;
    }

    this._loadStage = echopoint.tucana.FileUploadSelectorSync._STAGE_LOADED;
  },

  _createProgressUrl: function()
  {
    return echopoint.tucana.FileUploadSelectorSync._PROGRESS_SERVICE +
           "&i=" + this.component.renderId + "&x=" + this._uploadIndex;
  },

  _dispose: function()
  {
    this._stopProgressPoller();

    if ( this._submitListenerBound )
    {
      Core.Web.Event.remove( this.peer._form,
          "submit", Core.method( this, this._processSubmit ), false);
      this._submitListenerBound = false;
    }

    if ( Core.Web.Env.BROWSER_INTERNET_EXPLORER )
    {
      Core.Web.Event.remove( this._frameElement, "load",
          Core.method( this, this._processLoad ), false );
    }
    else
    {
      this._frameElement.onload = null;
    }

    if ( this._loadStage == echopoint.tucana.FileUploadSelectorSync._STAGE_UPLOADING )
    {
      // gracefully stop upload
      var frameWindow = this._frameElement.contentWindow;
      if ( frameWindow.stop )
      {
        frameWindow.stop();
      }
      else if ( frameWindow.document && frameWindow.document.execCommand )
      {
        frameWindow.document.execCommand( "Stop" );
      }
      else
      {
        frameWindow.location.href =
            this.peer.client.getResourceUrl( "Echo", "resource/Blank.html" );
      }
    }

    if ( Core.Web.Env.BROWSER_MOZILLA )
    {
      // bypass waiting forever bug
      var frame = this._frameElement;
      setTimeout( function() { frame.parentNode.removeChild( frame ); }, 0 );
    }
    else
    {
      this._frameElement.parentNode.removeChild( this._frameElement );
    }

    this.component = null;
    this._uploadIndex = null;
    this._loadStage = null;
    this._frameElement = null;
  }
});

/**
 * A table that represents the user interface that is displayed to the user.
 */
echopoint.tucana.FileUploadSelectorSync.Table = Core.extend(
{
  /** The table element encapsulated by this class. */
  _table: null,

  /** The body element for the table. */
  _tbody: null,

  /** The input used to dislay the file selection dialogue. */
  _input: null,

  /**
   * The submit button used to initiate the upload.  This will be replaced
   * with a cancel button upon submission.
   */
  _submit: null,

  /** The table column used to display the submit button on the left. */
  _tdSubmitLeft: null,

  /** The table column used to display the submit button on the right. */
  _tdSubmitRight: null,

  /**
   * @param uploadSelectPeer {Echo.Render.ComponentSync}
   */
  $construct: function( uploadSelectPeer )
  {
    this.peer = uploadSelectPeer
    this.component = uploadSelectPeer.component;
  },

  _renderAdd: function( parentElement )
  {
    parentElement.appendChild( this._createTable() );
    this._tbody = document.createElement( "tbody" );
    this._tbody.appendChild( this._createRow() );
    this._table.appendChild( this._tbody );
  },

  _createTable: function()
  {
    this._table = document.createElement( "table" );
    this._table.id = this.component.renderId + "|Table";
    this._table.style.borderCollapse = "collapse";
    this._table.appendChild( document.createElement( "thead" ) );

    return this._table;
  },

  _createRow: function()
  {
    var tr = document.createElement( "tr" );

    this._tdSubmitLeft = document.createElement( "td" );
    this._tdSubmitLeft.style.display = "none";
    this._tdSubmitLeft.style.padding = "0px 2px 0px 0px";
    tr.appendChild( this._tdSubmitLeft );

    var tdInput = document.createElement( "td" );
    tdInput.style.padding = "0px";
    tdInput.appendChild( this._createInput() );
    tr.appendChild( tdInput );

    this._tdSubmitRight = document.createElement( "td" );
    this._tdSubmitRight.style.display = "none";
    this._tdSubmitRight.style.padding = "0px 0px 0px 2px";
    tr.appendChild( this._tdSubmitRight );

    this._createSubmit();

    return tr;
  },

  _createInput: function()
  {
    var divInput = document.createElement( "div" );
    divInput.id = this.component.renderId + "|Input|Div|" + this.peer._uploadIndex;

    var browseBackgroundImage =
        this.component.render( "browseButtonBackgroundImage" );
    var browseRolloverBackgroundImage =
        this.component.render( "browseButtonRolloverBackgroundImage" );
    var browseText = this.component.render( "browseButtonText" );
    var browseWidth = this.component.render( "browseButtonWidth" );
    var browsePixelWidth;
    if ( browseWidth )
    {
      browsePixelWidth = Echo.Sync.Extent.toPixels( browseWidth, true );
    }
    var browseHeight = this.component.render( "browseButtonHeight" );

    var fileSelectorWidth = this.component.render( "fileSelectorWidth" );
    if ( !fileSelectorWidth )
    {
      fileSelectorWidth = this.component.render(
          "width", echopoint.tucana.FileUploadSelectorSync._DEFAULT_WIDTH );
    }
    var fileSelectorPixelWidth = Echo.Sync.Extent.toPixels(fileSelectorWidth, true);

    this._input = document.createElement( "input" );
    this._input.id = this.component.renderId + "|Input|" + this.peer._uploadIndex;
    this._input.type = "file";
    this._input.name = "$$file$$";

    if ( browseBackgroundImage || browseRolloverBackgroundImage ||
         browseText || browseWidth || browseHeight )
    {
      // use styling hack (http://www.quirksmode.org/dom/inputfile.html)
      this._input.onchange = function() { overlayInput.value = this.value; };
      this._input.onkeydown = function() { overlayInput.value = this.value; };
      this._input.onkeyup = function() { overlayInput.value = this.value; };

      if ( Core.Web.Env.BROWSER_MOZILLA )
      {
        var body = this.peer._getBody();

        body.appendChild( this._input );
        var newSize = 1;
        this._input.size = newSize;
        while ( newSize < 1000 && this._input.offsetWidth < fileSelectorPixelWidth )
        {
          newSize++;
          this._input.size = newSize;
        }

        body.removeChild( this._input );
      }
      else
      {
        this._input.style.width = fileSelectorPixelWidth + "px";
      }

      if ( Core.Web.Env.PROPRIETARY_IE_OPACITY_FILTER_REQUIRED )
      {
        this._input.style.filter = "alpha(opacity: 0)";
      }
      else
      {
        this._input.style.opacity = "0";
      }

      divInput.style.position = "relative";

      var hiddenFileDiv = document.createElement( "div" );
      hiddenFileDiv.style.position = "relative";
      hiddenFileDiv.style.zIndex = "2";
      hiddenFileDiv.appendChild( this._input );
      divInput.appendChild( hiddenFileDiv );

      var overlayFileDiv = document.createElement( "div" );
      overlayFileDiv.style.position = "absolute";
      overlayFileDiv.style.top = "0px";
      overlayFileDiv.style.left = "0px";
      overlayFileDiv.style.zIndex = "1";

      var overlayInput = document.createElement( "input" );
      overlayInput.type = "text";
      overlayInput.style[Core.Web.Env.CSS_FLOAT] = "left";
      Echo.Sync.Color.render(
          this.component.render( "foreground" ), overlayInput, "color" );
      Echo.Sync.Font.render( this.component.render( "font" ), overlayInput );
      overlayFileDiv.appendChild( overlayInput );

      var overlayBrowse;
      if ( browseBackgroundImage || browseRolloverBackgroundImage )
      {
        overlayBrowse = document.createElement( "div" );
        overlayBrowse.style.textAlign = "center";
        if ( browseBackgroundImage )
        {
          Echo.Sync.FillImage.render( browseBackgroundImage, overlayBrowse );
        }
        if ( browseRolloverBackgroundImage )
        {
          this._input.onmouseover = function()
          {
            Echo.Sync.FillImage.renderClear(
                browseRolloverBackgroundImage, overlayBrowse );
          };
          this._input.onmouseout = function()
          {
            Echo.Sync.FillImage.renderClear(
                browseBackgroundImage, overlayBrowse );
          };
        }
      }
      else
      {
        overlayBrowse = document.createElement( "button" );
      }

      overlayBrowse.style[Core.Web.Env.CSS_FLOAT] = "right";
      overlayBrowse.appendChild(
          document.createTextNode( browseText ? browseText : ">>" ) );
      var overlayInputWidth;
      if ( browseWidth )
      {
        overlayBrowse.style.width = browsePixelWidth + "px";
        overlayInputWidth = fileSelectorPixelWidth - browsePixelWidth;
      }
      else
      {
        overlayInputWidth = fileSelectorPixelWidth - 75;
      }

      // compensate for input/button spacing
      overlayInputWidth = overlayInputWidth - 2;
      if ( overlayInputWidth > 0 )
      {
        overlayInput.style.width = overlayInputWidth + "px";
      }
      else
      {
        overlayInput.style.width = "0px";
        overlayInput.style.display = "none";
        if ( Core.Web.Env.BROWSER_MOZILLA )
        {
          this._input.style.marginLeft = "-32px";
        }
      }

      if ( browseHeight )
      {
        overlayBrowse.style.height =
        Echo.Sync.Extent.toPixels( browseHeight, false ) + "px";
      }

      Echo.Sync.Color.render(
          this.component.render( "foreground" ), overlayBrowse, "color" );
      Echo.Sync.Font.render( this.component.render( "font" ), overlayBrowse );
      overlayFileDiv.appendChild( overlayBrowse );
      divInput.appendChild( overlayFileDiv );
    }
    else
    {
      Echo.Sync.Color.render(
          this.component.render( "foreground" ), this._input, "color" );
      Echo.Sync.Font.render( this.component.render( "font" ), this._input );
      divInput.appendChild( this._input );
    }

    return divInput;
  },

  _createSubmit: function()
  {
    var display = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_DISPLAY,
        echopoint.tucana.FileUploadSelector.DEFAULT_BUTTON_DISPLAY );

    if ( display != 3 )
    {
      this._submit = new echopoint.tucana.FileUploadSelectorSync.Button( this.peer );
      this._submit._renderAdd( this )
    }
    else
    {
      var instance = this.peer;
      this._input.onchange = function( e )
      {
        instance._frames[instance._uploadIndex]._processSubmit( e );
      };
    }

    return this._submit;
  }
});

/** A button class used to render the submit button for the upload. */
echopoint.tucana.FileUploadSelectorSync.Button = Core.extend(
{
  /** The input element that is used to trigger the form submission. */
  _submit: null,

  /** An indicator for using text or image based button. */
  _mode: null,

  /** The text to display for the upload button. */
  _uploadText: null,

  /** The text to display when the upload has been changed to cancel. */
  _cancelText: null,

  /** The text to display a wait message when no progress bar is shown. */
  _waitText: null,

  /** The image to use as the display for the upload button. */
  _uploadImage: null,

  /** The image to use to display the cancel button. */
  _cancelImage: null,

  /** The image to display the wait message when no progress bar is shown. */
  _waitImage: null,

  /** The rule (position or hide) to use for the button. */
  _display: null,

  /** A flag indicating whether the cancel button is to be displayed. */
  _cancel: true,

  /**
   * @param uploadSelectPeer {Echo.Render.ComponentSync}
   */
  $construct: function( uploadSelectPeer )
  {
    this.peer = uploadSelectPeer
    this.component = uploadSelectPeer.component;
  },

  _renderAdd: function( parentElement )
  {
    this._submit = document.createElement( "input" );
    this._submit.type = "submit";

    this._renderStyle();
    this._renderButton( false, parentElement );
  },

  _renderStyle: function()
  {
    this._setButtonMode();
    this._setUploadText();
    this._setCancelText();
    this._setWaitText();
    this._setUploadImage();
    this._setCancelImage();
    this._setWaitImage();
    this._setDisplay();
    this._setCancel();

    Echo.Sync.Font.render( this.component.render( "font" ), this._submit );
    Echo.Sync.Color.render(
        this.component.render( "foreground" ), this._submit, "color" );
  },

  _setButtonMode: function()
  {
    this._mode = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_MODE,
        echopoint.tucana.FileUploadSelector.DEFAULT_BUTTON_MODE );
  },

  _setUploadText: function()
  {
    this._uploadText = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_TEXT_UPLOAD, "Uplaod" );
  },

  _setCancelText: function()
  {
    this._cancelText = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_TEXT_CANCEL );
  },

  _setWaitText: function()
  {
    this._waitText = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_TEXT_WAIT );
  },

  _setUploadImage: function()
  {
    this._uploadImage = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_IMAGE_UPLOAD );
  },

  _setCancelImage: function()
  {
    this._cancelImage = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_IMAGE_CANCEL );
  },

  _setWaitImage: function()
  {
    this._waitImage = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_IMAGE_WAIT );
  },

  _setDisplay: function()
  {
    this._display = this.component.render(
        echopoint.tucana.FileUploadSelector.BUTTON_DISPLAY,
        echopoint.tucana.FileUploadSelector.DEFAULT_BUTTON_DISPLAY );
  },

  _setCancel: function()
  {
    var cancel = this.component.render(
        echopoint.tucana.FileUploadSelector.CANCEL_ENABLED );
    this._cancel = ( "true" == cancel );
  },

  /**
   * @param uploading A flag indicating whether an upload is in process.
   * @param parentElement {echopoint.tucana.FileUploadSelectorSync.Table}
   */
  _renderButton: function( uploading, parentElement )
  {
    if ( this._mode == 1 )
    {
      var src = null;

      if ( uploading )
      {
        src = ( this._cancel ) ? this._cancelImage : this._waitImage;
      }
      else
      {
        src = this._uploadImage;
      }

      this._submit.style.height = null;
      this._submit.type = "image";
      this._submit.src = src;
    }
    else
    {
      var text;
      var disabled = false;

      if ( uploading )
      {
        if ( this._cancel )
        {
          text = this._cancelText;
        }
        else
        {
          text = this._waitText;
          disabled = true;
        }
      }
      else
      {
        text = this._uploadText;
      }

      this._submit.type = "submit";
      this._submit.style.height = this.peer._table._input.offsetHeight + "px";

      if ( text == null )
      {
        this._submit.removeAttribute( "value" );
      }
      else
      {
        this._submit.setAttribute( "value", text );
      }
    }

    this._submit.disabled = disabled;

    var displayType = this._display;
    if ( displayType == 2 )
    {
      displayType = ( Core.Web.Env.BROWSER_SAFARI ) ? 1 : 0;
    }

    switch ( displayType )
    {
      case 0:
        this._display = "right";
        parentElement._tdSubmitRight.appendChild( this._submit );
        parentElement._tdSubmitRight.style.display = "block";
        parentElement._tdSubmitLeft.style.display = "none";
        break;
      case 1:
        this._display = "left";
        parentElement._tdSubmitLeft.appendChild( this._submit );
        parentElement._tdSubmitLeft.style.display = "block";
        parentElement._tdSubmitRight.style.display = "none";
        break;
      default:
        parentElement._tdSubmitLeft.style.display = "none";
        parentElement._tdSubmitRight.style.display = "none";
        break;
    }
  }
});
