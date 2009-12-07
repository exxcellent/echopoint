package echopoint;

import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import static nextapp.echo.webcontainer.WebContainerServlet.getServiceRegistry;
import static nextapp.echo.webcontainer.service.JavaScriptService.forResources;
import nextapp.echo.app.Component;
import nextapp.echo.app.util.Context;

import echopoint.internal.TextFieldPeer;

/**
 * @author Christoff Spinner 2009-12-07
 * @version $Id$
 */
public class AutoLookupTextFieldPeer extends TextFieldPeer
{
  static
  {
    AutoLookupService.install();
  }

  /** The name of the component for which this class is a peer. */
  private static final String COMPONENT_NAME = AutoLookupTextField.class.getName();

  /** The service for the client side peer for this component. */
  private static final String[] SERVICE_FILES =
      {
          "resource/js/Application.AutoLookupTextField.js",
          "resource/js/Sync.AutoLookupTextField.js"
      };

  private static final Service COMPONENT_SERVICE =
      forResources( COMPONENT_NAME, SERVICE_FILES );

  /** Register the services */
  static
  {
    AutoLookupService.install();
    getServiceRegistry().add( COMPONENT_SERVICE );
  }

  /**
   * {@inheritDoc}
   *
   * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#init
   */
  @Override
  public void init( final Context context, final Component component )
  {
    super.init( context, component );
    final ServerMessage serverMessage = (ServerMessage) context.get( ServerMessage.class );
    serverMessage.addLibrary( COMPONENT_NAME );
    AutoLookupService.INSTANCE.register( (AutoLookupTextField) component );
  }

  /**
   * {@inheritDoc}
   *
   * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#getComponentClass
   */
  @Override
  public Class getComponentClass()
  {
    return AutoLookupTextField.class;
  }

  /**
   * {@inheritDoc}
   *
   * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#getClientComponentType
   */
  @Override
  public String getClientComponentType( final boolean shortType )
  {
    return COMPONENT_NAME;
  }
}
