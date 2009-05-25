package echopoint.style;

import static echopoint.ProgressBar.PROPERTY_BACKGROUND;
import static echopoint.ProgressBar.PROPERTY_BAR_BACKGROUND;
import static echopoint.ProgressBar.PROPERTY_BORDER;
import static echopoint.ProgressBar.PROPERTY_FOREGROUND;
import static echopoint.ProgressBar.PROPERTY_HEIGHT;
import static echopoint.ProgressBar.PROPERTY_INSETS;
import static echopoint.util.ColorKit.makeColor;
import nextapp.echo.app.Border;
import nextapp.echo.app.Extent;
import nextapp.echo.app.Insets;

/**
 * A default style for the {@link echopoint.ProgressBar} component.
 *
 * @author Rakesh Vidyadharan 2009-05-15
 * @version $Id$
 */
public class ProgressBarStyle extends AbstractStyle
{
  private static final long serialVersionUID = 1L;

  /**
   * The default background colour to use for the component.
   *
   * {@value}
   */
  public static final String BACKGROUND = "#a1a1a1";

  /**
   * The default foreground colour to use for the component.
   *
   * {@value}
   */
  public static final String FOREGROUND = "#ffffff";

  /**
   * The default bar background colour to use for the component.
   *
   * {@value}
   */
  public static final String BAR_BACKGROUND = "#1a428a";

  /** {@inheritDoc} */
  @Override
  protected void init()
  {
    super.init();

    set( PROPERTY_BACKGROUND, makeColor( BACKGROUND ) );
    set( PROPERTY_FOREGROUND, makeColor( FOREGROUND ) );
    set( PROPERTY_BAR_BACKGROUND, makeColor( BAR_BACKGROUND ) );
    set( PROPERTY_BORDER,
        new Border( 1, makeColor( "#3d3d3d" ), Border.STYLE_INSET ) );
    set( PROPERTY_HEIGHT, new Extent( 25 ) );
    set( PROPERTY_INSETS, new Insets( new Extent( 1 ) ) );
  }
}
