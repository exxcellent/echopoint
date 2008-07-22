/**
 * A test class for the echopoint.TagCloud client-side component.
 * Displays tags with randomly assigned values in a row.
 *
 * @author Rakesh 2008-07-20
 * @version $Id$
 */
echopoint.test.TagCloudTest = Core.extend(
{
  $construct: function( testArea )
  {
    testArea.add( this._createRow() );
  },

  tagcloud: null,

  _createRow: function()
  {
    var row = new Echo.Row( { style: "Default" } );
    this.tagcloud = new echopoint.TagCloud(
    {
      renderId: "echopointUnitTestTagCloud",
      tags: this._createTags(),
      rolloverBackground: "#a1a1a1",
      rolloverForeground: "#c1c1c1",
      rolloverEnabled: true
    } );
    row.add( this.tagcloud );

    var column = new Echo.Column( { style: "Default" } );
    column.add( row );
    column.add( this._createUpdate() );
    return column;
  },

  _createTags: function()
  {
    var tags = new Array();

    for ( var i = 0; i < 10; ++i )
    {
      tags[i] = new echopoint.model.Tag( "Tag " + i,
          Math.floor( ( Math.random() * 10 ) + 1 ) );
    }

    return tags;
  },

  _createUpdate: function()
  {
    var row = new Echo.Row( { style: "Default" } );

    var button = new Echo.Button(
    {
      renderId: "echopointUnitTestTagCloudUpdate",
      styleName: "Default",
      text: "Update",
      events:
      {
        action: Core.method( this, this._actionPerformed )
      }
    } );

    row.add( button );
    return row;
  },

  _actionPerformed: function( event )
  {
    this.tagcloud.set( echopoint.TagCloud.TAGS, this._createTags() );
  }
} );