/**
 * A simple component used to add space between other components.  Renders
 * an empty image of the specified size.
 *
 * @author Rakesh 2008-07-20
 * @version $Id$
 */
echopoint.Strut = Core.extend( Echo.Component,
{
  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.STRUT, this );
  },

  componentType: echopoint.constants.STRUT
});