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

import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.Connection;
import nextapp.echo.webcontainer.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import org.apache.commons.fileupload.servlet.ServletFileUpload;
import echopoint.tucana.event.UploadFailEvent;

/**
 * Processes a file upload HTTP request from the client.
 *
 * @author Echo File Transfer Library
 * @version $Id$
 */
public class UploadReceiverService extends BaseUploadService
{
  private static final Service INSTANCE = new UploadReceiverService();

  static
  {
    WebContainerServlet.getServiceRegistry().add( INSTANCE );
  }

  private UploadReceiverService() {}

  /** Installs this service. */
  public static void install()
  {
    WebContainerServlet.setMultipartRequestWrapper(
        UploadProviderFactory.getUploadProvider() );
  }

  /** @see nextapp.echo.webcontainer.Service#getId() */
  public String getId()
  {
    return "echopoint.tucana.UploadReceiverService";
  }

  /** @see nextapp.echo.webcontainer.Service#getVersion() */
  public int getVersion()
  {
    return DO_NOT_CACHE;
  }

  /**
   * @see BaseUploadService#service(nextapp.echo.webcontainer.Connection ,
   *      FileUploadSelector, int)
   */
  public void service( final Connection conn,
      final FileUploadSelector uploadSelect, final int uploadIndex )
    throws IOException
  {
    final HttpServletRequest request = conn.getRequest();
    if ( !ServletFileUpload.isMultipartContent( request ) )
    {
      serviceBadRequest( conn, "Request must contain multipart content." );
      return;
    }
    /*
    if ( uploadSelect.getUploadCallback() == null )
    {
      serviceBadRequest( conn, "FileUploadSelector does not have a callback." );
      return;
    }
    */

    final String contentLengthHeader = request.getHeader( "Content-Length" );
    long contentLength;
    if ( contentLengthHeader != null )
    {
      contentLength = Math.max( Long.parseLong( contentLengthHeader ), -1 );
    }
    else
    {
      contentLength = -1;
    }

    final UploadRenderState renderState =
        FileUploadSelectorPeer.getRenderState( uploadSelect,
            conn.getUserInstance() );
    final UploadProgress progress = new UploadProgress( contentLength );
    renderState.setProgress( uploadIndex, progress );
    renderState.uploadStarted( uploadIndex );

    try
    {
      UploadProviderFactory.getUploadProvider().handleUpload(
          conn, uploadSelect, uploadIndex, progress );
    }
    catch ( Exception e )
    {
      if ( uploadSelect.isUploadCanceled( uploadIndex ) )
      {
        // we don't care
        return;
      }

      uploadSelect.notifyListener(
          new UploadFailEvent( uploadSelect, uploadIndex, e ) );
    }
    finally
    {
      renderState.uploadEnded( uploadIndex );
    }
  }
}
