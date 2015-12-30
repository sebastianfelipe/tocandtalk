$(document).ready(function(){
    var forms = [$('#form_edit_user_nationality'),
                 $('#form_edit_user_description'),
                 $('#form_add_user_spoken_language'),
                 $('#form_add_user_interest_language')
                 //$('#form_remove_spoken_language'),
                 //$('#form_remove_interest_language'),
                 ]
    
    forms[0].on('submit', function(e) {
        $.post(forms[0].attr('action'), forms[0].serialize(), function(res) {
            console.log(res);
            reload(res);
            return;
        }, 'json');
        e.preventDefault();
    });

    forms[1].on('submit', function(e) {
        $.post(forms[1].attr('action'), forms[1].serialize(), function(res) {
            console.log(res);
            reload(res);
            return;
        }, 'json');
        e.preventDefault();
    });

    forms[2].on('submit', function(e) {
        $.post(forms[2].attr('action'), forms[2].serialize(), function(res) {
            console.log(res);
            reload(res);
            return;
        }, 'json');
        e.preventDefault();
    });

    forms[3].on('submit', function(e) {
        $.post(forms[3].attr('action'), forms[3].serialize(), function(res) {
            console.log(res);
            reload(res);
            return;
        }, 'json');
        e.preventDefault();
    });

    /*
    var form;
    
    for (key in forms)
    {
        forms[key].on('submit', function(e) {
        	$.post(forms[key].attr('action'), forms[key].serialize(), function(res) {
            	console.log(res);
                reload(res);
        		return;
        	}, 'json');
        	e.preventDefault();
        });
    }
    */
});