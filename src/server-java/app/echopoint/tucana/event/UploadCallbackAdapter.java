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

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * An adapter class for the {@link UploadCallback} interface.
 *
 * <p><b>Note:</b> Development of this component was sponsored by <a
 * href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Broadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * @author Rakesh Vidyadharan 2008-11-4
 * @version $Id$
 */
public class UploadCallbackAdapter implements UploadCallback
{
  private static final long serialVersionUID = 1l;

  /** The logger used to log events. */
  protected static final Logger logger = Logger.getAnonymousLogger();

  /** The logging level to use. */
  protected Level level;

  /** The last upload event that was received. */
  private UploadEvent event;

  /** The current upload index being processed. */
  private String uploadIndex;

  /**
   * Default constructor. Sets logging level to {@link
   * java.util.logging.Level#FINE}.
   */
  public UploadCallbackAdapter()
  {
    this.level = Level.FINE;
  }

  /**
   * Create a new instance with the specified logging level.
   *
   * @param level The logging level to set.
   */
  public UploadCallbackAdapter( final Level level )
  {
    this.level = level;
  }

  /**
   * Indicates a file upload has been started.
   *
   * @param event the event
   */
  public void uploadStarted( final UploadStartEvent event )
  {
    this.uploadIndex = event.getIndex();
    this.event = event;
    logger.log( level, "Upload started for event: " + event.getIndex() +
        " fileName: " + event.getFileName() +
        " contentType: " + event.getContentType() );
  }

  /**
   * Indicates a file upload has been canceled.
   *
   * @param event the event
   */
  public void uploadCancelled( final UploadCancelEvent event )
  {
    this.event = event;
    logger.log( level, "Upload cancelled for event: " + event.getIndex() +
        " fileName: " + event.getFileName() +
        " contentType: " + event.getContentType(), event.getException() );
  }

  /**
   * Indicates a file upload has progressed.
   *
   * @param event the event
   */
  public void uploadProgressed( final UploadProgressEvent event )
  {
    if ( ( uploadIndex.equals( event.getIndex() ) ) &&
      ( this.event instanceof UploadFinishEvent ) )
    {
      // We are done
    }
    else
    {
      this.event = event;
      logger.log( level, "Upload progress read bytes : "
          + event.getProgress().getBytesRead() );
    }
  }

  /**
   * Call back method invoked once an upload event completes.
   *
   * @param event The event that has completed.
   */
  public void uploadSucceeded( final UploadFinishEvent event )
  {
    this.event = event;
    logger.log( level, "Upload completed for event: " + event.getIndex() +
        " fileName: " + event.getFileName() + " size: " + event.getFileSize() +
        " contentType: " + event.getContentType() );
  }

  /**
   * Call back method when an upload event fails.
   *
   * @param event The event that has failed.
   */
  public void uploadFailed( final UploadFailEvent event )
  {
    this.event = event;
    logger.log( level, "Upload failed for event: " + event.getIndex(),
        event.getException() );
  }

  /**
   * A convenience method to return the last event received by the callback
   * handler.  Can be used to gain access to the input stream (provided it has
   * not been closed).
   *
   * @return The upload event that was last processed by the handler.
   */
  public UploadEvent getEvent()
  {
    return this.event;
  }

  /**
   * Accessor for property 'level'.
   *
   * @return Value for property 'level'.
   */
  public Level getLevel()
  {
    return level;
  }

  /**
   * Mutator for property 'level'.
   *
   * @param level Value to set for property 'level'.
   */
  public void setLevel( final Level level )
  {
    this.level = level;
  }
}
