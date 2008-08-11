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

package echopoint.google;

import echopoint.google.internal.AbstractChart;
import echopoint.google.model.Range;
import echopoint.google.model.RangeMarker;
import echopoint.google.model.LineStyle;
import echopoint.google.model.FillArea;

import java.util.Collection;

import com.thoughtworks.xstream.XStream;

/**
 * Component wrapper for a
 * <a href='http://code.google.com/apis/chart/#line_charts'>Line chart</a>
 * provided by <a href='http://code.google.com/apis/chart/'>Google Chart
 * API</a>.
 *
 * @author Rakesh Vidyadharan 2008-08-10
 * @version $Id$
 */
public class LineChart<N extends Number> extends AbstractChart<N>
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
   * as a collection of {@link echopoint.google.model.Range} object instances
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
   * collection of {@link echopoint.google.model.LineStyle} objects.  This
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
   * of {@link echopoint.google.model.RangeMarker} objects.  This property
   * is not styleable.
   */
  public static final String PROPERTY_RANGE_MARKERS = "rangeMarkers";

  /**
   * A collection of {@link echopoint.google.model.FillArea} instances that
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
   * Set the value of the {@link #PROPERTY_AXIS_LABELS} property.
   *
   * @param labels The value to set after conversion to JSON.
   */
  public void setAxisLabels( final Collection<Collection<String>> labels )
  {
    final XStream xstream = createSerialiser();
    setProperty( PROPERTY_AXIS_LABELS, xstream.toXML( labels ) );
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
   * Set the value of the {@link #PROPERTY_LABEL_POSITIONS} property.
   *
   * @param positions The value to set after converting to JSON.
   */
  public void setLabelPositions( final Collection<Collection<N>> positions )
  {
    final XStream xstream = createSerialiser();
    setProperty( PROPERTY_LABEL_POSITIONS, xstream.toXML( positions ) );
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
   * Set the value of the {@link #PROPERTY_AXIS_RANGES} property.
   *
   * @param ranges The value to set after converting to JSON.
   */
  public void setAxisRanges( final Collection<Range> ranges )
  {
    final XStream xstream = createSerialiser();
    setProperty( PROPERTY_AXIS_RANGES, xstream.toXML( ranges ) );
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
   * Set the value of the {@link #PROPERTY_LINE_STYLES} property.
   *
   * @param styles The value of the property to set after converting to JSON.
   */
  public void setLineStyles( final Collection<LineStyle> styles )
  {
    final XStream xstream = createSerialiser();
    setProperty( PROPERTY_LINE_STYLES, xstream.toXML( styles ) );
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
   * Set the value of the {@link #PROPERTY_RANGE_MARKERS} property.
   *
   * @param markers The value of the property to set after converting to JSON.
   */
  public void setRangeMarkers( final Collection<RangeMarker> markers )
  {
    final XStream xstream = createSerialiser();
    setProperty( PROPERTY_RANGE_MARKERS, xstream.toXML( markers ) );
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
   * Set the value of the {@link #PROPERTY_FILL_AREA} property.
   *
   * @param area The value of the property to set after converting to JSON.
   */
  public void setFillArea( final Collection<FillArea> area )
  {
    final XStream xstream = createSerialiser();
    setProperty( PROPERTY_FILL_AREA, xstream.toXML( area ) );
  }
}
