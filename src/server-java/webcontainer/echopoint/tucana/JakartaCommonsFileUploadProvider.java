/*
 * This file is part of the Echo Point Project.  This project is a
 * collection of Components that have extended the Echo Web Application
 * Framework Version 3.
 *
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 */
package echopoint.tucana;

import echopoint.tucana.event.UploadCancelEvent;
import echopoint.tucana.event.UploadFailEvent;
import echopoint.tucana.event.UploadFinishEvent;
import echopoint.tucana.event.UploadStartEvent;
import nextapp.echo.webcontainer.Connection;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadBase;
import org.apache.commons.fileupload.MultipartStream;
import org.apache.commons.fileupload.ProgressListener;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;

/**
 * {@link UploadSPI} implementation that uses the
 * <a href='http://jakarta.apache.org/commons/fileupload' target='_blank'>Jakarta
 * Commons FileUpload</a> library.
 *
 * @author Echo File Transfer Library
 * @version $Id$
 */
public class JakartaCommonsFileUploadProvider extends AbstractFileUploadProvider
{
  /**
   * @see UploadSPI#handleUpload(nextapp.echo.webcontainer.Connection ,
   *      FileUploadSelector, String, UploadProgress)
   */
  public void handleUpload( final Connection conn,
      final FileUploadSelector uploadSelect, final String uploadIndex,
      final UploadProgress progress ) throws Exception
  {
    DiskFileItemFactory itemFactory = new DiskFileItemFactory();
    itemFactory.setRepository( getDiskCacheLocation() );
    itemFactory.setSizeThreshold( getMemoryCacheThreshold() );

    String encoding = conn.getRequest().getCharacterEncoding();
    if ( encoding == null )
    {
      encoding = "UTF-8";
    }

    ServletFileUpload upload = new ServletFileUpload( itemFactory );
    upload.setHeaderEncoding( encoding );
    upload.setProgressListener( new UploadProgressListener( progress ) );
    if ( getFileUploadSizeLimit() != NO_SIZE_LIMIT )
    {
      upload.setSizeMax( getFileUploadSizeLimit() );
    }

    String fileName = null;
    String contentType = null;

    try
    {
      FileItemIterator iter = upload.getItemIterator( conn.getRequest() );
      if ( iter.hasNext() )
      {
        FileItemStream stream = iter.next();

        if ( !stream.isFormField() )
        {
          fileName = FilenameUtils.getName( stream.getName() );
          contentType = stream.getContentType();

          progress.setStatus( Status.inprogress );
          uploadSelect.notifyCallback( new UploadStartEvent( uploadSelect,
              uploadIndex, fileName, contentType ) );
          FileItem item = itemFactory.createItem( fileName,
              contentType, false, stream.getName() );
          IOUtils.copy( stream.openStream(), item.getOutputStream() );

          uploadSelect.notifyCallback( new UploadFinishEvent( uploadSelect,
              uploadIndex, fileName, item.getContentType(), item ) );
          progress.setStatus( Status.completed );
          return;
        }
      }

      progress.setStatus( Status.failed );
      uploadSelect.notifyCallback( new UploadFailEvent( uploadSelect,
          uploadIndex, fileName, contentType,
          new RuntimeException( "No multi-part content!" ) ) );
    }
    catch ( FileUploadBase.SizeLimitExceededException e )
    {
      progress.setStatus( Status.failed );
      uploadSelect.notifyCallback( new UploadFailEvent( uploadSelect,
          uploadIndex, fileName, contentType,
          new UploadSizeLimitExceededException( e ) ) );
    }
    catch ( FileUploadBase.FileSizeLimitExceededException e )
    {
      progress.setStatus( Status.failed );
      uploadSelect.notifyCallback( new UploadFailEvent( uploadSelect,
          uploadIndex, fileName, contentType,
          new UploadSizeLimitExceededException( e ) ) );
    }
    catch ( MultipartStream.MalformedStreamException e )
    {
      progress.setStatus( Status.cancelled );
      uploadSelect.notifyCallback( new UploadCancelEvent( uploadSelect,
          uploadIndex, fileName, contentType, e  ) );
    }
  }

  private static final class UploadProgressListener implements ProgressListener
  {
    private final UploadProgress progress;

    private UploadProgressListener( UploadProgress progress )
    {
      this.progress = progress;
    }

    public void update( long pBytesRead, long pContentLength, int pItems )
    {
      progress.setBytesRead( pBytesRead );
    }
  }
}
