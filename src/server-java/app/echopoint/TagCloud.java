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

import echopoint.model.Tag;
import nextapp.echo.app.Color;
import nextapp.echo.app.Component;

import java.util.Collection;
import java.util.ArrayList;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.json.JsonHierarchicalStreamDriver;

/**
 * A tag cloud component based on client-side code contribued by Tod.
 *
 * <p>The following shows sample usage of this component:</p>
 * <pre>
 *   import echopoint.TagCloud;
 *   import echopoint.model.Tag;
 *   import nextapp.echo.app.Row;
 *
 *     ...
 *     final Collection<Tag> tags = new ArrayList<Tag>();
 *     tags.add( new Tag( "Java", 50 ) );
 *     tags.add( new Tag( "Objective-C", 25 ) );
 *     tags.add( new Tag( "Groovy", 10 ) );
 *     tags.add( new Tag( "JavaScript", 15 ) );
 *
 *     final Row row = new Row();
 *     final TagCloud tc = new TagCloud();
 *     tc.setRolloverEnabled( true );
 *     tc.setRolloverBackground( new Color( 0xa1a1a1 ) );
 *     tc.setRolloverForeground( new Color( 0xc1c1c1 ) );
 *     tc.setTags( tags );
 *     row.add( tc );
 * </pre>
 *
 * @author Rakesh Vidyadharan 2008-07-20
 * @version $Id$
 */
public class TagCloud extends Component
{
  private static final long serialVersionUID = 1l;

  /** A flag indicating whether rollover is enabled for a tag. */
  public static final String PROPERTY_ROLLOVER_ENABLED = "rolloverEnabled";

  /** The rollover background for the tag element. */
  public static final String PROPERTY_ROLLOVER_BACKGROUND = "rolloverBackground";

  /** The rollover foreground for the tag element. */
  public static final String PROPERTY_ROLLOVER_FOREGROUND = "rolloverForeground";

  /**
   * The JSON representation of {@link echopoint.model.Tag} instances to be
   * represented in the component.
   */
  public static final String PROPERTY_TAGS_JSON = "tagsJson";

  private Collection<Tag> tags = new ArrayList<Tag>( 20 );

  /**
   * <b>TagCloud</b> is <i>NOT</i> allowed to have any children.
   *
   * @see nextapp.echo.app.Component#isValidChild(nextapp.echo.app.Component)
   */
  @Override
  public boolean isValidChild( final Component child )
  {
    return false;
  }

  /**
   * Return the value of the {@link #PROPERTY_ROLLOVER_ENABLED} propoerty.
   *
   * @return The flag indicating whether rollover behaviour is enabled or not.
   */
  public boolean getRolloverEnabled()
  {
    return (Boolean) getProperty( PROPERTY_ROLLOVER_ENABLED );
  }

  /**
   * Set the value of the {@link #PROPERTY_ROLLOVER_ENABLED} propoerty.
   *
   * @param enabled The flag indicating whether rollover behaviour is to be
   *   enabled or not.
   */
  public void setRolloverEnabled( final boolean enabled )
  {
    setProperty( PROPERTY_ROLLOVER_ENABLED, enabled );
  }

  /**
   * Return the value of the {@link #PROPERTY_ROLLOVER_BACKGROUND} propoerty.
   *
   * @return The colour used as the background while rolling over the tag.
   */
  public Color getRolloverBackground()
  {
    return (Color) getProperty( PROPERTY_ROLLOVER_BACKGROUND );
  }

  /**
   * Set the value of the {@link #PROPERTY_ROLLOVER_BACKGROUND} propoerty.
   *
   * @param background The colour used as the background while rolling over.
   */
  public void setRolloverBackground( final Color background )
  {
    setProperty( PROPERTY_ROLLOVER_BACKGROUND, background );
  }

  /**
   * Return the value of the {@link #PROPERTY_ROLLOVER_BACKGROUND} propoerty.
   *
   * @return The colour used as the foreground while rolling over the tag.
   */
  public Color getRolloverForeground()
  {
    return (Color) getProperty( PROPERTY_ROLLOVER_FOREGROUND );
  }

  /**
   * Set the value of the {@link #PROPERTY_ROLLOVER_BACKGROUND} propoerty.
   *
   * @param foreground The colour used as the foreground while rolling over.
   */
  public void setRolloverForeground( final Color foreground )
  {
    setProperty( PROPERTY_ROLLOVER_FOREGROUND, foreground );
  }

  /**
   * Return the value of the {@link #PROPERTY_TAGS_JSON} propoerty.
   *
   * @return The JSON data structure that represents {@link #tags}.
   */
  public String getTagsJson()
  {
    return (String) getProperty( PROPERTY_TAGS_JSON );
  }

  /**
   * Set the value of the {@link #PROPERTY_TAGS_JSON} propoerty.
   *
   * @param tagsJson The JSON data structure that represents {@link #tags}.
   */
  protected void setTagsJson( final String tagsJson )
  {
    setProperty( PROPERTY_TAGS_JSON, tagsJson );
  }

  /**
   * Return the value of the {@link #tags} propoerty.
   *
   * @return The array of tags represented in this component.
   */
  public Collection<Tag> getTags()
  {
    return tags;
  }

  /**
   * Set the value of the {@link #tags} propoerty.
   *
   * @param tags The collection of tag instances to be represented in this component.
   */
  public void setTags( final Collection<Tag> tags )
  {
    this.tags.clear();
    if ( tags != null )
    {
      this.tags.addAll( tags );
    }

    toJson();
  }

  /**
   * Convert the {@link #tags} collection to JSON and set the {@link
   * #PROPERTY_TAGS_JSON} property.
   */
  protected void toJson()
  {
    final XStream xstream = createSerialiser();
    setTagsJson( xstream.toXML( tags ) );
  }

  /**
   * Configure the JSON serialiser.
   *
   * @return The configured serialiser to use to serialise {@link #tags}.
   */
  protected XStream createSerialiser()
  {
    final XStream xstream = new XStream( new JsonHierarchicalStreamDriver() );
    xstream.processAnnotations( Tag.class );

    return xstream;
  }
}
