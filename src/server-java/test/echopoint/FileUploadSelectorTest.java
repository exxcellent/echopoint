package echopoint;

import echopoint.tucana.ButtonMode;
import echopoint.tucana.DownloadButton;
import echopoint.tucana.FileUploadSelector;
import echopoint.tucana.ProgressBar;
import echopoint.tucana.event.DefaultUploadCallback;
import echopoint.tucana.event.DownloadCallbackAdapter;
import echopoint.tucana.event.InvalidContentTypeEvent;
import echopoint.tucana.event.UploadCallback;
import echopoint.tucana.event.UploadFinishEvent;
import nextapp.echo.app.Border;
import nextapp.echo.app.Color;
import nextapp.echo.app.Component;
import nextapp.echo.app.Extent;
import nextapp.echo.app.Font;
import nextapp.echo.app.Insets;
import nextapp.echo.app.Row;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.File;
import java.util.HashSet;
import java.util.logging.Level;

/**
 * Unit test suite for the {@link echopoint.tucana.FileUploadSelector}
 * component.
 *
 * @author Rakesh Vidyadharan 2008-11-4
 * @version $Id$
 */
public class FileUploadSelectorTest extends AbstractTest<FileUploadSelector>
{
  @BeforeClass
  public static void init()
  {
    set( new FileUploadSelector() );
  }

  @Test
  public void buttonMode()
  {
    final ButtonMode mode = ButtonMode.image;
    getComponent().setButtonMode( mode );
    assertEquals( "Ensure button mode set", mode, getComponent().getButtonMode() );
  }

  @Test
  public void inputSize()
  {
    final int size = 17;
    getComponent().setInputSize( size );
    assertEquals( "Ensure input size set", size, getComponent().getInputSize() );
  }

  @Test
  public void background()
  {
    final Color color = new Color( 0xa1a1a1 );
    getComponent().setBackground( color );
    assertEquals( "Ensure foreground set", color, getComponent().getBackground() );
  }

  @Test
  public void border()
  {
    final Border border = new Border( 1, Color.BLUE, Border.STYLE_GROOVE );
    getComponent().setBorder( border );
    assertEquals( "Ensure border set", border, getComponent().getBorder() );
  }

  @Test
  public void font()
  {
    final Font font = new Font( Font.HELVETICA, Font.PLAIN, new Extent( 12 ) );
    getComponent().setFont( font );
    assertEquals( "Ensure font set", font, getComponent().getFont() );
  }

  @Test
  public void height()
  {
    final Extent height = new Extent( 47 );
    getComponent().setHeight( height );
    assertEquals( "Ensure height set", height, getComponent().getHeight() );
  }

  @Test
  public void insets()
  {
    final Insets insets = new Insets( new Extent( 2 ) );
    getComponent().setInsets( insets );
    assertEquals( "Ensure insets set", insets, getComponent().getInsets() );
  }

  @Test
  public void progressBar()
  {
    final ProgressBar bar = new ProgressBar();
    bar.setWidth( new Extent( 298 ) );
    bar.setPattern( "#bytes# of #length# Kb @ #rate# Kb/s" );
    getComponent().setProgressBar( bar );
    assertEquals( "Ensure that progress bar is set",
        bar, getComponent().getProgressBar() );
  }

  @Test
  public void pollingInterval()
  {
    final int interval = 100;
    getComponent().setPollingInterval( interval );
    assertEquals( "Ensuring polling interval set", interval,
        getComponent().getPollingInterval() );
  }

  @Test
  public void filter()
  {
    final HashSet<String> set = new HashSet<String>();
    set.add( "image/gif" );
    set.add( "image/jpeg" );
    set.add( "image/png" );
    getComponent().setContentTypeFilter( set );
    assertEquals( "Ensure content type filter set", set,
        getComponent().getContentTypeFilter() );
  }

  @Test
  public void callback()
  {
    final DefaultUploadCallback callback =
        new DefaultUploadCallback( new File( "/tmp" ) );
    callback.setLevel( Level.INFO );
    getComponent().setUploadCallback( callback );
    assertEquals( "Ensuring callback set", callback, getComponent().getUploadCallback() );
  }

  @Test
  public void actionListener()
  {
    final FinishListener listener = new FinishListener();
    getComponent().addActionListener( listener );
  }

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();
    content.add( get() );
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
        final boolean success = ( callback.getEvent() instanceof UploadFinishEvent );

        if ( success )
        {
          upload.getParent().add( displayDownload( callback ) );
        }
        else
        {
          displayError( upload, callback );
        }

        if ( upload.getProgressBar() != null )
        {
          if ( success ) upload.getProgressBar().setPercentage( 100 );

          if ( ! ( callback.getEvent() instanceof InvalidContentTypeEvent ) )
          {
            final ProgressBar bar = (ProgressBar) upload.getProgressBar();
            if ( bar != null )
            {
              bar.setText( ( success ) ? "Finished upload!" : "Cancelled upload!" );
            }
          }
        }
      }
    }

    private Component displayDownload( final UploadCallback callback )
    {
      final StringBuilder builder = new StringBuilder( 128 );
      builder.append( "Upload of file: <b>" );
      builder.append( callback.getEvent().getFileName() );
      builder.append( "</b> succeeded.  File size is: <i>");
      builder.append( ( (UploadFinishEvent)
          callback.getEvent() ).getFileSize() / 1000 );
      builder.append( "</i> kilobytes." );

      final Row row = new Row();
      final File file = new File ( "/tmp/" + callback.getEvent().getFileName() );
      final DownloadButton button = new DownloadButton( file );
      ( (DownloadCallbackAdapter) button.getDownloadCallback() ).setLevel( Level.INFO );
      row.add( button );
      row.add( new Strut() );
      row.add( new DirectHtml( builder.toString() ) );

      return row;
    }

    private void displayError( final FileUploadSelector upload,
        final UploadCallback callback )
    {
      final StringBuilder builder = new StringBuilder( 128 );
      builder.append( "Upload " );
      if ( callback.getEvent() != null )
      {
        builder.append( " of file: <b>" );
        builder.append( callback.getEvent().getFileName() );
        builder.append( "</b>" );
      }

      builder.append( " failed/cancelled." );
      upload.getParent().add( new DirectHtml( builder.toString() ) );
    }
  }
}
