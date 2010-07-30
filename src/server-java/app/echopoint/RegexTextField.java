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
import nextapp.echo.app.Font;
import nextapp.echo.app.Alignment;
import nextapp.echo.app.Color;

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
  public static final String PROPERTY_INVALID_MSG_ORIENTATION = "invalid_msg_orientation";
  public static final String PROPERTY_INVALID_MSG = "invalid_msg";
  public static final String PROPERTY_INVALID_MSG_BACKGROUND = "invalid_msg_background";  
  public static final String PROPERTY_INVALID_MSG_FOREGROUND = "invalid_msg_foreground";  
  public static final String PROPERTY_INVALID_BACKGROUND = "invalid_background";  
  public static final String PROPERTY_INVALID_FOREGROUND = "invalid_foreground";  
  public static final String PROPERTY_INVALID_MSG_ALIGNMENT = "invalid_msg_alignment";  
  public static final String PROPERTY_INVALID_MSG_WIDTH = "invalid_msg_width";
  public static final String PROPERTY_INVALID_MSG_FONT = "invalid_msg_font";

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
    final String old_regex = getRegex();
    set( PROPERTY_REGEX, regex );
    firePropertyChange(PROPERTY_REGEX, old_regex, regex);
  }

  public Alignment getInvalidMsgOrientation()
  {
    return (Alignment) get( PROPERTY_INVALID_MSG_ORIENTATION );
  }
  
  public String getInvalidMsg()
  {
    return (String) get( PROPERTY_INVALID_MSG );
  }

  public Color getInvalidMsgBackground()
  {  
    return (Color) get( PROPERTY_INVALID_MSG_BACKGROUND );
  }
 
  public Color getInvalidMsgForeground()
  {
    return (Color) get( PROPERTY_INVALID_MSG_FOREGROUND );
  }

  public Color getInvalidBackground()
  {
    return (Color) get( PROPERTY_INVALID_BACKGROUND );
  }

  public Color gettInvalidForeground()
  {
    return (Color) get( PROPERTY_INVALID_FOREGROUND );
  }

  public Alignment getInvalidMsgAlignment()
  {
    return (Alignment) get( PROPERTY_INVALID_MSG_ALIGNMENT );
  }

  public int getInvalidMsgWidth()
  {
    Integer value = (Integer) get(PROPERTY_INVALID_MSG_WIDTH);
    return value == null ? -1 : value.intValue();
  }

  public Font getInvalidMsgFont()
  {
    return (Font) get( PROPERTY_INVALID_MSG_FONT );
  }

  public void setInvalidMsgOrientation( Alignment orientation )
  {
    set( PROPERTY_INVALID_MSG_ORIENTATION, orientation  );
  }
  
  public void setInvalidMsg( String invalid_msg )
  {
    set( PROPERTY_INVALID_MSG, invalid_msg);
  }

  public void setInvalidMsgBackground( Color inv_msg_background )
  {  
    set( PROPERTY_INVALID_MSG_BACKGROUND, inv_msg_background );
  }

  public void setInvalidMsgForeground( Color inv_msg_foreground )
  {
    set( PROPERTY_INVALID_MSG_FOREGROUND, inv_msg_foreground );
  }

  public void setInvalidBackground( Color inv_background )
  {
    set( PROPERTY_INVALID_BACKGROUND, inv_background );
  }

  public void setInvalidForeground( Color inv_foreground )
  {
    set( PROPERTY_INVALID_FOREGROUND, inv_foreground );
  }

  public void setInvalidMsgAlignment( Alignment align )
  {
    set( PROPERTY_INVALID_MSG_ALIGNMENT, align );
  }

  public void setInvalidMsgWidth( int width )
  {
    set( PROPERTY_INVALID_MSG_WIDTH, width );
  }

  public void setInvalidMsgFont( Font font )
  {
    set( PROPERTY_INVALID_MSG_FONT, font );
  }

}
