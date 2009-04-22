package echopoint;

import nextapp.echo.app.Component;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.WebContainerServlet;
import nextapp.echo.webcontainer.service.JavaScriptService;

import java.util.Map;

import echopoint.internal.AbstractPeer;
import echopoint.template.TemplateDataSource;
import echopoint.template.ui.TemplateCompilerLoader;
import echopoint.template.ui.TemplateCompiler;

/**
 * <code>TemplatePanelPeer</code> is a peer for <code>TemplatePanel</code>
 */
public class TemplatePanelPeer extends AbstractPeer {

    /**
     * The component name for which this class is a peer.
     */
    private static final String COMPONENT_NAME = TemplatePanel.class.getName();


    /**
     * The JS service files to load.
     */
    private static final String[] SERVICE_FILES =
            {
                    "resource/js/xbImportNode.js",
                    "resource/js/Application.TemplatePanel.js",
                    "resource/js/Sync.TemplatePanel.js"
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
        return COMPONENT_NAME;
    }

    public Class getComponentClass() {
        return TemplatePanel.class;
    }

    public void init(final Context context, final Component component) {
        super.init(context, component);
        final ServerMessage serverMessage =
                (ServerMessage) context.get(ServerMessage.class);
        serverMessage.addLibrary(COMPONENT_NAME);
    }

    public Object getOutputProperty(final Context context,
                                    final Component component, final String propertyName,
                                    final int propertyIndex) {
        if (TemplatePanel.PROPERTY_COMPONENT_MAPPING.equals(propertyName)) {
           Map<String, Component> componentMap = ((TemplatePanel) component).getComponentMapping();
            StringBuffer xmlStr = new StringBuffer("<mapping>");
            for (String s : componentMap.keySet()) {
                    Component c = componentMap.get(s);
                    xmlStr.append("<component name=\"");
                    xmlStr.append(s);
                    xmlStr.append("\">");
                    xmlStr.append(c.getRenderId());
                    xmlStr.append("</component>");
                }
            xmlStr.append("</mapping>");
            return xmlStr.toString();
        }
        else if (TemplatePanel.PROPERTY_TEMPLATE_DATA_SOURCE.equals(propertyName))
        {
            TemplateDataSource tds = ((TemplatePanel) component).getTemplateDataSource();
            TemplateCompilerLoader loader = TemplateCompilerLoader.forClassLoader(Thread.currentThread().getContextClassLoader());
		    TemplateCompiler compiler = loader.getTemplateCompiler(tds.getContentType());
		    if (compiler == null) {
			    throw new IllegalStateException("A TemplateCompiler cannot be found for content type : " + tds.getContentType());
		    }
            try {
                return compiler.templateDataAsString(WebContainerServlet.getActiveConnection(), tds);
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }

        return super.getOutputProperty(
                context, component, propertyName, propertyIndex);
    }

}

