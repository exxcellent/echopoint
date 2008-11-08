package echopoint;

import echopoint.tucana.FileUploadSelector;
import echopoint.tucana.ProgressBar;
import nextapp.echo.app.Border;
import nextapp.echo.app.Color;
import nextapp.echo.app.Component;
import nextapp.echo.app.Extent;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 * Unit test suite for the {@link echopoint.tucana.FileUploadSelector}
 * component.
 *
 * @author Rakesh Vidyadharan 2008-11-4
 * @version $Id$
 */
public class FileUploadSelectorTest
{
  private static FileUploadSelector component;

  @BeforeClass
  public static void init()
  {
    component = new FileUploadSelector();
  }

  @Test
  public void buttonMode()
  {
    component.setButtonMode( FileUploadSelector.BUTTON_MODE_TEXT );
    assertEquals( "Ensure button mode set", component.getButtonMode(),
        FileUploadSelector.BUTTON_MODE_TEXT );
  }

  @Test
  public void width()
  {
    final Extent width = new Extent( 400 );
    component.setWidthExtent( width );
    assertEquals( "Ensure width set", width, component.getWidthExtent() );
  }

  @Test
  public void background()
  {
    final Color color = new Color( 0xa1a1a1 );
    component.setBackground( color );
    assertEquals( "Ensure foreground set", color, component.getBackground() );
  }

  @Test
  public void border()
  {
    final Border border = new Border( 1, Color.BLUE, Border.STYLE_GROOVE );
    component.setBorder( border );
    assertEquals( "Ensure border set", border, component.getBorder() );
  }

  @Test
  public void progressBar()
  {
    final ProgressBar bar = new ProgressBar();
    component.setProgressBar( bar );
    assertEquals( "Ensure that progress bar is set",
        bar, component.getProgressBar() );
  }

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();
    content.add( component );
  }
}
