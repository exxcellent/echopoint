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

import echopoint.internal.TextField;

/**
 * A text field that enforces a user supplied regular expression on a key
 * press.  Allows creation of serial number field, character only field etc.
 *
 * <p>The following shows sample use of this class.</p>
 * <pre>
 *  import nextapp.echo.app.TextField;
 *  import echopoint.RegexTextField;
 *
 *    ...
 *    // Create a field that allow real numbers with two digit fractional part
 *    final TextField tf = new RegexTextField( "^[\\d]+[.]{0,1}[\\d]{1,2}$" );
 * </pre>
 *
 * <p><b>Note:</b> It is recommended that you test the regular expression
 * using a simple test html page in your browser of choice before you set
 * it for the component.  This is to ensure that the expression you specify
 * is valid and behaves the way you want it to work.</p>
 *
 * <pre>
 * &lt;html&gt;
 *   &lt;head&gt;
 *     &lt;title&gt;RegExp Test&lt;/title&gt;
 *     &lt;script type='text/javascript'&gt;
 *       function check( event )
 *       {
 *         event = (event) ? event : window.event;
 *         var charCode = (event.which) ? event.which : event.keyCode;
 *         var status = true;
 *
 *         if ( charCode &lt;= 31 )
 *         {
 *           status = true;
 *           return status;
 *         }
 *
 *         var regexString = "^[A-Z]{1,1}[a-z]*$";
 *         var regex = new RegExp( regexString );
 *         var input = document.getElementById( 'textField' );
 *         var value = input.value + String.fromCharCode( charCode );
 *         status = regex.test( value );
 *
 *         return status;
 *       }
 *     &lt;/script&gt;
 *   &lt;/head&gt;
 *   &lt;body&gt;
 *     &lt;input id='textField' type='text' onkeypress='return check(event)' /&gt;
 *   &lt;/body&gt;
 * &lt;/html&gt;
 * </pre>
 *
 * @author Rakesh 2009-03-08
 * @version $Id$
 */
public class RegexTextField extends TextField
{
  private static final long serialVersionUID = 1l;

  /**
   * The regular expression to specify.  Note that the string value is used
   * to create a new {@code RegExp} JavaScript object and hence the expression
   * must be escaped as you would when compiling a Java regex pattern.
   * This property may also be styled.
   */
  public static final String PROPERTY_REGEX = "regex";

  /** Default constructor.  Not particularly useful. */
  public RegexTextField() {}

  /**
   * Create a new text field with the specified regex pattern.
   *
   * @param regex The regular expression to use.
   */
  public RegexTextField( final String regex )
  {
    setRegex( regex );
  }

  /**
   * Return the regular expression in use for the field ({@link
   * #PROPERTY_REGEX}).
   *
   * @return The regular expression in use.
   */
  public String getRegex()
  {
    return (String) get( PROPERTY_REGEX );
  }

  /**
   * Set the regular expression pattern ({@link #PROPERTY_REGEX}) to use to
   * restrict input into this * field.  This value may also be styled.
   *
   * @param regex The regular expression to use.
   */
  public void setRegex( final String regex )
  {
    set( PROPERTY_REGEX, regex );
  }
}
