/**
 * A test class for the echopoint.PushButton client-side component.
 * Displays a sample button and applies standard styles.
 *
 * @author Rakesh 2009-02-24
 * @version $Id$
 */
echopoint.test.PushButtonTest = Core.extend(
{
  button: null,
  label: null,
  count: 0,

  $construct: function( testArea )
  {
    testArea.add( this._createPushButton() );
    testArea.add( this._createLabel() );
  },

  _createPushButton: function()
  {
    this.button = new echopoint.PushButton(
    {
      renderId: "echopointUnitTestPushButton",
      styleName: "Default",
      events:
      {
        action: Core.method( this, this._actionPerformed )
      }
    } );

    return this.button;
  },

  _createLabel: function()
  {
    this.label = new Echo.Label(
    {
      renderId: "echopointUnitTestPushButtonLabel",
      style: "Default",
      text: "Action Label"
    } );

    return this.label;
  },

  _actionPerformed: function()
  {
    this.label.set( "text", "Button clicked: " + ++this.count );
  }
});
