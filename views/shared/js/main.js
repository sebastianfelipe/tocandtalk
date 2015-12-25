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
    var url = refs.protocol+"://"+refs.server_ip+":"+refs.server_port+"/";
    refs.socket = io.connect(url);
    console.log(refs.socket);
    console.log(url);
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

  refs.button_search.on('click', _search);
  refs.button_send_message.on('click',_sendMessage);
  refs.entry_message.on('keypress', _sendMessage);
});
