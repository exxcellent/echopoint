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
  uniqueId: 20080627
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

/** The namespace for Google API related components. */
echopoint.google =
{
  /**
   * Maintains a unique id for the echopoint.google namespace.
   *
   * @type Number
   */
  uniqueId: 20080808
};

/** The namespace for internal comopnents of Google API related components. */
echopoint.google.internal =
{
  /**
   * Maintains a unique id for the echopoint.google.internal namespace.
   *
   * @type Number
   */
  uniqueId: 200808091
};

/** The namespace for model objects of Google API related components. */
echopoint.google.model =
{
  /**
   * Maintains a unique id for the echopoint.google.model namespace.
   *
   * @type Number
   */
  uniqueId: 200808092
};
