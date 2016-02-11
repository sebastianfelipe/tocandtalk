$(document).ready(function(){
    
    position_content();
    $(window).resize(function() { position_content() });
    
    start_load();
    
    $("#load_skip").click(function() {   
        end_load();
    });

});