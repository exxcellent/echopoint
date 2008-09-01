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

import echopoint.google.chart.PieChart;
import echopoint.google.chart.model.ChartData;
import echopoint.google.chart.model.Title;
import nextapp.echo.app.Component;
import nextapp.echo.app.Extent;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * Unit test suite for the {@link echopoint.google.chart.PieChart} component
 * wrapper.
 *
 * @author Rakesh Vidyadharan 2008-08-20
 * @version $Id$
 */
public class PieChartTest
{
  static PieChart<Integer> chart;
  static ChartData<Integer> data;

  @BeforeClass
  public static void init()
  {
    chart = new PieChart<Integer>();
    data = new ChartData<Integer>();
  }

  @Test
  public void dimensions()
  {
    chart.setDimensions( PieChart.Dimensions.p3 );
    assertEquals( "Ensuring chart type set", chart.getDimensions(),
        PieChart.Dimensions.p3.toString() );
  }

  @Test
  public void renderId()
  {
    final String id = "echopointUnitTestSimplePieChart";
    chart.setRenderId( id );
    assertEquals( "Ensuring render id is same", id, chart.getRenderId() );
  }

  @Test
  public void data()
  {
    final Integer[] array = new Integer[]
        { 31, 28, 31, 30, 31, 31, 31, 31, 30, 31, 30, 31 };
    data.setXdata( Arrays.asList( array ) );
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
    title.add( "PieChart" );
    chart.setTitle( title );

    assertEquals( "Ensuring title set", title, chart.title() );
  }

  @Test
  public void labels()
  {
    final String[] labels = { "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
    chart.setLabels( Arrays.asList( labels ) );
    assertNotNull( "Ensuring labels set", chart.getLabels() );
  }

  @Test
  public void height()
  {
    chart.setHeight( new Extent( 400 ) );
    assertNotNull( "Ensuring height set", chart.getHeight() );
  }

  @Test
  public void width()
  {
    chart.setWidth( new Extent( 650 ) );
    assertNotNull( "Ensuring width set", chart.getWidth() );
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