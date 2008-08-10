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
    var xdata = [ 30,60,70,90,95,110 ];
    var xmax = 120;

    var data = new echopoint.google.ChartData( xdata, xmax );
    data.color = "00ff00";

    var title = new echopoint.google.Title();
    title.add( "Simple Chart" );

    var labels = new Array();
    labels[0] = [ 0, 20, 40, 60, 80, 100 ];
    labels[1] = [ 0, 25, 50, 75, 100 ];

    var ranges = new Array();
    ranges[0] = new echopoint.google.Range( 20, 125 );
    ranges[1] = new echopoint.google.Range( 25, 150 );

    return new echopoint.google.LineChart(
    {
      renderId: "echopointUnitTestSimpleLineChart",
      styleName: "SimpleChart",
      data: [ data ],
      title: title,
      axisLabels: labels,
      axisRanges: ranges
    });
  },

  _createComplex: function()
  {
    var data = new Array();
    data[0] = new echopoint.google.ChartData(
        [ 0, 30, 60, 70, 90, 95, 100 ], 110 );
    data[0].ydata = [ 20,30,40,50,60,70,80 ];
    data[0].ymax = 100;
    data[0].legend = "First";

    data[1] = new echopoint.google.ChartData(
        [ 10,30,40,45,52 ], 60 );
    data[1].ydata = [ 100,90,40,20,10 ]
    data[1].ymax = 110;
    data[1].legend = "Second";

    data[2] = new echopoint.google.ChartData( [ -1 ], 0 );
    data[2].ydata = [ 5,33,50,55,7 ];
    data[2].ymax = 60;
    data[2].legend = "Third";

    var title = new echopoint.google.Title( "Complex Chart" );
    title.add( "Multiple Line Title" );

    var labels = new Array();
    labels[0] = [ 0, 20, 40, 60, 80, 100 ];
    labels[1] = [ 0, 25, 50, 75, 100 ];
    labels[2] = [ "Min", "One Third", "Full" ];
    labels[3] = [ 0, 50, 100 ];

    var positions = new Array();
    positions[0] = [];
    positions[1] = [];
    positions[2] = [ 0, 33.3, 100.0 ]; // No idea what values to show, this does not work
    positions[3] = [];

    var lineStyles = new Array();
    lineStyles[0] = new echopoint.google.LineStyle( 3, 6, 3 );
    lineStyles[1] = new echopoint.google.LineStyle( 2, 4, 2 );
    lineStyles[2] = new echopoint.google.LineStyle( 4 );

    return new echopoint.google.LineChart(
    {
      renderId: "echopointUnitTestStrutComplexLineChart",
      styleName: "ComplexChart",
      data: data,
      title: title,
      axisLabels: labels,
      labelPositions: positions,
      lineStyles: lineStyles
    });
  }
});
