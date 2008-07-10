/**
 * Component rendering peer: HtmlLabel
 *
 * @author Rakesh 2008-06-20
 * @version $Id$
 */
echopoint.HtmlLabelSync = Core.extend( echopoint.internal.AbstractHtmlComponentSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.HTML_LABEL, this );
  },

  /** The container element for this component */
  _containerType: "span"
});
