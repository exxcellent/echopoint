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
package echopoint;

import echopoint.internal.AbstractContainer;
import echopoint.model.MapSection;
import nextapp.echo.app.ImageReference;
import nextapp.echo.app.HttpImageReference;

import java.util.Map;
import java.util.LinkedHashMap;
import java.util.Collections;

/**
 * The <code>ImageMap</code> class provides a {@link nextapp.echo.app.Component}
 * that allows a user to click on region(s) within a provided region.
 *
 * <p>A series of {@link echopoint.model.MapSection} instances are provided
 * that indicate what areas on the region should produce an
 * {@link nextapp.echo.app.event.ActionEvent}.</p>
 *
 * <p>The {@link echopoint.model.MapSection} instances are stored in a map
 * keyed by by their {@link echopoint.model.MapSection#actionCommand} string.
 * This means that there can be at  most one set of coordinates for a given
 * {@link echopoint.model.MapSection#actionCommand}.</p>
 *
 * <p><b>Note:</b> Development of this component was sponsoreed by
 * <a href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Braadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * @author Rakesh 2008-10-19, Brad Baker (originally for EPNG)
 * @version $Id$
 */
public class ImageMap extends AbstractContainer
{
  private static final long serialVersionUID = 1l;

  /** The image that is to be used as the map region. */
  public static final String PROPERTY_IMAGE = "image";

  /**
   * The JSON representation of the map of {@link echopoint.model.MapSection}
   * instances that represents the clickable sections in the map.  Note that
   * this property is to be treated as read-only.
   */
  public static final String PROPERTY_SECTIONS = "sections";

  /**
   * The map of {@link echopoint.model.MapSection} instances keyed by the
   * {@link echopoint.model.MapSection#actionCommand} for the section.
   */
  private Map<String,MapSection> data = new LinkedHashMap<String,MapSection>();

  /** Default constructor. */
  public ImageMap() {}

  /**
   * Create a new image map using the specified image to use as the region.
   *
   * @param image The image to use as the map region.
   */
  public ImageMap( final ImageReference image )
  {
    setImage( image );
  }

  /**
   * Create a new image map using the image from the specified URL.
   *
   * @param url The url to use as the source of the image to use in the map.
   */
  public ImageMap( final String url )
  {
    setImage( new HttpImageReference( url ) );
  }

  /**
   * Return the value of the {@link #PROPERTY_IMAGE} property.
   *
   * @return The image that is being used as the map region.
   */
  public ImageReference getImage()
  {
    return (ImageReference) get( PROPERTY_IMAGE );
  }

  /**
   * Set the value of the {@link #PROPERTY_IMAGE} property.
   *
   * @param image The image to use as the map region.
   */
  public void setImage( final ImageReference image )
  {
    set( PROPERTY_IMAGE, image );
  }

  /**
   * Return the value of the {@link #PROPERTY_SECTIONS} property.  Note that
   * this method returns a JSON representation of
   *
   * @return The image that is being used as the map region.
   */
  public String getSections()
  {
    return (String) get( PROPERTY_SECTIONS );
  }

  /**
   * Set the value of the {@link #PROPERTY_SECTIONS} property.  Note that
   * this method is to be treated as internal use only, since the string
   * value specified must be in JSON format.
   *
   * @param sections The image to use as the map region.
   */
  public void setSections( final String sections )
  {
    set( PROPERTY_SECTIONS, sections );
  }

  /**
   * Add the specified clickable section to the image map.
   *
   * @param section The section that is to be added.
   */
  public void addSection( final MapSection section )
  {
  }

  /**
   * Accessor for property 'data'.
   *
   * @return Value for property 'data'.
   */
  public Map<String, MapSection> getData()
  {
    return Collections.unmodifiableMap( data );
  }
}
