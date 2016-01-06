/*
function capitalizeFirstLetterName(name) {
	var name_array = name.split(' ');

	var name1 = ""
	for (i = 0; i < name_array.length; i++) {
		name1 += name_array[0].charAt(0).toUpperCase() + name_array[0].slice(1);

		if (i != name_array.length - 1) {
			name1 += " ";
		}
	}
	return name1;
}
*/
function capitalizeWord(word) {
	var word_tmp = word;
	if (!!word_tmp)
	{
		word = word_tmp[0].toUpperCase();
		if (word_tmp.length > 1)
		{
			word += word_tmp.substring(1).toLowerCase();
		}
	}
	return word;
}
function capitalize(msg) {
	var words = "";
	if (!!msg)
	{
		//var msg_tmp = msg;
		var words_list = [];
		words = msg.split(' ');
        
		words.forEach(function(word) {
			word = capitalizeWord(word);
			words_list.push(word);
		}); 

		words = words_list.join(' ').trim();
	}
	return words;
}

function valid_string(str) {
    // String nulo
    if (str == null) {
        return false;
    }
    // String sólo con espacios
    if (!str.replace(/\s/g, '').length) {
        return false;
    }
    return true;
}

function width_string(text, font) {
    var f = font || '13px FiraSansBook',
        o = $('<div>' + text + '</div>')
                .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
                .appendTo($('body')),
    w = o.width();
    o.remove();
    
    return w;
}

function maxwidth_string(text, size) {
    var array_txt = text.split(' ');
    
    var array_char_temp = [];
    var word_temp = "";
    var array_word_temp = [];
    
    for (var i = 0; i < array_txt.length; i++) {
        
        if (width_string(array_txt[i], '13px FiraSansBook') > size) {
            array_char_temp = array_txt[i].split("");
            
            for (var j = 0; j < array_char_temp.length; j++) {
                if (width_string(word_temp, '13px FiraSansBook') <= size) {
                    word_temp += array_char_temp[j];
                }
                else {
                    array_word_temp.push(word_temp);
                    word_temp = array_char_temp[j];
                }
            }
            
            array_word_temp.push(word_temp);
            array_txt[i] = array_word_temp.join(' ').trim();
            
            array_char_temp = [];
            word_temp = "";
            array_word_temp = [];
        }        
    }
    return array_txt.join(' ').trim();
}