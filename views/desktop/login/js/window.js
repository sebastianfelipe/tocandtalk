$(document).ready(function(){

    function resizeDivs() {
        var winwidth = $(window).width();

        if (winwidth < 560) {

            $("#portada").width(540);
            $("#portada-contenido").width(540);

            $("#portada-fondo").width(560);
            $("#portada-nubes").width(560);
            $("#portada-fin").width(560);

            $("#mundo").width(540);
            $('#aviones').width(540);
            $("#globos").width(520);

            $("#portada-fin").css('margin-top', '620px');

            if ($(document).height() > 620) {
                $("#portada-fin").height($(document).height() - 620);
            } else {
                $("#portada-fin").height(50);
            }


        } else if (winwidth < 1066) {
            new_width = winwidth - 14;

            $("#portada").width(new_width);
            $("#portada-contenido").width(new_width);
            
            $("#portada-fondo").css('width','100%');
            $("#portada-fin").css('width','100%');
            $("#portada-nubes").css('width','100%');

            $("#mundo").width(new_width);
            $('#aviones').width(new_width);
            $("#globos").width(new_width - 6);

            var new_margin = 0.1581 * winwidth + 531.5;
            $("#portada-fin").css('margin-top', new_margin + 'px');

            if ($(document).height() > new_margin) {
                $("#portada-fin").height($(document).height() - new_margin);
            } else {
                $("#portada-fin").height(50);
            }

        } else if (winwidth > 1066) {

            $("#portada").css('width','100%');
            $("#portada-contenido").width(1000);

            $("#portada-fondo").css('width','100%');
            $("#portada-fin").css('width','100%');
            $("#portada-nubes").css('width','100%');

            $("#mundo").width(1066);
            $("#aviones").width(1066);
            $("#globos").width(1000);

            $("#portada-fin").css('margin-top', '700px');
            $("#portada-fin").height(50);
        }

    }

    resizeDivs();
    $(window).resize(function() { resizeDivs() });
});