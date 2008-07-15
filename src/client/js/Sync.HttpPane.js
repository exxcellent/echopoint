/**
 * Component rendering peer: HttpPane
 *
 * @author Rakesh 2008-07-13
 * @version: $Id$
 */
echopoint.HttpPaneSync = Core.extend( Echo.Render.ComponentSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.HTTP_PANE, this );
  },

  /**
   * The container element in which the iframe is contained.  This is used
   * to enable proper <code>height</code> style property, since percentage
   * values do not work properly when set directly on the iframe.
   */
  _container: null,

  /** The iframe used to load the user specified URI. */
  _iframe: null,

  renderAdd: function( update, parentElement )
  {
    this._container = document.createElement( "div" );
    this._container.id = this.component.renderId;
    this._container.appendChild( this._createIframe() );

    parentElement.appendChild( this._container );
  },

  renderDispose: function( update )
  {
    this._iframe = null;
    this._container = null;
  },

  renderUpdate: function( update )
  {
    this._iframe.src = this.component.get( "uri" );
  },

  /** Create the iframe in which the URI contents are displayed. */
  _createIframe: function()
  {
    this._iframe = document.createElement( "iframe" );
    this._iframe.allowtransparency = "true";
    this._renderStyle();
    this._iframe.src = this.component.get( "uri" );

    return this._iframe;
  },

  /** Set the styles for the iframe element. */
  _renderStyle: function()
  {
    this._renderContainerStyle();
    this._renderIframeStyle();
  },

  _renderContainerStyle: function()
  {
    this._container.style.position = "absolute";
    this._container.style.overflow = "auto";

    Echo.Sync.Alignment.render( this.component.render( "alignment" ),
        this._container, false, null );
    Echo.Sync.Border.render( this.component.render( "border" ), this._container );
    Echo.Sync.Color.renderFB( this.component, this._container );
    Echo.Sync.FillImage.render(
        this.component.render( "backgroundImage" ), this._container );
    Echo.Sync.Insets.render(
        this.component.render( "insets" ), this._container, "padding" );

    var width = this.component.render( "width" );
    if ( width && !Echo.Sync.Extent.isPercent( width ) )
    {
      this._container.style.width = Echo.Sync.Extent.toCssValue( width, true );
    }
    else
    {
      this._container.style.width = "100%";
    }

    var height = this.component.render( "height" );
    if ( height )
    {
      this._container.style.height = Echo.Sync.Extent.toCssValue( height, false );
    }
    else
    {
      this._container.style.height = "100%";
    }
  },

  _renderIframeStyle: function()
  {
    this._iframe.style.position = "relative";
    this._iframe.style.width = "100%";
    this._iframe.style.height = "100%";
    this._iframe.style.borderStyle = "none";
  }
});
