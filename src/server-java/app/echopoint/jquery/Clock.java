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

package echopoint.jquery;

import nextapp.echo.app.*;
import echopoint.able.Sizeable;
import echopoint.able.Alignable;

/**
 * The <code>Clock</code> class is a <code>Component</code>
 * that presents the current time.
 * It is based on the jQuery plugin jClock
 *
 * @author Hans Holmlund - 2009-03-23
 * @version $Id$
 */
public class Clock extends Component implements Sizeable, Alignable {

    public static final String PROPERTY_INSETS = "insets";
    public static final String PROPERTY_BORDER = "border";

    /**
     * Returns the <code>Border</code> that encloses the entire <code>Clock</code>.
     *
     * @return the border
     */
    public Border getBorder() {
        return (Border) get(PROPERTY_BORDER);
    }

    /**
     * Returns the default inset between the border and cells of the
     * <code>Clock</code>. This value will be overridden for a child
     * component if a setting is specified in its <code>ColumnLayoutData</code>.
     *
     * @return the inset
     */
    public Insets getInsets() {
        return (Insets) get(PROPERTY_INSETS);
    }

         /**
     * Sets the <code>Border</code> that encloses the entire <code>Clock</code>.
     *
     * @param newValue the new border
     */
    public void setBorder(Border newValue) {
        set(PROPERTY_BORDER, newValue);
    }

    /**
     * Sets the inset between the border and cells of the <code>Clock</code>.
     * This value will be overridden for a child component if a setting is
     * specified in its <code>ColumnLayoutData</code>.
     *
     * @param newValue the new inset
     */
    public void setInsets(Insets newValue) {
        set(PROPERTY_INSETS, newValue);
    }

    /**
     * Sets the width extent of the Clock component.
     *
     * @param newValue - the new width extent of the Clock component
     */
    public void setWidth(Extent newValue) {
        set(PROPERTY_WIDTH,newValue);
    }

    /**
     * Returns the width extent of the Clock component.
     * @return the width extent of the Clock component.
     */
    public Extent getWidth() {
        return (Extent) get(PROPERTY_WIDTH);
    }

    /**
     * Sets the height extent of the Clock component.
     *
     * @param newValue - the new height extent of the Clock component
     */
    public void setHeight(Extent newValue) {
        set(PROPERTY_HEIGHT,newValue);
    }

    /**
     * Returns the height extent of Clock component.
     *
     * @return the height extent of Clock component.
     */
    public Extent getHeight() {
        return (Extent) get(PROPERTY_HEIGHT);
    }

        /**
     * Returns the alignment of the Clock component.
     *
     * @return the alignment
     */
    public Alignment getAlignment() {
        return (Alignment) get(PROPERTY_ALIGNMENT);
    }

    /**
     * Sets the alignment of the Clock component.
     *
     * @param newValue the new alignment
     */
    public void setAlignment(Alignment newValue) {
        set(PROPERTY_ALIGNMENT, newValue);
    }
}
