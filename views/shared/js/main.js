$(document).ready(function(){
  refs.localVideo = $('#local-video');
  refs.remoteVideo = $('#remote-video');
  refs.box_messages = $('#messages');
  refs.entry_message = $('#message-entry');
  refs.button_search = $('#search');
  refs.button_send_message = $('#send-message');
  
  /*
  refs.server_ip = server_ip;
  refs.protocol = protocol;
  refs.secure = secure;
  */

  refs.user = user;
  refs.server_ip = server_ip,
  refs.host_name = host_name,
  refs.protocol = "https";
  refs.secure = true;
  refs.language = language;
  
  refs.caller_id = refs.user._username;
  console.log(refs.host_name);

  refs.server_ports = server_ports;
  //refs.secure = secure;
  //var url = refs.protocol+"://"+refs.server_ip+":"+refs.server_ports.io+"/";
  //var url = "https://https.tocandtalk.com";
  var url = refs.protocol+"://"+refs.host_name+"/";
  // -------------------------------------------------------------

  refs.socket = io(url, {secure: refs.secure});
  refs.socket.on('receiveConnection', function(data) {
    $('#user').html("User connected as " + refs.caller_id);
  });
  refs.socket.on('tocAnswer', function (wait){
  if (wait)
  {
    logMessage('Wait a moment for someone to talk');
  }
  else
  {
    refs.socket.emit('get', refs.caller_id, refs.language);
    logMessage('Wait a moment for someone to talk');
  }
  });
  refs.socket.on('talk', function(recipient_id){
    call(recipient_id);
    end_load();
    refs.data_connection.send({user: refs.user});
  });

  getLocalStream();
  connect();
  //_search();
  // -------------------------------------------------------------

  //refs.button_search.on('click', _search);
  //refs.button_send_message.on('click',_sendMessage);
  //refs.entry_message.on('keypress', _sendMessage);
});
