/**
 * Component rendering peer: LineChart
 *
 * @author Rakesh 2008-08-08
 * @version: $Id$
 */
echopoint.google.LineChartSync = Core.extend( echopoint.internal.AbstractChartSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.LINE_CHART, this );
  },

  $static:
  {
    DEFAULT_HEIGHT: "600",
    DEFAULT_WIDTH: "500",
    ALT: "alt"
  },

  renderAdd: function( update, parentElement )
  {
    this._chart = document.createElement( "img" );
    this._chart.id = this.component.renderId;
    this.renderStyle( this._chart );

    this._chart.setAttribute( "src", this._getUrl() );
    this._chart.setAttribute( "alt", this.getAltContent() );

    parentElement.appendChild( this._chart );
  },

  renderDispose: function( update )
  {
    this._chart = null;
  },

  renderUpdate: function( update )
  {
    var parent = this._chart.parentNode;
    this.renderDispose( update );
    this.renderAdd( update, parent );
  },

  /** Over-ridden to return the value to use. */
  getDefaultHeight: function() { return echopoint.google.LineChartSync.DEFAULT_HEIGHT; },

  /** Over-ridden to return the value to use. */
  getDefaultWidth: function() { return echopoint.google.LineChartSync.DEFAULT_WIDTH; },

  /**
   * Return the solid fill to apply to the chart.  Over-ridden to add
   * support for chart fill and transparency.  Note that the colour values
   * are of the <code>RRGGBB&lt;TT&gt;</code> format hexadecimal strings,
   * where the optional <code>TT</code> values represent the transparency
   * to apply to the colour.
   */
  getSolidFill: function()
  {
    var url = "&chf=";

    var transparency = this.component.render( echopoint.google.LineChart.TRANSPARENCY );
    if ( transparency )
    {
      url += "a,s," + transparency;
      return url;
    }

    var background = this.component.render( echopoint.internal.AbstractChart.BACKGROUND_FILL );
    var foreground = this.component.render( echopoint.google.LineChart.CHART_FILL );
    var gradient = this.component.render( echopoint.google.LineChart.LINEAR_GRADIENT );

    if ( gradient )
    {
      if ( background )
      {
        url += "c,lg," + gradient
        url += "|bg,s," + background;
      }
      else
      {
        url += "bg,lg," + gradient
      }
    }
    else
    {
      if ( background )
      {
        url += "bg,s," + background;
      }

      if ( foreground )
      {
        if ( background ) url += "|";
        url += "c,s," + foreground;
      }
    }

    return url;
  },

  /** Create the Google Chart API URL to use with this chart. */
  _getUrl: function()
  {
    var data = this.component.get( echopoint.internal.AbstractChart.DATA );

    var url = "http://chart.apis.google.com/chart?chs=";
    url += this.getWidth() + "x" + this.getHeight();
    url += "&cht=" + ( ( data[0].ydata ) ?
                       echopoint.google.LineChart.XY_DATA : echopoint.google.LineChart.X_DATA );
    url += "&chd=s:";

    for ( var i = 0; i < data.length; ++i )
    {
      if ( i > 0 ) url += ",";
      url += this.encode( data[i] );
    }

    url += this.getColors();
    url += this.getSolidFill();
    url += "&alt=" + this.getAltContent();
    return url;
  }
});
