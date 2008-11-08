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
package echopoint;

import echopoint.internal.AbstractContainer;
import nextapp.echo.app.HttpImageReference;
import nextapp.echo.app.ImageReference;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;

import java.util.EventListener;

/**
 * The <code>ImageIcon</code> class provides an component
 * that displays an {@link nextapp.echo.app.ImageReference}.  A height and width
 * value can be specified to overide what may be defined in the
 * {@link nextapp.echo.app.ImageReference} itself.  This allows images to be
 * "scaled" to different dimensions.
 *
 * <p>The advantage of <code>ImageIcon</code> over using a {@link
 * nextapp.echo.app.Label} is that you can scale {@link
 * nextapp.echo.app.ImageReference} objects that you may not
 * know the dimensions of, and it can be clicked on like a {@link
 * nextapp.echo.app.Button}.</p>
 *
 * <p>The following code shows sample usage of this component.</p>
 * <pre>
 *   import echopoint.ImageIcon;
 *
 *     ...
 *     final ImageIcon icon = new ImageIcon( "image/imagemap.gif" );
 *     icon.setWidth( 500 );
 *     icon.setHeight( 300 );
 *     icon.setActionCommand( "iconClicked" );
 *     icon.addActionListener( ... );
 *
 *     final Column column = new Columnn();
 *     column.add( icon );
 * </pre>
 *
 * @author Rakesh Vidyadharan 2008-10-20
 * @version $Id$
 */
public class ImageIcon extends AbstractContainer
{
  private static final long serialVersionUID = 1l;

  /**
   * The property for storing the action command associated with an
   * action event for the image.
   */
  public static final String PROPERTY_ACTION_COMMAND = "actionCommand";

  /** The image reference for the component.  This property may be styled. */
  public static final String PROPERTY_ICON = "url";

  /** Default constructor. */
  public ImageIcon() {}

  /**
   * Create a new instance using the specified image reference.
   *
   * @param icon The icon to associate with this component.
   */
  public ImageIcon( final ImageReference icon )
  {
    setIcon( icon );
  }

  /**
   * Create a new instance using an image from the specified HTTP URI.
   *
   * @param url The URI for the image resource.
   */
  public ImageIcon( final String url )
  {
    this( new HttpImageReference( url ) );
  }

  /**
   * Return the value of {@link #PROPERTY_ACTION_COMMAND} property.
   *
   * @return The action command value.
   */
  public String getActionCommand()
  {
    return (String) get( PROPERTY_ACTION_COMMAND );
  }

  /**
   * Set the value of {@link #PROPERTY_ACTION_COMMAND} property.
   *
   * @param command The action command value to set.
   */
  public void setActionCommand( final String command )
  {
    set( PROPERTY_ACTION_COMMAND, command );
  }

  /**
   * Return the value of {@link #PROPERTY_ICON} property.
   *
   * @return The image reference for the icon.
   */
  public ImageReference getIcon()
  {
    return (ImageReference) get( PROPERTY_ICON );
  }

  /**
   * Set the value of {@link #PROPERTY_ICON} property.
   *
   * @param icon The image reference to set.
   */
  public void setIcon( final ImageReference icon )
  {
    set( PROPERTY_ICON, icon );
  }

  /**
   * @inheritDoc
   * @see #fireActionPerformed()
   */
  @Override
  public void processInput( final String inputName, final Object inputValue )
  {
    super.processInput( inputName, inputValue );
    fireActionPerformed();
  }

  /**
   * Adds an <code>ActionListener</code> to this component.
   *
   * @param listener The <code>ActionListener</code> to be added.
   */
  public void addActionListener( final ActionListener listener )
  {
    getEventListenerList().addListener( ActionListener.class, listener );
  }

  /** Notifies all listeners that have registered for this event type. */
  protected void fireActionPerformed()
  {
    final ActionEvent event = new ActionEvent( this, getActionCommand() );
    final EventListener[] listeners =
        getEventListenerList().getListeners( ActionListener.class );
    for ( EventListener listener : listeners )
    {
      ( (ActionListener) listener ).actionPerformed( event );
    }
  }

  /**
   * Removes an <code>ActionListener</code> from this component.
   *
   * @param listener The <code>ActionListener</code> to be removed.
   */
  public void removeActionListener( final ActionListener listener )
  {
    getEventListenerList().removeListener( ActionListener.class, listener );
  }

  /**
   * Determines if the <code>ImageIcon</code> has any
   * {@link nextapp.echo.app.event.ActionListener}s registered.
   *
   * @return true if any action listeners are registered
   */
  public boolean hasActionListeners()
  {
    return hasEventListenerList() &&
        getEventListenerList().getListenerCount( ActionListener.class ) != 0;
    }
}
