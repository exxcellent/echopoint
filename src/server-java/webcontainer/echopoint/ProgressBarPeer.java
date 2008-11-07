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

import echopoint.internal.AbstractContainerPeer;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.service.JavaScriptService;
import nextapp.echo.app.util.Context;
import nextapp.echo.app.Component;

/**
 * Component rendering peer for the {@link echopoint.ProgressBar} component.
 *
 * <p><b>Note:</b> Development of this component was sponsored by <a
 * href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Broadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * @author Rakesh Vidyadharan 2008-11-6
 * @version $Id$
 */
public class ProgressBarPeer extends AbstractContainerPeer
{
  /** The component name for which this class is a peer. */
  private static final String COMPONENT_NAME = ProgressBar.class.getName();

  /** The JS service files to load. */
  private static final String[] SERVICE_FILES =
      {
          "resource/js/Application.ProgressBar.js",
          "resource/js/Sync.ProgressBar.js"
      };

  /** The service for the client side peer for this component. */
  private static final Service COMPONENT_SERVICE =
      JavaScriptService.forResources( COMPONENT_NAME, SERVICE_FILES );

  /** Register the services and resources. */
  static
  {
    WebContainerServlet.getServiceRegistry().add( COMPONENT_SERVICE );
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
    return ProgressBar.class;
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
}
