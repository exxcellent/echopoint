/**
 * A test class for the echopoint.Strut client-side component.
 * Displays strut components in column and row containers to ensure that
 * the height and width style properties are honoured.
 *
 * @author Rakesh 2008-07-20
 * @version $Id$
 */
echopoint.test.StrutTest = Core.extend(
{
  $construct: function( testArea )
  {
    testArea.add( this._createRow() );
    testArea.add( this._createColumn() );
  },

  _createRow: function()
  {
    var row = new Echo.Row( { style: "Default" } );

    row.add( new Echo.Label(
    {
      renderId: "echopointUnitTestStrutRowLabel1",
      styleName: "Default",
      text: "Label 1"
    } ) );

    row.add( new echopoint.Strut(
    {
      renderId: "echopointUnitTestStrutRow",
      styleName: "RowStrut"
    } ) );

    row.add( new Echo.Label(
    {
      renderId: "echopointUnitTestStrutRowLabel2",
      styleName: "Default",
      text: "Label 2"
    } ) );

    return row;
  },

  _createColumn: function()
  {
    var column = new Echo.Column( { style: "Default" } );

    column.add( new Echo.Label(
    {
      renderId: "echopointUnitTestStrutColumnLabel3",
      styleName: "Default",
      text: "Label 3"
    } ) );

    column.add( new echopoint.Strut(
    {
      renderId: "echopointUnitTestStrutColumn",
      styleName: "ColumnStrut"
    } ) );

    column.add( new Echo.Label(
    {
      renderId: "echopointUnitTestStrutColumnLabel4",
      styleName: "Default",
      text: "Label 4"
    } ) );

    return column;
  }
});
