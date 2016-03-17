
// CONTROLLERS

app.controller('body', ['$scope', '$http', '$log', 'sStage', 'sListen', 'sActions', function ($scope, $http, $log, sStage, sListen, sActions) {
	var scope = {};
    refs.body = scope = $scope.body = {};
    refs.meta.lang = lang || refs.meta.lang;
	scope.lang = {};
	scope.user = {};
	scope.recUser = {};
    scope.messages = [];
    scope.transcript = {};
    scope.recTranscript = {};
    scope.tmpMessage = "";
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

    scope.onHome = function () {
        $(location).attr('href','/');
    };

    scope.getLocalStream();
    sStage.getSources(refs);
    //scope.onSpeechRecognition(refs);
    sStage.load(refs);
}]);


// CONTROLLERS

app.controller('media', ['$scope', '$http', '$log', 'sStage', 'sListen', 'sActions', function ($scope, $http, $log, sStage, sListen, sActions) {
    var scope = {};
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
                if (refs.conn.localStream.getAudioTracks()[0].enabled)
                {
                    $("#b_icon_mic_none").css("display", "none");
                    $("#b_icon_mic_off").css("display", "none");
                    $("#b_icon_mic").css("display", "inline-block");
                }
                else
                {
                    $("#b_icon_mic_none").css("display", "none");
                    $("#b_icon_mic").css("display", "none");
                    $("#b_icon_mic_off").css("display", "inline-block"); 
                }
            }
        }
        //sStage.enableMediaButtons();
        //sStage.disableMediaButtons();
    };
    
    scope.onVideoClick = function () {
        if (refs.conn.localStream)
        {
            if (refs.conn.localStream.getVideoTracks)
            {
                refs.conn.localStream.getVideoTracks()[0].enabled = !refs.conn.localStream.getVideoTracks()[0].enabled;
                if (refs.conn.localStream.getVideoTracks()[0].enabled)
                {
                    $("#b_icon_video_none").css("display", "none");
                    $("#b_icon_video_off").css("display", "none");
                    $("#b_icon_video").css("display", "inline-block");
                }
                else
                {
                    $("#b_icon_video_none").css("display", "none");
                    $("#b_icon_video").css("display", "none");
                    $("#b_icon_video_off").css("display", "inline-block"); 
                }
            }
        }
        //sStage.enableMediaButtons();
        //sStage.disableMediaButtons();
    };

    scope.onFullScreenClick = function (command)
    {
        var isFullScreen = window.fullScreen || 
                 document.mozFullscreenEnabled || 
                 document.webkitIsFullScreen || 
                 document.msFullscreenEnabled;

        if ( isFullScreen )
        {
            $("#b_icon_fullscr_exit").css("display", "none");
            $("#b_icon_fullscr").css("display", "inline-block");
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }

            console.log('it turned off the screen');
        }
        
        else if (!document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement )
        {
            
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            console.log('it turned on the screen');
            $("#b_icon_fullscr").css("display", "none");
            $("#b_icon_fullscr_exit").css("display", "inline-block");
        }
        
    };
}]);