/**
 * Component rendering peer: echopoint.Strut
 *
 * @author Rakesh 2008-07-20
 * @version $Id$
 */
echopoint.StrutSync = Core.extend( echopoint.internal.AbstractContainerSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.STRUT, this );
  },

  $static:
  {
    IMAGE: "images/transparent1x1.gif",
    DEFAULT_WIDTH: "10px",
    DEFAULT_HEIGHT: "10px"
  },

  /** The image used as the filler */
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
    this.renderStyle();
  },

  /** The default width to use for the image element. */
  getDefaultWidth: function()
  {
    return echopoint.StrutSync.DEFAULT_WIDTH;
  },

  /** The default height to use for the image element. */
  getDefaultHeight: function()
  {
    return echopoint.StrutSync.DEFAULT_HEIGHT;
  },

  /** Function used to create the image element. */
  _createImage: function()
  {
    this._image = document.createElement( "img" );
    this._image.id = this.component.renderId;
    this._image.setAttribute( "src",
        this.client.getResourceUrl( "echopoint", echopoint.StrutSync.IMAGE ) );

    this.renderStyle( this._image );
    return this._image;
  }
});