package echopoint.tucana;

import echopoint.tucana.event.UploadCancelEvent;

/**
 * A runnable used to execute the upload cancel event call back handler.
 *
 * @author Rakesh Vidyadharan 2009-2-3
 * @version $Id$
 */
class CancelRunnable extends AbstractRunnable
{
  private static final long serialVersionUID = 1l;
  private final Exception e;

  CancelRunnable( final FileUploadSelector uploadSelect,
      final String uploadIndex, final String fileName,
      final String contentType, final Exception e, final UploadProgress progress )
  {
    super( uploadSelect, uploadIndex, fileName, contentType, progress );
    this.e = e;
  }

  public void run()
  {
    progress.setStatus( Status.cancelled );
    uploadSelect.notifyCallback( new UploadCancelEvent( uploadSelect,
        uploadIndex, fileName, contentType, progress.getContentLength(), e  ) );
  }
}