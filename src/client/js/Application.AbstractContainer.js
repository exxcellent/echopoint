/** The name of the AbstractContainer. */
echopoint.constants.ABSTRACT_CONTAINER = "echopoint.internal.AbstractContainer";

/**
 * The class definition for the abstract container component that is the root
 * for most components.
 *
 * @author Rakesh 2008-07-20
 * @version $Id$
 */
echopoint.internal.AbstractContainer = Core.extend( Echo.Component,
{
  $abstract: true,

  /** Properties defined for this component. */
  $static:
  {
    ALIGNMENT: "alignment",
    BACKGROUND_IMAGE: "backgroundImage",
    BACKGROUND: "background",
    BORDER: "border",
    FONT: "font",
    FOREGROUND: "foreground",
    INSETS: "insets",
    HEIGHT: "height",
    WIDTH: "width"
  },

  $load: function()
  {
    Echo.ComponentFactory.registerType(
        echopoint.constants.ABSTRACT_CONTAINER, this );
  }
});

