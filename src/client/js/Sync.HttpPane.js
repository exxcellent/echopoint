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

  /** The container element in which the iframe is contained. */
  element: null,

  /** The iframe used to load the user specified URI. */
  iframe: null,

  renderAdd: function( update, parentElement )
  {
    this.element = document.createElement( "div" );
    this.element.id = this.component.renderId;
    this._setDefaultStyles();
    this.element.appendChild( this._createIframe() );

    parentElement.appendChild( this.element );
  },

  renderDispose: function( update )
  {
    this.iframe = null;
    this.element = null;
  },

  renderUpdate: function( update )
  {
    this.iframe.src = this.component.get( "uri" );
  },

  /** Set default styles to ensure that the container fills its parent. */
  _setDefaultStyles: function()
  {
    this.element.style.position = "absolute";
    this.element.style.width = "100%";
    this.element.style.height = "100%";
    this.element.style.overflow = "auto";
  },

  /** Create the iframe in which the URI contents are displayed. */
  _createIframe: function()
  {
    this.iframe = document.createElement( "iframe" );
    this.iframe.src = this.component.get( "uri" );

    this.iframe.style.position = "relative";
    this.iframe.style.width = "100%";
    this.iframe.style.height = "100%";
    this.iframe.style.borderStyle = "none";

    return this.iframe;
  }
});
