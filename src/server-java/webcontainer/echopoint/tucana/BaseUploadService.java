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

import nextapp.echo.webcontainer.Connection;
import nextapp.echo.webcontainer.ContentType;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.UserInstance;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Base service for file uploads.
 *
 * @author Echo File Transfer Library
 * @version $Id$
 */
public abstract class BaseUploadService implements Service
{
  /**
   * Validates if the request contains a valid FileUploadSelector render id
   * and index.
   *
   * @see Service#service(Connection)
   */
  public void service( Connection conn ) throws IOException
  {
    UserInstance userInstance = conn.getUserInstance();
    if ( userInstance == null )
    {
      serviceBadRequest( conn, "No user instance available." );
      return;
    }
    HttpServletRequest request = conn.getRequest();
    String renderId = request.getParameter( "i" );
    if ( renderId == null )
    {
      serviceBadRequest( conn, "FileUploadSelector id not specified." );
      return;
    }
    FileUploadSelector uploadSelect = (FileUploadSelector)
        userInstance.getComponentByClientRenderId( renderId );
    if ( uploadSelect == null )
    {
      serviceBadRequest( conn,
          "FileUploadSelector id is not valid: " + renderId );
      return;
    }
    String uploadIndexParam = request.getParameter( "x" );
    if ( uploadIndexParam == null )
    {
      serviceBadRequest( conn,
          "FileUploadSelector upload index not specified." );
      return;
    }
    service( conn, uploadSelect, uploadIndexParam );
  }

  /**
   * Performs the actual service of the request.
   *
   * @param conn The connection to the application.
   * @param uploadSelect The file upload selector instance.
   * @param uploadIndex The unique index of the current upload for the instance.
   * @throws java.io.IOException If errors are encountered.
   */
  public abstract void service( final Connection conn,
      final FileUploadSelector uploadSelect, final String uploadIndex )
    throws IOException;

  /**
   * Serves a bad request message.
   *
   * @param conn The connection to the application.
   * @param message The message to display for the bad request.
   */
  protected static void serviceBadRequest( final Connection conn,
      final String message )
  {
    conn.getResponse().setStatus( HttpServletResponse.SC_BAD_REQUEST );
    conn.setContentType( ContentType.TEXT_PLAIN );
    conn.getWriter().write( message );
  }
}
