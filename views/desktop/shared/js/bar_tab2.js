$(document).ready(function(){

	$("#bar_tab2")
		.mouseenter(function() {
			$("#bar_tab_select2").fadeIn(400);
		})
		.mouseleave(function() {
			$("#bar_tab_select2").fadeOut(400);
	});

	$("#bar_tab2_icon")
		.mouseenter(function() {
			$("#bar_tab_select2_icon").fadeIn(400);
		})
		.mouseleave(function() {
			$("#bar_tab_select2_icon").fadeOut(400);
	});

});