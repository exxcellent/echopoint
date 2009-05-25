package echopoint.style.echo;

import echopoint.style.AbstractStyle;
import static echopoint.style.echo.ResourceImages.InputFieldBackground;
import static echopoint.style.echo.ResourceImages.InputFieldBackgroundHightlight;
import static echopoint.style.echo.ResourceImages.InputFieldBackgroundPressed;
import static echopoint.util.ColorKit.makeColor;
import nextapp.echo.app.Border;
import nextapp.echo.app.Extent;
import nextapp.echo.app.FillImage;
import nextapp.echo.app.Insets;
import static nextapp.echo.app.button.AbstractButton.*;

/**
 * The default style to associate with button components.
 *
 * @author Rakesh Vidyadharan 2009-05-24
 * @version $Id$
 */
public class AbstractButtonStyle extends AbstractStyle
{
  private static final long serialVersionUID = 1l;

  /**
   * The border colour to use for the button.
   *
   * {@value}
   */
  public static final String BORDER = "#709bcd";

  /**
   * The rollover border colour to apply to the button.
   *
   * {@value}
   */
  public static final String ROLLOVER_BORDER = "#bcd6f4";

  /**
   * The foreground colour to use when the button is disabled.
   *
   * {@value}
   */
  public static final String DISABLED_FOREGROUND = "#93bed5";

  /** {@inheritDoc} */
  @Override
  protected void init()
  {
    super.init();

    set( PROPERTY_BACKGROUND_IMAGE, new FillImage( InputFieldBackground,
        new Extent( 0 ), new Extent( 50, Extent.PERCENT ),
        FillImage.REPEAT ) );

    set( PROPERTY_BORDER,
        new Border( 1, makeColor( BORDER ), Border.STYLE_OUTSET ) );
    set( PROPERTY_DISABLED_FOREGROUND, makeColor( DISABLED_FOREGROUND ) );
    set( PROPERTY_INSETS, new Insets( 1, 4 ) );

    set( PROPERTY_PRESSED_BACKGROUND_IMAGE, new FillImage(
        InputFieldBackgroundPressed, new Extent( 0 ),
        new Extent( 50, Extent.PERCENT ), FillImage.REPEAT ) );

    set( PROPERTY_PRESSED_BORDER,
        new Border( 1, makeColor( BORDER ), Border.STYLE_INSET ) );
    set( PROPERTY_PRESSED_ENABLED, true );

    set( PROPERTY_ROLLOVER_BACKGROUND_IMAGE, new FillImage(
        InputFieldBackgroundHightlight, new Extent( 0 ),
        new Extent( 50, Extent.PERCENT ), FillImage.REPEAT ) );

    set( PROPERTY_ROLLOVER_BORDER,
        new Border( 1, makeColor( ROLLOVER_BORDER ), Border.STYLE_OUTSET ) );
    set( PROPERTY_ROLLOVER_ENABLED, true );
  }
}
