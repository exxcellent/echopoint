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
import nextapp.echo.app.Row;
import nextapp.echo.app.Column;
import nextapp.echo.app.Button;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.app.event.ActionListener;
import org.junit.AfterClass;
import static org.junit.Assert.*;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Random;

/**
 * Unit test suite for the {@link TagCloud} component.
 *
 * @author Rakesh 2008-07-20
 * @version $Id$
 */
public class TagCloudTest
{
  static TagCloud tagCloud;
  static Color background;
  static Color foreground;

  @BeforeClass
  public static void init()
  {
    tagCloud = new TagCloud();
    tagCloud.setRenderId( "echopointUnitTestTagCloud" );
    background = new Color( 0xa1a1a1 );
    foreground = new Color( 0xc1c1c1 );
  }

  @Test
  public void enabled()
  {
    tagCloud.setRolloverEnabled( true );
    assertTrue( "Ensuring enabled set", tagCloud.getRolloverEnabled() );
  }

  @Test
  public void background()
  {
    tagCloud.setRolloverBackground( background );
    assertEquals( "Ensuring background set",
        tagCloud.getRolloverBackground(), background );
  }

  @Test
  public void foreground()
  {
    tagCloud.setRolloverForeground( foreground );
    assertEquals( "Ensuring foreground set",
        tagCloud.getRolloverForeground(), foreground );
  }

  @Test
  public void tags()
  {
    tagCloud.setTags( createTags() );
    assertEquals( "Ensuring same size of tags", tagCloud.getTags().size(), 10 );
  }

  @Test
  public void add()
  {
    try
    {
      tagCloud.add( new TagCloud() );
      fail( "TagCloud cannot contain children" );
    }
    catch ( Throwable t ) {}
  }

  @AfterClass
  public static void finish()
  {
    final Component content = Application.getContent().getTestArea();
    content.removeAll();

    final Row row = new Row();

    assertTrue( tagCloud.getRolloverEnabled() );
    assertNotNull( tagCloud.getRolloverBackground() );
    assertNotNull( tagCloud.getRolloverForeground() );
    assertNotNull( tagCloud.getTags() );
    //System.out.println( tagCloud.getTagsJson() );

    row.add( tagCloud );

    final Column column = new Column();
    column.add( row );
    column.add( createUpdate() );
    content.add( column );
  }

  private static Collection<Tag> createTags()
  {
    final Collection<Tag> tags = new ArrayList<Tag>( 10 );
    final Random random = new Random( System.currentTimeMillis() );

    for ( int i = 0; i < 10; ++i )
    {
      tags.add( new Tag( "Tag " + i, random.nextInt( 10 ) ) );
    }

    return tags;
  }

  private static Row createUpdate()
  {
    final Row row = new Row();

    final Button button = new Button( "Update" );
    button.setRenderId( "echopointUnitTestTagCloudUpdate" );
    button.addActionListener(
    new ActionListener()
    {
      private static final long serialVersionUID = 1l;

      public void actionPerformed( final ActionEvent event )
      {
        tagCloud.setTags( createTags() );
      }
    });

    row.add( button );
    return row;
  }
}
