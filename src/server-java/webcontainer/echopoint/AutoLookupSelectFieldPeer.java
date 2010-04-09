package echopoint;

import static nextapp.echo.webcontainer.WebContainerServlet.getServiceRegistry;
import nextapp.echo.app.Color;
import nextapp.echo.app.Component;
import nextapp.echo.app.update.ClientUpdateManager;
import nextapp.echo.app.util.Context;
import nextapp.echo.webcontainer.ServerMessage;
import nextapp.echo.webcontainer.Service;
import nextapp.echo.webcontainer.service.JavaScriptService;
import echopoint.internal.AutoLookupSelectService;

public class AutoLookupSelectFieldPeer extends RegexTextFieldPeer {
	private static final String COMPONENT_NAME = AutoLookupSelectField.class.getName();
	
	/** The service for the client side peer for this component. */
	private static final String[] SERVICE_FILES = { "resource/js/Application.AutoLookupSelectField.js", 
													"resource/js/Sync.AutoLookupSelectField.js" };

	private static final Service COMPONENT_SERVICE = JavaScriptService.forResources(COMPONENT_NAME, SERVICE_FILES);
	private int combo_listchanged = 0;
	
	static{
		AutoLookupSelectService.install();
		getServiceRegistry().add(COMPONENT_SERVICE);
	}
	
	public AutoLookupSelectFieldPeer(){
		super();
		addOutputProperty(AutoLookupSelectField.PROPERTY_KEY);
		addOutputProperty(AutoLookupSelectField.PROPERTY_SEARCH_VAL);
    addOutputProperty(AutoLookupSelectField.PROPERTY_OPTIONS_VISIBLE);
    addOutputProperty(AutoLookupSelectField.PROPERTY_OPTIONS_MENU_BGCOLOR);
    addOutputProperty(AutoLookupSelectField.PROPERTY_OPTIONS_MENU_BORDER);
    addOutputProperty(AutoLookupSelectField.PROPERTY_SELECTED_BG);
    addOutputProperty(ComboBox.PROPERTY_COMBO_LIST_CHANGED);
    addOutputProperty(AutoLookupSelectField.PROPERTY_ACTION_CLICK);
	}
	
	@Override
	public void init(final Context context, final Component component) {
		super.init(context, component);
		final ServerMessage serverMessage = (ServerMessage) context.get(ServerMessage.class);
		serverMessage.addLibrary(COMPONENT_NAME);
		AutoLookupSelectService.getInstance().register((AutoLookupSelectField)component);
	}
	
	@Override
	public Object getOutputProperty(Context context, Component component, String propertyName, int propertyIndex) 
  {
    if (propertyName.equals(AutoLookupSelectField.PROPERTY_KEY)) 
      return ( (AutoLookupSelectField) component).getKey();
    else 
    if (propertyName.equals(AutoLookupSelectField.PROPERTY_SEARCH_VAL)) 
      return ( (AutoLookupSelectField) component).getSearchVal();
    else 
    if( propertyName.equals(AutoLookupSelectField.PROPERTY_OPTIONS_VISIBLE) ) 
      return ( (AutoLookupSelectField) component).isOptionsVisible();
    else
    if( propertyName.equals(AutoLookupSelectField.PROPERTY_OPTIONS_MENU_BGCOLOR) ) 
      return ( (AutoLookupSelectField) component).getOptionsMenuBackground();
    else
    if( propertyName.equals(AutoLookupSelectField.PROPERTY_OPTIONS_MENU_BORDER) ) 
      return ( (AutoLookupSelectField) component).getOptionsMenuBorder();
    else
    if( propertyName.equals(AutoLookupSelectField.PROPERTY_SELECTED_BG) ) 
      return ( (AutoLookupSelectField) component).getSelectedOptionBackground();
    if( propertyName.equals(ComboBox.PROPERTY_COMBO_LIST_CHANGED) )
    	return new Integer(combo_listchanged++);  // always unique value !
    else
      return super.getOutputProperty(context, component, propertyName, propertyIndex);
  }
	
	@Override
	public Class getInputPropertyClass(String propertyName) 
  {
		if(propertyName.equals(AutoLookupSelectField.PROPERTY_KEY) || propertyName.equals(AutoLookupSelectField.PROPERTY_SEARCH_VAL))
			return String.class;
    else 
    if( propertyName.equals(AutoLookupSelectField.PROPERTY_OPTIONS_VISIBLE) ) 
      return Boolean.class;      
    else
			return super.getInputPropertyClass(propertyName);	
	}

	@Override
	public void storeInputProperty(Context context, Component component, 
            String propertyName, int propertyIndex, Object newValue) {
		if( propertyName.equals(AutoLookupSelectField.PROPERTY_KEY) || propertyName.equals(AutoLookupSelectField.PROPERTY_SEARCH_VAL) || 
        propertyName.equals(AutoLookupSelectField.PROPERTY_OPTIONS_VISIBLE ) ) 
    {
      ClientUpdateManager clientUpdateManager =  (ClientUpdateManager) context.get(ClientUpdateManager.class);
      clientUpdateManager.setComponentProperty(component, propertyName, newValue);
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
