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

import echopoint.google.chart.QRCode;
import echopoint.google.chart.model.Title;
import nextapp.echo.app.Component;
import nextapp.echo.app.Extent;
import nextapp.echo.app.Insets;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 * Unit test suite for the {@link echopoint.google.chart.QRCode} component
 * wrapper.
 *
 * @author Rakesh Vidyadharan 2008-08-28
 * @version $Id$
 */
public class QRCodeTest
{
  static QRCode chart;

  @BeforeClass
  public static void init()
  {
    chart = new QRCode();
  }

  @Test
  public void renderId()
  {
    final String id = "echopointUnitTestSimpleQRCode";
    chart.setRenderId( id );
    assertEquals( "Ensuring render id is same", id, chart.getRenderId() );
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
    title.add( "QR Codes" );
    chart.setTitle( title );

    assertEquals( "Ensuring title set", title, chart.getTitle() );
  }

  @Test
  public void height()
  {
    chart.setHeight( new Extent( 300 ) );
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

  @Test
  public void text()
  {
    final String text = "EchoPoint text to be encoded";
    chart.setText( text );
    assertEquals( "Ensuring text set", text, chart.getText() );
  }

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();
    content.add( chart );
  }
}