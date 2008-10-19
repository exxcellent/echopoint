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

/**
 * A model object that represents a circular clickable section in a {@link
 * echopoint.ImageMap}.
 *
 * <p><b>Note:</b> Development of this component was sponsoreed by
 * <a href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Braadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * @author Rakesh 2008-10-19
 * @version $Id$
 */
public class CircleSection extends MapSection
{
  private static final long serialVersionUID = 1l;

  /** The x-coordinate of the centroid of the circular section. */
  private int x;

  /** The y-coordinate of the centroid of the circular section. */
  private int y;

  /** The radius of the circular section. */
  private int radius;

  /** Default constructor. */
  public CircleSection() {}

  /**
   * Create a new instance using the specified values.
   *
   * @param x The x-coordinate of the centroid of the circular section.
   * @param y The y-coordinate of the centroid of the circular section.
   * @param radius The radius of the circular section.
   * @param values Optionally the {@link #actionCommand} and {@link
   *   #altText} values.  Note that unless {@link #actionCommand} is
   *   specified the section will not be saved in the image map.
   */
  public CircleSection( final int x, final int y, final int radius,
      final String... values )
  {
    setX( x );
    setY( y );
    setRadius( radius );

    if ( values.length > 0 ) setActionCommand( values[0] );
    if ( values.length > 1 ) setAltText( values[1] );
  }

  /**
   * Compare the specified object with this instance for equality.
   *
   * @param o The object that is to be compared.
   * @return Return <code>true</code> if the specified object is equivalent.
   */
  @Override
  public boolean equals( final Object o )
  {
    if ( this == o ) return true;
    if ( o == null || getClass() != o.getClass() ) return false;

    CircleSection that = (CircleSection) o;
    return super.equals( o ) && radius == that.radius && x == that.x && y == that.y;
  }

  /**
   * Compute a hash code for this instance.
   *
   * @return The hash code value for this instance.
   */
  @Override
  public int hashCode()
  {
    int result;
    result = super.hashCode();
    result = 31 * result + x;
    result = 31 * result + y;
    result = 31 * result + radius;
    return result;
  }

  /**
   * Accessor for property 'x'.
   *
   * @return Value for property 'x'.
   */
  public int getX()
  {
    return x;
  }

  /**
   * Mutator for property 'x'.
   *
   * @param x Value to set for property 'x'.
   */
  public void setX( final int x )
  {
    this.x = x;
  }

  /**
   * Accessor for property 'y'.
   *
   * @return Value for property 'y'.
   */
  public int getY()
  {
    return y;
  }

  /**
   * Mutator for property 'y'.
   *
   * @param y Value to set for property 'y'.
   */
  public void setY( final int y )
  {
    this.y = y;
  }

  /**
   * Accessor for property 'radius'.
   *
   * @return Value for property 'radius'.
   */
  public int getRadius()
  {
    return radius;
  }

  /**
   * Mutator for property 'radius'.
   *
   * @param radius Value to set for property 'radius'.
   */
  public void setRadius( final int radius )
  {
    this.radius = radius;
  }
}
