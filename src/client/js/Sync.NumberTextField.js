/**
 * Component rendering peer: NumberTextField
 *
 * @author Rakesh 2009-03-07
 * @version: $Id$
 */
echopoint.NumberTextFieldSync = Core.extend( echopoint.internal.TextFieldSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.NUMBER_TEXT_FIELD, this );
  },

  /** Over-ridden to allow only numeric keys and the period key. */
  doFilter: function( event )
  {
    event = ( event ) ? event : window.event;
    var charCode = ( event.which ) ? event.which : event.keyCode;

    if ( charCode == 13 )
    {
      this.status = true;
      return this.status;
    }

    this.status = !( charCode > 31 && ( charCode < 48 || charCode > 57 ) );
    if ( this.input.value.indexOf( "." ) == -1 )
    {
      this.status = this.status || ( charCode == 46 );
    }

    return this.status;
  },

  $construct: function()
  {
    echopoint.internal.TextFieldSync.call( this );
  }
});



