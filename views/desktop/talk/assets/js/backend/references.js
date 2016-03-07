var refs = {};

refs.meta = {}; 
refs.meta.lang = "es";
refs.meta.view = "talk";
refs.meta.connection = {};

refs.meta.transcript = {};
refs.meta.transcript.lang = 'es';
refs.meta.transcript.dialect = 'CL';

refs.body = {};
refs.errors = "";
refs.sources = {};
refs.sources.user = {};
refs.sources.recUser = {};
refs.sources.lang = {};

refs.sources.transcript = {};
refs.sources.transcript.sentence = '';
refs.sources.transcript.words = [];
refs.sources.transcript.confidence = 0.0;
refs.sources.transcript.final = false;

refs.sources.recTranscript = {};
refs.sources.recTranscript.sentence = '';
refs.sources.recTranscript.words = [];
refs.sources.recTranscript.confidence = 0.0;
refs.sources.recTranscript.final = false;

refs.meta.conn = {};
refs.meta.recognizing = false;
//refs.meta.conn.serverIp = null;

refs.meta.conn.hostName = 'https.tocandtalk.com';
refs.meta.conn.serverPort = '443';
refs.meta.conn.secure = true;


/*
refs.meta.conn.hostName = 'localhost';
refs.meta.conn.serverPort = '4080';
refs.meta.conn.secure = false;
*/
refs.meta.conn.url = (refs.meta.conn.secure ? 'https' : 'http') + '://' + refs.meta.conn.hostName + ':' + refs.meta.conn.serverPort;

//refs.meta.conn.peerKey = '6sdshp5kg3edbo6r';
refs.meta.conn.peerKey = 'peerjs';
refs.meta.conn.peerPath = '/peerjs';

refs.conn = {};
refs.conn.socket = {};
refs.conn.peer = {};
refs.conn.media = {};
refs.conn.data = {};
refs.conn.localStream = {};
refs.conn.remoteStream = {};
refs.conn.auth = {};
refs.conn.recognition = {};
  /*
  box_messages: null,
  entry_message: null,
  */