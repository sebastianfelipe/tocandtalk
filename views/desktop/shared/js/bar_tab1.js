$(document).ready(function(){

	$("#bar_tab1")
		.mouseenter(function() {
			$("#bar_tab_select1").fadeIn(400);
		})
		.mouseleave(function() {
			$("#bar_tab_select1").fadeOut(400);
	});

	$("#bar_tab1_icon")
		.mouseenter(function() {
			$("#bar_tab_select1_icon").fadeIn(400);
		})
		.mouseleave(function() {
			$("#bar_tab_select1_icon").fadeOut(400);
	});

});