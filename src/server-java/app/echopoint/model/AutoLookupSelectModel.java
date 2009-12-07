package echopoint.model;

import java.util.List;

public interface AutoLookupSelectModel
{
  interface EntrySelect
  {
    String getValue();

    String getKey();

    String getSearchVal();
  }

  List<EntrySelect> searchEntries( String searchString );
}
