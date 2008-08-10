/**
 * Component rendering peer: LineChart
 *
 * @author Rakesh 2008-08-08
 * @version: $Id$
 */
echopoint.google.LineChartSync = Core.extend(
    echopoint.google.internal.AbstractChartSync,
{
  $load: function()
  {
    Echo.Render.registerPeer( echopoint.constants.LINE_CHART, this );
  },

  /** Over-ridden to return the appropriate chart type. */
  getChartType: function()
  {
    var data = this.component.get( echopoint.google.internal.AbstractChart.DATA );
    return ( ( data[0].ydata ) ? echopoint.google.LineChart.XY_DATA :
             echopoint.google.LineChart.X_DATA );
  },

  /**
   * Over-ridden to set the axis labels.
   *
   * @see #setAxisType
   * @see #setLabels
   * @see #setLabelPositions
   * @see #setAxisRange
   * @see #setAxisStyle
   * @see #setLineStyles
   * @see #setGridLines
   * @see #setMarkers
   * @param url The URL that is to be updated with axis label information.
   * @return The modified URL object.
   */
  setAxisLabels: function( url )
  {
    url = this.setAxisType( url );
    url = this.setLabels( url );
    url = this.setLabelPositions( url );
    url = this.setAxisRange( url );
    url = this.setAxisStyle( url );
    url = this.setLineStyles( url );
    url = this.setGridLines( url );
    url = this.setMarkers( url );
    return url;
  },

  /** Set the axis type style property for the chart. */
  setAxisType: function( url )
  {
    var type = this.component.render( echopoint.google.LineChart.AXIS_TYPE );
    if ( type ) url += "&chxt=" + type;
    return url;
  },

  /** Set the axis labels for the chart from an array of string arrays. */
  setLabels: function( url )
  {
    var array = this.component.get( echopoint.google.LineChart.AXIS_LABELS );
    if ( ! array ) return url;

    url += "&chxl=";

    for ( var i = 0; i < array.length; ++i )
    {
      url += i + ":";
      var labels = array[i];

      for ( var j = 0; j < labels.length; ++j )
      {
        url += "|" + labels[j];
        if ( i < array.length - 1 )
        {
          url += "|";
        }
        else
        {
          if ( j < labels.length - 1 ) url += "|";
        }
      }
    }

    return url;
  },

  /** Sets the axis label positions to allow non-uniform spacing. */
  setLabelPositions: function( url )
  {
    var array = this.component.get( echopoint.google.LineChart.LABEL_POSITIONS );
    if ( ! array ) return url;

    url += "&chxp=";

    for ( var i = 0; i < array.length; ++i )
    {
      var positions = array[i];
      if ( positions.length > 0 ) url += i + ",";

      for ( var j = 0; j < positions.length; ++j )
      {
        url += positions[j];

        if ( j < positions.length - 1 )
        {
          url += ",";
        }
        else
        {
          if ( i < array.length - 1 ) url += "|";
        }
      }
    }

    return this._trimPipes( url );
  },

  /** Sets the axis label positions to allow non-uniform spacing. */
  setAxisRange: function( url )
  {
    var array = this.component.get( echopoint.google.LineChart.AXIS_RANGES );
    if ( ! array ) return url;

    url += "&chxr=";

    for ( var i = 0; i < array.length; ++i )
    {
      var range = array[i];
      if ( range )
      {
        url += i + ",";
        url += range.minimum + "," + range.maximum + "|";
      }
    }

    return this._trimPipes( url );
  },

  /** Sets the styles for the axis labels. */
  setAxisStyle: function( url )
  {
    var style = this.component.render( echopoint.google.LineChart.AXIS_STYLES );
    if ( style ) url += "&chxs=" + style;

    return url;
  },

  /** Set the line styles for the lines plotted. */
  setLineStyles: function( url )
  {
    var array = this.component.get( echopoint.google.LineChart.LINE_STYLES );
    if ( array )
    {
      url += "&chls=";

      for ( var i = 0; i < array.length; ++i )
      {
        var style = array[i];
        url += style.thickness + "," + style.segmentLength + "," +
               style.blankSegmentLength + "|";
      }
    }

    return this._trimPipes( url );
  },

  /** Sets the grid lines for the graph. */
  setGridLines: function( url )
  {
    var style = this.component.render( echopoint.google.LineChart.GRID_LINES );
    if ( style ) url += "&chg=" + style;

    return url;
  },

  /**
   * Set the shape and range markers for the data points being plotted.
   *
   * @see #_setShapeMarkers
   * @see #_setRangeMarkers
   */
  setMarkers: function( url )
  {
    var data = this.component.get( echopoint.google.internal.AbstractChart.DATA );
    var rangeMarkers = this.component.get( echopoint.google.LineChart.RANGE_MARKERS );
    var fillArea = this.component.get( echopoint.google.LineChart.FILL_AREA );

    var hasMarkers = false;
    if ( rangeMarkers ) hasMarkers = true;
    if ( fillArea ) hasMarkers = true;
    var i;

    if ( ! hasMarkers )
    {
      for ( i = 0; i < data.length; ++i )
      {
        if ( data[i].markers ) hasMarkers = true;
      }
    }

    if ( ! hasMarkers ) return url;

    url += "&chm=";

    for ( i = 0; i < data.length; ++i )
    {
      url = this._setShapeMarkers( url, data[i], i );
    }

    url = this._setRangeMarkers( url, rangeMarkers );
    url = this._setFillArea( url, fillArea );
    return this._trimPipes( url );
  },

  /** Set the shape markers for the data set. */
  _setShapeMarkers: function( url, data, index )
  {
    var markers = data.markers;
    var marker;

    if ( markers )
    {
      if ( markers.length == 1 )
      {
        marker = markers[0];
        url += marker.markerType + "," + marker.color + "," + index + ",-1," +
               marker.size + "," + marker.priority + "|";
      }
      else
      {
        for ( var i = 0; i < markers.length; ++i )
        {
          marker = markers[i];

          if ( marker )
          {
            url += marker.markerType + "," + marker.color + "," + index + "," +
                   i + "," + marker.size + "," + marker.priority + "|";
          }
        }
      }
    }

    return url;
  },

  /** Set the range markers for the data set. */
  _setRangeMarkers: function( url, markers )
  {
    if ( markers )
    {
      for ( var i = 0; i < markers.length; ++i )
      {
        var marker = markers[i];
        url += marker.markerType + "," + marker.color + ",0," +
               marker.startPoint + "," + marker.endPoint + "|";
      }
    }

    return url;
  },

  /** Set the fill areas between plotted line(s). */
  _setFillArea: function( url, array )
  {
    if ( array )
    {
      for ( var i = 0; i < array.length; ++i )
      {
        var fillArea = array[i];
        url += fillArea.markerType + "," + fillArea.color + "," +
               fillArea.startIndex + "," + fillArea.endIndex + ",0|";
      }
    }

    return url;
  },

  /** Trim all trailing pipe characters from the input string */
  _trimPipes: function( url )
  {
    return url.replace( /\|+$/g, "" );
  }
});
