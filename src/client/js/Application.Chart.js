/**
 * Component definitions for the Google Chart API chart components.  All
 * charts are derived from the {@link echopoint.internal.AbstractChart}
 * super class.
 *
 * @author Rakesh 2008-08-08
 * @version $Id$
 */

/** The name of the AbstractChart component. */
echopoint.constants.ABSTRACT_CHART = "echopoint.internal.AbstractChart";

/** The name of the LineChart component. */
echopoint.constants.LINE_CHART = "echopoint.google.LineChart";

/**
 * The class definition for the abstract chart component that is the root
 * component from which <a href='http://code.google.com/apis/chart/'>Google
 * Chart API</a> components are derived.
 */
echopoint.internal.AbstractChart = Core.extend( Echo.Component,
{
  $abstract: true,

  /** Properties defined for this component. */
  $static:
  {
    ALIGNMENT: "alignment",
    ALT: "alt",

    /**
     * The background fill property for the chart.  All chart types support
     * background fill.  Chart implementations may define additional solid
     * fill properties as supported by Google.  Note that this fill
     * property will over-ride any other fill proeprty specified since only
     * one type of fill is supported per chart.  Values specified must be
     * <code>RRGGBB</code> format hexadecimal string.
     */
    BACKGROUND_FILL: "backgroundFill",

    BORDER: "border",
    INSETS: "insets",

    /**
     * Note that only raw numbers without units are to be specified for
     * chart dimensions
     */
    HEIGHT: "height",
    WIDTH: "width",

    /**
     * An array of ChartData model objects that are to be plotted.
     * Note that all elements of the array should have the same type of model.
     * Either all model elements must be simple (only xdata), or should have
     * both xdata and ydata
     */
    DATA: "data"
  },

  $load: function()
  {
    Echo.ComponentFactory.registerType(
        echopoint.constants.ABSTRACT_CHART, this );
  }
});

/**
 * The class definition for line chart type supported by
 * <a href='http://code.google.com/apis/chart/'>Google Chart API</a>.
 */
echopoint.google.LineChart = Core.extend( echopoint.internal.AbstractChart,
{
  /** Constants to control the chart type as defined by google. */
  $static:
  {
    X_DATA: "lc", // Multiple data sets are plotted as different lines
    XY_DATA: "lxy", // Each line is represented by two sets of data for x and y

    /**
     * The fill colour for the chart.  All charts support specifying the
     * chart fill colour.  Values specified must be <code>RRGGBB</code>
     * format hexadecimal string.
     */
    CHART_FILL: "chartFill",

    /**
     * A linear gradient to apply to the chart.  This will be applied to
     * <code>CHART_FILL</code> if <code>BACKGROUND_FILL</code> is defined,
     * otherwise, it will be applied to <code>BACKGROUND_FILL</code>.  When
     * specifying this property, ensure that at most only
     * <code>BACKGROUND_FILL</code> is specified.  Linear gradient is defined
     * as <code>&lt;Angle&gt;,RRGGBB,&lt;Offset1&gt;,RRGGBB,&lt;Offset2&gt;</code>.
     * The components of a linear gradient are defined as:
     *
     * <ol>
     *   <li><code>Angle</code> - The angle of the gradient between 0
     *   (horizontal) and 90 (vertical).</li>
     *   <li><code>RRGGBB</code> - The first hexadecimal colour value to apply.</li>
     *   <li><code>Offset1</code> - The point the first colour is pure where:
      *  0 specifies the right-most chart position and 1 the left-most.</li>
     *   <li><code>RRGGBB</code> - The second hexadecimal colour value to apply.</li>
     *   <li><code>Offset1</code> - The point the second colour is pure where:
     *  0 specifies the right-most chart position and 1 the left-most.</li>
     * </ol>
     */
    LINEAR_GRADIENT: "linearGradient",

    /**
     * The fill colour for the chart as a whole.  The colour value must be
     * specified in <code>RRGGBBTT</code> hexadecimal string format, where
     * <code>TT</code> represents the transparency to apply as a hexadecimal
     * value.  Note that specifying this value renders the
     * <code>BACKGROUND_FILL</code> and <code>CHART_FILL</code> properties
     * redundant since they are not applied.
     */
    TRANSPARENCY: "transparency"
  },

  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.LINE_CHART, this );
  },

  componentType: echopoint.constants.LINE_CHART
});

/**
 * The model object that is used to represent the data to be plotted.
 * Each object contains a mandatory <code>xdata</code> array that contains
 * the array of numbers to be plotted along the x-axis.  An optional
 * <code>ydata</code> array may be specified that contains the corresponding
 * y-axis values.  The <code>xmax</code> is mandatory is used to ensure a
 * gap between the chart boundary and maximum chart data value.  The
 * <code>ymax</code> is optional and should be specified if <code>ydata</code>
 * is specified.  Each chart object takes an array of these model objects
 * allowing plotting multiple data data sequences in the same chart.
 */
echopoint.google.ChartData = Core.extend(
{
  /** The mandatory array of numbers to be displayed along the x-axis. */
  xdata: new Array(),

  /** The mandatory maximum value to use for numbers plotted along x-axis. */
  xmax: null,

  /** The optional array of numbers to be displayed along the y-axis. */
  ydata: null,

  /** The maximum value to use for the numbers plotted long y-axie. */
  ymax: null,

  /**
   * The colour to apply to the data set.  Default values will be assigned
   * sequentially from the colour set defined in {@link
   * echopoint.internal.AbstractChartSync#COLORS}.
   */
  color: null,

  $construct: function( xvalues, xmaximum )
  {
    this.xdata = xvalues;
    this.xmax = xmaximum;
  },

  /**
   * Return the {@link #xmax} value.  If {@link xmax} is not defined, return
   * the maximum value from {@link #xdata}.
   */
  getXMax: function()
  {
    if ( this.xmax ) return this.xmax;

    var maxValue = -1;
    for ( var i = 0; i < this.xdata.length; ++i )
    {
      var currentValue = this.xdata[i];
      if ( currentValue > maxValue ) maxValue = currentValue;
    }

    return maxValue;
  },

  /**
   * Return the {@link #ymax} value.  If {@link ymax} is not defined, return
   * the maximum value from {@link #ydata}.
   */
  getYMax: function()
  {
    if ( this.ymax ) return this.ymax;

    var maxValue = -1;
    for ( var i = 0; i < this.ydata.length; ++i )
    {
      var currentValue = this.ydata[i];
      if ( currentValue > maxValue ) maxValue = currentValue;
    }

    return maxValue;
  }
});

