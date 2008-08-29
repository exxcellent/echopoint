/**
 * Component rendering peer: LineChart
 *
 * @author Rakesh 2008-08-08
 * @version: $Id$
 */
echopoint.google.chart.LineChartSync = Core.extend(
    echopoint.google.chart.internal.AdvancedChartSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.LINE_CHART, this );
  },

  /** Over-ridden to return the appropriate chart type. */
  getChartType: function()
  {
    var data = this.getData();
    return ( ( data[0].ydata ) ? echopoint.google.chart.LineChart.XY_DATA :
             echopoint.google.chart.LineChart.X_DATA );
  }
});
