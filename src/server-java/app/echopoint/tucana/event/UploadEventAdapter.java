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

import echopoint.tucana.FileUploadSelector;

import java.io.InputStream;
import java.io.IOException;
import java.util.EventObject;

/**
 * A basic adapter class for the {@link UploadEvent} interface.  Sub-classes
 * exist to explicitly specify the kind of event that was generated.

 * <p><b>Note:</b> Development of this component was sponsored by <a
 * href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Broadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * @author Rakesh Vidyadharan 2008-11-4
 * @version $Id$
 */
public abstract class UploadEventAdapter extends EventObject implements UploadEvent
{
  private static final long serialVersionUID = 1l;

  private final int index;
  private final String contentType;
  private final String fileName;
  private transient final InputStream inputStream;
  private final long size;

  /**
   * Creates a new {@link UploadEvent}.
   *
   * @param source the source of the event
   * @param index the index of the upload
   * @param fileName the name of the file, may not contain path information
   * @param inputStream an input stream containing the uploaded file
   * @param size the size of the uploaded file, in bytes
   * @param contentType the content type of the uploaded file
   */
  public UploadEventAdapter( final FileUploadSelector source, final int index,
      final String fileName,  final InputStream inputStream,
      final long size, final String contentType )
  {
    super( source );
    this.index = index;
    this.fileName = fileName;
    this.inputStream = inputStream;
    this.size = size;
    this.contentType = contentType;
  }

  /**
   * Returns the index of the file.
   *
   * @return the index of the file.
   */
  public int getIndex()
  {
    return index;
  }


  /**
   * Return the input stream associated with the upload.
   *
   * @return The input stream from which the data may be retrieved.
   * @throws java.io.IOException If errors are encountered.
   */
  public InputStream getInputStream() throws IOException
  {
    return inputStream;
  }

  /**
   * Return the content type of the uploaded file.
   *
   * @return The content type property of the uploaded file.
   */
  public String getContentType()
  {
    return contentType;
  }

  /**
   * The name of the file that was uploaded.
   *
   * @return The file name.
   */
  public String getFileName()
  {
    return fileName;
  }

  /**
   * The size in bytes of the file that was uploaded.
   *
   * @return The file size in bytes.
   */
  public long getFileSize()
  {
    return size;
  }
}
