/**
 * The test class used to test echopoint.HtmlLabel component.
 *
 * @author Rakesh 2008-06-26
 * @version $Id$
 */
echopoint.test.HtmlLabelTest = Core.extend(
{
  $static:
  {
    CONTENT: "<br/><br/><b>HtmlLabel</b> simple test content.<br/><br/>"
  },

  $construct: function( testArea )
  {
    testArea.add( this._createComponent() );
  },

  /** Create the component that is to be tested. */
  _createComponent: function()
  {
    return new echopoint.HtmlLabel(
      {
        renderId: "echopointUnitTestHtmlLabel",
        text: echopoint.test.HtmlLabelTest.CONTENT
      } );
  }
});