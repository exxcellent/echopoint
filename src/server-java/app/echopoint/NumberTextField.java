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
 * A simple extension of {@link RegexTextField} that allows only
 * numeric characters and one period ({@code .}) to be entered.  The  precision
 * (number of fractional digits may be controlled using the {@link
 * #setPrecision} method.
 *
 * @author Rakesh 2009-03-07
 * @version $Id$
 */
public class NumberTextField extends RegexTextField
{
  private static final long serialVersionUID = 1l;

  public static final String PROPERTY_PRECISION = "precision";

  /**
   * Return the value of the {@link #PROPERTY_PRECISION} property.  This
   * indicates the number of fractional digits allowed in the number.
   *
   * @return The precision or {@code -1} if not set.
   */
  public int getPrecision()
  {
    int precision = -1;

    Object value = get( PROPERTY_PRECISION );
    if ( value != null )
    {
      precision = (Integer) value;
    }

    return precision;
  }

  /**
   * Set the value of the {@link #PROPERTY_PRECISION} property.
   *
   * @param precision The maximum number of fractional digits.
   */
  public void setPrecision( final int precision )
  {
    set( PROPERTY_PRECISION, precision );
  }

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
