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

  /**
    * Returns a list by a parameter 'searchString'.
    *
    * @param searchString  - if is empty we have a request for full entry list, otherwise we have a request for sub entry list
    */
  List<EntrySelect> searchEntries( String searchString );
}
