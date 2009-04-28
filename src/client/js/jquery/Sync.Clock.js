echopoint.constants.CLOCK = "echopoint.jquery.Clock";

/**
 * Component rendering peer: echopoint.jquery.Clock
 *
 * @version $ID$
 */

echopoint.ClockSync = Core.extend(Echo.Render.ComponentSync, {

    /** Properties defined for this component. */
    $static:
    {
        // Style attributes
        WIDTH: "width",
        HEIGHT: "height",
        ALIGNMENT: "alignment",
        INSETS: "insets",
        BORDER: "border",
        BACKGROUND: "background",
        FOREGROUND: "foreground",
        FONT: "font"
    },

    $load: function()
    {

        Echo.Render.registerPeer( echopoint.constants.CLOCK, this );
    },

    /**
     * Outermost/top-level container element.
     * @type Element
     */
    _clockdiv: null,


    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
        this._clockdiv = document.createElement("div");
        this._clockdiv.id = this.component.renderId;

        var width = this.component.render(echopoint.ClockSync.WIDTH);
        var height = this.component.render(echopoint.ClockSync.HEIGHT);
        if (width) {
            this._clockdiv.style.width = width;
        }
        else {
            this._clockdiv.style.width = "100%";
        }
        if (height) {
            this._clockdiv.style.height = height;
        }
        else {
            this._clockdiv.style.height = "100%";
        }
        Echo.Sync.Alignment.render(this.component.render(echopoint.ClockSync.ALIGNMENT), this._clockdiv, true, this.component);

        Echo.Sync.Insets.render(this.component.render(echopoint.ClockSync.INSETS), this._clockdiv, "padding");
        Echo.Sync.Border.render(this.component.render(echopoint.ClockSync.BORDER), this._clockdiv);
        parentElement.appendChild(this._clockdiv);
        this._renderRequired = true;
    },

    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
        this._clockdiv = null;
    },

    renderDisplay: function() {
        if (this._renderRequired) {
            this._renderRequired = false;
            var foreground = this.component.render(echopoint.ClockSync.FOREGROUND);
            var background = this.component.render(echopoint.ClockSync.BACKGROUND);

            jQuery("#"+this._clockdiv.id.replace('.', '\\.')).jclock();

            var font = this.component.render(echopoint.ClockSync.FONT);
            Echo.Sync.Color.renderClear(foreground, this._clockdiv, "color");
            Echo.Sync.Color.renderClear(background, this._clockdiv, "backgroundColor");
            Echo.Sync.Font.renderClear(font, this._clockdiv);
        }
    },

    /** @see Echo.Render.ComponentSync#renderUpdate */
    renderUpdate: function(update) {
        var containerElement = this._clockdiv.parentNode;
        Echo.Render.renderComponentDispose(update, update.parent);
        containerElement.removeChild(this._clockdiv);
        this.renderAdd(update, containerElement);
        return true;
    }


});