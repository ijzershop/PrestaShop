import { Ct as set, Ft as push, G as if_block, Kt as noop, Ot as user_derived, Pt as pop, R as snippet, Tt as state, X as comment, Y as append, Z as from_html, bt as sibling, c as spread_props, mt as user_effect, o as prop, ot as get$1, r as onMount, s as rest_props, xt as proxy, yt as first_child } from "./DUscB9kS.js";
import { C as simpleBox, d as mergeProps, f as styleToString, m as cssToStyleObj, u as attachRef, v as boxFrom, y as boxWith } from "./B4l8ufIa.js";
import { C as getWindow$1, a as Escape_layer, i as Focus_scope, n as useId, o as Dismissible_layer, r as Text_selection_layer, t as Scroll_lock } from "./B3A_TfMF.js";
import { L as ElementSize, R as watch, z as Context } from "./_yKPJ4BA.js";
import { d as isNotNull } from "./9DgZZMlb.js";
var sides = [
	"top",
	"right",
	"bottom",
	"left"
];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
	x: v,
	y: v
});
var oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
var oppositeAlignmentMap = {
	start: "end",
	end: "start"
};
function clamp(start, value, end) {
	return max(start, min(value, end));
}
function evaluate(value, param) {
	return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
	return placement.split("-")[0];
}
function getAlignment(placement) {
	return placement.split("-")[1];
}
function getOppositeAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
	return axis === "y" ? "height" : "width";
}
var yAxisSides = /* @__PURE__ */ new Set(["top", "bottom"]);
function getSideAxis(placement) {
	return yAxisSides.has(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) rtl = false;
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
	if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rlPlacement : lrPlacement;
			return isStart ? lrPlacement : rlPlacement;
		case "left":
		case "right": return isStart ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
	}
	return list;
}
function getOppositePlacement(placement) {
	return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...padding
	};
}
function getPaddingObject(padding) {
	return typeof padding !== "number" ? expandPaddingObject(padding) : {
		top: padding,
		right: padding,
		bottom: padding,
		left: padding
	};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y
	};
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide(placement);
	const isVertical = sideAxis === "y";
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case "top":
			coords = {
				x: commonX,
				y: reference.y - floating.height
			};
			break;
		case "bottom":
			coords = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: commonY
			};
			break;
		default: coords = {
			x: reference.x,
			y: reference.y
		};
	}
	switch (getAlignment(placement)) {
		case "start":
			coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
			break;
		case "end":
			coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
			break;
	}
	return coords;
}
var computePosition$1 = async (reference, floating, config) => {
	const { placement = "bottom", strategy = "absolute", middleware = [], platform: platform$1 } = config;
	const validMiddleware = middleware.filter(Boolean);
	const rtl = await (platform$1.isRTL == null ? void 0 : platform$1.isRTL(floating));
	let rects = await platform$1.getElementRects({
		reference,
		floating,
		strategy
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let middlewareData = {};
	let resetCount = 0;
	for (let i = 0; i < validMiddleware.length; i++) {
		const { name, fn } = validMiddleware[i];
		const { x: nextX, y: nextY, data, reset } = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform: platform$1,
			elements: {
				reference,
				floating
			}
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData = {
			...middlewareData,
			[name]: {
				...middlewareData[name],
				...data
			}
		};
		if (reset && resetCount <= 50) {
			resetCount++;
			if (typeof reset === "object") {
				if (reset.placement) statefulPlacement = reset.placement;
				if (reset.rects) rects = reset.rects === true ? await platform$1.getElementRects({
					reference,
					floating,
					strategy
				}) : reset.rects;
				({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData
	};
};
async function detectOverflow(state$1, options) {
	var _await$platform$isEle;
	if (options === void 0) options = {};
	const { x, y, platform: platform$1, rects, elements, strategy } = state$1;
	const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state$1);
	const paddingObject = getPaddingObject(padding);
	const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
	const clippingClientRect = rectToClientRect(await platform$1.getClippingRect({
		element: ((_await$platform$isEle = await (platform$1.isElement == null ? void 0 : platform$1.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform$1.getDocumentElement == null ? void 0 : platform$1.getDocumentElement(elements.floating)),
		boundary,
		rootBoundary,
		strategy
	}));
	const rect = elementContext === "floating" ? {
		x,
		y,
		width: rects.floating.width,
		height: rects.floating.height
	} : rects.reference;
	const offsetParent = await (platform$1.getOffsetParent == null ? void 0 : platform$1.getOffsetParent(elements.floating));
	const offsetScale = await (platform$1.isElement == null ? void 0 : platform$1.isElement(offsetParent)) ? await (platform$1.getScale == null ? void 0 : platform$1.getScale(offsetParent)) || {
		x: 1,
		y: 1
	} : {
		x: 1,
		y: 1
	};
	const elementClientRect = rectToClientRect(platform$1.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform$1.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements,
		rect,
		offsetParent,
		strategy
	}) : rect);
	return {
		top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
		bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
		left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
		right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
	};
}
var arrow$1 = (options) => ({
	name: "arrow",
	options,
	async fn(state$1) {
		const { x, y, placement, rects, platform: platform$1, elements, middlewareData } = state$1;
		const { element, padding = 0 } = evaluate(options, state$1) || {};
		if (element == null) return {};
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform$1.getDimensions(element);
		const isYAxis = axis === "y";
		const minProp = isYAxis ? "top" : "left";
		const maxProp = isYAxis ? "bottom" : "right";
		const clientProp = isYAxis ? "clientHeight" : "clientWidth";
		const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const arrowOffsetParent = await (platform$1.getOffsetParent == null ? void 0 : platform$1.getOffsetParent(element));
		let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
		if (!clientSize || !await (platform$1.isElement == null ? void 0 : platform$1.isElement(arrowOffsetParent))) clientSize = elements.floating[clientProp] || rects.floating[length];
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
		const min$1 = minPadding;
		const max$1 = clientSize - arrowDimensions[length] - maxPadding;
		const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset$2 = clamp(min$1, center, max$1);
		const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset$2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
		const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max$1 : 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset$2,
				centerOffset: center - offset$2 - alignmentOffset,
				...shouldAddOffset && { alignmentOffset }
			},
			reset: shouldAddOffset
		};
	}
});
var flip$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "flip",
		options,
		async fn(state$1) {
			var _middlewareData$arrow, _middlewareData$flip;
			const { placement, middlewareData, rects, initialPlacement, platform: platform$1, elements } = state$1;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state$1);
			if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			const side = getSide(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide(initialPlacement) === initialPlacement;
			const rtl = await (platform$1.isRTL == null ? void 0 : platform$1.isRTL(elements.floating));
			const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
			const placements = [initialPlacement, ...fallbackPlacements];
			const overflow = await detectOverflow(state$1, detectOverflowOptions);
			const overflows = [];
			let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
			if (checkMainAxis) overflows.push(overflow[side]);
			if (checkCrossAxis) {
				const sides$1 = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides$1[0]], overflow[sides$1[1]]);
			}
			overflowsData = [...overflowsData, {
				placement,
				overflows
			}];
			if (!overflows.every((side$1) => side$1 <= 0)) {
				var _middlewareData$flip2, _overflowsData$filter;
				const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements[nextIndex];
				if (nextPlacement) {
					if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
						data: {
							index: nextIndex,
							overflows: overflowsData
						},
						reset: { placement: nextPlacement }
					};
				}
				let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
				if (!resetPlacement) switch (fallbackStrategy) {
					case "bestFit": {
						var _overflowsData$filter2;
						const placement$1 = (_overflowsData$filter2 = overflowsData.filter((d) => {
							if (hasFallbackAxisSideDirection) {
								const currentSideAxis = getSideAxis(d.placement);
								return currentSideAxis === initialSideAxis || currentSideAxis === "y";
							}
							return true;
						}).map((d) => [d.placement, d.overflows.filter((overflow$1) => overflow$1 > 0).reduce((acc, overflow$1) => acc + overflow$1, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
						if (placement$1) resetPlacement = placement$1;
						break;
					}
					case "initialPlacement":
						resetPlacement = initialPlacement;
						break;
				}
				if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
			}
			return {};
		}
	};
};
function getSideOffsets(overflow, rect) {
	return {
		top: overflow.top - rect.height,
		right: overflow.right - rect.width,
		bottom: overflow.bottom - rect.height,
		left: overflow.left - rect.width
	};
}
function isAnySideFullyClipped(overflow) {
	return sides.some((side) => overflow[side] >= 0);
}
var hide$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "hide",
		options,
		async fn(state$1) {
			const { rects } = state$1;
			const { strategy = "referenceHidden", ...detectOverflowOptions } = evaluate(options, state$1);
			switch (strategy) {
				case "referenceHidden": {
					const offsets = getSideOffsets(await detectOverflow(state$1, {
						...detectOverflowOptions,
						elementContext: "reference"
					}), rects.reference);
					return { data: {
						referenceHiddenOffsets: offsets,
						referenceHidden: isAnySideFullyClipped(offsets)
					} };
				}
				case "escaped": {
					const offsets = getSideOffsets(await detectOverflow(state$1, {
						...detectOverflowOptions,
						altBoundary: true
					}), rects.floating);
					return { data: {
						escapedOffsets: offsets,
						escaped: isAnySideFullyClipped(offsets)
					} };
				}
				default: return {};
			}
		}
	};
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state$1, options) {
	const { placement, platform: platform$1, elements } = state$1;
	const rtl = await (platform$1.isRTL == null ? void 0 : platform$1.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = originSides.has(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state$1);
	let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
		mainAxis: rawValue,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: rawValue.mainAxis || 0,
		crossAxis: rawValue.crossAxis || 0,
		alignmentAxis: rawValue.alignmentAxis
	};
	if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	return isVertical ? {
		x: crossAxis * crossAxisMulti,
		y: mainAxis * mainAxisMulti
	} : {
		x: mainAxis * mainAxisMulti,
		y: crossAxis * crossAxisMulti
	};
}
var offset$1 = function(options) {
	if (options === void 0) options = 0;
	return {
		name: "offset",
		options,
		async fn(state$1) {
			var _middlewareData$offse, _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state$1;
			const diffCoords = await convertValueToCoords(state$1, options);
			if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement
				}
			};
		}
	};
};
var shift$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "shift",
		options,
		async fn(state$1) {
			const { x, y, placement } = state$1;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
				let { x: x$1, y: y$1 } = _ref;
				return {
					x: x$1,
					y: y$1
				};
			} }, ...detectOverflowOptions } = evaluate(options, state$1);
			const coords = {
				x,
				y
			};
			const overflow = await detectOverflow(state$1, detectOverflowOptions);
			const crossAxis = getSideAxis(getSide(placement));
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			if (checkMainAxis) {
				const minSide = mainAxis === "y" ? "top" : "left";
				const maxSide = mainAxis === "y" ? "bottom" : "right";
				const min$1 = mainAxisCoord + overflow[minSide];
				const max$1 = mainAxisCoord - overflow[maxSide];
				mainAxisCoord = clamp(min$1, mainAxisCoord, max$1);
			}
			if (checkCrossAxis) {
				const minSide = crossAxis === "y" ? "top" : "left";
				const maxSide = crossAxis === "y" ? "bottom" : "right";
				const min$1 = crossAxisCoord + overflow[minSide];
				const max$1 = crossAxisCoord - overflow[maxSide];
				crossAxisCoord = clamp(min$1, crossAxisCoord, max$1);
			}
			const limitedCoords = limiter.fn({
				...state$1,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis
					}
				}
			};
		}
	};
};
var limitShift$1 = function(options) {
	if (options === void 0) options = {};
	return {
		options,
		fn(state$1) {
			const { x, y, placement, rects, middlewareData } = state$1;
			const { offset: offset$2 = 0, mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = evaluate(options, state$1);
			const coords = {
				x,
				y
			};
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const rawOffset = evaluate(offset$2, state$1);
			const computedOffset = typeof rawOffset === "number" ? {
				mainAxis: rawOffset,
				crossAxis: 0
			} : {
				mainAxis: 0,
				crossAxis: 0,
				...rawOffset
			};
			if (checkMainAxis) {
				const len = mainAxis === "y" ? "height" : "width";
				const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
				const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
				if (mainAxisCoord < limitMin) mainAxisCoord = limitMin;
				else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax;
			}
			if (checkCrossAxis) {
				var _middlewareData$offse, _middlewareData$offse2;
				const len = mainAxis === "y" ? "width" : "height";
				const isOriginSide = originSides.has(getSide(placement));
				const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
				const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
				if (crossAxisCoord < limitMin) crossAxisCoord = limitMin;
				else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax;
			}
			return {
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			};
		}
	};
};
var size$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "size",
		options,
		async fn(state$1) {
			var _state$middlewareData, _state$middlewareData2;
			const { placement, rects, platform: platform$1, elements } = state$1;
			const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state$1);
			const overflow = await detectOverflow(state$1, detectOverflowOptions);
			const side = getSide(placement);
			const alignment = getAlignment(placement);
			const isYAxis = getSideAxis(placement) === "y";
			const { width, height } = rects.floating;
			let heightSide;
			let widthSide;
			if (side === "top" || side === "bottom") {
				heightSide = side;
				widthSide = alignment === (await (platform$1.isRTL == null ? void 0 : platform$1.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
			} else {
				widthSide = side;
				heightSide = alignment === "end" ? "top" : "bottom";
			}
			const maximumClippingHeight = height - overflow.top - overflow.bottom;
			const maximumClippingWidth = width - overflow.left - overflow.right;
			const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
			const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
			const noShift = !state$1.middlewareData.shift;
			let availableHeight = overflowAvailableHeight;
			let availableWidth = overflowAvailableWidth;
			if ((_state$middlewareData = state$1.middlewareData.shift) != null && _state$middlewareData.enabled.x) availableWidth = maximumClippingWidth;
			if ((_state$middlewareData2 = state$1.middlewareData.shift) != null && _state$middlewareData2.enabled.y) availableHeight = maximumClippingHeight;
			if (noShift && !alignment) {
				const xMin = max(overflow.left, 0);
				const xMax = max(overflow.right, 0);
				const yMin = max(overflow.top, 0);
				const yMax = max(overflow.bottom, 0);
				if (isYAxis) availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
				else availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
			}
			await apply({
				...state$1,
				availableWidth,
				availableHeight
			});
			const nextDimensions = await platform$1.getDimensions(elements.floating);
			if (width !== nextDimensions.width || height !== nextDimensions.height) return { reset: { rects: true } };
			return {};
		}
	};
};
function hasWindow() {
	return typeof window !== "undefined";
}
function getNodeName(node) {
	if (isNode(node)) return (node.nodeName || "").toLowerCase();
	return "#document";
}
function getWindow(node) {
	var _node$ownerDocument;
	return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
	var _ref;
	return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
	if (!hasWindow()) return false;
	return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
	if (!hasWindow()) return false;
	return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
	if (!hasWindow()) return false;
	return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
	if (!hasWindow() || typeof ShadowRoot === "undefined") return false;
	return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
var invalidOverflowDisplayValues = /* @__PURE__ */ new Set(["inline", "contents"]);
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
	return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
}
var tableElements = /* @__PURE__ */ new Set([
	"table",
	"td",
	"th"
]);
function isTableElement(element) {
	return tableElements.has(getNodeName(element));
}
var topLayerSelectors = [":popover-open", ":modal"];
function isTopLayer(element) {
	return topLayerSelectors.some((selector) => {
		try {
			return element.matches(selector);
		} catch (_e) {
			return false;
		}
	});
}
var transformProperties = [
	"transform",
	"translate",
	"scale",
	"rotate",
	"perspective"
];
var willChangeValues = [
	"transform",
	"translate",
	"scale",
	"rotate",
	"perspective",
	"filter"
];
var containValues = [
	"paint",
	"layout",
	"strict",
	"content"
];
function isContainingBlock(elementOrCss) {
	const webkit = isWebKit();
	const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
	return transformProperties.some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || willChangeValues.some((value) => (css.willChange || "").includes(value)) || containValues.some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) return currentNode;
		else if (isTopLayer(currentNode)) return null;
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit() {
	if (typeof CSS === "undefined" || !CSS.supports) return false;
	return CSS.supports("-webkit-backdrop-filter", "none");
}
var lastTraversableNodeNames = /* @__PURE__ */ new Set([
	"html",
	"body",
	"#document"
]);
function isLastTraversableNode(node) {
	return lastTraversableNodeNames.has(getNodeName(node));
}
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
	if (isElement(element)) return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY
	};
}
function getParentNode(node) {
	if (getNodeName(node) === "html") return node;
	const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) return node.ownerDocument ? node.ownerDocument.body : node.body;
	if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode;
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) list = [];
	if (traverseIframes === void 0) traverseIframes = true;
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
	const win = getWindow(scrollableAncestor);
	if (isBody) {
		const frameElement = getFrameElement(win);
		return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
	}
	return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
	const css = getComputedStyle$1(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
	const hasOffset = isHTMLElement(element);
	const offsetWidth = hasOffset ? element.offsetWidth : width;
	const offsetHeight = hasOffset ? element.offsetHeight : height;
	const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
	if (shouldFallback) {
		width = offsetWidth;
		height = offsetHeight;
	}
	return {
		width,
		height,
		$: shouldFallback
	};
}
function unwrapElement(element) {
	return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
	const domElement = unwrapElement(element);
	if (!isHTMLElement(domElement)) return createCoords(1);
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) x = 1;
	if (!y || !Number.isFinite(y)) y = 1;
	return {
		x,
		y
	};
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
	const win = getWindow(element);
	if (!isWebKit() || !win.visualViewport) return noOffsets;
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) isFixed = false;
	if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) return false;
	return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement(element);
	let scale = createCoords(1);
	if (includeScale) if (offsetParent) {
		if (isElement(offsetParent)) scale = getScale(offsetParent);
	} else scale = getScale(element);
	const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
	let x = (clientRect.left + visualOffsets.x) / scale.x;
	let y = (clientRect.top + visualOffsets.y) / scale.y;
	let width = clientRect.width / scale.x;
	let height = clientRect.height / scale.y;
	if (domElement) {
		const win = getWindow(domElement);
		const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
		let currentWin = win;
		let currentIFrame = getFrameElement(currentWin);
		while (currentIFrame && offsetParent && offsetWin !== currentWin) {
			const iframeScale = getScale(currentIFrame);
			const iframeRect = currentIFrame.getBoundingClientRect();
			const css = getComputedStyle$1(currentIFrame);
			const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
			const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
			x *= iframeScale.x;
			y *= iframeScale.y;
			width *= iframeScale.x;
			height *= iframeScale.y;
			x += left;
			y += top;
			currentWin = getWindow(currentIFrame);
			currentIFrame = getFrameElement(currentWin);
		}
	}
	return rectToClientRect({
		width,
		height,
		x,
		y
	});
}
function getWindowScrollBarX(element, rect) {
	const leftScroll = getNodeScroll(element).scrollLeft;
	if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
	const htmlRect = documentElement.getBoundingClientRect();
	return {
		x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
		y: htmlRect.top + scroll.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === "fixed";
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || topLayer && isFixed) return rect;
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isHTMLElement(offsetParent)) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		width: rect.width * scale.x,
		height: rect.height * scale.y,
		x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
		y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
	};
}
function getClientRects(element) {
	return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
	const html = getDocumentElement(element);
	const scroll = getNodeScroll(element);
	const body = element.ownerDocument.body;
	const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
	const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
	let x = -scroll.scrollLeft + getWindowScrollBarX(element);
	const y = -scroll.scrollTop;
	if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
	return {
		width,
		height,
		x,
		y
	};
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
	const win = getWindow(element);
	const html = getDocumentElement(element);
	const visualViewport = win.visualViewport;
	let width = html.clientWidth;
	let height = html.clientHeight;
	let x = 0;
	let y = 0;
	if (visualViewport) {
		width = visualViewport.width;
		height = visualViewport.height;
		const visualViewportBased = isWebKit();
		if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
			x = visualViewport.offsetLeft;
			y = visualViewport.offsetTop;
		}
	}
	const windowScrollbarX = getWindowScrollBarX(html);
	if (windowScrollbarX <= 0) {
		const doc = html.ownerDocument;
		const body = doc.body;
		const bodyStyles = getComputedStyle(body);
		const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
		const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
		if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) width -= clippingStableScrollbarWidth;
	} else if (windowScrollbarX <= SCROLLBAR_MAX) width += windowScrollbarX;
	return {
		width,
		height,
		x,
		y
	};
}
var absoluteOrFixed = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function getInnerBoundingClientRect(element, strategy) {
	const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
	const top = clientRect.top + element.clientTop;
	const left = clientRect.left + element.clientLeft;
	const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
	return {
		width: element.clientWidth * scale.x,
		height: element.clientHeight * scale.y,
		x: left * scale.x,
		y: top * scale.y
	};
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	let rect;
	if (clippingAncestor === "viewport") rect = getViewportRect(element, strategy);
	else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
	else if (isElement(clippingAncestor)) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	else {
		const visualOffsets = getVisualOffsets(element);
		rect = {
			x: clippingAncestor.x - visualOffsets.x,
			y: clippingAncestor.y - visualOffsets.y,
			width: clippingAncestor.width,
			height: clippingAncestor.height
		};
	}
	return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
	const parentNode = getParentNode(element);
	if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) return false;
	return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) return cachedResult;
	let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
	let currentContainingBlockComputedStyle = null;
	const elementIsFixed = getComputedStyle$1(element).position === "fixed";
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle$1(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		if (!currentNodeIsContaining && computedStyle.position === "fixed") currentContainingBlockComputedStyle = null;
		if (elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode)) result = result.filter((ancestor) => ancestor !== currentNode);
		else currentContainingBlockComputedStyle = computedStyle;
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
	const firstClippingAncestor = clippingAncestors[0];
	const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
		const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
		accRect.top = max(rect.top, accRect.top);
		accRect.right = min(rect.right, accRect.right);
		accRect.bottom = min(rect.bottom, accRect.bottom);
		accRect.left = max(rect.left, accRect.left);
		return accRect;
	}, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
	return {
		width: clippingRect.right - clippingRect.left,
		height: clippingRect.bottom - clippingRect.top,
		x: clippingRect.left,
		y: clippingRect.top
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
	return {
		width,
		height
	};
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	const documentElement = getDocumentElement(offsetParent);
	const isFixed = strategy === "fixed";
	const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	const offsets = createCoords(0);
	function setLeftRTLScrollbarOffset() {
		offsets.x = getWindowScrollBarX(documentElement);
	}
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		} else if (documentElement) setLeftRTLScrollbarOffset();
	}
	if (isFixed && !isOffsetParentAnElement && documentElement) setLeftRTLScrollbarOffset();
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
		y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
		width: rect.width,
		height: rect.height
	};
}
function isStaticPositioned(element) {
	return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
	if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
	if (polyfill) return polyfill(element);
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow(element);
	if (isTopLayer(element)) return win;
	if (!isHTMLElement(element)) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
	return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
	const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	const getDimensionsFn = this.getDimensions;
	const floatingDimensions = await getDimensionsFn(data.floating);
	return {
		reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
		floating: {
			x: 0,
			y: 0,
			width: floatingDimensions.width,
			height: floatingDimensions.height
		}
	};
};
function isRTL(element) {
	return getComputedStyle$1(element).direction === "rtl";
}
var platform = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL
};
function rectsAreEqual(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
	let io = null;
	let timeoutId;
	const root = getDocumentElement(element);
	function cleanup() {
		var _io;
		clearTimeout(timeoutId);
		(_io = io) == null || _io.disconnect();
		io = null;
	}
	function refresh(skip, threshold) {
		if (skip === void 0) skip = false;
		if (threshold === void 0) threshold = 1;
		cleanup();
		const elementRectForRootMargin = element.getBoundingClientRect();
		const { left, top, width, height } = elementRectForRootMargin;
		if (!skip) onMove();
		if (!width || !height) return;
		const insetTop = floor(top);
		const insetRight = floor(root.clientWidth - (left + width));
		const insetBottom = floor(root.clientHeight - (top + height));
		const insetLeft = floor(left);
		const options = {
			rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
			threshold: max(0, min(1, threshold)) || 1
		};
		let isFirstUpdate = true;
		function handleObserve(entries) {
			const ratio = entries[0].intersectionRatio;
			if (ratio !== threshold) {
				if (!isFirstUpdate) return refresh();
				if (!ratio) timeoutId = setTimeout(() => {
					refresh(false, 1e-7);
				}, 1e3);
				else refresh(false, ratio);
			}
			if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) refresh();
			isFirstUpdate = false;
		}
		try {
			io = new IntersectionObserver(handleObserve, {
				...options,
				root: root.ownerDocument
			});
		} catch (_e) {
			io = new IntersectionObserver(handleObserve, options);
		}
		io.observe(element);
	}
	refresh(true);
	return cleanup;
}
function autoUpdate(reference, floating, update, options) {
	if (options === void 0) options = {};
	const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options;
	const referenceEl = unwrapElement(reference);
	const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
	ancestors.forEach((ancestor) => {
		ancestorScroll && ancestor.addEventListener("scroll", update, { passive: true });
		ancestorResize && ancestor.addEventListener("resize", update);
	});
	const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
	let reobserveFrame = -1;
	let resizeObserver = null;
	if (elementResize) {
		resizeObserver = new ResizeObserver((_ref) => {
			let [firstEntry] = _ref;
			if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
				resizeObserver.unobserve(floating);
				cancelAnimationFrame(reobserveFrame);
				reobserveFrame = requestAnimationFrame(() => {
					var _resizeObserver;
					(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
				});
			}
			update();
		});
		if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl);
		resizeObserver.observe(floating);
	}
	let frameId;
	let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
	if (animationFrame) frameLoop();
	function frameLoop() {
		const nextRefRect = getBoundingClientRect(reference);
		if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update();
		prevRefRect = nextRefRect;
		frameId = requestAnimationFrame(frameLoop);
	}
	update();
	return () => {
		var _resizeObserver2;
		ancestors.forEach((ancestor) => {
			ancestorScroll && ancestor.removeEventListener("scroll", update);
			ancestorResize && ancestor.removeEventListener("resize", update);
		});
		cleanupIo?.();
		(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
		resizeObserver = null;
		if (animationFrame) cancelAnimationFrame(frameId);
	};
}
var offset = offset$1;
var shift = shift$1;
var flip = flip$1;
var size = size$1;
var hide = hide$1;
var arrow = arrow$1;
var limitShift = limitShift$1;
var computePosition = (reference, floating, options) => {
	const cache = /* @__PURE__ */ new Map();
	const mergedOptions = {
		platform,
		...options
	};
	const platformWithCache = {
		...mergedOptions.platform,
		_c: cache
	};
	return computePosition$1(reference, floating, {
		...mergedOptions,
		platform: platformWithCache
	});
};
function get(valueOrGetValue) {
	return typeof valueOrGetValue === "function" ? valueOrGetValue() : valueOrGetValue;
}
function getDPR(element) {
	if (typeof window === "undefined") return 1;
	return (element.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function roundByDPR(element, value) {
	const dpr = getDPR(element);
	return Math.round(value * dpr) / dpr;
}
function getFloatingContentCSSVars(name) {
	return {
		[`--bits-${name}-content-transform-origin`]: `var(--bits-floating-transform-origin)`,
		[`--bits-${name}-content-available-width`]: `var(--bits-floating-available-width)`,
		[`--bits-${name}-content-available-height`]: `var(--bits-floating-available-height)`,
		[`--bits-${name}-anchor-width`]: `var(--bits-floating-anchor-width)`,
		[`--bits-${name}-anchor-height`]: `var(--bits-floating-anchor-height)`
	};
}
function useFloating(options) {
	const whileElementsMountedOption = options.whileElementsMounted;
	const openOption = user_derived(() => get(options.open) ?? true);
	const middlewareOption = user_derived(() => get(options.middleware));
	const transformOption = user_derived(() => get(options.transform) ?? true);
	const placementOption = user_derived(() => get(options.placement) ?? "bottom");
	const strategyOption = user_derived(() => get(options.strategy) ?? "absolute");
	const sideOffsetOption = user_derived(() => get(options.sideOffset) ?? 0);
	const alignOffsetOption = user_derived(() => get(options.alignOffset) ?? 0);
	const reference = options.reference;
	let x = state(0);
	let y = state(0);
	const floating = simpleBox(null);
	let strategy = state(proxy(get$1(strategyOption)));
	let placement = state(proxy(get$1(placementOption)));
	let middlewareData = state(proxy({}));
	let isPositioned = state(false);
	const floatingStyles = user_derived(() => {
		const xVal = floating.current ? roundByDPR(floating.current, get$1(x)) : get$1(x);
		const yVal = floating.current ? roundByDPR(floating.current, get$1(y)) : get$1(y);
		if (get$1(transformOption)) return {
			position: get$1(strategy),
			left: "0",
			top: "0",
			transform: `translate(${xVal}px, ${yVal}px)`,
			...floating.current && getDPR(floating.current) >= 1.5 && { willChange: "transform" }
		};
		return {
			position: get$1(strategy),
			left: `${xVal}px`,
			top: `${yVal}px`
		};
	});
	let whileElementsMountedCleanup;
	function update() {
		if (reference.current === null || floating.current === null) return;
		computePosition(reference.current, floating.current, {
			middleware: get$1(middlewareOption),
			placement: get$1(placementOption),
			strategy: get$1(strategyOption)
		}).then((position) => {
			if (!get$1(openOption) && get$1(x) !== 0 && get$1(y) !== 0) {
				const maxExpectedOffset = Math.max(Math.abs(get$1(sideOffsetOption)), Math.abs(get$1(alignOffsetOption)), 15);
				if (position.x <= maxExpectedOffset && position.y <= maxExpectedOffset) return;
			}
			set(x, position.x, true);
			set(y, position.y, true);
			set(strategy, position.strategy, true);
			set(placement, position.placement, true);
			set(middlewareData, position.middlewareData, true);
			set(isPositioned, true);
		});
	}
	function cleanup() {
		if (typeof whileElementsMountedCleanup === "function") {
			whileElementsMountedCleanup();
			whileElementsMountedCleanup = void 0;
		}
	}
	function attach() {
		cleanup();
		if (whileElementsMountedOption === void 0) {
			update();
			return;
		}
		if (reference.current === null || floating.current === null) return;
		whileElementsMountedCleanup = whileElementsMountedOption(reference.current, floating.current, update);
	}
	function reset() {
		if (!get$1(openOption)) set(isPositioned, false);
	}
	user_effect(update);
	user_effect(attach);
	user_effect(reset);
	user_effect(() => cleanup);
	return {
		floating,
		reference,
		get strategy() {
			return get$1(strategy);
		},
		get placement() {
			return get$1(placement);
		},
		get middlewareData() {
			return get$1(middlewareData);
		},
		get isPositioned() {
			return get$1(isPositioned);
		},
		get floatingStyles() {
			return get$1(floatingStyles);
		},
		get update() {
			return update;
		}
	};
}
var OPPOSITE_SIDE = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
};
var FloatingRootContext = new Context("Floating.Root");
var FloatingContentContext = new Context("Floating.Content");
var FloatingTooltipRootContext = new Context("Floating.Root");
var FloatingRootState = class FloatingRootState {
	static create(tooltip = false) {
		return tooltip ? FloatingTooltipRootContext.set(new FloatingRootState()) : FloatingRootContext.set(new FloatingRootState());
	}
	anchorNode = simpleBox(null);
	customAnchorNode = simpleBox(null);
	triggerNode = simpleBox(null);
	constructor() {
		user_effect(() => {
			if (this.customAnchorNode.current) if (typeof this.customAnchorNode.current === "string") this.anchorNode.current = document.querySelector(this.customAnchorNode.current);
			else this.anchorNode.current = this.customAnchorNode.current;
			else this.anchorNode.current = this.triggerNode.current;
		});
	}
};
var FloatingContentState = class FloatingContentState {
	static create(opts, tooltip = false) {
		return tooltip ? FloatingContentContext.set(new FloatingContentState(opts, FloatingTooltipRootContext.get())) : FloatingContentContext.set(new FloatingContentState(opts, FloatingRootContext.get()));
	}
	opts;
	root;
	contentRef = simpleBox(null);
	wrapperRef = simpleBox(null);
	arrowRef = simpleBox(null);
	contentAttachment = attachRef(this.contentRef);
	wrapperAttachment = attachRef(this.wrapperRef);
	arrowAttachment = attachRef(this.arrowRef);
	arrowId = simpleBox(useId());
	#transformedStyle = user_derived(() => {
		if (typeof this.opts.style === "string") return cssToStyleObj(this.opts.style);
		if (!this.opts.style) return {};
	});
	#updatePositionStrategy = void 0;
	#arrowSize = new ElementSize(() => this.arrowRef.current ?? void 0);
	#arrowWidth = user_derived(() => this.#arrowSize?.width ?? 0);
	#arrowHeight = user_derived(() => this.#arrowSize?.height ?? 0);
	#desiredPlacement = user_derived(() => this.opts.side?.current + (this.opts.align.current !== "center" ? `-${this.opts.align.current}` : ""));
	#boundary = user_derived(() => Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]);
	#hasExplicitBoundaries = user_derived(() => get$1(this.#boundary).length > 0);
	get hasExplicitBoundaries() {
		return get$1(this.#hasExplicitBoundaries);
	}
	set hasExplicitBoundaries(value) {
		set(this.#hasExplicitBoundaries, value);
	}
	#detectOverflowOptions = user_derived(() => ({
		padding: this.opts.collisionPadding.current,
		boundary: get$1(this.#boundary).filter(isNotNull),
		altBoundary: this.hasExplicitBoundaries
	}));
	get detectOverflowOptions() {
		return get$1(this.#detectOverflowOptions);
	}
	set detectOverflowOptions(value) {
		set(this.#detectOverflowOptions, value);
	}
	#availableWidth = state(void 0);
	#availableHeight = state(void 0);
	#anchorWidth = state(void 0);
	#anchorHeight = state(void 0);
	#middleware = user_derived(() => [
		offset({
			mainAxis: this.opts.sideOffset.current + get$1(this.#arrowHeight),
			alignmentAxis: this.opts.alignOffset.current
		}),
		this.opts.avoidCollisions.current && shift({
			mainAxis: true,
			crossAxis: false,
			limiter: this.opts.sticky.current === "partial" ? limitShift() : void 0,
			...this.detectOverflowOptions
		}),
		this.opts.avoidCollisions.current && flip({ ...this.detectOverflowOptions }),
		size({
			...this.detectOverflowOptions,
			apply: ({ rects, availableWidth, availableHeight }) => {
				const { width: anchorWidth, height: anchorHeight } = rects.reference;
				set(this.#availableWidth, availableWidth, true);
				set(this.#availableHeight, availableHeight, true);
				set(this.#anchorWidth, anchorWidth, true);
				set(this.#anchorHeight, anchorHeight, true);
			}
		}),
		this.arrowRef.current && arrow({
			element: this.arrowRef.current,
			padding: this.opts.arrowPadding.current
		}),
		transformOrigin({
			arrowWidth: get$1(this.#arrowWidth),
			arrowHeight: get$1(this.#arrowHeight)
		}),
		this.opts.hideWhenDetached.current && hide({
			strategy: "referenceHidden",
			...this.detectOverflowOptions
		})
	].filter(Boolean));
	get middleware() {
		return get$1(this.#middleware);
	}
	set middleware(value) {
		set(this.#middleware, value);
	}
	floating;
	#placedSide = user_derived(() => getSideFromPlacement(this.floating.placement));
	get placedSide() {
		return get$1(this.#placedSide);
	}
	set placedSide(value) {
		set(this.#placedSide, value);
	}
	#placedAlign = user_derived(() => getAlignFromPlacement(this.floating.placement));
	get placedAlign() {
		return get$1(this.#placedAlign);
	}
	set placedAlign(value) {
		set(this.#placedAlign, value);
	}
	#arrowX = user_derived(() => this.floating.middlewareData.arrow?.x ?? 0);
	get arrowX() {
		return get$1(this.#arrowX);
	}
	set arrowX(value) {
		set(this.#arrowX, value);
	}
	#arrowY = user_derived(() => this.floating.middlewareData.arrow?.y ?? 0);
	get arrowY() {
		return get$1(this.#arrowY);
	}
	set arrowY(value) {
		set(this.#arrowY, value);
	}
	#cannotCenterArrow = user_derived(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
	get cannotCenterArrow() {
		return get$1(this.#cannotCenterArrow);
	}
	set cannotCenterArrow(value) {
		set(this.#cannotCenterArrow, value);
	}
	#contentZIndex = state();
	get contentZIndex() {
		return get$1(this.#contentZIndex);
	}
	set contentZIndex(value) {
		set(this.#contentZIndex, value, true);
	}
	#arrowBaseSide = user_derived(() => OPPOSITE_SIDE[this.placedSide]);
	get arrowBaseSide() {
		return get$1(this.#arrowBaseSide);
	}
	set arrowBaseSide(value) {
		set(this.#arrowBaseSide, value);
	}
	#wrapperProps = user_derived(() => ({
		id: this.opts.wrapperId.current,
		"data-bits-floating-content-wrapper": "",
		style: {
			...this.floating.floatingStyles,
			transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: this.contentZIndex,
			"--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
			"--bits-floating-available-width": `${get$1(this.#availableWidth)}px`,
			"--bits-floating-available-height": `${get$1(this.#availableHeight)}px`,
			"--bits-floating-anchor-width": `${get$1(this.#anchorWidth)}px`,
			"--bits-floating-anchor-height": `${get$1(this.#anchorHeight)}px`,
			...this.floating.middlewareData.hide?.referenceHidden && {
				visibility: "hidden",
				"pointer-events": "none"
			},
			...get$1(this.#transformedStyle)
		},
		dir: this.opts.dir.current,
		...this.wrapperAttachment
	}));
	get wrapperProps() {
		return get$1(this.#wrapperProps);
	}
	set wrapperProps(value) {
		set(this.#wrapperProps, value);
	}
	#props = user_derived(() => ({
		"data-side": this.placedSide,
		"data-align": this.placedAlign,
		style: styleToString({ ...get$1(this.#transformedStyle) }),
		...this.contentAttachment
	}));
	get props() {
		return get$1(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
	#arrowStyle = user_derived(() => ({
		position: "absolute",
		left: this.arrowX ? `${this.arrowX}px` : void 0,
		top: this.arrowY ? `${this.arrowY}px` : void 0,
		[this.arrowBaseSide]: 0,
		"transform-origin": {
			top: "",
			right: "0 0",
			bottom: "center 0",
			left: "100% 0"
		}[this.placedSide],
		transform: {
			top: "translateY(100%)",
			right: "translateY(50%) rotate(90deg) translateX(-50%)",
			bottom: "rotate(180deg)",
			left: "translateY(50%) rotate(-90deg) translateX(50%)"
		}[this.placedSide],
		visibility: this.cannotCenterArrow ? "hidden" : void 0
	}));
	get arrowStyle() {
		return get$1(this.#arrowStyle);
	}
	set arrowStyle(value) {
		set(this.#arrowStyle, value);
	}
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		if (opts.customAnchor) this.root.customAnchorNode.current = opts.customAnchor.current;
		watch(() => opts.customAnchor.current, (customAnchor) => {
			this.root.customAnchorNode.current = customAnchor;
		});
		this.floating = useFloating({
			strategy: () => this.opts.strategy.current,
			placement: () => get$1(this.#desiredPlacement),
			middleware: () => this.middleware,
			reference: this.root.anchorNode,
			whileElementsMounted: (...args) => {
				return autoUpdate(...args, { animationFrame: this.#updatePositionStrategy?.current === "always" });
			},
			open: () => this.opts.enabled.current,
			sideOffset: () => this.opts.sideOffset.current,
			alignOffset: () => this.opts.alignOffset.current
		});
		user_effect(() => {
			if (!this.floating.isPositioned) return;
			this.opts.onPlaced?.current();
		});
		watch(() => this.contentRef.current, (contentNode) => {
			if (!contentNode) return;
			this.contentZIndex = getWindow$1(contentNode).getComputedStyle(contentNode).zIndex;
		});
		user_effect(() => {
			this.floating.floating.current = this.wrapperRef.current;
		});
	}
};
var FloatingAnchorState = class FloatingAnchorState {
	static create(opts, tooltip = false) {
		return tooltip ? new FloatingAnchorState(opts, FloatingTooltipRootContext.get()) : new FloatingAnchorState(opts, FloatingRootContext.get());
	}
	opts;
	root;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		if (opts.virtualEl && opts.virtualEl.current) root.triggerNode = boxFrom(opts.virtualEl.current);
		else root.triggerNode = opts.ref;
	}
};
function transformOrigin(options) {
	return {
		name: "transformOrigin",
		options,
		fn(data) {
			const { placement, rects, middlewareData } = data;
			const isArrowHidden = middlewareData.arrow?.centerOffset !== 0;
			const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
			const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
			const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
			const noArrowAlign = {
				start: "0%",
				center: "50%",
				end: "100%"
			}[placedAlign];
			const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
			const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
			let x = "";
			let y = "";
			if (placedSide === "bottom") {
				x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
				y = `${-arrowHeight}px`;
			} else if (placedSide === "top") {
				x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
				y = `${rects.floating.height + arrowHeight}px`;
			} else if (placedSide === "right") {
				x = `${-arrowHeight}px`;
				y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
			} else if (placedSide === "left") {
				x = `${rects.floating.width + arrowHeight}px`;
				y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
			}
			return { data: {
				x,
				y
			} };
		}
	};
}
function getSideAndAlignFromPlacement(placement) {
	const [side, align = "center"] = placement.split("-");
	return [side, align];
}
function getSideFromPlacement(placement) {
	return getSideAndAlignFromPlacement(placement)[0];
}
function getAlignFromPlacement(placement) {
	return getSideAndAlignFromPlacement(placement)[1];
}
function Floating_layer($$anchor, $$props) {
	push($$props, true);
	let tooltip = prop($$props, "tooltip", 3, false);
	FloatingRootState.create(tooltip());
	var fragment = comment();
	snippet(first_child(fragment), () => $$props.children ?? noop);
	append($$anchor, fragment);
	pop();
}
function Floating_layer_anchor($$anchor, $$props) {
	push($$props, true);
	let tooltip = prop($$props, "tooltip", 3, false);
	FloatingAnchorState.create({
		id: boxWith(() => $$props.id),
		virtualEl: boxWith(() => $$props.virtualEl),
		ref: $$props.ref
	}, tooltip());
	var fragment = comment();
	snippet(first_child(fragment), () => $$props.children ?? noop);
	append($$anchor, fragment);
	pop();
}
function Floating_layer_content($$anchor, $$props) {
	push($$props, true);
	let side = prop($$props, "side", 3, "bottom"), sideOffset = prop($$props, "sideOffset", 3, 0), align = prop($$props, "align", 3, "center"), alignOffset = prop($$props, "alignOffset", 3, 0), arrowPadding = prop($$props, "arrowPadding", 3, 0), avoidCollisions = prop($$props, "avoidCollisions", 3, true), collisionBoundary = prop($$props, "collisionBoundary", 19, () => []), collisionPadding = prop($$props, "collisionPadding", 3, 0), hideWhenDetached = prop($$props, "hideWhenDetached", 3, false), onPlaced = prop($$props, "onPlaced", 3, () => {}), sticky = prop($$props, "sticky", 3, "partial"), updatePositionStrategy = prop($$props, "updatePositionStrategy", 3, "optimized"), strategy = prop($$props, "strategy", 3, "fixed"), dir = prop($$props, "dir", 3, "ltr"), style = prop($$props, "style", 19, () => ({})), wrapperId = prop($$props, "wrapperId", 19, useId), customAnchor = prop($$props, "customAnchor", 3, null), tooltip = prop($$props, "tooltip", 3, false);
	const contentState = FloatingContentState.create({
		side: boxWith(() => side()),
		sideOffset: boxWith(() => sideOffset()),
		align: boxWith(() => align()),
		alignOffset: boxWith(() => alignOffset()),
		id: boxWith(() => $$props.id),
		arrowPadding: boxWith(() => arrowPadding()),
		avoidCollisions: boxWith(() => avoidCollisions()),
		collisionBoundary: boxWith(() => collisionBoundary()),
		collisionPadding: boxWith(() => collisionPadding()),
		hideWhenDetached: boxWith(() => hideWhenDetached()),
		onPlaced: boxWith(() => onPlaced()),
		sticky: boxWith(() => sticky()),
		updatePositionStrategy: boxWith(() => updatePositionStrategy()),
		strategy: boxWith(() => strategy()),
		dir: boxWith(() => dir()),
		style: boxWith(() => style()),
		enabled: boxWith(() => $$props.enabled),
		wrapperId: boxWith(() => wrapperId()),
		customAnchor: boxWith(() => customAnchor())
	}, tooltip());
	const mergedProps = user_derived(() => mergeProps(contentState.wrapperProps, { style: { pointerEvents: "auto" } }));
	var fragment = comment();
	snippet(first_child(fragment), () => $$props.content ?? noop, () => ({
		props: contentState.props,
		wrapperProps: get$1(mergedProps)
	}));
	append($$anchor, fragment);
	pop();
}
function Floating_layer_content_static($$anchor, $$props) {
	push($$props, true);
	onMount(() => {
		$$props.onPlaced?.();
	});
	var fragment = comment();
	snippet(first_child(fragment), () => $$props.content ?? noop, () => ({
		props: {},
		wrapperProps: {}
	}));
	append($$anchor, fragment);
	pop();
}
function Popper_content($$anchor, $$props) {
	let isStatic = prop($$props, "isStatic", 3, false), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"content",
		"isStatic",
		"onPlaced"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		Floating_layer_content_static($$anchor$1, {
			get content() {
				return $$props.content;
			},
			get onPlaced() {
				return $$props.onPlaced;
			}
		});
	};
	var alternate = ($$anchor$1) => {
		Floating_layer_content($$anchor$1, spread_props({
			get content() {
				return $$props.content;
			},
			get onPlaced() {
				return $$props.onPlaced;
			}
		}, () => restProps));
	};
	if_block(node, ($$render) => {
		if (isStatic()) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
}
var root_1 = from_html(`<!> <!>`, 1);
function Popper_layer_inner($$anchor, $$props) {
	push($$props, true);
	let interactOutsideBehavior = prop($$props, "interactOutsideBehavior", 3, "close"), trapFocus = prop($$props, "trapFocus", 3, true), isValidEvent = prop($$props, "isValidEvent", 3, () => false), customAnchor = prop($$props, "customAnchor", 3, null), isStatic = prop($$props, "isStatic", 3, false), tooltip = prop($$props, "tooltip", 3, false), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"popper",
		"onEscapeKeydown",
		"escapeKeydownBehavior",
		"preventOverflowTextSelection",
		"id",
		"onPointerDown",
		"onPointerUp",
		"side",
		"sideOffset",
		"align",
		"alignOffset",
		"arrowPadding",
		"avoidCollisions",
		"collisionBoundary",
		"collisionPadding",
		"sticky",
		"hideWhenDetached",
		"updatePositionStrategy",
		"strategy",
		"dir",
		"preventScroll",
		"wrapperId",
		"style",
		"onPlaced",
		"onInteractOutside",
		"onCloseAutoFocus",
		"onOpenAutoFocus",
		"onFocusOutside",
		"interactOutsideBehavior",
		"loop",
		"trapFocus",
		"isValidEvent",
		"customAnchor",
		"isStatic",
		"enabled",
		"ref",
		"tooltip"
	]);
	{
		const content = ($$anchor$1, $$arg0) => {
			let floatingProps = () => $$arg0?.().props;
			let wrapperProps = () => $$arg0?.().wrapperProps;
			var fragment_1 = root_1();
			var node = first_child(fragment_1);
			var consequent = ($$anchor$2) => {
				Scroll_lock($$anchor$2, { get preventScroll() {
					return $$props.preventScroll;
				} });
			};
			var alternate = ($$anchor$2) => {
				var fragment_3 = comment();
				var node_1 = first_child(fragment_3);
				var consequent_1 = ($$anchor$3) => {
					Scroll_lock($$anchor$3, { get preventScroll() {
						return $$props.preventScroll;
					} });
				};
				if_block(node_1, ($$render) => {
					if (!$$props.forceMount) $$render(consequent_1);
				}, true);
				append($$anchor$2, fragment_3);
			};
			if_block(node, ($$render) => {
				if ($$props.forceMount && $$props.enabled) $$render(consequent);
				else $$render(alternate, false);
			});
			var node_2 = sibling(node, 2);
			{
				const focusScope = ($$anchor$2, $$arg0$1) => {
					let focusScopeProps = () => $$arg0$1?.().props;
					Escape_layer($$anchor$2, {
						get onEscapeKeydown() {
							return $$props.onEscapeKeydown;
						},
						get escapeKeydownBehavior() {
							return $$props.escapeKeydownBehavior;
						},
						get enabled() {
							return $$props.enabled;
						},
						get ref() {
							return $$props.ref;
						},
						children: ($$anchor$3, $$slotProps) => {
							{
								const children = ($$anchor$4, $$arg0$2) => {
									let dismissibleProps = () => $$arg0$2?.().props;
									Text_selection_layer($$anchor$4, {
										get id() {
											return $$props.id;
										},
										get preventOverflowTextSelection() {
											return $$props.preventOverflowTextSelection;
										},
										get onPointerDown() {
											return $$props.onPointerDown;
										},
										get onPointerUp() {
											return $$props.onPointerUp;
										},
										get enabled() {
											return $$props.enabled;
										},
										get ref() {
											return $$props.ref;
										},
										children: ($$anchor$5, $$slotProps$1) => {
											var fragment_8 = comment();
											var node_3 = first_child(fragment_8);
											{
												let $0 = user_derived(() => ({
													props: mergeProps(restProps, floatingProps(), dismissibleProps(), focusScopeProps(), { style: { pointerEvents: "auto" } }),
													wrapperProps: wrapperProps()
												}));
												snippet(node_3, () => $$props.popper ?? noop, () => get$1($0));
											}
											append($$anchor$5, fragment_8);
										},
										$$slots: { default: true }
									});
								};
								Dismissible_layer($$anchor$3, {
									get id() {
										return $$props.id;
									},
									get onInteractOutside() {
										return $$props.onInteractOutside;
									},
									get onFocusOutside() {
										return $$props.onFocusOutside;
									},
									get interactOutsideBehavior() {
										return interactOutsideBehavior();
									},
									get isValidEvent() {
										return isValidEvent();
									},
									get enabled() {
										return $$props.enabled;
									},
									get ref() {
										return $$props.ref;
									},
									children,
									$$slots: { default: true }
								});
							}
						},
						$$slots: { default: true }
					});
				};
				Focus_scope(node_2, {
					get onOpenAutoFocus() {
						return $$props.onOpenAutoFocus;
					},
					get onCloseAutoFocus() {
						return $$props.onCloseAutoFocus;
					},
					get loop() {
						return $$props.loop;
					},
					get enabled() {
						return $$props.enabled;
					},
					get trapFocus() {
						return trapFocus();
					},
					get forceMount() {
						return $$props.forceMount;
					},
					get ref() {
						return $$props.ref;
					},
					focusScope,
					$$slots: { focusScope: true }
				});
			}
			append($$anchor$1, fragment_1);
		};
		Popper_content($$anchor, {
			get isStatic() {
				return isStatic();
			},
			get id() {
				return $$props.id;
			},
			get side() {
				return $$props.side;
			},
			get sideOffset() {
				return $$props.sideOffset;
			},
			get align() {
				return $$props.align;
			},
			get alignOffset() {
				return $$props.alignOffset;
			},
			get arrowPadding() {
				return $$props.arrowPadding;
			},
			get avoidCollisions() {
				return $$props.avoidCollisions;
			},
			get collisionBoundary() {
				return $$props.collisionBoundary;
			},
			get collisionPadding() {
				return $$props.collisionPadding;
			},
			get sticky() {
				return $$props.sticky;
			},
			get hideWhenDetached() {
				return $$props.hideWhenDetached;
			},
			get updatePositionStrategy() {
				return $$props.updatePositionStrategy;
			},
			get strategy() {
				return $$props.strategy;
			},
			get dir() {
				return $$props.dir;
			},
			get wrapperId() {
				return $$props.wrapperId;
			},
			get style() {
				return $$props.style;
			},
			get onPlaced() {
				return $$props.onPlaced;
			},
			get customAnchor() {
				return customAnchor();
			},
			get enabled() {
				return $$props.enabled;
			},
			get tooltip() {
				return tooltip();
			},
			content,
			$$slots: { content: true }
		});
	}
	pop();
}
function Popper_layer($$anchor, $$props) {
	let interactOutsideBehavior = prop($$props, "interactOutsideBehavior", 3, "close"), trapFocus = prop($$props, "trapFocus", 3, true), isValidEvent = prop($$props, "isValidEvent", 3, () => false), customAnchor = prop($$props, "customAnchor", 3, null), isStatic = prop($$props, "isStatic", 3, false), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"popper",
		"open",
		"onEscapeKeydown",
		"escapeKeydownBehavior",
		"preventOverflowTextSelection",
		"id",
		"onPointerDown",
		"onPointerUp",
		"side",
		"sideOffset",
		"align",
		"alignOffset",
		"arrowPadding",
		"avoidCollisions",
		"collisionBoundary",
		"collisionPadding",
		"sticky",
		"hideWhenDetached",
		"updatePositionStrategy",
		"strategy",
		"dir",
		"preventScroll",
		"wrapperId",
		"style",
		"onPlaced",
		"onInteractOutside",
		"onCloseAutoFocus",
		"onOpenAutoFocus",
		"onFocusOutside",
		"interactOutsideBehavior",
		"loop",
		"trapFocus",
		"isValidEvent",
		"customAnchor",
		"isStatic",
		"ref",
		"shouldRender"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		Popper_layer_inner($$anchor$1, spread_props({
			get popper() {
				return $$props.popper;
			},
			get onEscapeKeydown() {
				return $$props.onEscapeKeydown;
			},
			get escapeKeydownBehavior() {
				return $$props.escapeKeydownBehavior;
			},
			get preventOverflowTextSelection() {
				return $$props.preventOverflowTextSelection;
			},
			get id() {
				return $$props.id;
			},
			get onPointerDown() {
				return $$props.onPointerDown;
			},
			get onPointerUp() {
				return $$props.onPointerUp;
			},
			get side() {
				return $$props.side;
			},
			get sideOffset() {
				return $$props.sideOffset;
			},
			get align() {
				return $$props.align;
			},
			get alignOffset() {
				return $$props.alignOffset;
			},
			get arrowPadding() {
				return $$props.arrowPadding;
			},
			get avoidCollisions() {
				return $$props.avoidCollisions;
			},
			get collisionBoundary() {
				return $$props.collisionBoundary;
			},
			get collisionPadding() {
				return $$props.collisionPadding;
			},
			get sticky() {
				return $$props.sticky;
			},
			get hideWhenDetached() {
				return $$props.hideWhenDetached;
			},
			get updatePositionStrategy() {
				return $$props.updatePositionStrategy;
			},
			get strategy() {
				return $$props.strategy;
			},
			get dir() {
				return $$props.dir;
			},
			get preventScroll() {
				return $$props.preventScroll;
			},
			get wrapperId() {
				return $$props.wrapperId;
			},
			get style() {
				return $$props.style;
			},
			get onPlaced() {
				return $$props.onPlaced;
			},
			get customAnchor() {
				return customAnchor();
			},
			get isStatic() {
				return isStatic();
			},
			get enabled() {
				return $$props.open;
			},
			get onInteractOutside() {
				return $$props.onInteractOutside;
			},
			get onCloseAutoFocus() {
				return $$props.onCloseAutoFocus;
			},
			get onOpenAutoFocus() {
				return $$props.onOpenAutoFocus;
			},
			get interactOutsideBehavior() {
				return interactOutsideBehavior();
			},
			get loop() {
				return $$props.loop;
			},
			get trapFocus() {
				return trapFocus();
			},
			get isValidEvent() {
				return isValidEvent();
			},
			get onFocusOutside() {
				return $$props.onFocusOutside;
			},
			forceMount: false,
			get ref() {
				return $$props.ref;
			}
		}, () => restProps));
	};
	if_block(node, ($$render) => {
		if ($$props.shouldRender) $$render(consequent);
	});
	append($$anchor, fragment);
}
function Popper_layer_force_mount($$anchor, $$props) {
	let interactOutsideBehavior = prop($$props, "interactOutsideBehavior", 3, "close"), trapFocus = prop($$props, "trapFocus", 3, true), isValidEvent = prop($$props, "isValidEvent", 3, () => false), customAnchor = prop($$props, "customAnchor", 3, null), isStatic = prop($$props, "isStatic", 3, false), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"popper",
		"onEscapeKeydown",
		"escapeKeydownBehavior",
		"preventOverflowTextSelection",
		"id",
		"onPointerDown",
		"onPointerUp",
		"side",
		"sideOffset",
		"align",
		"alignOffset",
		"arrowPadding",
		"avoidCollisions",
		"collisionBoundary",
		"collisionPadding",
		"sticky",
		"hideWhenDetached",
		"updatePositionStrategy",
		"strategy",
		"dir",
		"preventScroll",
		"wrapperId",
		"style",
		"onPlaced",
		"onInteractOutside",
		"onCloseAutoFocus",
		"onOpenAutoFocus",
		"onFocusOutside",
		"interactOutsideBehavior",
		"loop",
		"trapFocus",
		"isValidEvent",
		"customAnchor",
		"isStatic",
		"enabled"
	]);
	Popper_layer_inner($$anchor, spread_props({
		get popper() {
			return $$props.popper;
		},
		get onEscapeKeydown() {
			return $$props.onEscapeKeydown;
		},
		get escapeKeydownBehavior() {
			return $$props.escapeKeydownBehavior;
		},
		get preventOverflowTextSelection() {
			return $$props.preventOverflowTextSelection;
		},
		get id() {
			return $$props.id;
		},
		get onPointerDown() {
			return $$props.onPointerDown;
		},
		get onPointerUp() {
			return $$props.onPointerUp;
		},
		get side() {
			return $$props.side;
		},
		get sideOffset() {
			return $$props.sideOffset;
		},
		get align() {
			return $$props.align;
		},
		get alignOffset() {
			return $$props.alignOffset;
		},
		get arrowPadding() {
			return $$props.arrowPadding;
		},
		get avoidCollisions() {
			return $$props.avoidCollisions;
		},
		get collisionBoundary() {
			return $$props.collisionBoundary;
		},
		get collisionPadding() {
			return $$props.collisionPadding;
		},
		get sticky() {
			return $$props.sticky;
		},
		get hideWhenDetached() {
			return $$props.hideWhenDetached;
		},
		get updatePositionStrategy() {
			return $$props.updatePositionStrategy;
		},
		get strategy() {
			return $$props.strategy;
		},
		get dir() {
			return $$props.dir;
		},
		get preventScroll() {
			return $$props.preventScroll;
		},
		get wrapperId() {
			return $$props.wrapperId;
		},
		get style() {
			return $$props.style;
		},
		get onPlaced() {
			return $$props.onPlaced;
		},
		get customAnchor() {
			return customAnchor();
		},
		get isStatic() {
			return isStatic();
		},
		get enabled() {
			return $$props.enabled;
		},
		get onInteractOutside() {
			return $$props.onInteractOutside;
		},
		get onCloseAutoFocus() {
			return $$props.onCloseAutoFocus;
		},
		get onOpenAutoFocus() {
			return $$props.onOpenAutoFocus;
		},
		get interactOutsideBehavior() {
			return interactOutsideBehavior();
		},
		get loop() {
			return $$props.loop;
		},
		get trapFocus() {
			return trapFocus();
		},
		get isValidEvent() {
			return isValidEvent();
		},
		get onFocusOutside() {
			return $$props.onFocusOutside;
		}
	}, () => restProps, { forceMount: true }));
}
export { getFloatingContentCSSVars as a, Floating_layer as i, Popper_layer as n, Floating_layer_anchor as r, Popper_layer_force_mount as t };
