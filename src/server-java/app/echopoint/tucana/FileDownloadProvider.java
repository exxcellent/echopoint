package echopoint.tucana;

import eu.medsea.util.MimeUtil;

import java.io.OutputStream;
import java.io.File;
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.SocketException;

import org.apache.commons.io.IOUtils;

/**
 * A download provider for sending files to the client.
 *
 * @author Rakesh 2008-11-10
 * @version $Id$
 */
public class FileDownloadProvider extends AbstractDownloadProvider
{
  private static final long serialVersionUID = 1l;

  /** The file that is to be enqueued for download to the client. */
  private final File file;

  public FileDownloadProvider( final File file )
  {
    this.file = file;
    this.fileName = file.getName();
    this.size = file.length();
  }

  /**
   * Returns the content type, for example "text/plain".
   *
   * @return the content type.
   */
  public String getContentType()
  {
    final String mimeType = MimeUtil.getMimeType(file);
    return ( mimeType == null ) ? MimeUtil.UNKNOWN_MIME_TYPE : mimeType;
  }

  /**
   * Writes the file data to the output stream.
   *
   * @param out the output stream to which the file data must be written.
   * @throws IOException If errors are encountered while writing the contents
   *   to the output stream.
   */
  public void writeFile( final OutputStream out ) throws IOException
  {
    status = Status.inprogress;

    try
    {
      BufferedInputStream bis =
          new BufferedInputStream( new FileInputStream( file ) );
      IOUtils.copy( bis, out );
      out.flush();
      bis.close();
    }
    catch ( IOException e )
    {
      status = Status.failed;
      throw e;
    }
    
    status = Status.completed;
  }
}
