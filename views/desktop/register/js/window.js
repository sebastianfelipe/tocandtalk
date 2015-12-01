$(document).ready(function(){

    function resizeDivs() {
        var winwidth = $(window).width();

        var mundo_h = $('#mundo').height();
        var doc_h = $(document).height();

        $('#mundo').css("margin-top", (doc_h - mundo_h / 3.5) + "px");
        $('#aviones').css("margin-top", (doc_h - mundo_h / 3.5) + "px");
    }

    resizeDivs();
    $(window).resize(function() { resizeDivs() });
});