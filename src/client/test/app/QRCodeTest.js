/**
 * A test class for the echopoint.google.QRCode client-side component.
 * Displays simple and multi value charts to test Google Chart API interaction.
 *
 * @author Rakesh 2008-08-27
 * @version $Id$
 */
echopoint.test.QRCodeTest = Core.extend(
{
  $construct: function( testArea )
  {
    testArea.add( this._createQRCode() );
  },

  _createQRCode: function()
  {
    var title = new echopoint.google.model.Title();
    title.add( "QRCode" );

    var text = "EchoPoint text to be encoded."

    return new echopoint.google.QRCode(
    {
      renderId: "echopointUnitTestSimpleQRCode",
      styleName: "SimpleChart",
      title: title,
      text: text
    });
  }
});
