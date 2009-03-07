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
/**
 * The core library for the echopoint components.  Sets up the core namespaces
 * and constants for use.
 *
 * @author Rakesh 2008-06-20
 * @version $Id$
 */

/**
 * The echopoint namespace to contain all components and rendering peers.
 */
echopoint =
{
  /**
   * Maintains a unique id for the echopoint namespace.
   *
   * @type Number
   */
  uniqueId: 20080623
};

/**
 * The namespace for holding internal implementation classes.  Used typically
 * to hold abstract super-classes for components exposed by the library.
 */
echopoint.internal =
{
  /**
   * Maintains a unique id for the echopoint.internal namespace.
   *
   * @type Number
   */
  uniqueId: 20080627,

  /** A simple model object that represents dimensions on screen. */
  PageDimensions: Core.extend(
  {
    pageHeight: null,
    pageWidth: null,
    windowHeight: null,
    windowWidth: null,

    $construct: function( pheight, pwidth, wheight, wwidth )
    {
      this.pageHeight = pheight;
      this.pageWidth = pwidth;
      this.windowHeight = wheight;
      this.windowWidth = wwidth;
    }
  }),

  /**
   * Code taken from : Lightbox JS: Fullsize Image Overlays
   * by Lokesh Dhakar - http://www.huddletogether.com
   * Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
   */
  getPageDimensions: function()
  {
    var xScroll, yScroll, windowWidth, windowHeight, pageWidth, pageHeight;

    if ( window.innerHeight && window.scrollMaxY )
    {
      xScroll = document.body.scrollWidth;
      yScroll = window.innerHeight + window.scrollMaxY;
    }
    else if ( document.body.scrollHeight > document.body.offsetHeight )
    { // all but Explorer Mac
      xScroll = document.body.scrollWidth;
      yScroll = document.body.scrollHeight;
    }
    else
    { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
      xScroll = document.body.offsetWidth;
      yScroll = document.body.offsetHeight;
    }

    if ( self.innerHeight )
    { // all except Explorer
      windowWidth = self.innerWidth;
      windowHeight = self.innerHeight;
    }
    else if ( document.documentElement && document.documentElement.clientHeight )
    { // Explorer 6 Strict Mode
      windowWidth = document.documentElement.clientWidth;
      windowHeight = document.documentElement.clientHeight;
    }
    else if ( document.body )
    { // other Explorers
      windowWidth = document.body.clientWidth;
      windowHeight = document.body.clientHeight;
    }

    // for small pages with total height less then height of the viewport
    if ( yScroll < windowHeight )
    {
      pageHeight = windowHeight;
    }
    else
    {
      pageHeight = yScroll;
    }

    // for small pages with total width less then width of the viewport
    if ( xScroll < windowWidth )
    {
      pageWidth = windowWidth;
    }
    else
    {
      pageWidth = xScroll;
    }

    return new echopoint.internal.PageDimensions(
        pageWidth, pageHeight, windowWidth, windowHeight );
  }
};

/**
 * The namespace for holding constants used by the framework.  Constants
 * are defined for the various component names to ensure proper usage
 * in registering the components and their peers.
 */
echopoint.constants =
{
  /**
   * Maintains a unique id for the echopoint.constants namespace.
   *
   * @type Number
   */
  uniqueId: 20080624
};

/** The namespace for client-side model objects. */
echopoint.model =
{
   /**
   * Maintains a unique id for the echopoint.model namespace.
   *
   * @type Number
   */
  uniqueId: 20080720
};

/** The root namespace for Google API related components. */
echopoint.google =
{
  /**
   * Maintains a unique id for the echopoint.google.chart namespace.
   *
   * @type Number
   */
  uniqueId: 20080808
};

/** The namespace for Google API related components. */
echopoint.google.chart =
{
  /**
   * Maintains a unique id for the echopoint.google.chart namespace.
   *
   * @type Number
   */
  uniqueId: 20080829
};

/** The namespace for internal comopnents of Google API related components. */
echopoint.google.chart.internal =
{
  /**
   * Maintains a unique id for the echopoint.google.chart.internal namespace.
   *
   * @type Number
   */
  uniqueId: 200808091
};

/** The namespace for model objects of Google API related components. */
echopoint.google.chart.model =
{
  /**
   * Maintains a unique id for the echopoint.google.chart.model namespace.
   *
   * @type Number
   */
  uniqueId: 200808092
};

/** The namespace for tucana components ported to Echo3. */
echopoint.tucana =
{
  /**
   * Maintains a unique id for the echopoint.tucana namespace.
   *
   * @type Number
   */
  uniqueId: 20081030
};
