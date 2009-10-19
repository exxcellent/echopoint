package echopoint.style.echo.extras;

import echopoint.style.AbstractStyle;
import nextapp.echo.app.FillImage;
import nextapp.echo.app.Border;
import nextapp.echo.app.Border.Side;
import static nextapp.echo.app.Border.STYLE_SOLID;
import static nextapp.echo.extras.app.ContextMenu.PROPERTY_ANIMATION_TIME;
import static nextapp.echo.extras.app.ContextMenu.PROPERTY_BACKGROUND_IMAGE;
import static nextapp.echo.extras.app.ContextMenu.PROPERTY_BORDER;
import static nextapp.echo.extras.app.ContextMenu.PROPERTY_DISABLED_BACKGROUND_IMAGE;
import static nextapp.echo.extras.app.ContextMenu.PROPERTY_SELECTION_BACKGROUND_IMAGE;

import static echopoint.style.echo.extras.ResourceImages.LightBlueLine;
import static echopoint.style.echo.extras.ResourceImages.BlueGrey;
import static echopoint.util.ColorKit.makeColor;

/**
 * The default style to apply to {@link nextapp.echo.extras.app.ContextMenu}
 * components.
 *
 * @author Rakesh Vidyadharan 2009-08-23
 * @version $Id$
 */
public class ContextMenuStyle extends AbstractStyle
{
  private static final long serialVersionUID = 1L;

  @Override
  protected void init()
  {
    super.init();

    set( PROPERTY_ANIMATION_TIME, 350 );
    set( PROPERTY_BACKGROUND_IMAGE, new FillImage( LightBlueLine ) );

    final Side[] sides = new Side[]
        {
            new Side( 1, makeColor( "#dfdfef" ), STYLE_SOLID ),
            new Side( 1, makeColor( "#dfdfef" ), STYLE_SOLID ),
            new Side( 1, makeColor( "#7f7f8f" ), STYLE_SOLID ),
            new Side( 1, makeColor( "#7f7f8f" ), STYLE_SOLID )
        };
    set( PROPERTY_BORDER, new Border( sides ) );
    
    set( PROPERTY_DISABLED_BACKGROUND_IMAGE, new FillImage( BlueGrey ) );
    set( PROPERTY_SELECTION_BACKGROUND_IMAGE, new FillImage( BlueGrey ) );
  }
}
