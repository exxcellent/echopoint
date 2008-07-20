/**
 * Component rendering peer: AbstractContainer
 *
 * @author Rakesh 2008-07-20
 * @version: $Id$
 */
echopoint.internal.AbstractContainerSync = Core.extend( Echo.Render.ComponentSync,
{
  $abstract: true,

  $static:
  {
    DEFAULT_WIDTH: "100%",
    DEFAULT_HEIGHT: "100%"
  },

  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.ABSTRACT_CONTAINER, this );
  },

  $virtual:
  {
    /**
     * The default width property to use.  Sub-classes should over-ride as
     * necessary.
     */
    getDefaultWidth: function()
    {
      return echopoint.internal.AbstractContainerSync.DEFAULT_WIDTH;
    },

    /**
     * The default height property to use.  Sub-classes should over-ride as
     * necessary.
     */
    getDefaultHeight: function()
    {
      return echopoint.internal.AbstractContainerSync.DEFAULT_HEIGHT;
    },

    /** The method used to render the style properties for the container. */
    renderStyle: function( container )
    {
      Echo.Sync.Alignment.render( this.component.render( "alignment" ),
          container, false, null );
      Echo.Sync.Border.render( this.component.render( "border" ), container );
      Echo.Sync.Color.renderFB( this.component, container );
      Echo.Sync.FillImage.render(
          this.component.render( "backgroundImage" ), container );
      Echo.Sync.Insets.render(
          this.component.render( "insets" ), container, "padding" );

      var width = this.component.render( "width" );
      container.style.width = Echo.Sync.Extent.toCssValue(
          ( ( width ) ? width : this.getDefaultWidth() ), true, true );

      var height = this.component.render( "height" );
      container.style.height = Echo.Sync.Extent.toCssValue(
          ( ( height ) ? height : this.getDefaultHeight() ), false, true );
    }
  }
} );