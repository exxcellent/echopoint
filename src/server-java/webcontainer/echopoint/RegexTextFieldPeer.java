package echopoint;

import static nextapp.echo.webcontainer.WebContainerServlet.getServiceRegistry;
import static nextapp.echo.webcontainer.service.JavaScriptService.forResource;
import nextapp.echo.app.Component;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import echopoint.internal.TextFieldPeer;

/**
 * <p>&copy; Copyright 2009 <a href='http://sptci.com/' target='_top'>Sans
 * Pareil Technologies, Inc.</a></p>
 *
 * @author Rakesh Vidyadharan 2009-03-07
 * @version $Id$
 */
public class RegexTextFieldPeer extends TextFieldPeer
{
  /** The name of the component for which this class is a peer. */
  private static final String COMPONENT_NAME = RegexTextField.class.getName();

  /** The service for the client side peer for this component. */
  private static final Service COMPONENT_SERVICE = forResource( COMPONENT_NAME,
      "resource/js/Sync.RegexTextField.js" );

  /** Register the services */
  static
  {
    getServiceRegistry().add( COMPONENT_SERVICE );
  }

  public RegexTextFieldPeer()
  {
    super();
    addOutputProperty(RegexTextField.PROPERTY_REGEX);
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
    return RegexTextField.class;
  }

  /**
   * {@inheritDoc}
   * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#getClientComponentType
   */
  public String getClientComponentType( final boolean shortType )
  {
    return COMPONENT_NAME;
  }

  @Override
  public Object getOutputProperty(Context context, Component component, String propertyName, int propertyIndex) 
  {
    if( propertyName.equals(RegexTextField.PROPERTY_REGEX) ) 
      return ((RegexTextField)component).getRegex();
    else 
      return super.getOutputProperty(context, component, propertyName, propertyIndex);
  }
}
