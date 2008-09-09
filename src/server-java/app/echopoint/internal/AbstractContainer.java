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
package echopoint.internal;

import nextapp.echo.app.Component;
import nextapp.echo.app.Alignment;
import nextapp.echo.app.ImageReference;
import nextapp.echo.app.Border;
import nextapp.echo.app.Insets;
import nextapp.echo.app.Extent;

/**
 * An abstract super class for container components.  Defines the standard
 * style properties supported by container components.
 *
 * <p>The following style properites are supported by this component in
 * addition to those supported by {@link nextapp.echo.app.Component}:</p>
 * <ul>
 *   <li><code>alignment</code> - The alignment style to apply to the
 *   container element.</li>
 *   <li><code>backgroundImage</code> - A image to set as the background for
 *   the container element.</li>
 *   <li><code>border</code> - The border style to apply to the
 *   container element.</li>
 *   <li><code>insets</code> - The insets to apply for the content embedded
 *   in the container element.</li>
 *   <li><code>height</code> - The height of the container element.
 *   Scrollbars are displayed is needed.</li>
 *   <li><code>width</code> - The width of the container element.
 *   Scrollbars are displayed is needed.</li>
 * </ul>
 *
 * @author Rakesh 2008-07-14
 * @version $Id$
 */
public class AbstractContainer extends Component
{
  private static final long serialVersionUID = 1l;

  /** The alignment style for this component. */
  public static final String PROPERTY_ALIGNMENT = "alignment";

  /** The background image for this component. */
  public static final String PROPERTY_BACKGROUND_IMAGE = "backgroundImage";

  /** The border style for this component. */
  public static final String PROPERTY_BORDER = "border";

  /** The insets style for this component. */
  public static final String PROPERTY_INSETS = "insets";

  /** The height style for this component. */
  public static final String PROPERTY_HEIGHT = "height";

  /** The width style for this component. */
  public static final String PROPERTY_WIDTH = "width";

  /**
   * Return the alignment property for this component.
   *
   * @return The alignment specified for this component.
   */
  public Alignment getAlignment()
  {
    return (Alignment) get( PROPERTY_ALIGNMENT );
  }

  /**
   * Set the alignment style for this component.
   *
   * @param alignment The alignment style to apply.
   */
  public void setAlignment( final Alignment alignment )
  {
    set( PROPERTY_ALIGNMENT, alignment );
  }

  /**
   * Return the backgroundImage property for this component.
   *
   * @return The backgroundImage specified for this component.
   */
  public ImageReference getBackgroundImage()
  {
    return (ImageReference) get( PROPERTY_BACKGROUND_IMAGE );
  }

  /**
   * Set the backgroundImage style for this component.
   *
   * @param backgroundImage The backgroundImage style to apply.
   */
  public void setBackgroundImage( final ImageReference backgroundImage )
  {
    set( PROPERTY_BACKGROUND_IMAGE, backgroundImage );
  }

  /**
   * Return the border property for this component.
   *
   * @return The border specified for this component.
   */
  public Border getBorder()
  {
    return (Border) get( PROPERTY_BORDER );
  }

  /**
   * Set the border style for this component.
   *
   * @param border The border style to apply.
   */
  public void setBorder( final Border border )
  {
    set( PROPERTY_BORDER, border );
  }

  /**
   * Return the insets property for this component.
   *
   * @return The insets specified for this component.
   */
  public Insets getInsets()
  {
    return (Insets) get( PROPERTY_INSETS );
  }

  /**
   * Set the insets style for this component.
   *
   * @param insets The insets style to apply.
   */
  public void setInsets( final Insets insets )
  {
    set( PROPERTY_INSETS, insets );
  }

  /**
   * Return the height property for this component.
   *
   * @return The height specified for this component.
   */
  public Extent getHeight()
  {
    return (Extent) get( PROPERTY_HEIGHT );
  }

  /**
   * Set the height style for this component.
   *
   * @param height The height style to apply.
   */
  public void setHeight( final Extent height )
  {
    set( PROPERTY_HEIGHT, height );
  }

  /**
   * Return the width property for this component.
   *
   * @return The width specified for this component.
   */
  public Extent getWidth()
  {
    return (Extent) get( PROPERTY_WIDTH );
  }

  /**
   * Set the width style for this component.
   *
   * @param width The width style to apply.
   */
  public void setWidth( final Extent width )
  {
    set( PROPERTY_WIDTH, width );
  }
}
