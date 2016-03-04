
// CONTROLLERS

app.controller('body', ['$scope', '$http', '$log', 'sStage', 'sListen', 'sActions', function ($scope, $http, $log, sStage, sListen, sActions) {
	refs.body = scope = $scope.body = {};
	scope.lang = {};
	scope.user = {};
	scope.recUser = {};
    scope.messages = [];

	scope.sendMessage = function () {
        sActions.onSendMessage(refs, scope.tmpMessage);
	};

    scope.getMessage = function(content) {
        sActions.onGetMessage(refs, content);
        if (chat_visible()) {$scope.$apply();};
    };

    scope.connect = function () {
        sActions.onConnect(refs);
    }

    scope.getLocalStream = function () {
        sActions.onGetLocalStream(refs);
    }

    scope.onNextUserClick = function () {
        sActions.onNextUser(refs);
    }

    scope.getLocalStream();
    sStage.getSources(refs);
    sStage.load(refs);
}]);