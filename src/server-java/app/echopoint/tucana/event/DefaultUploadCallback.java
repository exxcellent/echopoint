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
package echopoint.tucana.event;

import org.apache.commons.io.IOUtils;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * A default implementation of an {@link UploadCallback} that saves the
 * uploaded file(s) to a specified directory.
 *
 * <p><b>Note:</b> Development of this component was sponsored by <a
 * href='http://tcnbroadcasting.com/index.jsp' target='_top'>TCN
 * Broadcasting</a>.  We are grateful for their support and sponsorship.</p>
 *
 * @author Rakesh 2008-11-9
 * @version $Id$
 */
public class DefaultUploadCallback extends UploadCallbackAdapter
{
  private static final long serialVersionUID = 1l;

  /** The file separator character to use. */
  protected static final String FILE_SEPARATOR =
      System.getProperty( "file.separator" );

  /** The system default temporary directory. */
  protected static final String TEMP_DIR =
      System.getProperty( "java.io.tmpdir" );

  /** The directory to which uploaded files are to be saved. */
  private File directory;

  /**
   * Create a new callback handler that saves files to the specified directory.
   *
   * @param directory The directory to which files are to be saved.
   * @throws IllegalArgumentException If the file specified is not a directory.
   */
  public DefaultUploadCallback( final File directory ) throws IllegalArgumentException
  {
    setDirectory( directory );
  }

  /**
   * Over-ridden to save the contents of the uploaded file to {@link #directory}.
   *
   * {@inheritDoc}
   */
  @Override
  public void uploadSucceeded( final UploadFinishEvent event )
  {
    super.uploadSucceeded( event );

    final File temp = getTempFile();
    final File file = getFileName( event.getFileName() );

    try
    {
      BufferedOutputStream bos =
          new BufferedOutputStream( new FileOutputStream( temp ) );
      IOUtils.copy( event.getInputStream(), bos );
      bos.close();

      if ( ! temp.renameTo( file ) )
      {
        temp.delete();
        bos = new BufferedOutputStream( new FileOutputStream( file ) );
        IOUtils.copy( event.getInputStream(), bos );
        bos.close();
        logger.log( level, "Rename of temp file to " + file.getAbsolutePath() +
            " failed.  Recopied from source." );
      }

      logger.log( level, "Copied upload file contents to: " +
          file.getAbsolutePath() );
    }
    catch ( IOException e )
    {
      throw new RuntimeException( "Error copying uploaded file!", e );
    }
  }

  /**
   * Return a file object that represents the uploaded file that is to be
   * saved.
   *
   * @param name The file name of the uploaded file.
   * @return The new file object that represents the file to be saved.
   */
  protected File getFileName( final String name )
  {
    return new File( directory.getAbsolutePath() + FILE_SEPARATOR + name );
  }

  /**
   * Return a temporary file to which the contents of the uploaded file will
   * be initially written.  This file will then be moved to the proper
   * destination file.  This ensures atomic creation of the new file.
   *
   * @return The temporary file to create.
   */
  protected File getTempFile()
  {
    return new File( directory.getAbsolutePath() + FILE_SEPARATOR +
        "echopoint.tempfile." + System.currentTimeMillis() + ".tmp" );
  }

  /**
   * Accessor for property 'directory'.
   *
   * @return Value for property 'directory'.
   */
  public File getDirectory()
  {
    return directory;
  }

  /**
   * Mutator for property 'directory'.
   *
   * @param directory Value to set for property 'directory'.
   * @throws IllegalArgumentException If the file specified is not a directory.
   */
  public void setDirectory( final File directory ) throws IllegalArgumentException
  {
    if ( ! directory.isDirectory() )
    {
      throw new IllegalArgumentException( "File specified must be a directory!" );
    }

    this.directory = directory;
  }
}
