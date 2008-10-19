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
 * A model object that represents a rectangular clickable section on an {@link
 * echopoint.ImageMap}.
 *
 * <p><b>Note:</b> Development of this component was sponsoreed by
 * <a href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Braadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * @author Rakesh 2008-10-19
 * @version $Id$
 */
public class RectangleSection extends MapSection
{
  private static final long serialVersionUID = 1l;

  /** The x-coordinate of the origin (bottom-left) of the rectangle. */
  private int bottomx;

  /** The y-coordinate of the origin (bottom-left) of the rectangle. */
  private int bottomy;

  /** The x-coordinate of the end (top-right) of the rectangle. */
  private int topx;

  /** The y-coordinate of the end (top-right) of the rectangle. */
  private int topy;

  /** Default constructor. */
  public RectangleSection() {}

  /**
   * Create a new instance using the specified values.
   *
   * @param bottomx The x-coordinate of the origin of the rectangle.
   * @param bottomy The y-coordinate of the origin of the rectangle.
   * @param topx The x-coordinate of the end of the rectangle.
   * @param topy The y-coordinate of the end of the rectangle.
   * @param values Optionally the {@link #actionCommand} and {@link
   *   #altText} values.  Note that unless {@link #actionCommand} is
   *   specified the section will not be saved in the image map.
   */
  public RectangleSection( final int bottomx, final int bottomy,
      final int topx, final int topy, final String... values )
  {
    setBottomx( bottomx );
    setBottomy( bottomy );
    setTopx( topx );
    setTopy( topy );

    if ( values.length > 0 ) setActionCommand( values[0] );
    if ( values.length > 1 ) setAltText( values[1] );
  }

  /**
   * Accessor for property 'bottomx'.
   *
   * @return Value for property 'bottomx'.
   */
  public int getBottomx()
  {
    return bottomx;
  }

  /**
   * Mutator for property 'bottomx'.
   *
   * @param bottomx Value to set for property 'bottomx'.
   */
  public void setBottomx( final int bottomx )
  {
    this.bottomx = bottomx;
  }

  /**
   * Accessor for property 'bottomy'.
   *
   * @return Value for property 'bottomy'.
   */
  public int getBottomy()
  {
    return bottomy;
  }

  /**
   * Mutator for property 'bottomy'.
   *
   * @param bottomy Value to set for property 'bottomy'.
   */
  public void setBottomy( final int bottomy )
  {
    this.bottomy = bottomy;
  }

  /**
   * Accessor for property 'topx'.
   *
   * @return Value for property 'topx'.
   */
  public int getTopx()
  {
    return topx;
  }

  /**
   * Mutator for property 'topx'.
   *
   * @param topx Value to set for property 'topx'.
   */
  public void setTopx( final int topx )
  {
    this.topx = topx;
  }

  /**
   * Accessor for property 'topy'.
   *
   * @return Value for property 'topy'.
   */
  public int getTopy()
  {
    return topy;
  }

  /**
   * Mutator for property 'topy'.
   *
   * @param topy Value to set for property 'topy'.
   */
  public void setTopy( final int topy )
  {
    this.topy = topy;
  }
}
