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

/**
 * Component wrapper for a
 * <a href='http://code.google.com/apis/chart/#radar'>Radar chart</a>
 * provided by <a href='http://code.google.com/apis/chart/'>Google Chart
 * API</a>.
 *
 * @author Rakesh Vidyadharan 2008-08-24
 * @version $Id$
 */
public class RadarChart<N extends Number> extends AdvancedChart<N>
{
  private static final long serialVersionUID = 1l;

  /** The enumeration of line styles supported by the chart. */
  public enum LineStyle { r, rs }

  /**
   * The line style for the chart.  This proeprty is best styled.  Note that
   * the values must correspond to {@link LineStyle}.
   */
  public static final String PROPERTY_LINE_STYLE = "lineStyle";

  /**
   * Return the {@link #PROPERTY_LINE_STYLE} property value.
   *
   * @return The value of the property.
   */
  public String getLineStyle()
  {
    return (String) getProperty( PROPERTY_LINE_STYLE );
  }

  /**
   * Set the value of the {@link #PROPERTY_LINE_STYLE} property.  Direct
   * use of this method is not recommended.
   *
   * @see #setLineStyle( LineStyle )
   * @param style The line style to use for the chart.
   */
  public void setLineStyle( final String style )
  {
    setProperty( PROPERTY_LINE_STYLE, style );
  }

  /**
   * Set the value of the {@link #PROPERTY_LINE_STYLE} property.  This is
   * the preferred mutator method for this proeprty.
   *
   * @param lineStyle The line style to use.
   */
  public void setLineStyle( final LineStyle lineStyle )
  {
    setLineStyle( lineStyle.toString() );
  }
}