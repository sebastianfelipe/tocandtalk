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


$(document).ready(function(){
	

	

});