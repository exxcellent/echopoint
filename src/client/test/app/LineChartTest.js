/**
 * A test class for the echopoint.google.LineChart client-side component.
 * Displays simple and multi value charts to test Google Chart API interaction.
 *
 * @author Rakesh 2008-08-08
 * @version $Id$
 */
echopoint.test.LineChartTest = Core.extend(
{
  $construct: function( testArea )
  {
    testArea.add( this._createSimple() );
    testArea.add( this._createComplex() );
  },

  _createSimple: function()
  {
    var xdata = [ 0,30,60,70,90,95,100 ];
    var xmax = 110;

    var data = new echopoint.google.ChartData( xdata, xmax );
    data.color = "00ff00";

    return new echopoint.google.LineChart(
    {
      renderId: "echopointUnitTestSimpleLineChart",
      styleName: "SimpleChart",
      data: [ data ]
    });
  },

  _createComplex: function()
  {
    var data = new Array();
    data[0] = new echopoint.google.ChartData(
        [ 0, 30, 60, 70, 90, 95, 100 ], 110 );
    data[0].ydata = [ 20,30,40,50,60,70,80 ];
    data[0].ymax = 100;

    data[1] = new echopoint.google.ChartData(
        [ 10,30,40,45,52 ], 60 );
    data[1].ydata = [ 100,90,40,20,10 ]
    data[1].ymax = 110;

    data[2] = new echopoint.google.ChartData( [ -1 ], 0 );
    data[2].ydata = [ 5,33,50,55,7 ];
    data[2].ymax = 60;

    return new echopoint.google.LineChart(
    {
      renderId: "echopointUnitTestStrutComplexLineChart",
      styleName: "ComplexChart",
      data: data
    });
  }
});
