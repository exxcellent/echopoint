/**
 * Component rendering peer: BarChart
 *
 * @author Rakesh 2008-08-18
 * @version: $Id$
 */
echopoint.google.BarChartSync = Core.extend(
    echopoint.google.internal.AdvancedChartSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.BAR_CHART, this );
  },

  /** Over-ridden to return the appropriate chart type. */
  getChartType: function()
  {
    var orientation = this.component.get( echopoint.google.BarChart.ORIENTATION );
    if ( orientation )
    {
      return orientation;
    }
    else
    {
      return echopoint.google.BarChart.VERTICAL;
    }
  },

  /**
   * Over-ridden to set the addtional sizing and zero line parameters that
   * are supported by bar charts.
   *
   * @see #setWidth
   * @see #setZeroLine
   * @param url The url object that is to be updated.
   * @return The updated url object.
   */
  setAdditionalParameters: function( url )
  {
    url = this.setWidth( url );
    url = this.setZeroLine( url );
    return url;
  },

  /**
   * Set the special bar width and size property for the bar chart.
   *
   * @param url The url object that is to be updated.
   * @return The updated url object.
   */
  setWidth: function( url )
  {
    var size = this.component.render( echopoint.google.BarChart.SIZE );
    if ( size ) url += "&chbh=" + size;
    return url;
  },

  /**
   * Set the special zero-line property for the bar chart.  This property
   * may be styled if so desired, although programmatic use is more likely
   * to be practical.
   */
  setZeroLine: function( url )
  {
    var line = this.component.render( echopoint.google.BarChart.ZERO_LINE );
    if ( line ) url += "&chp=" + line;
    return url;
  }
});
