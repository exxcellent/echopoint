/**
 * A test class for the echopoint.google.RadarChart client-side component.
 * Displays simple and multi value charts to test Google Chart API interaction.
 *
 * @author Rakesh 2008-08-24
 * @version $Id$
 */
echopoint.test.RadarChartTest = Core.extend(
{
  $construct: function( testArea )
  {
    testArea.add( this._createStraight() );
    testArea.add( this._createSpline() );
  },

  _createStraight: function()
  {
    var xdata = [ 30,60,70,90,95,110 ];
    var xmax = 120;

    var markers = new Array();
    markers[0] = new echopoint.google.model.ShapeMarker( "o", "ff3333", 5 );

    var data = new echopoint.google.model.ChartData( xdata, xmax );
    data.color = "00ff00";
    data.markers = markers;

    var title = new echopoint.google.model.Title();
    title.add( "Simple Chart" );

    var labels = new Array();
    labels[0] = [ "0", "20", "40", "60", "80", "100" ];
    labels[1] = [ "0", "25", "50", "75", "100" ];

    var ranges = new Array();
    ranges[0] = new echopoint.google.model.Range( 20, 125 );
    ranges[1] = new echopoint.google.model.Range( 25, 150 );

    var rangeMarkers = new Array();
    rangeMarkers[0] = new echopoint.google.model.RangeMarker( "r", "ff0000", 0.1, 0.11 );
    rangeMarkers[1] = new echopoint.google.model.RangeMarker( "R", "0000ff", 0.1, 0.11 );

    return new echopoint.google.RadarChart(
    {
      renderId: "echopointUnitTestSimpleRadarChart",
      styleName: "ComplexChart",
      lineStyle: "r",
      data: [ data ],
      title: title,
      axisLabels: labels,
      axisRanges: ranges,
      rangeMarkers: rangeMarkers
    });
  },

  _createSpline: function()
  {
    var markers1 = new Array();
    markers1[0] = new echopoint.google.model.ShapeMarker( "a", "00ff33", 7 );
    markers1[1] = new echopoint.google.model.ShapeMarker( "c", "00ff33", 7 );
    markers1[2] = new echopoint.google.model.ShapeMarker( "d", "00ff33", 7 );
    markers1[3] = new echopoint.google.model.ShapeMarker( "o", "00ff33", 7 );
    markers1[4] = new echopoint.google.model.ShapeMarker( "s", "00ff33", 7 );
    markers1[5] = new echopoint.google.model.ShapeMarker( "tValue+7", "00ff33", 7 );
    markers1[6] = new echopoint.google.model.ShapeMarker( "x", "00ff33", 7 );

    var data = new Array();
    data[0] = new echopoint.google.model.ChartData(
        [ 0, 30, 60, 70, 90, 95, 100 ], 110 );
    data[0].ydata = [ 20,30,40,50,60,70,80 ];
    data[0].ymax = 100;
    data[0].legend = "First";
    data[0].markers = markers1;

    var markers2 = new Array();
    markers2[0] = new echopoint.google.model.ShapeMarker( "x", "ff00ff", 7 );
    markers2[1] = new echopoint.google.model.ShapeMarker( "s", "ff00ff", 7 );
    markers2[2] = new echopoint.google.model.ShapeMarker( "o", "ff00ff", 7 );
    markers2[3] = new echopoint.google.model.ShapeMarker( "d", "ff00ff", 7 );
    markers2[4] = new echopoint.google.model.ShapeMarker( "c", "ff00ff", 7 );
    markers2[5] = new echopoint.google.model.ShapeMarker( "a", "ff00ff", 7 );

    data[1] = new echopoint.google.model.ChartData(
        [ 10,30,40,45,52 ], 60 );
    data[1].ydata = [ 100,90,40,20,10 ]
    data[1].ymax = 110;
    data[1].legend = "Second";
    data[1].markers = markers2;

    var markers3 = new Array();
    markers3[0] = new echopoint.google.model.ShapeMarker( "x", "ff3300", 7 );
    markers3[1] = new echopoint.google.model.ShapeMarker( "a", "ff3300", 7 );
    markers3[2] = new echopoint.google.model.ShapeMarker( "o", "ff3300", 7 );
    markers3[3] = new echopoint.google.model.ShapeMarker( "c", "ff3300", 7 );
    markers3[4] = new echopoint.google.model.ShapeMarker( "t", "ff3300", 7 );

    data[2] = new echopoint.google.model.ChartData( [ -1 ], 0 );
    data[2].ydata = [ 5,33,50,55,7 ];
    data[2].ymax = 60;
    data[2].legend = "Third";
    data[2].markers = markers3;

    var title = new echopoint.google.model.Title( "Complex Chart" );
    title.add( "Multiple Line Title" );

    var labels = new Array();
    labels[0] = [ 0, 20, 40, 60, 80, 100 ];
    labels[1] = [ 0, 25, 50, 75, 100 ];
    labels[2] = [ "Min", "One Third", "Full" ];
    labels[3] = [ 0, 50, 100 ];

    var positions = new Array();
    positions[0] = [];
    positions[1] = [];
    positions[2] = [ 0, 3, 10 ]; // No idea what values to show, this does not work
    positions[3] = [];

    var lineStyles = new Array();
    lineStyles[0] = new echopoint.google.model.LineStyle( 3, 6, 3 );
    lineStyles[1] = new echopoint.google.model.LineStyle( 2, 4, 2 );
    lineStyles[2] = new echopoint.google.model.LineStyle( 4 );

    var ranges = new Array();
    ranges[0] = new echopoint.google.model.RangeMarker( "r", "e5ecf9", 0.35, 0.25 );
    ranges[1] = new echopoint.google.model.RangeMarker( "R", "a0bae9", 0.35, 0.25 );


    var fillArea = new Array();
    fillArea[0] = new echopoint.google.model.FillArea( "b", "224499", 0, 1 );
    fillArea[1] = new echopoint.google.model.FillArea( "b", "76a4fb", 1, 2 );

    return new echopoint.google.RadarChart(
    {
      renderId: "echopointUnitTestStrutComplexRadarChart",
      styleName: "ComplexChart",
      lineStyle: "rs",
      data: data,
      title: title,
      axisLabels: labels,
      labelPositions: positions,
      lineStyles: lineStyles,
      rangeMarkers: ranges,
      fillArea: fillArea
    });
  }
});
