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

  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.REGEX_TEXT_FIELD, this );
  },

    $virtual: 
    {
      clientKeyPressRejected: function( event ) 
      { 
        Core.Web.DOM.preventEventDefault(event.domEvent);
        return false;
      },
  
      clientKeyPressAccepted: function( event ) 
      { 
        return echopoint.internal.TextFieldSync.prototype.clientKeyPress.call(this, event);
      },
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
