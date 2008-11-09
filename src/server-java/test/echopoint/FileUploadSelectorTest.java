package echopoint;

import echopoint.tucana.FileUploadSelector;
import echopoint.tucana.ProgressBar;
import echopoint.tucana.event.UploadCallbackAdapter;
import echopoint.tucana.event.UploadFailEvent;
import echopoint.tucana.event.UploadFinishEvent;
import nextapp.echo.app.Border;
import nextapp.echo.app.Color;
import nextapp.echo.app.Component;
import nextapp.echo.app.Extent;
import nextapp.echo.app.TaskQueueHandle;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.Serializable;

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
    /*
    component.setButtonMode( FileUploadSelector.BUTTON_MODE_TEXT );
    assertEquals( "Ensure button mode set", component.getButtonMode(),
        FileUploadSelector.BUTTON_MODE_TEXT );
        */
  }

  @Test
  public void width()
  {
    final Extent width = new Extent( 400 );
    component.setWidthExtent( width );
    assertEquals( "Ensure width set", width, component.getWidthExtent() );
  }

  @Test
  public void inputSize()
  {
    final int size = 35;
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
    final int count = 10;
    component.setRepollCount( count );
    assertEquals( "Ensuring repoll count set", count, component.getRepollCount() );
  }

  @Test
  public void callback()
  {
    final Application app = Application.getApplication();
    final TaskQueueHandle queue = app.createTaskQueue();
    final UploadCallback callback = new UploadCallback(
        app, queue, Application.getContent().getTestArea() );
    component.setUploadCallback( callback );
    assertEquals( "Ensuring callback set", callback, component.getUploadCallback() );
  }

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();
    content.add( component );
  }

  private static class UploadCallback extends UploadCallbackAdapter
  {
    private static final long serialVersionUID = 1l;
    private final Application app;
    private final TaskQueueHandle queue;
    private final Component parent;

    private UploadCallback( final Application app,
        final TaskQueueHandle queue, final Component parent )
    {
      this.app = app;
      this.queue = queue;
      this.parent = parent;
    }

    @Override
    public void uploadSucceeded( final UploadFinishEvent event )
    {
      final StringBuilder builder = new StringBuilder( 128 );
      builder.append( "Upload of file: <b>" );
      builder.append( event.getFileName() );
      builder.append( "</b> succeeded.  File size is: <i>");
      builder.append( event.getFileSize() / 1000 );
      builder.append( "</i> kilobytes." );
      final DirectHtml html = new DirectHtml( builder.toString() );
      update( html );
      //super.uploadSucceeded( event );
    }

    @Override
    public void uploadFailed( final UploadFailEvent event )
    {
      final StringBuilder builder = new StringBuilder( 128 );
      builder.append( "File upload failed." );
      if ( event.getFileName() != null )
      {
        builder.append( "  Failed file: <i>" );
        builder.append( event.getFileName() );
        builder.append( "</i>." );
      }

      if ( event.getException() != null )
      {
        builder.append( "Exception: <p><pre>" );
        builder.append( event.getException().toString() );
        builder.append( "</pre></p>" );
      }

      final DirectHtml html = new DirectHtml( builder.toString() );
      update( html );
      //super.uploadFailed( event );
    }

    private void update( final Component component )
    {
      app.enqueueTask( queue, new Update( queue, component, parent, app ) );
    }
  }

  private static class Update implements Runnable, Serializable
  {
    private static final long serialVersionUID = 1l;

    private final TaskQueueHandle queue;
    private final Component parent;
    private final Component child;
    private final Application app;

    private Update( final TaskQueueHandle queue, final Component component,
        final Component parent, final Application app )
    {
      this.queue = queue;
      this.child = component;
      this.parent = parent;
      this.app = app;
    }

    public void run()
    {
      parent.add( child );
      app.removeTaskQueue( queue );
    }
  }
}
