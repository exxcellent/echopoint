/**
 * A component used to display a list of control components used to display
 * the echopoint.Xxx component being tested.  Add components to be tested that
 * have an associated echopoint.test.&lt;ComponentName&gt;Test class to the
 * {@link COMPONENTS} array.
 *
 * @author Rakesh 2008-06-26
 * @version $Id$
 */
echopoint.test.ComponentList = Core.extend( Echo.Column,
{
  $static:
  {
    COMPONENTS: new Array(
        "DirectHtml",
        "HtmlLabel",
        "HttpPane",
        "Strut"
      )
  },

  $construct: function()
  {
    Echo.Column.call( this );

    for ( var i = 0; i < echopoint.test.ComponentList.COMPONENTS.length; ++i )
    {
      this.add( this._createButton(
          echopoint.test.ComponentList.COMPONENTS[i] ) );
    }
  },

  /**
   * Create the control used to display the component being tested.
   *
   * @param component The class name (not fully qualified) of the component
   *   to be tested.
   */
  _createButton: function( component )
  {
    return new echopoint.test.Button( component );
  }
});