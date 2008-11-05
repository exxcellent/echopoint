/**
 * A test class for the echopoint.tucana.FileUploadSelector client-side component.
 *
 * @author Rakesh 2008-11-02
 * @version $Id$
 */
echopoint.test.FileUploadTest = Core.extend(
{
  $construct: function( testArea )
  {
    testArea.add( this._createFileUpload() );
  },

  _createFileUpload: function()
  {
    return new echopoint.tucana.FileUploadSelector(
    {
      renderId: "echopointUnitTestFileUpload",
      buttonTextUpload: "Upload"
    } );
  }
} );
