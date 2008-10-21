/**
 * A test class for the echopoint.ImageIcon client-side component.
 * Displays a sample image and applies standard styles.
 *
 * @author Rakesh 2008-10-20
 * @version $Id$
 */
echopoint.test.ImageIconTest = Core.extend(
{
  imageIcon: null,
  label: null,
  count: 0,

  $construct: function( testArea )
  {
    testArea.add( this._createImageIcon() );
    testArea.add( this._createLabel() );
  },

  _createImageIcon: function()
  {
    this.imageIcon = new echopoint.ImageIcon(
    {
      renderId: "echopointUnitTestImageIcon",
      styleName: "Default",
      events:
      {
        action: Core.method( this, this._actionPerformed )
      }
    } );

    return this.imageIcon;
  },

  _createLabel: function()
  {
    this.label = new Echo.Label(
    {
      renderId: "echopointUnitTestImageIconLabel",
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
