package echopoint.tucana;

import echopoint.tucana.event.InvalidContentTypeEvent;

/**
 * A runnable used to execute the invalid content type call back handler.
 *
 * @author Rakesh 2009-02-03
 * @version $Id$
 */
class InvalidContentTypeRunnable extends AbstractRunnable
{
  private static final long serialVersionUID = 1l;

  InvalidContentTypeRunnable( final FileUploadSelector uploadSelect,
      final String uploadIndex, final String fileName,
      final String contentType, final UploadProgress progress )
  {
    super( uploadSelect, uploadIndex, fileName, contentType, progress );
  }

  public void run()
  {
    final String message =
        "Disallowed content-type: " + contentType + "!";

    uploadSelect.notifyCallback( new InvalidContentTypeEvent(
        uploadSelect, uploadIndex, fileName, contentType, progress.getContentLength() ) );
    progress.setStatus( Status.disallowed );
    progress.setMessage( message );
  }
}
