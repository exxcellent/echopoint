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

import echopoint.google.chart.Map;
import echopoint.google.chart.model.ChartData;
import echopoint.google.chart.model.Title;
import nextapp.echo.app.Component;
import nextapp.echo.app.Extent;
import nextapp.echo.app.Insets;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * Unit test suite for the {@link echopoint.google.chart.Map} component
 * wrapper.
 *
 * @author Rakesh Vidyadharan 2008-08-25
 * @version $Id$
 */
public class MapTest
{
  static Map chart;
  static ChartData<Integer> data;

  @BeforeClass
  public static void init()
  {
    chart = new Map();
    data = new ChartData<Integer>();
  }

  @Test
  public void renderId()
  {
    final String id = "echopointUnitTestSimpleMap";
    chart.setRenderId( id );
    assertEquals( "Ensuring render id is same", id, chart.getRenderId() );
  }

  @Test
  public void region()
  {
    chart.setGeographicalArea( Map.Regions.africa );
    assertEquals( "Ensuring region set", chart.getGeographicalArea(),
        Map.Regions.africa.toString() );
  }

  @Test
  public void data()
  {
    final Integer[] array = new Integer[] { 0, 5, 9 };
    data.setXdata( Arrays.asList( array ) );
  }

  @Test
  public void codes()
  {
    final String codes = "MGKETN";
    chart.setCodes( codes );
    assertEquals( "Ensuring codes set", codes, chart.getCodes() );
  }

  @Test
  public void color()
  {
    final String color = "00ff00";
    data.setColor( color );
    assertEquals( "Ensuring color set", color, data.getColor() );
  }

  @Test
  public void fill()
  {
    final String fill = "bg,s,efefef|c,lg,45,ffffff,0,76a4fb,0.75";
    chart.setFill( fill );
    assertEquals( "Ensuring fill set", fill, chart.getFill() );
  }

  @Test
  public void title()
  {
    final Title title = new Title();
    title.add( "Map" );
    chart.setTitle( title );

    assertEquals( "Ensuring title set", title, chart.title() );
  }

  @Test
  public void height()
  {
    chart.setHeight( new Extent( 200 ) );
    assertNotNull( "Ensuring height set", chart.getHeight() );
  }

  @Test
  public void width()
  {
    chart.setWidth( new Extent( 400 ) );
    assertNotNull( "Ensuring width set", chart.getWidth() );
  }

  @Test
  public void insets()
  {
    chart.setInsets( new Insets( 10 ) );
    assertNotNull( "Ensuring insets set", chart.getInsets() );
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