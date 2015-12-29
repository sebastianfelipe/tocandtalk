$(document).ready(function () {

	function margin_dialog(ico_margin, id_dialog) {
		var w = $(id_dialog).width();
		var m = ico_margin + ($("#b_dialog_container").width() - 311) / 2;

		// (501-311)/2 = 95
		// 54/2 = 27
		var margin = 27 + m - w / 2;
		$(id_dialog).css("margin-left", margin + "px");
		return;
	}

	margin_dialog(0, "#b_dialog_vol");
	margin_dialog(58, "#b_dialog_fullscr");
	margin_dialog(121, "#b_dialog_mic");
	margin_dialog(179, "#b_dialog_video");
	margin_dialog(257, "#b_dialog_next");

	$("#b_icon_vol")
		.mouseenter(function() {
			$("#b_dialog_vol").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_vol").fadeOut(160);
	});

	$("#b_icon_fullscr")
		.mouseenter(function() {
			$("#b_dialog_fullscr").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_fullscr").fadeOut(160);
	});

	$("#b_icon_mic")
		.mouseenter(function() {
			$("#b_dialog_mic").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_mic").fadeOut(160);
	});

	$("#b_icon_video")
		.mouseenter(function() {
			$("#b_dialog_video").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_video").fadeOut(160);
	});

	$("#search")
		.mouseenter(function() {
			$("#b_dialog_next").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_next").fadeOut(160);
	});

});
