package echopoint;

import echopoint.tucana.FileUploadSelector;
import org.junit.BeforeClass;
import org.junit.AfterClass;
import org.junit.Test;
import nextapp.echo.app.Component;

/**
 * Unit test suite for the {@link echopoint.tucana.FileUploadSelector}
 * component.
 *
 * @author Rakesh Vidyadharan 2008-11-4
 * @version $Id$
 */
public class FileUploadSelectorTest
{
  private static FileUploadSelector component;

  @BeforeClass
  public static void init()
  {
    component = new FileUploadSelector();
  }

  @Test
  public void test()
  {}

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();
    content.add( component );
  }
}
