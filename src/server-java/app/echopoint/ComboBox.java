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
    public void entriesListChanged()
    {
      firePropertyChange(PROPERTY_COMBO_LIST_CHANGED, null, Boolean.TRUE);
    }
  }
  
  private final ComboBoxModelListner combo_model_listener = new ComboBoxModelListner();

	/**
	 * Creates a new <code>AutoLookupSelectField</code>.
	 */
	public ComboBox() { super(); this.setPopupIcon(default_popup_icon); }
	
	public ComboBoxModel getComboBoxModel() { return (ComboBoxModel) get(PROPERTY_AUTO_LOOKUP_MODEL); }

	public void setComboBoxModel(ComboBoxModel model) 
  {
    ComboBoxModel old_model = getComboBoxModel();
    if( old_model != null ) old_model.removeComboBoxModelListener( combo_model_listener );
		set(PROPERTY_AUTO_LOOKUP_MODEL, model);
    model.addComboBoxModelListener( combo_model_listener );
    set(PROPERTY_COMBOBOX_MODE, Boolean.TRUE);
	}

  public AutoLookupSelectFieldModel getAutoLookupFieldModel() {  throw new UnsupportedOperationException("Not supported for ComboBox: use getComboBoxModel()."); }
  public void setAutoLookupFieldModel(AutoLookupSelectFieldModel autoLookupModel) {  throw new UnsupportedOperationException("Not supported for ComboBox: use setComboBoxModel(...).");  }

  public void dispose() 
  {
    super.dispose();  
    ComboBoxModel model = getComboBoxModel();
    if( model != null ) model.removeComboBoxModelListener( combo_model_listener );
  }
}
