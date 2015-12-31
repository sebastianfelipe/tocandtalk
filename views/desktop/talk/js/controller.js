angular.module("tocandtalk", ['ngAnimate'])
    .controller('TalkController', ["$scope", function(scope) {
        scope.messages = []; // Arreglo de mensajes
        scope.newMsg = {}; // Mensaje enviado
        scope.rcvMsg = {}; // Mensaje recibido
        scope.show_talk = false;
        
        // Datos del usuario
        scope.usr = {};
        scope.usr.first_name = "Víctor";
        scope.usr.last_name = "Torres Varas";
        scope.usr.country = "Chile";
        scope.usr.sex = "Masculino";
        scope.usr.description = "Hola, soy un humano y quiero practicar idiomas";
        scope.usr.native_language = "Español"
        scope.usr.spoken_languages = ["Inglés"];
        scope.usr.interest_languages = ["Chino mandarín", "Francés"];
        
        // Obtener mensajes desde el otro usuario
        scope.getMessage = function(id, message) {
            scope.rcvMsg.content = message;
            scope.rcvMsg.type = "receiver";
            scope.messages.push(scope.rcvMsg);
            console.log('mensaje recibido');
            scope.rcvMsg = {};
        }
        
        // Enviar mensaje
        scope.sendMessage = function() {
            if (!refs.peer) {
              logError('cannot answer a call without a connection');
            }

            else if (!refs.localStream) {
              logError('could not answer call as there is no localStream ready');
            }

            else if ((!refs.data_connection) || (!refs.call)) {
              logError('Nobody is talking with you right now. Search someone first!');
            }
            else
            {
                if (scope.newMsg.content != null) {
                    scope.newMsg.type = "sender";
                    console.log(scope.newMsg.content);
                    refs.data_connection.send(scope.newMsg.content);
                    scope.messages.push(scope.newMsg);
                    scope.newMsg = {};     
                }
            }
        }
    }])
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    })
    .directive('updateChat', function() {
        return function(scope, element, attrs) {
            chat_position();
            chat_bottom_scroll();
        };
    });