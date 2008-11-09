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
    ACTION_TYPE: "complete",
    BUTTON_TEXT_UPLOAD: "buttonTextUpload",
    BUTTON_TEXT_CANCEL : "buttonTextCancel",
    BUTTON_TEXT_WAIT : "buttonTextWait",
    BUTTON_IMAGE_UPLOAD: "buttonImageUpload",
    BUTTON_IMAGE_CANCEL: "buttonImageCancel",
    BUTTON_IMAGE_WAIT: "buttonImageWait",
    BUTTON_MODE : "buttonMode",
    BUTTON_DISPLAY: "buttonDisplay",
    CANCEL_ENABLED: "cancelEnabled",

    INPUT_SIZE: "inputSize",
    DEFAULT_INPUT_SIZE: "20",

    UPLOAD_INDEX: "uploadIndex",
    UPLOAD_CANCELLED: "uploadCancelled",

    DEFAULT_BUTTON_MODE: "text",
    DEFAULT_BUTTON_DISPLAY: "auto",
    DEFAULT_CANCEL_ENABLED: true,
    DEFAULT_IMAGE_UPLOAD: "images/upload.png",
    DEFAULT_IMAGE_CANCEL: "images/cancel.png",
    DEFAULT_IMAGE_WAIT: "images/wait.png",

    /** The default upload button text */
    DEFAULT_UPLOAD_TEXT: "Upload",

    /** The default cancel button text. */
    DEFAULT_CANCEL_TEXT: "Cancel",

    /** The default wait button text. */
    DEFAULT_WAIT_TEXT: "Wait...",

    /**
     * The maximum number to times to poll the progress server till we
     * assume the user cancelled the upload.
     */
    REPOLL_COUNT: "repollCount",
    DEFAULT_REPOLL_COUNT: 2,

    /**
     * The interval (in milliseconds) at which the progress server will
     * be polled for updates (completion, cancel etc.).
     */
    POLLING_INTERVAL: "pollingInterval",
    DEFAULT_POLLING_INTERVAL: 250
  },

  /**
   * Fire an action event that indicates that the file upload has finished.
   * This is useful to perform UI updates without having to recourse to
   * task queues.
   *
   * @param uploadId
   */
  notifyComplete: function( uploadId )
  {
    this.fireEvent(
    {
      source: this,
      type: echopoint.tucana.FileUploadSelector.ACTION_TYPE,
      actionCommand: uploadId
    });
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
    if ( xml )
    {
      var doc = xml.documentElement;
      this.bytesRead = doc.getElementsByTagName( "r" )[0].childNodes[0].nodeValue;
      this.contentLength = doc.getElementsByTagName( "cl" )[0].childNodes[0].nodeValue;
      this.percentComplete = doc.getElementsByTagName( "pc" )[0].childNodes[0].nodeValue;
      this.transferRate = doc.getElementsByTagName( "tr" )[0].childNodes[0].nodeValue;
      this.estimatedTimeLeft = doc.getElementsByTagName( "tl" )[0].childNodes[0].nodeValue;
    }
  }
});
