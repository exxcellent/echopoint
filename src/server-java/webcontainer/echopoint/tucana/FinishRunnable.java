package echopoint.tucana;

import echopoint.tucana.event.UploadFinishEvent;
import org.apache.commons.fileupload.FileItem;

/**
 * A runnable used to execute the upload finish event call back handler.
 *
 * @author Rakesh Vidyadharan 2009-2-3
 * @version $Id$
 */
class FinishRunnable extends AbstractRunnable
{
  private static final long serialVersionUID = 1L;
  private final FileItem item;

  FinishRunnable( final FileUploadSelector uploadSelect,
      final String uploadIndex, final String fileName, final FileItem item,
      final UploadProgress progress )
  {
    super( uploadSelect, uploadIndex, fileName, item.getContentType(), progress );
    this.item = item;
  }

  public void run()
  {
    uploadSelect.notifyCallback( new UploadFinishEvent( uploadSelect,
        uploadIndex, fileName, item.getContentType(), item ) );
    progress.setStatus( Status.completed );
  }
}
