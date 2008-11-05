/** The name of the ProgressBar component. */
echopoint.constants.PROGRESS_BAR = "echopoint.ProgressBar";

/**
 * A component used display a simple progress bar by varying the width of a
 * child div within a parent div.  Note that the {@link
 * echopoint.internal.AbstractContainer#FOREGROUND} property will be used to
 * render the colour of the child div (progress bar).
 *
 * @author Rakesh 2008-10-29
 * @version $Id$
 */
echopoint.ProgressBar = Core.extend( echopoint.internal.AbstractContainer,
{
  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.PROGRESS_BAR, this );
  },

  componentType: echopoint.constants.PROGRESS_BAR
});
