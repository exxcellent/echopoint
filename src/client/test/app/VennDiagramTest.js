/**
 * A test class for the echopoint.google.VennDiagram client-side component.
 * Displays simple bar charts to test Google Chart API interaction.
 *
 * @author Rakesh 2008-08-22
 * @version $Id$
 */
echopoint.test.VennDiagramTest = Core.extend(
{
  $construct: function( testArea )
  {
    testArea.add( this._createChart() );
  },

  _createChart: function()
  {
    var data = new Array();
    data[0] = new echopoint.google.model.ChartData(
        [ 100, 80, 60, 30, 30, 30, 10 ] );

    var title = new echopoint.google.model.Title( "Venn Diagram" );

    return new echopoint.google.VennDiagram(
    {
      renderId: "echopointUnitTestStrutComplexVennDiagram",
      styleName: "VennDiagram",
      data: data,
      title: title
    });
  }
});
