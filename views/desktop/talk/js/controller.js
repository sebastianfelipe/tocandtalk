angular.module("tocandtalk", ['ngAnimate'])
    .controller('TalkController', ["$scope", function(scope) {
        scope.messages = []; // Arreglo de mensajes
        scope.wait_msg = [];
        scope.newMsg = {}; // Mensaje enviado
        scope.rcvMsg = {}; // Mensaje recibido
        
        // Datos del usuario
        /*
        scope.usr = {};
        scope.usr.first_name = "víctor";
        scope.usr.last_name = "torres varas";
        scope.usr.country = "chile";
        scope.usr.sex = "masculino";
        scope.usr.description = "Hola, soy un humano y quiero practicar idiomas";
        scope.usr.native_language = "español"
        scope.usr.spoken_languages = ["inglés"];
        scope.usr.interest_languages = ["chino mandarín", "francés"];
        */
        scope.getRecipientUser = function(recipient_user)
        {
            refs.recipient_user = recipient_user;
            scope.usr = {};
            scope.usr.first_name = refs.recipient_user.first_name;
            scope.usr.last_name = refs.recipient_user.last_name;
            scope.usr.country = refs.recipient_user.nationality;
            scope.usr.sex = refs.recipient_user.sex;
            scope.usr.description = refs.recipient_user.description;
            scope.usr.native_language = refs.recipient_user.native_language;
            scope.usr.spoken_languages = refs.recipient_user.spoken_languages;
            scope.usr.interest_languages = refs.recipient_user.interest_languages;
            scope.$apply();
        }
        // Obtener mensajes desde el otro usuario
        scope.getMessage = function(message) {
            ChatNotification.new_msg();
            console.log(message);
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
                scope.newMsg.content = maxwidth_string(scope.newMsg.content, 174);
                console.log(scope.newMsg.content);
                refs.data_connection.send({message: scope.newMsg.content});
                scope.messages.push(scope.newMsg);
                scope.newMsg = {};
            }
        }
        
        scope.loadMessages = function() {
            scope.$apply();
        }
        
        scope.nextUser = function() {
            start_load();
            scope.messages = [];
            //if (chat_visible()) { scope.$apply(); }
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