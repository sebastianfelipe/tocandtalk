// FILTERS
app.filter('capitalize', function () {
        return function (input) {
            return (!!input) ? capitalize(input) : '';
        };
});

app.filter('messageFormat', function () {
	return function (content) {
		return content ? maxwidth_string(content, '13px FiraSansBook', 174) : '';
	};
});

app.filter('userDescriptionFormat', function () {
	return function (content) {
		return content ? maxwidth_string(content, '13px FiraSansBook', 186) : '';
	};
});

app.filter('userNameFormat', function () {
	return function (content) {
		return content ? maxwidth_string(content, '16px FiraSansLight', 213) : '';
	};
});