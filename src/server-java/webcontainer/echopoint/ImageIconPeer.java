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

import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.AbstractComponentSynchronizePeer;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.service.JavaScriptService;
import nextapp.echo.app.util.Context;
import nextapp.echo.app.Component;
import echopoint.internal.AbstractContainerPeer;

/**
 * Component rendering peer for the {@link echopoint.ImageIcon} component.
 *
 * @author Rakesh Vidyadharan 2008-10-20
 * @version $Id$
 */
public class ImageIconPeer extends AbstractContainerPeer
{
  /** The component name for which this class is a peer. */
  private static final String COMPONENT_NAME = ImageIcon.class.getName();

  /** The JS service files to load. */
  private static final String[] SERVICE_FILES =
      {
          "resource/js/Application.ImageIcon.js",
          "resource/js/Sync.ImageIcon.js"
      };

  /** The service for the client side peer for this component. */
  private static final Service COMPONENT_SERVICE =
      JavaScriptService.forResources( COMPONENT_NAME, SERVICE_FILES );

  /** Register the services and resources. */
  static
  {
    WebContainerServlet.getServiceRegistry().add( COMPONENT_SERVICE );
  }

  public ImageIconPeer()
  {
    addEvent( new AbstractComponentSynchronizePeer.EventPeer(
        ImageIcon.INPUT_ACTION, ImageIcon.ACTION_LISTENERS_CHANGED_PROPERTY )
    {
      @Override
      public boolean hasListeners( Context context, Component component )
      {
        return ( (ImageIcon) component ).hasActionListeners();
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
  public Class getComponentClass()
  {
    return ImageIcon.class;
  }

  /**
   * @inheritDoc
   * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#getClientComponentType
   */
  public String getClientComponentType( final boolean shortType )
  {
    return COMPONENT_NAME;
  }
}
