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

  // Override the TextField method: The filter function implementation.
  clientKeyPress: function( event )
  {
    event = event ? event : window.event;
    var charCode = event.domEvent.charCode;
    // Skip copy, cut, paste, select-all, arrow left, arrow right etc.
    if( !event.domEvent.metaKey && !event.domEvent.ctrlKey && !event.domEvent.altKey && charCode > 31 && charCode != 37 && charCode != 39 && this.regexp_filter )
    {
      var position = this.getCaretPosition();
      var value = this.input.value.substring( 0, position ) +
                  String.fromCharCode( charCode ) +
                  this.input.value.substring( position );
      if( !this.regexp_filter.test( value ) )
      {
        Core.Web.DOM.preventEventDefault(event.domEvent);
        return false;
      } 
    }
    return echopoint.internal.TextFieldSync.prototype.clientKeyPress.call(this, event);
  },

  // Run the processPaste after the input field has had text pasted into it (copy+paste from a keyboard or a mouse)
  processPaste: function(event) 
  {
    event = event ? event : window.event;
    this._val_bp = this.input.value;
    Core.Web.Scheduler.run(Core.method(this, this._filterInput), 50, false); // Hak: we have new_value after 50milisec :-)
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
