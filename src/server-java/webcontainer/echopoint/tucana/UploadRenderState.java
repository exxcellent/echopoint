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

import nextapp.echo.webcontainer.RenderState;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * <code>RenderState</code> implementation for <code>UploadSelect</code>
 * components. This class is thread-safe.
 *
 * @author Echo FileTransfer Library
 * @version $Id$
 */
public class UploadRenderState implements RenderState
{
  private static final long serialVersionUID = 1l;

  private int maxUploadIndex;

  private final Map<Integer, UploadProgress> progress;
  private final Map<Integer,Integer> ended;

  /** Creates a new <code>UploadRenderState</code>. */
  public UploadRenderState()
  {
    this.maxUploadIndex = -1;
    this.progress = new ConcurrentHashMap<Integer, UploadProgress>();
    this.ended = new ConcurrentHashMap<Integer,Integer>();
  }

  /**
   * Gets the maximum upload index currently in use. This index can be used to
   * prevent duplicate indices when performing client-side refreshes.
   *
   * @return the index or <code>-1</code> if no uploads indices are present.
   */
  public int getMaxUploadIndex()
  {
    return maxUploadIndex;
  }

  /**
   * Announces that an upload with given index has started.
   *
   * @param uploadIndex the upload index
   */
  public void uploadStarted( int uploadIndex )
  {
    maxUploadIndex = uploadIndex;
  }

  /**
   * Determines whether the upload with the specified index has ended.
   *
   * @param uploadIndex the upload index
   * @return <code>true</code> if the upload has ended.
   */
  public boolean isUploadEnded( int uploadIndex )
  {
    return ended.containsKey( uploadIndex );
  }

  /**
   * Announces that an upload with given index has ended.
   *
   * @param uploadIndex The upload index for the current upload.
   */
  public void uploadEnded( int uploadIndex )
  {
    ended.put(  uploadIndex, uploadIndex );
  }

  /**
   * Gets the progress for the given upload index.
   *
   * @param uploadIndex the upload index
   * @return the progress if available, <code>null</code> otherwise.
   */
  public UploadProgress getProgress( int uploadIndex )
  {
    return progress.get( uploadIndex );
  }

  /**
   * Sets the progress for the specified upload index.
   *
   * @param uploadIndex the upload index
   * @param progress the progress
   */
  public void setProgress( int uploadIndex, UploadProgress progress )
  {
    if ( this.progress.containsKey( uploadIndex ) )
    {
      throw new IllegalStateException();
    }
    
    this.progress.put( uploadIndex, progress );
  }
}
