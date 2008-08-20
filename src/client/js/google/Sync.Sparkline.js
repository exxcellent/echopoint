/**
 * Component rendering peer: Sparkline
 *
 * @author Rakesh 2008-08-20
 * @version: $Id$
 */
echopoint.google.SparklineSync = Core.extend(
    echopoint.google.internal.AdvancedChartSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.SPARKLINE, this );
  },

  /** Over-ridden to return the appropriate chart type. */
  getChartType: function()
  {
    return echopoint.google.Sparkline.CHART_TYPE;
  }
});
