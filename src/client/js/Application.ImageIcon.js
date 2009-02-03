/** The name of the ImageIcon component. */
echopoint.constants.IMAGE_ICON = "echopoint.ImageIcon";

/**
 * A component used to display an image.  Differs from buttons and labels in
 * that the precise size of the image can be specified directly.
 *
 * @author Rakesh 2008-10-20
 * @version $Id$
 */
echopoint.ImageIcon = Core.extend( echopoint.internal.AbstractContainer,
{
  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.IMAGE_ICON, this );
  },

  /** Properties defined for this component. */
  $static:
  {
    ACTION_COMPLETE: "action",
    ACTION_COMMAND: "actionCommand",
    // The property that holds the URI for the image.
    URL: "url"
  },

  /** Programmatically performs an event on the image. */
  doAction: function()
  {
    var ac = this.get( echopoint.ImageIcon.ACTION_COMMAND );
    this.fireEvent( { type: echopoint.ImageIcon.ACTION_COMPLETE, source: this,
      actionCommand: ac } );
  },

  componentType: echopoint.constants.IMAGE_ICON
});
