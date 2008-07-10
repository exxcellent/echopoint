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

import nextapp.echo.app.ApplicationInstance;
import nextapp.echo.webcontainer.WebContainerServlet;

/**
 * The web container servlet implementation of the test application.
 *
 * @author Rakesh 2008-06-24
 * @version $Id$
 */
public class Servlet extends WebContainerServlet
{
  private static final long serialVersionUID = 1l;

  /**
   * The mandatory method that is to be implemented.  Returns a new
   * instance of {@link Application}.
   *
   * @return ApplicationInstance The appropriate implementation of
   *   {@link nextapp.echo.app.ApplicationInstance} for this web application.
   */
  public ApplicationInstance newApplicationInstance()
  {
    return new Application();
  }
}
