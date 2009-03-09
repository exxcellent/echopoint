package echopoint.internal;

import nextapp.echo.app.Component;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import static nextapp.echo.webcontainer.WebContainerServlet.getServiceRegistry;
import static nextapp.echo.webcontainer.service.JavaScriptService.forResources;

/**
 * Base component rendering peer for the text field extension components.
 *
 * @author Rakesh Vidyadharan 2009-03-07
 * @version $Id$
 */
public abstract class TextFieldPeer extends
    nextapp.echo.webcontainer.sync.component.TextFieldPeer
{
  /** The name of the component for which this class is a peer. */
  private static final String COMPONENT_NAME = TextField.class.getName();

  /** The JS service files to load. */
  private static final String[] SERVICE_FILES =
      {
          "resource/js/Application.TextField.js",
          "resource/js/Sync.TextField.js"
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
    return TextField.class;
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