var refs = {
  peer_path: '/peerjs',
  server_ip: null,
  server_port: 4080,
  secure: false,
  protocol: null,
  peer: null,
  peer_key: '6sdshp5kg3edbo6r',
  peer_port: 9000,
  socket: null,

  talking: false,
  call: null,
  data_connection: null,

  localStream: null,
  localVideo: null,
  remoteVideo: null,
  box_messages: null,
  entry_message: null,

  caller_id: callerId
};