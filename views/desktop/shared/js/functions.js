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
	word_tmp = word;
	if (word_tmp)
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
	msg_tmp = msg;
	words_list = [];
	words = msg.split(' ');
	for (key in words)
	{
		word = capitalizeWord(words[key]);
		words_list.push(word);
	}
	words = words_list.join(' ').trim();
	return words;

}