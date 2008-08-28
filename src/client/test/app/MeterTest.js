/**
 * A test class for the echopoint.google.Meter client-side component.
 * Displays simple and multi value charts to test Google Chart API interaction.
 *
 * @author Rakesh 2008-08-27
 * @version $Id$
 */
echopoint.test.MeterTest = Core.extend(
{
  $construct: function( testArea )
  {
    testArea.add( this._createMeter() );
  },

  _createMeter: function()
  {
    var xdata = [ 70 ];
    var data = new echopoint.google.model.ChartData( xdata, 100 );
    var title = new echopoint.google.model.Title();
    title.add( "Google-o-meter" );

    return new echopoint.google.Meter(
    {
      renderId: "echopointUnitTestSimpleMeter",
      styleName: "SimpleChart",
      data: [ data ],
      title: title
    });
  }
});
