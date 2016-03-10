
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

    scope.getLocalStream();
    sStage.getSources(refs);
    //scope.onSpeechRecognition(refs);
    sStage.load(refs);
}]);