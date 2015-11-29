/*	Rota #button_start_img al pasar el puntero del
	mouse encima.
	*/
$(document).ready(function() {
	
	var $this = $('#button_start_img');

	var interval = null;
    var counter = 0;
    var state = true;
    clearInterval(interval);

	$this
		.mouseenter(function() {
		    interval = setInterval(function(){
		    	/* Gira en un intervalo de -6, +6 grados */
		    	if (counter <= -6) {
		    		state = true;
		    	} else if (counter >= 6) {
		    		state = false;
		    	}

		    	if (state) {
		    		counter += 0.7;
		    	} else {
		    		counter -= 0.7;
		    	}

		        $this.css({
		            MozTransform: 'rotate(-' + -counter + 'deg)',
		            WebkitTransform: 'rotate(' + -counter + 'deg)',
		            transform: 'rotate(' + -counter + 'deg)'
		        });
		    }, 10);
		})
		.mouseleave(function() {
			clearInterval(interval);
			$this.css({
	            MozTransform: 'none',
	            WebkitTransform: 'none',
	            transform: 'none'
	        });
		});

});