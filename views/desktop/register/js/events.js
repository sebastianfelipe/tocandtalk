$(document).ready(function(){
	var frm = $('#form_register')
    frm.on('submit', function(e) {
    	var data = frm.serialize();
    	$.post(frm.attr('action'), data, function(res) {
        	console.log(res);
    		if (!res.errors)
    		{
				$(location).attr('href','/');
            }
    		else
    		{	
                reload(req, res.errors);
    		}
    		return;
    	}, 'json');
    	e.preventDefault();
    });
});