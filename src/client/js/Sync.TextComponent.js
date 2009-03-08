/**
 * Base component rendering peer for text components.  Exposes event
 * handling functions for sub-classes.
 *
 * @author Rakesh 2009-03-05
 * @version: $Id$
 */
echopoint.internal.TextComponentSync = Core.extend( Echo.Sync.TextField,
{
  $abstract: true,

  $virtual:
  {
    /** The event handler for a "blur" event. */
    processBlur: function( event )
    {
      this._textFieldProcessBlur( event );
    },

    /** The event handler for a mouse click event. */
    processClick: function( event )
    {
      this._textFieldProcessClick( event );
    },

    /** The event listener for a focus change event. */
    processFocus: function( event )
    {
      this._textFieldProcessFocus( event );
    },

    /** The event handler for a key press event. */
    processKeyPress: function( event )
    {
      this._textFieldProcessKeyPress( event );
    },

    /** The event handler for a key up event on the text component. */
    processKeyUp: function( event )
    {
      this._textFieldProcessKeyUp( event );
    }
  },

  $construct: function()
  {
    Echo.Sync.TextField.call( this );

    this._textFieldProcessBlur = this._processBlur;
    this._processBlur = this.processBlur;

    this._textFieldProcessClick = this._processClick;
    this._processClick = this.processClick;

    this._textFieldProcessFocus = this._processFocus;
    this._processFocus = this.processFocus;

    this._textFieldProcessKeyPress = this._processKeyPress;
    this._processKeyPress = this.processKeyPress;

    this._textFieldProcessKeyUp = this._processKeyUp;
    this._processKeyUp = this.processKeyUp;
  }
});
