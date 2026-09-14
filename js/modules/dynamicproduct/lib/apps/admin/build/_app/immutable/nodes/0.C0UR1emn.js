import { A as set_class, Ct as set, D as set_attribute, Ft as push, G as if_block, Kt as noop, L as component, Ot as user_derived, Pt as pop, Q as from_svg, R as snippet, T as attribute_effect, Tt as state, Ut as reset, V as each, X as comment, Y as append, Z as from_html, Zt as __exportAll, b as bind_this, bt as sibling, c as spread_props, et as text, j as clsx, k as set_style, lt as untrack, mt as user_effect, nt as event, o as prop, ot as get, pt as template_effect, q as set_text, r as onMount, rt as on, s as rest_props, tt as delegate, vt as child, w as STYLE, xt as proxy, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import "../chunks/CEFrIRjK.js";
import { d as redirect, f as dpa, o as layout_load, p as in_iframe, t as Button } from "../chunks/BIEFGHhw.js";
import { r as url } from "../chunks/Crb1phnD.js";
/* empty css                 */
import { a as cn, i as sonnerContext, r as toastState, t as SonnerState } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { i as derivedMode } from "../chunks/zHexzNNA.js";
import { t as Badge } from "../chunks/BmQEESrH.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
var _layout_exports = /* @__PURE__ */ __exportAll({
	load: () => load,
	prerender: () => true,
	ssr: () => false,
	trailingSlash: () => trailingSlash
}, 1);
const trailingSlash = "always";
const load = async (event$1) => {
	const { untrack: untrack$1, url: url$1, route } = event$1;
	untrack$1(() => {
		if (route.id === "/") {
			const initial_path = dpa.links.initial_path || url$1.searchParams.get("initial_path");
			const id_product = url$1.searchParams.get("id_product");
			if (initial_path && !url$1.searchParams.has("home")) {
				const target = url(`/${initial_path}`);
				if (target !== url$1.pathname) return redirect(302, target + (id_product ? `?id_product=${id_product}` : ""));
			}
		}
	});
	const data = await layout_load(event$1, "/");
	dpa.id_source_product = data.id_source_product;
	dpa.id_default_lang = data.id_default_lang;
	return data;
};
var bars = Array(12).fill(0);
var root_1$1 = from_html(`<div class="sonner-loading-bar"></div>`);
var root$8 = from_html(`<div><div class="sonner-spinner"></div></div>`);
function Loader($$anchor, $$props) {
	push($$props, true);
	var div = root$8();
	var div_1 = child(div);
	each(div_1, 23, () => bars, (_$1, i) => `spinner-bar-${i}`, ($$anchor$1, _$1) => {
		append($$anchor$1, root_1$1());
	});
	reset(div_1);
	reset(div);
	template_effect(($0) => {
		set_class(div, 1, $0);
		set_attribute(div, "data-visible", $$props.visible);
	}, [() => clsx(["sonner-loading-wrapper", $$props.class].filter(Boolean).join(" "))]);
	append($$anchor, div);
	pop();
}
function isAction(action) {
	return action.label !== void 0;
}
function useDocumentHidden() {
	let current = state(proxy(typeof document !== "undefined" ? document.hidden : false));
	user_effect(() => {
		return on(document, "visibilitychange", () => {
			set(current, document.hidden, true);
		});
	});
	return { get current() {
		return get(current);
	} };
}
var TOAST_LIFETIME$1 = 4e3;
var GAP$1 = 14;
var SWIPE_THRESHOLD = 45;
var TIME_BEFORE_UNMOUNT = 200;
var SCALE_MULTIPLIER = .05;
var DEFAULT_TOAST_CLASSES = {
	toast: "",
	title: "",
	description: "",
	loader: "",
	closeButton: "",
	cancelButton: "",
	actionButton: "",
	action: "",
	warning: "",
	error: "",
	success: "",
	default: "",
	info: "",
	loading: ""
};
function getDefaultSwipeDirections(position) {
	const [y, x] = position.split("-");
	const directions = [];
	if (y) directions.push(y);
	if (x) directions.push(x);
	return directions;
}
function getDampening(delta) {
	return 1 / (1.5 + Math.abs(delta) / 20);
}
var root_2$2 = from_html(`<div><!></div>`);
var root_4 = from_html(`<button data-close-button=""><!></button>`);
var root_7 = from_html(`<div data-icon=""><!> <!></div>`);
var root_24 = from_html(`<div data-description=""><!></div>`);
var root_30 = from_html(`<button data-button="" data-cancel=""> </button>`);
var root_34 = from_html(`<button data-button=""> </button>`);
var root_6 = from_html(`<!> <div data-content=""><div data-title=""><!></div> <!></div> <!> <!>`, 1);
var root$7 = from_html(`<li data-sonner-toast=""><!> <!></li>`);
function Toast($$anchor, $$props) {
	push($$props, true);
	const LoadingIcon = ($$anchor$1) => {
		var fragment = comment();
		var node = first_child(fragment);
		var consequent = ($$anchor$2) => {
			var div = root_2$2();
			snippet(child(div), () => $$props.loadingIcon);
			reset(div);
			template_effect(($0) => {
				set_class(div, 1, $0);
				set_attribute(div, "data-visible", get(toastType) === "loading");
			}, [() => clsx(cn(get(classes)?.loader, $$props.toast?.classes?.loader, "sonner-loader"))]);
			append($$anchor$2, div);
		};
		var alternate = ($$anchor$2) => {
			{
				let $0 = user_derived(() => cn(get(classes)?.loader, $$props.toast.classes?.loader));
				let $1 = user_derived(() => get(toastType) === "loading");
				Loader($$anchor$2, {
					get class() {
						return get($0);
					},
					get visible() {
						return get($1);
					}
				});
			}
		};
		if_block(node, ($$render) => {
			if ($$props.loadingIcon) $$render(consequent);
			else $$render(alternate, false);
		});
		append($$anchor$1, fragment);
	};
	let cancelButtonStyle = prop($$props, "cancelButtonStyle", 3, ""), actionButtonStyle = prop($$props, "actionButtonStyle", 3, ""), descriptionClass = prop($$props, "descriptionClass", 3, ""), unstyled = prop($$props, "unstyled", 3, false), defaultRichColors = prop($$props, "defaultRichColors", 3, false);
	rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"toast",
		"index",
		"expanded",
		"invert",
		"position",
		"visibleToasts",
		"expandByDefault",
		"closeButton",
		"interacting",
		"cancelButtonStyle",
		"actionButtonStyle",
		"duration",
		"descriptionClass",
		"classes",
		"unstyled",
		"loadingIcon",
		"successIcon",
		"errorIcon",
		"warningIcon",
		"closeIcon",
		"infoIcon",
		"defaultRichColors",
		"swipeDirections",
		"closeButtonAriaLabel"
	]);
	const defaultClasses = { ...DEFAULT_TOAST_CLASSES };
	let mounted = state(false);
	let removed = state(false);
	let swiping = state(false);
	let swipeOut = state(false);
	let isSwiped = state(false);
	let offsetBeforeRemove = state(0);
	let initialHeight = state(0);
	let remainingTime = $$props.toast.duration || $$props.duration || TOAST_LIFETIME$1;
	let dragStartTime = null;
	let toastRef = state(void 0);
	let swipeDirection = state(null);
	let swipeOutDirection = state(null);
	const isFront = user_derived(() => $$props.index === 0);
	const isVisible = user_derived(() => $$props.index + 1 <= $$props.visibleToasts);
	const toastType = user_derived(() => $$props.toast.type);
	const dismissable = user_derived(() => $$props.toast.dismissable !== false);
	const toastClass = user_derived(() => $$props.toast.class || "");
	const toastDescriptionClass = user_derived(() => $$props.toast.descriptionClass || "");
	const heightIndex = user_derived(() => toastState.heights.findIndex((height) => height.toastId === $$props.toast.id) || 0);
	const closeButton = user_derived(() => $$props.toast.closeButton ?? $$props.closeButton);
	const duration = user_derived(() => $$props.toast.duration ?? $$props.duration ?? TOAST_LIFETIME$1);
	let pointerStart = null;
	const coords = user_derived(() => $$props.position.split("-"));
	const toastsHeightBefore = user_derived(() => toastState.heights.reduce((prev, curr, reducerIndex) => {
		if (reducerIndex >= get(heightIndex)) return prev;
		return prev + curr.height;
	}, 0));
	const isDocumentHidden = useDocumentHidden();
	const invert = user_derived(() => $$props.toast.invert || $$props.invert);
	const disabled = user_derived(() => get(toastType) === "loading");
	const classes = user_derived(() => ({
		...defaultClasses,
		...$$props.classes
	}));
	const toastTitle = user_derived(() => $$props.toast.title);
	const toastDescription = user_derived(() => $$props.toast.description);
	let closeTimerStartTime = state(0);
	let lastCloseTimerStartTime = state(0);
	const offset = user_derived(() => Math.round(get(heightIndex) * GAP$1 + get(toastsHeightBefore)));
	user_effect(() => {
		get(toastTitle);
		get(toastDescription);
		let scale;
		if ($$props.expanded || $$props.expandByDefault) scale = 1;
		else scale = 1 - $$props.index * SCALE_MULTIPLIER;
		const toastEl = untrack(() => get(toastRef));
		if (toastEl === void 0) return;
		toastEl.style.setProperty("height", "auto");
		const offsetHeight = toastEl.offsetHeight;
		const rectHeight = toastEl.getBoundingClientRect().height;
		const scaledRectHeight = Math.round(rectHeight / scale + Number.EPSILON & 100) / 100;
		toastEl.style.removeProperty("height");
		let finalHeight;
		if (Math.abs(scaledRectHeight - offsetHeight) < 1) finalHeight = scaledRectHeight;
		else finalHeight = offsetHeight;
		set(initialHeight, finalHeight, true);
		toastState.setHeight({
			toastId: $$props.toast.id,
			height: finalHeight
		});
	});
	function deleteToast() {
		set(removed, true);
		set(offsetBeforeRemove, get(offset), true);
		toastState.removeHeight($$props.toast.id);
		setTimeout(() => {
			toastState.remove($$props.toast.id);
		}, TIME_BEFORE_UNMOUNT);
	}
	let timeoutId;
	const isPromiseLoadingOrInfiniteDuration = user_derived(() => $$props.toast.promise && get(toastType) === "loading" || $$props.toast.duration === Number.POSITIVE_INFINITY);
	function startTimer() {
		set(closeTimerStartTime, (/* @__PURE__ */ new Date()).getTime(), true);
		timeoutId = setTimeout(() => {
			$$props.toast.onAutoClose?.($$props.toast);
			deleteToast();
		}, remainingTime);
	}
	function pauseTimer() {
		if (get(lastCloseTimerStartTime) < get(closeTimerStartTime)) {
			const elapsedTime = (/* @__PURE__ */ new Date()).getTime() - get(closeTimerStartTime);
			remainingTime = remainingTime - elapsedTime;
		}
		set(lastCloseTimerStartTime, (/* @__PURE__ */ new Date()).getTime(), true);
	}
	user_effect(() => {
		if ($$props.toast.updated) {
			clearTimeout(timeoutId);
			remainingTime = get(duration);
			startTimer();
		}
	});
	user_effect(() => {
		if (!get(isPromiseLoadingOrInfiniteDuration)) if ($$props.expanded || $$props.interacting || isDocumentHidden.current) pauseTimer();
		else startTimer();
		return () => clearTimeout(timeoutId);
	});
	onMount(() => {
		set(mounted, true);
		const height = get(toastRef)?.getBoundingClientRect().height;
		set(initialHeight, height, true);
		toastState.setHeight({
			toastId: $$props.toast.id,
			height
		});
		return () => {
			toastState.removeHeight($$props.toast.id);
		};
	});
	user_effect(() => {
		if ($$props.toast.delete) untrack(() => {
			deleteToast();
			$$props.toast.onDismiss?.($$props.toast);
		});
	});
	const handlePointerDown = (event$1) => {
		if (get(disabled)) return;
		set(offsetBeforeRemove, get(offset), true);
		const target = event$1.target;
		target.setPointerCapture(event$1.pointerId);
		if (target.tagName === "BUTTON") return;
		set(swiping, true);
		pointerStart = {
			x: event$1.clientX,
			y: event$1.clientY
		};
	};
	const handlePointerUp = () => {
		if (get(swipeOut) || !get(dismissable)) return;
		pointerStart = null;
		const swipeAmountX = Number(get(toastRef)?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0);
		const swipeAmountY = Number(get(toastRef)?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0);
		const timeTaken = (/* @__PURE__ */ new Date()).getTime() - (dragStartTime?.getTime() ?? 0);
		const swipeAmount = get(swipeDirection) === "x" ? swipeAmountX : swipeAmountY;
		const velocity = Math.abs(swipeAmount) / timeTaken;
		if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > .11) {
			set(offsetBeforeRemove, get(offset), true);
			$$props.toast.onDismiss?.($$props.toast);
			if (get(swipeDirection) === "x") set(swipeOutDirection, swipeAmountX > 0 ? "right" : "left", true);
			else set(swipeOutDirection, swipeAmountY > 0 ? "down" : "up", true);
			deleteToast();
			set(swipeOut, true);
			return;
		} else {
			get(toastRef)?.style.setProperty("--swipe-amount-x", "0px");
			get(toastRef)?.style.setProperty("--swipe-amount-y", "0px");
		}
		set(isSwiped, false);
		set(swiping, false);
		set(swipeDirection, null);
	};
	const handlePointerMove = (event$1) => {
		if (!pointerStart || !get(dismissable)) return;
		if ((window.getSelection()?.toString().length ?? -1) > 0) return;
		const yDelta = event$1.clientY - pointerStart.y;
		const xDelta = event$1.clientX - pointerStart.x;
		const swipeDirections = $$props.swipeDirections ?? getDefaultSwipeDirections($$props.position);
		if (!get(swipeDirection) && (Math.abs(xDelta) > 1 || Math.abs(yDelta) > 1)) set(swipeDirection, Math.abs(xDelta) > Math.abs(yDelta) ? "x" : "y", true);
		let swipeAmount = {
			x: 0,
			y: 0
		};
		if (get(swipeDirection) === "y") {
			if (swipeDirections.includes("top") || swipeDirections.includes("bottom")) if (swipeDirections.includes("top") && yDelta < 0 || swipeDirections.includes("bottom") && yDelta > 0) swipeAmount.y = yDelta;
			else {
				const dampenedDelta = yDelta * getDampening(yDelta);
				swipeAmount.y = Math.abs(dampenedDelta) < Math.abs(yDelta) ? dampenedDelta : yDelta;
			}
		} else if (get(swipeDirection) === "x") {
			if (swipeDirections.includes("left") || swipeDirections.includes("right")) if (swipeDirections.includes("left") && xDelta < 0 || swipeDirections.includes("right") && xDelta > 0) swipeAmount.x = xDelta;
			else {
				const dampenedDelta = xDelta * getDampening(xDelta);
				swipeAmount.x = Math.abs(dampenedDelta) < Math.abs(xDelta) ? dampenedDelta : xDelta;
			}
		}
		if (Math.abs(swipeAmount.x) > 0 || Math.abs(swipeAmount.y) > 0) set(isSwiped, true);
		get(toastRef)?.style.setProperty("--swipe-amount-x", `${swipeAmount.x}px`);
		get(toastRef)?.style.setProperty("--swipe-amount-y", `${swipeAmount.y}px`);
	};
	const handleDragEnd = () => {
		set(swiping, false);
		set(swipeDirection, null);
		pointerStart = null;
	};
	const icon = user_derived(() => {
		if ($$props.toast.icon) return $$props.toast.icon;
		if (get(toastType) === "success") return $$props.successIcon;
		if (get(toastType) === "error") return $$props.errorIcon;
		if (get(toastType) === "warning") return $$props.warningIcon;
		if (get(toastType) === "info") return $$props.infoIcon;
		if (get(toastType) === "loading") return $$props.loadingIcon;
		return null;
	});
	var li = root$7();
	set_attribute(li, "tabindex", 0);
	let styles;
	li.__pointermove = handlePointerMove;
	li.__pointerup = handlePointerUp;
	li.__pointerdown = handlePointerDown;
	var node_2 = child(li);
	var consequent_1 = ($$anchor$1) => {
		var button = root_4();
		button.__click = () => {
			if (get(disabled) || !get(dismissable)) return;
			deleteToast();
			$$props.toast.onDismiss?.($$props.toast);
		};
		snippet(child(button), () => $$props.closeIcon ?? noop);
		reset(button);
		template_effect(($0) => {
			set_attribute(button, "aria-label", $$props.closeButtonAriaLabel);
			set_attribute(button, "data-disabled", get(disabled));
			set_class(button, 1, $0);
		}, [() => clsx(cn(get(classes)?.closeButton, $$props.toast?.classes?.closeButton))]);
		append($$anchor$1, button);
	};
	if_block(node_2, ($$render) => {
		if (get(closeButton) && !$$props.toast.component && get(toastType) !== "loading" && $$props.closeIcon !== null) $$render(consequent_1);
	});
	var node_4 = sibling(node_2, 2);
	var consequent_2 = ($$anchor$1) => {
		const Component = user_derived(() => $$props.toast.component);
		var fragment_2 = comment();
		component(first_child(fragment_2), () => get(Component), ($$anchor$2, Component_1) => {
			Component_1($$anchor$2, spread_props(() => $$props.toast.componentProps, { closeToast: deleteToast }));
		});
		append($$anchor$1, fragment_2);
	};
	var alternate_10 = ($$anchor$1) => {
		var fragment_3 = root_6();
		var node_6 = first_child(fragment_3);
		var consequent_11 = ($$anchor$2) => {
			var div_1 = root_7();
			var node_7 = child(div_1);
			var consequent_4 = ($$anchor$3) => {
				var fragment_4 = comment();
				var node_8 = first_child(fragment_4);
				var consequent_3 = ($$anchor$4) => {
					var fragment_5 = comment();
					component(first_child(fragment_5), () => $$props.toast.icon, ($$anchor$5, toast_icon) => {
						toast_icon($$anchor$5, {});
					});
					append($$anchor$4, fragment_5);
				};
				var alternate_1 = ($$anchor$4) => {
					LoadingIcon($$anchor$4);
				};
				if_block(node_8, ($$render) => {
					if ($$props.toast.icon) $$render(consequent_3);
					else $$render(alternate_1, false);
				});
				append($$anchor$3, fragment_4);
			};
			if_block(node_7, ($$render) => {
				if ($$props.toast.promise || get(toastType) === "loading") $$render(consequent_4);
			});
			var node_10 = sibling(node_7, 2);
			var consequent_10 = ($$anchor$3) => {
				var fragment_7 = comment();
				var node_11 = first_child(fragment_7);
				var consequent_5 = ($$anchor$4) => {
					var fragment_8 = comment();
					component(first_child(fragment_8), () => $$props.toast.icon, ($$anchor$5, toast_icon_1) => {
						toast_icon_1($$anchor$5, {});
					});
					append($$anchor$4, fragment_8);
				};
				var alternate_5 = ($$anchor$4) => {
					var fragment_9 = comment();
					var node_13 = first_child(fragment_9);
					var consequent_6 = ($$anchor$5) => {
						var fragment_10 = comment();
						snippet(first_child(fragment_10), () => $$props.successIcon ?? noop);
						append($$anchor$5, fragment_10);
					};
					var alternate_4 = ($$anchor$5) => {
						var fragment_11 = comment();
						var node_15 = first_child(fragment_11);
						var consequent_7 = ($$anchor$6) => {
							var fragment_12 = comment();
							snippet(first_child(fragment_12), () => $$props.errorIcon ?? noop);
							append($$anchor$6, fragment_12);
						};
						var alternate_3 = ($$anchor$6) => {
							var fragment_13 = comment();
							var node_17 = first_child(fragment_13);
							var consequent_8 = ($$anchor$7) => {
								var fragment_14 = comment();
								snippet(first_child(fragment_14), () => $$props.warningIcon ?? noop);
								append($$anchor$7, fragment_14);
							};
							var alternate_2 = ($$anchor$7) => {
								var fragment_15 = comment();
								var node_19 = first_child(fragment_15);
								var consequent_9 = ($$anchor$8) => {
									var fragment_16 = comment();
									snippet(first_child(fragment_16), () => $$props.infoIcon ?? noop);
									append($$anchor$8, fragment_16);
								};
								if_block(node_19, ($$render) => {
									if (get(toastType) === "info") $$render(consequent_9);
								}, true);
								append($$anchor$7, fragment_15);
							};
							if_block(node_17, ($$render) => {
								if (get(toastType) === "warning") $$render(consequent_8);
								else $$render(alternate_2, false);
							}, true);
							append($$anchor$6, fragment_13);
						};
						if_block(node_15, ($$render) => {
							if (get(toastType) === "error") $$render(consequent_7);
							else $$render(alternate_3, false);
						}, true);
						append($$anchor$5, fragment_11);
					};
					if_block(node_13, ($$render) => {
						if (get(toastType) === "success") $$render(consequent_6);
						else $$render(alternate_4, false);
					}, true);
					append($$anchor$4, fragment_9);
				};
				if_block(node_11, ($$render) => {
					if ($$props.toast.icon) $$render(consequent_5);
					else $$render(alternate_5, false);
				});
				append($$anchor$3, fragment_7);
			};
			if_block(node_10, ($$render) => {
				if ($$props.toast.type !== "loading") $$render(consequent_10);
			});
			reset(div_1);
			template_effect(($0) => set_class(div_1, 1, $0), [() => clsx(cn(get(classes)?.icon, $$props.toast?.classes?.icon))]);
			append($$anchor$2, div_1);
		};
		if_block(node_6, ($$render) => {
			if ((get(toastType) || $$props.toast.icon || $$props.toast.promise) && $$props.toast.icon !== null && (get(icon) !== null || $$props.toast.icon)) $$render(consequent_11);
		});
		var div_2 = sibling(node_6, 2);
		var div_3 = child(div_2);
		var node_21 = child(div_3);
		var consequent_13 = ($$anchor$2) => {
			var fragment_17 = comment();
			var node_22 = first_child(fragment_17);
			var consequent_12 = ($$anchor$3) => {
				const Title = user_derived(() => $$props.toast.title);
				var fragment_18 = comment();
				component(first_child(fragment_18), () => get(Title), ($$anchor$4, Title_1) => {
					Title_1($$anchor$4, spread_props(() => $$props.toast.componentProps));
				});
				append($$anchor$3, fragment_18);
			};
			var alternate_6 = ($$anchor$3) => {
				var text$1 = text();
				template_effect(() => set_text(text$1, $$props.toast.title));
				append($$anchor$3, text$1);
			};
			if_block(node_22, ($$render) => {
				if (typeof $$props.toast.title !== "string") $$render(consequent_12);
				else $$render(alternate_6, false);
			});
			append($$anchor$2, fragment_17);
		};
		if_block(node_21, ($$render) => {
			if ($$props.toast.title) $$render(consequent_13);
		});
		reset(div_3);
		var node_24 = sibling(div_3, 2);
		var consequent_15 = ($$anchor$2) => {
			var div_4 = root_24();
			var node_25 = child(div_4);
			var consequent_14 = ($$anchor$3) => {
				const Description = user_derived(() => $$props.toast.description);
				var fragment_20 = comment();
				component(first_child(fragment_20), () => get(Description), ($$anchor$4, Description_1) => {
					Description_1($$anchor$4, spread_props(() => $$props.toast.componentProps));
				});
				append($$anchor$3, fragment_20);
			};
			var alternate_7 = ($$anchor$3) => {
				var text_1 = text();
				template_effect(() => set_text(text_1, $$props.toast.description));
				append($$anchor$3, text_1);
			};
			if_block(node_25, ($$render) => {
				if (typeof $$props.toast.description !== "string") $$render(consequent_14);
				else $$render(alternate_7, false);
			});
			reset(div_4);
			template_effect(($0) => set_class(div_4, 1, $0), [() => clsx(cn(descriptionClass(), get(toastDescriptionClass), get(classes)?.description, $$props.toast.classes?.description))]);
			append($$anchor$2, div_4);
		};
		if_block(node_24, ($$render) => {
			if ($$props.toast.description) $$render(consequent_15);
		});
		reset(div_2);
		var node_27 = sibling(div_2, 2);
		var consequent_18 = ($$anchor$2) => {
			var fragment_22 = comment();
			var node_28 = first_child(fragment_22);
			var consequent_16 = ($$anchor$3) => {
				var fragment_23 = comment();
				component(first_child(fragment_23), () => $$props.toast.cancel, ($$anchor$4, toast_cancel) => {
					toast_cancel($$anchor$4, {});
				});
				append($$anchor$3, fragment_23);
			};
			var alternate_8 = ($$anchor$3) => {
				var fragment_24 = comment();
				var node_30 = first_child(fragment_24);
				var consequent_17 = ($$anchor$4) => {
					var button_1 = root_30();
					button_1.__click = (event$1) => {
						if (!isAction($$props.toast.cancel)) return;
						if (!get(dismissable)) return;
						$$props.toast.cancel?.onClick?.(event$1);
						deleteToast();
					};
					var text_2 = child(button_1, true);
					reset(button_1);
					template_effect(($0) => {
						set_style(button_1, $$props.toast.cancelButtonStyle ?? cancelButtonStyle());
						set_class(button_1, 1, $0);
						set_text(text_2, $$props.toast.cancel.label);
					}, [() => clsx(cn(get(classes)?.cancelButton, $$props.toast?.classes?.cancelButton))]);
					append($$anchor$4, button_1);
				};
				if_block(node_30, ($$render) => {
					if (isAction($$props.toast.cancel)) $$render(consequent_17);
				}, true);
				append($$anchor$3, fragment_24);
			};
			if_block(node_28, ($$render) => {
				if (typeof $$props.toast.cancel === "function") $$render(consequent_16);
				else $$render(alternate_8, false);
			});
			append($$anchor$2, fragment_22);
		};
		if_block(node_27, ($$render) => {
			if ($$props.toast.cancel) $$render(consequent_18);
		});
		var node_31 = sibling(node_27, 2);
		var consequent_21 = ($$anchor$2) => {
			var fragment_25 = comment();
			var node_32 = first_child(fragment_25);
			var consequent_19 = ($$anchor$3) => {
				var fragment_26 = comment();
				component(first_child(fragment_26), () => $$props.toast.action, ($$anchor$4, toast_action) => {
					toast_action($$anchor$4, {});
				});
				append($$anchor$3, fragment_26);
			};
			var alternate_9 = ($$anchor$3) => {
				var fragment_27 = comment();
				var node_34 = first_child(fragment_27);
				var consequent_20 = ($$anchor$4) => {
					var button_2 = root_34();
					button_2.__click = (event$1) => {
						if (!isAction($$props.toast.action)) return;
						$$props.toast.action?.onClick(event$1);
						if (event$1.defaultPrevented) return;
						deleteToast();
					};
					var text_3 = child(button_2, true);
					reset(button_2);
					template_effect(($0) => {
						set_style(button_2, $$props.toast.actionButtonStyle ?? actionButtonStyle());
						set_class(button_2, 1, $0);
						set_text(text_3, $$props.toast.action.label);
					}, [() => clsx(cn(get(classes)?.actionButton, $$props.toast?.classes?.actionButton))]);
					append($$anchor$4, button_2);
				};
				if_block(node_34, ($$render) => {
					if (isAction($$props.toast.action)) $$render(consequent_20);
				}, true);
				append($$anchor$3, fragment_27);
			};
			if_block(node_32, ($$render) => {
				if (typeof $$props.toast.action === "function") $$render(consequent_19);
				else $$render(alternate_9, false);
			});
			append($$anchor$2, fragment_25);
		};
		if_block(node_31, ($$render) => {
			if ($$props.toast.action) $$render(consequent_21);
		});
		template_effect(($0) => set_class(div_3, 1, $0), [() => clsx(cn(get(classes)?.title, $$props.toast?.classes?.title))]);
		append($$anchor$1, fragment_3);
	};
	if_block(node_4, ($$render) => {
		if ($$props.toast.component) $$render(consequent_2);
		else $$render(alternate_10, false);
	});
	reset(li);
	bind_this(li, ($$value) => set(toastRef, $$value), () => get(toastRef));
	template_effect(($0, $1, $2) => {
		set_class(li, 1, $0);
		set_attribute(li, "data-rich-colors", $$props.toast.richColors ?? defaultRichColors());
		set_attribute(li, "data-styled", !($$props.toast.component || $$props.toast.unstyled || unstyled()));
		set_attribute(li, "data-mounted", get(mounted));
		set_attribute(li, "data-promise", $1);
		set_attribute(li, "data-swiped", get(isSwiped));
		set_attribute(li, "data-removed", get(removed));
		set_attribute(li, "data-visible", get(isVisible));
		set_attribute(li, "data-y-position", get(coords)[0]);
		set_attribute(li, "data-x-position", get(coords)[1]);
		set_attribute(li, "data-index", $$props.index);
		set_attribute(li, "data-front", get(isFront));
		set_attribute(li, "data-swiping", get(swiping));
		set_attribute(li, "data-dismissable", get(dismissable));
		set_attribute(li, "data-type", get(toastType));
		set_attribute(li, "data-invert", get(invert));
		set_attribute(li, "data-swipe-out", get(swipeOut));
		set_attribute(li, "data-swipe-direction", get(swipeOutDirection));
		set_attribute(li, "data-expanded", $2);
		styles = set_style(li, `${$$props.style} ${$$props.toast.style}`, styles, {
			"--index": $$props.index,
			"--toasts-before": $$props.index,
			"--z-index": toastState.toasts.length - $$props.index,
			"--offset": `${get(removed) ? get(offsetBeforeRemove) : get(offset)}px`,
			"--initial-height": $$props.expandByDefault ? "auto" : `${get(initialHeight)}px`
		});
	}, [
		() => clsx(cn($$props.class, get(toastClass), get(classes)?.toast, $$props.toast?.classes?.toast, get(classes)?.[get(toastType)], $$props.toast?.classes?.[get(toastType)])),
		() => Boolean($$props.toast.promise),
		() => Boolean($$props.expanded || $$props.expandByDefault && get(mounted))
	]);
	event("dragend", li, handleDragEnd);
	append($$anchor, li);
	pop();
}
delegate([
	"pointermove",
	"pointerup",
	"pointerdown",
	"click"
]);
var root$6 = from_svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-success-icon=""><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>`);
function SuccessIcon($$anchor) {
	append($$anchor, root$6());
}
var root$5 = from_svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-error-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>`);
function ErrorIcon($$anchor) {
	append($$anchor, root$5());
}
var root$4 = from_svg(`<svg viewBox="0 0 64 64" fill="currentColor" height="20" width="20" data-sonner-warning-icon="" xmlns="http://www.w3.org/2000/svg"><path d="M32.427,7.987c2.183,0.124 4,1.165 5.096,3.281l17.936,36.208c1.739,3.66 -0.954,8.585 -5.373,8.656l-36.119,0c-4.022,-0.064 -7.322,-4.631 -5.352,-8.696l18.271,-36.207c0.342,-0.65 0.498,-0.838 0.793,-1.179c1.186,-1.375 2.483,-2.111 4.748,-2.063Zm-0.295,3.997c-0.687,0.034 -1.316,0.419 -1.659,1.017c-6.312,11.979 -12.397,24.081 -18.301,36.267c-0.546,1.225 0.391,2.797 1.762,2.863c12.06,0.195 24.125,0.195 36.185,0c1.325,-0.064 2.321,-1.584 1.769,-2.85c-5.793,-12.184 -11.765,-24.286 -17.966,-36.267c-0.366,-0.651 -0.903,-1.042 -1.79,-1.03Z"></path><path d="M33.631,40.581l-3.348,0l-0.368,-16.449l4.1,0l-0.384,16.449Zm-3.828,5.03c0,-0.609 0.197,-1.113 0.592,-1.514c0.396,-0.4 0.935,-0.601 1.618,-0.601c0.684,0 1.223,0.201 1.618,0.601c0.395,0.401 0.593,0.905 0.593,1.514c0,0.587 -0.193,1.078 -0.577,1.473c-0.385,0.395 -0.929,0.593 -1.634,0.593c-0.705,0 -1.249,-0.198 -1.634,-0.593c-0.384,-0.395 -0.576,-0.886 -0.576,-1.473Z"></path></svg>`);
function WarningIcon($$anchor) {
	append($$anchor, root$4());
}
var root$3 = from_svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-info-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>`);
function InfoIcon($$anchor) {
	append($$anchor, root$3());
}
var root$2 = from_svg(`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-sonner-close-icon=""><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`);
function CloseIcon($$anchor) {
	append($$anchor, root$2());
}
var VISIBLE_TOASTS_AMOUNT = 3;
var VIEWPORT_OFFSET = "24px";
var MOBILE_VIEWPORT_OFFSET = "16px";
var TOAST_LIFETIME = 4e3;
var TOAST_WIDTH = 356;
var GAP = 14;
var DARK = "dark";
var LIGHT = "light";
function getOffsetObject(defaultOffset, mobileOffset) {
	const styles = {};
	[defaultOffset, mobileOffset].forEach((offset, index) => {
		const isMobile = index === 1;
		const prefix = isMobile ? "--mobile-offset" : "--offset";
		const defaultValue = isMobile ? MOBILE_VIEWPORT_OFFSET : VIEWPORT_OFFSET;
		function assignAll(offset$1) {
			[
				"top",
				"right",
				"bottom",
				"left"
			].forEach((key) => {
				styles[`${prefix}-${key}`] = typeof offset$1 === "number" ? `${offset$1}px` : offset$1;
			});
		}
		if (typeof offset === "number" || typeof offset === "string") assignAll(offset);
		else if (typeof offset === "object") [
			"top",
			"right",
			"bottom",
			"left"
		].forEach((key) => {
			const value = offset[key];
			if (value === void 0) styles[`${prefix}-${key}`] = defaultValue;
			else styles[`${prefix}-${key}`] = typeof value === "number" ? `${value}px` : value;
		});
		else assignAll(defaultValue);
	});
	return styles;
}
var root_2$1 = from_html(`<ol></ol>`);
var root$1 = from_html(`<section aria-live="polite" aria-relevant="additions text" aria-atomic="false" class="svelte-ahhmb1"><!></section>`);
function Toaster($$anchor, $$props) {
	push($$props, true);
	function getInitialTheme(t) {
		if (t !== "system") return t;
		if (typeof window !== "undefined") {
			if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return DARK;
			return LIGHT;
		}
		return LIGHT;
	}
	let invert = prop($$props, "invert", 3, false), position = prop($$props, "position", 3, "bottom-right"), hotkey = prop($$props, "hotkey", 19, () => ["altKey", "KeyT"]), expand = prop($$props, "expand", 3, false), closeButton = prop($$props, "closeButton", 3, false), offset = prop($$props, "offset", 3, VIEWPORT_OFFSET), mobileOffset = prop($$props, "mobileOffset", 3, MOBILE_VIEWPORT_OFFSET), theme = prop($$props, "theme", 3, "light"), richColors = prop($$props, "richColors", 3, false), duration = prop($$props, "duration", 3, TOAST_LIFETIME), visibleToasts = prop($$props, "visibleToasts", 3, VISIBLE_TOASTS_AMOUNT), toastOptions = prop($$props, "toastOptions", 19, () => ({})), dir = prop($$props, "dir", 7, "auto"), gap = prop($$props, "gap", 3, GAP), containerAriaLabel = prop($$props, "containerAriaLabel", 3, "Notifications"), closeButtonAriaLabel = prop($$props, "closeButtonAriaLabel", 3, "Close toast"), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"invert",
		"position",
		"hotkey",
		"expand",
		"closeButton",
		"offset",
		"mobileOffset",
		"theme",
		"richColors",
		"duration",
		"visibleToasts",
		"toastOptions",
		"dir",
		"gap",
		"loadingIcon",
		"successIcon",
		"errorIcon",
		"warningIcon",
		"closeIcon",
		"infoIcon",
		"containerAriaLabel",
		"class",
		"closeButtonAriaLabel",
		"onblur",
		"onfocus",
		"onmouseenter",
		"onmousemove",
		"onmouseleave",
		"ondragend",
		"onpointerdown",
		"onpointerup"
	]);
	function getDocumentDirection() {
		if (dir() !== "auto") return dir();
		if (typeof window === "undefined") return "ltr";
		if (typeof document === "undefined") return "ltr";
		const dirAttribute = document.documentElement.getAttribute("dir");
		if (dirAttribute === "auto" || !dirAttribute) {
			untrack(() => dir(window.getComputedStyle(document.documentElement).direction ?? "ltr"));
			return dir();
		}
		untrack(() => dir(dirAttribute));
		return dirAttribute;
	}
	const possiblePositions = user_derived(() => Array.from(new Set([position(), ...toastState.toasts.filter((toast) => toast.position).map((toast) => toast.position)].filter(Boolean))));
	let expanded = state(false);
	let interacting = state(false);
	let actualTheme = state(proxy(getInitialTheme(theme())));
	let listRef = state(void 0);
	let lastFocusedElementRef = state(null);
	let isFocusWithin = state(false);
	const hotkeyLabel = user_derived(() => hotkey().join("+").replace(/Key/g, "").replace(/Digit/g, ""));
	user_effect(() => {
		if (toastState.toasts.length <= 1) set(expanded, false);
	});
	user_effect(() => {
		const toastsToDismiss = toastState.toasts.filter((toast) => toast.dismiss && !toast.delete);
		if (toastsToDismiss.length > 0) toastState.toasts = toastState.toasts.map((toast) => {
			if (toastsToDismiss.find((dismissToast) => dismissToast.id === toast.id)) return {
				...toast,
				delete: true
			};
			return toast;
		});
	});
	user_effect(() => {
		return () => {
			if (get(listRef) && get(lastFocusedElementRef)) {
				get(lastFocusedElementRef).focus({ preventScroll: true });
				set(lastFocusedElementRef, null);
				set(isFocusWithin, false);
			}
		};
	});
	onMount(() => {
		toastState.reset();
		const handleKeydown = (event$1) => {
			if (hotkey().every((key) => event$1[key] || event$1.code === key)) {
				set(expanded, true);
				get(listRef)?.focus();
			}
			if (event$1.code === "Escape" && (document.activeElement === get(listRef) || get(listRef)?.contains(document.activeElement))) set(expanded, false);
		};
		return on(document, "keydown", handleKeydown);
	});
	user_effect(() => {
		if (theme() !== "system") set(actualTheme, theme());
		if (typeof window !== "undefined") {
			if (theme() === "system") if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) set(actualTheme, DARK);
			else set(actualTheme, LIGHT);
			const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
			const changeHandler = ({ matches }) => {
				set(actualTheme, matches ? DARK : LIGHT, true);
			};
			if ("addEventListener" in mediaQueryList) mediaQueryList.addEventListener("change", changeHandler);
			else mediaQueryList.addListener(changeHandler);
		}
	});
	const handleBlur = (event$1) => {
		$$props.onblur?.(event$1);
		if (get(isFocusWithin) && !event$1.currentTarget.contains(event$1.relatedTarget)) {
			set(isFocusWithin, false);
			if (get(lastFocusedElementRef)) {
				get(lastFocusedElementRef).focus({ preventScroll: true });
				set(lastFocusedElementRef, null);
			}
		}
	};
	const handleFocus = (event$1) => {
		$$props.onfocus?.(event$1);
		if (event$1.target instanceof HTMLElement && event$1.target.dataset.dismissable === "false") return;
		if (!get(isFocusWithin)) {
			set(isFocusWithin, true);
			set(lastFocusedElementRef, event$1.relatedTarget, true);
		}
	};
	const handlePointerDown = (event$1) => {
		$$props.onpointerdown?.(event$1);
		if (event$1.target instanceof HTMLElement && event$1.target.dataset.dismissable === "false") return;
		set(interacting, true);
	};
	const handleMouseEnter = (event$1) => {
		$$props.onmouseenter?.(event$1);
		set(expanded, true);
	};
	const handleMouseLeave = (event$1) => {
		$$props.onmouseleave?.(event$1);
		if (!get(interacting)) set(expanded, false);
	};
	const handleMouseMove = (event$1) => {
		$$props.onmousemove?.(event$1);
		set(expanded, true);
	};
	const handleDragEnd = (event$1) => {
		$$props.ondragend?.(event$1);
		set(expanded, false);
	};
	const handlePointerUp = (event$1) => {
		$$props.onpointerup?.(event$1);
		set(interacting, false);
	};
	sonnerContext.set(new SonnerState());
	var section = root$1();
	set_attribute(section, "tabindex", -1);
	var node = child(section);
	var consequent_10 = ($$anchor$1) => {
		var fragment = comment();
		each(first_child(fragment), 18, () => get(possiblePositions), (position$1) => position$1, ($$anchor$2, position$1, index, $$array) => {
			const computed_const = user_derived(() => {
				const [y, x] = position$1.split("-");
				return {
					y,
					x
				};
			});
			const offsetObject = user_derived(() => getOffsetObject(offset(), mobileOffset()));
			var ol = root_2$1();
			attribute_effect(ol, ($0) => ({
				tabindex: -1,
				dir: $0,
				class: $$props.class,
				"data-sonner-toaster": true,
				"data-sonner-theme": get(actualTheme),
				"data-y-position": get(computed_const).y,
				"data-x-position": get(computed_const).x,
				style: $$props.style,
				onblur: handleBlur,
				onfocus: handleFocus,
				onmouseenter: handleMouseEnter,
				onmousemove: handleMouseMove,
				onmouseleave: handleMouseLeave,
				ondragend: handleDragEnd,
				onpointerdown: handlePointerDown,
				onpointerup: handlePointerUp,
				...restProps,
				[STYLE]: {
					"--front-toast-height": `${toastState.heights[0]?.height}px`,
					"--width": `${TOAST_WIDTH}px`,
					"--gap": `${gap()}px`,
					"--offset-top": get(offsetObject)["--offset-top"],
					"--offset-right": get(offsetObject)["--offset-right"],
					"--offset-bottom": get(offsetObject)["--offset-bottom"],
					"--offset-left": get(offsetObject)["--offset-left"],
					"--mobile-offset-top": get(offsetObject)["--mobile-offset-top"],
					"--mobile-offset-right": get(offsetObject)["--mobile-offset-right"],
					"--mobile-offset-bottom": get(offsetObject)["--mobile-offset-bottom"],
					"--mobile-offset-left": get(offsetObject)["--mobile-offset-left"]
				}
			}), [getDocumentDirection], void 0, void 0, "svelte-ahhmb1");
			each(ol, 23, () => toastState.toasts.filter((toast) => !toast.position && get(index) === 0 || toast.position === position$1), (toast) => toast.id, ($$anchor$3, toast, index$1, $$array_1) => {
				{
					const successIcon = ($$anchor$4) => {
						var fragment_2 = comment();
						var node_2 = first_child(fragment_2);
						var consequent = ($$anchor$5) => {
							var fragment_3 = comment();
							snippet(first_child(fragment_3), () => $$props.successIcon ?? noop);
							append($$anchor$5, fragment_3);
						};
						var alternate = ($$anchor$5) => {
							var fragment_4 = comment();
							var node_4 = first_child(fragment_4);
							var consequent_1 = ($$anchor$6) => {
								SuccessIcon($$anchor$6, {});
							};
							if_block(node_4, ($$render) => {
								if ($$props.successIcon !== null) $$render(consequent_1);
							}, true);
							append($$anchor$5, fragment_4);
						};
						if_block(node_2, ($$render) => {
							if ($$props.successIcon) $$render(consequent);
							else $$render(alternate, false);
						});
						append($$anchor$4, fragment_2);
					};
					const errorIcon = ($$anchor$4) => {
						var fragment_6 = comment();
						var node_5 = first_child(fragment_6);
						var consequent_2 = ($$anchor$5) => {
							var fragment_7 = comment();
							snippet(first_child(fragment_7), () => $$props.errorIcon ?? noop);
							append($$anchor$5, fragment_7);
						};
						var alternate_1 = ($$anchor$5) => {
							var fragment_8 = comment();
							var node_7 = first_child(fragment_8);
							var consequent_3 = ($$anchor$6) => {
								ErrorIcon($$anchor$6, {});
							};
							if_block(node_7, ($$render) => {
								if ($$props.errorIcon !== null) $$render(consequent_3);
							}, true);
							append($$anchor$5, fragment_8);
						};
						if_block(node_5, ($$render) => {
							if ($$props.errorIcon) $$render(consequent_2);
							else $$render(alternate_1, false);
						});
						append($$anchor$4, fragment_6);
					};
					const warningIcon = ($$anchor$4) => {
						var fragment_10 = comment();
						var node_8 = first_child(fragment_10);
						var consequent_4 = ($$anchor$5) => {
							var fragment_11 = comment();
							snippet(first_child(fragment_11), () => $$props.warningIcon ?? noop);
							append($$anchor$5, fragment_11);
						};
						var alternate_2 = ($$anchor$5) => {
							var fragment_12 = comment();
							var node_10 = first_child(fragment_12);
							var consequent_5 = ($$anchor$6) => {
								WarningIcon($$anchor$6, {});
							};
							if_block(node_10, ($$render) => {
								if ($$props.warningIcon !== null) $$render(consequent_5);
							}, true);
							append($$anchor$5, fragment_12);
						};
						if_block(node_8, ($$render) => {
							if ($$props.warningIcon) $$render(consequent_4);
							else $$render(alternate_2, false);
						});
						append($$anchor$4, fragment_10);
					};
					const infoIcon = ($$anchor$4) => {
						var fragment_14 = comment();
						var node_11 = first_child(fragment_14);
						var consequent_6 = ($$anchor$5) => {
							var fragment_15 = comment();
							snippet(first_child(fragment_15), () => $$props.infoIcon ?? noop);
							append($$anchor$5, fragment_15);
						};
						var alternate_3 = ($$anchor$5) => {
							var fragment_16 = comment();
							var node_13 = first_child(fragment_16);
							var consequent_7 = ($$anchor$6) => {
								InfoIcon($$anchor$6, {});
							};
							if_block(node_13, ($$render) => {
								if ($$props.infoIcon !== null) $$render(consequent_7);
							}, true);
							append($$anchor$5, fragment_16);
						};
						if_block(node_11, ($$render) => {
							if ($$props.infoIcon) $$render(consequent_6);
							else $$render(alternate_3, false);
						});
						append($$anchor$4, fragment_14);
					};
					const closeIcon = ($$anchor$4) => {
						var fragment_18 = comment();
						var node_14 = first_child(fragment_18);
						var consequent_8 = ($$anchor$5) => {
							var fragment_19 = comment();
							snippet(first_child(fragment_19), () => $$props.closeIcon ?? noop);
							append($$anchor$5, fragment_19);
						};
						var alternate_4 = ($$anchor$5) => {
							var fragment_20 = comment();
							var node_16 = first_child(fragment_20);
							var consequent_9 = ($$anchor$6) => {
								CloseIcon($$anchor$6, {});
							};
							if_block(node_16, ($$render) => {
								if ($$props.closeIcon !== null) $$render(consequent_9);
							}, true);
							append($$anchor$5, fragment_20);
						};
						if_block(node_14, ($$render) => {
							if ($$props.closeIcon) $$render(consequent_8);
							else $$render(alternate_4, false);
						});
						append($$anchor$4, fragment_18);
					};
					let $0 = user_derived(() => toastOptions()?.duration ?? duration());
					let $1 = user_derived(() => toastOptions()?.class ?? "");
					let $2 = user_derived(() => toastOptions()?.descriptionClass || "");
					let $3 = user_derived(() => toastOptions()?.style ?? "");
					let $4 = user_derived(() => toastOptions().classes || {});
					let $5 = user_derived(() => toastOptions().unstyled ?? false);
					let $6 = user_derived(() => toastOptions()?.cancelButtonStyle ?? "");
					let $7 = user_derived(() => toastOptions()?.actionButtonStyle ?? "");
					let $8 = user_derived(() => toastOptions()?.closeButtonAriaLabel ?? closeButtonAriaLabel());
					Toast($$anchor$3, {
						get index() {
							return get(index$1);
						},
						get toast() {
							return get(toast);
						},
						get defaultRichColors() {
							return richColors();
						},
						get duration() {
							return get($0);
						},
						get class() {
							return get($1);
						},
						get descriptionClass() {
							return get($2);
						},
						get invert() {
							return invert();
						},
						get visibleToasts() {
							return visibleToasts();
						},
						get closeButton() {
							return closeButton();
						},
						get interacting() {
							return get(interacting);
						},
						get position() {
							return position$1;
						},
						get style() {
							return get($3);
						},
						get classes() {
							return get($4);
						},
						get unstyled() {
							return get($5);
						},
						get cancelButtonStyle() {
							return get($6);
						},
						get actionButtonStyle() {
							return get($7);
						},
						get closeButtonAriaLabel() {
							return get($8);
						},
						get expandByDefault() {
							return expand();
						},
						get expanded() {
							return get(expanded);
						},
						get loadingIcon() {
							return $$props.loadingIcon;
						},
						successIcon,
						errorIcon,
						warningIcon,
						infoIcon,
						closeIcon,
						$$slots: {
							successIcon: true,
							errorIcon: true,
							warningIcon: true,
							infoIcon: true,
							closeIcon: true
						}
					});
				}
			});
			reset(ol);
			bind_this(ol, ($$value) => set(listRef, $$value), () => get(listRef));
			template_effect(() => ol.dir = ol.dir);
			append($$anchor$2, ol);
		});
		append($$anchor$1, fragment);
	};
	if_block(node, ($$render) => {
		if (toastState.toasts.length > 0) $$render(consequent_10);
	});
	reset(section);
	template_effect(() => set_attribute(section, "aria-label", `${containerAriaLabel() ?? ""} ${get(hotkeyLabel) ?? ""}`));
	append($$anchor, section);
	pop();
}
function Sonner_1($$anchor, $$props) {
	push($$props, true);
	let restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy"
	]);
	Toaster($$anchor, spread_props({
		get theme() {
			return derivedMode.current;
		},
		class: "toaster group",
		toastOptions: { classes: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} }
	}, () => restProps));
	pop();
}
var root_2 = from_html(`<!> `, 1);
var root_1 = from_html(`<span> </span> <span>•</span> <!>`, 1);
var root = from_html(`<!> <p class="p-4"><!></p> <p class="flex justify-center"><a target="_blank" href="https://www.touchweb.fr/cybersecurite-prestashop/charte-cybersecurite-responsable"><img alt="Security Badge" width="200"/></a></p> <!>`, 1);
function _layout($$anchor, $$props) {
	push($$props, true);
	let top = state(24);
	user_effect(() => {
		if (!in_iframe) return;
		const iframe = window.top?.document.querySelector("iframe#dynamicproduct-product-config");
		function updateOffset() {
			set(top, Math.max((window.top?.scrollY ?? 0) - ((iframe?.offsetTop ?? 0) - 100), 24), true);
		}
		updateOffset();
		window.top?.addEventListener("scroll", updateOffset);
		return () => {
			window.top?.removeEventListener("scroll", updateOffset);
		};
	});
	var fragment = root();
	var node = first_child(fragment);
	snippet(node, () => $$props.children);
	var p = sibling(node, 2);
	Badge(child(p), {
		class: "flex flex-wrap items-center gap-2 w-fit",
		variant: "secondary",
		children: ($$anchor$1, $$slotProps) => {
			var fragment_1 = root_1();
			var span = first_child(fragment_1);
			var text$1 = child(span, true);
			reset(span);
			Button(sibling(span, 4), {
				size: "xs",
				variant: "link",
				href: "https://dynamic-docs.prestalife.net/",
				target: "_blank",
				children: ($$anchor$2, $$slotProps$1) => {
					var fragment_2 = root_2();
					var node_3 = first_child(fragment_2);
					Icon(node_3, { icon: "ic:baseline-open-in-new" });
					var text_1 = sibling(node_3);
					template_effect(($0) => set_text(text_1, ` ${$0 ?? ""}`), [() => _("Documentation")]);
					append($$anchor$2, fragment_2);
				},
				$$slots: { default: true }
			});
			template_effect(() => set_text(text$1, $$props.data.version));
			append($$anchor$1, fragment_1);
		},
		$$slots: { default: true }
	});
	reset(p);
	var p_1 = sibling(p, 2);
	var a = child(p_1);
	var img = child(a);
	reset(a);
	reset(p_1);
	var node_4 = sibling(p_1, 2);
	{
		let $0 = user_derived(() => ({ top: get(top) }));
		Sonner_1(node_4, {
			get offset() {
				return get($0);
			},
			position: "top-right",
			richColors: true
		});
	}
	template_effect(($0) => set_attribute(img, "src", $0), [() => url("/security-badge.png")]);
	append($$anchor, fragment);
	pop();
}
export { _layout as component, _layout_exports as universal };
