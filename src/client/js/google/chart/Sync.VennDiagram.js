/**
 * Component rendering peer: VennDiagram
 *
 * @author Rakesh 2008-08-22
 * @version: $Id$
 */
echopoint.google.chart.VennDiagramSync = Core.extend(
    echopoint.google.chart.internal.SimpleChartSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.VENN_DIAGRAM, this );
  },

  /** Over-ridden to return the appropriate chart type. */
  getChartType: function()
  {
    return echopoint.google.chart.VennDiagram.CHART_TYPE;
  }
});
