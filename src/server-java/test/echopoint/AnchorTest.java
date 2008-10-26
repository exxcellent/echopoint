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
import nextapp.echo.app.Component;
import nextapp.echo.app.Color;
import nextapp.echo.app.Font;
import nextapp.echo.app.Extent;

/**
 * Unit test suite for the {@link echopoint.Anchor} component.
 *
 * @author Rakesh Vidyadharan 2008-10-24
 * @version $Id$
 */
public class AnchorTest
{
  static Anchor component;

  @BeforeClass
  public static void init()
  {
    component = new Anchor();
  }

  @Test
  public void renderId()
  {
    final String renderId = "echopointUnitTestAnchor";
    component.setRenderId( renderId );
    assertEquals( "Ensuring renderId set", renderId, component.getRenderId() );
  }

  @Test
  public void uri()
  {
    final String uri = "https://echopoint.dev.java.net/";
    component.setUri( uri );
    assertEquals( "Ensuring uri set", uri, component.getUri() );
  }

  @Test
  public void foreground()
  {
    final Color color = new Color( 0x2f2f4f );
    component.setForeground( color );
    assertEquals( "Ensuring colour set", color, component.getForeground() );
  }

  @Test
  public void font()
  {
    final Font font = new Font( Font.HELVETICA, Font.BOLD, new Extent( 10 ) );
    component.setFont( font );
    assertEquals( "Ensuring font set", font, component.getFont() );
  }

  @Test
  public void target()
  {
    final Anchor.Target target = Anchor.Target._blank;
    component.setTarget( target );
    assertEquals( "Ensuring target set", target.toString(),
        component.getTarget() );
  }

  @Test
  public void text()
  {
    final String text = "A HTML Anchor tag";
    component.setText( text );
    assertEquals( "Ensuring text set", text, component.getText() );
  }

  @Test
  public void toolTip()
  {
    final String tooltip = "Click the link";
    component.setToolTipText( tooltip );
    assertEquals( "Ensuring tool tip set", tooltip, component.getToolTipText() );
  }

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();
    content.add( component );
  }
}
