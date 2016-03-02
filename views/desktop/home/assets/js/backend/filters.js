// FILTERS
app.filter('capitalize', function() {
        return function(input) {
            return (!!input) ? capitalize(input) : '';
        }
    });