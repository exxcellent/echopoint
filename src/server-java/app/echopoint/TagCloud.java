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
import java.util.Collections;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.json.JsonHierarchicalStreamDriver;

/**
 * A <a href='http://en.wikipedia.org/wiki/Tag_cloud'>tag cloud</a> component
 * based on client-side code contribued by Tod.  This component supports the
 * following style properties in addition to those defined in {@link
 * nextapp.echo.app.Component}:
 *
 * <ul>
 *   <li><code>rolloverEnabled</code> - A flag used to indicate that the tag
 *     components should support change of style on mouse rollover.</li>
 *   <li><code>rolloverBackground</code> - The colour to use as the background
 *     of the tag element over which the mouse hovers.</li>
 *   <li><code>rolloverForeground</code> - The colour to use for the title
 *     of the tag element over which the mouse hovers.</li>
 * </ul>
 *
 * <p>The following shows sample usage of this component:</p>
 * <pre>
 *   import echopoint.TagCloud;
 *   import echopoint.model.Tag;
 *   import nextapp.echo.app.Row;
 *
 *     ...
 *     final Collection&lt;Tag&gt; tags = new ArrayList&lt;Tag&gt;();
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
 * @author Rakesh 2008-07-20
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
  public static final String PROPERTY_TAGS = "tags";

  /** The collection of tag instances that represents the data model. */
  private Collection<Tag> data = new ArrayList<Tag>( 20 );

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
   * Return the value of the {@link #PROPERTY_ROLLOVER_ENABLED} property.
   *
   * @return The flag indicating whether rollover behaviour is enabled or not.
   */
  public boolean getRolloverEnabled()
  {
    return (Boolean) get( PROPERTY_ROLLOVER_ENABLED );
  }

  /**
   * Set the value of the {@link #PROPERTY_ROLLOVER_ENABLED} property.
   *
   * @param enabled The flag indicating whether rollover behaviour is to be
   *   enabled or not.
   */
  public void setRolloverEnabled( final boolean enabled )
  {
    set( PROPERTY_ROLLOVER_ENABLED, enabled );
  }

  /**
   * Return the value of the {@link #PROPERTY_ROLLOVER_BACKGROUND} property.
   *
   * @return The colour used as the background while rolling over the tag.
   */
  public Color getRolloverBackground()
  {
    return (Color) get( PROPERTY_ROLLOVER_BACKGROUND );
  }

  /**
   * Set the value of the {@link #PROPERTY_ROLLOVER_BACKGROUND} property.
   *
   * @param background The colour used as the background while rolling over.
   */
  public void setRolloverBackground( final Color background )
  {
    set( PROPERTY_ROLLOVER_BACKGROUND, background );
  }

  /**
   * Return the value of the {@link #PROPERTY_ROLLOVER_BACKGROUND} property.
   *
   * @return The colour used as the foreground while rolling over the tag.
   */
  public Color getRolloverForeground()
  {
    return (Color) get( PROPERTY_ROLLOVER_FOREGROUND );
  }

  /**
   * Set the value of the {@link #PROPERTY_ROLLOVER_BACKGROUND} property.
   *
   * @param foreground The colour used as the foreground while rolling over.
   */
  public void setRolloverForeground( final Color foreground )
  {
    set( PROPERTY_ROLLOVER_FOREGROUND, foreground );
  }

  /**
   * Return a ready only view of the {@link #data} model.
   *
   * @return The array of tags represented in this component.
   */
  public Collection<Tag> getData()
  {
    return Collections.unmodifiableCollection( data );
  }

  /**
   * Return the value of the {@link #PROPERTY_TAGS} property.  Note
   * that this method will return the JSON representation of {@link #data}.
   *
   * @return The JSON data structure that represents {@link #data}.
   */
  public String getTags()
  {
    return (String) get( PROPERTY_TAGS );
  }

  /**
   * Set the value of the {@link #PROPERTY_TAGS} property.  This method is
   * for <b>internal use only</b>.
   *
   * @deprecated Internal use only.  Use {@link #setTags( Collection )}.
   * @param tags The JSON representation of the tags collection.
   */
  @Deprecated
  public void setTags( final String tags )
  {
    set( PROPERTY_TAGS, tags );
  }

  /**
   * Set the value of the {@link #data} property.  The {@link #data}
   * collection will be converted to JSON to serialisation.
   *
   * @param tags The collection of tag instances to be represented in this component.
   */
  public void setTags( final Collection<Tag> tags )
  {
    data.clear();
    data.addAll( tags );

    final XStream xstream = createSerialiser();
    setTags( xstream.toXML( data ) );
  }

  /**
   * Configure the JSON serialiser.
   *
   * @return The configured serialiser to use to serialise {@link #data}.
   */
  protected XStream createSerialiser()
  {
    final XStream xstream = new XStream( new JsonHierarchicalStreamDriver() );
    xstream.processAnnotations( Tag.class );

    return xstream;
  }
}
