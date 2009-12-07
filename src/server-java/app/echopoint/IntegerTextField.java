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

/**
 * A simple regex text field that limits input to integer values only.  Note
 * that no bounds checking is performed on the input value.
 * 
 * @author perxi 2009-12-03
 * @version $Id$
 */
public class IntegerTextField extends RegexTextField
{
  private static final long serialVersionUID = 1L;

  /**
   * The standard integer regular expression to use.  Note that this cannot
   * be modified.
   *
   * {@value}
   */
  public static final String EXP = "^[0-9]*$";

  public IntegerTextField() { super.setRegex(EXP); }

  /**
    * Over-ridden to do nothing.  This component does not allow custom
    * regular expressions.
    *
    * @param regex The regular expression to use.
    */
  @Override
  public void setRegex( final String regex )
  {
    // No-op
  }
}
