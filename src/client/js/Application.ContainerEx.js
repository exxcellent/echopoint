/** The name of the RuleLine component. */
echopoint.constants.CONTAINEREX = "echopoint.ContainerEx";

/**
 * ContainerEx is a component that can be positioned anywhere on the screen with an specified size attributes.
 * @version $Id$
 */
echopoint.ContainerEx = Core.extend(Echo.Component,
{
    $load: function()
    {
        Echo.ComponentFactory.registerType(echopoint.constants.CONTAINEREX, this);
    },

    componentType: echopoint.constants.CONTAINEREX,

    /** @see Echo.Component#pane */
    pane: true
});