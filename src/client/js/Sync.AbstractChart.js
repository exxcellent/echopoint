/**
 * Component rendering peer: AbstractChart
 *
 * @author Rakesh 2008-08-08
 * @version: $Id$
 */
echopoint.internal.AbstractChartSync = Core.extend( echopoint.internal.AbstractContainerSync,
{
  $abstract: true,

  $static:
  {
    ALT_CONTENT: "Echopoint Chart",

    // An array of colours that will be sequentially applied to each data
    // set defined in the DATA property.
    COLORS: [ "ff0033", "66ffff", "00ff33", "ffcc00", "ff00ff",
      "3399ff", "996666", "ff3333", "9933ff", "ffff33" ]
  },

  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.ABSTRACT_CHART, this );
  },

  $virtual:
  {
    /** The encoding matrix used to encode numbers. */
    simpleEncoding: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",

    /** The container element that is used to render the chart. */
    _chart: null,

    /**
     * The function used to encode the chart data using simple encoding
     * using sample code from Google.
     *
     * @param data The ChartData model object that represents a data set that
      *  is to be plotted.  The numbers are converted to simple encoded format.
     * @return The encoded string that represents the array of numbers.
     */
    encode: function( data )
    {
      if ( ! data ) return "";

      var chartData = new Array();
      this._encodeXData( data, chartData );
      this._encodeYData( data, chartData );

      return chartData.join( "" );
    },

    /** Return the <code>alt</code> attribute for the image */
    getAltContent: function()
    {
      var alt = this.component.get( echopoint.internal.AbstractChart.ALT );
      return ( alt ) ? alt : echopoint.internal.AbstractChartSync.ALT_CONTENT;
    },

    /**
     * Return the colours to set to plot data set.
     *
     * @return The URL parameter that may be added to the Google Chart API URL
     */
    getColors: function()
    {
      var data = this.component.get( echopoint.internal.AbstractChart.DATA );
      var url = "&chco=";
      var index = 0;
      var size = echopoint.internal.AbstractChartSync.COLORS.length;

      for ( var i = 0; i < data.length; ++i )
      {
        if ( data[i].color )
        {
          url += data[i].color;
        }
        else
        {
          index = i % size;
          url += echopoint.internal.AbstractChartSync.COLORS[index];
        }

        if ( i != data.length - 1 ) url += ",";
      }

      return url;
    },

    /**
     * Return the solid fill to apply to the chart.  Implementations must
     * over-ride to add support for additional fill properties than the
     * base supported by all charts.  Note that it is not safe to invoke
     * this implementation from over-ridden sub-class implementations.
     */
    getSolidFill: function()
    {
      var url = "&chf=";

      var background = this.component.render( echopoint.internal.AbstractChart.BACKGROUND_FILL );
      if ( background ) url += "bg,s," + background;

      return url;
    }
  },

  /** Encode the {@link echopoint.google.ChartData#xdata} array of values. */
  _encodeXData: function( data, chartData )
  {
    var xmax = data.getXMax();

    for ( var i = 0; i < data.xdata.length; i++ )
    {
      var currentValue = data.xdata[i];

      if ( !isNaN( currentValue ) && currentValue >= 0 )
      {
        chartData.push( this.simpleEncoding.charAt(
            Math.round( ( this.simpleEncoding.length - 1 ) *
                        currentValue / xmax ) ) );
      }
      else
      {
        chartData.push( "_" );
      }
    }
  },

  /** Encode the {@link echopoint.google.ChartData#ydata} array of values. */
  _encodeYData: function( data, chartData )
  {
    if ( data.ydata )
    {
      chartData.push( "," );
      var ymax = data.getYMax();

      for ( var i = 0; i < data.ydata.length; i++ )
      {
        var currentValue = data.ydata[i];

        if ( !isNaN( currentValue ) && currentValue >= 0 )
        {
          chartData.push( this.simpleEncoding.charAt(
              Math.round( ( this.simpleEncoding.length - 1 ) *
                          currentValue / ymax ) ) );
        }
        else
        {
          chartData.push( "_" );
        }
      }
    }
  }
});
