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

import echopoint.google.internal.AdvancedChart;
import echopoint.google.model.BarChartSize;

/**
 * Component wrapper for a
 * <a href='http://code.google.com/apis/chart/#bar_charts'>Bar chart</a>
 * provided by <a href='http://code.google.com/apis/chart/'>Google Chart
 * API</a>.
 *
 * @author Rakesh Vidyadharan 2008-08-20
 * @version $Id$
 */
public class BarChart<N extends Number> extends AdvancedChart<N>
{
  private static final long serialVersionUID = 1l;

  /** Enumeration for orientation types supported by bar charts. */
  public enum Orientation { bhs, bhg, bvs, bvg }

  /**
   * The property that is used to specify the orientation type for the chart.
   * This property may be styled.  Note that this property must be set
   * before the chart can be configured.
   */
  public static final String PROPERTY_ORIENTATION = "orientation";

  /**
   * The property used to configure the special bar chart width and size.
   * This property is best styled.
   */
  public static final String PROPERTY_SIZE = "size";

  /**
   * The property used to configure the zero line for the chart.  Note that
   * the chart API supports achieving the same effect through the use of
   * data scaling.  However, EchoPoint does not support this since we use
   * only simple encoding and not text encoding for the data.  This property
   * may be styled, however ever it may be easier to use dynamic setting based
   * upon range of data.
   */
  public static final String PROPERTY_ZERO_LINE = "zeroLine";

  /**
   * Return the value of the {@link #PROPERTY_ORIENTATION} property.
   *
   * @return The property value.
   */
  public String getOrientation()
  {
    return (String) getProperty( PROPERTY_ORIENTATION );
  }

  /**
   * Set the value of the {@link #PROPERTY_ORIENTATION} property.  This
   * method should be treated as <b>internal use only</b> since it requires
   * the string equivalent of {@link Orientation}.
   *
   * @param orientation The value of the property to set.
   */
  public void setOrientation( final String orientation )
  {
    setProperty( PROPERTY_ORIENTATION, orientation );
  }

  /**
   * Set the value of the {@link #PROPERTY_ORIENTATION} property using the
   * specified enumeration value.
   *
   * @param orientation The value of the property to set.
   */
  public void setOrientation( final Orientation orientation )
  {
    setOrientation( orientation.toString() );
  }

  /**
   * Return the value of the {@link #PROPERTY_SIZE} property.
   *
   * @return The property value.
   */
  public String getSize()
  {
    return (String) getProperty( PROPERTY_SIZE );
  }

  /**
   * Set the value of the {@link #PROPERTY_SIZE} property.  This property
   * is best styled.
   *
   * @param size The value to set.
   */
  public void setSize( final String size )
  {
    setProperty( PROPERTY_SIZE, size );
  }

  /**
   * Set the value of the {@link #PROPERTY_SIZE} property using the model
   * object that encapsulates bar chart size.
   *
   * @see #setSize( String )
   * @param size The value to set.
   */
  public void setSize( final BarChartSize size )
  {
    setSize( size.toString() );
  }

  /**
   * Return the value of the {@link #PROPERTY_ZERO_LINE} property.
   *
   * @return The property value.
   */
  public String getZeroLine()
  {
    return (String) getProperty( PROPERTY_ZERO_LINE );
  }

  /**
   * Set the value of the {@link #PROPERTY_ZERO_LINE} property.  This property
   * may be styled.
   *
   * @param zeroLine The value to set.
   */
  public void setZeroLine( final String zeroLine )
  {
    setProperty( PROPERTY_ZERO_LINE, zeroLine );
  }

  /**
   * Set the value of the {@link #PROPERTY_ZERO_LINE} property.  This property
   * may be styled.
   *
   * @param zeroLine The value to set.
   */
  public void setZeroLine( final double zeroLine )
  {
    setZeroLine( String.valueOf( zeroLine ) );
  }
}