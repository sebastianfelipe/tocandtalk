$(document).ready(function(){
    // Nombre de usuario

    $.ajaxSetup({async: false});
	var obj = $.getJSON("http://192.168.0.131:4000/test/validate/jon/lalalala").responseJSON;
    $.ajaxSetup({async: true});
	console.log(obj.errors);
    $('#lala').html(obj.errors);
});