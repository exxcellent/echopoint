package echopoint;

import nextapp.echo.app.PaneContainer;
import nextapp.echo.app.Component;

import java.util.HashMap;
import java.util.Map;

import echopoint.template.TemplateDataSource;

/**
 * Created: 2009-apr-06
 */
public class TemplatePanel extends Component implements PaneContainer {


	public static final String PROPERTY_TEMPLATE_DATA_SOURCE = "templateDataSource";
    public static final String PROPERTY_COMPONENT_MAPPING = "componentmapping";

    /**
     * Constructs a <code>TemplatePanel</code> with no template data as yet.
     */
    public TemplatePanel() {
        super();
        set(PROPERTY_COMPONENT_MAPPING, new HashMap());
    }

    /**
     * Constructs a <code>TemplatePanel</code> with the specified
     * TemplateDataSource.
     *
     * @param template -
     *                 the source for the template data.
     */
    public TemplatePanel(TemplateDataSource tds) {
        super();
		setTemplateDataSource(tds);
        set(PROPERTY_COMPONENT_MAPPING, new HashMap());
    }


	/**
	 * Sets the TemplateDataSource to be used
	 *
	 * @param templateDataSource
	 *            the TemplateDataSource to be used
	 */
	public void setTemplateDataSource(TemplateDataSource templateDataSource) {
		set(PROPERTY_TEMPLATE_DATA_SOURCE, templateDataSource);
	}

    public TemplateDataSource getTemplateDataSource()
    {
        return (TemplateDataSource) get(PROPERTY_TEMPLATE_DATA_SOURCE);
    }


    public void addNamedComponent(Component component, String componentName) {
        if (component == null)
            throw new IllegalArgumentException("component must be non null.");
        if (componentName == null)
            throw new IllegalArgumentException("componentName must be non null.");

        ((Map) get(PROPERTY_COMPONENT_MAPPING)).put(componentName, component);
        add(component);
    }

    public Map getComponentMapping()
    {
        return (Map) get(PROPERTY_COMPONENT_MAPPING); 
    }

    /**
     * Returns the name associated with the component or null if it cant be
     * found.
     *
     * @param component -
     *                  the component associated with the name
     * @return a name associated with component
     */
    public String getComponentName(Component component) {
        String componentNames[] = getNamedComponents();
        for (int i = 0; i < componentNames.length; i++) {
            Component c = getNamedComponent(componentNames[i]);
            if (component == c) {
                return componentNames[i];
            }
        }
        return null;
    }


    /**
	 * Returns a component associated with the name or null if it cant be found.
	 *
	 * @param componentName -
	 *            the name associated with the component
	 * @return a component associated with componentName
	 */
	public Component getNamedComponent(String componentName) {
		return (Component) ((Map) get(PROPERTY_COMPONENT_MAPPING)).get((componentName));
	}

	/**
	 * @return an array of all the component names in the
	 *         <code>TemplatePanel</code>.
	 */
	public String[] getNamedComponents() {
        Map componentNameMap = ((Map) get(PROPERTY_COMPONENT_MAPPING));
		return (String[]) componentNameMap.keySet().toArray(new String[componentNameMap.keySet().size()]);
	}


	public void remove(Component c) {
		String componentName = getComponentName(c);
		if (componentName != null) {
			((Map) get(PROPERTY_COMPONENT_MAPPING)).remove(componentName);
		}
		super.remove(c);
	}

	/**
	 * Removes a named component from the <code>TemplatePanel</code> that was
	 * previously added via the <code>addNamedComponent()</code> method.
	 *
	 * @param componentName -
	 *            the name of the component
	 */
	public void removeNamedComponent(String componentName) {
		if (componentName == null)
			throw new IllegalArgumentException("componentName must be non null.");

		Component child = getNamedComponent(componentName);
		((Map) get(PROPERTY_COMPONENT_MAPPING)).remove(componentName);
		if (child != null) {
			remove(child);
		}
	}

}
