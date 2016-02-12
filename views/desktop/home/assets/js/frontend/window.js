/*  Ajusta la barra principal según el tamaño de la ventana.
    Tamaño máximo: 1066px
    */
$(document).ready(function(){

	function resizeContent() {
        var win_width = $(window).width();

        if (win_width < 280) {
            $('#home_content').width(270);
            
            $('#home_section1').width(270);
            $('#home_section2')
                .css("position", "relative")
                .css("margin-left", "2px")
                .width(270);
            
            $('.button_start')
                .width(270)
                .height(270 * 382 / 530);

        } else if (win_width < 580) {
        	
            win_width -= 10;
            $('#home_content').width(win_width);

            $('#home_section1').width(win_width);
            $('#home_section2')
                .css("position", "relative")
                .css("margin-left", "5px")
                .width(win_width);

            $('.button_start')
                .width(win_width)
                .height(win_width * 382 / 530);

        } else if (win_width < 1066) {
            section_width = (win_width - 2) / 2;

            $('#home_content').width(win_width);
            
            $('#home_section1').width(section_width);
            $('#home_section2')
                .css("position", "absolute")
                .css("margin-left", (section_width + 2) + "px")
                .width(section_width);

            $('.button_start')
                .width(section_width)
                .height(section_width * 382 / 530);
            
        } else {
            $('#home_content').width(1066);
            
            $('#home_section1').width(530);
            $('#home_section2')
                .css("position", "absolute")
                .css("margin-left", "536px")
                .width(530);

            $('.button_start')
                .width(530)
                .height(382);
        }
    }
    
    resizeContent();
    $(window).resize(function() { resizeContent() });
});