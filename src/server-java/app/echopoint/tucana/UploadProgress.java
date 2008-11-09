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
package echopoint.tucana;

import java.util.LinkedList;
import java.io.Serializable;

/**
 * Contains information about the progress of a file upload. This class is
 * thread-safe.
 *
 * <p><b>Note:</b> Development of this component was sponsored by <a
 * href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Broadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * @author Echo File Transfer Library
 * @version $Id$
 */
public class UploadProgress implements Serializable
{
  private static final long serialVersionUID = 3190335998109288444L;

  /**
   * The minimum number of milestones required for calculation of the tranfer
   * rate.
   */
  private static final int MINIMUM_MILESTONE_COUNT = 2;

  /**
   * The maximum number of milestones that should be kept for calculation of
   * the tranfer rate.
   */
  private static final int MAXIMUM_MILESTONE_COUNT = 10;

  /** The minimum time interval in milliseconds between milestones. */
  private static final int MILESTONE_INTERVAL = 250;

  /**
   * The minimum number of bytes that should have been transferred between
   * milestones.
   */
  private static final int MILESTONE_BYTE_INTERVAL = 10240 / 4;

  private final long contentLength;

  private long bytesRead;

  private final LinkedList<Milestone> milestones;

  private long lastMilestoneBytesRead;

  /** @param contentLength the total number of bytes, <code>-1</code> if unknown */
  public UploadProgress( long contentLength )
  {
    this.contentLength = contentLength;
    this.milestones = new LinkedList<Milestone>();
  }

  /**
   * Returns the number of bytes that have been read so far.
   *
   * @return the number of bytes read.
   */
  public long getBytesRead()
  {
    return bytesRead;
  }

  /**
   * Returns the total number of bytes.
   *
   * @return the total number of bytes, <code>-1</code> if unknown.
   */
  public long getContentLength()
  {
    return contentLength;
  }

  /**
   * Returns the completion percentage.
   *
   * @return the percentage as a float between <code>0</code> and
   *         <code>100</code>, returns <code>-1</code> if the total number of
   *         bytes to be read is unknown.
   */
  public float getPercentCompleted()
  {
    if ( contentLength == -1 )
    {
      return -1;
    }
    if ( contentLength == 0 )
    {
      return 1;
    }
    return (float) bytesRead / contentLength * 100f;
  }

  /**
   * Returns the throughput rate in bytes per second.
   *
   * @return the throughput rate as a long, returns <code>-1</code> if the
   *         transfer rate is unknown yet.
   */
  public long getTransferRate()
  {
    Milestone firstMarker;
    Milestone lastMarker;
    synchronized ( milestones )
    {
      if ( milestones.size() < MINIMUM_MILESTONE_COUNT )
      {
        return -1;
      }
      firstMarker = milestones.getFirst();
      lastMarker = milestones.getLast();
    }

    long byteDiff = lastMarker.bytesRead - firstMarker.bytesRead;
    long timeDiff = lastMarker.timeStamp - firstMarker.timeStamp;

    return byteDiff * 1000 / timeDiff;
  }

  /**
   * Returns the estimated time left to complete the upload.
   *
   * @return the estimated time in seconds, returns <code>-1</code> if the
   *         estimated time is unknown.
   */
  public int getEstimatedTimeLeft()
  {
    if ( contentLength == -1 )
    {
      return -1;
    }
    if ( contentLength == bytesRead )
    {
      return 0;
    }

    long transferRate = getTransferRate();
    if ( transferRate == -1 )
    {
      return -1;
    }
    return Math.round( ( contentLength - bytesRead ) / transferRate );
  }

  /**
   * Sets the number of bytes that have been read so far.
   *
   * @param bytesRead the number of bytes read
   */
  public void setBytesRead( long bytesRead )
  {
    this.bytesRead = bytesRead;

    if ( lastMilestoneBytesRead > 0 &&
        bytesRead - lastMilestoneBytesRead < MILESTONE_BYTE_INTERVAL )
    {
      // prevent slowdown of upload due to excessive amount of calls
      return;
    }

    synchronized ( milestones )
    {
      long now = System.currentTimeMillis();
      if ( milestones.isEmpty() ||
          now >= ( milestones.getLast().timeStamp + MILESTONE_INTERVAL ) )
      {
        milestones.add( new Milestone( bytesRead, now ) );
        lastMilestoneBytesRead = bytesRead;
        if ( milestones.size() > MAXIMUM_MILESTONE_COUNT )
        {
          milestones.removeFirst();
        }
      }
    }
  }

  private static final class Milestone implements Serializable
  {
    private static final long serialVersionUID = 1l;

    private final long bytesRead;

    private final long timeStamp;

    private Milestone( long bytesRead, long timeStamp )
    {
      this.bytesRead = bytesRead;
      this.timeStamp = timeStamp;
    }
  }
}