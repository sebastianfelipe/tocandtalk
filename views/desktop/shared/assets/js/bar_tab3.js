$(document).ready(function(){

	$("#bar_tab3")
		.mouseenter(function() {
			$("#bar_tab_select3").fadeIn(400);
		})
		.mouseleave(function() {
			$("#bar_tab_select3").fadeOut(400);
	});

	$("#bar_tab3_icon")
		.mouseenter(function() {
			$("#bar_tab_select3_icon").fadeIn(400);
		})
		.mouseleave(function() {
			$("#bar_tab_select3_icon").fadeOut(400);
	});

});