/**
 * Synchronization peer for TagCloud component.
 *
 * @version $Id$
 */
echopoint.TagCloudSync = Core.extend(Echo.Render.ComponentSync,
{
  $load: function()
  {
    Echo.Render.registerPeer(echopoint.constants.TAG_CLOUD, this);
  },

  _element: null,

  _getSpecificElement: function( target )
  {
    var element = this._element.firstChild;
    var i = 0;
    while ( element )
    {
      var tags = this._getTags();

      if ( ( element == target ) && tags )
      {
        return tags[i];
      }
      element = element.nextSibling;
      ++i;
    }
    return null;
  },

  _processRolloverEnter: function( e )
  {
    if ( e.target.nodeName.toLowerCase() != "span" )
    {
      return;
    }

    Echo.Sync.Color.renderClear(
        this.component.render("rolloverForeground"), e.target, "color");
    Echo.Sync.Color.renderClear(
        this.component.render("rolloverBackground"), e.target, "backgroundColor");
  },

  _processRolloverExit: function( e )
  {
    if ( e.target.nodeName.toLowerCase() != "span" )
    {
      return;
    }

    e.target.style.color = "";
    e.target.style.backgroundColor = "";
  },

  _processClick: function( e )
  {
    var tag = this._getSpecificElement(e.target);
    if ( tag )
    {
      this.component.doAction(tag);
    }
  },

  _getTags: function()
  {
    var tags = this.component.get( "tags" );
    if ( ! tags )
    {
      var json = this.component.get( "tagsJson" );

      if ( json )
      {
        tags = new Array();
        var data = eval( "(" + json + ")" );

        for ( var i = 0; i < data.list.length; ++i )
        {
          tags[i] = new echopoint.model.Tag(
              data.list[i].name, data.list[i].count );
        }

        data = null;
        this.component.set( "tags", tags );
        this.component.set( "tagsJson", null );
      }

      json = null;
    }

    return tags;
  },

  renderAdd: function( update, parentElement )
  {
    this._element = document.createElement("div");
    Echo.Sync.Font.render(this.component.render("font"), this._element);
    Echo.Sync.Color.renderFB(this.component, this._element);
    var tags = this._getTags();

    if ( tags )
    {
      var maxCount = 1; // Default to 1 to avoid divide by zero.
      var minCount = Number.MAX_VALUE;
      for ( var i = 0; i < tags.length; ++i )
      {
        if ( tags[i].count < minCount )
        {
          minCount = tags[i].count;
        }
        if ( tags[i].count > maxCount )
        {
          maxCount = tags[i].count;
        }
      }

      for ( var i = 0; i < tags.length; ++i )
      {
        var countValue = Math.floor(
            (tags[i].count - minCount) / (maxCount - minCount) * 100) + 100;
        var span = document.createElement("span");
        span.style.cssText = "cursor:pointer;font-size: " + countValue + "%";
        span.appendChild(document.createTextNode(tags[i].name));
        span.appendChild(document.createTextNode(" "));
        this._element.appendChild(span);
      }
    }

    Core.Web.Event.add(this._element, "click",
        Core.method(this, this._processClick), false);
    if ( this.component.render("rolloverEnabled") )
    {
      Core.Web.Event.add(this._element, "mouseover",
          Core.method(this, this._processRolloverEnter), false);
      Core.Web.Event.add(this._element, "mouseout",
          Core.method(this, this._processRolloverExit), false);
    }
    parentElement.appendChild(this._element);
  },

  renderDispose: function( update )
  {
    Core.Web.Event.removeAll(this._element);
    this._Element = null;
  },

  renderUpdate: function( update )
  {
    var element = this._element;
    var containerElement = element.parentNode;
    this.renderDispose(update);
    containerElement.removeChild(element);
    this.renderAdd(update, containerElement);
    return false; // Child elements not supported: safe to return false.
  }
});