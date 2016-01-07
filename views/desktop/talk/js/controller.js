angular.module("tocandtalk", ['ngAnimate'])
    .controller('TalkController', ["$scope", function(scope) {
        scope.messages = []; // Arreglo de mensajes
        scope.wait_msg = [];
        scope.newMsg = {}; // Mensaje enviado
        scope.rcvMsg = {}; // Mensaje recibido
        
        /*
        var f_name = maxwidth_string("víctor", '16px FiraSansLight', 213);
        var l_name = maxwidth_string("torres varas", '16px FiraSansLight', 213);
        panel_profile_cover(f_name + " " + l_name);
        scope.usr = {};
        scope.usr.first_name = f_name;
        scope.usr.last_name = l_name;
        scope.usr.country = "Chile";
        scope.usr.sex = "masculino";
        var desc = "Hola, soy un humano bla balsasdasdasdasfasfsdfs sdfsdfs";
        scope.usr.description = maxwidth_string(desc, '13px FiraSansBook', 186);
        scope.usr.native_language = "español";
        scope.usr.spoken_languages = ["inglés", "portugués"];
        scope.usr.interest_languages = ["alemán", "chino mandarín", "coreano"];
        */
        
        // Obtener datos del usuario
        scope.getRecipientUser = function(recipient_user)
        {   
            refs.recipient_user = recipient_user;
            
            var f_name = maxwidth_string(refs.recipient_user.first_name, '16px FiraSansLight', 213);
            var l_name = maxwidth_string(refs.recipient_user.last_name, '16px FiraSansLight', 213);
            
            panel_profile_cover(f_name + " " + l_name); // Ajusta alto del panel según el largo del nombre
            
            scope.usr = {};
            scope.usr.first_name = f_name;
            scope.usr.last_name = l_name;
            scope.usr.country = refs.recipient_user.nationality;
            scope.usr.sex = refs.recipient_user.sex;
            scope.usr.description = maxwidth_string(refs.recipient_user.description, '13px FiraSansBook', 186);
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
                scope.newMsg.content = maxwidth_string(scope.newMsg.content, '13px FiraSansBook', 174);
                console.log(scope.newMsg.content);
                refs.data_connection.send({message: scope.newMsg.content});
                scope.messages.push(scope.newMsg);
                scope.newMsg = {};
            }
        }
        
        scope.loadMessages = function() {
            scope.$apply();
        }
        
        // Siguiente usuario
        scope.nextUser = function() {

          if (refs.call)
          {
            refs.call.close();
            refs.call = null;
          }
          if (refs.data_connection)
          {
            refs.data_connection.close();
            refs.data_connection = null;
          }
          refs.talking = false;

          if (!refs.peer) {
            logError('please connect first');
          }

          /*
          if (!refs.localStream) {
            logError('could not search for a user because there is no localStream ready');
            return;
          }
          */
            start_load();
            scope.messages = [];
          refs.socket.emit('toc', refs.caller_id, refs.language);
          return;
            //scope.usr = {};
            //if (chat_visible()) { scope.$apply(); }
        }
    }])
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    console.log('Se ha presionado el enter');
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