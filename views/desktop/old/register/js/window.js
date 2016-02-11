$(document).ready(function(){

    function resizeDivs() {
        var winwidth = $(window).width();
        var winheight = $(window).height();

        if (winheight <= 830) {
            $('#portada').height(830);
            $('#portada-fondo').height(830);
            $('#portada-nubes').height(830);
            $('#mundo').css("margin-top", "427px");
            $('#aviones').css("margin-top", "422px");

        } else {
            var doc_height = $(document).height();

            $('#portada').height(doc_height);
            $('#portada-fondo').height(doc_height);
            $('#portada-nubes').height(doc_height);
            $('#mundo').css("margin-top", (doc_height - 373) + "px");
            $('#aviones').css("margin-top", (doc_height - 378) + "px");
        }

        if (winwidth <= 530) {
            $("#portada").css("left", - "268px");
            $("#portada").width(798);
			
		} else if (winwidth < 1066) {
            doc_width = $(document).width();

            var new_left = (1066 - winwidth) / 2;
            $("#portada").css("left", - new_left + "px");
            $("#portada").width(winwidth + new_left);

        } else if (winwidth > 1066) {

            $("#portada").css("left", "auto");
            $("#portada").css("width", "100%");

        }
    }

    resizeDivs();
    $(window).resize(function() { resizeDivs() });
});