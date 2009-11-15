package echopoint;

import java.util.ResourceBundle;

import echopoint.internal.TextField;
import echopoint.model.AutoLookupSelectModel;

public class AutoLookupSelectField extends TextField {

	private static final long serialVersionUID = 1L;

	protected ResourceBundle resourceBundle;
	private String key;
	private String searchVal;
	public static final String PROPERTY_KEY = "key";
	public static final String PROPERTY_SEARCH_VAL = "searchVal";

	/**
	 * Creates a new <code>AutoLookupSelectField</code>.
	 */
	public AutoLookupSelectField() {
		super();
		// Add design-time configured components.
		initComponents();
	}
	

	/**
	 * Configures initial state of component.
	 * WARNING: AUTO-GENERATED METHOD.
	 * Contents will be overwritten.
	 */
	private void initComponents() {

	}
	
	public static final String PROPERTY_AUTO_LOOKUP_MODEL = "autoLookupModel";
//	public static final String PROPERTY_POPUP_PROPERTIES = "popupProperties";
//	public static final String PROPERTY_ENTRY_PROPERTIES = "entryProperties";
//	public static final String PROPERTY_ENTRY_ROLLOVER_PROPERTIES = "entryRolloverProperties";
//	public static final String PROPERTY_SEARCH_BAR_PROPERTIES = "searchBarProperties";
//	public static final String PROPERTY_SEARCH_BAR_ROLLOVER_PROPERTIES = "searchBarRolloverProperties";
	public static final String PROPERTY_SEARCH_BAR_ICON = "searchBarIcon";
	public static final String PROPERTY_SEARCH_BAR_SEARCHING_ICON = "searchBarSearchingIcon";
	public static final String PROPERTY_SEARCH_BAR_TEXT = "searchBarText";
	public static final String PROPERTY_SEARCH_BAR_SHOWN = "searchBarShown";
	public static final String PROPERTY_SEARCH_BAR_SEARCHING_TEXT = "searchBarSearchingText";
	public static final String PROPERTY_NO_MATCHING_OPTION_TEXT = "noMatchingOptionText";

	
	public AutoLookupSelectModel getAutoLookupModel() {
		return (AutoLookupSelectModel) get(PROPERTY_AUTO_LOOKUP_MODEL);
	}

	public void setAutoLookupModel(AutoLookupSelectModel autoLookupModel) {
		set(PROPERTY_AUTO_LOOKUP_MODEL, autoLookupModel);
	}


	public void setKey(String key) {
		String oldValue = this.key;
		this.key = key;
		firePropertyChange(PROPERTY_KEY, oldValue, key);
	}


	public String getKey() {
		return key;
	}


	public void setSearchVal(String searchVal) {
		String oldValue = this.searchVal;
		this.searchVal = searchVal;
		firePropertyChange(PROPERTY_SEARCH_VAL, oldValue, searchVal);
	}


	public String getSearchVal() {
		return searchVal;
	}
	
	@Override
	public void processInput(String inputName, Object inputValue) {
	    super.processInput(inputName, inputValue);
        if (PROPERTY_KEY.equals(inputName)) {
            setKey((String)inputValue);
        }else if (PROPERTY_SEARCH_VAL.equals(inputName)) {
        	setSearchVal((String)inputValue);
        }
    }
}
