/**
 * The test class used to test echopoint.LightBox component.
 *
 * @author Rakesh 2009-03-06
 * @version $Id$
 */
echopoint.test.LightBoxTest = Core.extend(
{
  $construct: function( testArea )
  {
    var lightBox = this._createComponent();
    lightBox.add( this._createLabel() );
    lightBox.add( new echopoint.Strut() );
    lightBox.add( this._createTextField() );
    lightBox.add( new echopoint.Strut() );
    lightBox.add( this._createImage( lightBox ) );
    lightBox.add( new echopoint.Strut() );
    lightBox.add( this._createControl( lightBox ) );
    lightBox.add( new echopoint.Strut() );

    testArea.add( lightBox );
  },

  /** Create the component that is to be tested. */
  _createComponent: function()
  {
    return new echopoint.LightBox(
    {
      renderId: "echopointUnitTestLightBox",
      parentOnly: true,
      hidden: false
    } );
  },

  _createLabel: function()
  {
    return new Echo.Label(
    {
      renderId: "echopointUnitTestLightBoxLabel",
      styleName: "Default",
      text: "Label 1"
    });
  },

  _createTextField: function()
  {
    return new Echo.TextField(
    {
      renderId: "echopointUnitTestLightBoxTextField",
      styleName: "Default",
      text: "Sample TextField"
    });
  },

  _createImage: function()
  {
    return new echopoint.ImageIcon(
    {
      renderId: "echopointUnitTestLightBoxImageIcon",
      styleName: "Default"
    });
  },

  _createControl: function( lightBox )
  {
    return new Echo.Button(
    {
      renderId: "echopointUnitTestLightBoxButton",
      styleName: "Default",
      text: "Close",
      events:
      {
        action: function()
        {
          var hidden = lightBox.get( echopoint.LightBox.HIDDEN );
          var state = ( hidden == "true" ) ? "false" : "true";
          lightBox.set( echopoint.LightBox.HIDDEN, state );
        }
      }
    });
  }
});
