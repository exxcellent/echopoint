/**
 * Component rendering peer: AbstractHtmlComponent
 *
 * @author Rakesh 2008-06-20
 * @version: $Id$
 */
echopoint.internal.AbstractHtmlComponentSync = Core.extend( Echo.Render.ComponentSync,
{
  $abstract: true,

  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.ABSTRACT_HTML_COMPONENT, this );
  },

  /** The type of container to use.  Sub-classes must set this. */
  _containerType: null,

  /** The container element for this component */
  _container: null,

  renderAdd: function( update, parentElement )
  {
    this._container = document.createElement( this._containerType );
    this._container.id = this.component.renderId;

    Echo.Sync.Font.render( this.component.render( "font" ), this._container );
    Echo.Sync.Color.renderFB( this.component, this._container );
    this._container.innerHTML = this.component.render( "text", "" );
    this._processLinks();

    parentElement.appendChild( this._container );
  },

  renderDispose: function( update )
  {
    this._container = null;
    this._containerType = null;
  },

  renderUpdate: function( update )
  {
    this._container.innerHTML = this.component.render( "text", "" );
    this._processLinks();
  },

  /**
   * Process the <code>target</code> property and if set, set the attribute
   * for all anchor tags in the <code>text</code> content.  If a target
   * attribute already exists, then no action is taken.
   */
  _processLinks: function()
  {
    var target = this.component.get( "target" );

    if ( target )
    {
      try
      {
        var anchors = this._container.getElementsByTagName( "a" );
        for ( var i = 0; i < anchors.length; ++i )
        {
          var attrib = anchors[i].attributes.getNamedItem( "target" );
          if ( ! attrib )
          {
            anchors[i].setAttribute( "target", target );
          }
        }
      }
      catch ( exception )
      {
        this._container.innerHTML = this.component.render( "text", "" );
        var message = "XML parsing error for html content: " +
            this.component.get( "text" ) + Core.Debug.toString( exception );
        Core.Debug.consoleWrite( message );
      }
    }
  }
});
