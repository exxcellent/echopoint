package echopoint;

import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.service.JavaScriptService;
import nextapp.echo.app.util.Context;
import nextapp.echo.app.Component;
import echopoint.internal.AbstractPeer;

/**
 * Created: 2009-apr-18
 */
public class ApplicationBackgroundPeer extends AbstractPeer {
      /**
     * The component name for which this class is a peer.
     */
    private static final String COMPONENT_NAME = ApplicationBackground.class.getName();

    /**
     * The JS service files to load.
     */
    private static final String[] SERVICE_FILES =
            {
                    "resource/js/Application.ApplicationBackground.js",
                    "resource/js/Sync.ApplicationBackground.js"
            };


    /**
     * The service for the client side peer for this component.
     */
    private static final Service COMPONENT_SERVICE =
            JavaScriptService.forResources(COMPONENT_NAME, SERVICE_FILES);

    static {
        WebContainerServlet.getServiceRegistry().add(COMPONENT_SERVICE);
    }

    public String getClientComponentType(boolean b) {
        return "echopoint.ApplicationBackground";
    }

    public Class getComponentClass() {
        return ApplicationBackground.class;
    }

    public void init(final Context context, final Component component) {
        super.init(context, component);
        final ServerMessage serverMessage =
                (ServerMessage) context.get(ServerMessage.class);
        serverMessage.addLibrary(COMPONENT_NAME);
    }
}
