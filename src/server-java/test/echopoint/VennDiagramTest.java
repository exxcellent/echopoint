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

import echopoint.google.chart.VennDiagram;
import echopoint.google.chart.model.Title;
import echopoint.google.chart.model.VennDiagramModel;
import nextapp.echo.app.Component;
import nextapp.echo.app.Extent;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 * Unit test suite for the {@link echopoint.google.chart.VennDiagram} component
 * wrapper.
 *
 * @author Rakesh Vidyadharan 2008-08-20
 * @version $Id$
 */
public class VennDiagramTest
{
  static VennDiagram chart;

  @BeforeClass
  public static void init()
  {
    chart = new VennDiagram();
  }

  @Test
  public void renderId()
  {
    final String id = "echopointUnitTestSimpleVennDiagram";
    chart.setRenderId( id );
    assertEquals( "Ensuring render id is same", id, chart.getRenderId() );
  }

  @Test
  public void data()
  {
    final VennDiagramModel model =
        new VennDiagramModel( 100, 80, 60, 30, 30, 30, 10 );
    chart.setData( model );
    assertEquals( "Ensuring data size", chart.data().size(), 1 );
  }

  @Test
  public void title()
  {
    final Title title = new Title();
    title.add( "VennDiagram" );
    chart.setTitle( title );

    assertEquals( "Ensuring title set", title, chart.title() );
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
    chart.setWidth( new Extent( 600 ) );
    assertNotNull( "Ensuring width set", chart.getWidth() );
  }

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();
    content.add( chart );
  }
}