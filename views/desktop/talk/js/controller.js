angular.module("tocandtalk", ['ngAnimate'])
    .controller('TalkController', ["$scope", function(scope) {
        scope.messages = []; // Arreglo de mensajes
        scope.wait_msg = [];
        scope.newMsg = {}; // Mensaje enviado
        scope.rcvMsg = {}; // Mensaje recibido
        
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
            ChatNotification.new_msg();
            
            scope.rcvMsg.content = message;
            scope.rcvMsg.type = "receiver";
            scope.messages.push(scope.rcvMsg);
            scope.rcvMsg = {};
            if (chat_visible()) { scope.$apply(); }
        }          
        
        // Enviar mensaje
        scope.sendMessage = function() {
            if ((!refs.data_connection) || (!refs.call)) {
              logError('Nobody is talking with you right now. Search someone first!');
            }
            else if (valid_string(scope.newMsg.content))
            {
                scope.newMsg.type = "sender";
                console.log(scope.newMsg.content);
                refs.data_connection.send(scope.newMsg.content);
            }
        }
        
        scope.loadMessages = function() {
            scope.$apply();
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
            chat_scroll_bottom();
        };
    })
    .filter('capitalize', function() {
        return function(input) {
            return (!!input) ? capitalize(input) : '';
        }
    });