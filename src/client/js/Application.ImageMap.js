/** The name of the ImageMap component. */
echopoint.constants.IMAGE_MAP = "echopoint.ImageMap";

/**
 * A component used to represent an HTML image map.  Specify the coordinates
 * for the image map using the value object and associate actions for each
 * section that is configured for the image.
 *
 * <p>Development of this component was sponsored by TCN Broadcasting.</p>
 *
 * @author Rakesh 2008-10-16
 * @version $Id$
 */
echopoint.ImageMap = Core.extend( echopoint.internal.AbstractContainer,
{
  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.IMAGE_MAP, this );
  },

  /** Properties defined for this component. */
  $static:
  {
    ACTION_TYPE: "action",
    ACTION_COMMAND: "actionCommand",
    // The property that holds the URI for the image.
    URL: "url",
    // The property that holds the map of sections keyed by their action
    // command values.  Do not specify directly, instead use the methods
    // to add/remove sections.
    SECTIONS: "sections"
  },

  $virtual:
  {
    /** Programmatically performs a map section click action. */
    doAction: function()
    {
      var ac = this.get( echopoint.ImageMap.ACTION_COMMAND );
      this.fireEvent( { type: echopoint.ImageMap.ACTION_TYPE, source: this,
        actionCommand: ac } );
    },

    /**
     * Add a new section to the map of sections keyed by the action command
     * in the section specified.
     *
     * @param section The MapSection to add to the image map.
     */
    addSection: function( section )
    {
      if ( ! section instanceof echopoint.model.MapSection )
      {
        throw "Section must be a sub-class of MapSection";
      }

      var sections = this.get( echopoint.ImageMap.SECTIONS );
      if ( sections == null )
      {
        sections = new Core.Arrays.LargeMap();
        this.set( echopoint.ImageMap.SECTIONS, sections );
      }

      sections[section.actionCommand] = section;
    },

    /**
     * Remove the specfified section from the image map.
     *
     * @param section The section that is to be removed from the map.
     */
    removeSection: function( section )
    {
      var sections = this.get( echopoint.ImageMap.SECTIONS );
      if ( sections == null )
      {
        sections = new Core.Arrays.LargeMap();
        this.set( echopoint.ImageMap.SECTIONS, sections );
      }

      sections.remove( section.actionCommand );
    },

    /** Remove all the sections from the image map. */
    removeAllSections: function()
    {
      this.set( echopoint.ImageMap.SECTIONS, new Core.Arrays.LargeMap() );
    }
  },

  componentType: echopoint.constants.IMAGE_MAP
});

/**
 * The model object used to represent a co-ordinate set within the map that
 * represents a discrete area in the map that is clickable.  Concrete
 * sub-classes are used to represent circles, rectangles and polygons that
 * are typically used in image maps.
 */
echopoint.model.MapSection = Core.extend(
{
  $abstract: true,

  $virtual:
  {
    /** The action command associated with the section. */
    actionCommand: null,

    /** The alternate text to display for text mode browsers. */
    altText: null
  }
});

/** The model object used to represent a circular region on a map. */
echopoint.model.CircleSection = Core.extend( echopoint.model.MapSection,
{
  /** The x-coordinate of the centroid of the circle. */
  x: 0,

  /** The y-coordinate of the centroid of the circle. */
  y: 0,

  /** The radius of the circle. */
  radius: 0,

  /**
   * Create a new instance using the specified values.
   *
   * @param xcoord The x-coordinate of the centroid of the circle.
   * @param ycoord The y-coordinate of the centroid of the circle.
   * @param rad The radius of the circle.
   * @param command Action command to associate with this section.
   * @param text Optional alternate text for the section.
   */
  $construct: function( xcoord, ycoord, rad, command, text )
  {
    this.x = xcoord;
    this.y = ycoord;
    this.radius = rad;
    this.actionCommand = command;
    this.altText = text;
  },

  /**
   * Return a string representation of the coordinates and radius, suitable
   * for representing in a HTML area tag.
   */
  toString: function()
  {
    return ( "" + this.x + "," + this.y + "," + this.radius );
  }
});

/** The model object used to represent a rectangular region on a map. */
echopoint.model.RectangleSection = Core.extend( echopoint.model.MapSection,
{
  /** The x-coordinate of the origin (bottom-left) of the rectangle. */
  bottomx: 0,

  /** The y-coordinate of the origin (bottom-left) of the rectangle. */
  bottomy: 0,

  /** The x-coordinate of the end (top-right) of the rectangle. */
  topx: 0,

  /** The y-coordinate of the end (top-right) of the rectangle. */
  topy: 0,

  /**
   * Create a new instance using the specified values.
   *
   * @param l The x-coordinate of the bottom of the rectangle.
   * @param t The y-coordinate of the bottom of the rectangle.
   * @param r The x-coordinate of the end of the rectangle.
   * @param b The y-coordinate of the end of the rectangle.
   * @param command Action command to associate with this section.
   * @param text Optional alternate text for the section.
   */
  $construct: function( l, t, r, b, command, text )
  {
    this.bottomx = l;
    this.bottomy = t;
    this.topx = r;
    this.topy = b;
    this.actionCommand = command;
    this.altText = text;
  },

  /**
   * Return a string representation of the coordinates and radius, suitable
   * for representing in a HTML area tag.
   */
  toString: function()
  {
    return ( "" + this.bottomx + "," + this.bottomy + "," +
           this.topx + "," + this.topy );
  }
});

/** The model object used to represent a polygon region on a map. */
echopoint.model.PolygonSection = Core.extend( echopoint.model.MapSection,
{
  /** The array of coordinates that represent the polygon. */
  vertices: null,

  /**
   * Create a new instance using the specified values.
   *
   * @param coords The array of vertices of the polygon.
   * @param command Action command to associate with this section.
   * @param text Optional alternate text for the section.
   */
  $construct: function( coords, command, text )
  {
    this.vertices = coords;
    this.actionCommand = command;
    this.altText = text;
  },

  /**
   * Return a string representation of the coordinates and radius, suitable
   * for representing in a HTML area tag.
   */
  toString: function()
  {
    var text = "";
    var first = true;

    for ( var i = 0; i < this.vertices.length; ++i )
    {
      if ( first ) first = false;
      else text += ",";

      text += this.vertices[i];
    }

    return text;
  }
});
