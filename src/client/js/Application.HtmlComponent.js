/**
 * Script file with the component definitions for the AbstractHtmlComponent
 * hierarchy.
 *
 * @author Rakesh 2008-06-20
 * @version $Id$
 */

/** The name of the AbstractHtmlComponent. */
echopoint.constants.ABSTRACT_HTML_COMPONENT = "echopoint.internal.AbstractHtmlComponent";

/** The name of the DirectHtml component. */
echopoint.constants.DIRECT_HTML = "echopoint.DirectHtml";

/** The name of the HtmlLabel component. */
echopoint.constants.HTML_LABEL = "echopoint.HtmlLabel";

/**
 * Abstract super-class component of components that render raw HTML
 * content.
 */
echopoint.internal.AbstractHtmlComponent = Core.extend( echopoint.internal.AbstractContainer,
{
  $abstract: true,

  /** The properties supported by this component. */
  $static:
  {
    TEXT: "text"
  },

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

