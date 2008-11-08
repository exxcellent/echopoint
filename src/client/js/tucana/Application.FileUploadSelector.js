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
    CANCEL_ENABLED: "cancelEnabled",

    UPLOAD_INDEX: "uploadIndex",
    UPLOAD_CANCELLED: "uploadCancelled",

    DEFAULT_BUTTON_MODE: 0,
    DEFAULT_BUTTON_DISPLAY: 2,
    DEFAULT_CANCEL_ENABLED: true,

    /** The default upload button text */
    DEFAULT_UPLOAD_TEXT: "Upload",

    /** The default cancel button text. */
    DEFAULT_CANCEL_TEXT: "Cancel",

    /** The default wait button text. */
    DEFAULT_WAIT_TEXT: "Wait..."
  },

  componentType: echopoint.constants.FILE_UPLOAD_SELECTOR
});

/**
 * A value object that represents the response from polling the progress
 * service.
 */
echopoint.tucana.UploadProgress = Core.extend(
{
  /** The total bytes that have been read so far. */
  bytesRead: 0,

  /** The content length of the uploading file.*/
  contentLength: 0,

  /** The percentage of the file that has been uploaded so far. */
  percentComplete: 0,

  /** The transfer rate that represents the speed of the upload. */
  transferRate: 0,

  /** The estimated time remaining for the transfer to end. */
  estimatedTimeLeft: 0,

  /**
   * Create a new instance using the XML response from the service.
   *
   * @param xml The entire XML DOM structure.
   */
  $construct: function( xml )
  {
    var doc = xml.documentElement;
    this.bytesRead = doc.getElementsByTagName( "r" )[0].childNodes[0].nodeValue;
    this.contentLength = doc.getElementsByTagName( "cl" )[0].childNodes[0].nodeValue;
    this.percentComplete = doc.getElementsByTagName( "pc" )[0].childNodes[0].nodeValue;
    this.transferRate = doc.getElementsByTagName( "tr" )[0].childNodes[0].nodeValue;
    this.estimatedTimeLeft = doc.getElementsByTagName( "tl" )[0].childNodes[0].nodeValue;
  }
});
