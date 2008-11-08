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

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.json.JsonHierarchicalStreamDriver;
import echopoint.internal.AbstractContainer;
import echopoint.model.CircleSection;
import echopoint.model.MapSection;
import echopoint.model.PolygonSection;
import echopoint.model.RectangleSection;
import nextapp.echo.app.HttpImageReference;
import nextapp.echo.app.ImageReference;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;

import java.util.Collection;
import java.util.Collections;
import java.util.EventListener;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * The <code>ImageMap</code> class provides a {@link nextapp.echo.app.Component}
 * that allows a user to click on region(s) within a provided region.
 *
 * <p>A series of {@link echopoint.model.MapSection} instances are specified
 * that indicate what areas on the region should produce an
 * {@link nextapp.echo.app.event.ActionEvent}.</p>
 *
 * <p>The {@link echopoint.model.MapSection} instances are stored in a map
 * keyed by by their {@link echopoint.model.MapSection#actionCommand} string.
 * This means that there can be at  most one set of coordinates for a given
 * {@link echopoint.model.MapSection#actionCommand}.</p>
 *
 * <p><b>Note:</b> Development of this component was sponsored by
 * <a href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Broadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * <p>The following shows sample usage of this component:</p>
 * <pre>
 *   import echopoint.ImageMap;
 *   import echopoint.model.Point;
 *   import echopoint.model.MapSection;
 *   import echopoint.model.CircleSection;
 *   import echopoint.model.RectangleSection;
 *
 *     ...
 *     final Column column = new Column();
 *     final String url = "image/imagemap.gif";
 *     final ImageMap map = new ImageMap( url );
 *     map.addActionListener( ... );
 *
 *     final Collection&lt;MapSection&gt; sections = new ArrayList&lt;MapSection&gt;();
 *     sections.add( new CircleSection( new Point( 10, 10 ), 25, "circle" );
 *     sections.add( new RectangleSection( new Point( 10, 10 ),
 *        new Point( 25, 25 ), "rectangle", "Rectangular area" );
 *     map.addSections( sections );
 *
 *     column.add( map );
 * </pre>
 *
 * @author Rakesh 2008-10-19, Brad Baker (originally for EPNG)
 * @version $Id$
 */
public class ImageMap extends AbstractContainer
{
  private static final long serialVersionUID = 1l;
  protected static XStream xstream;

  /** The property name for the action command to be updated from client. */
  public static final String ACTION_COMMAND_PROPERTY = "actionCommand";

  /** The image that is to be used as the map region. */
  public static final String PROPERTY_IMAGE = "url";

  /**
   * The JSON representation of the map of {@link echopoint.model.MapSection}
   * instances that represents the clickable sections in the map.  Note that
   * this property is to be treated as read-only.
   */
  public static final String PROPERTY_SECTIONS = "sections";

  /**
   * The map of {@link echopoint.model.MapSection} instances keyed by the
   * {@link echopoint.model.MapSection#actionCommand} for the section.
   */
  private Map<String,MapSection> data = new LinkedHashMap<String,MapSection>();

  /** The action command that was triggered by user interaction with map. */
  protected String actionCommand;

  /** Default constructor. */
  public ImageMap() {}

  /**
   * Create a new image map using the specified image to use as the region.
   *
   * @param image The image to use as the map region.
   */
  public ImageMap( final ImageReference image )
  {
    setImage( image );
  }

  /**
   * Create a new image map using the image from the specified URL.
   *
   * @param url The url to use as the source of the image to use in the map.
   */
  public ImageMap( final String url )
  {
    setImage( url );
  }

  /**
   * Return the value of the {@link #PROPERTY_IMAGE} property.
   *
   * @return The image that is being used as the map region.
   */
  public ImageReference getImage()
  {
    return (ImageReference) get( PROPERTY_IMAGE );
  }

  /**
   * Set the value of the {@link #PROPERTY_IMAGE} property.
   *
   * @param image The image to use as the map region.
   */
  public void setImage( final ImageReference image )
  {
    set( PROPERTY_IMAGE, image );
  }

  /**
   * Set the value of the {@link #PROPERTY_IMAGE} property.
   *
   * @param url The URL for the image to use as the map region.
   */
  public void setImage( final String url )
  {
    setImage( new HttpImageReference( url ) );
  }

  /**
   * Return the value of the {@link #PROPERTY_SECTIONS} property.  Note that
   * this method returns a JSON representation of
   *
   * @deprecated Should be treated as internal use only.
   * @return The image that is being used as the map region.
   */
  @Deprecated
  public String getSections()
  {
    return (String) get( PROPERTY_SECTIONS );
  }

  /**
   * Set the value of the {@link #PROPERTY_SECTIONS} property.  Note that
   * this method is to be treated as internal use only, since the string
   * value specified must be in JSON format.
   *
   * @deprecated Should be treated as internal use only.  Use {@link
   *   #addSection} or {@link #addSections}.
   * @param sections The image to use as the map region.
   */
  @Deprecated
  public void setSections( final String sections )
  {
    set( PROPERTY_SECTIONS, sections );
  }

  /**
   * Add the specified collection of sections to the image map.
   *
   * @param sections The collection of sections to be added.
   */
  public void addSections( final Collection<MapSection> sections )
  {
    for ( MapSection section : sections )
    {
      if ( section.getActionCommand() != null )
      {
        data.put( section.getActionCommand(), section );
      }
    }

    setSections( createSerialiser().toXML( data ) );
  }

  /**
   * Add the specified clickable section to the image map.
   *
   * @param section The section that is to be added.
   */
  public void addSection( final MapSection section )
  {
    if ( section.getActionCommand() == null ) return;
    data.put( section.getActionCommand(), section );
    setSections( createSerialiser().toXML( data ) );
  }

  /**
   * Remove the specified clickable section from the image map.
   *
   * @param section The section that is to be deleted.
   */
  public void removeSection( final MapSection section )
  {
    if ( section.getActionCommand() == null ) return;
    data.remove( section.getActionCommand() );
    setSections( createSerialiser().toXML( data ) );
  }

  /**
   * Remove all the clickable sections from the image map.
   */
  public void removeAllSections()
  {
    data.clear();
    setSections( createSerialiser().toXML( data ) );
  }

  /**
   * Add the specified action listener to this component.
   *
   * @see nextapp.echo.app.Component#firePropertyChange(String, Object, Object)
   * @param listener The action listener to add.
   */
  public void addActionListener( final ActionListener listener )
  {
    getEventListenerList().addListener( ActionListener.class, listener );
    firePropertyChange( ACTION_LISTENERS_CHANGED_PROPERTY, null, listener );
  }

  /**
   * Determines if the button has any <code>ActionListener</code>s
   * registered.
   *
   * @return true if any action listeners are registered
   */
  public boolean hasActionListeners()
  {
    return ( hasEventListenerList() &&
        getEventListenerList().getListenerCount(ActionListener.class) != 0 );
  }

  /**
   * Notifies all listeners that have registered for this event type.
   *
   * @param event The {@link nextapp.echo.app.event.ActionEvent} to send
   */
  protected void fireActionPerformed( final ActionEvent event )
  {
    if ( !hasEventListenerList() ) return;

    EventListener[] listeners =
        getEventListenerList().getListeners( ActionListener.class );
    for ( EventListener listener : listeners )
    {
      ( (ActionListener) listener ).actionPerformed( event );
    }
  }

  /**
   * @inheritDoc
   */
  @Override
  public void processInput( String name, Object value )
  {
    super.processInput( name, value );
    if ( ACTION_COMMAND_PROPERTY.equals( name ) )
    {
      this.actionCommand = (String) value;
    }
    if ( INPUT_ACTION.equals( name ) )
    {
      fireActionPerformed( new ActionEvent( this, actionCommand ) );
    }
  }

  /**
   * Remove the specified action listener from the component.
   *
   * @see nextapp.echo.app.Component#firePropertyChange(String, Object, Object)
   * @param listener The listener that is to be removed.
   */
  public void removeActionListener( final ActionListener listener )
  {
    if ( ! hasEventListenerList() ) return;

    getEventListenerList().removeListener( ActionListener.class, listener );
    firePropertyChange( ACTION_LISTENERS_CHANGED_PROPERTY, listener, null );
  }

  /**
   * Accessor for property 'data'.
   *
   * @return Value for property 'data'.
   */
  public Map<String, MapSection> getData()
  {
    return Collections.unmodifiableMap( data );
  }

  /**
   * Configure the JSON serialiser.
   *
   * @return The configured serialiser to use to serialise {@link #data}.
   */
  protected XStream createSerialiser()
  {
    if ( xstream == null )
    {
      xstream = new XStream( new JsonHierarchicalStreamDriver() );
      xstream.processAnnotations( MapSection.class );
      xstream.processAnnotations( CircleSection.class );
      xstream.processAnnotations( PolygonSection.class );
      xstream.processAnnotations( RectangleSection.class );
      xstream.alias( "list", LinkedHashMap.class );
      xstream.setMode( XStream.NO_REFERENCES );
    }

    return xstream;
  }
}
