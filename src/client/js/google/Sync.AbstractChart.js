/**
 * Component rendering peer: AbstractChart
 *
 * <p>All chart implementations must implement the {@link #getChartType}
 * abstract method.</p>
 *
 * @author Rakesh 2008-08-08
 * @version: $Id$
 */
echopoint.google.internal.AbstractChartSync = Core.extend(
    echopoint.internal.AbstractContainerSync,
{
  $abstract: true,

  $static:
  {
    ALT_CONTENT: "Echopoint Chart",
    ALT: "alt",

    // An array of colours that will be sequentially applied to each data
    // set defined in the DATA property.
    COLORS: [ "ff0033", "66ffff", "00ff33", "ffcc00", "ff00ff",
      "3399ff", "996666", "ff3333", "9933ff", "ffff33" ],

    DEFAULT_HEIGHT: "600",
    DEFAULT_WIDTH: "500"
  },

  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.ABSTRACT_CHART, this );
  },

  $virtual:
  {
    /** The encoding matrix used to encode numbers. */
    _simpleEncoding: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",

    /** The container element that is used to render the chart. */
    _chart: null,

    /**
     * Abstract method that is used to return the chart type value to set.
     * Implementations <b>must</b> implement this method to return the
     * chart type appropriate to it.
     */
    getChartType: function() { throw "getChartType must be implemented"; },

    /**
     * Set the axis labels for the chart.  Since axis label support differs
     * based upon the type of chart, the default implementation does nothing.
     * Sub-classes must over-ride as appropriate.
     *
     * @param url The url that is to be updated.
     * @return The modified url object.
     */
    setAxisLabels: function( url ) { return url; },

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

    /**
     * Create the Google Chart API URL to use with this chart.
     *
     * @see #getChartType
     * @see #encode
     * @see #setAxisLabels
     * @see #setColors
     * @see #setLegend
     * @see #setLegendPosition
     * @see #setFill
     * @see #setTitle
     * @see #setFont
     * @see #setAltContent
     **/
    getUrl: function()
    {
      var data = this.component.get( echopoint.google.internal.AbstractChart.DATA );

      var url = "http://chart.apis.google.com/chart?chs=";
      url += this.getWidth() + "x" + this.getHeight();
      url += "&cht=" + this.getChartType();
      url += "&chd=s:";

      for ( var i = 0; i < data.length; ++i )
      {
        if ( i > 0 ) url += ",";
        url += this.encode( data[i] );
      }

      url = this.setAxisLabels( url );
      url = this.setColors( url );
      url = this.setLegend( url );
      url = this.setLegendPosition( url );
      url = this.setFill( url );
      url = this.setTitle( url );
      url = this.setFont( url );
      url = this.setAltContent( url );

      return url;
    },

    /** Return the alt content to use for the chart and image. */
    getAltContent: function()
    {
      var alt = this.component.get( echopoint.google.internal.AbstractChart.ALT );
      return ( ( alt ) ? alt :
                         echopoint.google.internal.AbstractChartSync.ALT_CONTENT );
    },

    /**
     * Set the <code>alt</code> attribute for the image.
     *
     * @see #getAltContent
     */
    setAltContent: function( url )
    {
      url += "&alt=" + this.getAltContent();
      return url;
    },

    /**
     * Add the colours to set to plot data set.
     *
     * @param The URL that will be updated.
     * @return The modified URL object.
     */
    setColors: function( url )
    {
      var data = this.component.get( echopoint.google.internal.AbstractChart.DATA );
      url += "&chco=";
      var index = 0;
      var size = echopoint.google.internal.AbstractChartSync.COLORS.length;

      for ( var i = 0; i < data.length; ++i )
      {
        if ( data[i].color )
        {
          url += data[i].color;
        }
        else
        {
          index = i % size;
          url += echopoint.google.internal.AbstractChartSync.COLORS[index];
        }

        if ( i != data.length - 1 ) url += ",";
      }

      return url;
    },

    /**
     * Set the legends for the data set if specified.
     *
     * @param The URL that will be updated.
     * @return The modified URL object.
     */
    setLegend: function( url )
    {
      var data = this.component.get( echopoint.google.internal.AbstractChart.DATA );
      if ( ! data[0].legend ) return url;
      url += "&chdl=";

      for ( var i = 0; i < data.length; ++i )
      {
        url += data[i].legend;
        if ( i != data.length - 1 ) url += "|";
      }

      return url;
    },

    /**
     * Set the legend position for the chart.  This will have no effect if no
     * legend has been specified.
     *
     * @param The URL that will be updated.
     * @return The modified URL object.
     */
    setLegendPosition: function( url )
    {
      var position = this.component.render(
          echopoint.google.internal.AbstractChart.LEGEND_POSITION );
      if ( position ) url += "&chdlp=" + position;
      return url;
    },

    /** Set the fill to apply to the chart. */
    setFill: function( url )
    {
      var fill = this.component.render( echopoint.google.internal.AbstractChart.FILL );
      if ( fill ) url += "&chf=" + fill;

      return url;
    },

    /** Set the font style to apply to the chart title. */
    setFont: function( url )
    {
      url += "&chts=";

      var foreground = this.component.render(
          echopoint.internal.AbstractContainer.FOREGROUND );
      url += ( foreground ) ? foreground : "000000";

      var font = this.component.render( echopoint.internal.AbstractContainer.FONT );
      if ( font )
      {
        url += "," + font.size;
      }

      return url;
    },

    /** Return the title for the chart. */
    setTitle: function( url )
    {
      var title = this.component.get( echopoint.google.internal.AbstractChart.TITLE );
      if ( title ) url += "&chtt=" + title.getText();
      return url;
    }
  },

  renderAdd: function( update, parentElement )
  {
    this._chart = document.createElement( "img" );
    this._chart.id = this.component.renderId;
    this.renderStyle( this._chart );

    this._chart.setAttribute( "src", this.getUrl() );
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
  getDefaultHeight: function() { return echopoint.google.internal.AbstractChartSync.DEFAULT_HEIGHT; },

  /** Over-ridden to return the value to use. */
  getDefaultWidth: function() { return echopoint.google.internal.AbstractChartSync.DEFAULT_WIDTH; },

  /** Encode the {@link echopoint.google.model.ChartData#xdata} array of values. */
  _encodeXData: function( data, chartData )
  {
    var xmax = data.getXMax();

    for ( var i = 0; i < data.xdata.length; i++ )
    {
      var currentValue = data.xdata[i];

      if ( !isNaN( currentValue ) && currentValue >= 0 )
      {
        chartData.push( this._simpleEncoding.charAt(
            Math.round( ( this._simpleEncoding.length - 1 ) *
                        currentValue / xmax ) ) );
      }
      else
      {
        chartData.push( "_" );
      }
    }
  },

  /** Encode the {@link echopoint.google.model.ChartData#ydata} array of values. */
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
          chartData.push( this._simpleEncoding.charAt(
              Math.round( ( this._simpleEncoding.length - 1 ) *
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
