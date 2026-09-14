import { f as dpa } from "./BIEFGHhw.js";
import { n as lang } from "./cJwMBL5_.js";
var FieldTypes = {
	_DP_INPUT_: 1,
	_DP_FIXED_: 2,
	_DP_PRICE_: 3,
	_DP_TEXT_: 4,
	_DP_DATE_: 5,
	_DP_IMAGE_: 6,
	_DP_PHP_: 7,
	_DP_DROPDOWN_: 8,
	_DP_CHECKBOX_: 9,
	_DP_FILE_: 10,
	_DP_SLIDER_: 11,
	_DP_THUMBNAILS_: 12,
	_DP_TEXTAREA_: 13,
	_DP_FEATURE_: 14,
	_DP_DIVIDER_: 15,
	_DP_RADIO_: 16,
	_DP_COLORPICKER_: 17,
	_DP_HTML_: 18,
	_DP_ERROR_: 19,
	_DP_SWITCH_: 20,
	_DP_CUSTOM_: 21,
	_DP_PREVIEW_: 22,
	_DP_COUNTRY_: 23,
	_DP_FONT_: 24
};
var FieldConfig = new Map([
	[FieldTypes._DP_INPUT_, {
		name: true,
		label: true,
		value: true,
		settings: true,
		options: false,
		text: false,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_FIXED_, {
		name: true,
		label: true,
		value: true,
		settings: false,
		options: false,
		text: false,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_PRICE_, {
		name: true,
		label: true,
		value: true,
		settings: false,
		options: false,
		text: false,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_TEXT_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: false,
		text: true,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_DATE_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: false,
		text: true,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_IMAGE_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: false,
		text: false,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_PHP_, {
		name: true,
		label: true,
		value: true,
		settings: false,
		options: false,
		text: false,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_DROPDOWN_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: true,
		text: false,
		secondary: true,
		list: true
	}],
	[FieldTypes._DP_CHECKBOX_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: false,
		text: false,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_SWITCH_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: false,
		text: false,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_FILE_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: false,
		text: false,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_SLIDER_, {
		name: true,
		label: true,
		value: true,
		settings: true,
		options: false,
		text: false,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_THUMBNAILS_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: true,
		text: false,
		secondary: true,
		list: true
	}],
	[FieldTypes._DP_TEXTAREA_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: false,
		text: true,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_FEATURE_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: false,
		text: true,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_DIVIDER_, {
		name: true,
		label: false,
		value: false,
		settings: false,
		options: false,
		text: false,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_RADIO_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: true,
		text: false,
		secondary: true,
		list: true
	}],
	[FieldTypes._DP_COLORPICKER_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: false,
		text: true,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_HTML_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: false,
		text: true,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_ERROR_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: false,
		text: true,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_CUSTOM_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: false,
		text: false,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_PREVIEW_, {
		name: true,
		label: false,
		value: true,
		settings: false,
		options: true,
		text: false,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_COUNTRY_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: false,
		text: false,
		secondary: false,
		list: false
	}],
	[FieldTypes._DP_FONT_, {
		name: true,
		label: true,
		value: false,
		settings: true,
		options: true,
		text: false,
		secondary: true,
		list: false
	}]
]);
function fallback(strings) {
	if (!strings[lang.value]) return strings[dpa.id_default_lang];
}
export { FieldConfig as n, FieldTypes as r, fallback as t };
