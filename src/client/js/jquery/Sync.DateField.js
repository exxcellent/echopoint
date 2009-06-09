echopoint.constants.DATEFIELD = "echopoint.jquery.DateField";

/**
 * Component rendering peer: DateField.
 * @author HansH 2009-04-28
 * @version $Id$
 */
echopoint.DateField = Core.extend(Echo.Render.ComponentSync, {

    /** Properties defined for this component. */
    $static:
    {
        // Style attributes
        WIDTH: "width",
        HEIGHT: "height",
        INSETS: "insets",
        BORDER: "border",
        FONT: "font",
        BACKGROUND: "background",
        FOREGROUND: "foreground",
        BUTTONICON: "icon",
        ALIGNMENT: "alignment",
        DATEFORMAT: "dateFormat",
        USETIME: "useTime",
        CSS: "css",
        LANGUAGE: "language",
        INPUTWIDTH: "inputWidth",
        INPUTHEIGHT: "inputHeight"
    },

    $load: function()
    {

        Echo.Render.registerPeer(echopoint.constants.DATEFIELD, this);
    },

    /**
     * Outermost/top-level container element.
     * @type Element
     */
    _dateTimediv: null,
    _calendardiv: null,
    _dateFormatPattern: null,
    _calendarVisible: null,

    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
        this._dateTimediv = document.createElement("div");
        this._dateTimediv.id = this.component.renderId;

        Echo.Sync.Insets.render(this.component.render(echopoint.DateField.INSETS), this._dateTimediv, "padding");
        Echo.Sync.Border.render(this.component.render(echopoint.DateField.BORDER), this._dateTimediv);
        Echo.Sync.Alignment.render(this.component.render(echopoint.DateField.ALIGNMENT), this._dateTimediv, true, this.component);
        this._dateTimediv.style.overflow = "visible";
        this._dateTimediv.style.position = "relative";

        var width = this.component.render(echopoint.DateField.WIDTH);
        var height = this.component.render(echopoint.DateField.HEIGHT);
        if (width) {
            this._dateTimediv.style.width = width;
        }
//        else {
//            this._dateTimediv.style.width = "100%";
//        }
        if (height) {
            this._dateTimediv.style.height = height;
        }
//        else {
//            this._dateTimediv.style.height = "100%";
//        }

        var inputElem = document.createElement("input");
        inputElem.style.overflow = "visible";
        inputElem.type= "text";
        if (!this.component.isRenderEnabled()) {
            inputElem.disabled = "disabled";
        }
        var inputWidth = this.component.render(echopoint.DateField.INPUTWIDTH);
        var inputHeight = this.component.render(echopoint.DateField.INPUTHEIGHT);
        if (inputWidth) {
            inputElem.style.width = inputWidth;
        }
        if (inputHeight) {
            inputElem.style.height = inputHeight;
        }

        var font = this.component.render(echopoint.DateField.FONT);
        if (font) {
            Echo.Sync.Font.renderClear(font, inputElem);
        }
        this._dateTimediv.appendChild(inputElem);
        inputElem.id = this.component.renderId + "dateTime";

        var dateStr = this.component.get("date");
        if (dateStr) {
            inputElem.value = dateStr;
        }

        var imgElement = document.createElement("img");
        imgElement.id = this.component.renderId + "button";
        imgElement.style["margin"] = "0px 0px 0px 2px";
        imgElement.style.overflow = "visible";
        Echo.Sync.ImageReference.renderImg(this.component.render(echopoint.DateField.BUTTONICON), imgElement);
        Core.Web.Event.add(imgElement, "click", Core.method(this, this._processClick), false);
        this._dateTimediv.appendChild(imgElement);

        this._calendardiv = document.createElement("div");
        this._dateTimediv.appendChild(this._calendardiv);
        this._calendardiv.id = this.component.renderId + "cal";
        this._calendardiv.style.display = "none";
        this._calendardiv.style.overflow = "visible";
        this._calendardiv.style.position = "absolute";
        this._calendardiv.style.zIndex = 99;
        this._calendarVisible = false;

        parentElement.appendChild(this._dateTimediv);
        this._renderRequired = true;
    },

    _processClick: function(e) {
        if (!this._calendarVisible) {
            this._calendardiv.style.display = "block";
            this._calendarVisible = true;
        }
        else {
            this._calendardiv.style.display = "none";
            this._calendarVisible = false;
        }
    },

    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
        this._dateTimediv = null;
        this._dateFormatPattern = null;
    },

    /**
     * Stores the selected date in the <code>Echo.Component</code> instance.
     */
    _storeValue: function(theCalendar) {
        this.component.set("date", theCalendar.date.print(this._dateFormatPattern));
    },

    renderDisplay: function() {
        if (this._renderRequired) {
            this._renderRequired = false;

            if (jQuery("#dateFieldCss").length == 0) {
                var stylesheet = this.component.render(echopoint.DateField.CSS);
                jQuery("head").append("<style type=\"text/css\" id=\"dateFieldCss\">"+stylesheet+"</style>");
            }

            var foreground = this.component.render(echopoint.DateField.FOREGROUND);
            var background = this.component.render(echopoint.DateField.BACKGROUND);
            this._dateFormatPattern = this.component.render(echopoint.DateField.DATEFORMAT);

            if (this.component.isRenderEnabled()) {
                var useTime = this.component.render(echopoint.DateField.USETIME, false );
                var options = {
                    onUpdate: jQuery.context(this).callback(this._storeValue),
                    showsTime: useTime,
//                    eventName: "click",
//                    singleClick: true,
                    //                debug: true,
                    ifFormat: this._dateFormatPattern,
                    flat: ".next().next()"
//                    button: ".next()" //next sibling
                };


                jQuery("#" + this._dateTimediv.id.replace('.', '\\.') + " input").dynDateTime(options);
            }

            Echo.Sync.Color.renderClear(foreground, this._dateTimediv, "color");
            Echo.Sync.Color.renderClear(background, this._dateTimediv, "backgroundColor");
        }
    },

    /** @see Echo.Render.ComponentSync#renderUpdate */
    renderUpdate: function(update) {
        var fullRender = update.hasUpdatedProperties();
        if (fullRender) {
            var element = this._dateTimediv;
            var containerElement = element.parentNode;
            containerElement.removeChild(element);
            Echo.Render.renderComponentDispose(update, update.parent);
            this.renderAdd(update, containerElement);
        }
        return fullRender;
    }


});
