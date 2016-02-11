$(document).ready(function(){

    function r_mundo() {
        var interval = null;
        var counter = 0;
        var $world = $('#mundo');
        var $airplane = $('#aviones');
        clearInterval(interval);
     
        interval = setInterval(function(){
            if (counter != -360) {
                counter -= 0.1;

                $world.css({
                    MozTransform: 'rotate(-' + -counter + 'deg)',
                    WebkitTransform: 'rotate(' + -counter + 'deg)',
                    transform: 'rotate(' + -counter + 'deg)'
                });

                $airplane.css({
                    MozTransform: 'rotate(+' + counter + 'deg)',
                    WebkitTransform: 'rotate(' + counter + 'deg)',
                    transform: 'rotate(' + counter + 'deg)'
                });
            }
        }, 10);

        return;
    }

    r_mundo();

});