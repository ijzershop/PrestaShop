function flatten(arr) {
	return arr.reduce((flat, toFlatten) => {
		return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	}, []);
}
function reorder(objects, direction = "ASC") {
	const result = [];
	for (const id in objects) {
		if (!Object.hasOwn(objects, id)) continue;
		const obj = objects[id];
		const position = obj.position || 0;
		if (!result[position]) result[position] = [];
		result[position].push(obj);
	}
	const ordered = flatten(result);
	if (direction === "DESC") return ordered.reverse();
	return ordered;
}
export { reorder as t };
