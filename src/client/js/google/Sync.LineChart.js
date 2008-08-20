/**
 * Component rendering peer: LineChart
 *
 * @author Rakesh 2008-08-08
 * @version: $Id$
 */
echopoint.google.LineChartSync = Core.extend(
    echopoint.google.internal.AdvancedChartSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.LINE_CHART, this );
  },

  /** Over-ridden to return the appropriate chart type. */
  getChartType: function()
  {
    var data = this.getData();
    return ( ( data[0].ydata ) ? echopoint.google.LineChart.XY_DATA :
             echopoint.google.LineChart.X_DATA );
  }
});
