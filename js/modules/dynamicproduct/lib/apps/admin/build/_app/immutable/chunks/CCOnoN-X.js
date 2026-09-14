import { $ as props_id, Ct as set, Ft as push, G as if_block, Kt as noop, L as component, Ot as user_derived, Pt as pop, R as snippet, T as attribute_effect, Tt as state, Ut as reset, X as comment, Y as append, Z as from_html, c as spread_props, o as prop, ot as get, s as rest_props, vt as child, yt as first_child } from "./DUscB9kS.js";
import { r as cn } from "./BIEFGHhw.js";
import { d as mergeProps, l as getDataOpenClosed, o as createBitsAttrs, r as boolToStr, t as createId, u as attachRef, y as boxWith } from "./B4l8ufIa.js";
import { b as PresenceManager, y as Portal } from "./B3A_TfMF.js";
import { O as SPACE, l as ENTER, z as Context } from "./_yKPJ4BA.js";
import { s as isElement } from "./9DgZZMlb.js";
import { t as noop$1 } from "./BoWJNiZV.js";
import { a as getFloatingContentCSSVars, i as Floating_layer, n as Popper_layer, r as Floating_layer_anchor, t as Popper_layer_force_mount } from "./D9qUa032.js";
var popoverAttrs = createBitsAttrs({
	component: "popover",
	parts: [
		"root",
		"trigger",
		"content",
		"close",
		"overlay"
	]
});
var PopoverRootContext = new Context("Popover.Root");
var PopoverRootState = class PopoverRootState {
	static create(opts) {
		return PopoverRootContext.set(new PopoverRootState(opts));
	}
	opts;
	#contentNode = state(null);
	get contentNode() {
		return get(this.#contentNode);
	}
	set contentNode(value) {
		set(this.#contentNode, value, true);
	}
	contentPresence;
	#triggerNode = state(null);
	get triggerNode() {
		return get(this.#triggerNode);
	}
	set triggerNode(value) {
		set(this.#triggerNode, value, true);
	}
	#overlayNode = state(null);
	get overlayNode() {
		return get(this.#overlayNode);
	}
	set overlayNode(value) {
		set(this.#overlayNode, value, true);
	}
	overlayPresence;
	constructor(opts) {
		this.opts = opts;
		this.contentPresence = new PresenceManager({
			ref: boxWith(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		});
		this.overlayPresence = new PresenceManager({
			ref: boxWith(() => this.overlayNode),
			open: this.opts.open
		});
	}
	toggleOpen() {
		this.opts.open.current = !this.opts.open.current;
	}
	handleClose() {
		if (!this.opts.open.current) return;
		this.opts.open.current = false;
	}
};
var PopoverTriggerState = class PopoverTriggerState {
	static create(opts) {
		return new PopoverTriggerState(opts, PopoverRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref, (v) => this.root.triggerNode = v);
		this.onclick = this.onclick.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		if (this.opts.disabled.current) return;
		if (e.button !== 0) return;
		this.root.toggleOpen();
	}
	onkeydown(e) {
		if (this.opts.disabled.current) return;
		if (!(e.key === "Enter" || e.key === " ")) return;
		e.preventDefault();
		this.root.toggleOpen();
	}
	#getAriaControls() {
		if (this.root.opts.open.current && this.root.contentNode?.id) return this.root.contentNode?.id;
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		"aria-haspopup": "dialog",
		"aria-expanded": boolToStr(this.root.opts.open.current),
		"data-state": getDataOpenClosed(this.root.opts.open.current),
		"aria-controls": this.#getAriaControls(),
		[popoverAttrs.trigger]: "",
		disabled: this.opts.disabled.current,
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var PopoverContentState = class PopoverContentState {
	static create(opts) {
		return new PopoverContentState(opts, PopoverRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref, (v) => this.root.contentNode = v);
	}
	onInteractOutside = (e) => {
		this.opts.onInteractOutside.current(e);
		if (e.defaultPrevented) return;
		if (!isElement(e.target)) return;
		const closestTrigger = e.target.closest(popoverAttrs.selector("trigger"));
		if (closestTrigger && closestTrigger === this.root.triggerNode) return;
		if (this.opts.customAnchor.current) {
			if (isElement(this.opts.customAnchor.current)) {
				if (this.opts.customAnchor.current.contains(e.target)) return;
			} else if (typeof this.opts.customAnchor.current === "string") {
				const el = document.querySelector(this.opts.customAnchor.current);
				if (el && el.contains(e.target)) return;
			}
		}
		this.root.handleClose();
	};
	onEscapeKeydown = (e) => {
		this.opts.onEscapeKeydown.current(e);
		if (e.defaultPrevented) return;
		this.root.handleClose();
	};
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
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
		tabindex: -1,
		"data-state": getDataOpenClosed(this.root.opts.open.current),
		[popoverAttrs.content]: "",
		style: { pointerEvents: "auto" },
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown
	};
};
var PopoverCloseState = class PopoverCloseState {
	static create(opts) {
		return new PopoverCloseState(opts, PopoverRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
		this.onclick = this.onclick.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(_) {
		this.root.handleClose();
	}
	onkeydown(e) {
		if (!(e.key === "Enter" || e.key === " ")) return;
		e.preventDefault();
		this.root.handleClose();
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		type: "button",
		[popoverAttrs.close]: "",
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var root_4 = from_html(`<div><div><!></div></div>`);
var root_9 = from_html(`<div><div><!></div></div>`);
function Popover_content$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), id = prop($$props, "id", 19, () => createId(uid)), forceMount = prop($$props, "forceMount", 3, false), onCloseAutoFocus = prop($$props, "onCloseAutoFocus", 3, noop$1), onEscapeKeydown = prop($$props, "onEscapeKeydown", 3, noop$1), onInteractOutside = prop($$props, "onInteractOutside", 3, noop$1), trapFocus = prop($$props, "trapFocus", 3, true), preventScroll = prop($$props, "preventScroll", 3, false), customAnchor = prop($$props, "customAnchor", 3, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"child",
		"children",
		"ref",
		"id",
		"forceMount",
		"onCloseAutoFocus",
		"onEscapeKeydown",
		"onInteractOutside",
		"trapFocus",
		"preventScroll",
		"customAnchor"
	]);
	const contentState = PopoverContentState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		onInteractOutside: boxWith(() => onInteractOutside()),
		onEscapeKeydown: boxWith(() => onEscapeKeydown()),
		customAnchor: boxWith(() => customAnchor())
	});
	const mergedProps = user_derived(() => mergeProps(restProps, contentState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent_1 = ($$anchor$1) => {
		{
			const popper = ($$anchor$2, $$arg0) => {
				let props = () => $$arg0?.().props;
				let wrapperProps = () => $$arg0?.().wrapperProps;
				const finalProps = user_derived(() => mergeProps(props(), { style: getFloatingContentCSSVars("popover") }));
				var fragment_2 = comment();
				var node_1 = first_child(fragment_2);
				var consequent = ($$anchor$3) => {
					var fragment_3 = comment();
					var node_2 = first_child(fragment_3);
					{
						let $0 = user_derived(() => ({
							props: get(finalProps),
							wrapperProps: wrapperProps(),
							...contentState.snippetProps
						}));
						snippet(node_2, () => $$props.child, () => get($0));
					}
					append($$anchor$3, fragment_3);
				};
				var alternate = ($$anchor$3) => {
					var div = root_4();
					attribute_effect(div, () => ({ ...wrapperProps() }));
					var div_1 = child(div);
					attribute_effect(div_1, () => ({ ...get(finalProps) }));
					snippet(child(div_1), () => $$props.children ?? noop);
					reset(div_1);
					reset(div);
					append($$anchor$3, div);
				};
				if_block(node_1, ($$render) => {
					if ($$props.child) $$render(consequent);
					else $$render(alternate, false);
				});
				append($$anchor$2, fragment_2);
			};
			Popper_layer_force_mount($$anchor$1, spread_props(() => get(mergedProps), () => contentState.popperProps, {
				get ref() {
					return contentState.opts.ref;
				},
				get enabled() {
					return contentState.root.opts.open.current;
				},
				get id() {
					return id();
				},
				get trapFocus() {
					return trapFocus();
				},
				get preventScroll() {
					return preventScroll();
				},
				loop: true,
				forceMount: true,
				get customAnchor() {
					return customAnchor();
				},
				get onCloseAutoFocus() {
					return onCloseAutoFocus();
				},
				get shouldRender() {
					return contentState.shouldRender;
				},
				popper,
				$$slots: { popper: true }
			}));
		}
	};
	var alternate_2 = ($$anchor$1) => {
		var fragment_4 = comment();
		var node_4 = first_child(fragment_4);
		var consequent_3 = ($$anchor$2) => {
			{
				const popper = ($$anchor$3, $$arg0) => {
					let props = () => $$arg0?.().props;
					let wrapperProps = () => $$arg0?.().wrapperProps;
					const finalProps = user_derived(() => mergeProps(props(), { style: getFloatingContentCSSVars("popover") }));
					var fragment_6 = comment();
					var node_5 = first_child(fragment_6);
					var consequent_2 = ($$anchor$4) => {
						var fragment_7 = comment();
						var node_6 = first_child(fragment_7);
						{
							let $0 = user_derived(() => ({
								props: get(finalProps),
								wrapperProps: wrapperProps(),
								...contentState.snippetProps
							}));
							snippet(node_6, () => $$props.child, () => get($0));
						}
						append($$anchor$4, fragment_7);
					};
					var alternate_1 = ($$anchor$4) => {
						var div_2 = root_9();
						attribute_effect(div_2, () => ({ ...wrapperProps() }));
						var div_3 = child(div_2);
						attribute_effect(div_3, () => ({ ...get(finalProps) }));
						snippet(child(div_3), () => $$props.children ?? noop);
						reset(div_3);
						reset(div_2);
						append($$anchor$4, div_2);
					};
					if_block(node_5, ($$render) => {
						if ($$props.child) $$render(consequent_2);
						else $$render(alternate_1, false);
					});
					append($$anchor$3, fragment_6);
				};
				Popper_layer($$anchor$2, spread_props(() => get(mergedProps), () => contentState.popperProps, {
					get ref() {
						return contentState.opts.ref;
					},
					get open() {
						return contentState.root.opts.open.current;
					},
					get id() {
						return id();
					},
					get trapFocus() {
						return trapFocus();
					},
					get preventScroll() {
						return preventScroll();
					},
					loop: true,
					forceMount: false,
					get customAnchor() {
						return customAnchor();
					},
					get onCloseAutoFocus() {
						return onCloseAutoFocus();
					},
					get shouldRender() {
						return contentState.shouldRender;
					},
					popper,
					$$slots: { popper: true }
				}));
			}
		};
		if_block(node_4, ($$render) => {
			if (!forceMount()) $$render(consequent_3);
		}, true);
		append($$anchor$1, fragment_4);
	};
	if_block(node, ($$render) => {
		if (forceMount()) $$render(consequent_1);
		else $$render(alternate_2, false);
	});
	append($$anchor, fragment);
	pop();
}
var root_3 = from_html(`<button><!></button>`);
function Popover_trigger($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), type = prop($$props, "type", 3, "button"), disabled = prop($$props, "disabled", 3, false), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"children",
		"child",
		"id",
		"ref",
		"type",
		"disabled"
	]);
	const triggerState = PopoverTriggerState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		disabled: boxWith(() => Boolean(disabled()))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, triggerState.props, { type: type() }));
	Floating_layer_anchor($$anchor, {
		get id() {
			return id();
		},
		get ref() {
			return triggerState.opts.ref;
		},
		children: ($$anchor$1, $$slotProps) => {
			var fragment_1 = comment();
			var node = first_child(fragment_1);
			var consequent = ($$anchor$2) => {
				var fragment_2 = comment();
				snippet(first_child(fragment_2), () => $$props.child, () => ({ props: get(mergedProps) }));
				append($$anchor$2, fragment_2);
			};
			var alternate = ($$anchor$2) => {
				var button = root_3();
				attribute_effect(button, () => ({ ...get(mergedProps) }));
				snippet(child(button), () => $$props.children ?? noop);
				reset(button);
				append($$anchor$2, button);
			};
			if_block(node, ($$render) => {
				if ($$props.child) $$render(consequent);
				else $$render(alternate, false);
			});
			append($$anchor$1, fragment_1);
		},
		$$slots: { default: true }
	});
	pop();
}
var root_2 = from_html(`<button><!></button>`);
function Popover_close($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"child",
		"children",
		"id",
		"ref"
	]);
	const closeState = PopoverCloseState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
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
function Popover($$anchor, $$props) {
	push($$props, true);
	let open = prop($$props, "open", 15, false), onOpenChange = prop($$props, "onOpenChange", 3, noop$1), onOpenChangeComplete = prop($$props, "onOpenChangeComplete", 3, noop$1);
	PopoverRootState.create({
		open: boxWith(() => open(), (v) => {
			open(v);
			onOpenChange()(v);
		}),
		onOpenChangeComplete: boxWith(() => onOpenChangeComplete())
	});
	Floating_layer($$anchor, {
		children: ($$anchor$1, $$slotProps) => {
			var fragment_1 = comment();
			snippet(first_child(fragment_1), () => $$props.children ?? noop);
			append($$anchor$1, fragment_1);
		},
		$$slots: { default: true }
	});
	pop();
}
function Popover_content($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), sideOffset = prop($$props, "sideOffset", 3, 4), align = prop($$props, "align", 3, "center"), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"sideOffset",
		"align",
		"portalProps"
	]);
	var fragment = comment();
	component(first_child(fragment), () => Portal, ($$anchor$1, PopoverPrimitive_Portal) => {
		PopoverPrimitive_Portal($$anchor$1, spread_props(() => $$props.portalProps, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = comment();
				var node_1 = first_child(fragment_1);
				{
					let $0 = user_derived(() => cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-none", $$props.class));
					component(node_1, () => Popover_content$1, ($$anchor$3, PopoverPrimitive_Content) => {
						PopoverPrimitive_Content($$anchor$3, spread_props({
							get sideOffset() {
								return sideOffset();
							},
							get align() {
								return align();
							},
							get class() {
								return get($0);
							}
						}, () => restProps, {
							get ref() {
								return ref();
							},
							set ref($$value) {
								ref($$value);
							}
						}));
					});
				}
				append($$anchor$2, fragment_1);
			},
			$$slots: { default: true }
		}));
	});
	append($$anchor, fragment);
	pop();
}
var Root = Popover;
var Trigger = Popover_trigger;
var Close = Popover_close;
export { Popover_content as i, Root as n, Trigger as r, Close as t };
