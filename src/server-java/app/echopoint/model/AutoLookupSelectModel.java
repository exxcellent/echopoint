package echopoint.model;

import java.util.List;

//import echopoint.util.AutoLookupModel.Entry;

public interface AutoLookupSelectModel {
/*	public interface EntrySelect extends Entry{
		public String getKey();
		public String getSearchVal();
	}*/
	public interface EntrySelect {
		public String getValue();
		public String getKey();
		public String getSearchVal();
	}
	
	public List<EntrySelect> searchEntries(String searchString);
}
