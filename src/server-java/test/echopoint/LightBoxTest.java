package echopoint;

import nextapp.echo.app.Button;
import nextapp.echo.app.Component;
import nextapp.echo.app.Extent;
import nextapp.echo.app.Label;
import nextapp.echo.app.WindowPane;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 * Unit test suite for the {@link echopoint.LightBox} component.
 *
 * @author Rakesh Vidyadharan 2009-03-06
 * @version $Id$
 */
public class LightBoxTest extends AbstractTest<LightBox>
{
  @BeforeClass
  public static void init()
  {
    set( new LightBox() );
  }

  @Test
  public void renderId()
  {
    final String renderId = "echopointUnitTestLightBox";
    getComponent().setRenderId( renderId );
    assertEquals( "Ensuring renderId set", renderId,
        getComponent().getRenderId() );
  }

  @Test
  public void hidden()
  {
    final boolean hidden = true;
    getComponent().setHidden( hidden );
    assertEquals( "Ensure hidden set", hidden, getComponent().getHidden() );
  }

  @Test
  public void parentOnly()
  {
    final boolean parentOnly = true;
    getComponent().setParentOnly( parentOnly );
    assertEquals( "Ensure parentOnly set", parentOnly,
        getComponent().getParentOnly() );
  }

  @Test
  public void add()
  {
    final Button button = new Button( "Close" );
    button.addActionListener( new ActionListener()
    {
      private static final long serialVersionUID = 1L;

      public void actionPerformed( final ActionEvent event )
      {
        getComponent().setHidden( true );
      }
    });

    getComponent().add( button );
  }

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();

    content.add( new Label( "Label 1" ) );
    content.add( new Strut() );
    content.add( new Label( "Label 2" ) );
    content.add( new Strut() );
    content.add( new Label( "Label 3" ) );
    content.add( new Strut() );
    content.add( new Label( "Label 4" ) );
    content.add( new Strut() );

    final LightBox box = (LightBox) get();
    final Button button = new Button( "Toggle" );
    button.addActionListener( new ActionListener()
    {
      private static final long serialVersionUID = 1L;

      public void actionPerformed( final ActionEvent event )
      {
        box.setHidden( ! box.getHidden() );
      }
    });

    content.add( button );
    createWindowPane();
  }

  private static void createWindowPane()
  {
    final WindowPane pane = new WindowPane();
    pane.setClosable( false );
    pane.setHeight( new Extent( 300 ) );
    pane.setWidth( new Extent( 400 ) );
    pane.add( get() );
    Application.getContent().add( pane );
  }
}
