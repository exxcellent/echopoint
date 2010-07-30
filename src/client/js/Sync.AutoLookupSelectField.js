/**
 * Component rendering peer: AutoLookupTextField
 *
 * @author Rakesh 2009-03-29
 * @version: $Id: Sync.AutoLookupSelectField.js 208 2009-05-25 02:40:35Z sptrakesh $
 */
echopoint.AutoLookupSelectFieldSync = Core.extend( echopoint.RegexTextFieldSync, {
	
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
  _selected_bg: null,
  _actionClick: false,
  _cs: null, // case sensitive

  $static: 
  {
    DEFAULT_OPTIONS_MENU_BORDER: "1px groove #bbbbbb",
    DEFAULT_OPTIONS_MENU_BACKGROUND: "#ffffff",  
    DEFAULT_SELECTED_BACKGROUND: "#cccccc"
  },

  $virtual:
  { 
    renderAddToParentTf: function (parentElement)
    {
      echopoint.RegexTextFieldSync.prototype.renderAddToParentTf.call(this,parentElement);
      var popup_icon = this.component.render('popupIcon', null);
      var img = document.createElement("img");
      Echo.Sync.ImageReference.renderImg(popup_icon, img);

      this._popupButton = document.createElement('span');
      this._popupButton.appendChild(img);
      this._popupButton.setAttribute("style", "margin-left:2px;");

      var that = this;
      this._popupButtonClickHandler = function( event ) 
      {
        if( that.isTextFieldEditable() )
        {
          if( that._isDropDownVisible() )
            that._closeDropDown();
          else
            that._showOptionsMenu(null);
          that.input.focus();  // we never want focus on the popup
        }
      };
      Core.Web.Event.add(this._popupButton, "click", this._popupButtonClickHandler, false);
      this.container.appendChild(this._popupButton);
    }
  },

	$load: function() { Echo.Render.registerPeer( echopoint.constants.AUTO_LOOKUP_SELECT_FIELD, this ); },

	$construct: function() { echopoint.internal.TextFieldSync.call( this );	},

  getSupportedPartialProperties: function() 
  {
	  var v = echopoint.RegexTextFieldSync.prototype.getSupportedPartialProperties.call(this);
    v[v.length] = "actionClick";
    v[v.length] = "comboListChanged";
    v[v.length] = "optionsVisible";
    v[v.length] = "selectedBG";
    v[v.length] = "optMenuBG";
    v[v.length] = "optMenuBorder";
    v[v.length] = "key";
    v[v.length] = "searchVal";
    return v;
  },

  renderUpdate: function(update) 
  {
	  var status = echopoint.RegexTextFieldSync.prototype.renderUpdate.call(this, update);
  
    var selected_bg = update.getUpdatedProperty("selectedBG");
    if( selected_bg ) this._selected_bg = selected_bg.newValue;

    var optMenuBG = update.getUpdatedProperty("optMenuBG");
    if( optMenuBG ) Echo.Sync.Color.render( optMenuBG.newValue, this._popupDivE, "backgroundColor" );

    var optMenuBorder = update.getUpdatedProperty("optMenuBorder");
    if( optMenuBorder ) Echo.Sync.Border.render( optMenuBorder.newValue, this._popupDivE );

    var opt_visible = update.getUpdatedProperty("optionsVisible");
    opt_visible = ( (opt_visible && opt_visible.newValue) ? true : false );

    var action_click = update.getUpdatedProperty("actionClick");
    if( action_click ) this._actionClick = action_click.newValue;

    if( opt_visible && !this._isDropDownVisible() )
      this._showOptionsMenu(null);

    if( update.getUpdatedProperty("comboListChanged") )
      this._makeAjaxCall(null);  // load combo list
    return status;
  },

 	/**
	 * Echo life cycle method (on creation)
	 */
	renderAdd: function( update, parentElement ) 
  {
		//call super method
    echopoint.RegexTextFieldSync.prototype.renderAdd.call(this, update, parentElement);

		var searchBarSearchingIcon = this.component.render('searchBarSearchingIcon', null);
		var searchBarSearchingText = this.component.render('searchBarSearchingText', 'Searching...');
		var noMatchingOptionText	 = this.component.render('noMatchingOptionText', 'No results found');
    var cs                     = this.component.render('caseSensitive', true);

    this._autoselect           = this.component.render('autoSelect', true);
	  this._comboMode            = this.component.render('comboboxMode', false);
    this._selected_bg          = this.component.render('selectedBG', echopoint.AutoLookupSelectFieldSync.DEFAULT_SELECTED_BACKGROUND);
    this._actionClick          = this.component.render('actionClick', false);
    this._cs                   = cs ? "" : "i";
    this._service_uri          = "?sid=echopoint.AutoLookupSelectService&elementId=" + this.component.renderId;

        // create drop down div
    this._popupDivE = document.createElement('div');
    this._popupDivE.id = this.component.renderId + '_DropDownMenu';
    this._popupDivE.style.position   = 'fixed';
		this._popupDivE.style.visibility = 'hidden';
    this._popupDivE.style.overflow   = 'auto';
    this._popupDivE.style.maxHeight  = '160px';
    this._popupDivE.style.zIndex     = 1001;  //zIndex + 2;
    
    Echo.Sync.Color.render( this.component.render( 'optMenuBG', echopoint.AutoLookupSelectFieldSync.DEFAULT_OPTIONS_MENU_BACKGROUND ), this._popupDivE, "backgroundColor" );
    Echo.Sync.Border.render( this.component.render( 'optMenuBorder', echopoint.AutoLookupSelectFieldSync.DEFAULT_OPTIONS_MENU_BORDER ), this._popupDivE );
    this._bodyE = document.getElementsByTagName('body')[0];
    this._bodyE.appendChild(this._popupDivE);
		// we need the iframe trick if its IE
//		if (document.all) {
//			this._iframeE = document.createElement('iframe');
//			this._iframeE.setAttribute("src", "javascript:false;");
//			this._iframeE.setAttribute("frameborder", "0");
//			this._iframeE.setAttribute("scrolling", "no");
//			this._iframeE.style.position = 'absolute';
//			this._iframeE.style.margin = this._popupDivE.style.margin;
//			this._iframeE.style.visibility = 'hidden';
//      this._iframeE.style.maxHeight = '160px';
//      this._popupDivE.style.zIndex    = 1000;
//      this._bodyE.appendChild(this._iframeE);
//		}

	  // searching status bar
		this._searchingStatusDivE = document.createElement('div');
		this._searchingStatusDivE.id = this.component.renderId + '_SearchingStatus';
  
		var xhtml = '<table cellpadding=0 cellspacing=0 border=0><tbody><tr>';
		if( searchBarSearchingIcon ) xhtml += '<td><img src="' + searchBarSearchingIcon + '"/></td>';
		xhtml += '<td>' + searchBarSearchingText + '</td></tr></tbody></table>';

		this._searchingStatusDivE.innerHTML = (searchBarSearchingIcon || searchBarSearchingText) ? xhtml : null;
 		this._popupDivE.appendChild(this._searchingStatusDivE);

		// not-found bar
		this._notFoundStatusDivE = document.createElement('div');
		this._notFoundStatusDivE.id = this.component.renderId + '_NotFoundStatus';
		this._notFoundStatusDivE.innerHTML = noMatchingOptionText;
		this._notFoundStatusDivE.style.display = 'none';
 		this._popupDivE.appendChild(this._notFoundStatusDivE);
    
    if(this._comboMode) 
    {
      var opt_visible = update.getUpdatedProperty("optionsVisible");
      opt_visible = ( (opt_visible && opt_visible.newValue) ? true : false );
      if( opt_visible && !this._isDropDownVisible() )
        this._showOptionsMenu(null);
      this._makeAjaxCall(null);  // load combo list
    }
    Core.Web.Event.add(this.input, "keypress", Core.method(this, this.__processKeyPress), false);
	},

   /** @see Echo.Render.ComponentSync#getFocusFlags */
	getFocusFlags: function() 
  {
    //prevent that up/down keys change the focus to another component scroll instead up/down in the popup entry list  
    return ( this._isDropDownVisible() ? 0 : Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_UP | Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_DOWN ); //normal focus behaviour;
  },

  isTextFieldEditable: function()
  {
    return !this.input.readOnly && this.component.isEnabled();
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
		echopoint.RegexTextFieldSync.prototype.renderDispose.call(this, update);
	},

  clientKeyDown: function(event)
  {
    event = event ? event : window.event;
    if( this.client && this.component.isActive() && event.keyCode == 13 && this.isTextFieldEditable() ) //ENTER
      this._storeOption(event);
    return echopoint.RegexTextFieldSync.prototype.clientKeyDown.call(this, event);
  },

  __processKeyPress: function( event )  // we do not use the clientKeyPress because it does not catch the tab
  {
    event = event ? event : window.event;
    if( !this.client || !this.component.isActive() )
      Core.Web.DOM.preventEventDefault(event.domEvent);
    else
    if( event.keyCode == 9 ) //TAB
      this._closeDropDown();
    return true;
  },
  
  clientKeyUp: function( event )
  {
    event = event ? event : window.event;
    var key = event.keyCode;
    if( !this.last_key_rejected && this.client && this.component.isActive() && (key < 112 || key > 123) && this.isTextFieldEditable() ) // ignore function keys
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
        case 13: // ENTER
          this._storeOption(event);
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
          this._showOptionsMenu( this.input.value );
				  break;
		  }
    }
    return echopoint.RegexTextFieldSync.prototype.clientKeyUp.call(this, event);
	},

  /**
   * Calculate a combobox entries list
   */ 
  _calcComboList: function(val)
  {
    if( val == null ) // show full list
      this._searchEntries = this._comboAllEntries;
    else
    {
      this._searchEntries = [];
      var desired_eidx = null;
      for( var i = 0; i < this._comboAllEntries.length; i++ ) 
      {
        var entry = this._comboAllEntries[i];
        var search_val = entry["searchVal"];
        if( (val.length == 0 && search_val.length == 0) || ( val.length > 0 && search_val.search( new RegExp(val, this._cs) ) != -1 ) )
        {
          var idx = this._searchEntries.length;
          this._searchEntries[idx] = entry;
          if( val == search_val )
            desired_eidx = idx;
        }
      }
      if( desired_eidx && this._searchEntries.length > 1 )
      {
        var desired_entry = this._searchEntries[desired_eidx];
        var first_entry   = this._searchEntries[0];
        this._searchEntries[0] = desired_entry;
        this._searchEntries[desired_eidx] = first_entry;
      }
    }
  },

  /**
   * Calculate and show a combobox entries list
   */ 
  _showComboList: function(val)
  {
    this._calcComboList(val);
    this._showDropDown();
  },

  _showOptionsMenu: function(val)
  {
    if( this._comboMode )
    {
      this._showComboList(val);
      if( val != null )
      {
        var opt = null;        
        if( this._searchEntries.length > 0 )
        {
          var entry = this._searchEntries[0];
          if( entry["searchVal"] == val )
            opt = entry;
        }        
        if( opt ) 
        {
          this.component.set("key",  opt['key']);
          this.component.set("searchVal", opt['searchVal']);
        } 
        else // not exists
        {
          this.component.set("key",  null);
          this.component.set("searchVal", null);
        }
      }
    }
    else
    {
      // show the 'Searching status'
      this._updateSearchUI(true);
      this._makeAjaxCall(val);
    }
  },

	/**
	 * Show or hide the 'Searching' status
	 */	
	_updateSearchUI: function( isSearching ) 
  {
		if(isSearching) this._notFoundStatusDivE.style.display = 'none';
		this._searchingStatusDivE.style.display = (isSearching && this._searchingStatusDivE.innerHTML != null) ? 'block' : 'none';
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
			if( entryDiv.getAttribute('optionIndex') ) 
      {
				Core.Web.Event.removeAll( entryDiv );
				this._popupDivE.removeChild(entryDiv);
			}
		}
		this._resizeThings();
	},
	
	_resizeThings: function() 
  {
		if( this._iframeE ) 
    {
			var cellBounds = new Core.Web.Measure.Bounds(this._popupDivE);
			this._iframeE.style.width = cellBounds.width + 'px';
			this._iframeE.style.height = cellBounds.height + 'px';
		}
	},
	
	/**
	 * Clear and add the new entries to the popup
	 */
	_addOptions: function() 
  {
    this._removeOptions();
  	// now add the new ones as mouseoverable divs with xhtml
		for( var i = 0; i < this._searchEntries.length; i++ ) 
    {
			var entry    = this._searchEntries[i];
			var entryDiv = document.createElement('div');  
			this._popupDivE.insertBefore(entryDiv, this._searchingStatusDivE); // we always have the statusbar div as a reference point
      var entry_val      = entry["value"];
			entryDiv.innerHTML = (entry_val == '' ? '&nbsp' : entry_val);
			entryDiv.id        = this._popupDivE.id + '_' + i;
			// so we later can know what value this represents
			entryDiv.setAttribute('optionIndex', i);
			entryDiv.setAttribute('optionValue', entry_val);
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
    this._notFoundStatusDivE.style.display = (this._searchEntries.length == 0 && this._notFoundStatusDivE.innerHTML != null) ? 'block' : 'none';
		this._resizeThings();
	},
	
	/**
	 * Called to select a specific option as the current one
	 */
	_selectOption: function( newSelectedOptionE ) 
  {                           
		// de-hilight to previous selected item
    if( this._selectedOptionE ) this._selectedOptionE.style.background = this._popupDivE.style.background; //unselected
		this._selectedOptionE = newSelectedOptionE;
		if( this._selectedOptionE ) this._selectedOptionE.style.background = this._selected_bg; //selected
	},

  _isDropDownVisible: function()
  { 
    return this._popupDivE.style.visibility != 'hidden';
  },

	_showDropDown: function() 
  {
    this._addOptions();
    if( this._searchEntries.length == 0 ) { this._hideDropDown(); return; }
		if( this._isDropDownVisible() ) return;

		var cellBounds = new Core.Web.Measure.Bounds(this.input);
		this._popupDivE.style.left      = cellBounds.left + 'px';
		this._popupDivE.style.top       = (cellBounds.top + cellBounds.height) + 'px';
		this._popupDivE.style.minWidth  = cellBounds.width - 2 + 'px';
		this._popupDivE.style.width     = this._popupDivE.style.minWidth;
		
		if( this._iframeE ) 
		{
			this._iframeE.style.left     = cellBounds.left + 'px';
			this._iframeE.style.top      = (cellBounds.top + cellBounds.height) + 'px';
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
      if( Core.Web.DOM.isAncestorOf(that.input, target) || 
    	    ( !Core.Web.DOM.isAncestorOf(that._popupDivE, target) && ( that._popupButton == null || !Core.Web.DOM.isAncestorOf(that._popupButton, target) ) ) )
        that._closeDropDown();
    };
    Core.Web.Event.add(this._bodyE, "mousedown", this._docClickHandler, true);
    this.component.set("optionsVisible", true);
  },
  
  _hideDropDown: function() 
  {
    if( !this._isDropDownVisible() ) return;
		this._popupDivE.style.visibility = 'hidden';
		if( this._iframeE ) this._iframeE.style.visibility = 'hidden';
		Core.Web.Event.remove(this._bodyE, "mousedown", this._docClickHandler, true);
    this.component.set("optionsVisible", false);
	},
	
	/**
	 * Called when the user presses the search button.	We AJAX back to the server to get some
	 * new entries based on the current value
	 */
	_makeAjaxCall: function(val) 
  {
		// if we have an outstanding AJAX call in progress then we should cancell it. It may complete but we dont care for its results any more.
	  this._cancelAnyAjaxCall();
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
      this._outstandingAjaxCall.dispose();
	    this._outstandingAjaxCall = null;
    }
	},

	/**
	 * Asynchronous ajax callback method
	 */	
	_ajaxResponse: function(echoEvent) 
  {
		var ajaxCall = echoEvent.source;
		try
    {
      this._searchEntries = [];
      if( echoEvent.valid && ajaxCall.getResponseXml() )
      {
			  // OK we get a series of XML messages back here just like the pre-populate message so add those entries
			  var autoLookUpModelE = ajaxCall.getResponseXml().documentElement.getElementsByTagName('autoLookupModel');
			  if( autoLookUpModelE.length > 0 ) 
        {
				  var entriesNL = autoLookUpModelE[0].getElementsByTagName('entry');
		      for( var index = 0; index < entriesNL.length; index++ ) 
          {
		        //convert from xml entry to LookupEntry
				    var entryE = entriesNL[index];					
				    var value  = entryE.getElementsByTagName('value')[0].firstChild;
            value      = (value ? value.data : "");
				    var key    = entryE.getElementsByTagName('key')[0].firstChild;
            key        = (key ? key.data : "");
				    var search = entryE.getElementsByTagName('searchVal')[0].firstChild;
            search     = (search ? search.data : "");
				    this._searchEntries[index] = {"value": value, "key" : key, "searchVal" : search};
          }
			  }
      }
      else
      if(!ajaxCall.valid)
        throw new Error( "Invalid HTTP response, received status: " + ajaxCall.getStatus() );
		}
    finally 
    {
      this._outstandingAjaxCall.dispose();
      this._outstandingAjaxCall = null;
		}

    if( this._comboMode )
    {
      this._comboAllEntries = this._searchEntries;
      if( this._isDropDownVisible() )
        this._showComboList(null);
    }
    else
    {
		  // now popilate the popup and display it
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
      {
        var div_bound = new Core.Web.Measure.Bounds(newSelectionE);
        this._popupDivE.scrollTop += (forward ? div_bound.height : -div_bound.height);
				this._selectOption(newSelectionE);
      }
		}
    else
    if( !this._autoSelect && this._firstEntryDiv != null ) 
      this._selectOption( this._firstEntryDiv );
	},

	/**
	 * One entry has been selected (by click or by enter key)
	 * Set the appropiate text and close the popup
	 */
	_storeOption: function(event) 
  {
	  if( this._selectedOptionE ) 
    {
      this.input.value = this._selectedOptionE.getAttribute('optionValue');
      this.component.set("key",  this._selectedOptionE.getAttribute('optionKey'));
      this.component.set("searchVal", this._selectedOptionE.getAttribute('optionSearchVal'));
      this._storeSelection();
      this._storeValue(event);
      this._selectOption(null);
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
    this._storeOption(null);
    if( this._actionClick )        
      this.component.doAction();  //fire action event
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
