var refs = {};

refs.meta = {}; 
refs.meta.lang = "es";
refs.meta.view = "talk";
refs.meta.connection = {};
refs.body = {};
refs.errors = "";
refs.sources = {};


refs.meta.conn = {};
refs.meta.conn.serverIp = null;
/*
refs.meta.conn.hostName = 'https.tocandtalk.com';
refs.meta.conn.serverPort = '443'//4080;
refs.meta.conn.secure = true;
*/
refs.meta.conn.hostName = 'localhost';
refs.meta.conn.serverPort = '4080';
refs.meta.conn.secure = false;

refs.meta.conn.url = 'http://' + refs.meta.conn.hostName + ':' + refs.meta.conn.serverPort;

//refs.meta.conn.peerKey = '6sdshp5kg3edbo6r';
refs.meta.conn.peerKey = 'peerjs';
refs.meta.conn.peerPath = '/peerjs';

refs.meta.auth = {};

refs.conn = {};
refs.conn.socket = {};
refs.conn.peer = {};
refs.conn.talking = null;
refs.conn.media = {};
refs.conn.data = {};
refs.conn.localStream = {};
refs.conn.remoteStream = {};
refs.conn.localVideo = null;
refs.conn.remoteVideo = null;
refs.conn.callerId = null;
refs.conn.recUser = {};


  /*
  box_messages: null,
  entry_message: null,
  */