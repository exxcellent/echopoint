/**
 * Component rendering peer: VennDiagram
 *
 * @author Rakesh 2008-08-22
 * @version: $Id$
 */
echopoint.google.VennDiagramSync = Core.extend(
    echopoint.google.internal.SimpleChartSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.VENN_DIAGRAM, this );
  },

  /** Over-ridden to return the appropriate chart type. */
  getChartType: function()
  {
    return echopoint.google.VennDiagram.CHART_TYPE;
  }
});
