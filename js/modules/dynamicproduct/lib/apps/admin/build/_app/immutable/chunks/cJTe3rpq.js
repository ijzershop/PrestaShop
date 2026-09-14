import { t as sortable_esm_default } from "./GxWY6lrD.js";
function sortable(node, { onEnd }) {
	let list = node.querySelector("tbody");
	if (!list) list = node;
	const sortable$1 = sortable_esm_default.create(list, {
		handle: ".handle",
		animation: 150,
		ghostClass: "bg-gray-200",
		onEnd
	});
	return { destroy() {
		sortable$1.destroy();
	} };
}
export { sortable as t };
