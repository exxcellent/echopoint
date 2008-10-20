/*
 * This file is part of the Echo Point Project.  This project is a
 * collection of Components that have extended the Echo Web Application
 * Framework Version 3.
 *
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 */
package echopoint.model;

import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * A model object that represents a clickable polygon section in an {@link
 * echopoint.ImageMap}.
 *
 * <p><b>Note:</b> Development of this component was sponsored by
 * <a href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Broadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * @author Rakesh 2008-10-19
 * @version $Id$
 */
@XStreamAlias( "polygonSection" )
public class PolygonSection extends MapSection
{
  private static final long serialVersionUID = 1l;

  /**
   * The array of co-ordinate values that represent the polygon vertices.
   * Note that each vertex is represented by a pair of integer values (their
   * x and y-coordinates).
   */
  private int[] vertices;

  /** Default constructor. */
  public PolygonSection() {}

  /**
   * Create a new instance using the specified values.
   *
   * @param vertices The array of vertices that represent the polygon.  Note
   *   that each vertex is represented by a pair of integer values.
   * @param values Optionally the {@link #actionCommand} and {@link
   *   #altText} values.  Note that unless {@link #actionCommand} is
   *   specified the section will not be saved in the image map.
   */
  public PolygonSection( final int[] vertices, final String... values )
  {
    setVertices( vertices );

    if ( values.length > 0 ) setActionCommand( values[0] );
    if ( values.length > 1 ) setAltText( values[1] );
  }

  /**
   * Accessor for property 'vertices'.
   *
   * @return Value for property 'vertices'.
   */
  public int[] getVertices()
  {
    return vertices;
  }

  /**
   * Mutator for property 'vertices'.
   *
   * @param vertices Value to set for property 'vertices'.
   */
  public void setVertices( final int[] vertices )
  {
    this.vertices = vertices;
  }
}
