/**
 * Script file with the component definitions for the AbstractHtmlComponent
 * hierarchy.
 *
 * @author Rakesh 2008-06-20
 * @version $Id$
 */

/**
 * Abstract super-class component of components that render raw HTML
 * content.
 */
echopoint.internal.AbstractHtmlComponent = Core.extend( Echo.Component,
{
  $abstract: true,

  $load: function()
  {
    Echo.ComponentFactory.registerType(
        echopoint.constants.ABSTRACT_HTML_COMPONENT, this );
  }
});

/**
 * Component for rendering arbitrary XHTML text contained within a div.
 * Note that a div is used instead of a span, since the enclosing XHTML
 * can be complex.
 */
echopoint.DirectHtml = Core.extend( echopoint.internal.AbstractHtmlComponent,
{
  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.DIRECT_HTML, this );
  },

  componentType: echopoint.constants.DIRECT_HTML
});

/**
 * Component for rendering simple XHTML text contained within a span.
 */
echopoint.HtmlLabel = Core.extend( echopoint.internal.AbstractHtmlComponent,
{
  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.HTML_LABEL, this );
  },

  componentType: echopoint.constants.HTML_LABEL
});
