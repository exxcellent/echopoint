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

  /** The variable width progress element. */
  _progress: null,

  /** The optional text to display in the progress bar.*/
  _text: null,

  renderAdd: function( update, parentElement )
  {
    parentElement.appendChild( this._createParent() );
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
    this._bar.id = this.component.renderId + "|bar";
    this._bar.style.position = "absolute";
    this._bar.style.top = this._div.style.top;
    this._bar.style.left = this._div.style.left;
    this._bar.style.zindex = 2;
    this._bar.style.height = this._div.style.height;
    this._bar.style.width = this._div.style.width;

    this._createProgress();
    return this._bar;
  },

  _createProgress: function()
  {
    this._progress = document.createElement( "div" );
    this._progress.id = this.component.renderId + "|bar|progress";
    this._progress.style.heigth = "100%";
    this._renderStyle();
    this._bar.appendChild( this._progress );

    return this._progress;
  },

  /** Create the optional text element to display in the progress bar. */
  _createText: function( text )
  {
    if ( text )
    {
      this._text = document.createElement( "div" );
      this._text.id = this.component.renderId + "|text";

      this._text.style.position = "absolute";
      this._text.style.top = this._div.style.top;
      this._text.style.left = this._div.style.left;
      this._text.style.width = this._div.style.width;
      this._text.style.height = this._div.style.height;
      this._text.style.textAlign = "center";
      this._text.style.zindex = 1;

      this._text.appendChild( document.createTextNode( text ) );
      this._div.appendChild( this._text );
    }
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
      this._progress.style.backgroundColor = value;
    }

    this._progress.style.zindex = 3;
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
    if ( ! value ) value = "";

    if ( this._text )
    {
      this._div.removeChild( this._text );
    }

    this._createText( value );
  },

  _setPercentage: function( value )
  {
    this._progress.style.width = ( ! value ) ? "1px" : parseInt( value ) + "%";
  }
});
