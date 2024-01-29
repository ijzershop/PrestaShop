var _ = require('lodash');
function Globalize(name, obj) {
	if(window[name]) {
		_.extend(window[name], obj);
	} else {
		window[name] = obj;
	}
}

module.exports = Globalize;