package echopoint.style.google.chart;

import static echopoint.google.chart.LineChart.PROPERTY_AXIS_STYLES;

/**
 * A default style class for the {@link echopoint.google.chart.LineChart}
 * component.
 *
 * @author Rakesh Vidyadharan 2009-05-19
 * @version $Id$
 */
public class LineChartStyle extends AdvancedChartStyle
{
  private static final long serialVersionUID = 1L;

  /** {@inheritDoc} */
  @Override
  protected void init()
  {
    super.init();

    set( PROPERTY_AXIS_STYLES, "0,00ff33,13,1|1,0033ff,13,-1" );
  }
}