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

import echopoint.model.CircleSection;
import echopoint.model.MapSection;
import echopoint.model.Point;
import echopoint.model.PolygonSection;
import echopoint.model.RectangleSection;
import nextapp.echo.app.Component;
import nextapp.echo.app.Extent;
import nextapp.echo.app.Label;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Collection;

/**
 * Unit test suite for the {@link echopoint.ImageMap} component.
 *
 * @author Rakesh 2008-10-19
 * @version $Id$
 */
public class ImageMapTest
{
  private static ImageMap imageMap;
  private static Label label;

  @BeforeClass
  public static void init()
  {
    imageMap = new ImageMap( "image/imagemap.gif" );
    label = new Label( "Action command area" );
  }

  @Test
  public void renderId()
  {
    final String renderId = "echopointUnitTestImageMap";
    imageMap.setRenderId( renderId );
    assertEquals( "Ensuring renderId set", renderId,
        imageMap.getRenderId() );
  }

  @Test
  public void width()
  {
    final int width = 500;
    imageMap.setWidth( new Extent( width ) );
    assertEquals( "Ensuring that width is set", width,
        imageMap.getWidth().getValue() );
  }

  @Test
  public void height()
  {
    final int height = 300;
    imageMap.setHeight( new Extent( height ) );
    assertEquals( "Ensuring that height is set", height,
        imageMap.getHeight().getValue() );
  }

  @Test
  public void sections()
  {
    final Collection<MapSection> sections = new ArrayList<MapSection>( 3 );

    final CircleSection circle = new CircleSection(
        new Point( 70, 84 ), 51, "circle", "Circular section" );
    sections.add( circle );

    final RectangleSection rectangle = new RectangleSection(
        new Point( 25, 180 ), new Point( 125, 280 ),
        "rectangle", "Rectangular section" );
    sections.add( rectangle );
    imageMap.addSections( sections );
    assertEquals( "Ensuring circle and rectangle added", sections.size(),
        imageMap.getSections().size() );

    final int[] vertices = { 153, 106, 186, 225, 340, 193, 315, 81, 304, 167 };
    final PolygonSection polygon = new PolygonSection( vertices,
        "polygon", "Polygon section" );
    sections.add( polygon );
    imageMap.addSection( polygon );
    assertEquals( "Ensuring polygon added", sections.size(),
        imageMap.getSections().size() );
  }

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();

    imageMap.addActionListener( new ActionListener() {
      public void actionPerformed( final ActionEvent event )
      {
        if ( "circle".equals( event.getActionCommand() ) )
        {
          label.setText( "Circular section" );
        }
        else if ( "rectangle".equals( event.getActionCommand() ) )
        {
          label.setText( "Rectangular section" );
        }
        else if ( "polygon".equals( event.getActionCommand() ) )
        {
          label.setText( "Polygon section" );
        }
      }
    });

    content.add( imageMap );
    content.add( label );
  }
}
