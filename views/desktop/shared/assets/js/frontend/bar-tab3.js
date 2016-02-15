$(document).ready(function(){

	$("#bar-tab3")
		.mouseenter(function() {
			$("#bar-tab-select3").fadeIn(400);
		})
		.mouseleave(function() {
			$("#bar-tab-select3").fadeOut(400);
	});

	$("#bar-tab3-icon")
		.mouseenter(function() {
			$("#bar-tab-select3-icon").fadeIn(400);
		})
		.mouseleave(function() {
			$("#bar-tab-select3-icon").fadeOut(400);
	});

});