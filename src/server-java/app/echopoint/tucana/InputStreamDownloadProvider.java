package echopoint.tucana;

import org.apache.commons.io.IOUtils;

import java.io.OutputStream;
import java.io.IOException;
import java.io.InputStream;
import static java.util.UUID.randomUUID;

/**
 * A download provider implementation that streams the contents of the
 * specified input stream to the client request output stream on demand.
 *
 * @author Rakesh 2009-08-21
 * @version $Id$
 */
public class InputStreamDownloadProvider extends AbstractDownloadProvider
{
  private static final long serialVersionUID = 1L;

  /**
   * The input stream to use as the data source to write to the client
   * output stream.
   */
  @SuppressWarnings( { "TransientFieldNotInitialized" } )
  private transient final InputStream stream;

  /**
   * Create a new download provider instance for the specified input
   * stream.
   *
   * @param stream The input stream from which to stream the output.
   */
  public InputStreamDownloadProvider( final InputStream stream )
  {
    this.stream = stream;
  }

  public String getContentType()
  {
    return ( contentType == null ) ? "binary/octet-stream" : contentType;
  }

  public void writeFile( final OutputStream out ) throws IOException
  {
    status = Status.inprogress;

    try
    {
      IOUtils.copy( stream, out );
      out.flush();
    }
    catch ( IOException e )
    {
      status = Status.failed;
      throw e;
    }

    status = Status.completed;
  }

  @Override
  public String getFileName()
  {
    return ( fileName == null ) ? randomUUID().toString() : fileName;
  }
}
