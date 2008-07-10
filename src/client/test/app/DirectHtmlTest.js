/**
 * A test class for the echopoint.DirectHtml client-side component.
 * Displays a DirectHtml component along with a RTA to test interaction with
 * the component.
 *
 * @author Rakesh 2008-06-26
 * @version $Id$
 */
echopoint.test.DirectHtmlTest = Core.extend(
{
  $static:
  {
    CONTENT: "<h2>DirectHtml Without Target</h2>" +
             "<p><b>First</b> paragraph content.</p>" +
             "<p><b>Second</b> paragraph content.</p>" +
             "<ol><li><b>First</b> line.</li>" +
             "<li><b>Second</b> line.</li>" +
             "<li><b>Third</b> line.</li></ol>" +
             "<p>Clicking <a href='http://wiki.nextapp.com/echowiki/EchoPoint'>link</a>" +
             " should open in the same browser window/tab.</p>",

    LINK_CONTENT:  "<h2>DirectHtml With Target Set</h2>" +
                   "<p>Clicking <a href='http://wiki.nextapp.com/echowiki/EchoPoint'>link</a>" +
                   " should open in a new browser window/tab.</p>" +
                   "<p>Clicking <a href='http://wiki.nextapp.com/echowiki/EchoPoint' target=''>link</a>" +
                   " should open in the same browser window/tab.</p>"
  },

  $construct: function( testArea )
  {
    var rta = this._createRTA();
    var component = this._createComponent(
        echopoint.test.DirectHtmlTest.CONTENT, null );

    testArea.add( rta );
    testArea.add( this._createButton( rta, component ) );
    testArea.add( component );

    testArea.add( this._createComponent(
        echopoint.test.DirectHtmlTest.LINK_CONTENT, "_new" ) );
  },

  /** Create the RTA used to interact with the component. */
  _createRTA: function()
  {
    return new Extras.RichTextArea(
    {
      styleName: "Default",
      text: echopoint.test.DirectHtmlTest.CONTENT
    });
  },

  /**
   * Create the button used to update the specified component content
   * with the contents of the specified RTA.
   *
   * @param rta The RTA from which content is to be read.
   * @param component The component whose content is to be set.
   */
  _createButton: function( rta, component )
  {
    var row = new Echo.Row( { style: "Default" } );
    var button = new Echo.Button(
    {
      style: "Default",
      text: "Save",
      events:
      {
        action: function( event )
        {
          component.set( "text", rta.get( "text" ) );
        }
      }
    } );

    row.add( button );
    return row;
  },

  /** Create the component being tested. */
  _createComponent: function( content, target )
  {
    return new echopoint.DirectHtml( { text: content, target: target } );
  }
});