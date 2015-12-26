$(document).ready(function(){
  refs.localVideo = $('#local-video');
  refs.remoteVideo = $('#remote-video');
  refs.box_messages = $('#messages');
  refs.entry_message = $('#message-entry');
  refs.button_search = $('#search');
  refs.button_send_message = $('#send-message');
  refs.server_ip = server_ip;
  refs.protocol = protocol;
  if (!refs.socket)
  {
    refs.secure = secure;
    refs.server_ports = server_ports;
    var url = refs.protocol+"://"+refs.server_ip+":"+refs.server_ports.io+"/";
    console.log(url);
    // -------------------------------------------------------------
    /*
    refs.socket = io(url, {secure: refs.secure});
    //refs.socket = io.connect(url);
    //refs.socket = io();
    console.log(refs.socket);
    refs.socket.on('receiveConnection', function(data) {
      //refs.server_ip = data["ip"];
      //refs.server_port = data["port"];
      $('#user').html("User connected as " + refs.caller_id);
      getLocalStream();
      connect();
    });
    refs.socket.on('tocAnswer', function (wait){
    if (wait)
    {
      logMessage('Wait a moment for someone to talk');
    }
    else
    {
      refs.socket.emit('get', refs.caller_id);
      logMessage('Wait a moment for someone to talk');
    }
    });
    refs.socket.on('talk', function(recipient_id){
      talk(recipient_id);
    });
  }
  */
  // -------------------------------------------------------------
  
  // Test de nueva versión 
  getLocalStream();
  connect();
}

  refs.button_search.on('click', _search);
  refs.button_send_message.on('click',_sendMessage);
  refs.entry_message.on('keypress', _sendMessage);
});
