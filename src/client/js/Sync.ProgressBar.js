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

  $static:
  {
    DEFAULT_HEIGHT: "15px"
  },

  /** The parent container in which the child bar is rendered. */
  _div: null,

  /** The progress bar element. */
  _bar: null,

  /** The optional text to display in the progress bar.*/
  _text: null,

  renderAdd: function( update, parentElement )
  {
    this._createParent( parentElement );
    this._div.appendChild( this._createBar() );

    var text = this.component.render( echopoint.ProgressBar.TEXT );
    if ( text ) this._createText( text );

    this._renderStyle( update );
    this._renderBar( update );
  },

  renderDispose: function( update )
  {
    this._text = null;
    this._bar = null;
    this._div = null;
  },

  renderUpdate: function( update )
  {
    this.renderStyle( this._div, update );
    this._renderStyle( update );
    this._renderBar( update );

    return false;
  },

  /** The default height to use for the progress bar element. */
  getDefaultHeight: function()
  {
    return echopoint.ProgressBarSync.DEFAULT_HEIGHT;
  },

  /** Create the parent div element that holds the child progress element. */
  _createParent: function( parentElement )
  {
    this._div = document.createElement( "div" );
    this._div.id = this.component.renderId;
    this.renderStyle( this._div );

    parentElement.appendChild( this._div );
    return this._div;
  },

  /** Create the variable width element that represents the progress bar. */
  _createBar: function()
  {
    this._bar = document.createElement( "div" );
    this._bar.id = this.component.renderId + "|bar";
    this._bar.style.height = "100%";

    this._renderStyle();
    return this._bar;
  },

  /** Create the optional text element to display in the progress bar. */
  _createText: function( text )
  {
    this._text = document.createElement( "div" );
    this._text.id = this.component.renderId + "|text";
    this._text.style.textAlign = "center";
    this._text.style.color = "black";

    this._text.appendChild( document.createTextNode( text ) );
    this._div.appendChild( this._text );
  },

  /** Render the foreground colour for the bar element. */
  _renderStyle: function( update )
  {
    var value = null;
    var property = echopoint.ProgressBar.BAR_BACKGROUND;

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
  },

  /** Render updates to the text and percentage in the bar. */
  _renderBar: function( update )
  {
    if ( update )
    {
      this._setText( update.getUpdatedProperty( echopoint.ProgressBar.TEXT ) );
      this._setPercentage(
          update.getUpdatedProperty( echopoint.ProgressBar.PERCENTAGE ) );
    }
    else
    {
      this._setPercentage(
          this.component.get( echopoint.ProgressBar.PERCENTAGE ) );
      this._setText( this.component.get( echopoint.ProgressBar.TEXT ) );
    }
  },

  _setText: function( value )
  {
    if ( ! value && ! this._text ) return;
    if ( ! value ) value = "";

    if ( this._text ) this._div.removeChild( this._text );
    this._createText( value );
  },

  _setPercentage: function( value )
  {
    this._bar.style.width = ( ! value ) ? "0px" : parseInt( value ) + "%";
  }
});
