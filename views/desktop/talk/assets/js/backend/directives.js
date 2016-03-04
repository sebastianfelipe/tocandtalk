// DIRECTIVES

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                //console.log('Se ha presionado el enter');
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})

app.directive('updateChat', function() {
    return function(scope, element, attrs) {
        chat_position();
        chat_scroll_bottom();
    };
});