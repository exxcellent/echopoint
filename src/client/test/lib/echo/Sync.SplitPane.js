/**
 * Component rendering peer: SplitPane
 */
Echo.Sync.SplitPane = Core.extend(Echo.Render.ComponentSync, {

    $static: {
    
        /**    
         * @class Describes the configuration of a child pane of the SplitPane,
         *        including the child component and scroll bar positions.
         */
        ChildPane: Core.extend({
        
            minimumSize: 0,
            maximumSize: null,
            component: null,
            layoutData: null,
            scrollLeft: 0,
            scrolltop: 0,
            _permanentSizes: false,
            _peer: null,
        
            /**
             * Creates a new PaneConfiguration instance
             * 
             * @param {Echo.Sync.SplitPane} splitPanePeer the relevant componentPeer
             * @param {Echo.Component} component the child component
             */
            $construct: function(splitPanePeer, component) {
                this._peer = splitPanePeer;
                this.component = component;
                this.layoutData = component.render("layoutData");
            },
            
            /**
             * Load minimum and maximum separator positions for panes.
             */
            loadDisplayData: function() {
                if (this._permanentSizes) {
                    // Pane size constraints have been loaded for this ChildPane, and will not ever change
                    // (because they are pixel rather percent-based.
                    return;
                }
                
                var size;
                this._permanentSizes = true;
                if (this.layoutData) {
                    if (this.layoutData.minimumSize) {
                        if (Echo.Sync.Extent.isPercent(this.layoutData.minimumSize)) {
                            size = this._peer._getSize();
                            this.minimumSize = Math.round((this._peer._orientationVertical ? size.height : size.width) *
                                    parseInt(this.layoutData.minimumSize, 10) / 100);
                            this._permanentSizes = false;
                        } else {
                            this.minimumSize = Math.round(Echo.Sync.Extent.toPixels(this.layoutData.minimumSize, 
                                    !this._peer._orientationVertical));
                        }
                    }
                    if (this.layoutData.maximumSize) {
                        if (Echo.Sync.Extent.isPercent(this.layoutData.maximumSize)) {
                            size = this._peer._getSize();
                            this.maximumSize = Math.round((this._peer._orientationVertical ? size.height : size.width) *
                                    parseInt(this.layoutData.maximumSize, 10) / 100);
                            this._permanentSizes = false;
                        } else {
                            this.maximumSize = Math.round(Echo.Sync.Extent.toPixels(this.layoutData.maximumSize, 
                                    !this._peer._orientationVertical));
                        }
                    }
                }
            },
            
            loadScrollPositions: function(paneDiv) {
                paneDiv.scrollLeft = this.scrollLeft;
                paneDiv.scrollTop = this.scrollTop;
            },
            
            storeScrollPositions: function(paneDiv) {
                this.scrollLeft = paneDiv.scrollLeft;
                this.scrollTop = paneDiv.scrollTop;
            }
        })
    },

    $load: function() {
        Echo.Render.registerPeer("SplitPane", this);
    },

    /**
     * Array containing two PaneConfiguration instances, representing the state of each child pane.
     * @type Array
     */
    _childPanes: null,
    _paneDivs: null,
    _separatorDiv: null,
    _autoPositioned: false,
    
    /**
     * Flag indicating whether the renderDisplay() method must be invoked on this peer 
     * (and descendant component peers).
     */
    _redisplayRequired: false,
    
    /**
     * The user's desired position of the separator.  This is the last
     * position to which the user dragged the separator or the last position
     * that the separator was explicitly set to.  This value may not be the
     * actual separator position, in cases where other constraints have
     * temporarily adjusted it.
     * This is value is retained such that if constraints are lifted, the 
     * separator position will return to where the user last preferred it.
     * 
     * @type Extent
     */
    _requested: null,
    
    /**
     * Current rendered separator position.
     * @type Number
     */
    _rendered: null,

    _processSeparatorMouseMoveRef: null,
    _processSeparatorMouseUpRef: null,
    _processImageLoadRef: null,
    _initialAutoSizeComplete: null,
    
    /**
     * The rendered size of the SplitPane outer DIV.  This value is lazily loaded by
     * _getSize(), thus it should always be retrieved by invoking _getSize().
     * This property will be cleared any time the size changes.
     */
    _size: null,

    $construct: function() {
        this._childPanes = new Array(2);
        this._paneDivs = new Array(2);
        this._processSeparatorMouseMoveRef = Core.method(this, this._processSeparatorMouseMove);
        this._processSeparatorMouseUpRef = Core.method(this, this._processSeparatorMouseUp);
    },
    
    /**
     * Converts a desired separator position into a render-able separator position that
     * complies with the SplitPane's separator bounds (miniumSize and maximumSize of child
     * component layout data).
     * 
     * @param {Number} position requested separator position
     * @return the bounded separator position
     * @type Number
     */
    _getBoundedSeparatorPosition: function(position) {
        if (this._childPanes[1]) {
            var totalSize = this._orientationVertical ? this._getSize().height : this._getSize().width;
            if (position > totalSize - this._childPanes[1].minimumSize - this._separatorSize) {
                position = totalSize - this._childPanes[1].minimumSize - this._separatorSize;
            } else if (this._childPanes[1].maximumSize != null
                    && position < totalSize - this._childPanes[1].maximumSize - this._separatorSize) {
                position = totalSize - this._childPanes[1].maximumSize - this._separatorSize;
            }
        }
        if (this._childPanes[0]) {
            if (position < this._childPanes[0].minimumSize) {
                position = this._childPanes[0].minimumSize;
            } else if (this._childPanes[0].maximumSize != null && position > this._childPanes[0].maximumSize) {
                position = this._childPanes[0].maximumSize;
            }
        }
        return position;
    },
    
    /**
     * Determines the number of pixels of inset margin specified in a layout data object.
     * Horizontal or vertical pixels will be analyzed based on the SplitPane's orientation.
     * The result of this method can be subtracted from the desired height or width of a pane
     * to determine the appropriate value to set for a CSS width/height attribute.
     * 
     * @param {Object} layoutData a component layout data object
     * @return the number of inset pixels
     * @type Number 
     */
    _getInsetsSizeAdjustment: function(position, layoutData) {
        if (!layoutData || layoutData.insets == null) {
            return 0;
        }
        var layoutDataInsets = Echo.Sync.Insets.toPixels(layoutData.insets);
        var adjustment;
        if (this._orientationVertical) {
            adjustment = layoutDataInsets.top + layoutDataInsets.bottom;
        } else {
            adjustment = layoutDataInsets.left + layoutDataInsets.right;
        }
        if (position != null && adjustment > position) {
            adjustment = position;
        }
        return adjustment;
    },
    
    getPreferredSize: function(dimension) {
        if (this.component.children.length === 0) {
            return null;
        }
        
        var bounds;
        
        dimension = dimension || (Echo.Render.ComponentSync.SIZE_WIDTH | Echo.Render.ComponentSync.SIZE_HEIGHT);        

        // Determine size of pane 0.
        var size0;
        if (this.component.children[0].peer.getPreferredSize) {
            // Use getPreferredSize() if available.
            size0 = this.component.children[0].peer.getPreferredSize(dimension);
        } else if (!this.component.children[0].pane && (dimension & Echo.Render.ComponentSync.SIZE_HEIGHT)) {
            // Measure height of non-pane child (assuming height is being requested).
            bounds = new Core.Web.Measure.Bounds(this._paneDivs[0]);
            size0 = { height: bounds.height === 0 ? null : bounds.height };
        } else {
            // Pane 0 cannot be measured.
            size0 = { };
        }

        // Determine size of pane 1.
        var size1;
        if (this.component.children.length == 1) {
            // Pane 1 does not exist.
            size1 = { width: 0, height: 0 };
        } else if (this.component.children[1].peer.getPreferredSize) {
            // Use getPreferredSize() if available.
            size1 = this.component.children[1].peer.getPreferredSize(dimension);
        } else if (!this.component.children[1].pane && (dimension & Echo.Render.ComponentSync.SIZE_HEIGHT)) {
            // Measure height of non-pane child (assuming height is being requested).
            bounds = new Core.Web.Measure.Bounds(this._paneDivs[1]);
            size1 = { height: bounds.height === 0 ? null : bounds.height };
        } else {
            // Pane 1 cannot be measured.
            size1 = { };
        }
        
        var height = null;
        if ((dimension & Echo.Render.ComponentSync.SIZE_HEIGHT) && size0.height != null && size1.height != null) {
            if (this._orientationVertical) {
                // Measure height of vertical SplitPane: sum pane heights and separator.
                height = size0.height + size1.height + this._separatorSize;
            } else {
                // Measure height of horizontal SplitPane: use maximum pane height.
                height = size0.height > size1.height ? size0.height : size1.height;
            }
        }
        
        var width = null;
        if ((dimension & Echo.Render.ComponentSync.SIZE_WIDTH) && size0.width != null && size1.width != null) {
            if (this._orientationVertical) {
                // Measure width of vertical SplitPane: use maximum pane width.
                width = size0.width > size1.width ? size0.width : size1.width;
            } else {
                // Measure width of horizontal SplitPane: sum pane widths and separator.
                width = size0.width + size1.width + this._separatorSize;
            }
        }
        
        return { height: height, width: width };
    },
    
    /**
     * Retrieves the (potentially cached) dimensions of the SplitPane outer DIV.
     */
    _getSize: function() {
        if (!this._size) {
            this._size = new Core.Web.Measure.Bounds(this._splitPaneDiv);
        }
        return this._size;
    },
    
    /**
     * Determines if the specified update has caused either child of the SplitPane to
     * be relocated (i.e., a child which existed before continues to exist, but at a
     * different index).
     * 
     * @param {Echo.Update.ComponentUpdate} update the component update
     * @return true if a child has been relocated
     * @type Boolean
     */
    _hasRelocatedChildren: function(update) {
        var oldChild0 = this._childPanes[0] ? this._childPanes[0].component : null; 
        var oldChild1 = this._childPanes[1] ? this._childPanes[1].component : null; 
        var childCount = this.component.getComponentCount();
        var newChild0 = childCount > 0 ? this.component.getComponent(0) : null;
        var newChild1 = childCount > 1 ? this.component.getComponent(1) : null;
        return (oldChild0 != null && oldChild0 == newChild1) || 
                (oldChild1 != null && oldChild1 == newChild0);
    },

    /**
     * Perform tasks for the initial render display phase of an auto-sized SplitPane.
     */
    _initialAutoSize: function() {
        this._registerSizingImageLoadListeners(this._paneDivs[0]);
    },
    
    /**
     * Retrieves properties from Echo.SplitPane component instances and
     * stores them in local variables in a format more convenient for processing
     * by this synchronization peer.
     */
    _loadRenderData: function() {
        var orientation = this.component.render("orientation", 
                Echo.SplitPane.ORIENTATION_HORIZONTAL_LEADING_TRAILING);
        // FIXME: RTL is hardcoded to false.
        var rtl = false;
     
        switch (orientation) {
        case Echo.SplitPane.ORIENTATION_HORIZONTAL_LEADING_TRAILING:
            this._orientationTopLeft = !rtl;
            this._orientationVertical = false;
            break;
        case Echo.SplitPane.ORIENTATION_HORIZONTAL_TRAILING_LEADING:
            this._orientationTopLeft = rtl;
            this._orientationVertical = false;
            break;
        case Echo.SplitPane.ORIENTATION_HORIZONTAL_LEFT_RIGHT:
            this._orientationTopLeft = true;
            this._orientationVertical = false;
            break;
        case Echo.SplitPane.ORIENTATION_HORIZONTAL_RIGHT_LEFT:
            this._orientationTopLeft = false;
            this._orientationVertical = false;
            break;
        case Echo.SplitPane.ORIENTATION_VERTICAL_TOP_BOTTOM:
            this._orientationTopLeft = true;
            this._orientationVertical = true;
            break;
        case Echo.SplitPane.ORIENTATION_VERTICAL_BOTTOM_TOP:
            this._orientationTopLeft = false;
            this._orientationVertical = true;
            break;
        default:
            throw new Error("Invalid orientation: " + orientation);
        }

        this._resizable = this.component.render("resizable");
        this._autoPositioned = this.component.render("autoPositioned");
        this._requested = this.component.render("separatorPosition");

        var defaultSeparatorSize = this._resizable ? Echo.SplitPane.DEFAULT_SEPARATOR_SIZE_RESIZABLE : 
                Echo.SplitPane.DEFAULT_SEPARATOR_SIZE_FIXED;
        var separatorSizeExtent = this.component.render(
                this._orientationVertical ? "separatorHeight" : "separatorWidth", defaultSeparatorSize);
        this._separatorSize = Echo.Sync.Extent.toPixels(separatorSizeExtent, this._orientationVertical);
        if (this._separatorSize == null) {
            this._separatorSize = defaultSeparatorSize;
        }
        
        this._separatorVisible = this._resizable || (this.component.render("separatorVisible", true) && this._separatorSize > 0);
    },
    
    /**
     * Process an image loading event on an automatically sized SplitPane.
     * Schedule invocation of renderDisplay() after short delay if not already scheduled.
     */
    _processImageLoad: function(e) {
        e = e ? e : window.event;
        Core.Web.DOM.removeEventListener(Core.Web.DOM.getEventTarget(e), "load", this._processImageLoadRef, false);
        if (!this._redisplayRequired) {
            this._redisplayRequired = true;
            Core.Web.Scheduler.run(Core.method(this, function() {
                this._redisplayRequired = false;
                if (this.component) { // Verify component still registered.
                    Echo.Render.renderComponentDisplay(this.component);
                }
            }), 50);
        }
    },

    _processKeyPress: function(e) {
        var focusPrevious,
            focusedComponent,
            focusFlags,
            focusChild;
        switch (e.keyCode) {
        case 37:
        case 39:
            if (!this._orientationVertical) {
                focusPrevious = (e.keyCode == 37) ^ (!this._orientationTopLeft);
                focusedComponent = this.component.application.getFocusedComponent();
                if (focusedComponent && focusedComponent.peer && focusedComponent.peer.getFocusFlags) {
                    focusFlags = focusedComponent.peer.getFocusFlags();
                    if ((focusPrevious && focusFlags & Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_LEFT) || 
                            (!focusPrevious && focusFlags & Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_RIGHT)) {
                        focusChild = this.component.application.focusManager.findInParent(this.component, focusPrevious);
                        if (focusChild) {
                            this.component.application.setFocusedComponent(focusChild);
                            Core.Web.DOM.preventEventDefault(e);
                            return false;
                        }
                    }
                }
            }
            break;
        case 38:
        case 40:
            if (this._orientationVertical) {
                focusPrevious = (e.keyCode == 38) ^ (!this._orientationTopLeft);
                focusedComponent = this.component.application.getFocusedComponent();
                if (focusedComponent && focusedComponent.peer && focusedComponent.peer.getFocusFlags) {
                    focusFlags = focusedComponent.peer.getFocusFlags();
                    if ((focusPrevious && focusFlags & Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_UP) ||
                            (!focusPrevious && focusFlags & Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_DOWN)) {
                        focusChild = this.component.application.focusManager.findInParent(this.component, focusPrevious);
                        if (focusChild) {
                            this.component.application.setFocusedComponent(focusChild);
                            Core.Web.DOM.preventEventDefault(e);
                            return false;
                        }
                    }
                }
            }
            break;
        }
        return true;
    }, 
    
    _processSeparatorMouseDown: function(e) {
        if (!this.client || !this.client.verifyInput(this.component)) {
            return true;
        }
    
        Core.Web.DOM.preventEventDefault(e);
        
        Core.Web.dragInProgress = true;
    
        this._dragInitPosition = this._rendered;
        if (this._orientationVertical) {
            this._dragInitMouseOffset = e.clientY;
        } else {
            this._dragInitMouseOffset = e.clientX;
        }
        
        Core.Web.Event.add(document.body, "mousemove", this._processSeparatorMouseMoveRef, true);
        Core.Web.Event.add(document.body, "mouseup", this._processSeparatorMouseUpRef, true);
    },
    
    _processSeparatorMouseMove: function(e) {
        var mousePosition = this._orientationVertical ? e.clientY : e.clientX;
        this._rendered = this._getBoundedSeparatorPosition(this._orientationTopLeft ?
                this._dragInitPosition + mousePosition - this._dragInitMouseOffset :
                this._dragInitPosition - mousePosition + this._dragInitMouseOffset);
        this._redraw(this._rendered);
    },
    
    _processSeparatorMouseUp: function(e) {
        Core.Web.DOM.preventEventDefault(e);
        
        Core.Web.dragInProgress = false;
    
        this._removeSeparatorListeners();
        this.component.set("separatorPosition", this._rendered);
        
        // Inform renderer that separator position is currently drawn as this._rendered.
        this._requested = this._rendered;
    
        if (this._paneDivs[0]) {
            Core.Web.VirtualPosition.redraw(this._paneDivs[0]);
        }
        if (this._paneDivs[1]) {
            Core.Web.VirtualPosition.redraw(this._paneDivs[1]);
        }
    
        Echo.Render.notifyResize(this.component);
    },
    
    _redraw: function(position) {
        var insetsAdjustment = 0;
        if (this.component.getComponentCount() > 0) {
            var layoutData = this.component.getComponent(0).render("layoutData");
            insetsAdjustment = this._getInsetsSizeAdjustment(position, layoutData);
        }

        var sizeAttr = this._orientationVertical ? "height" : "width";
        var positionAttr = this._orientationVertical ?
                (this._orientationTopLeft ? "top" : "bottom") :
                (this._orientationTopLeft ? "left" : "right");
        if (this._paneDivs[0]) {
            this._paneDivs[0].style[sizeAttr] = (position - insetsAdjustment) + "px";
        }
        if (this._paneDivs[1]) {
            this._paneDivs[1].style[positionAttr] =  (position + this._separatorSize) + "px";
        }
        if (this._separatorDiv) {
            this._separatorDiv.style[positionAttr] = position + "px";
        }
    },
    
    _removeSeparatorListeners: function() {
        Core.Web.Event.remove(document.body, "mousemove", this._processSeparatorMouseMoveRef, true);
        Core.Web.Event.remove(document.body, "mouseup", this._processSeparatorMouseUpRef, true);
    },
    
    /**
     * renderAdd() implementation.
     * Adds basic structure of SplitPane to DOM, but much work is delayed for initial invocation
     * of renderDisplay().
     */
    renderAdd: function(update, parentElement) {
        this._initialAutoSizeComplete = false;
        this._loadRenderData();

        var childCount = this.component.getComponentCount();
        if (childCount > 2) {
            throw new Error("Cannot render SplitPane with more than two child components.");
        }
        var child0 = childCount < 1 ? null : this.component.getComponent(0);
        var child1 = childCount < 2 ? null : this.component.getComponent(1);
    
        this._splitPaneDiv = document.createElement("div");
        this._splitPaneDiv.id = this.component.renderId;
        this._splitPaneDiv.style.cssText = "position:absolute;overflow:hidden;top:0;left:0;right:0;bottom:0;";
        
        Echo.Sync.Color.renderFB(this.component, this._splitPaneDiv);
        Echo.Sync.Font.render(this.component.render("font"), this._splitPaneDiv);
        
        if (this._separatorVisible) {
            this._separatorDiv = document.createElement("div");
            this._separatorDiv.style.cssText = "position:absolute;font-size:1px;line-height:0;z-index:2;";
            Echo.Sync.Color.render(this.component.render("separatorColor", Echo.SplitPane.DEFAULT_SEPARATOR_COLOR), 
                    this._separatorDiv, "backgroundColor");
    
            var resizeCursor = null;
            if (this._orientationVertical) {
                resizeCursor = this._orientationTopLeft ? "s-resize" : "n-resize";
                this._separatorDiv.style.width = "100%";
                this._separatorDiv.style.height = this._separatorSize + "px";
                Echo.Sync.FillImage.render(this.component.render("separatorVerticalImage"), this._separatorDiv, 0);
            } else {
                resizeCursor = this._orientationTopLeft ? "e-resize" : "w-resize";
                this._separatorDiv.style.height = "100%";
                this._separatorDiv.style.width = this._separatorSize + "px";
                Echo.Sync.FillImage.render(this.component.render("separatorHorizontalImage"), this._separatorDiv, 0);
            }
            if (this._resizable && resizeCursor) {
                this._separatorDiv.style.cursor = resizeCursor;
            }
            this._splitPaneDiv.appendChild(this._separatorDiv);
        } else {
            this._separatorDiv = null;
        }
        
        for (var i = 0; i < childCount && i < 2; ++i) {
            var child = this.component.getComponent(i);
            this._renderAddChild(update, child, i);
        }
        
        parentElement.appendChild(this._splitPaneDiv);
        
        Core.Web.Event.add(this._splitPaneDiv, 
                Core.Web.Env.QUIRK_IE_KEY_DOWN_EVENT_REPEAT ? "keydown" : "keypress", 
                Core.method(this, this._processKeyPress), false);
                
        if (this._resizable) {
            Core.Web.Event.add(this._separatorDiv, "mousedown", 
                    Core.method(this, this._processSeparatorMouseDown), false);
        }
    },
    
    _renderAddChild: function(update, child, index) {
        var childIndex = this.component.indexOf(child);
        var paneDiv = document.createElement("div");
        this._paneDivs[index] = paneDiv;
        
        paneDiv.style.cssText = "position: absolute; overflow: auto; z-index: 1;";
        
        var layoutData = child.render("layoutData");
        if (layoutData) {
            Echo.Sync.Alignment.render(layoutData.alignment, paneDiv, false, this.component);
            Echo.Sync.Color.render(layoutData.background, paneDiv, "backgroundColor");
            Echo.Sync.FillImage.render(layoutData.backgroundImage, paneDiv);
            if (!child.pane) {
                Echo.Sync.Insets.render(layoutData.insets, paneDiv, "padding");
                switch (layoutData.overflow) {
                case Echo.SplitPane.OVERFLOW_HIDDEN:
                    paneDiv.style.overflow = "hidden";
                    break;
                case Echo.SplitPane.OVERFLOW_SCROLL:
                    paneDiv.style.overflow = "scroll";
                    break;
                }
            }
        }
        if (child.pane) {
            paneDiv.style.overflow = "hidden";
        }
                
        // Set static CSS positioning attributes on pane DIV.
        if (this._orientationVertical) {
            paneDiv.style.left = 0;
            paneDiv.style.right = 0;
            if ((this._orientationTopLeft && index === 0) || (!this._orientationTopLeft && index == 1)) {
                paneDiv.style.top = 0;
            } else {
                paneDiv.style.bottom = 0;
            }
        } else {
            paneDiv.style.top = "0";
            paneDiv.style.bottom = "0";
            if ((this._orientationTopLeft && index === 0) || (!this._orientationTopLeft && index == 1)) {
                paneDiv.style.left = 0;
            } else {
                paneDiv.style.right = 0;
            }
        }
        
        Echo.Render.renderComponentAdd(update, child, paneDiv);
        this._splitPaneDiv.appendChild(paneDiv);
    
        if (this._childPanes[index] && this._childPanes[index].component == child) {
            this._childPanes[index].loadScrollPositions(paneDiv);
        } else {
            this._childPanes[index] = new Echo.Sync.SplitPane.ChildPane(this, child);
        }
    },
    
    renderDisplay: function() {
        Core.Web.VirtualPosition.redraw(this._splitPaneDiv);
        Core.Web.VirtualPosition.redraw(this._paneDivs[0]);
        Core.Web.VirtualPosition.redraw(this._paneDivs[1]);

        this._size = null;
        
        if (this._childPanes[0]) {
            this._childPanes[0].loadDisplayData();
        }
        if (this._childPanes[1]) {
            this._childPanes[1].loadDisplayData();
        }

        var position = this._requested;
        
        if (position == null && this._autoPositioned && this._paneDivs[0]) {
            // Automatic sizing requested: set separator and pane 1 positions to be adjacent to browser's 
            // rendered size of pane 0.

            if (this.component.children[0].peer.getPreferredSize) {
                // Query child 0 component for preferred size if available.
                var prefSize = this.component.children[0].peer.getPreferredSize(
                        this._orientationVertical ? Echo.Render.ComponentSync.SIZE_HEIGHT : Echo.Render.ComponentSync.SIZE_WIDTH);
                position = prefSize ? (this._orientationVertical ? prefSize.height : prefSize.width) : null;
            }
            
            if (position == null && this._orientationVertical && !this.component.children[0].pane) {
                // Automatically position vertical SplitPane based on height of non-pane child 0.
                this._paneDivs[0].style.height = "";
                var bounds0 = new Core.Web.Measure.Bounds(this._paneDivs[0]);
                position = bounds0.height;
            }

            if (position != null && !this._initialAutoSizeComplete) {
                // If position was successfully set, perform initial operations related to automatic sizing 
                // (executed on first renderDisplay() after renderAdd()).
                this._initialAutoSizeComplete = true;
                this._initialAutoSize();
            }
        }

        if (position == null) {
            // Use default separator position if none has been provided at this point.
            position = Echo.SplitPane.DEFAULT_SEPARATOR_POSITION;
        }

        if (Echo.Sync.Extent.isPercent(position)) {
            // Convert percent position to integer value.
            var totalSize = this._orientationVertical ? this._getSize().height : this._getSize().width;
            position = Math.round((parseInt(position, 10) / 100) * totalSize);
        } else {
            // Convert non-percent extent position to integer position.
            position = Math.round(Echo.Sync.Extent.toPixels(position, !this._orientationVertical));
        }
        
        // Constrain position and assign as rendered position.
        this._rendered = this._getBoundedSeparatorPosition(position);
        
        // Redraw dynamic elements of SplitPane.
        this._redraw(this._rendered);
        
        // IE Virtual positioning updates.
        Core.Web.VirtualPosition.redraw(this._paneDivs[0]);
        Core.Web.VirtualPosition.redraw(this._paneDivs[1]);
    },
    
    /**
     * Register listeners on any unloaded images in a size-determining
     * child of the split pane such that the SplitPane will be resized after those images
     * have loaded.
     * 
     * @param element the topmost element which potentially contains IMG elements to which the
     *        load listeners should be attached
     */
    _registerSizingImageLoadListeners: function(element) {
        if (!this._processImageLoadRef) {
            this._processImageLoadRef = Core.method(this, this._processImageLoad);
        }
        var imgs = element.getElementsByTagName("img");
        for (var i = 0; i < imgs.length; ++i) {
            if (!imgs[i].complete && (Core.Web.Env.QUIRK_UNLOADED_IMAGE_HAS_SIZE || (!imgs[i].height && !imgs[i].style.height))) {
                Core.Web.DOM.addEventListener(imgs[i], "load", this._processImageLoadRef, false);
            }
        }
    },

    renderDispose: function(update) {
        for (var i = 0; i < 2; ++i) {
            if (this._paneDivs[i]) {
                if (this._childPanes[i]) {
                    this._childPanes[i].storeScrollPositions(this._paneDivs[i]);
                }
                this._paneDivs[i] = null;
            }
        }
        
        if (this._separatorDiv) {
            Core.Web.Event.removeAll(this._separatorDiv);
            this._separatorDiv = null;
        }

        Core.Web.Event.removeAll(this._splitPaneDiv);
    
        this._splitPaneDiv = null;
    },
    
    _renderRemoveChild: function(update, child) {
        var index;
        if (this._childPanes[0] && this._childPanes[0].component == child) {
            index = 0;
        } else if (this._childPanes[1] && this._childPanes[1].component == child) {
            index = 1;
        } else {
            // Do nothing (component was never rendered within the SplitPane).
            return;
        }

        this._childPanes[index] = null;
        
        Core.Web.DOM.removeNode(this._paneDivs[index]);
        this._paneDivs[index] = null;
    },
        
    renderUpdate: function(update) {
        var fullRender = false,
            i;
        
        if (this._hasRelocatedChildren()) {
            fullRender = true;
        } else if (update.hasUpdatedProperties() || update.hasUpdatedLayoutDataChildren()) {
            if (update.isUpdatedPropertySetIn({ separatorPosition: true })) {
                this._requested = this.component.render("separatorPosition");
            } else {
                fullRender = true;
            }
        }
        
        if (!fullRender && (update.hasAddedChildren() || update.hasRemovedChildren())) {
            var removedChildren = update.getRemovedChildren();
            if (removedChildren) {
                // Remove children.
                for (i = 0; i < removedChildren.length; ++i) {
                    this._renderRemoveChild(update, removedChildren[i]);
                }
            }
            var addedChildren = update.getAddedChildren();
            if (addedChildren) {
                // Add children.
                for (i = 0; i < addedChildren.length; ++i) {
                    this._renderAddChild(update, addedChildren[i], this.component.indexOf(addedChildren[i])); 
                }
            }
        }
        
        if (fullRender) {
            var element = this._splitPaneDiv;
            var containerElement = element.parentNode;
            Echo.Render.renderComponentDispose(update, update.parent);
            containerElement.removeChild(element);
            this.renderAdd(update, containerElement);
        }
        
        return fullRender;
    }
});
