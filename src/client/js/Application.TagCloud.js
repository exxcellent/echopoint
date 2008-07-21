/**
 * TagCloud component.
 *
 * @sp {#Color} rolloverBackground the rollover background color
 * @sp {Boolean} rolloverEnabled boolean flag indicating whether rollover
 *   effects are enabled
 * @sp {#Color} rolloverForeground the rollover foreground
 * @sp tags An array containing the {#Tag} data objects to display.
 * @version $Id$
 */
echopoint.TagCloud = Core.extend( Echo.Component,
{
  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.TAG_CLOUD, this );
  },

  componentType: echopoint.constants.TAG_CLOUD,

  doAction: function( tag )
  {
    this.fireEvent( { type: "action", source: this, tag: tag } );
  }
} );

/** The data object for the TagCloud component. */
echopoint.model.Tag = Core.extend(
{
  $construct: function( title, occurances )
  {
    this.name = title;
    this.count = occurances;
  },

  /** The name (title) for the tag. */
  name: null,

  /**
   * The count for this tag. This is usually the number of occurances of
   * the name represented in this tag.
   */
  count: 0
} );