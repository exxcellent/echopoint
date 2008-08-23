/*
 * This file is part of the Echo Point Project.  This project is a
 * collection of Components that have extended the Echo Web Application
 * Framework Version 3.
 *
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 */

package echopoint;

import nextapp.echo.app.Column;
import nextapp.echo.app.Component;

/**
 * A component used to list the various echopoint components that are to be
 * tested.
 *
 * @author Rakesh 2008-06-24
 * @version $Id$
 */
public class ComponentList extends Column
{
  private static final long serialVersionUID = 1l;

  /**
   * The array of names of components that are to be tested.
   */
  protected static final String[] COMPONENTS =
      {
          "DirectHtml",
          "HtmlLabel",
          "HttpPane",
          "Strut",
          "TagCloud",
          "BarChart",
          "LineChart",
          "Sparkline",
          "ScatterPlot",
          "PieChart",
          "VennDiagram",
      };

  /**
   * Life-cycle method invoked when the component is added to the hierarchy.
   * Layouts out the components that are to be tested.
   *
   * @see #COMPONENTS
   * @see #createButton
   */
  @Override
  public void init()
  {
    removeAll();
    super.init();

    for ( String component : COMPONENTS )
    {
      add( createButton( component ) );
    }
  }

  /**
   * Create the control used to display the {@link DirectHtml} component.
   *
   * @param component The name of the component to test.
   * @return The component that triggers a test.
   */
  protected Component createButton( final String component )
  {
    return new MenuButton( component );
  }
}
