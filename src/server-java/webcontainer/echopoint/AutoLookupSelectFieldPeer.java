package echopoint;

import static nextapp.echo.webcontainer.WebContainerServlet.getServiceRegistry;
import nextapp.echo.app.Component;
import nextapp.echo.app.update.ClientUpdateManager;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.service.JavaScriptService;
import echopoint.internal.AutoLookupSelectService;
import echopoint.internal.TextFieldPeer;

public class AutoLookupSelectFieldPeer extends TextFieldPeer {
	private static final String COMPONENT_NAME = AutoLookupSelectField.class.getName();
	
	/** The service for the client side peer for this component. */
	private static final String[] SERVICE_FILES = { "resource/js/Application.AutoLookupSelectField.js", 
													"resource/js/Sync.AutoLookupSelectField.js" };

	private static final Service COMPONENT_SERVICE = JavaScriptService.forResources(COMPONENT_NAME, SERVICE_FILES);
	
	static{
		AutoLookupSelectService.install();
		getServiceRegistry().add(COMPONENT_SERVICE);
	}
	
	public AutoLookupSelectFieldPeer(){
		super();
		addOutputProperty(AutoLookupSelectField.PROPERTY_KEY);
		addOutputProperty(AutoLookupSelectField.PROPERTY_SEARCH_VAL);
	}
	
	@Override
	public void init(final Context context, final Component component) {
		super.init(context, component);
		final ServerMessage serverMessage = (ServerMessage) context.get(ServerMessage.class);
		serverMessage.addLibrary(COMPONENT_NAME);
		AutoLookupSelectService.getInstance().register((AutoLookupSelectField)component);
	}
	
	@Override
	public Object getOutputProperty(Context context, Component component, 
            String propertyName, int propertyIndex) {
        if (propertyName.equals(AutoLookupSelectField.PROPERTY_KEY)) {
            AutoLookupSelectField alSelectField = (AutoLookupSelectField) component;
            return alSelectField.getKey();
        } else if (propertyName.equals(AutoLookupSelectField.PROPERTY_SEARCH_VAL)) {
            AutoLookupSelectField alSelectField = (AutoLookupSelectField) component;
            return alSelectField.getSearchVal();
        }else{
            return super.getOutputProperty(context, component, propertyName, propertyIndex);
        }
    }
	
	
	@Override
	public Class getInputPropertyClass(String propertyName) {
		Class ipc;
		if(propertyName.equals(AutoLookupSelectField.PROPERTY_KEY) || propertyName.equals(AutoLookupSelectField.PROPERTY_SEARCH_VAL)){
			ipc = String.class;
		}else{
			ipc = super.getInputPropertyClass(propertyName);	
		}
		return ipc;
	}

	@Override
	public void storeInputProperty(Context context, Component component, 
            String propertyName, int propertyIndex, Object newValue) {
		if (propertyName.equals(AutoLookupSelectField.PROPERTY_KEY) || propertyName.equals(AutoLookupSelectField.PROPERTY_SEARCH_VAL)) {
            ClientUpdateManager clientUpdateManager = 
                    (ClientUpdateManager) context.get(ClientUpdateManager.class);
            clientUpdateManager.setComponentProperty(component, 
                    propertyName, newValue);
        }

		super.storeInputProperty(context, component, propertyName, propertyIndex, newValue);
	}

	@Override
	public Class getComponentClass() {
		return AutoLookupSelectField.class;
	}
	
	@Override
	public String getClientComponentType(final boolean shortType) {
		return COMPONENT_NAME;
	}
}
