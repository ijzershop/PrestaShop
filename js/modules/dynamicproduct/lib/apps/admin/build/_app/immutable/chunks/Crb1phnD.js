import { n as dev } from "./DgeI1AN1.js";
import { c as pathJoin, f as dpa } from "./BIEFGHhw.js";
function url(pathname$1) {
	if (!dev) return pathJoin(dpa.app_uri || "", pathname$1);
	return pathJoin("/dev/", pathname$1);
}
function strip_base_path(path) {
	if (path === void 0) return "";
	if (!dev) return path.replace(dpa.app_uri || "", "/");
	return path.replace("/dev/", "/");
}
function pathname(href) {
	const i = href.indexOf("?");
	return i === -1 ? href : href.slice(0, i);
}
export { strip_base_path as n, url as r, pathname as t };
