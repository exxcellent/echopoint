package echopoint.jquery;

import nextapp.echo.webcontainer.AbstractComponentSynchronizePeer;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.app.util.Context;
import nextapp.echo.app.Component;
import echopoint.internal.CommonResources;
import echopoint.internal.CommonService;
import echopoint.internal.AbstractPeer;

/**
 * An abstract peer that may be used as the base class for all jQuery peers. Ensures
 * that the jQuery library is boot strapped.
 *
 * @see echopoint.internal.CommonResources
 * @see echopoint.internal.CommonService
 * @author Hans Holmlund 2009-04-21
 * @version $Id$
 */
public abstract class JQueryAbstractPeer extends AbstractPeer
{
    /** Register the core services */
    static
    {
        CommonResources.install();
    }

    /**
     * {@inheritDoc}
     * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#init
     */
    @Override
    public void init( final Context context, final Component component )
    {
        super.init( context, component );
        ServerMessage serverMessage =
                (ServerMessage) context.get( ServerMessage.class );
        serverMessage.addLibrary( CommonService.JQUERY_SERVICE.getId() );
    }
}

