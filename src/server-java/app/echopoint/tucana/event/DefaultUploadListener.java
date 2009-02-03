package echopoint.tucana.event;

import echopoint.tucana.FileUploadSelector;
import nextapp.echo.app.ApplicationInstance;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;

/**
 * A default action listener to associate with the {@link
 * echopoint.tucana.FileUploadSelector} component.  Sets up a task queue
 * at start of upload and cleans it up after being notified that the queue
 * is not longer necessary.
 *
 * <p><b>Note:</b> Development of this component was sponsored by <a
 * href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Broadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * @author Rakesh Vidyadharan 2009-2-3
 * @version $Id$
 */
public class DefaultUploadListener implements ActionListener
{
  private static final long serialVersionUID = 1l;

  /**
   * Initialise the {@link echopoint.tucana.FileUploadSelector#getTaskQueue()}
   * to enable server-push from callback handlers.
   *
   * @param event The action event that was triggered.
   */
  public void actionPerformed( final ActionEvent event )
  {
    final FileUploadSelector upload = ( FileUploadSelector) event.getSource();

    if ( FileUploadSelector.START_ACTION.equals( event.getActionCommand() ) )
    {
      upload.setTaskQueue( ApplicationInstance.getActive().createTaskQueue() );
    }
  }
}
