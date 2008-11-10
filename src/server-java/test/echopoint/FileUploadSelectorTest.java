package echopoint;

import echopoint.tucana.ButtonMode;
import echopoint.tucana.FileUploadSelector;
import echopoint.tucana.ProgressBar;
import echopoint.tucana.event.DefaultUploadCallback;
import echopoint.tucana.event.UploadCallback;
import echopoint.tucana.event.UploadFinishEvent;
import nextapp.echo.app.Border;
import nextapp.echo.app.Color;
import nextapp.echo.app.Component;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.File;
import java.util.logging.Level;

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
    final ButtonMode mode = ButtonMode.image;
    component.setButtonMode( mode );
    assertEquals( "Ensure button mode set", mode, component.getButtonMode() );
  }

  @Test
  public void inputSize()
  {
    final int size = 16;
    component.setInputSize( size );
    assertEquals( "Ensure input size set", size, component.getInputSize() );
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

  @Test
  public void pollingInterval()
  {
    final int interval = 100;
    component.setPollingInterval( interval );
    assertEquals( "Ensuring polling interval set", interval,
        component.getPollingInterval() );
  }

  @Test
  public void repollCount()
  {
    final int count = 5;
    component.setRepollCount( count );
    assertEquals( "Ensuring repoll count set", count, component.getRepollCount() );
  }

  @Test
  public void callback()
  {
    final DefaultUploadCallback callback =
        new DefaultUploadCallback( new File( "/tmp" ) );
    callback.setLevel( Level.INFO );
    component.setUploadCallback( callback );
    assertEquals( "Ensuring callback set", callback, component.getUploadCallback() );
  }

  @Test
  public void actionListener()
  {
    final FinishListener listener = new FinishListener();
    component.addActionListener( listener );
  }

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();
    content.add( component );
  }

  private static class FinishListener implements ActionListener
  {
    private static final long serialVersionUID = 1l;

    public void actionPerformed( final ActionEvent event )
    {
      final FileUploadSelector upload = ( FileUploadSelector) event.getSource();
      final UploadCallback callback = upload.getUploadCallback();
      if ( callback != null )
      {
        final StringBuilder builder = new StringBuilder( 128 );
        final boolean success = ( callback.getEvent() instanceof UploadFinishEvent );

        if ( success )
        {
          builder.append( "Upload of file: <b>" );
          builder.append( callback.getEvent().getFileName() );
          builder.append( "</b> succeeded.  File size is: <i>");
          builder.append( callback.getEvent().getFileSize() / 1000 );
          builder.append( "</i> kilobytes." );
        }
        else
        {
          builder.append( "Upload " );
          if ( callback.getEvent() != null )
          {
            builder.append( " of file: <b>" );
            builder.append( callback.getEvent().getFileName() );
            builder.append( "</b>" );
          }

          builder.append( " failed/cancelled." );
        }

        component.getParent().add( new DirectHtml( builder.toString() ) );

        if ( component.getProgressBar() != null )
        {
          component.getProgressBar().setText( ( success ) ?
              "Finished upload!" : "Cancelled upload!" );
        }
      }
    }
  }
}
