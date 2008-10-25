/** The name of the InfoWindow component. */
echopoint.constants.INFO_WINDOW = "echopoint.InfoWindow";

/**
 * A component used display an informational floating window (similar to
 * Google GInfoWindow) when hovering over a parent component.
 *
 * <p>This component has two modes - default and custom.  In default mode a
 * default colour scheme is applied to the info window.  For full control over
 * the colours, background etc. specify two {@link echopoint.internal.AbstractHtmlComponent}
 * components appropriately styled.  Note that when you specify fully
 * configured {@link echopoint.internal.AbstractHtmlComponent} components,
 * you should ensure that the combined appearance is proper.  It is best to
 * not set the {@link echopoint.internal.AbstractHtmlComponent#WIDTH}
 * property, since that should be specified at this component level to ensure
 * uniformity.</p>
 *
 * @author Rakesh 2008-10-21
 * @version $Id$
 */
echopoint.InfoWindow = Core.extend( Echo.Component,
{
  /** Properties defined for this component. */
  $static:
  {
    /**
     * Optional prefix text before the text that drives the display of the
     * info window.  The content should be plain text without any markup.
     */
    PREFIX: "prefix",

    /**
     * Optional postfix text after the text that drives the display of the
     * info window.  The content should be plain text without any markup.
     */
    POSTFIX: "postfix",

    /**
     * The text that drives the display of the info window.  Hovering over
     * the text will display the info window.  This property may be styled.
     */
    TEXT: "text",

    /** The font to use for the driver text. */
    TEXT_FONT: "textFont",

    /** The foreground for the driver text. */
    TEXT_FOREGROUND: "textForeground",

    /** The background for the driver text. */
    TEXT_BACKGROUND: "textBackground",

    /**
     * The title to display for the info window.  Specify this only if
     * you want a default title bar component.  The text may contain HTML
     * markup.
     */
    TITLE: "title",

    /**
     * The title bar to display for the info window.  This must be an instance
     * of {@link echopoint.internal.AbstractHtmlComponent}.  Specify this if
     * you want a custom title bar.  Note that the {@link #TITLE} property
     * will be ignored in the presence of this property.
     */
    TITLE_BAR: "titleBar",

    /**
     * The content to display in the info window.  Specify this only
     * if you want a default content area.  The text may contain HTML
     * markup.
     */
    CONTENT: "content",

    /**
     * The content component to display in the info window.  This must be an
     * instance of {@link echopoint.internal.AbstractHtmlComponent}.  Specify
     * this is you want a custom content area.  Note that the {@link #TEXT}
     * property will be ignored in the presence of this property.
     */
    CONTENT_AREA: "contentArea",

    /**
     * The font to use for the title and content areas.  This property will
     * be used only if the default window is used.
     */
    FONT: "font",

    /**
     * The insets to use for the title bar and content areas.  This property
     * will be used only if the default window is used.
     */
    INSETS: "insets",

    /** The width of the info window.  This property is best styled. */
    WIDTH: "width",

    /** The default width for the info window. */
    DEFAULT_WIDTH: "300px"
  },

  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.INFO_WINDOW, this );
  },

  componentType: echopoint.constants.INFO_WINDOW
});
