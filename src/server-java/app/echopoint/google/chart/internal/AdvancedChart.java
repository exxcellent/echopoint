/*
 * This file is part of the Echo Point Project.  This project is a
 * collection of Components that have extended the Echo Web Application
 * Framework Version 3.
 *
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 */

package echopoint.google.chart.internal;

import echopoint.google.chart.model.Range;
import echopoint.google.chart.model.RangeMarker;
import echopoint.google.chart.model.LineStyle;
import echopoint.google.chart.model.FillArea;

import java.util.Collection;

import com.thoughtworks.xstream.XStream;

/**
 * An abstract base class for charts that support most of the configuration
 * options supported by
 * <a href='http://code.google.com/apis/chart/'>Google Chart API</a>.
 *
 * @author Rakesh Vidyadharan 2008-08-20
 * @version $Id$
 */
public class AdvancedChart<N extends Number> extends SimpleChart<N>
{
  private static final long serialVersionUID = 1l;

  /**
   * The axis type specification for the chart.  This property can be
   * styled.  See <a href='http://code.google.com/apis/chart/#axis_type'>Axis type</a>
   * documentation.
   */
  public static final String PROPERTY_AXIS_TYPE = "axisType";

  /**
   * The collection of collection of labels (string) for the axes.  This must
   * have as many child collections as there are axis types defined in
   * AXIS_TYPE.  See
   * <a href='http://code.google.com/apis/chart/#axes_labels'>Axis labels</a>
   * documentation.  This property cannot be styled.
   */
  public static final String PROPERTY_AXIS_LABELS = "axisLabels";

  /**
   * The label positions for the axis labels.  This can be used to present
   * labels that are non-unoformly distributed along the axis.  Similar to
   * AXIS_LABELS, this is specified as a collection of collection of label
   * positions (numbers).  This property cannot be styled.  See
   * <a href='http://code.google.com/apis/chart/#axes_label_positions'>Axis
   * positions</a> documentation.
   */
  public static final String PROPERTY_LABEL_POSITIONS = "labelPositions";

  /**
   * The ranges for the axes defined for the chart.  The value is expressed
   * as a collection of {@link echopoint.google.chart.model.Range} object instances
   * with the collection size being equal to the number of axes defined for
   * the chart. This property cannot be styled.
   * See <a href='http://code.google.com/apis/chart/#axis_range'>Axis
   * ranges</a> documentation.
   */
  public static final String PROPERTY_AXIS_RANGES = "axisRanges";

  /**
   * The styles to apply for the axis labels.  The value is expressed as
   * a string with the specified format without the <code>&amp;chxs=</code>
   * prefix.  This property is best set as a style.
   * See <a href='http://code.google.com/apis/chart/#axes_styles'>Axis
   * styles</a> documentation for specification.
   */
  public static final String PROPERTY_AXIS_STYLES = "axisStyles";

  /**
   * The line styles for the data sets plotted.  Value is expressed as a
   * collection of {@link echopoint.google.chart.model.LineStyle} objects.  This
   * property is not styleable.
   */
  public static final String PROPERTY_LINE_STYLES = "lineStyles";

  /**
   * Style that controls display of grid lines.  See
   * <a href='http://code.google.com/apis/chart/#grid'>Grid lines</a>
   * documentation for specification.  Express the values without the
   * <code>&amp;chls=</code> prefix in the style sheet.
   */
  public static final String PROPERTY_GRID_LINES = "gridLines";

  /**
   * Range markers to display on the graph.  Value is specified as a collection
   * of {@link echopoint.google.chart.model.RangeMarker} objects.  This property
   * is not styleable.
   */
  public static final String PROPERTY_RANGE_MARKERS = "rangeMarkers";

  /**
   * A collection of {@link echopoint.google.chart.model.FillArea} instances that
   * represent the areas between lines that are to be filled.  This property
   * is not styleable.
   */
  public static final String PROPERTY_FILL_AREA = "fillArea";

  /**
   * Return the value of the {@link #PROPERTY_AXIS_TYPE} property.
   *
   * @return The property value.
   */
  public String getAxisType()
  {
    return (String) getProperty( PROPERTY_AXIS_TYPE );
  }

  /**
   * Set the value of the {@link #PROPERTY_AXIS_TYPE} property.
   *
   * @param type The value of the property to set.
   */
  public void setAxisType( final String type )
  {
    setProperty( PROPERTY_AXIS_TYPE, type );
  }

  /**
   * Return the value of the {@link #PROPERTY_AXIS_LABELS} property.
   *
   * @return The property value.
   */
  public String getAxisLabels()
  {
    return (String) getProperty( PROPERTY_AXIS_LABELS );
  }

  /**
   * Set the value of the {@link #PROPERTY_AXIS_LABELS} property.  This
   * method is for <b>internal use only</b>, since it requires JSON data.
   *
   * @see #setAxisLabels( Collection )
   * @param labels The value to set using JSON data structure.
   */
  public void setAxisLabels( final String labels )
  {
    setProperty( PROPERTY_AXIS_LABELS, labels );
  }

  /**
   * Set the value of the {@link #PROPERTY_AXIS_LABELS} property using the
   * specified collection of collection of strings.
   *
   * @param labels The value to set after conversion to JSON.
   */
  public void setAxisLabels( final Collection<Collection<String>> labels )
  {
    final XStream xstream = createSerialiser();
    setAxisLabels( xstream.toXML( labels ) );
  }

  /**
   * Return the value of the {@link #PROPERTY_LABEL_POSITIONS} property.
   *
   * @return The property value.
   */
  public String getLabelPositions()
  {
    return (String) getProperty( PROPERTY_LABEL_POSITIONS );
  }

  /**
   * Set the value of the {@link #PROPERTY_LABEL_POSITIONS} property.  This
   * method should be treated as <b>internal use only</b>, since this method
   * requires a JSON data structure.
   *
   * @see #setLabelPositions( Collection )
   * @param positions The value to set in JSON format.
   */
  public void setLabelPositions( final String positions )
  {
    setProperty( PROPERTY_LABEL_POSITIONS, positions );
  }

  /**
   * Set the value of the {@link #PROPERTY_LABEL_POSITIONS} property using the
   * collection of collection of numbers.
   *
   * @param positions The value to set after converting to JSON.
   */
  public void setLabelPositions( final Collection<Collection<N>> positions )
  {
    final XStream xstream = createSerialiser();
    setLabelPositions( xstream.toXML( positions ) );
  }

  /**
   * Return the value of the {@link #PROPERTY_AXIS_RANGES} property.
   *
   * @return The property value.
   */
  public String getAxisRanges()
  {
    return (String) getProperty( PROPERTY_AXIS_RANGES );
  }

  /**
   * Set the value of the {@link #PROPERTY_AXIS_RANGES} property.  This
   * method should be treated as <b>internal use only</b> since this requires
   * a JSON data structure.
   *
   * @see #setAxisRanges( Collection )
   * @param ranges The value to set in JSON format.
   */
  public void setAxisRanges( final String ranges )
  {
    setProperty( PROPERTY_AXIS_RANGES, ranges );
  }

  /**
   * Set the value of the {@link #PROPERTY_AXIS_RANGES} property using the
   * collection of range values.
   *
   * @param ranges The value to set after converting to JSON.
   */
  public void setAxisRanges( final Collection<Range> ranges )
  {
    final XStream xstream = createSerialiser();
    setAxisRanges( xstream.toXML( ranges ) );
  }

  /**
   * Return the value of the {@link #PROPERTY_AXIS_STYLES} property.
   *
   * @return The property value.
   */
  public String getAxisStyles()
  {
    return (String) getProperty( PROPERTY_AXIS_STYLES );
  }

  /**
   * Set the value of the {@link #PROPERTY_AXIS_STYLES} property.
   *
   * @param styles The value of the property to set.
   */
  public void setAxisStyles( final String styles )
  {
    setProperty( PROPERTY_AXIS_STYLES, styles );
  }

  /**
   * Return the value of the {@link #PROPERTY_LINE_STYLES} property.
   *
   * @return The property value.
   */
  public String getLineStyles()
  {
    return (String) getProperty( PROPERTY_LINE_STYLES );
  }

  /**
   * Set the value of the {@link #PROPERTY_LINE_STYLES} property.  This
   * method should be treated as <b>internal use only</b> since this requires
   * a JSON data structure.
   *
   * @see #setLineStyles( Collection )
   * @param styles The value of the property to in JSON format.
   */
  public void setLineStyles( final String styles )
  {
    setProperty( PROPERTY_LINE_STYLES, styles );
  }

  /**
   * Set the value of the {@link #PROPERTY_LINE_STYLES} property.
   *
   * @param styles The value of the property to set after converting to JSON.
   */
  public void setLineStyles( final Collection<LineStyle> styles )
  {
    final XStream xstream = createSerialiser();
    setLineStyles( xstream.toXML( styles ) );
  }

  /**
   * Return the value of the {@link #PROPERTY_GRID_LINES} property.
   *
   * @return The property value.
   */
  public String getGridLines()
  {
    return (String) getProperty( PROPERTY_GRID_LINES );
  }

  /**
   * Set the value of the {@link #PROPERTY_GRID_LINES} property.
   *
   * @param gridLines The value of the property to set.
   */
  public void setGridLines( final String gridLines )
  {
    setProperty( PROPERTY_GRID_LINES, gridLines );
  }

  /**
   * Return the value of the {@link #PROPERTY_RANGE_MARKERS} property.
   *
   * @return The property value.
   */
  public String getRangeMarkers()
  {
    return (String) getProperty( PROPERTY_RANGE_MARKERS );
  }

  /**
   * Set the value of the {@link #PROPERTY_RANGE_MARKERS} property.  This
   * method should be treated as <b>internal use only</b> since this requires
   * JSON data.
   *
   * @see #setRangeMarkers( Collection )
   * @param markers The value of the property to set in JSON format.
   */
  public void setRangeMarkers( final String markers )
  {
    setProperty( PROPERTY_RANGE_MARKERS, markers );
  }

  /**
   * Set the value of the {@link #PROPERTY_RANGE_MARKERS} property.
   *
   * @param markers The value of the property to set after converting to JSON.
   */
  public void setRangeMarkers( final Collection<RangeMarker> markers )
  {
    final XStream xstream = createSerialiser();
    setRangeMarkers( xstream.toXML( markers ) );
  }

  /**
   * Return the value of the {@link #PROPERTY_FILL_AREA} property.
   *
   * @return The property value.
   */
  public String getFillArea()
  {
    return (String) getProperty( PROPERTY_FILL_AREA );
  }

  /**
   * Set the value of the {@link #PROPERTY_FILL_AREA} property.  This method
   * should be treated as <b>internal use only</b> since it requires JSON
   * data structure.
   *
   * @see #setFillArea( Collection )
   * @param area The value of the property to set in JSON format.
   */
  public void setFillArea( final String area )
  {
    setProperty( PROPERTY_FILL_AREA, area );
  }

  /**
   * Set the value of the {@link #PROPERTY_FILL_AREA} property using the
   * collection of area instances.
   *
   * @param area The value of the property to set after converting to JSON.
   */
  public void setFillArea( final Collection<FillArea> area )
  {
    final XStream xstream = createSerialiser();
    setFillArea( xstream.toXML( area ) );
  }
}