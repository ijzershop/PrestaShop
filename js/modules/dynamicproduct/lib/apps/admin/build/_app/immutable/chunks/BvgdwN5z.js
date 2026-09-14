function sanitizeFieldName(name) {
	if (!name) return "";
	return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
}
function generateFieldLabel(name) {
	if (!name) return "";
	return name.split("_").map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word).join(" ");
}
export { sanitizeFieldName as n, generateFieldLabel as t };
