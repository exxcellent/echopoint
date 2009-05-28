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

package echopoint.style.echo.extras;

import echopoint.style.AbstractStyle;
import static echopoint.style.echo.extras.ResourceImages.AccordionPaneTabRollover;
import static echopoint.style.echo.extras.ResourceImages.AccordionPaneTabBackground;
import static echopoint.util.ColorKit.makeColor;
import static nextapp.echo.extras.app.AccordionPane.PROPERTY_TAB_BACKGROUND;
import static nextapp.echo.extras.app.AccordionPane.PROPERTY_TAB_BACKGROUND_IMAGE;
import static nextapp.echo.extras.app.AccordionPane.PROPERTY_TAB_BORDER;
import static nextapp.echo.extras.app.AccordionPane.PROPERTY_TAB_ROLLOVER_BACKGROUND;
import static nextapp.echo.extras.app.AccordionPane.PROPERTY_TAB_ROLLOVER_BACKGROUND_IMAGE;
import static nextapp.echo.extras.app.AccordionPane.PROPERTY_TAB_ROLLOVER_ENABLED;
import nextapp.echo.app.Border;
import nextapp.echo.app.FillImage;

/**
 * The default style to apply to {@link nextapp.echo.extras.app.AccordionPane}
 * components.
 *
 * @author Rakesh Vidyadharan 2009-05-26
 * @version $Id$
 */
public class AccordionPaneStyle extends AbstractStyle
{
  private static final long serialVersionUID = 1L;

  /** {@inheritDoc} */
  @Override
  protected void init()
  {
    super.init();

    set( PROPERTY_TAB_BACKGROUND, makeColor( "#514f58" ) );
    set( PROPERTY_TAB_BACKGROUND_IMAGE,
        new FillImage( AccordionPaneTabBackground ) );
    set( PROPERTY_TAB_BORDER,
        new Border( 1, makeColor( "#272727" ), Border.STYLE_OUTSET ) );

    set( PROPERTY_TAB_ROLLOVER_BACKGROUND, makeColor( "#86899a" ) );
    set( PROPERTY_TAB_ROLLOVER_BACKGROUND_IMAGE,
        new FillImage( AccordionPaneTabRollover ) );
    set( PROPERTY_TAB_ROLLOVER_ENABLED, true );
  }
}
