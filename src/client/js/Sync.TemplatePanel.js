echopoint.constants.TEMPLATEPANEL = "echopoint.TemplatePanel";

/**
 * Component rendering peer: echopoint.TemplatePanel
 *
 */


echopoint.TemplatePanelSync = Core.extend(Echo.Render.ComponentSync, {


    $load: function()
    {

        Echo.Render.registerPeer(echopoint.constants.TEMPLATEPANEL, this);
    },

    _containerDiv: null,

    parseXML: function(text) {

        var xmlDoc = null;

        try //Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(text);
            return xmlDoc;
        }
        catch(e)
        {
            try //Firefox, Mozilla, Opera, etc.
            {
                parser=new DOMParser();
                xmlDoc=parser.parseFromString(text,"text/xml");
                xmlDoc.async="false";                
                return xmlDoc;
            }
            catch(e) {
                alert(e.message)
            }
        }

        return xmlDoc;

    },


    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {

        this._containerDiv = document.createElement("div");
        this._containerDiv.style.outlineStyle = "none";

        this._containerDiv.id = this.component.renderId;
        parentElement.appendChild(this._containerDiv);

        // The number of components added to the TemplatePanel
        var componentCount = this.component.getComponentCount();
        // Contains the mapping between component names and render id
        var mappingXml = this.component.render("componentmapping");

        // The mapping document is parsed...
        var doc = this.parseXML(mappingXml);
        // ... and all mappings are stored in the array x
        x = doc.documentElement.childNodes;

        // Parse the xhtml template (surround template with div-tag to make sure the document contains a root tag).
        var templateDoc = this.parseXML("<div>" + this.component.render("templateDataSource") + "</div>");

        //var templateDoc = HTMLtoDOM("<div>" + this.component.render("template") + "</div>");

        // If the template contains a body-tag we need to remove it.
        var e = templateDoc.getElementsByTagName("body");

        if (e.length > 0)
        {
            // So we have a body element.
            var bodyElement = e[0];
            // Iterate over all children to the body element and add each child to the containerDiv
            for (var childIndex = 0; childIndex < bodyElement.childNodes.length; childIndex++)
            {
                var newNode = document._importNode(bodyElement.childNodes[childIndex], true);
                this._containerDiv.appendChild(newNode);
            }
        }
        else
        {
            // No body tag...
            var newNode = document._importNode(templateDoc.documentElement, true);
            // ... and thus append the template straight away.
            this._containerDiv.appendChild(newNode);
        }

        // Now find all component-tags (i.e. the placeholders for the child components).
        var cTags = this._containerDiv.getElementsByTagName("component");

        while (cTags.length > 0)
        {
            // For each component tag we need to find the component that should replace that placeholder.
            var templateComponentName = cTags[0].attributes.getNamedItem("name").nodeValue;

            for (i = 0; i < x.length; i++)
            {

                var mappingComponentRenderId = "C." + x[i].childNodes[0].nodeValue;
                var mappingComponentName = x[i].getAttribute("name");

                // Check if the name of the component in the mapping is what is expected in the template.
                if (mappingComponentName == templateComponentName)
                {
                    var component = null;

                    // Now let's find the component that matches the render id in the xml mapping
                    for (i = 0; i < componentCount; ++i) {

                        var child = this.component.getComponent(i);
                        if (child.renderId == mappingComponentRenderId)
                        {
                            // Now we've found the component to replace the placeholder with.
                            component = child;
                            break;
                        }
                    }

                    if (component != null)
                    {

                        var newDiv = document.createElement('div');
                        // Replace the placeholder (component-tag) with the newly created div.
                        cTags[0].parentNode.replaceChild(newDiv, cTags[0]);
                        // Add the component
                        Echo.Render.renderComponentAdd(update, component, newDiv);

                        break;
                    }

                }

            }
        }


    },

    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
        this._containerDiv = null;
    },

    /** @see Echo.Render.ComponentSync#renderUpdate */
    renderUpdate: function(update) {
        var element = this._containerDiv;
        var containerElement = element.parentNode;
        Echo.Render.renderComponentDispose(update, update.parent);
        containerElement.removeChild(element);
        this.renderAdd(update, containerElement);
        return true;
    }



});