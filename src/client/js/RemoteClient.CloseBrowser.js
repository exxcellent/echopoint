/**
 * Command execution peer: Close the browser
 */
Echo.RemoteClient.CommandExec.CloseBrowser = Core.extend(Echo.RemoteClient.CommandExec, 
{
  $static: 
  {
    /** @see Echo.RemoteClient.CommandExecProcessor#execute */
    execute: function(client, commandData) 
    {
      if( !window.closed ) window.close();
    }
  },
  
  $load: function() 
  {
    Echo.RemoteClient.CommandExecProcessor.registerPeer("echopoint.command.CloseBrowser", this);
  }
});
