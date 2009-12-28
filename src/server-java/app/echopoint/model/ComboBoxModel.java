package echopoint.model;


public interface ComboBoxModel extends AutoLookupSelectModel
{
  interface Listener
  {
    public void entriesListChanged();
  }

  public void addComboBoxModelListener(Listener l);
  public void removeComboBoxModelListener(Listener l);
}
