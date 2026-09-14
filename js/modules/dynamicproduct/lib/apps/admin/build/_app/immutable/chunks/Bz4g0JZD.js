function sort(obj) {
	return Object.values(obj).sort((a, b) => a.position - b.position);
}
export { sort as t };
