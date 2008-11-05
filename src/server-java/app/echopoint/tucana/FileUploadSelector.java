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

import nextapp.echo.app.Component;
import nextapp.echo.app.Extent;
import nextapp.echo.app.ImageReference;
import nextapp.echo.app.ResourceImageReference;
import echopoint.tucana.event.UploadCallback;
import echopoint.tucana.event.UploadCancelEvent;
import echopoint.tucana.event.UploadEvent;
import echopoint.tucana.event.UploadFailEvent;
import echopoint.tucana.event.UploadFinishEvent;
import echopoint.tucana.event.UploadProgressEvent;
import echopoint.tucana.event.UploadStartEvent;
import echopoint.tucana.event.UploadCallbackAdapter;
import echopoint.internal.AbstractContainer;

/**
 * The file upload selector component.  This component is a re-implementation
 * of the original <i>tucana file upload selector</i> component for Echo2.

 * <p><b>Note:</b> Development of this component was sponsored by <a
 * href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Broadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * @author jvolkman (Echo2), Rakesh 2008-11-2
 * @version $Id$
 */
public class FileUploadSelector extends AbstractContainer
{
  private static final long serialVersionUID = 1l;

  public static final String PROPERTY_BUTTON_TEXT_UPLOAD = "buttonTextUpload";

  public static final String PROPERTY_BUTTON_TEXT_CANCEL = "buttonTextCancel";

  public static final String PROPERTY_BUTTON_TEXT_WAIT = "buttonTextWait";

  public static final String PROPERTY_BUTTON_IMAGE_UPLOAD = "buttonImageUpload";

  public static final String PROPERTY_BUTTON_IMAGE_CANCEL = "buttonImageCancel";

  public static final String PROPERTY_BUTTON_IMAGE_WAIT = "buttonImageWait";

  public static final String PROPERTY_BUTTON_MODE = "buttonMode";

  public static final String PROPERTY_BUTTON_DISPLAY = "buttonDisplay";

  public static final String PROPERTY_WIDTH_SIZE = "widthSize";

  public static final String PROPERTY_WIDTH_EXTENT = "widthExtent";

  public static final String PROPERTY_WIDTH_MODE = "widthMode";

  public static final String PROPERTY_CANCEL_ENABLED = "cancelEnabled";

  public static final String UPLOAD_CANCELED_PROPERTY = "uploadCanceled";

  public static final String ACTION_FILE_UPLOADED = "fileUploaded";

  public static final int BUTTON_MODE_TEXT = 0;

  public static final int BUTTON_MODE_IMAGE = 1;

  public static final int BUTTON_DISPLAY_RIGHT = 0;

  public static final int BUTTON_DISPLAY_LEFT = 1;

  public static final int BUTTON_DISPLAY_AUTO = 2;

  public static final int BUTTON_DISPLAY_NONE = 3;

  public static final int WIDTH_MODE_SIZE = 0;

  public static final int WIDTH_MODE_EXTENT = 1;


  private static ImageReference DEFAULT_UPLOAD_IMAGE;

  private static ImageReference DEFAULT_CANCEL_IMAGE;

  private static ImageReference DEFAULT_WAIT_IMAGE;

  private int[] canceledUploads;

  static
  {
    DEFAULT_UPLOAD_IMAGE = new ResourceImageReference( "resource/images/upload.png" );
    DEFAULT_CANCEL_IMAGE = new ResourceImageReference( "resource/images/cancel.png" );
    DEFAULT_WAIT_IMAGE = new ResourceImageReference( "resource/images/wait.png" );
  }

  private UploadCallback callback = null;

  public FileUploadSelector()
  {
    super();
    this.canceledUploads = new int[0];
    setButtonMode( BUTTON_MODE_IMAGE );
    setButtonUploadImage( DEFAULT_UPLOAD_IMAGE );
    setButtonCancelImage( DEFAULT_CANCEL_IMAGE );
    setButtonWaitImage( DEFAULT_WAIT_IMAGE );

    setButtonUploadText( "Upload" );
    setButtonCancelText( "Cancel" );
    setButtonWaitText( "Wait..." );

    setWidthMode( WIDTH_MODE_EXTENT );
    setWidthExtent( new Extent( 300 ) );
    setCancelEnabled( true );
    setUploadCallback( new UploadCallbackAdapter() );
  }

  /**
   * Sets the upload button image.
   *
   * @param image The new upload button image.
   */
  public void setButtonUploadImage( final ImageReference image )
  {
    set( PROPERTY_BUTTON_IMAGE_UPLOAD, image );
  }

  /**
   * Gets the current upload button image.
   *
   * @return The current upload button image.
   */
  public ImageReference getButtonUploadImage()
  {
    return (ImageReference) get( PROPERTY_BUTTON_IMAGE_UPLOAD );
  }

  /**
   * Sets the cancel button image.
   *
   * @param image The new cancel button image.
   */
  public void setButtonCancelImage( final ImageReference image )
  {
    set( PROPERTY_BUTTON_IMAGE_CANCEL, image );
  }

  /**
   * Gets the current cancel button image.
   *
   * @return The current cancel button image.
   */
  public ImageReference getButtonCancelImage()
  {
    return (ImageReference) get( PROPERTY_BUTTON_IMAGE_CANCEL );
  }

  /**
   * Sets the wait button image.
   *
   * @param image The new wait button image.
   */
  public void setButtonWaitImage( final ImageReference image )
  {
    set( PROPERTY_BUTTON_IMAGE_WAIT, image );
  }

  /**
   * Gets the current wait button image.
   *
   * @return The current wait button image.
   */
  public ImageReference getButtonWaitImage()
  {
    return (ImageReference) get( PROPERTY_BUTTON_IMAGE_WAIT );
  }

  /**
   * Sets the upload button text.
   *
   * @param text The new upload button text.
   */
  public void setButtonUploadText( final String text )
  {
    set( PROPERTY_BUTTON_TEXT_UPLOAD, text );
  }

  /**
   * Gets the current upload button text.
   *
   * @return The current upload button text.
   */
  public String getButtonUploadText()
  {
    return (String) get( PROPERTY_BUTTON_TEXT_UPLOAD );
  }

  /**
   * Sets the cancel button text.
   *
   * @param text The new cancel button text.
   */
  public void setButtonCancelText( final String text )
  {
    set( PROPERTY_BUTTON_TEXT_CANCEL, text );
  }

  /**
   * Gets the current cancel button text.
   *
   * @return The current cancel button text.
   */
  public String getButtonCancelText()
  {
    return (String) get( PROPERTY_BUTTON_TEXT_CANCEL );
  }

  /**
   * Sets the wait button text.
   *
   * @param text The new wait button text.
   */
  public void setButtonWaitText( final String text )
  {
    set( PROPERTY_BUTTON_TEXT_WAIT, text );
  }

  /**
   * Gets the current wait button text.
   *
   * @return The current wait button text.
   */
  public String getButtonWaitText()
  {
    return (String) get( PROPERTY_BUTTON_TEXT_WAIT );
  }

  /**
   * Sets the upload button display mode
   *
   * @param mode The new upload button display mode
   * @see #BUTTON_MODE_IMAGE
   * @see #BUTTON_MODE_TEXT
   */
  public void setButtonMode( final int mode )
  {
    set( PROPERTY_BUTTON_MODE, mode );
  }

  /**
   * Get the current upload button display mode.
   *
   * @return The current display mode, or <code>-1</code> if no mode is
   *         set.
   */
  public int getButtonMode()
  {
    Integer val = (Integer) get( PROPERTY_BUTTON_MODE );
    if ( val == null )
    {
      return -1;
    }
    return val;
  }

  public void setButtonDisplayMode( final int mode )
  {
    set( PROPERTY_BUTTON_DISPLAY, mode );
  }

  public int getButtonDisplayMode()
  {
    Integer val = (Integer) get( PROPERTY_BUTTON_DISPLAY );
    if ( val == null )
    {
      return -1;
    }
    return val;
  }

  /**
   * Sets the input form size.  The size is supposedly the numebr of
   * characters that can fit in the input box.  A size of "20" will fit 20
   * characters.
   *
   * @param size The new size
   */
  public void setWidthSize( final int size )
  {
    set( PROPERTY_WIDTH_SIZE, size );
  }

  /**
   * Get the current size.
   *
   * @return The current size, or <code>-1</code> if no size is set.
   */
  public int getWidthSize()
  {
    Integer val = (Integer) get( PROPERTY_WIDTH_SIZE );
    if ( val == null )
    {
      return -1;
    }

    return val;
  }

  public void setWidthExtent( final Extent width )
  {
    set( PROPERTY_WIDTH_EXTENT, width );
  }

  public Extent getWidthExtent()
  {
    return (Extent) get( PROPERTY_WIDTH_EXTENT );
  }

  public void setWidthMode( final int mode )
  {
    set( PROPERTY_WIDTH_MODE, mode );
  }

  public int getWidthMode()
  {
    Integer val = (Integer) get( PROPERTY_WIDTH_MODE );
    if ( val == null )
    {
      return -1;
    }
    return val;
  }

  public void setCancelEnabled( final boolean enabled )
  {
    set( PROPERTY_CANCEL_ENABLED, enabled );
  }

  public boolean isCancelEnabled()
  {
    return ( (Boolean) get( PROPERTY_CANCEL_ENABLED ) );
  }

  /**
   * Returns the indices of all canceled uploads.
   *
   * @return an array containing the indices, if no uploads are canceled, an
   *         empty array is returned.
   */
  public int[] getCanceledUploads()
  {
    return canceledUploads;
  }

  /**
   * Determines if the upload with given index is canceled.
   *
   * @param uploadIndex the index of the upload
   * @return <code>true</code> if canceled.
   */
  public boolean isUploadCanceled( int uploadIndex )
  {
    for ( int canceledUpload : canceledUploads )
    {
      if ( canceledUpload == uploadIndex )
      {
        return true;
      }
    }
    return false;
  }

  /**
   * Set the callback used when a file is uploaded.
   *
   * @param callback The upload callback.
   */
  public void setUploadCallback( final UploadCallback callback )
  {
    this.callback = callback;
  }

  /**
   * Get the callback used when a file is uploaded.
   *
   * @return The upload callback.
   */
  public UploadCallback getUploadCallback()
  {
    return callback;
  }

  /** This component can have no children, so this always returns false. */
  @Override
  public boolean isValidChild( final Component child )
  {
    return false;
  }

  /**
   * Notifies the listener that the given event has occurred.
   *
   * @param e the event
   */
  protected void notifyListener( final UploadEvent e )
  {
    if ( callback == null )
    {
      return;
    }

    if ( e instanceof UploadCancelEvent )
    {
      callback.uploadCancelled( (UploadCancelEvent) e );
    }
    else if ( e instanceof UploadFailEvent )
    {
      callback.uploadFailed( (UploadFailEvent) e );
    }
    else if ( e instanceof UploadFinishEvent )
    {
      callback.uploadSucceeded( (UploadFinishEvent) e );
    }
    else if ( e instanceof UploadProgressEvent )
    {
      callback.uploadProgressed( (UploadProgressEvent) e );
    }
    else if ( e instanceof UploadStartEvent )
    {
      callback.uploadStarted( (UploadStartEvent) e );
    }
  }
}
