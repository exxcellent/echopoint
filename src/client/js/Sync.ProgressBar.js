/**
 * Component rendering peer: ProgressBar
 *
 * @author Rakesh 2008-10-29
 * @version $Id$
 */
echopoint.ProgressBarSync = Core.extend( echopoint.internal.AbstractContainerSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.PROGRESS_BAR, this );
  },

  /** The parent container in which the child bar is rendered. */
  _div: null,

  /** The progress bar element. */
  _bar: null,

  renderAdd: function( update, parentElement )
  {
    parentElement.appendChild( this._createParent() );
    parentElement.appendChild( this._createBar() );
    this._renderStyle( update );
  },

  renderDispose: function( update )
  {
    this._bar = null;
    this._div = null;
  },

  renderUpdate: function( update )
  {
    this.renderStyle( this._div, update );
    this._renderStyle( update );
    return false;
  },

  /** Create the parent div element that holds the child progress element. */
  _createParent: function()
  {
    this._div = document.createElement( "div" );
    this._div.id = this.component.renderId;
    this.renderStyle( this._div );
    return this._div;
  },

  /** Create the variable width element that represents the progress bar. */
  _createBar: function()
  {
    this._bar = document.createElement( "div" );
    this._bar.style.height = "100%";
    this._bar.style.width = "0%";
    this._renderStyle();
    return this._bar;
  },

  /** Render the foreground colour for the bar element. */
  _renderStyle: function( update )
  {
    var value = null;
    var property = this.component.render( echopoint.internal.AbstractContainer.FOREGROUND );

    if ( update )
    {
      var prop = update.getUpdatedProperty( property );
      if ( prop ) value = prop.newValue;
    }
    else
    {
      value = this.component.render( property );
    }

    if ( value )
    {
      this._bar.style.backgroundColor = value;
    }
  }
});
