/**
 * Component rendering peer: Meter
 *
 * @author Rakesh 2008-08-27
 * @version: $Id$
 */
echopoint.google.MeterSync = Core.extend(
    echopoint.google.internal.AbstractChartSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.METER, this );
  },

  /** Over-ridden to return the appropriate chart type. */
  getChartType: function()
  {
    return echopoint.google.Meter.CHART_TYPE;
  },

  /**
   * Over-ridden to configure the map regions and colours.
   *
   * @see #setLabel
   * @param url The url object that is to be updated.
   * @return The updated url object.
   */
  setAdditionalParameters: function( url )
  {
    url = this.setLabel( url );
    return url;
  },

  /**
   * Set the label for the meter.
   *
   * @param url The url object that is to be updated.
   * @return The updated url object.
   */
  setLabel: function( url )
  {
    var label = this.component.render( echopoint.google.Meter.LABEL );

    if ( label )
    {
      url += "&chl=" + label;
    }

    return url;
  }
});
