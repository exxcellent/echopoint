/** The name of the file upload selector component. */
echopoint.constants.FILE_UPLOAD_SELECTOR = "echopoint.tucana.FileUploadSelector";

/**
 * The client-side representation of the tucana file upload seletor component.
 *
 * @author Rakesh 2008-10-30
 * @version $Id$
 */
echopoint.tucana.FileUploadSelector = Core.extend( echopoint.internal.AbstractContainer,
{
  $load: function()
  {
    Echo.ComponentFactory.registerType( echopoint.constants.FILE_UPLOAD_SELECTOR, this );
  },

  /** Properties defined for the component. */
  $static:
  {
    BUTTON_TEXT_UPLOAD: "buttonTextUpload",
    BUTTON_TEXT_CANCEL : "buttonTextCancel",
    BUTTON_TEXT_WAIT : "buttonTextWait",
    BUTTON_IMAGE_UPLOAD: "buttonImageUpload",
    BUTTON_IMAGE_CANCEL: "buttonImageCancel",
    BUTTON_IMAGE_WAIT: "buttonImageWait",
    BUTTON_MODE : "buttonMode",
    BUTTON_DISPLAY: "buttonDisplay",
    WIDTH_SIZE  : "widthSize",
    WIDTH_EXTENT: "widthExtent",
    WIDTH_MODE  : "widthMode",
    CANCEL_ENABLED: "cancelEnabled",

    UPLOAD_INDEX: "uploadIndex",
    UPLOAD_CANCELLED: "uploadCancelled",

    DEFAULT_BUTTON_MODE: 0,
    DEFAULT_BUTTON_DISPLAY: 2
  },

  componentType: echopoint.constants.FILE_UPLOAD_SELECTOR
});