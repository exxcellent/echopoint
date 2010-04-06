package echopoint;

import nextapp.echo.app.ResourceImageReference;
import echopoint.model.AutoLookupSelectFieldModel;
import echopoint.model.ComboBoxModel;


public class ComboBox extends AutoLookupSelectField 
{
	private static final long serialVersionUID = 22091226L;
  protected static final String PROPERTY_COMBO_LIST_CHANGED = "comboListChanged";
  private static final String PROPERTY_COMBOBOX_MODE = "comboboxMode";
  public static final ResourceImageReference default_popup_icon = new ResourceImageReference( "/resource/images/Decrement.gif" );

  private class ComboBoxModelListner implements ComboBoxModel.Listener
  {
    private boolean b = true;
    public void entriesListChanged()
    {
      b = !b;
      set( PROPERTY_COMBO_LIST_CHANGED, Boolean.valueOf(b) );
    }
  }
  
  private final ComboBoxModelListner combo_model_listener = new ComboBoxModelListner();

	/**
	 * Creates a new <code>ComboBox</code>.
	 */
	public ComboBox() 
  { 
    super(); 
    this.setPopupIcon(default_popup_icon); 
    this.setNoMatchingOptionText("");
    this.setSearchBarSearchingText("");
    this.set(PROPERTY_COMBOBOX_MODE, Boolean.TRUE);
  }
	
	public ComboBoxModel getComboBoxModel() { return (ComboBoxModel) get(PROPERTY_AUTO_LOOKUP_MODEL); }

	public void setComboBoxModel(ComboBoxModel model) 
  {
    ComboBoxModel old_model = getComboBoxModel();
    if( old_model != null ) old_model.removeComboBoxModelListener( combo_model_listener );
    model.addComboBoxModelListener( combo_model_listener );
		set(PROPERTY_AUTO_LOOKUP_MODEL, model);
	}

  public AutoLookupSelectFieldModel getAutoLookupFieldModel() {  throw new UnsupportedOperationException("Not supported for ComboBox: use getComboBoxModel()."); }
  public void setAutoLookupFieldModel(AutoLookupSelectFieldModel autoLookupModel) {  throw new UnsupportedOperationException("Not supported for ComboBox: use setComboBoxModel(...).");  }

  public void init() 
  { 
    super.init();  
    ComboBoxModel model = getComboBoxModel();
    if( model != null ) model.addComboBoxModelListener( combo_model_listener );
  }

  public void dispose() 
  {
    super.dispose();  
    ComboBoxModel model = getComboBoxModel();
    if( model != null ) model.removeComboBoxModelListener( combo_model_listener );
  }
}
