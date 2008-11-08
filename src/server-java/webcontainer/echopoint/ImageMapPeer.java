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
import echopoint.internal.AbstractContainerPeer;
import echopoint.model.CircleSection;
import echopoint.model.MapSection;
import echopoint.model.PolygonSection;
import echopoint.model.RectangleSection;
import nextapp.echo.app.Component;
import nextapp.echo.app.update.ClientUpdateManager;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.AbstractComponentSynchronizePeer;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.service.JavaScriptService;

import java.util.LinkedHashMap;

/**
 * Component rendering peer for the {@link echopoint.ImageMap} component.
 *
 * <p><b>Note:</b> Development of this component was sponsored by
 * <a href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Broadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * @author Rakesh Vidyadharan 2008-10-19
 * @version $Id$
 */
public class ImageMapPeer extends AbstractContainerPeer
{
  /** The component name for which this class is a peer. */
  private static final String COMPONENT_NAME = ImageMap.class.getName();

  /**
   * The serialiser used to serialise {@link echopoint.model.MapSection}
   * instances.
   */
  protected static final XStream xstream;

  /** The JS service files to load. */
  private static final String[] SERVICE_FILES =
      {
          "resource/js/Application.ImageMap.js",
          "resource/js/Sync.ImageMap.js"
      };

  /** The service for the client side peer for this component. */
  private static final Service COMPONENT_SERVICE =
      JavaScriptService.forResources( COMPONENT_NAME, SERVICE_FILES );

  /** Register the services and resources. */
  static
  {
    WebContainerServlet.getServiceRegistry().add( COMPONENT_SERVICE );

    xstream = new XStream( new JsonHierarchicalStreamDriver() );
    xstream.processAnnotations( MapSection.class );
    xstream.processAnnotations( CircleSection.class );
    xstream.processAnnotations( PolygonSection.class );
    xstream.processAnnotations( RectangleSection.class );
    xstream.alias( "list", LinkedHashMap.class );
    xstream.setMode( XStream.NO_REFERENCES );
  }

  public ImageMapPeer()
  {
    addEvent( new AbstractComponentSynchronizePeer.EventPeer(
        ImageMap.INPUT_ACTION, ImageMap.ACTION_LISTENERS_CHANGED_PROPERTY )
    {
      @Override
      public boolean hasListeners( Context context, Component component )
      {
        return ( (ImageMap) component ).hasActionListeners();
      }
    } );
  }

  /**
   * @inheritDoc
   * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#init
   */
  @Override
  public void init( final Context context, final Component component )
  {
    super.init( context, component );
    final ServerMessage serverMessage =
        (ServerMessage) context.get( ServerMessage.class );
    serverMessage.addLibrary( COMPONENT_NAME );
  }

  /**
   * @inheritDoc
   * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#getComponentClass
   */
  @Override
  public Class getComponentClass()
  {
    return ImageMap.class;
  }

  /**
   * @inheritDoc
   * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#getClientComponentType
   */
  @Override
  public String getClientComponentType( final boolean shortType )
  {
    return COMPONENT_NAME;
  }

  /** @inheritDoc */
  @Override
  public Class getInputPropertyClass( final String propertyName )
  {
    if ( ImageMap.ACTION_COMMAND_PROPERTY.equals( propertyName ) )
    {
      return String.class;
    }

    return super.getInputPropertyClass( propertyName );
  }

  /**
   * Over-ridden to handle requests for the {@link
   * echopoint.ImageMap#PROPERTY_SECTIONS} property.  The collection of
   * {@link echopoint.model.MapSection} instances are serialised as a
   * JSON stucture.
   *
   * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getOutputProperty(Context,
   *      Component, String, int)
   */
  @Override
  public Object getOutputProperty( final Context context,
      final Component component, final String propertyName,
      final int propertyIndex )
  {
    if ( ImageMap.PROPERTY_SECTIONS.equals( propertyName ) )
    {
      return xstream.toXML( component.get( ImageMap.PROPERTY_SECTIONS ) );
    }

    return super.getOutputProperty(
        context, component, propertyName, propertyIndex );
  }

  /**
   * @inheritDoc
   */
  @Override
  public void storeInputProperty( final Context context,
      final Component component, final String propertyName,
      final int propertyIndex, final Object newValue )
  {
    if ( ImageMap.ACTION_COMMAND_PROPERTY.equals( propertyName ) )
    {
      final ClientUpdateManager clientUpdateManager =
          (ClientUpdateManager) context.get( ClientUpdateManager.class );
      clientUpdateManager.setComponentProperty( component,
          ImageMap.ACTION_COMMAND_PROPERTY, newValue );
    }
  }
}
