/**
 * Component rendering peer: PieChart
 *
 * @author Rakesh 2008-08-21
 * @version: $Id$
 */
echopoint.google.PieChartSync = Core.extend(
    echopoint.google.internal.SimpleChartSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.PIE_CHART, this );
  },

  /** Over-ridden to return the appropriate chart type. */
  getChartType: function()
  {
    return this.component.render( echopoint.google.PieChart.DIMENSIONS,
        echopoint.google.PieChart.TWO_DIMENSIONAL );
  },

  /**
   * Set the labels for the pie chart.  Labels are specified as an array
   * of string values, or as a string in the pipe delimited format as required
   * by Google Chart API.
   *
   * @param url The url string to be updated.
   * @return The modified url object.
   */
  setLabels: function( url )
  {
    var labels = this.component.get( echopoint.google.PieChart.LABELS );
    if ( ! labels ) return url;

    url += "&chl=";

    if ( labels instanceof Array )
    {
      url += labels.join( "|" );
    }
    else
    {
      url += labels;
    }

    return url;
  },

  /**
   * Over-ridden to apply the labels for the pie chart.
   *
   * @see #setLabels
   * @param url
   */
  setAdditionalParameters: function( url )
  {
    return this.setLabels( url );
  },

  /** Over-ridden to not process since pie charts do not support legends. */
  setLegend: function( url ) { return url; },

  /** Over-ridden to not process since pie charts do not support legends. */
  setLegendPosition: function( url ) { return url; }
});
