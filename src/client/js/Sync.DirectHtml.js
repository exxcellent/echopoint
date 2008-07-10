/**
 * Component rendering peer: DirectHtml
 *
 * @author Rakesh 2008-06-20
 * @version $Id$
 */
echopoint.DirectHtmlSync = Core.extend( echopoint.internal.AbstractHtmlComponentSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.DIRECT_HTML, this );
  },

  /** The container element for this component */
  _containerType: "div"
});
