$(document).ready(function(){

    var interval = null;
    var counter = 0;
    var $this = $('#mundo');
    clearInterval(interval);
 
    interval = setInterval(function(){
        if (counter != -360) {
            counter -= 0.1;
            $this.css({
                MozTransform: 'rotate(-' + -counter + 'deg)',
                WebkitTransform: 'rotate(' + -counter + 'deg)',
                transform: 'rotate(' + -counter + 'deg)'
            });
        }
    }, 10);

});

$(document).ready(function(){

    var interval = null;
    var counter = 0;
    var $this = $('#aviones');
    clearInterval(interval);
 
    interval = setInterval(function(){
        if (counter != -360) {
            counter -= 0.1;
            $this.css({
                MozTransform: 'rotate(+' + counter + 'deg)',
                WebkitTransform: 'rotate(' + counter + 'deg)',
                transform: 'rotate(' + counter + 'deg)'
            });
        }
    }, 10);

});