$(document).ready(function(){

	$("#bar-tab1")
		.mouseenter(function() {
			$("#bar-tab-select1").fadeIn(400);
		})
		.mouseleave(function() {
			$("#bar-tab-select1").fadeOut(400);
	});

	$("#bar-tab1-icon")
		.mouseenter(function() {
			$("#bar-tab-select1-icon").fadeIn(400);
		})
		.mouseleave(function() {
			$("#bar-tab-select1-icon").fadeOut(400);
	});

});