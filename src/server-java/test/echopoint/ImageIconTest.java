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

import static org.junit.Assert.assertEquals;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.AfterClass;

import nextapp.echo.app.Label;
import nextapp.echo.app.Extent;
import nextapp.echo.app.Component;
import nextapp.echo.app.event.ActionListener;
import nextapp.echo.app.event.ActionEvent;

/**
 * Unit test case for the {@link echopoint.ImageIcon} component.
 *
 * @author Rakesh Vidyadharan 2008-10-20
 * @version $Id$
 */
public class ImageIconTest
{
  static ImageIcon icon;
  static Label label;
  static int count;
  static final String command = "actionCommand";

  @BeforeClass
  public static void init()
  {
    count = 0;
    icon = new ImageIcon( "image/imagemap.gif" );
    label = new Label( "Action command area" );
  }

  @Test
  public void renderId()
  {
    final String renderId = "echopointUnitTestImageIcon";
    icon.setRenderId( renderId );
    assertEquals( "Ensuring renderId set", renderId,
        icon.getRenderId() );
  }

  @Test
  public void actionCommand()
  {
    icon.setActionCommand( command );
    assertEquals( "Ensuring action command set", command,
        icon.getActionCommand() );
  }

  @Test
  public void width()
  {
    final int width = 500;
    icon.setWidth( new Extent( width ) );
    assertEquals( "Ensuring that width is set", width,
        icon.getWidth().getValue() );
  }

  @Test
  public void height()
  {
    final int height = 300;
    icon.setHeight( new Extent( height ) );
    assertEquals( "Ensuring that height is set", height,
        icon.getHeight().getValue() );
  }

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();

    icon.addActionListener( new ActionListener() {
      private static final long serialVersionUID = 1l;

      public void actionPerformed( final ActionEvent event )
      {
        label.setText( "Button clicked: " + ++count );
        assertEquals( "Ensuring that action command is set",
            command, event.getActionCommand() );
      }
    });

    content.add( icon );
    content.add( label );
  }
}
