package echopoint.command;

import nextapp.echo.webcontainer.AbstractCommandSynchronizePeer;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.service.JavaScriptService;
import nextapp.echo.app.util.Context;
import nextapp.echo.app.Command;

/**
 * A <code>CommandSynchronizePeer</code> implementation for the {@link JavaScriptEval} command.
 *
 * @author Mikael S\u00f6derman 2009-04-03
 */
public class JavaScriptEvalPeer extends AbstractCommandSynchronizePeer {

    /** The associated client-side JavaScript module <code>Service</code>. */
    private static final Service JAVA_SCRIPT_EVAL_SERVICE = JavaScriptService.forResource("echopoint.JavaScriptEval", 
            "resource/js/RemoteClient.JavaScriptEval.js");

    static {
        WebContainerServlet.getServiceRegistry().add(JAVA_SCRIPT_EVAL_SERVICE);
    }

    /**
     * Default constructor.
     */
    public JavaScriptEvalPeer() {
        super();
        addProperty("script", new AbstractCommandSynchronizePeer.PropertyPeer() {
            public Object getProperty(Context context, Command command) {
                return ((JavaScriptEval) command).getJavaScript();
            }
        });
    }

    /**
     * @see nextapp.echo.webcontainer.CommandSynchronizePeer#getCommandClass()
     */
    public Class getCommandClass() {
        return JavaScriptEval.class;
    }

    /**
     * @see nextapp.echo.webcontainer.AbstractCommandSynchronizePeer#init(nextapp.echo.app.util.Context)
     */
    public void init(Context context) {
        ServerMessage serverMessage = (ServerMessage) context.get(ServerMessage.class);
        serverMessage.addLibrary(JAVA_SCRIPT_EVAL_SERVICE.getId());
    }
}

