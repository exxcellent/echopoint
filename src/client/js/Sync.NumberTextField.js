/**
 * Component rendering peer: NumberTextField
 *
 * @author Rakesh 2009-03-07
 * @version: $Id$
 */
echopoint.NumberTextFieldSync = Core.extend( echopoint.internal.TextComponentSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.NUMBER_TEXT_FIELD, this );
  },

  $static:
  {
    /** A map of rendering peer instances used to dereference by renderId. */
    instances: new Core.Arrays.LargeMap(),

    filter: function( renderId, event )
    {
      event = (event) ? event : window.event;
      var charCode = (event.which) ? event.which : event.keyCode;
      var tf = echopoint.NumberTextFieldSync.instances.map[renderId];

      if ( charCode == 13 )
      {
        tf.status = true;
        return tf.status;
      }

      tf.status = !( charCode > 31 && ( charCode < 48 || charCode > 57 ) );
      if ( tf.input.value.indexOf( "." ) == -1 )
      {
        tf.status = tf.status || ( charCode == 46 );
      }

      return tf.status;
    }
  },

  status: true,

  /** The event handler for a key press event. */
  processKeyPress: function( event )
  {
    if ( this.status )
    {
      echopoint.internal.TextComponentSync.prototype.processKeyPress.call(
          this, event );
    }
  },

  /** The event handler for a key up event on the text component. */
  processKeyUp: function( event )
  {
    if ( this.status )
    {
      echopoint.internal.TextComponentSync.prototype.processKeyUp.call(
          this, event );
    }
  },

  $construct: function()
  {
    echopoint.internal.TextComponentSync.call( this );
  },

  renderAdd: function( update, parentElement )
  {
    echopoint.NumberTextFieldSync.instances.map[ this.component.renderId ] = this;
    echopoint.internal.TextComponentSync.prototype.renderAdd.call(
        this, update, parentElement );
    this.input.setAttribute( "onKeyPress",
        "return echopoint.NumberTextFieldSync.filter('" +
        this.component.renderId +  "',event)" );
  },

  renderDispose: function( update )
  {
    echopoint.NumberTextFieldSync.instances.remove( this.component.renderId );
    echopoint.internal.TextComponentSync.prototype.renderDispose.call(
        this, update );
  }
});



