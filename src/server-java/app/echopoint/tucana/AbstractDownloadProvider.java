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

import java.io.Serializable;

/**
 * An abstract implementation that returns default values for non-mandatory
 * methods.
 *
 * @author Echo File Transfer Library
 * @version $Id$
 */
public abstract class AbstractDownloadProvider
    implements DownloadProvider, Serializable
{
  private static final long serialVersionUID = 1L;

  /**The file name of the content being enqueued to the client. */
  protected String fileName;

  /** The content length of the file (or equivalent) being enqueued to client. */
  protected long size;

  /** The content disposition for the file being sent to client. */
  protected String contentDisposition = "attachment";

  /** The status of the download process. */
  protected Status status;

  /** {@inheritDoc} */
  public String getFileName()
  {
    return fileName;
  }

  /** {@inheritDoc} */
  public long getSize()
  {
    return size;
  }

  /** {@inheritDoc} */
  public String getContentDisposition()
  {
    return contentDisposition;
  }

  /** {@inheritDoc} */
  public Status getStatus()
  {
    return status;
  }
}
