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

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import nextapp.echo.app.Button;
import nextapp.echo.app.Component;
import nextapp.echo.app.TextField;
import nextapp.echo.app.event.ActionListener;
import nextapp.echo.app.event.ActionEvent;

/**
 * @author Rakesh 2008-07-13
 * @version $Id$
 */
public class HttpPaneTest
{
  /** The default URI to load in the test component. */
  private static final String DEFAULT_URI =
      "http://wiki.nextapp.com/echowiki/EchoPoint";

  /** The component that will be tested. */
  private static HttpPane component;

  @BeforeClass
  public static void init()
  {
    final Component content = Application.getContent().getTestArea();
    component = new HttpPane();
    component.setRenderId( "echopointUnitTestHttpPane" );
    content.removeAll();
    content.add( component );

    assertEquals( "Ensuring test component added to container",
        content.getComponentCount(), 1 );
  }

  @Test
  public void get()
  {
    assertNotNull( "Ensuring that uri is not null", component.getURI() );
  }

  @Test
  public void set()
  {
    component.setURI( DEFAULT_URI );
    assertEquals( "Ensuring setting URI succeeded",
        component.getURI(), DEFAULT_URI );
  }

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();

    final TextField textField = createTextField();
    content.add( textField );
    content.add( createButton( textField ) );
    content.add( component );
  }

  private static TextField createTextField()
  {
    final TextField field = new TextField();
    field.setText( DEFAULT_URI );
    field.setStyleName( "Default" );
    return field;
  }

  private static Button createButton( final TextField field )
  {
    final Button button = new Button( "Load" );
    button.setStyleName( "Default" );

    button.addActionListener( new ActionListener()
    {
      private static final long serialVersionUID = 1l;

      public void actionPerformed( final ActionEvent event )
      {
        component.setURI( field.getText() );

        // Echo update manager does not seem to catch change of property
        final Component content = Application.getContent().getTestArea();
        content.remove( component );
        content.add( component );
      }
    });

    return button;
  }
}
