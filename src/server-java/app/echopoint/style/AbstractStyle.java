package echopoint.style;

import nextapp.echo.app.MutableStyle;
import static nextapp.echo.app.Component.PROPERTY_FONT;

import java.util.logging.Logger;
import java.util.logging.Level;

/**
 * Abstract base class from which all style classes are derived.  Primarily
 * delegates to the {@link #init} method for configuration.
 *
 * @author Rakesh 2009-05-12
 * @version $Id$
 */
public abstract class AbstractStyle extends MutableStyle
{
  /** The logger to use to log messages. */
  protected static final Logger logger = Logger.getAnonymousLogger();

  /** The log level to use to log missing style messages. */
  protected Level level = Level.FINE;

  /** Default constructor.  Over-ridden to invoke {@link #init}. */
  public AbstractStyle()
  {
    init();
  }

  /**
   * Mandatory style initialisation method to be implemented by all
   * sub-classes.  The default implementation sets the default font to use.
   * Sub-classes should generally invoke {@code super.init()}.
   *
   * @see echopoint.style.DefaultFont
   * @see #setFont
   */
  protected void init()
  {
    setFont();
  }

  /**
   * Set the default font to be used for all components.
   */
  protected void setFont()
  {
    set( PROPERTY_FONT, DefaultFont.getInstance() );
  }

  /**
   * Over-ridden to log missing property requests.
   *
   * @param name The name of the property to use to retrieve style.
   * @return Object The appropriate instance of Style.
   */
  @Override
  public Object get( String name )
  {
    Object object = super.get( name );

    if ( object == null )
    {
      if ( logger.isLoggable( level ) )
      {
        logger.log( level, "No style class defined with name " + name );
      }
    }

    return object;
  }
}
