
// CONTROLLERS

app.controller('body', ['$scope', '$http', '$log', 'sStage', 'sListen', 'sActions', function ($scope, $http, $log, sStage, sListen, sActions) {
	refs.body = scope = $scope.body = {};
    refs.meta.lang = lang || refs.meta.lang;
	scope.lang = {};
	scope.user = {};
	scope.recUser = {};
    scope.messages = [];
    scope.transcript = {};
    scope.recTranscript = {};
    scope.language = language || 'en';

    scope.apply = function () {
        $scope.$apply();
    };

    scope.loadMessages = function () {
        $scope.$apply();
    };

	scope.sendMessage = function () {
        sActions.onSendMessage(refs, scope.tmpMessage);
	};

    scope.getMessage = function(content) {
        sActions.onGetMessage(refs, content);
        if (chat_visible()) {scope.loadMessages()};
    };

    scope.connect = function () {
        sActions.onConnect(refs);
    };

    scope.getLocalStream = function () {
        sActions.onGetLocalStream(refs);
    };

    scope.onNextUserClick = function () {
        sActions.onNextUser(refs);
    };

    scope.onSpeechRecognition = function () {
        sActions.onSpeechRecognition(refs);
    };

    scope.enableMediaButtons = function () {
        sStage.enableMediaButtons();
    };

    scope.disableMediaButtons = function () {
        sStage.disableMediaButtons();
    };

    scope.getLocalStream();
    sStage.getSources(refs);
    //scope.onSpeechRecognition(refs);
    sStage.load(refs);
}]);


// CONTROLLERS

app.controller('media', ['$scope', '$http', '$log', 'sStage', 'sListen', 'sActions', function ($scope, $http, $log, sStage, sListen, sActions) {
    refs.media = scope = $scope.media = {};

    scope.onNextUserClick = function () {
        sActions.onNextUser(refs);
    };

    scope.onMicClick = function () {
        if (refs.conn.localStream)
        {
            if (refs.conn.localStream.getAudioTracks)
            {
                refs.conn.localStream.getAudioTracks()[0].enabled = !refs.conn.localStream.getAudioTracks()[0].enabled;
            }
        }
        sStage.enableMediaButtons();
        sStage.disableMediaButtons();
    };
    
    scope.onVideoClick = function () {
        if (refs.conn.localStream)
        {
            if (refs.conn.localStream.getVideoTracks)
            {
                refs.conn.localStream.getVideoTracks()[0].enabled = !refs.conn.localStream.getVideoTracks()[0].enabled;
            }
        }
        sStage.enableMediaButtons();
        sStage.disableMediaButtons();
    };
}]);