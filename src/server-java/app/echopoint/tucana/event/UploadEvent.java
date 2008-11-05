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
package echopoint.tucana.event;

import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;

/**
 * An interface that represents an upload event.

 * <p><b>Note:</b> Development of this component was sponsored by <a
 * href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Broadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * @author jvolkman (Echo2), Rakesh 2008-11-2
 * @version $Id$
 */
public interface UploadEvent extends Serializable
{
  /**
   * Return the input stream associated with the upload.
   *
   * @return The input stream from which the data may be retrieved.
   * @throws IOException If errors are encountered.
   */
  public InputStream getInputStream() throws IOException;

  /**
   * Return the content type of the uploaded file.
   *
   * @return The content type property of the uploaded file.
   */
  public String getContentType();

  /**
   * The name of the file that was uploaded.
   *
   * @return The file name.
   */
  public String getFileName();

  /**
   * The size in bytes of the file that was uploaded.
   *
   * @return The file size in bytes.
   */
  public long getFileSize();
}
