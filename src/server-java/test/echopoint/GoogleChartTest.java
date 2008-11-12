package echopoint;

import echopoint.google.chart.model.ChartData;
import nextapp.echo.app.Component;

/**
 * <p>&copy; Copyright 2008 <a href='http://sptci.com/' target='_top'>Sans
 * Pareil Technologies, Inc.</a></p>
 *
 * @author Rakesh Vidyadharan 2008-11-12
 * @version $Id$
 */
public abstract class GoogleChartTest<C extends Component> extends AbstractTest<C>
{
  private static ThreadLocal<ChartData<Integer>> data =
      new ThreadLocal<ChartData<Integer>>();

  protected static void setData( final ChartData<Integer> data )
  {
    GoogleChartTest.data.set( data );
  }

  protected static ChartData<Integer> getData()
  {
    return data.get();
  }
}
