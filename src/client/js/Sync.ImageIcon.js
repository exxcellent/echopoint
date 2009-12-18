/**
 * Component rendering peer: ImageIcon
 *
 * @author Rakesh 2008-10-20
 * @version $Id$
 */
echopoint.ImageIconSync = Core.extend( echopoint.internal.AbstractImageSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.IMAGE_ICON, this );
  },

  renderAdd: function( update, parentElement )
  {
    parentElement.appendChild( this.createImage() );
  },

  renderDispose: function( update )
  {
    this.image = null;
  },

  renderUpdate: function( update )
  {
    this.renderStyle( this._image, update );
    this.renderImageStyle( update );
    return false; // Child elements not supported: safe to return false.
  }
});
