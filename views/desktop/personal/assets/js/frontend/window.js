/*  Ajusta la barra principal según el tamaño de la ventana.
    Tamaño máximo: 1066px
    */
$(document).ready(function() {

	function resizeContent() {
        var win_width = $(window).width();

        if (win_width < 1066) {

            var h_section1 = $('#profile-section1').height();

            $('#profile-section2')
                .css("margin-left", "0px")
                .css("margin-top", h_section1 + "px");
            $('#profile-content').width(530);

        } else {

            $('#profile-section2')
                .css("margin-left", "536px")
                .css("margin-top", "0px");
            $('#profile-content').width(1066);
        }  
    }
    
    resizeContent();
    $(window).resize(function() { resizeContent() });
        
});