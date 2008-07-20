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

import nextapp.echo.app.Extent;
import nextapp.echo.app.Component;
import nextapp.echo.app.Label;
import nextapp.echo.app.Row;
import nextapp.echo.app.Column;
import nextapp.echo.app.Border;
import nextapp.echo.app.Color;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.AfterClass;

/**
 * Unit test suite for the Strut component.
 *
 * @author Rakesh 2008-07-20
 * @version $Id$
 */
public class StrutTest
{
  static Strut strut;

  @BeforeClass
  public static void init()
  {
    strut = new Strut();
  }

  @Test
  public void width()
  {
    final int width = 50;
    strut.setWidth( new Extent( width ) );
    assertEquals( strut.getWidth().getValue(), width );
  }

  @Test
  public void height()
  {
    final int height = 25;
    strut.setHeight( new Extent( height ) );
    assertEquals( strut.getHeight().getValue(), height );
  }

  @Test
  public void nochild()
  {
    try
    {
      strut.add( new Strut() );
      fail( "Strut cannot hold children" );
    }
    catch ( Throwable t ) {}
  }

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();

    final Row row = new Row();
    row.add( new Label( "Label 1" ) );
    Strut strut = new Strut( new Extent( 200, Extent.PX ),
        new Extent( 100, Extent.PERCENT ) );
    strut.setBorder( new Border( 1, Color.BLACK, Border.STYLE_SOLID ) );
    strut.setRenderId( "echopointUnitTestStrutRow" );
    row.add( strut );
    row.add( new Label( "Label 2" ) );

    content.add( row );

    final Column column = new Column();
    column.add( new Label( "Label 3" ) );
    strut = new Strut( new Extent( 200, Extent.PX ),
        new Extent( 100, Extent.PERCENT ) );
    strut.setBorder( new Border( 1, Color.BLACK, Border.STYLE_SOLID ) );
    strut.setRenderId( "echopointUnitTestStrutColumn" );
    column.add( strut );
    column.add( new Label( "Label 4" ) );

    content.add( column );
  }
}
