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

import nextapp.echo.webcontainer.*;
import nextapp.echo.webcontainer.service.JavaScriptService;
import nextapp.echo.extras.webcontainer.service.CommonService;
import nextapp.echo.app.util.Context;
import nextapp.echo.app.Component;
import nextapp.echo.app.update.ClientUpdateManager;

import java.util.Map;
import java.util.HashMap;
import java.util.Locale;

import echopoint.internal.AbstractPeer;

/**
 * Rendering peer for the {@link echopoint.jquery.DateField} component.
 *
 * @author Hans Holmlund 2009-04-06
 */
public class DateFieldPeer extends AbstractPeer {


    /** The component name for which this class is a peer. */
    private static final String COMPONENT_NAME = DateField.class.getName();


    /** The JS service files to load. */
    private static final String[] SERVICE_FILES =
            {
                    "resource/js/jquery/jquery.dynDateTime.pack.js",
                    "resource/js/jquery/jquery-CallbackContext.js",
                    "resource/js/jquery/lang/calendar-en.min.js",
                    "resource/js/jquery/Application.DateField.js",
                    "resource/js/jquery/Sync.DateField.js"
            };


    /** The associated client-side JavaScript module <code>Service</code>. */
    private static final Service COMPONENT_SERVICE =
            JavaScriptService.forResources(COMPONENT_NAME, SERVICE_FILES);

    static {
        WebContainerServlet.getServiceRegistry().add(COMPONENT_SERVICE);
    }


    private static final Map LOCALE_SERVICES = new HashMap();

    public DateFieldPeer() {
        super();
        addOutputProperty(DateField.DATE_CHANGED_PROPERTY);
    }

    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#getClientComponentType(boolean)
     */
    public String getClientComponentType(boolean shortType) {
        return COMPONENT_NAME;
    }

    /**
     * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#getComponentClass()
     */
    public Class getComponentClass() {
        return DateField.class;
    }

    /**
     * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#getInputPropertyClass(java.lang.String)
     */
    public Class getInputPropertyClass(String propertyName) {
        if (DateField.DATE_CHANGED_PROPERTY.equals(propertyName)) {
            return String.class;
        }
        return null;
    }

    /**
     * @see nextapp.echo.webcontainer.AbstractComponentSynchronizePeer#getOutputProperty(
     *      nextapp.echo.app.util.Context, nextapp.echo.app.Component, java.lang.String, int)
     */
    public Object getOutputProperty(Context context, Component component, String propertyName, int propertyIndex) {
        if (propertyName.equals(DateField.DATE_CHANGED_PROPERTY)) {
            DateField dateTimeSelect = (DateField) component;
            return dateTimeSelect.getDateStr();
        } else {
            return super.getOutputProperty(context, component, propertyName, propertyIndex);
        }
    }

    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#init(nextapp.echo.app.util.Context, Component)
     */
    public void init(final Context context, final Component component) {
        super.init(context, component);
        final ServerMessage serverMessage =
                (ServerMessage) context.get(ServerMessage.class);
        serverMessage.addLibrary(CommonService.INSTANCE.getId());
        serverMessage.addLibrary(COMPONENT_NAME);
    }

    /**
     * @see nextapp.echo.webcontainer.ComponentSynchronizePeer#storeInputProperty(Context, Component, String, int, Object)
     */
    public void storeInputProperty(Context context, Component component, String propertyName, int propertyIndex, Object newValue) {
        if (propertyName.equals(DateField.DATE_CHANGED_PROPERTY)) {
            ClientUpdateManager clientUpdateManager = (ClientUpdateManager) context.get(ClientUpdateManager.class);
            clientUpdateManager.setComponentProperty(component, DateField.DATE_CHANGED_PROPERTY, newValue);
        }
    }
}
