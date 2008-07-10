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

import static org.junit.Assert.*;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import nextapp.echo.app.Border;
import nextapp.echo.app.Button;
import nextapp.echo.app.Color;
import nextapp.echo.app.Component;
import nextapp.echo.app.Row;
import nextapp.echo.app.Label;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;
import nextapp.echo.extras.app.RichTextArea;

/**
 * Test case for the {@link DirectHtml} component.  Exercises getting and
 * setting the display text.
 *
 * @author Rakesh 2008-06-25
 * @version $Id$
 */
public class DirectHtmlTest
{
  /** The component that will be tested. */
  private static DirectHtml component;

  /** The simple text to display in the test component. */
  private static final String SIMPLE_TEXT =
      "<br/><br/><b>DirectHtml</b> simple test content.<br/><br/>";

  /** The complex text to display in the test component. */
  private static final String COMPLEX_TEXT =
      "<h2>DirectHtml Without Target</h2>" +
          "<p><b>First</b> paragraph content.</p>" +
          "<p><b>Second</b> paragraph content.</p>" +
          "<ol><li><b>First</b> line.</li>" +
          "<li><b>Second</b> line.</li>" +
          "<li><b>Third</b> line.</li></ol>" +
          "<p>Clicking <a href='http://wiki.nextapp.com/echowiki/EchoPoint'>link</a>" +
          " should open in the same browser window/tab.</p>";

  /** The text with links to test {@link DirectHtml#setTarget} manually. */
  private static final String LINK_TEXT =
      "<h2>DirectHtml With Target Set</h2>" +
          "<p>Clicking <a href='http://wiki.nextapp.com/echowiki/EchoPoint'>link</a>" +
          " should open in a new browser window/tab.</p>" +
          "<p>Clicking <a href='http://wiki.nextapp.com/echowiki/EchoPoint' target=''>link</a>" +
          " should open in the same browser window/tab.</p>";

  @BeforeClass
  public static void init()
  {
    final Component content = Application.getContent().getTestArea();
    component = new DirectHtml();
    content.removeAll();
    content.add( component );

    assertEquals( "Ensuring test component added to container",
        content.getComponentCount(), 1 );
  }

  @Test
  public void simple()
  {
    component.setText( SIMPLE_TEXT );

    assertEquals( "Ensuring getText returns simple",
        component.getText(), SIMPLE_TEXT );
  }

  @Test
  public void complex()
  {
    component.setText( COMPLEX_TEXT );

    assertEquals( "Ensuring getText returns complex",
        component.getText(), COMPLEX_TEXT );
  }

  @Test
  public void add()
  {
    try
    {
      component.add( new Label( "Test label" ) );
      fail( "Label added to DirectHtml" );
    }
    catch ( Throwable t ) {}
  }

  @Test
  public void append()
  {
    component.setText( null );
    assertNull( "Ensuring getText returns null", component.getText() );

    component.append( SIMPLE_TEXT );
    component.append( COMPLEX_TEXT );
    assertEquals( "Ensuring append returns simple + complex",
        component.getText(), SIMPLE_TEXT + COMPLEX_TEXT );
  }

  @Test
  public void target()
  {
    final String target = "_new";
    component.setTarget( target );
    assertEquals( "Ensuring target returned is same",
        component.getTarget(), target );
  }

  /**
   * Display an RTA and display button to let user interact with the
   * {@link DirectHtml} component.
   *
   * <p>RTA disabled for the moment due to some issues with loading the RTA.</p>
   */
  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();

    /*
    final RichTextArea rta = new RichTextArea();
    rta.setText( COMPLEX_TEXT );
    content.add( rta );

    final Row row = new Row();
    row.add( createButton( rta ) );
    content.add( row );
    */

    content.add( new DirectHtml( COMPLEX_TEXT ) );

    content.add( new DirectHtml( LINK_TEXT, "_new" ) );
  }

  /**
   * Create the control button that copies the text from the RTA to the HTML
   * component.
   *
   * @param rta The RTA to be passed in to the action listener for the button.
   * @return The properly initialised button component.
   */
  private static Button createButton( final RichTextArea rta )
  {
    final Button button = new Button( "Display" );

    final Color color = Color.BLACK;
    final Border border = new Border( 1, color, Border.STYLE_OUTSET );
    button.setBorder( border );

    final Border pressed = new Border( 1, color, Border.STYLE_INSET );
    button.setPressedBorder( pressed );

    button.addActionListener( new Listener( rta, component ) );
    return button;
  }

  /**
   * The action listener that copies the contents of the RTA to the HTML
   * component.
   */
  static class Listener implements ActionListener
  {
    private static final long serialVersionUID = 1l;

    final RichTextArea rta;
    final DirectHtml directHtml;

    Listener( final RichTextArea rta, final DirectHtml directHtml )
    {
      this.rta = rta;
      this.directHtml = directHtml;
    }

    public void actionPerformed( final ActionEvent event )
    {
      directHtml.setText( rta.getText() );
    }
  }
}
