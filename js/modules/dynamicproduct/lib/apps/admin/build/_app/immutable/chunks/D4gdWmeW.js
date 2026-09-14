function formatMessage(message, params = {}) {
	let result = message;
	for (const param in params) result = result.replace(`_${param}_`, `${params[param]}`);
	return result;
}
function kbd(str) {
	return str.replace(/__/g, "</kbd>").replace(/_/g, "<kbd>");
}
export { kbd as n, formatMessage as t };
