/**
 * A test class for the echopoint.Anchor client-side component.
 * Displays a sample anchor tag with default styles.
 *
 * @author Rakesh 2008-10-23
 * @version $Id$
 */
echopoint.test.AnchorTest = Core.extend(
{
  $construct: function( testArea )
  {
    testArea.add( this._createAnchor() );
  },

  _createAnchor: function()
  {
    return new echopoint.Anchor(
    {
      renderId: "echopointUnitTestAnchor",
      styleName: "Default"
    } );
  }
} );
