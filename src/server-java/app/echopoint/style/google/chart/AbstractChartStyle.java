package echopoint.style.google.chart;

import static echopoint.google.chart.internal.AbstractChart.PROPERTY_BORDER;
import static echopoint.google.chart.internal.AbstractChart.PROPERTY_FILL;
import static echopoint.google.chart.internal.AbstractChart.PROPERTY_FOREGROUND;
import static echopoint.google.chart.internal.AbstractChart.PROPERTY_INSETS;
import echopoint.style.AbstractStyle;
import static echopoint.util.ColorKit.makeColor;
import nextapp.echo.app.Extent;
import nextapp.echo.app.Insets;
import nextapp.echo.app.Border;

/**
 * The default base style class for Google Chart API components.
 *
 * @author Rakesh Vidyadharan 2009-05-18
 * @version $Id$
 */
public abstract class AbstractChartStyle extends AbstractStyle
{
  /** {@inheritDoc} */
  @Override
  protected void init()
  {
    super.init();

    set( PROPERTY_BORDER,
        new Border( 2, makeColor( "#cfdfff" ), Border.STYLE_GROOVE ) );
    set( PROPERTY_FILL, "bg,s,efefef|c,lg,45,ffffff,0,76a4fb,0.75" );
    set( PROPERTY_FOREGROUND, makeColor( "#ff0000" ) );
    set( PROPERTY_INSETS, new Insets( new Extent( 10 ) ) );
  }
}
