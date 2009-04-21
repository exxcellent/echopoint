package echopoint;

import nextapp.echo.app.ImageReference;
import nextapp.echo.app.Component;

/**
 * Created: 2009-apr-18
 */
public class ApplicationBackground extends Component {
     /** The image reference for the component.  This property may be styled. */
  public static final String PROPERTY_IMAGE = "url";

    public ApplicationBackground(ImageReference image) {
        setImage(image);
    }

    public ImageReference getImage() {
        return (ImageReference) get( PROPERTY_IMAGE );
    }

    public void setImage(ImageReference image) {

    set( PROPERTY_IMAGE, image );
    }
}
