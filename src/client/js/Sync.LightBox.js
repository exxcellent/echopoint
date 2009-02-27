/**
 * Component rendering peer: LightBox
 *
 * @author Rakesh 2009-02-24
 * @version: $Id$
 */
echopoint.internal.LightBoxSync = Core.extend( Echo.Render.ComponentSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.LIGHT_BOX, this );
  },

  /** The container used to display the translucent image. */
  _container: null,

  renderAdd: function( update, parentElement )
  {
    parentElement.appendChild( this._createContainer() );
  },

  renderDispose: function( update )
  {
    this._container = null;
  },

  renderUpdate: function( update )
  {
    var parentElement = this._container.parent;
    Echo.Render.renderComponentDispose( update, update.parent );
    parentElement.removeChild( this._container );
    this.renderAdd( update, parentElement );
    return false;
  },

  _createContainer: function()
  {
    this._container = document.createElement( "div" );
    this._container.id = this.component.renderId;
    this._container.style.backgroundColor = "transparent";
    this._container.style.display = "none";
    this._container.style.position = "absolute";
    this._container.style.left = "0px";
    this._container.style.top = "0px";
    this._container.style.margin = "0px";
    this._container.style.padding = "0px";
    this._container.style.cursor = "wait";
  }
});
