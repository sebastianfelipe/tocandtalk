$(document).ready(function(){

	$("#bar-tab2")
		.mouseenter(function() {
			$("#bar-tab-select2").fadeIn(400);
		})
		.mouseleave(function() {
			$("#bar-tab-select2").fadeOut(400);
	});

	$("#bar-tab2-icon")
		.mouseenter(function() {
			$("#bar-tab-select2-icon").fadeIn(400);
		})
		.mouseleave(function() {
			$("#bar-tab-select2-icon").fadeOut(400);
	});

});