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

  _createRow: function()
  {
    var row = new Echo.Row( { style: "Default" } );
    var tagcloud = new echopoint.TagCloud(
    {
      renderId: "echopointUnitTestTagCloud",
      tags: this._createTags(),
      rolloverBackground: "#a1a1a1",
      rolloverForeground: "#c1c1c1",
      rolloverEnabled: true
    } );
    row.add( tagcloud );

    return row;
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
  }
} );