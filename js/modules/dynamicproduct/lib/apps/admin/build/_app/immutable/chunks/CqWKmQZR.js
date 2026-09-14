function submitOnEnter(form, params) {
	const { submit } = params;
	function submitOnEnter$1(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			submit();
		}
	}
	form.addEventListener("keydown", submitOnEnter$1);
	return { destroy() {
		form.removeEventListener("keydown", submitOnEnter$1);
	} };
}
function navigate(node) {
	const keydown = (event) => {
		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			const target = event.target;
			if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLButtonElement)) return;
			const tag = target.tagName.toLowerCase();
			const table = target.closest("table");
			const cell = target.closest("td") || target.closest("th");
			const row = target.closest("tr");
			if (!table || !cell || !row) return;
			const nextRow = event.key === "ArrowDown" ? row.nextElementSibling : row.previousElementSibling;
			if (!nextRow) return;
			const cellIndex = cell.cellIndex;
			const nextCell = nextRow.cells[cellIndex];
			if (!nextCell) return;
			const element = nextCell.querySelector(tag);
			if (element) {
				if (element instanceof HTMLInputElement) {
					element.focus();
					element.select();
				}
				if (element instanceof HTMLButtonElement) element.focus();
				event.preventDefault();
			}
		}
	};
	node.addEventListener("keydown", keydown);
	return { destroy() {
		node.removeEventListener("keydown", keydown);
	} };
}
export { submitOnEnter as n, navigate as t };
