function obj(obj$1) {
	return Array.isArray(obj$1) ? Object.fromEntries(obj$1.map((v, i) => [i, v])) : obj$1;
}
function debounce(callback, wait) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		return new Promise((resolve) => {
			timer = window.setTimeout(() => resolve(callback(...args)), wait);
		});
	};
}
export { obj as n, debounce as t };
