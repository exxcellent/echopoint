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

package echopoint;

import echopoint.google.chart.Sparkline;
import echopoint.google.chart.model.ChartData;
import echopoint.google.chart.model.ShapeMarker;
import echopoint.google.chart.model.Title;
import echopoint.google.chart.model.LineStyle;
import nextapp.echo.app.Component;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

/**
 * Unit test suite for the {@link echopoint.google.chart.Sparkline} component
 * wrapper.
 *
 * @author Rakesh Vidyadharan 2008-08-20
 * @version $Id$
 */
public class SparklineTest
{
  static Sparkline<Integer> chart;
  static ChartData<Integer> data;

  @BeforeClass
  public static void init()
  {
    chart = new Sparkline<Integer>();
    data = new ChartData<Integer>();
  }

  @Test
  public void renderId()
  {
    final String id = "echopointUnitTestSimpleSparkline";
    chart.setRenderId( id );
    assertEquals( "Ensuring render id is same", id, chart.getRenderId() );
  }

  @Test
  public void data()
  {
    final Integer[] array = new Integer[] { 30,60,70,90,95,110 };
    final List<Integer> xdata = Arrays.asList( array );
    final int xmax = 120;

    data.setXdata( xdata );
    data.setXmax( xmax );
  }

  @Test
  public void markers()
  {
    final ArrayList<ShapeMarker> markers = new ArrayList<ShapeMarker>();
    markers.add( new ShapeMarker( "o", "ff3333", 5 ) );
    data.setMarkers( markers );

    assertFalse( "Ensuring markers set", data.getMarkers().isEmpty() );
  }

  @Test
  public void color()
  {
    final String color = "00ff00";
    data.setColor( color );
    assertEquals( "Ensuring color set", color, data.getColor() );
  }

  @Test
  public void title()
  {
    final Title title = new Title();
    title.add( "Sparkline" );
    chart.setTitle( title );

    assertEquals( "Ensuring title set", title, chart.title() );
  }

  @Test
  public void lineStyles()
  {
    final Collection<LineStyle> styles = new ArrayList<LineStyle>();
    styles.add( new LineStyle( 3, 6, 3 ) );

    chart.setLineStyles( styles );
    assertNotNull( "Ensuring line styles set", chart.getLineStyles() );
  }

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();

    final ArrayList<ChartData<Integer>> collection = new ArrayList<ChartData<Integer>>();
    collection.add( data );
    chart.setData( collection );
    assertNotNull( "Ensuring that data is set", chart.getData() );

    content.add( chart );
  }
}