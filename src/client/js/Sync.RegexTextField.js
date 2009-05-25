/**
 * Component rendering peer: RegexTextField
 *
 * @author Rakesh 2009-03-08
 * @version: $Id$
 */
echopoint.RegexTextFieldSync = Core.extend( echopoint.internal.TextFieldSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.REGEX_TEXT_FIELD, this );
  },

  /** The filter function implementation. */
  doFilter: function( event )
  {
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;

    if ( ( charCode <= 31 ) || ( charCode == 37 ) || ( charCode == 39 ) )
    {
      this.status = true;
      return this.status;
    }

    // Disable paste explicitly
    if ( ( event.metaKey || event.ctrlKey ) &&  ( charCode == 118 ) )
    {
      return false;
    }

    var regexString = this.component.render( echopoint.RegexTextField.REGEX );
    if ( regexString )
    {
      var position = this.getCaretPosition();
      var regex = new RegExp( regexString );
      var value = this.input.value.substring( 0, position ) +
                  String.fromCharCode( charCode ) +
          this.input.value.substring( position );
      this.status = regex.test( value );
    }

    return this.status;
  },

  $construct: function()
  {
    echopoint.internal.TextFieldSync.call( this );
  }
});


