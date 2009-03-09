/**
 * Component rendering peer: NumberTextField
 *
 * @author Rakesh 2009-03-07
 * @version: $Id$
 */
echopoint.NumberTextFieldSync = Core.extend( echopoint.RegexTextFieldSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.NUMBER_TEXT_FIELD, this );
  },

  $construct: function()
  {
    echopoint.RegexTextFieldSync.call( this );
  },

  renderAdd: function( update, parentElement )
  {
    echopoint.RegexTextFieldSync.prototype.renderAdd.call(
        this, update, parentElement );

    var precision = this.component.render( echopoint.NumberTextField.PRECISION );
    if ( precision )
    {
      var str = echopoint.NumberTextField.FRACTION_REGEX + precision + "}$";
      this.component.set( echopoint.RegexTextField.REGEX, str );
    }
    else
    {
      this.component.set( echopoint.RegexTextField.REGEX,
          echopoint.NumberTextField.NUMBER_REGEX );
    }
  }
});



