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

  $load: function()
  {
    Echo.ComponentFactory.registerType(
        echopoint.constants.ABSTRACT_CONTAINER, this );
  }
});