/**
 * Component rendering peer: AbstractHtmlComponent
 *
 * @author Rakesh 2008-06-20
 * @version: $Id$
 */
echopoint.internal.AbstractHtmlComponentSync = Core.extend( echopoint.internal.AbstractContainerSync,
{
  $abstract: true,

  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.ABSTRACT_HTML_COMPONENT, this );
  },

  $virtual:
  {
    /** The type of container to use.  Sub-classes must set this. */
    containerType: null
  },

  /** The container element for this component */
  _container: null,

  renderAdd: function( update, parentElement )
  {
    this._container = document.createElement( this.containerType );
    this._container.id = this.component.renderId;
    this.renderStyle( this._container );
    this._renderStyle();

    this._container.innerHTML = this.component.render( "text", "" );
    this._processLinks();

    parentElement.appendChild( this._container );
  },

  renderDispose: function( update )
  {
    this._container = null;
    this.containerType = null;
  },

  renderUpdate: function( update )
  {
    this._container.innerHTML = this.component.render( "text", "" );
    this._processLinks();
  },

  /** Set additional styles for the component. */
  _renderStyle: function()
  {
    this._container.style.overflow = "auto";
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
