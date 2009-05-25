package echopoint.style.echo;

import echopoint.style.AbstractStyle;
import static echopoint.style.DefaultFont.fontWithStyle;
import static echopoint.style.echo.ResourceImages.WindowPaneBottom;
import static echopoint.style.echo.ResourceImages.WindowPaneBottomLeft;
import static echopoint.style.echo.ResourceImages.WindowPaneBottomRight;
import static echopoint.style.echo.ResourceImages.WindowPaneHeader;
import static echopoint.style.echo.ResourceImages.WindowPaneLeft;
import static echopoint.style.echo.ResourceImages.WindowPaneRight;
import static echopoint.style.echo.ResourceImages.WindowPaneTop;
import static echopoint.style.echo.ResourceImages.WindowPaneTopLeft;
import static echopoint.style.echo.ResourceImages.WindowPaneTopRight;
import static echopoint.util.ColorKit.makeColor;
import nextapp.echo.app.Extent;
import nextapp.echo.app.FillImage;
import nextapp.echo.app.FillImageBorder;
import nextapp.echo.app.Insets;
import static nextapp.echo.app.WindowPane.PROPERTY_BACKGROUND;
import static nextapp.echo.app.WindowPane.PROPERTY_BORDER;
import static nextapp.echo.app.WindowPane.PROPERTY_CONTROLS_INSETS;
import static nextapp.echo.app.WindowPane.PROPERTY_MAXIMIZE_ENABLED;
import static nextapp.echo.app.WindowPane.PROPERTY_TITLE_BACKGROUND;
import static nextapp.echo.app.WindowPane.PROPERTY_TITLE_BACKGROUND_IMAGE;
import static nextapp.echo.app.WindowPane.PROPERTY_TITLE_FONT;
import static nextapp.echo.app.WindowPane.PROPERTY_TITLE_FOREGROUND;
import static nextapp.echo.app.WindowPane.PROPERTY_TITLE_INSETS;

/**
 * The default style to apply to {@link nextapp.echo.app.WindowPane}
 * components.
 *
 * @author Rakesh Vidyadharan 2009-05-24
 * @version $Id$
 */
public class WindowPaneStyle extends AbstractStyle
{
  private static final long serialVersionUID = 1L;

  /** {@inheritDoc} */
  @Override
  protected void init()
  {
    super.init();

    set( PROPERTY_BACKGROUND, makeColor( "#cfdfff" ) );
    setBorderStyle();
    setControlsStyles();
    setTitleStyles();
  }

  /** Set the fill images used as border for the window pane. */
  protected void setBorderStyle()
  {
    final FillImageBorder border = new FillImageBorder();
    border.setBorderInsets( new Insets( 17, 23, 23, 17 ) );
    border.setContentInsets( new Insets( 8, 6, 14, 8 ) );

    border.setFillImage( FillImageBorder.TOP_LEFT,
        new FillImage( WindowPaneTopLeft ) );
    border.setFillImage( FillImageBorder.TOP,
        new FillImage( WindowPaneTop ) );
    border.setFillImage( FillImageBorder.TOP_RIGHT,
        new FillImage( WindowPaneTopRight ) );

    border.setFillImage( FillImageBorder.LEFT,
        new FillImage( WindowPaneLeft ) );
    border.setFillImage( FillImageBorder.RIGHT,
        new FillImage( WindowPaneRight ) );

    border.setFillImage( FillImageBorder.BOTTOM_LEFT,
        new FillImage( WindowPaneBottomLeft ) );
    border.setFillImage( FillImageBorder.BOTTOM,
        new FillImage( WindowPaneBottom ) );
    border.setFillImage( FillImageBorder.BOTTOM_RIGHT,
        new FillImage( WindowPaneBottomRight ) );

    set( PROPERTY_BORDER, border );
  }

  /** Set the styles for the control buttons on title bar. */
  protected void setControlsStyles()
  {
    set( PROPERTY_MAXIMIZE_ENABLED, true );
    set( PROPERTY_CONTROLS_INSETS, new Insets( 2, 10 ) );
  }

  /** Set styles for the title bar of the window pane. */
  protected void setTitleStyles()
  {
    set( PROPERTY_TITLE_BACKGROUND, makeColor( "#2f2f4f" ) );
    set( PROPERTY_TITLE_BACKGROUND_IMAGE, new FillImage( WindowPaneHeader,
        new Extent( 0 ), new Extent( 50, Extent.PERCENT ),
        FillImage.REPEAT_HORIZONTAL ) );

    set( PROPERTY_TITLE_BACKGROUND_IMAGE, makeColor( "#2f2f4f" ) );
    set( PROPERTY_TITLE_FONT, fontWithStyle( "BOLD" ) );
    set( PROPERTY_TITLE_FOREGROUND, makeColor( "#ffffff" ) );
    set( PROPERTY_TITLE_INSETS, new Insets( 5, 10 ) );
  }
}
