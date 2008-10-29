/**
 * Component rendering peer: ImageMap
 *
 * @author Rakesh 2008-10-16
 * @version $Id$
 */
echopoint.ImageMapSync = Core.extend( echopoint.internal.AbstractContainerSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.IMAGE_MAP, this );
  },

  /** Constants used to indicate the shape names, and other static elements */
  $static:
  {
    CIRCLE: "circle",
    POLYGON: "poly",
    RECTANGLE: "rect",

    /**
     *  Action handler used to statically reference as a URL.
     *
     * @param renderId The unique identifier to use to dereference the
     *   instance from which the action was triggered.
     * @param actionCommand The command associated with the click.
     */
    handleClick: function( renderId, actionCommand )
    {
      Core.Debug.consoleWrite( 'actionCommand: ' + actionCommand );
      echopoint.ImageMapSync.instances.map[renderId].doHandleClick( actionCommand );
    },

    /** A map of rendering peer instances used to dereference by renderId. */
    instances: new Core.Arrays.LargeMap()
  },

  /** The image that is to be treated as a clickable map. */
  _image: null,

  /** The map built on top of the image. */
  _map: null,

  /** The map of clickable sections for the map.  Cached to process JSON */
  _sections: null,

  renderAdd: function( update, parentElement )
  {
    echopoint.ImageMapSync.instances.map[ this.component.renderId ] = this;
    parentElement.appendChild( this._createImage() );
    parentElement.appendChild( this._createMap() );
    this._createAreas();
  },

  renderDispose: function( update )
  {
    this._image = null;
    this._map = null;
    echopoint.ImageMapSync.instances.remove( this.component.renderId );
  },

  renderUpdate: function( update )
  {
    this.renderStyle( this._image, update );
    this._createAreas();
    return false; // Child elements not supported: safe to return false.
  },

  /**
   * Event handler that sets the action command for the component and fires
   * an action event.
   *
   * @param actionCommand The command to associate with the event.
   */
  doHandleClick: function( actionCommand )
  {
    this.component.set( echopoint.ImageMap.ACTION_COMMAND, actionCommand );
    this.component.doAction();
  },

  /** Function used to create the image element. */
  _createImage: function()
  {
    this._image = document.createElement( "img" );
    this._image.id = this.component.renderId;
    this._image.src = this.component.render( echopoint.ImageMap.URL );
    this._image.useMap = "#" + this._getName();

    this.renderStyle( this._image );
    return this._image;
  },

  /** Function used to create the map element. */
  _createMap: function()
  {
    this._map = document.createElement( "map" );
    this._map.id = this._getName(); // For IE
    this._map.name = this._getName();
    return this._map;
  },

  /** Function used to (re)populate the map areas. */
  _createAreas: function()
  {
    if ( this._map.hasChildNodes() )
    {
      while( this._map.childNodes.length >= 1 )
      {
        this._map.removeChild( this._map.firstChild );
      }
    }

    var sections = this._getSections();
    for ( var i in sections )
    {
      if ( sections[i] instanceof echopoint.model.MapSection )
      {
        var area = document.createElement( "area" );
        area.shape = this._getShape( sections[i] );
        area.coords = sections[i].toString();
        if ( sections[i].actionCommand != null )
        {
          area.href = "javascript:echopoint.ImageMapSync.handleClick('" +
                      this.component.renderId + "', '" +
                      sections[i].actionCommand + "');";
        }
        else
        {
          area.noHref = "nohref";
        }

        var text = sections[i].altText;
        if ( text ) area.title = text;

        this._map.appendChild( area );
      }
    }
  },

  /** Return the name of the map to use.  Name is based on the renderId. */
  _getName: function()
  {
    return ( this.component.renderId + "|Map" );
  },

  /** Return the name of the shape of the section specified. */
  _getShape: function( section )
  {
    var shape = null;

    if ( section instanceof echopoint.model.CircleSection )
    {
      shape = echopoint.ImageMapSync.CIRCLE;
    }
    else if ( section instanceof echopoint.model.PolygonSection )
    {
      shape = echopoint.ImageMapSync.POLYGON;
    }
    else if ( section instanceof echopoint.model.RectangleSection )
    {
      shape = echopoint.ImageMapSync.RECTANGLE;
    }

    return shape;
  },

  /** Return the map of clickable sections used to build the map element. */
  _getSections: function()
  {
    if ( this._sections ) return this._sections;
    var value = this.component.get( echopoint.ImageMap.SECTIONS );

    if ( value instanceof Core.Arrays.LargeMap )
    {
      this._sections = value;
    }
    else
    {
      this._sections = this._parseJson( value );
    }

    return this._sections;
  },

  /** Parse the JSON structure into a LargeMap */
  _parseJson: function( json )
  {
    var sections = new Core.Arrays.LargeMap();
    var data = eval( "(" + json + ")" );

    for ( var i = 0; i < data.list.length; ++i )
    {
      var map = data.list[i];
      var actionCommand = map[0];
      var mapSection = map[1];
      var section = null;

      if ( mapSection.centre )
      {
        section = new echopoint.model.CircleSection( mapSection.centre,
            mapSection.radius, actionCommand, mapSection.altText );
      }
      else if ( mapSection.bottom )
      {
        section = new echopoint.model.RectangleSection( mapSection.bottom,
            mapSection.top, actionCommand, mapSection.altText );
      }
      else if ( mapSection.vertices )
      {
        section = new echopoint.model.PolygonSection( mapSection.vertices,
            actionCommand, mapSection.altText );
      }

      sections[actionCommand] = section;
    }

    return sections;
  }
});
