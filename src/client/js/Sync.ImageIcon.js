/**
 * Component rendering peer: ImageIcon
 *
 * @author Rakesh 2008-10-20
 * @version $Id$
 */
echopoint.ImageIconSync = Core.extend( echopoint.internal.AbstractContainerSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.IMAGE_ICON, this );
  },

  /** The image that is to be treated as a clickable map. */
  _image: null,

  renderAdd: function( update, parentElement )
  {
    parentElement.appendChild( this._createImage() );
  },

  renderDispose: function( update )
  {
    this._image = null;
  },

  renderUpdate: function( update )
  {
    this.renderStyle( this._image, update );
    return false; // Child elements not supported: safe to return false.
  },

  _createImage: function()
  {
    this._image = document.createElement( "img" );
    this._image.id = this.component.renderId;
    Echo.Sync.ImageReference.renderImg(
        this.component.render( echopoint.ImageIcon.URL ), this._image );
    Core.Web.Event.add( this._image, "click",
        Core.method( this, this._processClick ), false );

    this.renderStyle( this._image );
    return this._image;
  },

  _processClick: function()
  {
    if ( !this.client || !this.client.verifyInput( this.component ) ) return true;

    this.component.application.setFocusedComponent( this.component );
    this.component.doAction();
  }
});
