/**
 * Component definitions for the Google Chart API chart components.  All
 * charts are derived from the {@link echopoint.google.internal.AbstractChart}
 * super class.
 *
 * @author Rakesh 2008-08-08
 * @version $Id$
 */

/** The name of the AbstractChart base class. */
echopoint.constants.ABSTRACT_CHART = "echopoint.google.internal.AbstractChart";

/** The name of the simple chart base class. */
echopoint.constants.SIMPLE_CHART = "echopoint.google.internal.SimpleChart";

/** The name of the advanced chart base class. */
echopoint.constants.ADVANCED_CHART = "echopoint.google.internal.AdvancedChart";

/** The name of the BarChart component. */
echopoint.constants.BAR_CHART = "echopoint.google.BarChart";

/** The name of the LineChart component. */
echopoint.constants.LINE_CHART = "echopoint.google.LineChart";

/** The name of the Sparkline component. */
echopoint.constants.SPARKLINE = "echopoint.google.Sparkline";

/** The name of the ScatterPlot component. */
echopoint.constants.SCATTER_PLOT = "echopoint.google.ScatterPlot";

/** The name of the RadarChart component. */
echopoint.constants.RADAR_CHART = "echopoint.google.RadarChart";

/** The name of the PieChart component. */
echopoint.constants.PIE_CHART = "echopoint.google.PieChart";

/** The name of the VennDiagram component. */
echopoint.constants.VENN_DIAGRAM = "echopoint.google.VennDiagram";

/**
 * The class definition for the abstract chart component that is the root
 * component from which <a href='http://code.google.com/apis/chart/'>Google
 * Chart API</a> components are derived.
 */
echopoint.google.internal.AbstractChart = Core.extend(
    echopoint.internal.AbstractContainer,
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
     * This property is best styled.
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
     * The title to display for chart.  Must be of type {@link
     * echopoint.google.model.Title}.
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
 * The class definition for simple charts (pie chart, venn diagram) that
 * support only a sub-set of the configuration options.
 */
echopoint.google.internal.SimpleChart = Core.extend(
    echopoint.google.internal.AbstractChart,
{
  $abstract: true,

  $static:
  {
    /**
     * The legend position for the chart.  Specify the values as defined by
     * the Google Chart API documentation.
     */
    LEGEND_POSITION: "legendPosition"
  },

  $load: function()
  {
    Echo.ComponentFactory.registerType(
        echopoint.constants.SIMPLE_CHART, this );
  }
});

/**
 * The class definition for advanced charts (bar, line, ...) that support
 * most options made available by the chart API.
 */
echopoint.google.internal.AdvancedChart = Core.extend(
    echopoint.google.internal.SimpleChart,
{
  $abstract: true,

  $static:
  {
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
     * as an array of {@link echopoint.google.model.Range} object instances with
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
     * array of {@link echopoint.google.model.LineStyle} objects.  This property
     * is not styleable.
     */
    LINE_STYLES: "lineStyles",

    /**
     * Style that controls display of grid lines.  See
     * <a href='http://code.google.com/apis/chart/#grid'>Grid lines</a>
     * documentation for specification.  Express the values without the
     * <code>&amp;chls=</code> prefix in the style sheet.
     */
    GRID_LINES: "gridLines",

    /**
     * Range markers to display on the graph.  Value is specified as an array
     * of {@link echopoint.google.model.RangeMarker} objects.
     */
    RANGE_MARKERS: "rangeMarkers",

    /**
     * An array of {@link echopoint.google.model.FillArea} instances that
     * represent the areas between lines that are to be filled.
     */
    FILL_AREA: "fillArea"
  },

  $load: function()
  {
    Echo.ComponentFactory.registerType(
        echopoint.constants.ADVANCED_CHART, this );
  }
});

/**
 * The class definition for bar chart type as specified by
 * <a href='http://code.google.com/apis/chart/#bar_charts'>Google Chart API</a>.
 */
echopoint.google.BarChart = Core.extend( echopoint.google.internal.AdvancedChart,
{
  /** Constants to control the chart as defined by google. */
  $static:
  {
    /** Constant that indicates a horizontal bar chart. */
    HORIZONTAL: "bhs",

    /** Constant that indicates a horizontal bar chart with multiple colours. */
    HORIZONTAL_MULTI_COLOR: "bhg",

    /** Constant that indicates a vertical bar chart (the default). */
    VERTICAL: "bvs",

    /** Constant that indicates a vertical bar chart with multiple colours. */
    VERTICAL_MULTI_COLOR: "bvg",

    /**
     * The property that is used to specify the orientation type for the chart.
     * This property may be styled.  Note that this property must be set
     * before the chart can be used.  Specified values must match one of the
     * <code>HORIZONTAL&lt;_xxx&gt;</code> or <code>VERTICAL&lt;_xxx&gt;</code>
     * constants.
     */
    ORIENTATION: "orientation",

    /**
     * The property used to configure the special bar chart width and size.
     * This property is best styled.
     */
    SIZE: "size",

    /**
     * The property used to configure the zero line for the chart.  Note that
     * the chart API supports achieving the same effect through the use of
     * data scaling.  However, EchoPoint does not support this since we use
     * only simple encoding and not text encoding for the data.  This property
     * may be styled.
     */
    ZERO_LINE: "zeroLine"
  },

  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.BAR_CHART, this );
  },

  componentType: echopoint.constants.BAR_CHART
});

/**
 * The class definition for line chart type as specified by
 * <a href='http://code.google.com/apis/chart/#line_charts'>Google Chart API</a>.
 */
echopoint.google.LineChart = Core.extend( echopoint.google.internal.AdvancedChart,
{
  /** Constants to control the chart as defined by google. */
  $static:
  {
    X_DATA: "lc", // Multiple data sets are plotted as different lines
    XY_DATA: "lxy" // Each line is represented by two sets of data for x and y
  },

  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.LINE_CHART, this );
  },

  componentType: echopoint.constants.LINE_CHART
});

/**
 * The class definition for sparkline chart type as specified by
 * <a href='http://code.google.com/apis/chart/#sparkline'>Google Chart API</a>.
 */
echopoint.google.Sparkline = Core.extend( echopoint.google.internal.AdvancedChart,
{
  /** Constants to control the chart as defined by google. */
  $static:
  {
    /** The chart type for sparklines. */
    CHART_TYPE: "ls"
  },

  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.SPARKLINE, this );
  },

  componentType: echopoint.constants.SPARKLINE
});

/**
 * The class definition for the scatter plot type as specified by
 * <a href='http://code.google.com/apis/chart/#scatter_plot'>Google Chart API</a>.
 */
echopoint.google.ScatterPlot = Core.extend( echopoint.google.internal.AdvancedChart,
{
  $static:
  {
    /** The chart type for scatter plots. */
    CHART_TYPE: "s"
  },

  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.SCATTER_PLOT, this );
  },

  componentType: echopoint.constants.SCATTER_PLOT
});

/**
 * The class definition for the radar chart type as specified by
 * <a href='http://code.google.com/apis/chart/#radar'>Google Chart API</a>.
 */
echopoint.google.RadarChart = Core.extend( echopoint.google.internal.AdvancedChart,
{
  $static:
  {
    /** The chart type for straight line plots.  This is the default. */
    STRAIGHT_LINE: "r",

    /** The chart type for spline plots. */
    SPLINE: "rs",

    /**
     * The property used to configure the line style.  The value specified
     * must be one of {@link #STRAIGHT_LINE} or {@link #SPLINE}.
     * This property is best styled.
     */
    LINE_STYLE: "lineStyle"
  },

  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.RADAR_CHART, this );
  },

  componentType: echopoint.constants.RADAR_CHART
});

/**
 * The class definition for pie diagrams as specified by
 * <a href='http://code.google.com/apis/chart/#pie_charts'>Google Chart API</a>.
 */
echopoint.google.PieChart = Core.extend( echopoint.google.internal.SimpleChart,
{
  $static:
  {
    /** The constant that configures a 2-dimensional pie chart. */
    TWO_DIMENSIONAL: "p",

    /** The constant that configures a 3-dimensional pie chart. */
    THREE_DIMENSIONAL: "p3",

    /**
     * The property used to configure 2 or 3-dimensional charts.  This
     * property is best styled.  Defaults to 2-d.
     */
    DIMENSIONS: "dimensions",

    /**
     * The property that holds the array of string labels to associate with
     * the segments in the pie chart.  Please see
     * <a href='http://code.google.com/apis/chart/#pie_labels'>Pie Labels</a>
     * notes regarding size requirements when using labels.
     */
    LABELS: "labels"
  },

  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.PIE_CHART, this );
  },

  componentType: echopoint.constants.PIE_CHART
});

/**
 * The class diagram for venn diagrams as specified by
 * <a href='http://code.google.com/apis/chart/#venn'>Google Chart API</a>.
 */
echopoint.google.VennDiagram = Core.extend( echopoint.google.internal.SimpleChart,
{
  $static:
  {
    /** The constant that indicates the chart type. */
    CHART_TYPE: "v"
  },

  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.VENN_DIAGRAM, this );
  },

  componentType: echopoint.constants.VENN_DIAGRAM
});
