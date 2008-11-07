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
package echopoint.tucana;

import nextapp.echo.app.Color;
import nextapp.echo.app.Border;

/**
 * A custom progress bar component with default styles to use with the file
 * upload component.
 *
 * <p><b>Note:</b> Development of this component was sponsored by <a
 * href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Broadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * @author Rakesh 2008-11-6
 * @version $Id$
 */
public class ProgressBar extends echopoint.ProgressBar
{
  private static final long serialVersionUID = 1l;

  /** Create a default styled progress bar. */
  public ProgressBar()
  {
    setBackground( new Color( 0xcfcfcf ) );
    setForeground( new Color( 0xffffff ) );
    setBarBackground( new Color( 0x1a428a ) );
    setBorder( new Border( 1, Color.BLACK, Border.STYLE_INSET ) );
  }
}
