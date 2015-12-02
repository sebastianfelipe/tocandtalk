$(document).ready(function(){

	var interval = null;
    
    var state = false;
    var $button_save = $('.button_save');
    clearInterval(interval);
 
    interval = setInterval(function(){
            if (state) {
                $button_save.css({
                    boxShadow: '0px 0px 5px 0px #00e676',
                    background: '#00e676'
                });
                state = false;

            } else {
                $button_save.css({
                    boxShadow: 'none',
                    background: '#00d06b'
                });
                state = true;
            }
    }, 900);

    /*
    clearInterval(interval2);
    var interval2 = null;
    interval2 = setInterval(function(){
        var isHovered = !!$button_save.
                    filter(function() { return $(this).is(":hover"); }).length;

        if (isHovered) {

            $button_save.css({
                boxShadow: '0px 0px 6px 0px #69f0ae',
                background: '#00e676'
            });

        }
    }, 10);
    */
        
});
