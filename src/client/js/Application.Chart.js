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
echopoint.internal.AbstractChart = Core.extend( echopoint.internal.AbstractContainer,
{
  $abstract: true,

  /**
   * Properties defined for this component.
   *
   * <p><b>Notes:</b><p>
   * <ol>
   *   <li>Only raw numbers without units are to be specified for
   *   chart dimensions.</li>
   *   <li><code>BACKGROUND</code> is not supported.  Specify
   *   <code>FILL</code> property instead.</li>
   *   <li><code>BACKGROUND_IMAGE</code> is not supported.</li>
   *   <li>Only size number is supported for the font as required by Google
   *   Chart API.  Font typeface has no effect.</li>
   *   <li>Foreground colour applies only to the chart title and must
   *   be specified without the leading <code>#</code> as required by
   *   Google Chart API.</li>
   * </ol>
   */
  $static:
  {
    /**
     * The name of the property that defines the alternate content text for
     * the chart and image.
     */
    ALT: "alt",

    /**
     * The colour fill property for the chart.  Refer to the colour fill
     * and linear gradient notes for the Google Chart API to determine the
     * proper formatted string values that may be specified for charts.
     */
    FILL: "fill",

    /**
     * An array of ChartData model objects that are to be plotted.
     * Note that all elements of the array should have the same type of model.
     * Either all model elements must be simple (only xdata), or should have
     * both xdata and ydata
     */
    DATA: "data",

    /**
     * The legend position for the chart.  Specify the values as defined by
     * the Google Chart API documentation.
     */
    LEGEND_POSITION: "legendPosition",

    /**
     * The title to display for chart.  Must be of type {@link
     * echopoint.google.Title}.
     */
    TITLE: "title"
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
     * The axis type specification for the chart.  This property may be
     * specified as a style.  See
     * <a href='http://code.google.com/apis/chart/#axis_type'>Axis type</a>
     * documentation.
     */
    AXIS_TYPE: "axisType",

    /**
     * The array of array of labels (string) for the axes.  This must have as
     * many child arrays as there are axis types defined in AXIS_TYPE.  See
     * <a href='http://code.google.com/apis/chart/#axes_labels'>Axis labels</a>
     * documentation.
     */
    AXIS_LABELS: "axisLabels",

    /**
     * The label positions for the axis labels.  This can be used to present
     * labels that are non-unoformly distributed along the axis.  Similar to
     * AXIS_LABELS, this is specified as an array of array of label positions
     * (numbers). See
     * <a href='http://code.google.com/apis/chart/#axes_label_positions'>Axis
     * positions</a> documentation.
     */
    LABEL_POSITIONS: "labelPositions",

    /**
     * The ranges for the axes defined for the chart.  The value is expressed
     * as an array of {@link echoppoint.google.Range} object instances with
     * the array size being equal to the number of axes defined for the chart.
     * See <a href='http://code.google.com/apis/chart/#axis_range'>Axis
     * ranges</a> documentation.
     */
    AXIS_RANGES: "axisRanges",

    /**
     * The styles to apply for the axis labels.  The value is expressed as
     * a string with the specified format without the <code>&amp;chxs=</code>
     * prefix.  This allows this property to be specified via a stylesheet.
     * See <a href='http://code.google.com/apis/chart/#axes_styles'>Axis
     * styles</a> documentation for specification.
     */
    AXIS_STYLES: "axisStyles",

    /**
     * The line styles for the data sets plotted.  Value is expressed as an
     * array of {@link echopoint.google.LineStyle} objects.  This property
     * is not styleable.
     */
    LINE_STYLES: "lineStyles",

    /**
     * Style that controls display of grid lines.  See
     * <a href='http://code.google.com/apis/chart/#grid'>Grid lines</a>
     * documentation for specification.  Express the values without the
     * <code>&amp;chls=</code> prefix in the style sheet.
     */
    GRID_LINES: "gridLines"
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
  xdata: null,

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

  /**
   * The legend text to apply to the data set.  If legend is specified, it
   * must be specified for all instances in the data array.
   */
  legend: null,

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

/** The model object used to represent the title of a chart. */
echopoint.google.Title = Core.extend(
{
  /** An array that is used to hold the lines of text in the title. */
  _title: null,

  /** Create a new instance with a single line text */
  $construct: function( text )
  {
    this._title = new Array();
    if ( text ) this._title.push( text );
  },

  /** Add a line of text to the title. */
  add: function( line )
  {
    this._title.push( line );
  },

  /** Return the title text as represented in this object. */
  getText: function()
  {
    var text =  this._title.join( "|" );
    return text.replace( /\s+/g, "+" );
  },

  /** Return a string representation of this object.  Returns {@link #getText}. */
  toString: function()
  {
    return this.getText();
  }
});

/** The model object used to represent the range of a chart axis (and data). */
echopoint.google.Range = Core.extend(
{
  /** The minimum (starting) value of the range. */
  minimum: null,

  /** The maximum (ending) value of the range. */
  maximum: null,

  /** Create a new instance with the values specified. */
  $construct: function( min, max )
  {
    this.minimum = min;
    this.maximum = max;
  }
});

/**
 * A style object used to represent the style for a line drawn.  See
 * <a href='http://code.google.com/apis/chart/#line_styles'>Line styles</a>
 * documentation for specifications.
 */
echopoint.google.LineStyle = Core.extend(
{
  /** The thickness of the line to plot. */
  thickness: null,

  /** The size of a line segment.  Set to 1 for solid lines. */
  segmentLength: null,

  /** The length of a blank segment.  Set to 0 for solid lines. */
  blankSegmentLength: null,

  $construct: function( thick, segment, blank )
  {
    this.thickness = ( thick ) ? thick : 1;
    this.segmentLength = ( segment ) ? segment : 1;
    this.blankSegmentLength = ( blank ) ? blank : 0;
  }
});
