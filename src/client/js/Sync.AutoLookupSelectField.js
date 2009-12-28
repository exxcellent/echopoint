/**
 * Component rendering peer: AutoLookupTextField
 *
 * @author Rakesh 2009-03-29
 * @version: $Id: Sync.AutoLookupSelectField.js 208 2009-05-25 02:40:35Z sptrakesh $
 */
echopoint.AutoLookupSelectFieldSync = Core.extend( echopoint.internal.TextFieldSync, {
	
	_outstandingAjaxCall : null,
	_searchingStatusDivE : null,
	_notFoundStatusDivE : null,
	_popupDivE: null,
	_iframeE: null,
	_searchEntries: null,
	_selectedOptionE: null,
	_bodyE: null,
 	_autoselect: true,
  _comboMode: false,
  _comboAllEntries: null,
  _service_uri: null,
  _firstEntryDiv: null,
  _popupButton: null,
  _last_opt_val: null,

	$load: function() { Echo.Render.registerPeer( echopoint.constants.AUTO_LOOKUP_SELECT_FIELD, this ); },

	$construct: function() { echopoint.internal.TextFieldSync.call( this );	},

  renderUpdate: function(update) 
  {
    var status = echopoint.internal.TextFieldSync.prototype.renderUpdate.call(this, update);

    var list_chnaged = update.getUpdatedProperty("comboListChanged");
    if( list_chnaged && list_chnaged.newValue )
      this._makeAjaxCall(null);  // load combo list

    var opt_visible = update.getUpdatedProperty("optionsVisible");
    if( opt_visible && opt_visible.newValue )
    {
      if( this._comboMode )
        this._showComboList(null);
      else
        this._makeAjaxCall(null);
    } 
    return status;
  },

 	/**
	 * Echo life cycle method (on creation)
	 */
	renderAdd: function( update, parentElement ) 
  {
    // Here we apply a "JS hack" for a overriding a super non-virtual method: 'renderAddToParent' !!!
    this.superRenderAddToParent = this.renderAddToParent;
    this.renderAddToParent      = this._renderAddToParent;

		//call super method
		echopoint.internal.TextFieldSync.prototype.renderAdd.call(this, update, parentElement);
		
		var searchBarSearchingIcon = this.component.render('searchBarSearchingIcon', null);
		var searchBarSearchingText = this.component.render('searchBarSearchingText', 'Searching...');
		var noMatchingOptionText	 = this.component.render('noMatchingOptionText', 'No results found');
    this._autoselect           = this.component.render('autoSelect', true);
	  this._comboMode            = this.component.render('comboboxMode', false);

    this._service_uri = "?sid=echopoint.AutoLookupSelectService&elementId=" + this.component.renderId;

		// create drop down div
		this._popupDivE = document.createElement('div');
	  this._popupDivE.id = this.elementId;
		this._popupDivE.style.position = 'absolute';
		this._popupDivE.style.visibility = 'hidden';
		this._popupDivE.style.background = '#fff';
		this._popupDivE.style.border = 'thin groove #bbb';

		// we need the iframe trick if its IE
//		if (document.all) {
//			this._iframeE = document.createElement('iframe');
//			this._iframeE.setAttribute("src", "javascript:false;");
//			this._iframeE.setAttribute("frameborder", "0");
//			this._iframeE.setAttribute("scrolling", "no");
//			this._iframeE.style.position = 'absolute';
//			this._iframeE.style.margin = this._popupDivE.style.margin;
//			this._iframeE.style.visibility = 'hidden';
//		}

	  // searching status bar
		this._searchingStatusDivE = document.createElement('div');
		this._searchingStatusDivE.id = this.component.renderId + '_SearchingStatus';

		var xhtml = '<table cellpadding=0 cellspacing=0 border=0><tbody><tr>';
		if( searchBarSearchingIcon ) xhtml += '<td><img src="' + searchBarSearchingIcon + '"/></td>';
		xhtml += '<td>' + searchBarSearchingText + '</td></tr></tbody></table>';

		this._searchingStatusDivE.innerHTML = xhtml;
 		this._popupDivE.appendChild(this._searchingStatusDivE);

		// not-found bar
		this._notFoundStatusDivE = document.createElement('div');
		this._notFoundStatusDivE.id = this.component.renderId + '_NotFoundStatus';
		this._notFoundStatusDivE.innerHTML = noMatchingOptionText;
		this._notFoundStatusDivE.style.display = 'none';
 		this._popupDivE.appendChild(this._notFoundStatusDivE);
    
	  // append the popup to the main body
		this._bodyE = document.getElementsByTagName('body')[0];
		this._bodyE.appendChild(this._popupDivE);

		if(this._iframeE)   this._bodyE.appendChild(this._iframeE);
    if(this._comboMode) this._makeAjaxCall(null); // load combobox list 
	}, 

  _renderAddToParent: function(parentElement) 
  {
    var popup_icon = this.component.render('popupIcon', null);
    if( popup_icon != null )
    {
      var span_img = document.createElement("span");
      var img      = document.createElement("img");
      Echo.Sync.ImageReference.renderImg(popup_icon, img);
      span_img.style.display = "";
      span_img.appendChild(img);

      this._popupButton = document.createElement('span');
      this._popupButton.appendChild(span_img);
      this._popupButton.setAttribute("style", "margin-left:3px;");
      var that = this;
      this._popupButtonClickHandler = function( event ) 
      {
        if( that._isDropDownVisible() )
          that._closeDropDown();
        else
        if( that._comboMode )
          that._showComboList(null);
        else
          that._makeAjaxCall(null);
        return false;
      };
      Core.Web.Event.add(this._popupButton, "mousedown", this._popupButtonClickHandler, true);

      this.container = document.createElement("div");
      this.container.appendChild(this.input);
      this.container.appendChild(this._popupButton);
      parentElement.appendChild(this.container);
    }
    else
      this.superRenderAddToParent(parentElement);
  },
	
	 /** @see Echo.Render.ComponentSync#getFocusFlags */
	getFocusFlags: function() 
  {
    //prevent that up/down keys change the focus to another component scroll instead up/down in the popup entry list  
    return ( this._isDropDownVisible() ? 0 : Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_UP | Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_DOWN ); //normal focus behaviour;
  },

	/**
	 * Echo life cycle method (on deletion)
	 */
	renderDispose: function( update ) 
  {
    this._cancelAnyAjaxCall();
    this._removeOptions();
		this._popupDivE.parentNode.removeChild(this._popupDivE);
		if( this._iframeE ) this._iframeE.parentNode.removeChild(this._iframeE);
    echopoint.internal.TextFieldSync.prototype.renderDispose.call(this, update);
	},

  /** The event handler for a "blur" event. */
  processBlur: function( event ) 
  {
    this._focused = false;
    return true;
  },

  _storeTextFieldValue : function ()
  {
    this._storeSelection();
    this.sanitizeInput();
    this.component.set("text", this.input.value, true);
    this._lastProcessedValue = this.input.value;
  }, 

  clientKeyDown: function(e) 
  {
    if( this.client && this.component.isActive() && !this.component.doKeyDown(e.keyCode) ) 
      Core.Web.DOM.preventEventDefault(e.domEvent);
    return true;
  },
    
  clientKeyPress: function(e) 
  {
    if( this.client && this.component.isActive() && !this.component.doKeyPress(e.keyCode, e.charCode) )
      Core.Web.DOM.preventEventDefault(e.domEvent);
    return true;
  },

	clientKeyUp : function( event )
  {
    event = event ? event : window.event;
    var key = event.keyCode;
    if( key < 112 || key > 123 ) // ignore function keys 
    {
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
        case 13: // Enter
          this._storeOption();
          this.component.doAction();  //fire action event
          break;
        case 27: // ESC
        case 9 : // TAB
          this._closeDropDown();
          break;
        case 38:  // UP ARROW
          this._incrementOption(forward = false);
          break;
        case 40: // DOWN ARROW
          this._incrementOption(forward = true);
          break;
			  default: // all other keys
          this._storeTextFieldValue();                       
          if( this.input.value )
          {
            if( this._comboMode )
              this._showComboList(this.input.value);
            else
              this._makeAjaxCall(this.input.value);
          }
          else
            this._closeDropDown();
				  break;
		  }
    }	
		return true;
	},

  /**
   * Calculate and show combobox entries list
   */ 
  _showComboList: function(val)
  {
    if( val == null ) // show full list
      this._searchEntries = this._comboAllEntries;
    else
    {    
      this._searchEntries = [];
      for( var i = 0; i < this._comboAllEntries.length; i++ ) 
      {
        var entry = this._comboAllEntries[i];
        var search_val = entry["searchVal"];
        if( search_val != null && search_val.indexOf( val ) != -1 )
          this._searchEntries[this._searchEntries.length] = entry;
      }
    }
    this._removeOptions();
    this._addOptions();
    this._showDropDown();
  },

	/**
	 * Show or hide the 'Searching' status
	 */	
	_updateSearchUI: function( isSearching ) 
  {
		if(isSearching) this._notFoundStatusDivE.style.display = 'none';
		this._searchingStatusDivE.style.display = isSearching ? 'block' : 'none';
	},
	
	/**
	 * Clear the list from the entries
	 */
	_removeOptions: function() 
  {
    this._selectOption(null);
  	var childListArr = this._popupDivE.getElementsByTagName('div');
		for( var index = childListArr.length - 1; index >= 0; index-- ) 
    {
			var entryDiv = childListArr[index];
			if( entryDiv.getAttribute('optionValue') ) 
      {
				Core.Web.Event.removeAll( entryDiv );
				this._popupDivE.removeChild(entryDiv);
			}
			if( entryDiv.getAttribute('noMatchingOption') )
				this._popupDivE.removeChild(entryDiv);
		}
		this._resizeThings();
	},
	
	_resizeThings: function() {
		if ( this._iframeE ) {
			var cellBounds = new Core.Web.Measure.Bounds(this._popupDivE);
			this._iframeE.style.width = cellBounds.width + 'px';
			this._iframeE.style.height = cellBounds.height + 'px';
		}
	},
	
	/**
	 * Add the entries to the popup
	 */
	_addOptions: function() 
  {
		// now add the new ones as mouseoverable divs with xhtml
		for( var i = 0; i < this._searchEntries.length; i++ ) 
    {
			var entry = this._searchEntries[i];
			var entryDiv = document.createElement('div');  
			this._popupDivE.insertBefore(entryDiv, this._searchingStatusDivE); // we always have the statusbar div as a reference point
			entryDiv.innerHTML = entry["value"];
			entryDiv.id = this._popupDivE.id + '_' + i;
			// so we later can know what value this represents
			entryDiv.setAttribute('optionIndex', i);
			entryDiv.setAttribute('optionValue', entry["value"]);
			entryDiv.setAttribute('optionKey', entry["key"]);
			entryDiv.setAttribute('optionSearchVal', entry["searchVal"]);
			entryDiv.style.cursor = 'default';
		  Core.Web.Event.add( entryDiv, "click", Core.method( this, this._onclick ), false );
		  Core.Web.Event.add( entryDiv, "mouseover", Core.method( this, this._onmouseover ), false );

			if( i == 0 )
      {
        this._firstEntryDiv = entryDiv;
        if( this._autoselect )  // first is auto selected when adding
				  this._selectOption(entryDiv);
      }
		}
		// if we have no matching options then show some text indicating this
    this._notFoundStatusDivE.style.display = this._searchEntries.length == 0 ? 'block' : 'none';
		this._resizeThings();
	},
	
	/**
	 * Called to select a specific option as the current one
	 */
	_selectOption: function( newSelectedOptionE ) 
  {                           
		// de-hilight to previous selected item
    if( this._selectedOptionE ) this._selectedOptionE.style.background = '#fff';  //unselected
		this._selectedOptionE = newSelectedOptionE;
		if( this._selectedOptionE ) this._selectedOptionE.style.background = '#ccc';  //selected
	},

  _isDropDownVisible: function()
  { 
    return this._popupDivE.style.visibility != 'hidden'
  },

	_showDropDown: function() 
  {
		if( this._isDropDownVisible() ) return;

		var cellBounds = new Core.Web.Measure.Bounds(this.input);
		this._popupDivE.style.left = cellBounds.left + 'px';
		this._popupDivE.style.top = (cellBounds.top + cellBounds.height) + 'px';
		this._popupDivE.style.minWidth = cellBounds.width + 'px';
		this._popupDivE.style.zIndex = 1001;  //zIndex + 2;
		if( this._iframeE ) 
    {
			this._iframeE.style.zIndex = 1000;
			this._iframeE.style.left = cellBounds.left + 'px';
			this._iframeE.style.top = (cellBounds.top + cellBounds.height) + 'px';
			this._iframeE.style.minWidth = cellBounds.width + 'px';
			this._iframeE.style.visibility = 'visible';
		}
		this._popupDivE.style.visibility = 'visible';
    // attach document listener so we can know about outside clicks
    var that = this;
    this._docClickHandler = function( event ) 
    {
      event = event ? event : window.event;
      var target = Core.Web.DOM.getEventTarget(event);
      if( Core.Web.DOM.isAncestorOf(that.input, target) || !Core.Web.DOM.isAncestorOf(that._popupDivE, target) ) // they have clicked outside the popup or text field so close popup
        that._closeDropDown();
      return false;
    };
    Core.Web.Event.add(this._bodyE, "mousedown", this._docClickHandler, false);
    this.component.set("optionsVisible", true);
  },
  
  _hideDropDown: function() 
  {
		this._popupDivE.style.visibility = 'hidden';
		if( this._iframeE ) this._iframeE.style.visibility = 'hidden';
		Core.Web.Event.remove(this._bodyE, "mousedown", this._docClickHandler, false);
	},
	
	/**
	 * Called when the user presses the search button.	We AJAX back to the server to get some
	 * new entries based on the current value
	 */
	_makeAjaxCall: function(val) 
  {
		// if we have an outstanding AJAX call in progress then we should cancell it.It may
		// complete but we dont care for its results any more.
	  this._cancelAnyAjaxCall();
    if( !this._comboMode ) 
    {
		  // show the 'Searching status'
		  this._showDropDown();
		  this._updateSearchUI(true);
    }
		// Make an AJAX call to search for new values
		var uri = ( val ? this._service_uri + "&searchValue=" + encodeURI(val) : this._service_uri );
	  this._outstandingAjaxCall = new Core.Web.HttpConnection(uri, "GET", null, "text/xml" );
	  this._outstandingAjaxCall.addResponseListener( Core.method( this, this._ajaxResponse ) );
		this._outstandingAjaxCall.connect();
	},

	_cancelAnyAjaxCall: function() 
  {
	  if( this._outstandingAjaxCall ) 
    {
	    this._outstandingAjaxCall.cancelled = true;
	    this._outstandingAjaxCall = null;
    }
	},

	/**
	 * Asynchronous ajax callback method
	 */	
	_ajaxResponse: function(echoEvent) 
  {
		var ajaxCall = echoEvent.source;
		if( !echoEvent.valid || ajaxCall.cancelled || !ajaxCall.getResponseXml() ) 
    {
			ajaxCall.dispose();		
			this._outstandingAjaxCall = null;
			if(echoEvent.valid) return;
			else                throw new Error("Invalid HTTP response, received status: " + echoEvent.source.getStatus());
		}
    this._searchEntries = [];
		try // it worked! 
    {
			// OK we get a series of XML messages back here just like the pre-populate message so add those entries
			var dataElement = ajaxCall.getResponseXml().documentElement;
			var autoLookUpModelE = dataElement.getElementsByTagName('autoLookupModel');
			if( autoLookUpModelE.length > 0 ) 
      {
				var entriesNL = autoLookUpModelE[0].getElementsByTagName('entry');
		    for( var index = 0, len = entriesNL.length; index < len; index++ ) 
        {
		      //convert from xml entry to LookupEntry
				  var entryE = entriesNL[index];					
				  var value  = entryE.getElementsByTagName('value')[0].firstChild.data;
				  var key    = entryE.getElementsByTagName('key')[0].firstChild.data;
				  var search = entryE.getElementsByTagName('searchVal')[0].firstChild.data;
				  this._searchEntries[index] = {"value": value, "key" : key, "searchVal" : search};
  			}
			}
		} 
    finally 
    {
			ajaxCall.dispose();
			this._outstandingAjaxCall = null;
		}
    if( this._comboMode )
      this._comboAllEntries = this._searchEntries;
    else
    {
		  // now popilate the popup and display it
		  this._removeOptions();
		  this._addOptions();
		  this._showDropDown();
		  this._updateSearchUI(false);
    }
	},	
	
	/**
	  * This not only hides the drop down but it cancels any AJAX calls and
	  * removes options as well.
	  */
	_closeDropDown: function() 
  {
  	this._cancelAnyAjaxCall();
		this._hideDropDown();
		this._removeOptions();
    this.component.set("optionsVisible", false);
	},
	
	/**
	 * Move the selection one forward or backward
	 */
	_incrementOption: function( forward ) 
  {
		if( this._selectedOptionE ) 
    {
			var newSelectionE = (forward ? this._selectedOptionE.nextSibling : this._selectedOptionE.previousSibling);
			if( newSelectionE && newSelectionE != this._searchingStatusDivE )
				this._selectOption(newSelectionE);
		}
    else
    if( !this._autoSelect && this._firstEntryDiv != null ) 
      this._selectOption( this._firstEntryDiv );
	},

	/**
	 * One entry has been selected (by click or by enter key)
	 * Set the appropiate text and close the popup
	 */
	_storeOption: function() 
  {
		if( this._selectedOptionE ) 
    {
      this._last_opt_val = this._selectedOptionE.getAttribute('optionValue');
			this.input.value = this._last_opt_val;
      this._storeTextFieldValue();
			this.component.set("key",  this._selectedOptionE.getAttribute('optionKey') );
			this.component.set("searchVal", this._selectedOptionE.getAttribute('optionSearchVal') );
			this._selectedOptionE = null;
		}
    else
    if( this.input.value != this._last_opt_val )
    {
      this.component.set("key",  null);
      this.component.set("searchVal", null);
    }
    this._closeDropDown();  
	},
	
	/**
	 * Action listener (when the user clicks on an entry)
	 */
	_onclick: function( event ) 
  {
    event = event ? event : window.event;
		this._selectOption( Core.Web.DOM.getEventTarget(event) );
    this._storeOption();
		this.input.focus();  // we never want focus on the popup
    return true;
	},

	/**
	 * Mouse listener (creates rollover-effect)
	 */
	_onmouseover: function( event ) 
  {
    event = event ? event : window.event;
		this._selectOption( Core.Web.DOM.getEventTarget(event) );
    return true;
	}

});
