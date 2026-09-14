import { Yt as true_default } from "./DUscB9kS.js";
var HttpError = class {
	constructor(status, body) {
		this.status = status;
		if (typeof body === "string") this.body = { message: body };
		else if (body) this.body = body;
		else this.body = { message: `Error: ${status}` };
	}
	toString() {
		return JSON.stringify(this.body);
	}
};
var Redirect = class {
	constructor(status, location) {
		this.status = status;
		this.location = location;
	}
};
var SvelteKitError = class extends Error {
	constructor(status, text, message) {
		super(message);
		this.status = status;
		this.text = text;
	}
};
new TextEncoder();
new TextDecoder();
function base64_decode(encoded) {
	const binary = atob(encoded);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
export { SvelteKitError as i, HttpError as n, Redirect as r, base64_decode as t };
