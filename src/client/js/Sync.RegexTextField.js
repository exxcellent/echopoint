/**
 * Component rendering peer: RegexTextField
 *
 * @author Rakesh 2009-03-08
 * @version: $Id$
 */
echopoint.RegexTextFieldSync = Core.extend( echopoint.internal.TextFieldSync,
{
  regexp_filter: null,
  _val_bp : null, // input.value before paste action 
  _regexp_msg : null,
  _invalid_message: null,
  invalid_msg_width: null,
  invalid_msg_alignment: null,
  invalid_msg_left: null,  
  invalid_msg_font: null,
  last_key_rejected: false,

  // call to remove the invalid message 
  _statusValid : function()
  {
    this._regexp_msg.style.display = "none";
    Echo.Sync.Color.render(this.component.render("foreground", "#000000"), this.input, "color");
    Echo.Sync.Color.render(this.component.render("background", "#ffffff"), this.input, "backgroundColor");
  },

  // call to set the invalid message to the invalid component
  _statusInvalid : function()
  {
    if (this._invalid_message)
    {  
      this.positionMsgComp();
      this._regexp_msg.style.display = "";
      Echo.Sync.Color.render(this.component.render("invalid_foreground", "#000000"), this.input, "color");
      Echo.Sync.Color.render(this.component.render("invalid_background", "#ffffff"), this.input, "backgroundColor");
  
      Echo.Sync.Color.render(this.component.render("invalid_msg_foreground", "#000000"), this._regexp_msg, "color");
      Echo.Sync.Color.render(this.component.render("invalid_msg_background", "#ffffff"), this._regexp_msg, "backgroundColor");
    }
  },

  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.REGEX_TEXT_FIELD, this );
  },

  $virtual: 
  {
    clientKeyPressRejected: function( event ) 
    {
      Core.Web.DOM.preventEventDefault(event.domEvent);
      this._statusInvalid();
      this.last_key_rejected=true;
      return false;
    },

    clientKeyPressAccepted: function( event ) 
    { 
      this._statusValid();
      this.last_key_rejected=false;
      return echopoint.internal.TextFieldSync.prototype.clientKeyPress.call(this, event);
    },

    renderAddToParentTf: function (parentElement)
    {
      this.container = document.createElement("div");
      this.container.appendChild(this.input);
      this.container.appendChild(this._regexp_msg); 
      parentElement.appendChild(this.container);
      this._storeValue = this._storeValueRegExp;
    }
  },

  _storeValueRegExp: function(keyEvent)
  {
    if (keyEvent && keyEvent.keyCode == 8 )
      this._statusValid();
    Echo.Sync.TextComponent.prototype._storeValue.call(this, keyEvent);
  },

  // Positioning the this._regexp_msg component
  positionMsgComp: function()
  {
    var message_position  = this.component.render('invalid_msg_orientation', 'bottom');
    
    this._regexp_msg.innerHTML = this._invalid_message;
    Echo.Sync.Font.render(Echo.Sync.getEffectProperty(this.component, "invalid_msg_font", "disabledFont", true), 
                    this._regexp_msg);
    var cellBounds = new Core.Web.Measure.Bounds(this.input);
    this.invalid_msg_left = cellBounds.left;
    this._regexp_msg.style.position = 'fixed';
    
    if ( this.invalid_msg_width != -1 )
    {
      this._regexp_msg.style.width = this.invalid_msg_width + 'px';
      if ( this.invalid_msg_alignment != null )
      {
        if ( this.invalid_msg_alignment == "left" )
          this.invalid_msg_left = cellBounds.left;        
        else if ( this.invalid_msg_alignment == "center" )
          this.invalid_msg_left = cellBounds.left + ( ( cellBounds.width - this.invalid_msg_width)/2 ) ;
        else if ( this.invalid_msg_alignment == "right" )
          this.invalid_msg_left = cellBounds.left + cellBounds.width - this.invalid_msg_width;        
      }
    } 
    else
      this._regexp_msg.style.width = (cellBounds.width ) + 'px';
    
    if ( message_position == "bottom")
    {
      this._regexp_msg.style.left = this.invalid_msg_left + 'px';
      this._regexp_msg.style.top = (cellBounds.bottom) + 'px';
    }
    else
      if ( message_position == "top")
      {
        //Display the message div for few moment with left position = 0 - this._regexp_msg.style.width 
        //                          and top position = '0px' to calculate the height of the message div
        this._regexp_msg.style.left = (0 - this._regexp_msg.style.width) + 'px';
        this._regexp_msg.style.top = '0px';
        this._regexp_msg.style.display = "";
        
        var msgCellBounds = new Core.Web.Measure.Bounds(this._regexp_msg);
        this._regexp_msg.style.left = this.invalid_msg_left - 5 + 'px';
        this._regexp_msg.style.top = ( cellBounds.top - msgCellBounds.height) + 'px';
        
        this._regexp_msg.style.display = "none";     
      }
      else
        if ( message_position == "left")
        { 
          this._regexp_msg.style.left = (cellBounds.left - cellBounds.width - 5) + 'px';
          this._regexp_msg.style.top = (cellBounds.top) + 'px';
        }
        else
          if ( message_position == "right")
          {
            this._regexp_msg.style.left = (cellBounds.left + cellBounds.width - 5) + 'px';
            this._regexp_msg.style.top = (cellBounds.top) + 'px';
          }
  },

  // Override the TextField method: The filter function implementation.
  clientKeyPress: function( event )
  {
    event = event ? event : window.event;

    if( this.client && this.component.isActive() && !this.component.doKeyPress(event.keyCode, event.charCode) ) 
          return this.clientKeyPressAccepted(event);
  
    var charCode = event.domEvent.charCode;
    // Skip copy, cut, paste, select-all, arrow left, arrow right etc.
    if( !event.domEvent.metaKey && !event.domEvent.ctrlKey && !event.domEvent.altKey && charCode > 31 && charCode != 37 && charCode != 39 && this.regexp_filter )
    {
      var position = this.getCaretPosition();
      var value = this.input.value.substring( 0, position ) +
                  String.fromCharCode( charCode ) +
                  this.input.value.substring( position );
      if( !this.regexp_filter.test( value ) )
    	  return this.clientKeyPressRejected( event );
    }
    return this.clientKeyPressAccepted(event);
  },

  // Run the processPaste after the input field has had text pasted into it (copy+paste from a keyboard or a mouse)
  processPaste: function(event) 
  {
    event = event ? event : window.event;
    this._val_bp = this.input.value;
    Core.Web.Scheduler.run(Core.method(this, this._filterInput), 1, false); // Hack: we have new_value after 1milisec :-)
  },
  
  _filterInput: function() 
  {
    if( !this.regexp_filter.test( this.input.value ) )
      this.input.value = this._val_bp;
  },

  // Override the TextField method
  renderAdd : function(update, parentElement) 
  {
    this._regexp_msg = document.createElement("div");
    this._regexp_msg.style.display = "none";
    this._invalid_message = this.component.render('invalid_msg', null);
    this.invalid_msg_width = this.component.render('invalid_msg_width', null);
    this.invalid_msg_alignment = this.component.render('invalid_msg_alignment', null);
    echopoint.internal.TextFieldSync.prototype.renderAdd.call(this, update, parentElement);
    var regex = this.component.render( echopoint.RegexTextField.REGEX );
    if(regex)
      this.regexp_filter = new RegExp(regex);
    Core.Web.Event.add(this.input, "paste", Core.method(this, this.processPaste), false);
 },

  // Override the TextField method
  renderUpdate: function(update) 
  {
    var regex = update.getUpdatedProperty( echopoint.RegexTextField.REGEX );
    if(regex) 
      this.regexp_filter = new RegExp(regex.newValue);
    return echopoint.internal.TextFieldSync.prototype.renderUpdate.call(this, update);      
  },

  $construct: function()
  {
    echopoint.internal.TextFieldSync.call( this );
  }
});

/**
 * Remote regex text field component.
 */
echopoint.RemoteRegexTextField = Core.extend(echopoint.RegexTextField, {

    /** @see Echo.Component#componentType */
    componentType: "RxRTF",
    
    $load: function() {
        Echo.ComponentFactory.registerType("RxRTF", this);
    }
});

/**
 * Remote regex text field component synchronization peer.
 */
echopoint.RemoteRegexTextField.Sync = Core.extend(echopoint.RegexTextFieldSync, {
    
    $load: function() {
        Echo.Render.registerPeer("RxRTF", this);
    },
    
    $include: [ Echo.Sync.RemoteTextComponent._SyncMixins],
    
    /** Constructor. */
    $construct: function() {
        this._remoteInit();
    },
    
    /** @see Echo.Sync.TextComponent#getSupportedPartialProperties */
    getSupportedPartialProperties: function() {
        return this._remoteGetSupportedPartialProperties(
                echopoint.RegexTextFieldSync.prototype.getSupportedPartialProperties.call(this));
    },
    
    /** @see Echo.Sync.TextComponent#processBlur */
    processBlur: function(e) {
    	echopoint.RegexTextFieldSync.prototype.processBlur.call(this, e);
        this._remoteBlur();
    },
    
    /** @see Echo.Sync.TextComponent#processFocus */
    processFocus: function(e) {
    	echopoint.RegexTextFieldSync.prototype.processFocus.call(this, e);
        this._remoteFocus();
    },
    
    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
        echopoint.RegexTextFieldSync.prototype.renderAdd.call(this, update, parentElement);
        this._remoteAdd();
    },
    
    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
        this._remoteDispose();
        echopoint.RegexTextFieldSync.prototype.renderDispose.call(this, update);
    },
    
    /** @see Echo.Render.ComponentSync#renderUpdate */
    renderUpdate: function(update) {
        this._remoteUpdate();
        echopoint.RegexTextFieldSync.prototype.renderUpdate.call(this, update);
    }
});
