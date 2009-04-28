echopoint.constants.DATEFIELD = "echopoint.jquery.DateField";

/**
 * Component rendering peer: DateField.
 * @author HansH 2009-04-28
 * @version $ID$
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
        LANGUAGE: "language"
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
    _inputElem: null,
    _dateFormatPattern: null,

    /**
     * Actual focus state of component, based on received DOM focus/blur events.
     * @type Boolean
     */
//    _focused: false,


    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
        if (jQuery("#dateFieldCss").length == 0) {
            var stylesheet = this.component.render(echopoint.DateField.CSS);
            var styleElem = document.createElement("style");
            styleElem.type = "text/css";
            styleElem.id = "dateFieldCss";
            jQuery("head").append(styleElem);
            jQuery("#dateFieldCss").text(stylesheet);
        }

        this._dateTimediv = document.createElement("div");
        this._dateTimediv.id = this.component.renderId;

        Echo.Sync.Insets.render(this.component.render(echopoint.DateField.INSETS), this._dateTimediv, "padding");
        Echo.Sync.Border.render(this.component.render(echopoint.DateField.BORDER), this._dateTimediv);
        Echo.Sync.Alignment.render(this.component.render(echopoint.DateField.ALIGNMENT), this._dateTimediv, true, this.component);

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

        this._inputElem = document.createElement("input");
        this._inputElem.type= "text";
        if (!this.component.isRenderEnabled()) {
            this._inputElem.disabled = "disabled";
        }
        var font = this.component.render(echopoint.DateField.FONT);
        Echo.Sync.Font.renderClear(font, this._inputElem);
        this._dateTimediv.appendChild(this._inputElem);
        this._inputElem.id = this.component.renderId + "dateTime";

        var dateStr = this.component.get("date");
        if (dateStr) {
            this._inputElem.value = dateStr;
        }

        var imgElement = document.createElement("img");
        imgElement.id = this.component.renderId + "button";
        imgElement.style["margin"] = "0px 0px 0px 2px";
        Echo.Sync.ImageReference.renderImg(this.component.render(echopoint.DateField.BUTTONICON), imgElement);
        this._dateTimediv.appendChild(imgElement);

//        Core.Web.Event.add(this._inputElem, "focus", Core.method(this, this._processFocus), false);
//        Core.Web.Event.add(this._inputElem, "click", Core.method(this, this._processClick), false);
//        Core.Web.Event.add(this._inputElem, "blur", Core.method(this, this._processBlur), false);

        parentElement.appendChild(this._dateTimediv);
        this._renderRequired = true;
    },

    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
        this._dateTimediv = null;
        this._inputElem = null;
        this._dateFormatPattern = null;
    },

    /**
     * Processes a focus blur event.
     */
//    _processBlur: function(e) {
//        this._focused = false;
//        return this._storeValue();
//    },

    /**
     * Processes a focus event. Notifies application of focus.
     */
//    _processFocus: function(e) {
//        this._focused = true;
//        if (!this.client || !this.component.isActive()) {
//            return true;
//        }
//        this.client.application.setFocusedComponent(this.component);
//    },

    /** @see Echo.Render.ComponentSync#renderFocus */
//    renderFocus: function() {
//        if (this._focused) {
//            return;
//        }
//
//        this._focused = true;
//        Core.Web.DOM.focusElement(this._inputElem);
//    },

    /**
     * Processes a mouse click event. Notifies application of focus.
     */
//    _processClick: function(e) {
//        if (!this.client || !this.component.isActive()) {
//            return true;
//        }
//        this.client.application.setFocusedComponent(this.component);
//    },


    /**
     * Stores the selected date in the <code>Echo.Component</code> instance.
     */
    _storeValue: function(theCalendar) {
        this.component.set("date", theCalendar.date.print(this._dateFormatPattern));
        theCalendar.destroy();
    },

    renderDisplay: function() {
        if (this._renderRequired) {
            this._renderRequired = false;

            var foreground = this.component.render(echopoint.DateField.FOREGROUND);
            var background = this.component.render(echopoint.DateField.BACKGROUND);
            this._dateFormatPattern = this.component.render(echopoint.DateField.DATEFORMAT);

            if (this.component.isRenderEnabled()) {
                var useTime = this.component.render(echopoint.DateField.USETIME, false );
                var options = {
                    //                date: this._date,
                    onClose: jQuery.context(this).callback(this._storeValue),
                    showsTime: useTime,
                    //                debug: true,
                    ifFormat: this._dateFormatPattern,
                    button: ".next()" //next sibling
                };

                jQuery("#" + this._dateTimediv.id.replace('.', '\\.')).css(this.component.render(echopoint.DateField.CSS));
                jQuery("#" + this._inputElem.id.replace('.', '\\.')).dynDateTime(options);
            }

            Echo.Sync.Color.renderClear(foreground, this._dateTimediv, "color");
            Echo.Sync.Color.renderClear(background, this._dateTimediv, "backgroundColor");
        }
    },

    /** @see Echo.Render.ComponentSync#renderUpdate */
    renderUpdate: function(update) {
        var containerElement = this._dateTimediv.parentNode;
        Echo.Render.renderComponentDispose(update, update.parent);
        containerElement.removeChild(this._dateTimediv);
        this.renderAdd(update, containerElement);
        return true;
    }


});
