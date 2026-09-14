import { $ as props_id, Ct as set, F as element, Ft as push, G as if_block, H as index, Kt as noop, Ot as user_derived, Pt as pop, Q as from_svg, R as snippet, T as attribute_effect, Tt as state, Ut as reset, V as each, X as comment, Y as append, Z as from_html, bt as sibling, c as spread_props, o as prop, ot as get, qt as to_array, s as rest_props, vt as child, yt as first_child } from "./DUscB9kS.js";
import { d as mergeProps, l as getDataOpenClosed, n as boolToEmptyStrOrUndef, o as createBitsAttrs, r as boolToStr, t as createId, u as attachRef, y as boxWith } from "./B4l8ufIa.js";
import { E as onDestroyEffect, a as Escape_layer, b as PresenceManager, i as Focus_scope, o as Dismissible_layer, r as Text_selection_layer, t as Scroll_lock } from "./B3A_TfMF.js";
import { O as SPACE, R as watch, l as ENTER, z as Context } from "./_yKPJ4BA.js";
import { t as noop$1 } from "./BoWJNiZV.js";
var dialogAttrs = createBitsAttrs({
	component: "dialog",
	parts: [
		"content",
		"trigger",
		"overlay",
		"title",
		"description",
		"close",
		"cancel",
		"action"
	]
});
var DialogRootContext = new Context("Dialog.Root | AlertDialog.Root");
var DialogRootState = class DialogRootState {
	static create(opts) {
		const parent = DialogRootContext.getOr(null);
		return DialogRootContext.set(new DialogRootState(opts, parent));
	}
	opts;
	#triggerNode = state(null);
	get triggerNode() {
		return get(this.#triggerNode);
	}
	set triggerNode(value) {
		set(this.#triggerNode, value, true);
	}
	#contentNode = state(null);
	get contentNode() {
		return get(this.#contentNode);
	}
	set contentNode(value) {
		set(this.#contentNode, value, true);
	}
	#overlayNode = state(null);
	get overlayNode() {
		return get(this.#overlayNode);
	}
	set overlayNode(value) {
		set(this.#overlayNode, value, true);
	}
	#descriptionNode = state(null);
	get descriptionNode() {
		return get(this.#descriptionNode);
	}
	set descriptionNode(value) {
		set(this.#descriptionNode, value, true);
	}
	#contentId = state(void 0);
	get contentId() {
		return get(this.#contentId);
	}
	set contentId(value) {
		set(this.#contentId, value, true);
	}
	#titleId = state(void 0);
	get titleId() {
		return get(this.#titleId);
	}
	set titleId(value) {
		set(this.#titleId, value, true);
	}
	#triggerId = state(void 0);
	get triggerId() {
		return get(this.#triggerId);
	}
	set triggerId(value) {
		set(this.#triggerId, value, true);
	}
	#descriptionId = state(void 0);
	get descriptionId() {
		return get(this.#descriptionId);
	}
	set descriptionId(value) {
		set(this.#descriptionId, value, true);
	}
	#cancelNode = state(null);
	get cancelNode() {
		return get(this.#cancelNode);
	}
	set cancelNode(value) {
		set(this.#cancelNode, value, true);
	}
	#nestedOpenCount = state(0);
	get nestedOpenCount() {
		return get(this.#nestedOpenCount);
	}
	set nestedOpenCount(value) {
		set(this.#nestedOpenCount, value, true);
	}
	depth;
	parent;
	contentPresence;
	overlayPresence;
	constructor(opts, parent) {
		this.opts = opts;
		this.parent = parent;
		this.depth = parent ? parent.depth + 1 : 0;
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.contentPresence = new PresenceManager({
			ref: boxWith(() => this.contentNode),
			open: this.opts.open,
			enabled: true,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		});
		this.overlayPresence = new PresenceManager({
			ref: boxWith(() => this.overlayNode),
			open: this.opts.open,
			enabled: true
		});
		watch(() => this.opts.open.current, (isOpen) => {
			if (!this.parent) return;
			if (isOpen) this.parent.incrementNested();
			else this.parent.decrementNested();
		}, { lazy: true });
		onDestroyEffect(() => {
			if (this.opts.open.current) this.parent?.decrementNested();
		});
	}
	handleOpen() {
		if (this.opts.open.current) return;
		this.opts.open.current = true;
	}
	handleClose() {
		if (!this.opts.open.current) return;
		this.opts.open.current = false;
	}
	getBitsAttr = (part) => {
		return dialogAttrs.getAttr(part, this.opts.variant.current);
	};
	incrementNested() {
		this.nestedOpenCount++;
		this.parent?.incrementNested();
	}
	decrementNested() {
		if (this.nestedOpenCount === 0) return;
		this.nestedOpenCount--;
		this.parent?.decrementNested();
	}
	#sharedProps = user_derived(() => ({ "data-state": getDataOpenClosed(this.opts.open.current) }));
	get sharedProps() {
		return get(this.#sharedProps);
	}
	set sharedProps(value) {
		set(this.#sharedProps, value);
	}
};
var DialogTriggerState = class DialogTriggerState {
	static create(opts) {
		return new DialogTriggerState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root$1) {
		this.opts = opts;
		this.root = root$1;
		this.attachment = attachRef(this.opts.ref, (v) => {
			this.root.triggerNode = v;
			this.root.triggerId = v?.id;
		});
		this.onclick = this.onclick.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		if (this.opts.disabled.current) return;
		if (e.button > 0) return;
		this.root.handleOpen();
	}
	onkeydown(e) {
		if (this.opts.disabled.current) return;
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			this.root.handleOpen();
		}
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		"aria-haspopup": "dialog",
		"aria-expanded": boolToStr(this.root.opts.open.current),
		"aria-controls": this.root.contentId,
		[this.root.getBitsAttr("trigger")]: "",
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		disabled: this.opts.disabled.current ? true : void 0,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var DialogCloseState = class DialogCloseState {
	static create(opts) {
		return new DialogCloseState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root$1) {
		this.opts = opts;
		this.root = root$1;
		this.attachment = attachRef(this.opts.ref);
		this.onclick = this.onclick.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		if (this.opts.disabled.current) return;
		if (e.button > 0) return;
		this.root.handleClose();
	}
	onkeydown(e) {
		if (this.opts.disabled.current) return;
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			this.root.handleClose();
		}
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr(this.opts.variant.current)]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		disabled: this.opts.disabled.current ? true : void 0,
		tabindex: 0,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var DialogTitleState = class DialogTitleState {
	static create(opts) {
		return new DialogTitleState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root$1) {
		this.opts = opts;
		this.root = root$1;
		this.root.titleId = this.opts.id.current;
		this.attachment = attachRef(this.opts.ref);
		watch.pre(() => this.opts.id.current, (id) => {
			this.root.titleId = id;
		});
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "heading",
		"aria-level": this.opts.level.current,
		[this.root.getBitsAttr("title")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var DialogDescriptionState = class DialogDescriptionState {
	static create(opts) {
		return new DialogDescriptionState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root$1) {
		this.opts = opts;
		this.root = root$1;
		this.root.descriptionId = this.opts.id.current;
		this.attachment = attachRef(this.opts.ref, (v) => {
			this.root.descriptionNode = v;
		});
		watch.pre(() => this.opts.id.current, (id) => {
			this.root.descriptionId = id;
		});
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("description")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var DialogContentState = class DialogContentState {
	static create(opts) {
		return new DialogContentState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root$1) {
		this.opts = opts;
		this.root = root$1;
		this.attachment = attachRef(this.opts.ref, (v) => {
			this.root.contentNode = v;
			this.root.contentId = v?.id;
		});
	}
	#snippetProps = user_derived(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return get(this.#snippetProps);
	}
	set snippetProps(value) {
		set(this.#snippetProps, value);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: this.root.opts.variant.current === "alert-dialog" ? "alertdialog" : "dialog",
		"aria-modal": "true",
		"aria-describedby": this.root.descriptionId,
		"aria-labelledby": this.root.titleId,
		[this.root.getBitsAttr("content")]: "",
		style: {
			pointerEvents: "auto",
			outline: this.root.opts.variant.current === "alert-dialog" ? "none" : void 0,
			"--bits-dialog-depth": this.root.depth,
			"--bits-dialog-nested-count": this.root.nestedOpenCount
		},
		tabindex: this.root.opts.variant.current === "alert-dialog" ? -1 : void 0,
		"data-nested-open": boolToEmptyStrOrUndef(this.root.nestedOpenCount > 0),
		"data-nested": boolToEmptyStrOrUndef(this.root.parent !== null),
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
};
var DialogOverlayState = class DialogOverlayState {
	static create(opts) {
		return new DialogOverlayState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root$1) {
		this.opts = opts;
		this.root = root$1;
		this.attachment = attachRef(this.opts.ref, (v) => this.root.overlayNode = v);
	}
	#snippetProps = user_derived(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return get(this.#snippetProps);
	}
	set snippetProps(value) {
		set(this.#snippetProps, value);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("overlay")]: "",
		style: {
			pointerEvents: "auto",
			"--bits-dialog-depth": this.root.depth,
			"--bits-dialog-nested-count": this.root.nestedOpenCount
		},
		"data-nested-open": boolToEmptyStrOrUndef(this.root.nestedOpenCount > 0),
		"data-nested": boolToEmptyStrOrUndef(this.root.parent !== null),
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
	get shouldRender() {
		return this.root.overlayPresence.shouldRender;
	}
};
var root_2$3 = from_html(`<div><!></div>`);
function Dialog_title($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), level = prop($$props, "level", 3, 2), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"child",
		"children",
		"level"
	]);
	const titleState = DialogTitleState.create({
		id: boxWith(() => id()),
		level: boxWith(() => level()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, titleState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var div = root_2$3();
		attribute_effect(div, () => ({ ...get(mergedProps) }));
		snippet(child(div), () => $$props.children ?? noop);
		reset(div);
		append($$anchor$1, div);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
var root_3 = from_html(`<div><!></div>`);
function Dialog_overlay($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), forceMount = prop($$props, "forceMount", 3, false), ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"forceMount",
		"child",
		"children",
		"ref"
	]);
	const overlayState = DialogOverlayState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, overlayState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent_1 = ($$anchor$1) => {
		var fragment_1 = comment();
		var node_1 = first_child(fragment_1);
		var consequent = ($$anchor$2) => {
			var fragment_2 = comment();
			var node_2 = first_child(fragment_2);
			{
				let $0 = user_derived(() => ({
					props: mergeProps(get(mergedProps)),
					...overlayState.snippetProps
				}));
				snippet(node_2, () => $$props.child, () => get($0));
			}
			append($$anchor$2, fragment_2);
		};
		var alternate = ($$anchor$2) => {
			var div = root_3();
			attribute_effect(div, ($0) => ({ ...$0 }), [() => mergeProps(get(mergedProps))]);
			snippet(child(div), () => $$props.children ?? noop, () => overlayState.snippetProps);
			reset(div);
			append($$anchor$2, div);
		};
		if_block(node_1, ($$render) => {
			if ($$props.child) $$render(consequent);
			else $$render(alternate, false);
		});
		append($$anchor$1, fragment_1);
	};
	if_block(node, ($$render) => {
		if (overlayState.shouldRender || forceMount()) $$render(consequent_1);
	});
	append($$anchor, fragment);
	pop();
}
var root_2$2 = from_html(`<button><!></button>`);
function Dialog_trigger($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), disabled = prop($$props, "disabled", 3, false), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"children",
		"child",
		"disabled"
	]);
	const triggerState = DialogTriggerState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		disabled: boxWith(() => Boolean(disabled()))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, triggerState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var button = root_2$2();
		attribute_effect(button, () => ({ ...get(mergedProps) }));
		snippet(child(button), () => $$props.children ?? noop);
		reset(button);
		append($$anchor$1, button);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
var root_2$1 = from_html(`<div><!></div>`);
function Dialog_description($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"children",
		"child",
		"ref"
	]);
	const descriptionState = DialogDescriptionState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, descriptionState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var div = root_2$1();
		attribute_effect(div, () => ({ ...get(mergedProps) }));
		snippet(child(div), () => $$props.children ?? noop);
		reset(div);
		append($$anchor$1, div);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
function Dialog($$anchor, $$props) {
	push($$props, true);
	let open = prop($$props, "open", 15, false), onOpenChange = prop($$props, "onOpenChange", 3, noop$1), onOpenChangeComplete = prop($$props, "onOpenChangeComplete", 3, noop$1);
	DialogRootState.create({
		variant: boxWith(() => "dialog"),
		open: boxWith(() => open(), (v) => {
			open(v);
			onOpenChange()(v);
		}),
		onOpenChangeComplete: boxWith(() => onOpenChangeComplete())
	});
	var fragment = comment();
	snippet(first_child(fragment), () => $$props.children ?? noop);
	append($$anchor, fragment);
	pop();
}
var root_2 = from_html(`<button><!></button>`);
function Dialog_close($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), disabled = prop($$props, "disabled", 3, false), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"children",
		"child",
		"id",
		"ref",
		"disabled"
	]);
	const closeState = DialogCloseState.create({
		variant: boxWith(() => "close"),
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		disabled: boxWith(() => Boolean(disabled()))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, closeState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var button = root_2();
		attribute_effect(button, () => ({ ...get(mergedProps) }));
		snippet(child(button), () => $$props.children ?? noop);
		reset(button);
		append($$anchor$1, button);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
var root_6 = from_html(`<!> <!>`, 1);
var root_8 = from_html(`<!> <div><!></div>`, 1);
function Dialog_content($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), forceMount = prop($$props, "forceMount", 3, false), onCloseAutoFocus = prop($$props, "onCloseAutoFocus", 3, noop$1), onOpenAutoFocus = prop($$props, "onOpenAutoFocus", 3, noop$1), onEscapeKeydown = prop($$props, "onEscapeKeydown", 3, noop$1), onInteractOutside = prop($$props, "onInteractOutside", 3, noop$1), trapFocus = prop($$props, "trapFocus", 3, true), preventScroll = prop($$props, "preventScroll", 3, true), restoreScrollDelay = prop($$props, "restoreScrollDelay", 3, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"children",
		"child",
		"ref",
		"forceMount",
		"onCloseAutoFocus",
		"onOpenAutoFocus",
		"onEscapeKeydown",
		"onInteractOutside",
		"trapFocus",
		"preventScroll",
		"restoreScrollDelay"
	]);
	const contentState = DialogContentState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, contentState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent_2 = ($$anchor$1) => {
		{
			const focusScope = ($$anchor$2, $$arg0) => {
				let focusScopeProps = () => $$arg0?.().props;
				Escape_layer($$anchor$2, spread_props(() => get(mergedProps), {
					get enabled() {
						return contentState.root.opts.open.current;
					},
					get ref() {
						return contentState.opts.ref;
					},
					onEscapeKeydown: (e) => {
						onEscapeKeydown()(e);
						if (e.defaultPrevented) return;
						contentState.root.handleClose();
					},
					children: ($$anchor$3, $$slotProps) => {
						Dismissible_layer($$anchor$3, spread_props(() => get(mergedProps), {
							get ref() {
								return contentState.opts.ref;
							},
							get enabled() {
								return contentState.root.opts.open.current;
							},
							onInteractOutside: (e) => {
								onInteractOutside()(e);
								if (e.defaultPrevented) return;
								contentState.root.handleClose();
							},
							children: ($$anchor$4, $$slotProps$1) => {
								Text_selection_layer($$anchor$4, spread_props(() => get(mergedProps), {
									get ref() {
										return contentState.opts.ref;
									},
									get enabled() {
										return contentState.root.opts.open.current;
									},
									children: ($$anchor$5, $$slotProps$2) => {
										var fragment_5 = comment();
										var node_1 = first_child(fragment_5);
										var consequent_1 = ($$anchor$6) => {
											var fragment_6 = root_6();
											var node_2 = first_child(fragment_6);
											var consequent = ($$anchor$7) => {
												Scroll_lock($$anchor$7, {
													get preventScroll() {
														return preventScroll();
													},
													get restoreScrollDelay() {
														return restoreScrollDelay();
													}
												});
											};
											if_block(node_2, ($$render) => {
												if (contentState.root.opts.open.current) $$render(consequent);
											});
											var node_3 = sibling(node_2, 2);
											{
												let $0 = user_derived(() => ({
													props: mergeProps(get(mergedProps), focusScopeProps()),
													...contentState.snippetProps
												}));
												snippet(node_3, () => $$props.child, () => get($0));
											}
											append($$anchor$6, fragment_6);
										};
										var alternate = ($$anchor$6) => {
											var fragment_8 = root_8();
											var node_4 = first_child(fragment_8);
											Scroll_lock(node_4, { get preventScroll() {
												return preventScroll();
											} });
											var div = sibling(node_4, 2);
											attribute_effect(div, ($0) => ({ ...$0 }), [() => mergeProps(get(mergedProps), focusScopeProps())]);
											snippet(child(div), () => $$props.children ?? noop);
											reset(div);
											append($$anchor$6, fragment_8);
										};
										if_block(node_1, ($$render) => {
											if ($$props.child) $$render(consequent_1);
											else $$render(alternate, false);
										});
										append($$anchor$5, fragment_5);
									},
									$$slots: { default: true }
								}));
							},
							$$slots: { default: true }
						}));
					},
					$$slots: { default: true }
				}));
			};
			Focus_scope($$anchor$1, {
				get ref() {
					return contentState.opts.ref;
				},
				loop: true,
				get trapFocus() {
					return trapFocus();
				},
				get enabled() {
					return contentState.root.opts.open.current;
				},
				get onOpenAutoFocus() {
					return onOpenAutoFocus();
				},
				get onCloseAutoFocus() {
					return onCloseAutoFocus();
				},
				focusScope,
				$$slots: { focusScope: true }
			});
		}
	};
	if_block(node, ($$render) => {
		if (contentState.shouldRender || forceMount()) $$render(consequent_2);
	});
	append($$anchor, fragment);
	pop();
}
var defaultAttributes_default = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
var root = from_svg(`<svg><!><!></svg>`);
function Icon($$anchor, $$props) {
	push($$props, true);
	const color = prop($$props, "color", 3, "currentColor"), size = prop($$props, "size", 3, 24), strokeWidth = prop($$props, "strokeWidth", 3, 2), absoluteStrokeWidth = prop($$props, "absoluteStrokeWidth", 3, false), iconNode = prop($$props, "iconNode", 19, () => []), props = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"name",
		"color",
		"size",
		"strokeWidth",
		"absoluteStrokeWidth",
		"iconNode",
		"children"
	]);
	var svg = root();
	attribute_effect(svg, ($0) => ({
		...defaultAttributes_default,
		...props,
		width: size(),
		height: size(),
		stroke: color(),
		"stroke-width": $0,
		class: [
			"lucide-icon lucide",
			$$props.name && `lucide-${$$props.name}`,
			$$props.class
		]
	}), [() => absoluteStrokeWidth() ? Number(strokeWidth()) * 24 / Number(size()) : strokeWidth()]);
	var node = child(svg);
	each(node, 17, iconNode, index, ($$anchor$1, $$item) => {
		var $$array = user_derived(() => to_array(get($$item), 2));
		let tag = () => get($$array)[0];
		let attrs = () => get($$array)[1];
		var fragment = comment();
		element(first_child(fragment), tag, true, ($$element, $$anchor$2) => {
			attribute_effect($$element, () => ({ ...attrs() }));
		});
		append($$anchor$1, fragment);
	});
	snippet(sibling(node), () => $$props.children ?? noop);
	reset(svg);
	append($$anchor, svg);
	pop();
}
function X($$anchor, $$props) {
	push($$props, true);
	/**
	* @license @lucide/svelte v0.562.0 - ISC
	*
	* ISC License
	*
	* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
	*
	* Permission to use, copy, modify, and/or distribute this software for any
	* purpose with or without fee is hereby granted, provided that the above
	* copyright notice and this permission notice appear in all copies.
	*
	* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	*
	* ---
	*
	* The MIT License (MIT) (for portions derived from Feather)
	*
	* Copyright (c) 2013-2023 Cole Bemis
	*
	* Permission is hereby granted, free of charge, to any person obtaining a copy
	* of this software and associated documentation files (the "Software"), to deal
	* in the Software without restriction, including without limitation the rights
	* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the Software is
	* furnished to do so, subject to the following conditions:
	*
	* The above copyright notice and this permission notice shall be included in all
	* copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	* SOFTWARE.
	*
	*/
	let props = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy"
	]);
	const iconNode = [["path", { "d": "M18 6 6 18" }], ["path", { "d": "m6 6 12 12" }]];
	Icon($$anchor, spread_props({ name: "x" }, () => props, {
		get iconNode() {
			return iconNode;
		},
		children: ($$anchor$1, $$slotProps) => {
			var fragment_1 = comment();
			snippet(first_child(fragment_1), () => $$props.children ?? noop);
			append($$anchor$1, fragment_1);
		},
		$$slots: { default: true }
	}));
	pop();
}
export { Dialog as a, Dialog_overlay as c, Dialog_close as i, Dialog_title as l, Icon as n, Dialog_description as o, Dialog_content as r, Dialog_trigger as s, X as t };
