package echopoint;

import nextapp.echo.app.Component;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import static nextapp.echo.webcontainer.WebContainerServlet.getServiceRegistry;
import static nextapp.echo.webcontainer.service.JavaScriptService.forResources;
import nextapp.echo.webcontainer.sync.component.TextFieldPeer;

/**
 * <p>&copy; Copyright 2009 <a href='http://sptci.com/' target='_top'>Sans
 * Pareil Technologies, Inc.</a></p>
 *
 * @author Rakesh Vidyadharan 2009-03-07
 * @version $Id$
 */
public class NumberTextFieldPeer extends TextFieldPeer
{
  /** The name of the component for which this class is a peer. */
  private static final String COMPONENT_NAME = NumberTextField.class.getName();

  /** The JS service files to load. */
  private static final String[] SERVICE_FILES =
      {
          "resource/js/Application.TextComponent.js",
          "resource/js/Sync.TextComponent.js",
          "resource/js/Sync.NumberTextField.js"
      };

  /** The service for the client side peer for this component. */
  private static final Service COMPONENT_SERVICE =
      forResources( COMPONENT_NAME, SERVICE_FILES );

  /** Register the services */
  static
  {
    getServiceRegistry().add( COMPONENT_SERVICE );
  }

  /**
   * {@inheritDoc}
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
   * {@inheritDoc}
   * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#getComponentClass
   */
  @Override
  public Class getComponentClass()
  {
    return NumberTextField.class;
  }

  /**
   * {@inheritDoc}
   * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#getClientComponentType
   */
  public String getClientComponentType( final boolean shortType )
  {
    return COMPONENT_NAME;
  }
}
