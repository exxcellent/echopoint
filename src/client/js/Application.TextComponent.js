/**
 * Script file with the component definitions for the TextComponent extensions.
 *
 * @author Rakesh 2009-03-07
 * @version $Id$
 */

/** The name of the AbstractHtmlComponent. */
echopoint.constants.NUMBER_TEXT_FIELD = "echopoint.NumberTextField";

/**
 * Component for allowing only numeric values into a text field.
 */
echopoint.NumberTextField = Core.extend( Echo.TextField,
{
  $load: function()
  {
    Echo.ComponentFactory.registerType(
        echopoint.constants.NUMBER_TEXT_FIELD, this );
  },

  componentType: echopoint.constants.NUMBER_TEXT_FIELD
});

