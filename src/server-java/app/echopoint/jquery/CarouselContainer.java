package echopoint.jquery;

import echopoint.ContainerEx;
import nextapp.echo.app.ImageReference;

/**
 * CarouselContainer is a component that can be positioned anywhere on the screen with an specified size attributes.
 * The components put inside will be able to navigate between in a carousel-style widget.
 * This component is built around the jQuery project jCarousel Lite: http://www.gmarwaha.com/jquery/jcarousellite
 *
 * This component is a PaneContainer and hence can have components that implement Pane as a child.
 * @author HansH 2009-07-09
 * @version $Id$
 */
public class CarouselContainer extends ContainerEx {

    public static final String PROPERTY_LEFT_ICON = "leftIcon";
    public static final String PROPERTY_RIGHT_ICON = "rightIcon";
    public static final String PROPERTY_VISIBLE = "visible";


    public CarouselContainer() {
        super();
    }

    /**
     * Returns the left icon displayed in the button.
     *
     * @return the icon
     */
    public ImageReference getLeftIcon() {
        return (ImageReference) get(PROPERTY_LEFT_ICON);
    }

    /**
     * Sets the left icon displayed in the button.
     *
     * @param newValue the new icon
     */
    public void setLeftIcon(ImageReference newValue) {
        set(PROPERTY_LEFT_ICON, newValue);
    }

    /**
     * Returns the right icon displayed in the button.
     *
     * @return the icon
     */
    public ImageReference getRightIcon() {
        return (ImageReference) get(PROPERTY_RIGHT_ICON);
    }

    /**
     * Sets the right icon displayed in the button.
     *
     * @param newValue the new icon
     */
    public void setRightIcon(ImageReference newValue) {
        set(PROPERTY_RIGHT_ICON, newValue);
    }

    /**
     * Returns the number of visible items
     * @return
     */
    public int getVisible() {
        return get(PROPERTY_VISIBLE, 3);
    }

    /**
     * Sets the number of visible items.
     * @param newVisible
     */
    public void setVisible(int newVisible) {
        set(PROPERTY_VISIBLE, newVisible);
    }
}
