package echopoint;

import java.util.ResourceBundle;

import echopoint.internal.TextField;
import echopoint.model.AutoLookupSelectModel;
import nextapp.echo.app.ImageReference;


public class AutoLookupSelectField extends TextField {

	private static final long serialVersionUID = 1L;

	protected ResourceBundle resourceBundle;
	private String key;
	private String searchVal;
	private boolean opt_visible = false;
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
  public static final String PROPERTY_OPTIONS_VISIBLE = "optionsVisible";

	
  public void setSearchBarSearchingIcon( ImageReference icon ) { set(PROPERTY_SEARCH_BAR_SEARCHING_ICON, icon); } 
  public ImageReference getSearchBarSearchingIcon() { return (ImageReference )get(PROPERTY_SEARCH_BAR_SEARCHING_ICON); } 
  
  public void setNoMatchingOptionText( String txt ) { set(PROPERTY_NO_MATCHING_OPTION_TEXT, txt); } 
  public String getNoMatchingOptionText() { return (String)get(PROPERTY_NO_MATCHING_OPTION_TEXT ); } 

  public void setSearchBarSearchingText( String txt ) { set(PROPERTY_SEARCH_BAR_SEARCHING_TEXT, txt); } 
  public String getSearchBarSearchingText() { return (String)get(PROPERTY_SEARCH_BAR_SEARCHING_TEXT); } 

  public boolean isOptionsVisible() { return opt_visible; } 

  public void setOptionsVisible(boolean b) 
  { 
    boolean opt_visible_old = opt_visible;
    if( opt_visible_old != b )
    {          
      opt_visible = b;
      firePropertyChange( PROPERTY_OPTIONS_VISIBLE, Boolean.valueOf(opt_visible_old), Boolean.valueOf(b) );
    }
  }

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
      if (PROPERTY_KEY.equals(inputName)) 
        setKey((String)inputValue);
      else 
      if (PROPERTY_SEARCH_VAL.equals(inputName))
        setSearchVal((String)inputValue);
      else 
      if (PROPERTY_OPTIONS_VISIBLE.equals(inputName))
      {
        setOptionsVisible( ( (Boolean)inputValue ).booleanValue() );
      }
    }
}
