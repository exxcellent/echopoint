/**
 * Component rendering peer: AutoLookupTextField
 *
 * @author Rakesh 2009-03-29
 * @version: $Id$
 */
echopoint.AutoLookupTextFieldSync = Core.extend( Echo.Sync.TextField,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.AUTO_LOOKUP_TEXT_FIELD, this );
  },

  $construct: function()
  {
    Echo.Sync.TextField.call( this );
  }
});

/**
 * This object is used to provide auto lookup support to a text field
 */
echopoint.internal.LookupSupport = Core.extend(
{
  /** The text field to which the lookup component is attached. */
  textField: null,

  /** The look up model to use. */
  model: null,

  $construct: function( tf, lookupModel )
  {
    this.textField = tf;
    if ( lookupModel.length ) lookupModel = lookupModel[0];

    var maxAge = tf.render( "maximumCacheAge", -1 );
    var maxSize = tf.render( "maximumCacheSize", -1 );
    var matchOptions = tf.render( "matchOptions", 0 );

    this.lookupCache = new echopoint.model.LookupCache(
        maxAge, maxSize, matchOptions );

    this.addLookupEntriesFromModel( lookupModel );

    this.popupProperties 			= EP.DOM.getAttr(autoLookUpModelE,'popupProperties','');
    this.entryProperties 			= EP.DOM.getAttr(autoLookUpModelE,'entryProperties','');
    this.entryRolloverProperties 	= EP.DOM.getAttr(autoLookUpModelE,'entryRolloverProperties','');
    this.searchBarProperties 		= EP.DOM.getAttr(autoLookUpModelE,'searchBarProperties','');
    this.searchBarRolloverProperties = EP.DOM.getAttr(autoLookUpModelE,'searchBarRolloverProperties','');

    this.searchBarShown				= EP.DOM.getBooleanAttr(autoLookUpModelE,'searchBarShown',true);
    this.searchBarIcon 				= EP.DOM.getAttr(autoLookUpModelE,'searchBarIcon',null);
    this.searchBarSearchingIcon 	= EP.DOM.getAttr(autoLookUpModelE,'searchBarSearchingIcon',null);
    this.searchBarText 				= EP.DOM.getAttr(autoLookUpModelE,'searchBarText',null);
    this.searchBarSearchingText 	= EP.DOM.getAttr(autoLookUpModelE,'searchBarSearchingText',null);
    this.noMatchingOptionText	 	= EP.DOM.getAttr(autoLookUpModelE,'noMatchingOptionText',null);



    // create drop down div
    this.popupDivE = document.createElement('div');
    this.popupDivE.id = this.elementId;
    this.popupDivE.style.position = 'absolute';
    EchoCssUtil.applyStyle(this.popupDivE,this.popupProperties);
    EP.setVisible(this.popupDivE,false);

    this.contentParentE = this.popupDivE;

    // we need the iframe trick if its IE
    if (document.all) {
      this.iframeE = document.createElement('iframe');
      this.iframeE.setAttribute("src", "javascript:false;");
      this.iframeE.setAttribute("frameborder", "0");
      this.iframeE.setAttribute("scrolling", "no");
      this.iframeE.style.position = 'absolute';
      this.iframeE.style.margin = this.popupDivE.style.margin;
      EP.setVisible(this.iframeE,false);
    }

    // search bit
    this.searchBarDivE = null;
    if (this.searchBarShown) {
      this.searchBarDivE = document.createElement('div');
      this.searchBarDivE.id = textFieldEx.elementId + '_DropDownSearch';
      EchoCssUtil.applyStyle(this.searchBarDivE,this.searchBarProperties);
      EP.ObjectMap.put(this.searchBarDivE.id, this);
      this.contentParentE.appendChild(this.searchBarDivE);
    }

    // create DOM
    var bodyE = document.getElementsByTagName('body')[0];
    bodyE.appendChild(this.popupDivE);
    if (this.iframeE) {
      bodyE.appendChild(this.iframeE);
    }

    this.updateSearchUI(false);

    if (this.searchBarDivE) {
      EP.Event.addHandler('click',this.searchBarDivE,this);
      EP.Event.addHandler('mouseover',this.searchBarDivE,this);
    }
  },

  destroy: function()
  {
    this.removeOptions();
    if ( this.searchBarDivE )
    {
      EP.Event.removeHandler('click', this.searchBarDivE);
      EP.Event.removeHandler('mouseover', this.searchBarDivE);
    }

    this.popupDivE.parentNode.removeChild(this.popupDivE);
    if ( this.iframeE )
    {
      this.iframeE.parentNode.removeChild(this.iframeE);
    }
  },

  getCurrentTextValue: function()
  {
    return this.textField.value;
  },

  setCurrentTextValue: function( newValue )
  {
    this.textField.value = newValue;
  },

  cancelAnyAjaxCalls: function()
  {
    // if we have an outstanding AJAX call in progress then we should cancell it.  It may
    // complete but we dont care for its results any more.
    if ( this.outstandingAjaxCall )
    {
      this.outstandingAjaxCall.cancelled = true;
      this.outstandingAjaxCall = null;
    }

    // update the search UI so that it not longer has "Searching...." as its text
    this.updateSearchUI(false);
  },

  updateSearchUI: function( isSearching )
  {
    if ( this.searchBarDivE )
    {
      var icon = this.searchBarIcon;
      var text = this.searchBarText;
      if ( isSearching )
      {
        icon = this.searchBarSearchingIcon;
        text = this.searchBarSearchingText;
      }
      var xhtml = '<table cellpadding=0 cellspacing=0 border=0><tbody><tr>';
      if ( icon )
      {
        xhtml += '<td><img src="' + icon + '"/></td>';
      }
      xhtml += '<td>' + text + '</td></tr></tbody></table>';
      this.searchBarDivE.innerHTML = xhtml;
    }
  },

  performLookup: function()
  {
    Core.Debug.consoleWrite('EPTextFieldEx.LookupSupport.prototype.performLookup called');
    this.cancelAnyAjaxCalls();
    var partialSearchValue = this.getCurrentTextValue();
    if ( partialSearchValue )
    {
      // do a lookup
      var lceArr = this.lookupCache.findMatches(partialSearchValue);

      // remove any previous entries in the list
      this.removeOptions();
      this.addOptions(lceArr);
      this.showDropDown();
    }
    else
    {
      // no value so hide the drop down
      this.closeDropDown();
    }
  },

  /**
   * Called to select a specific option as the current one
   */
  selectOption: function( newSelectedOptionE )
  {
    // de hilight to previous selected item
    if ( this.selectedOptionE )
    {
      EchoCssUtil.restoreOriginalStyle(this.selectedOptionE);
    }
    this.selectedOptionE = newSelectedOptionE;
    if ( this.selectedOptionE )
    {
      var uiProps = this.entryRolloverProperties;
      if ( this.selectedOptionE.getAttribute('noMatchingOption') )
      {
        this.selectedOptionE = this.searchBarDivE;
      }
      if ( this.selectedOptionE )
      {
        if ( this.selectedOptionE.id.indexOf('Search') != -1 )
        {
          uiProps = this.searchBarRolloverProperties;
        }
        EchoCssUtil.applyTemporaryStyle(this.selectedOptionE, uiProps);
      }
    }
  },

  incrementOption: function( forward )
  {
    if ( this.optionCount > 0 )
    {
      if ( this.selectedOptionE )
      {
        var newSelectionE = (forward ? this.selectedOptionE.nextSibling : this.selectedOptionE.previousSibling);
        if ( newSelectionE )
        {
          this.selectOption(newSelectionE);
        }
      }
    }
    else
    {
      this.performLookup();
    }
  },

  actionOption: function()
  {
    if ( this.selectedOptionE )
    {
      if ( this.selectedOptionE == this.searchBarDivE )
      {
        this.searchClicked();
      }
      else
      {
        var optionValue = this.selectedOptionE.getAttribute('optionValue');
        this.setCurrentTextValue(optionValue);
        this.closeDropDown();
      }
    }
  },

  addOptions: function( lceArr )
  {
    // now add the new ones as mouseoverable divs with xhtml
    this.selectOption(null);
    var parentE = this.contentParentE;
    for ( var i = 0; i < lceArr.length; i++ )
    {
      var lce = lceArr[i];
      var lceDiv = document.createElement('div');
      parentE.insertBefore(lceDiv, this.searchBarDivE); // we always have a search div as a reference point

      lceDiv.innerHTML = lce.xhtml ? lce.xhtml : lce.value;
      lceDiv.id = parentE.id + '_' + i;
      // so we later can know what value this represents
      lceDiv.setAttribute('optionIndex', i);
      lceDiv.setAttribute('optionValue', lce.value);

      EchoCssUtil.applyStyle(lceDiv, this.entryProperties);
      EP.Event.addHandler('mouseover', lceDiv);
      EP.Event.addHandler('click', lceDiv);

      if ( i == 0 )
      { // first is auto selected when adding
        this.selectOption(lceDiv);
      }
    }
    // if we have no matching options then show some text indicating this
    if ( lceArr.length == 0 && this.noMatchingOptionText )
    {
      var noMatchingOptionsE = document.createElement('div');
      EchoCssUtil.applyStyle(noMatchingOptionsE, this.entryProperties);
      noMatchingOptionsE.innerHTML = this.noMatchingOptionText;
      noMatchingOptionsE.setAttribute('noMatchingOption', true);
      parentE.insertBefore(noMatchingOptionsE, this.searchBarDivE);
    }
    if ( this.selectedOptionE == null )
    {
      this.selectOption(this.searchBarDivE);
    }
    this.optionCount = lceArr.length;
    this.resizeThings();

  },

  removeOptions: function()
  {
    var childListArr = this.contentParentE.getElementsByTagName('div');
    for ( var index = childListArr.length - 1; index >= 0; index-- )
    {
      var lceDiv = childListArr[index];
      if ( lceDiv.getAttribute('optionValue') )
      {
        EP.Event.removeHandler('mouseover', lceDiv);
        EP.Event.removeHandler('click', lceDiv);
        this.contentParentE.removeChild(lceDiv);
      }
      if ( lceDiv.getAttribute('noMatchingOption') )
      {
        this.contentParentE.removeChild(lceDiv);
      }
    }
    this.optionCount = 0;
    this.resizeThings();
  },

  positionDropDown: function()
  {
    var textBoxE = this.textFieldEx.getElement();

    var pos = EP.getPageXY(textBoxE);
    var posParent = EP.getPageXY(this.popupDivE.parentNode);
    var targetX = pos[0] - posParent[0];
    var targetY = pos[1] - posParent[1];
    targetY += EP.getHeight(textBoxE);

    this.popupDivE.style.left = targetX + 'px';
    this.popupDivE.style.top = targetY + 'px';

    var zIndex = EP.determineZ(this.popupDivE);
    this.popupDivE.style.zIndex = zIndex + 2;
    if ( this.iframeE )
    {
      this.iframeE.style.zIndex = zIndex + 1;
      this.iframeE.style.left = targetX + 'px';
      this.iframeE.style.top = targetY + 'px';
    }
  },

  resizeThings: function()
  {
    if ( this.iframeE )
    {
      this.iframeE.style.width = EP.getWidth(this.popupDivE) + 'px';
      this.iframeE.style.height = EP.getHeight(this.popupDivE) + 'px';
    }
  },

  showDropDown: function()
  {
    Core.Debug.consoleWrite('EPTextFieldEx.LookupSupport.prototype.showDropDown called');
    if ( this.popupDivE.style.visibility != 'hidden' )
    {
      return;
    }
    this.positionDropDown();
    if ( this.iframeE )
    {
      EP.setVisible(this.iframeE, true);
    }
    EP.setVisible(this.popupDivE, true);
    //
    // attach document listener so we can know about outside clicks
    var that = this;
    var docClickHandler = function( echoEvent )
    {
      var targetE = echoEvent.target;
      if ( EP.isAncestorOf(targetE, that.popupDivE) || EP.isAncestorOf(targetE, that.textFieldEx.getElement()) )
      {
        // its on us so safe to ignore
        return;
      }
      // they have clicked outside the popup or text field so hide it
      that.closeDropDown();
    };
    EP.DocumentEvent.addHandler('mousedown', 'TextFieldExClickHandler', docClickHandler);
  },

  hideDropDown: function()
  {
    Core.Debug.consoleWrite('EPTextFieldEx.LookupSupport.prototype.hideDropDown called');
    EP.setVisible(this.popupDivE, false);
    if ( this.iframeE )
    {
      EP.setVisible(this.iframeE, false);
    }

    EP.DocumentEvent.removeHandler('mousedown', 'TextFieldExClickHandler');
    Core.Debug.consoleWrite('EPTextFieldEx.LookupSupport.prototype.hideDropDown completed');
  },

  /**
   * This not only hides the drop down but it cancels any AJAX calls and
   * removes options as well.
   */
  closeDropDown: function()
  {
    this.cancelAnyAjaxCalls();
    this.hideDropDown();
    this.removeOptions();
  },

  closeDropDownAsynch: function()
  {
    Core.Debug.consoleWrite('EPTextFieldEx.LookupSupport.prototype.closeDropDownAsynch called');
    var that = this;
    var callback = function()
    {
      that.closeDropDown();
    };
    window.setTimeout(callback, 200);
  },

  /**
   * Called to add the entries into the lookup cache
   */
  addLookupEntriesFromModel: function( autoLookUpModelE )
  {
    if ( autoLookUpModelE.length )
    {
      autoLookUpModelE = autoLookUpModelE[0]
    }
    // get all the entries
    var entriesNL = autoLookUpModelE.getElementsByTagName('entry');
    var lceArr = [];
    for ( var index = 0, len = entriesNL.length; index < len; index++ )
    {
      var entryE = entriesNL[index];
      var value = entryE.getElementsByTagName('value')[0].firstChild.data;
      var sortValue = entryE.getElementsByTagName('sortValue')[0].firstChild.data;
      var xhtml = entryE.getElementsByTagName('xhtml')[0].firstChild.data;

      var lce = new EP.LookupCacheEntry(value, sortValue, xhtml);
      lceArr[lceArr.length] = lce;
    }
    if ( lceArr.length > 0 )
    {
      this.lookupCache.insertEntries(lceArr);
    }
  },

  /**
   * Called when the user presses the search button.  We AJAX back to the server to get some
   * new entries based on the current value
   */
  searchClicked: function()
  {
    //debugger;
    this.cancelAnyAjaxCalls();

    var partialSearchValue = this.getCurrentTextValue();
    if ( ! partialSearchValue )
    {
      return; // nothing to search for - TODO - is this really the case
    }
    // update
    this.updateSearchUI(true);


    // Make an AJAX call to search for new values
    var uri = EchoClientEngine.baseServerUri + "?serviceId=EPNG.AutoLookup&elementId=" + this.textFieldEx.elementId + "&searchValue=" + partialSearchValue;

    var ajaxCall = new EchoHttpConnection(uri, "GET");
    ajaxCall.lookupSupport = this;
    ajaxCall.cancelled = false;
    this.outstandingAjaxCall = ajaxCall;

    // if failed
    ajaxCall.invalidResponseHandler = function( ajaxCall )
    {
      ajaxCall.lookupSupport.outstandingAjaxCall = null;
      ajaxCall.cancelled = true;
      ajaxCall.dispose();
    }
    //
    // it worked!
    ajaxCall.responseHandler = function( ajaxCall )
    {
      try
      {
        //debugger;
        if ( ajaxCall.cancelled )
        {
          // dont do anything but dispose of the call
          ajaxCall.dispose();
          return;
        }

        // update ourselves to say we dont have any outstanding ajax lookups
        ajaxCall.lookupSupport.outstandingAjaxCall = null;

        // OK we get a series of XML messages back here just like the pre-populate message
        // so add those entries
        var dataElement = ajaxCall.getResponseXml().documentElement;
        var autoLookUpModelE = dataElement.getElementsByTagName('autoLookupModel');
        if ( autoLookUpModelE.length > 0 )
        {
          ajaxCall.lookupSupport.addLookupEntriesFromModel(autoLookUpModelE);
        }
        ajaxCall.lookupSupport.performLookup();
      }
      finally
      {
        ajaxCall.dispose();
      }
    }
    ajaxCall.connect();
  },

  onmouseover: function( echoEvent )
  {
    if ( this.searchBarDivE && EP.isAncestorOf(echoEvent.target, this.searchBarDivE) )
    {
      this.selectOption(this.searchBarDivE);
    }
    else
    {
      var optionE = EP.DOM.findElementWithAttr(echoEvent.target, 'optionValue');
      if ( optionE )
      {
        this.selectOption(optionE);
      }
    }
  },

  onclick: function( echoEvent )
  {
    this.actionOption();
    // we never want focus on the popup
    this.textField.focus();
  },

  handleNavKeys: function( echoEvent )
  {
    switch ( echoEvent.keyCode )
        {
      case 27: // ESC
      case 9 : // TAB
        this.closeDropDown();
        break;
      case 38:  // ŸP ARROW
        this.incrementOption(forward = false);
        break;
      case 40: // DOWN ARROW
        this.incrementOption(forward = true);
        break;
    }
  },

  /**
   * Key event has NOT completed on keypress.  So special keys only here
   */
  onkeypress: function( echoEvent, didAction )
  {
    switch ( echoEvent.keyCode )
        {
      case 13:  // ENTER
        if ( ! didAction )
        {
          // action the current option
          this.actionOption();
        }
        break;
    }
  },

  /**
   * Key event has completed on keyup
   */
  onkeyup: function( echoEvent )
  {
    //EP.debug('EPTextFieldEx.LookupSupport.prototype.onkeyup called - ' + echoEvent.keyCode)
    var key = echoEvent.keyCode;

    // ignore function keys
    if ( key >= 112 && key <= 123 ) return;

    switch ( key )
        {
      // none of these affect the text field content so ignore
      case 16: //shift
      case 17: //ctrl
      case 18: //alt
      case 19: //pause
      case 20: //caps lock
      case 35: //end
      case 36: //home
      case 37: //left arrow
      case 39: //right arrow
      case 44: //print screen
      case 45: //insert
      case 144: //num lock
      case 145: //scroll lock
      case 33: //page up
      case 34: //page down
        break;

      // list box navigation keys
      case 9:  //tab
      case 13: //enter
      case 27: //esc
      case 38: //up arrow
      case 40: //down arrow
        this.handleNavKeys(echoEvent);
        break;

      // all other keys
      default:
        this.performLookup();
        break;
    }
  },

  /**
   * Our general purpose EPNG event handler
   */
  eventHandler: function( echoEvent )
  {
    if ( echoEvent.type == "click" )
    {
      this.onclick(echoEvent);
    }
    if ( echoEvent.type == "mouseover" )
    {
      this.onmouseover(echoEvent);
    }
  }
});

