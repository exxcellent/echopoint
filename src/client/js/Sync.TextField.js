/**
 * Base component rendering peer for text components.  Exposes event
 * handling functions for sub-classes.
 *
 * @author Rakesh 2009-03-05
 * @version: $Id$
 */
echopoint.internal.TextFieldSync = Core.extend( Echo.Sync.TextField,
{
  $abstract: true,

  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.TEXT_FIELD, this );
  },

  $static:
  {
    /** A map of rendering peer instances used to dereference by renderId. */
    instances: new Core.Arrays.LargeMap(),

    /**
     * Static function to filter the key event on the specified text field
     * instance.
     *
     * @param renderId The renderId with which the instance is mapped in the
     *   instances static map.
     * @param event The key event to filter.
     */
    filter: function( renderId, event )
    {
      var tf = echopoint.internal.TextFieldSync.instances.map[renderId];
      if ( ! tf ) return false;
      return tf.doFilter( event );
    }
  },

  $virtual:
  {
    /** A flag used to indicate whether {@link #doFilter} rejected or not. */
    status: true,

    /** The filter function implementation. Allow everything by default */
    doFilter: function( event )
    {
      return true;
    },

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
      if ( this.status ) this._textFieldProcessKeyPress( event );
    },

    /** The event handler for a key up event on the text component. */
    processKeyUp: function( event )
    {
      if ( this.status ) this._textFieldProcessKeyUp( event );
    },

    /** Return the caret position in the text field component. */
    getCaretPosition: function()
    {
      var position = ( this.input.value ) ? this.input.value.length : 0;

      if ( document.selection )
      {
        // IE
        this.input.focus();
        var selection = document.selection.createRange();
        var length = document.selection.createRange().text.length;
        selection.moveStart( 'character', -this.input.value.length );
        position = selection.text.length - length;
      }
      else if ( this.input.selectionStart ||
                this.input.selectionStart == '0' )
      {
        // FireFox
        position = this.input.selectionStart;
      }

      return position;
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
  },

  renderAdd: function( update, parentElement )
  {
    echopoint.internal.TextFieldSync.instances.map[ this.component.renderId ] = this;
    Echo.Sync.TextField.prototype.renderAdd.call(
        this, update, parentElement );
    this.input.setAttribute( "onKeyPress",
        "return echopoint.internal.TextFieldSync.filter('" +
        this.component.renderId +  "',event)" );
  },

  renderDispose: function( update )
  {
    echopoint.internal.TextFieldSync.instances.remove( this.component.renderId );
    Echo.Sync.TextField.prototype.renderDispose.call(
        this, update );
  }
});
