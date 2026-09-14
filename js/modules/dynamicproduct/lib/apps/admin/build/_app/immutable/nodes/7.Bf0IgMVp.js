import { B as html, Ct as set, D as set_attribute, E as remove_input_defaults, Ft as push, G as if_block, Ht as next, I as transition, L as component, M as clsx, N as action, O as set_value, Ot as user_derived, Pt as pop, R as snippet, Tt as state, Ut as reset, V as each, W as key, X as comment, Y as append, Z as from_html, Zt as __exportAll, bt as sibling, c as spread_props, ct as tick, d as store_mutate, et as text, l as setup_stores, lt as untrack, ot as get, pt as template_effect, q as set_text, r as onMount, u as store_get, vt as child, xt as proxy, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import { a as goto } from "../chunks/D365qDux.js";
import { i as superForm, n as superValidate, r as defaults, t as valibot } from "../chunks/CPdJ2mnA.js";
import "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { a as form_action, f as dpa, n as buttonVariants, o as layout_load, r as cn, t as Button } from "../chunks/BIEFGHhw.js";
import { r as url } from "../chunks/Crb1phnD.js";
import { n as toast } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import { t as Checkbox } from "../chunks/CX3fpb_g.js";
import { a as Command_empty, i as Command_group, n as Command_input, o as Command, r as Command_item, t as Command_list } from "../chunks/CdsT4L5B.js";
import { a as Dropdown_menu_item, n as Root, o as Dropdown_menu_content, r as Trigger, t as Group } from "../chunks/T79hDoyY.js";
import { i as Popover_content, n as Root$1, r as Trigger$1 } from "../chunks/CCOnoN-X.js";
import { t as Label } from "../chunks/ClKKfzS1.js";
import { a as Card_content, n as Card_header, o as Card, r as Card_footer, t as Card_title } from "../chunks/Bpx6gt8W.js";
import { t as LocalStore } from "../chunks/C4w9vuey.js";
import { n as lang } from "../chunks/cJwMBL5_.js";
import "../chunks/CgH3Vt0F.js";
import { n as Alert_description, r as Alert, t as Alert_title } from "../chunks/OMr53o_L.js";
import { _ as transform, f as picklist, g as string, i as check, l as number, m as record, p as pipe, r as boolean, s as minLength, t as any, u as object } from "../chunks/Da0rmiev.js";
import { t as current_form } from "../chunks/BD21p-7F.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import "../chunks/Bc1vuzVu.js";
import { n as obj } from "../chunks/C961kT60.js";
import { a as Table_cell, i as Table_footer, n as Table_header, o as Table_body, r as Table_head, s as Table, t as Table_row } from "../chunks/fQ7Z9iZC.js";
import { t as sort } from "../chunks/Bz4g0JZD.js";
import { a as Form_label, i as Form_field_errors, n as Form_button, r as Form_field, t as Control } from "../chunks/C9E5Z7Ag.js";
import "../chunks/GxWY6lrD.js";
import { t as sortable } from "../chunks/cJTe3rpq.js";
import { t as Input } from "../chunks/D2YUxW8P.js";
import { n as FieldConfig, r as FieldTypes, t as fallback } from "../chunks/DpBFUaMS.js";
import { n as submitOnEnter, t as navigate } from "../chunks/CqWKmQZR.js";
import { n as sanitizeFieldName, t as generateFieldLabel } from "../chunks/BvgdwN5z.js";
import { n as kbd } from "../chunks/D4gdWmeW.js";
import { t as fade } from "../chunks/XggUl40U.js";
import { n as fields_filter, t as FieldsFilter } from "../chunks/B8OVl6Sc.js";
var functions = [
	"ABS",
	"ACCRINT",
	"ACCRINTM",
	"ACOS",
	"ACOSH",
	"ACOT",
	"ACOTH",
	"AGGREGATE",
	"ADDRESS",
	"AMORDEGRC",
	"AMORLINC",
	"AND",
	"ARABIC",
	"AREAS",
	"ASC",
	"ASIN",
	"ASINH",
	"ATAN",
	"ATAN2",
	"ATANH",
	"AVEDEV",
	"AVERAGE",
	"AVERAGEA",
	"AVERAGEIF",
	"AVERAGEIFS",
	"BAHTTEXT",
	"BASE",
	"BESSELI",
	"BESSELJ",
	"BESSELK",
	"BESSELY",
	"BETADIST",
	"BETA.DIST",
	"BETAINV",
	"BETA.INV",
	"BIN2DEC",
	"BIN2HEX",
	"BIN2OCT",
	"BINOMDIST",
	"BINOM.DIST",
	"BINOM.DIST.RANGE",
	"BINOM.INV",
	"BITAND",
	"BITLSHIFT",
	"BITOR",
	"BITRSHIFT",
	"BITXOR",
	"CALL",
	"CEILING",
	"CEILING.MATH",
	"CEILING.PRECISE",
	"CELL",
	"CHAR",
	"CHIDIST",
	"CHIINV",
	"CHITEST",
	"CHISQ.DIST",
	"CHISQ.DIST.RT",
	"CHISQ.INV",
	"CHISQ.INV.RT",
	"CHISQ.TEST",
	"CHOOSE",
	"CLEAN",
	"CODE",
	"COLUMN",
	"COLUMNS",
	"COMBIN",
	"COMBINA",
	"COMPLEX",
	"CONCAT",
	"CONCATENATE",
	"CONFIDENCE",
	"CONFIDENCE.NORM",
	"CONFIDENCE.T",
	"CONVERT",
	"CORREL",
	"COS",
	"COSH",
	"COT",
	"COTH",
	"COUNT",
	"COUNTA",
	"COUNTBLANK",
	"COUNTIF",
	"COUNTIFS",
	"COUPDAYBS",
	"COUPDAYS",
	"COUPDAYSNC",
	"COUPNCD",
	"COUPNUM",
	"COUPPCD",
	"COVAR",
	"COVARIANCE.P",
	"COVARIANCE.S",
	"CRITBINOM",
	"CSC",
	"CSCH",
	"CUBEKPIMEMBER",
	"CUBEMEMBER",
	"CUBEMEMBERPROPERTY",
	"CUBERANKEDMEMBER",
	"CUBESET",
	"CUBESETCOUNT",
	"CUBEVALUE",
	"CUMIPMT",
	"CUMPRINC",
	"DATE",
	"DATEDIF",
	"DATEVALUE",
	"DAVERAGE",
	"DAY",
	"DAYS",
	"DAYS360",
	"DB",
	"DBCS",
	"DCOUNT",
	"DCOUNTA",
	"DDB",
	"DEC2BIN",
	"DEC2HEX",
	"DEC2OCT",
	"DECIMAL",
	"DEGREES",
	"DELTA",
	"DEVSQ",
	"DGET",
	"DISC",
	"DMAX",
	"DMIN",
	"DOLLAR",
	"DOLLARDE",
	"DOLLARFR",
	"DPRODUCT",
	"DSTDEV",
	"DSTDEVP",
	"DSUM",
	"DURATION",
	"DVAR",
	"DVARP",
	"EDATE",
	"EFFECT",
	"ENCODEURL",
	"EOMONTH",
	"ERF",
	"ERF.PRECISE",
	"ERFC",
	"ERFC.PRECISE",
	"ERROR.TYPE",
	"EUROCONVERT",
	"EVEN",
	"EXACT",
	"EXP",
	"EXPON.DIST",
	"EXPONDIST",
	"FACT",
	"FACTDOUBLE",
	"FALSE|0",
	"F.DIST",
	"FDIST",
	"F.DIST.RT",
	"FILTERXML",
	"FIND",
	"FINDB",
	"F.INV",
	"F.INV.RT",
	"FINV",
	"FISHER",
	"FISHERINV",
	"FIXED",
	"FLOOR",
	"FLOOR.MATH",
	"FLOOR.PRECISE",
	"FORECAST",
	"FORECAST.ETS",
	"FORECAST.ETS.CONFINT",
	"FORECAST.ETS.SEASONALITY",
	"FORECAST.ETS.STAT",
	"FORECAST.LINEAR",
	"FORMULATEXT",
	"FREQUENCY",
	"F.TEST",
	"FTEST",
	"FV",
	"FVSCHEDULE",
	"GAMMA",
	"GAMMA.DIST",
	"GAMMADIST",
	"GAMMA.INV",
	"GAMMAINV",
	"GAMMALN",
	"GAMMALN.PRECISE",
	"GAUSS",
	"GCD",
	"GEOMEAN",
	"GESTEP",
	"GETPIVOTDATA",
	"GROWTH",
	"HARMEAN",
	"HEX2BIN",
	"HEX2DEC",
	"HEX2OCT",
	"HLOOKUP",
	"HOUR",
	"HYPERLINK",
	"HYPGEOM.DIST",
	"HYPGEOMDIST",
	"IF",
	"IFERROR",
	"IFNA",
	"IFS",
	"IMABS",
	"IMAGINARY",
	"IMARGUMENT",
	"IMCONJUGATE",
	"IMCOS",
	"IMCOSH",
	"IMCOT",
	"IMCSC",
	"IMCSCH",
	"IMDIV",
	"IMEXP",
	"IMLN",
	"IMLOG10",
	"IMLOG2",
	"IMPOWER",
	"IMPRODUCT",
	"IMREAL",
	"IMSEC",
	"IMSECH",
	"IMSIN",
	"IMSINH",
	"IMSQRT",
	"IMSUB",
	"IMSUM",
	"IMTAN",
	"INDEX",
	"INDIRECT",
	"INFO",
	"INT",
	"INTERCEPT",
	"INTRATE",
	"IPMT",
	"IRR",
	"ISBLANK",
	"ISERR",
	"ISERROR",
	"ISEVEN",
	"ISFORMULA",
	"ISLOGICAL",
	"ISNA",
	"ISNONTEXT",
	"ISNUMBER",
	"ISODD",
	"ISREF",
	"ISTEXT",
	"ISO.CEILING",
	"ISOWEEKNUM",
	"ISPMT",
	"JIS",
	"KURT",
	"LARGE",
	"LCM",
	"LEFT",
	"LEFTB",
	"LEN",
	"LENB",
	"LINEST",
	"LN",
	"LOG",
	"LOG10",
	"LOGEST",
	"LOGINV",
	"LOGNORM.DIST",
	"LOGNORMDIST",
	"LOGNORM.INV",
	"LOOKUP",
	"LOWER",
	"MATCH",
	"MAX",
	"MAXA",
	"MAXIFS",
	"MDETERM",
	"MDURATION",
	"MEDIAN",
	"MID",
	"MIDBs",
	"MIN",
	"MINIFS",
	"MINA",
	"MINUTE",
	"MINVERSE",
	"MIRR",
	"MMULT",
	"MOD",
	"MODE",
	"MODE.MULT",
	"MODE.SNGL",
	"MONTH",
	"MROUND",
	"MULTINOMIAL",
	"MUNIT",
	"N",
	"NA",
	"NEGBINOM.DIST",
	"NEGBINOMDIST",
	"NETWORKDAYS",
	"NETWORKDAYS.INTL",
	"NOMINAL",
	"NORM.DIST",
	"NORMDIST",
	"NORMINV",
	"NORM.INV",
	"NORM.S.DIST",
	"NORMSDIST",
	"NORM.S.INV",
	"NORMSINV",
	"NOT",
	"NOW",
	"NPER",
	"NPV",
	"NUMBERVALUE",
	"OCT2BIN",
	"OCT2DEC",
	"OCT2HEX",
	"ODD",
	"ODDFPRICE",
	"ODDFYIELD",
	"ODDLPRICE",
	"ODDLYIELD",
	"OFFSET",
	"OR",
	"PDURATION",
	"PEARSON",
	"PERCENTILE.EXC",
	"PERCENTILE.INC",
	"PERCENTILE",
	"PERCENTRANK.EXC",
	"PERCENTRANK.INC",
	"PERCENTRANK",
	"PERMUT",
	"PERMUTATIONA",
	"PHI",
	"PHONETIC",
	"PI",
	"PMT",
	"POISSON.DIST",
	"POISSON",
	"POWER",
	"PPMT",
	"PRICE",
	"PRICEDISC",
	"PRICEMAT",
	"PROB",
	"PRODUCT",
	"PROPER",
	"PV",
	"QUARTILE",
	"QUARTILE.EXC",
	"QUARTILE.INC",
	"QUOTIENT",
	"RADIANS",
	"RAND",
	"RANDBETWEEN",
	"RANK.AVG",
	"RANK.EQ",
	"RANK",
	"RATE",
	"RECEIVED",
	"REGISTER.ID",
	"REPLACE",
	"REPLACEB",
	"REPT",
	"RIGHT",
	"RIGHTB",
	"ROMAN",
	"ROUND",
	"ROUNDDOWN",
	"ROUNDUP",
	"ROW",
	"ROWS",
	"RRI",
	"RSQ",
	"RTD",
	"SEARCH",
	"SEARCHB",
	"SEC",
	"SECH",
	"SECOND",
	"SERIESSUM",
	"SHEET",
	"SHEETS",
	"SIGN",
	"SIN",
	"SINH",
	"SKEW",
	"SKEW.P",
	"SLN",
	"SLOPE",
	"SMALL",
	"SQL.REQUEST",
	"SQRT",
	"SQRTPI",
	"STANDARDIZE",
	"STDEV",
	"STDEV.P",
	"STDEV.S",
	"STDEVA",
	"STDEVP",
	"STDEVPA",
	"STEYX",
	"SUBSTITUTE",
	"SUBTOTAL",
	"SUM",
	"SUMIF",
	"SUMIFS",
	"SUMPRODUCT",
	"SUMSQ",
	"SUMX2MY2",
	"SUMX2PY2",
	"SUMXMY2",
	"SWITCH",
	"SYD",
	"T",
	"TAN",
	"TANH",
	"TBILLEQ",
	"TBILLPRICE",
	"TBILLYIELD",
	"T.DIST",
	"T.DIST.2T",
	"T.DIST.RT",
	"TDIST",
	"TEXT",
	"TEXTJOIN",
	"TIME",
	"TIMEVALUE",
	"T.INV",
	"T.INV.2T",
	"TINV",
	"TODAY",
	"TRANSPOSE",
	"TREND",
	"TRIM",
	"TRIMMEAN",
	"TRUE|0",
	"TRUNC",
	"T.TEST",
	"TTEST",
	"TYPE",
	"UNICHAR",
	"UNICODE",
	"UPPER",
	"VALUE",
	"VAR",
	"VAR.P",
	"VAR.S",
	"VARA",
	"VARP",
	"VARPA",
	"VDB",
	"VLOOKUP",
	"WEBSERVICE",
	"WEEKDAY",
	"WEEKNUM",
	"WEIBULL",
	"WEIBULL.DIST",
	"WORKDAY",
	"WORKDAY.INTL",
	"XIRR",
	"XNPV",
	"XOR",
	"YEAR",
	"YEARFRAC",
	"YIELD",
	"YIELDDISC",
	"YIELDMAT",
	"Z.TEST",
	"ZTEST"
];
function isReserved(name) {
	if (!name) return false;
	return functions.includes(name.toUpperCase());
}
const FieldSchema = object({
	id: number(),
	id_product: number(),
	id_group: number(),
	id_step: number(),
	type: number(),
	name: pipe(string(), check((name) => !isReserved(name), `${_("is a reserved field name")}`)),
	init: pipe(any(), transform((val) => Number(val)), number(_("The initial value must be a number"))),
	active: number(),
	image: string(),
	label: record(string(), string(_("The field label cannot be null"))),
	value: record(string(), string(_("The field value cannot be null"))),
	position: number(),
	linked: number(),
	favorite: number(),
	common: number()
});
const FieldsFormSchema = object({
	action_name: picklist([
		"",
		"update",
		"configure",
		"options",
		"add",
		"toggle",
		"delete",
		"duplicate",
		"favorite",
		"common",
		"insert",
		"delete-fields"
	]),
	action_value: string(),
	check_all: boolean(),
	checked: record(string(), boolean()),
	fields: record(string(), FieldSchema)
});
var _layout_exports = /* @__PURE__ */ __exportAll({ load: () => load }, 1);
const load = async (event) => {
	const { fields, field_types, favorite_fields, common_fields } = await layout_load(event, "/product/fields");
	return {
		form: await superValidate({
			check_all: false,
			checked: Object.fromEntries(Object.keys(fields).map((k) => [k, false])),
			fields: obj(fields)
		}, valibot(FieldsFormSchema, { errorMode: "ignore" })),
		field_types,
		favorite_fields,
		common_fields
	};
};
var root_9$1 = from_html(` <!>`, 1);
var root_7$1 = from_html(`<!> <!> <input hidden=""/>`, 1);
var root_15$1 = from_html(` <!>`, 1);
var root_11$1 = from_html(`<!> <!> <!>`, 1);
var root_6$2 = from_html(`<!> <!>`, 1);
var root_5$2 = from_html(`<!> <!>`, 1);
var root_19$2 = from_html(`<!> `, 1);
var root_1$3 = from_html(`<!> <!> <!>`, 1);
var root$2 = from_html(`<form><!></form>`);
function FavoriteFields($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const schema = object({ id_field: pipe(string(), minLength(1, _("Please pick a field from the list"))) });
	const superform = superForm(defaults(valibot(schema)), {
		id: "favorite-fields",
		SPA: true,
		validators: valibot(schema),
		async onUpdate({ form: form$1 }) {
			if (form$1.valid) {
				await form_action({
					route: page.route.id,
					action: "load_favorite",
					data: form$1.data
				});
				toast.success(_("Favorite field loaded successfully"));
			}
		}
	});
	const { form, enhance, submitting } = superform;
	let open = state(false);
	function closeAndFocusTrigger() {
		set(open, false);
		tick().then(() => {
			document.getElementById("favorite-fields")?.focus();
		});
	}
	const by_value = Object.fromEntries($$props.fields.map((f) => [f.id.toString(), f.label]));
	function filter(value, search) {
		return by_value[value]?.toLowerCase().includes(search?.toLowerCase()) ? 1 : 0;
	}
	var form_1 = root$2();
	component(child(form_1), () => Card, ($$anchor$1, Card_Root) => {
		Card_Root($$anchor$1, {
			class: "min-w-[350px]",
			children: ($$anchor$2, $$slotProps) => {
				var fragment = root_1$3();
				var node_1 = first_child(fragment);
				component(node_1, () => Card_header, ($$anchor$3, Card_Header) => {
					Card_Header($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_1 = comment();
							component(first_child(fragment_1), () => Card_title, ($$anchor$5, Card_Title) => {
								Card_Title($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text$1 = text();
										template_effect(($0) => set_text(text$1, $0), [() => _("Load a field from favorites")]);
										append($$anchor$6, text$1);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_1);
						},
						$$slots: { default: true }
					});
				});
				var node_3 = sibling(node_1, 2);
				component(node_3, () => Card_content, ($$anchor$3, Card_Content) => {
					Card_Content($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_3 = comment();
							component(first_child(fragment_3), () => Form_field, ($$anchor$5, Form_Field) => {
								Form_Field($$anchor$5, {
									get form() {
										return superform;
									},
									name: "id_field",
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_4 = root_5$2();
										var node_5 = first_child(fragment_4);
										component(node_5, () => Root$1, ($$anchor$7, Popover_Root) => {
											Popover_Root($$anchor$7, {
												get open() {
													return get(open);
												},
												set open($$value) {
													set(open, $$value, true);
												},
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_5 = root_6$2();
													var node_6 = first_child(fragment_5);
													{
														const children = ($$anchor$9, $$arg0) => {
															let props = () => $$arg0?.().props;
															var fragment_6 = root_7$1();
															var node_7 = first_child(fragment_6);
															component(node_7, () => Form_label, ($$anchor$10, Form_Label) => {
																Form_Label($$anchor$10, {
																	children: ($$anchor$11, $$slotProps$4) => {
																		next();
																		var text_1 = text();
																		template_effect(($0) => set_text(text_1, $0), [() => _("Field")]);
																		append($$anchor$11, text_1);
																	},
																	$$slots: { default: true }
																});
															});
															var node_8 = sibling(node_7, 2);
															{
																let $0 = user_derived(() => cn(buttonVariants({ variant: "outline" }), "w-[200px] justify-between", !$form().id_field && "text-muted-foreground"));
																component(node_8, () => Trigger$1, ($$anchor$10, Popover_Trigger) => {
																	Popover_Trigger($$anchor$10, spread_props(props, {
																		get class() {
																			return get($0);
																		},
																		role: "combobox",
																		children: ($$anchor$11, $$slotProps$4) => {
																			next();
																			var fragment_8 = root_9$1();
																			var text_2 = first_child(fragment_8);
																			Icon(sibling(text_2), {
																				class: "ml-2 h-4 w-4 shrink-0 opacity-50",
																				icon: "ic:round-keyboard-arrow-down"
																			});
																			template_effect(($0$1) => set_text(text_2, `${$0$1 ?? ""} `), [() => $$props.fields?.find((f) => f.id === +$form().id_field)?.name ?? _("Select a field")]);
																			append($$anchor$11, fragment_8);
																		},
																		$$slots: { default: true }
																	}));
																});
															}
															var input = sibling(node_8, 2);
															remove_input_defaults(input);
															template_effect(() => {
																set_attribute(input, "name", props().name);
																set_value(input, $form().id_field);
															});
															append($$anchor$9, fragment_6);
														};
														component(node_6, () => Control, ($$anchor$9, Form_Control) => {
															Form_Control($$anchor$9, {
																id: "favorite-fields",
																children,
																$$slots: { default: true }
															});
														});
													}
													component(sibling(node_6, 2), () => Popover_content, ($$anchor$9, Popover_Content) => {
														Popover_Content($$anchor$9, {
															class: "min-w-[200px] p-0",
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_9 = comment();
																component(first_child(fragment_9), () => Command, ($$anchor$11, Command_Root) => {
																	Command_Root($$anchor$11, {
																		filter,
																		children: ($$anchor$12, $$slotProps$5) => {
																			var fragment_10 = root_11$1();
																			var node_12 = first_child(fragment_10);
																			{
																				let $0 = user_derived(() => _("Search fields..."));
																				component(node_12, () => Command_input, ($$anchor$13, Command_Input) => {
																					Command_Input($$anchor$13, {
																						autofocus: true,
																						class: "h-9",
																						get placeholder() {
																							return get($0);
																						}
																					});
																				});
																			}
																			var node_13 = sibling(node_12, 2);
																			component(node_13, () => Command_empty, ($$anchor$13, Command_Empty) => {
																				Command_Empty($$anchor$13, {
																					children: ($$anchor$14, $$slotProps$6) => {
																						next();
																						append($$anchor$14, text("No matching fields found."));
																					},
																					$$slots: { default: true }
																				});
																			});
																			component(sibling(node_13, 2), () => Command_group, ($$anchor$13, Command_Group) => {
																				Command_Group($$anchor$13, {
																					children: ($$anchor$14, $$slotProps$6) => {
																						var fragment_11 = comment();
																						each(first_child(fragment_11), 17, () => $$props.fields, ({ id, name }) => id, ($$anchor$15, $$item) => {
																							let id = () => get($$item).id;
																							let name = () => get($$item).name;
																							var fragment_12 = comment();
																							var node_16 = first_child(fragment_12);
																							{
																								let $0 = user_derived(() => id().toString());
																								component(node_16, () => Command_item, ($$anchor$16, Command_Item) => {
																									Command_Item($$anchor$16, {
																										get value() {
																											return get($0);
																										},
																										onSelect: () => {
																											store_mutate(form, untrack($form).id_field = id().toString(), untrack($form));
																											closeAndFocusTrigger();
																										},
																										children: ($$anchor$17, $$slotProps$7) => {
																											next();
																											var fragment_13 = root_15$1();
																											var text_4 = first_child(fragment_13);
																											var node_17 = sibling(text_4);
																											{
																												let $0$1 = user_derived(() => cn("mr-2 size-4", id().toString() !== $form().id_field && "text-transparent"));
																												Icon(node_17, {
																													icon: "ic:check",
																													get class() {
																														return get($0$1);
																													}
																												});
																											}
																											template_effect(() => set_text(text_4, `${name() ?? ""} `));
																											append($$anchor$17, fragment_13);
																										},
																										$$slots: { default: true }
																									});
																								});
																							}
																							append($$anchor$15, fragment_12);
																						}, ($$anchor$15) => {
																							var fragment_14 = comment();
																							component(first_child(fragment_14), () => Command_item, ($$anchor$16, Command_Item_1) => {
																								Command_Item_1($$anchor$16, {
																									value: "0",
																									disabled: true,
																									children: ($$anchor$17, $$slotProps$7) => {
																										next();
																										var text_5 = text();
																										template_effect(($0) => set_text(text_5, $0), [() => _("No favorite fields found")]);
																										append($$anchor$17, text_5);
																									},
																									$$slots: { default: true }
																								});
																							});
																							append($$anchor$15, fragment_14);
																						});
																						append($$anchor$14, fragment_11);
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$12, fragment_10);
																		},
																		$$slots: { default: true }
																	});
																});
																append($$anchor$10, fragment_9);
															},
															$$slots: { default: true }
														});
													});
													append($$anchor$8, fragment_5);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_5, 2), () => Form_field_errors, ($$anchor$7, Form_FieldErrors) => {
											Form_FieldErrors($$anchor$7, {});
										});
										append($$anchor$6, fragment_4);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_3);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_3, 2), () => Card_footer, ($$anchor$3, Card_Footer) => {
					Card_Footer($$anchor$3, {
						class: "flex justify-between",
						children: ($$anchor$4, $$slotProps$1) => {
							Button($$anchor$4, {
								type: "submit",
								children: ($$anchor$5, $$slotProps$2) => {
									var fragment_17 = root_19$2();
									var node_21 = first_child(fragment_17);
									Spinner(node_21, {
										get loading() {
											return $submitting();
										},
										children: ($$anchor$6, $$slotProps$3) => {
											Icon($$anchor$6, { icon: "mdi:database-import" });
										},
										$$slots: { default: true }
									});
									var text_6 = sibling(node_21);
									template_effect(($0) => set_text(text_6, ` ${$0 ?? ""}`), [() => _("Load")]);
									append($$anchor$5, fragment_17);
								},
								$$slots: { default: true }
							});
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment);
			},
			$$slots: { default: true }
		});
	});
	reset(form_1);
	action(form_1, ($$node) => enhance?.($$node));
	append($$anchor, form_1);
	pop();
	$$cleanup();
}
var root_9 = from_html(` <!>`, 1);
var root_7 = from_html(`<!> <!> <input hidden=""/>`, 1);
var root_15 = from_html(` <!>`, 1);
var root_11 = from_html(`<!> <!> <!>`, 1);
var root_6$1 = from_html(`<!> <!>`, 1);
var root_5$1 = from_html(`<!> <!>`, 1);
var root_19$1 = from_html(`<!> `, 1);
var root_1$2 = from_html(`<!> <!> <!>`, 1);
var root$1 = from_html(`<form><!></form>`);
function CommonFields($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const schema = object({ id_field: pipe(string(), minLength(1, _("Please pick a field from the list"))) });
	const superform = superForm(defaults(valibot(schema)), {
		id: "common-fields",
		SPA: true,
		validators: valibot(schema),
		async onUpdate({ form: form$1 }) {
			if (form$1.valid) {
				const res = await form_action({
					route: page.route.id,
					action: "load_common",
					data: form$1.data
				});
				if (res.success) toast.success(_("Common field loaded successfully"));
				else toast.error(res.message);
			}
		}
	});
	const { form, enhance, submitting } = superform;
	let open = state(false);
	function closeAndFocusTrigger() {
		set(open, false);
		tick().then(() => {
			document.getElementById("common-fields")?.focus();
		});
	}
	const by_value = Object.fromEntries($$props.fields.map((f) => [f.id.toString(), f.label]));
	function filter(value, search) {
		return by_value[value]?.toLowerCase().includes(search?.toLowerCase()) ? 1 : 0;
	}
	var form_1 = root$1();
	component(child(form_1), () => Card, ($$anchor$1, Card_Root) => {
		Card_Root($$anchor$1, {
			class: "min-w-[350px]",
			children: ($$anchor$2, $$slotProps) => {
				var fragment = root_1$2();
				var node_1 = first_child(fragment);
				component(node_1, () => Card_header, ($$anchor$3, Card_Header) => {
					Card_Header($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_1 = comment();
							component(first_child(fragment_1), () => Card_title, ($$anchor$5, Card_Title) => {
								Card_Title($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text$1 = text();
										template_effect(($0) => set_text(text$1, $0), [() => _("Load a common field")]);
										append($$anchor$6, text$1);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_1);
						},
						$$slots: { default: true }
					});
				});
				var node_3 = sibling(node_1, 2);
				component(node_3, () => Card_content, ($$anchor$3, Card_Content) => {
					Card_Content($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_3 = comment();
							component(first_child(fragment_3), () => Form_field, ($$anchor$5, Form_Field) => {
								Form_Field($$anchor$5, {
									get form() {
										return superform;
									},
									name: "id_field",
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_4 = root_5$1();
										var node_5 = first_child(fragment_4);
										component(node_5, () => Root$1, ($$anchor$7, Popover_Root) => {
											Popover_Root($$anchor$7, {
												get open() {
													return get(open);
												},
												set open($$value) {
													set(open, $$value, true);
												},
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_5 = root_6$1();
													var node_6 = first_child(fragment_5);
													{
														const children = ($$anchor$9, $$arg0) => {
															let props = () => $$arg0?.().props;
															var fragment_6 = root_7();
															var node_7 = first_child(fragment_6);
															component(node_7, () => Form_label, ($$anchor$10, Form_Label) => {
																Form_Label($$anchor$10, {
																	children: ($$anchor$11, $$slotProps$4) => {
																		next();
																		var text_1 = text();
																		template_effect(($0) => set_text(text_1, $0), [() => _("Field")]);
																		append($$anchor$11, text_1);
																	},
																	$$slots: { default: true }
																});
															});
															var node_8 = sibling(node_7, 2);
															{
																let $0 = user_derived(() => cn(buttonVariants({ variant: "outline" }), "min-w-[200px] justify-between", !$form().id_field && "text-muted-foreground"));
																component(node_8, () => Trigger$1, ($$anchor$10, Popover_Trigger) => {
																	Popover_Trigger($$anchor$10, spread_props(props, {
																		get class() {
																			return get($0);
																		},
																		role: "combobox",
																		children: ($$anchor$11, $$slotProps$4) => {
																			next();
																			var fragment_8 = root_9();
																			var text_2 = first_child(fragment_8);
																			Icon(sibling(text_2), {
																				class: "ml-2 h-4 w-4 shrink-0 opacity-50",
																				icon: "ic:round-keyboard-arrow-down"
																			});
																			template_effect(($0$1) => set_text(text_2, `${$0$1 ?? ""} `), [() => $$props.fields?.find((f) => f.id === +$form().id_field)?.name ?? _("Select a field")]);
																			append($$anchor$11, fragment_8);
																		},
																		$$slots: { default: true }
																	}));
																});
															}
															var input = sibling(node_8, 2);
															remove_input_defaults(input);
															template_effect(() => {
																set_attribute(input, "name", props().name);
																set_value(input, $form().id_field);
															});
															append($$anchor$9, fragment_6);
														};
														component(node_6, () => Control, ($$anchor$9, Form_Control) => {
															Form_Control($$anchor$9, {
																id: "common-fields",
																children,
																$$slots: { default: true }
															});
														});
													}
													component(sibling(node_6, 2), () => Popover_content, ($$anchor$9, Popover_Content) => {
														Popover_Content($$anchor$9, {
															class: "min-w-[200px] p-0",
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_9 = comment();
																component(first_child(fragment_9), () => Command, ($$anchor$11, Command_Root) => {
																	Command_Root($$anchor$11, {
																		filter,
																		children: ($$anchor$12, $$slotProps$5) => {
																			var fragment_10 = root_11();
																			var node_12 = first_child(fragment_10);
																			{
																				let $0 = user_derived(() => _("Search fields..."));
																				component(node_12, () => Command_input, ($$anchor$13, Command_Input) => {
																					Command_Input($$anchor$13, {
																						autofocus: true,
																						class: "h-9",
																						get placeholder() {
																							return get($0);
																						}
																					});
																				});
																			}
																			var node_13 = sibling(node_12, 2);
																			component(node_13, () => Command_empty, ($$anchor$13, Command_Empty) => {
																				Command_Empty($$anchor$13, {
																					children: ($$anchor$14, $$slotProps$6) => {
																						next();
																						append($$anchor$14, text("No matching fields found."));
																					},
																					$$slots: { default: true }
																				});
																			});
																			component(sibling(node_13, 2), () => Command_group, ($$anchor$13, Command_Group) => {
																				Command_Group($$anchor$13, {
																					children: ($$anchor$14, $$slotProps$6) => {
																						var fragment_11 = comment();
																						each(first_child(fragment_11), 17, () => $$props.fields.filter((f) => f.id_product !== $$props.id_product), ({ id, name }) => id, ($$anchor$15, $$item) => {
																							let id = () => get($$item).id;
																							let name = () => get($$item).name;
																							var fragment_12 = comment();
																							var node_16 = first_child(fragment_12);
																							{
																								let $0 = user_derived(() => id().toString());
																								component(node_16, () => Command_item, ($$anchor$16, Command_Item) => {
																									Command_Item($$anchor$16, {
																										"data-testid": "common-field",
																										get value() {
																											return get($0);
																										},
																										onSelect: () => {
																											store_mutate(form, untrack($form).id_field = id().toString(), untrack($form));
																											closeAndFocusTrigger();
																										},
																										children: ($$anchor$17, $$slotProps$7) => {
																											next();
																											var fragment_13 = root_15();
																											var text_4 = first_child(fragment_13);
																											var node_17 = sibling(text_4);
																											{
																												let $0$1 = user_derived(() => cn("mr-2 size-4", id().toString() !== $form().id_field && "text-transparent"));
																												Icon(node_17, {
																													icon: "ic:check",
																													get class() {
																														return get($0$1);
																													}
																												});
																											}
																											template_effect(() => set_text(text_4, `${name() ?? ""} `));
																											append($$anchor$17, fragment_13);
																										},
																										$$slots: { default: true }
																									});
																								});
																							}
																							append($$anchor$15, fragment_12);
																						}, ($$anchor$15) => {
																							var fragment_14 = comment();
																							component(first_child(fragment_14), () => Command_item, ($$anchor$16, Command_Item_1) => {
																								Command_Item_1($$anchor$16, {
																									value: "0",
																									disabled: true,
																									children: ($$anchor$17, $$slotProps$7) => {
																										next();
																										var text_5 = text();
																										template_effect(($0) => set_text(text_5, $0), [() => _("No common fields found")]);
																										append($$anchor$17, text_5);
																									},
																									$$slots: { default: true }
																								});
																							});
																							append($$anchor$15, fragment_14);
																						});
																						append($$anchor$14, fragment_11);
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$12, fragment_10);
																		},
																		$$slots: { default: true }
																	});
																});
																append($$anchor$10, fragment_9);
															},
															$$slots: { default: true }
														});
													});
													append($$anchor$8, fragment_5);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_5, 2), () => Form_field_errors, ($$anchor$7, Form_FieldErrors) => {
											Form_FieldErrors($$anchor$7, {});
										});
										append($$anchor$6, fragment_4);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_3);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_3, 2), () => Card_footer, ($$anchor$3, Card_Footer) => {
					Card_Footer($$anchor$3, {
						class: "flex justify-between",
						children: ($$anchor$4, $$slotProps$1) => {
							Button($$anchor$4, {
								type: "submit",
								"data-testid": "load-common-field",
								children: ($$anchor$5, $$slotProps$2) => {
									var fragment_17 = root_19$1();
									var node_21 = first_child(fragment_17);
									Spinner(node_21, {
										get loading() {
											return $submitting();
										},
										children: ($$anchor$6, $$slotProps$3) => {
											Icon($$anchor$6, { icon: "mdi:database-import" });
										},
										$$slots: { default: true }
									});
									var text_6 = sibling(node_21);
									template_effect(($0) => set_text(text_6, ` ${$0 ?? ""}`), [() => _("Load")]);
									append($$anchor$5, fragment_17);
								},
								$$slots: { default: true }
							});
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment);
			},
			$$slots: { default: true }
		});
	});
	reset(form_1);
	action(form_1, ($$node) => enhance?.($$node));
	append($$anchor, form_1);
	pop();
	$$cleanup();
}
const show_navigation_tip = new LocalStore("show_navigation_tip", "show");
var root_3$1 = from_html(` <!>`, 1);
var root_10 = from_html(`<!> `, 1);
var root_6 = from_html(`<!> <!>`, 1);
var root_5 = from_html(`<!> <!>`, 1);
var root_1$1 = from_html(`<!> <!>`, 1);
function FieldType($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form } = $$props.superform;
	const types = $$props.field_types.map((field_type) => ({
		value: field_type.type.toString(),
		...field_type
	}));
	let open = state(false);
	let triggerRef = state(null);
	function closeAndFocusTrigger() {
		set(open, false);
		tick().then(() => {
			get(triggerRef).focus();
		});
	}
	const by_value = Object.fromEntries(types.map((t) => [t.value, t.label]));
	function filter(value, search) {
		return by_value[value]?.toLowerCase().includes(search?.toLowerCase()) ? 1 : 0;
	}
	var fragment = comment();
	component(first_child(fragment), () => Root$1, ($$anchor$1, Popover_Root) => {
		Popover_Root($$anchor$1, {
			get open() {
				return get(open);
			},
			set open($$value) {
				set(open, $$value, true);
			},
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1$1();
				var node_1 = first_child(fragment_1);
				{
					const child$1 = ($$anchor$3, $$arg0) => {
						let props = () => $$arg0?.().props;
						const selected = user_derived(() => types.find((t) => +t.value === $form().fields[$$props.id].type));
						{
							let $0 = user_derived(() => get(selected)?.color);
							Button($$anchor$3, spread_props({
								variant: "outline",
								class: "w-[200px] justify-between",
								get style() {
									return `color: ${get($0) ?? ""}`;
								}
							}, props, {
								role: "combobox",
								get "aria-expanded"() {
									return get(open);
								},
								children: ($$anchor$4, $$slotProps$1) => {
									next();
									var fragment_3 = root_3$1();
									var text$1 = first_child(fragment_3);
									Icon(sibling(text$1), {
										icon: "ic:round-keyboard-arrow-down",
										class: "ml-2 size-4 shrink-0 opacity-50"
									});
									template_effect(($0$1) => set_text(text$1, `${$0$1 ?? ""} `), [() => get(selected) ? get(selected).label : _("Select a type")]);
									append($$anchor$4, fragment_3);
								},
								$$slots: { default: true }
							}));
						}
					};
					component(node_1, () => Trigger$1, ($$anchor$3, Popover_Trigger) => {
						Popover_Trigger($$anchor$3, {
							get ref() {
								return get(triggerRef);
							},
							set ref($$value) {
								set(triggerRef, $$value, true);
							},
							child: child$1,
							$$slots: { child: true }
						});
					});
				}
				component(sibling(node_1, 2), () => Popover_content, ($$anchor$3, Popover_Content) => {
					Popover_Content($$anchor$3, {
						class: "w-[200px] p-0",
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_4 = comment();
							component(first_child(fragment_4), () => Command, ($$anchor$5, Command_Root) => {
								Command_Root($$anchor$5, {
									filter,
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_5 = root_5();
										var node_5 = first_child(fragment_5);
										{
											let $0 = user_derived(() => _("Search types..."));
											component(node_5, () => Command_input, ($$anchor$7, Command_Input) => {
												Command_Input($$anchor$7, { get placeholder() {
													return get($0);
												} });
											});
										}
										component(sibling(node_5, 2), () => Command_list, ($$anchor$7, Command_List) => {
											Command_List($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_6 = root_6();
													var node_7 = first_child(fragment_6);
													component(node_7, () => Command_empty, ($$anchor$9, Command_Empty) => {
														Command_Empty($$anchor$9, {
															children: ($$anchor$10, $$slotProps$4) => {
																next();
																var text_1 = text();
																template_effect(($0) => set_text(text_1, $0), [() => _("No matching types found.")]);
																append($$anchor$10, text_1);
															},
															$$slots: { default: true }
														});
													});
													component(sibling(node_7, 2), () => Command_group, ($$anchor$9, Command_Group) => {
														Command_Group($$anchor$9, {
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_8 = comment();
																each(first_child(fragment_8), 17, () => types, ({ value, label, color }) => value, ($$anchor$11, $$item) => {
																	let value = () => get($$item).value;
																	let label = () => get($$item).label;
																	let color = () => get($$item).color;
																	var fragment_9 = comment();
																	component(first_child(fragment_9), () => Command_item, ($$anchor$12, Command_Item) => {
																		Command_Item($$anchor$12, {
																			get value() {
																				return value();
																			},
																			get style() {
																				return `color: ${color() ?? ""}`;
																			},
																			class: "cursor-pointer",
																			onSelect: () => {
																				store_mutate(form, untrack($form).fields[$$props.id].type = +value(), untrack($form));
																				closeAndFocusTrigger();
																			},
																			children: ($$anchor$13, $$slotProps$5) => {
																				var fragment_10 = root_10();
																				var node_11 = first_child(fragment_10);
																				{
																					let $0 = user_derived(() => cn("mr-2 size-4", +value() !== $form().fields[$$props.id].type && "text-transparent"));
																					Icon(node_11, {
																						icon: "ic:check",
																						get class() {
																							return get($0);
																						}
																					});
																				}
																				var text_2 = sibling(node_11);
																				template_effect(() => set_text(text_2, ` ${label() ?? ""}`));
																				append($$anchor$13, fragment_10);
																			},
																			$$slots: { default: true }
																		});
																	});
																	append($$anchor$11, fragment_9);
																});
																append($$anchor$10, fragment_8);
															},
															$$slots: { default: true }
														});
													});
													append($$anchor$8, fragment_6);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_5);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_4);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment_1);
			},
			$$slots: { default: true }
		});
	});
	append($$anchor, fragment);
	pop();
	$$cleanup();
}
var root_3 = from_html(`<!> <!> <!> <!> <!> <!>`, 1);
var root_14 = from_html(`<!> <!>`, 1);
var root_23 = from_html(`<div class="col-start-2 col-end-3 row-span-full justify-self-center"><!></div>`);
var root_22 = from_html(`<div class="grid w-fit grid-cols-[1fr_32px] grid-rows-1 items-center"><!> <!></div>`);
var root_25 = from_html(`<div class="col-start-2 col-end-3 row-span-full justify-self-center"><!></div>`);
var root_24 = from_html(`<div class="grid w-fit grid-cols-[1fr_32px] grid-rows-1 items-center"><!> <!></div>`);
var root_40 = from_html(`<!> `, 1);
var root_43 = from_html(`<!> <!>`, 1);
var root_48 = from_html(`<!> <!>`, 1);
var root_53 = from_html(`<!> `, 1);
var root_56 = from_html(`<!> `, 1);
var root_38 = from_html(`<!> <!> <!> <!> <!>`, 1);
var root_35 = from_html(`<!> <!>`, 1);
var root_28 = from_html(`<div class="flex flex-nowrap justify-end gap-1"><!> <!> <!> <!> <!></div>`);
var root_19 = from_html(`<!> <!> <!> <!> <!> <!>`, 1);
var root_62 = from_html(`<!> <!> <!>`, 1);
var root_12 = from_html(`<!> <!>`, 1);
var root_71 = from_html(`<!> `, 1);
var root_73 = from_html(`<!> `, 1);
var root_70 = from_html(`<!> <!>`, 1);
var root_75 = from_html(`<!> `, 1);
var root_77 = from_html(`<!> `, 1);
var root_79 = from_html(`<p class="text-muted-foreground flex flex-wrap items-center gap-2"><!> <!> <!></p>`);
var root_74 = from_html(`<!> <!> <!>`, 1);
var root_69 = from_html(`<div class="flex items-center gap-2"><!></div>`);
var root_1 = from_html(`<!> <!> <!>`, 1);
var root = from_html(`<div class="flex flex-col"><form id="fields-form" method="post"><!></form> <div class="flex flex-wrap gap-4 p-4"><!> <!></div></div> <!>`, 1);
function _layout($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const $errors = () => store_get(errors, "$errors", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	async function submit_form(submitter) {
		const { valid } = await validateForm();
		if (!valid) {
			toast.error(_("Please correct the errors before submitting the form"));
			return;
		}
		const data = {
			action_name: submitter?.getAttribute("name") || "update",
			action_value: submitter?.getAttribute("value") || "",
			check_all: $form().check_all,
			checked: $form().checked,
			fields: Object.fromEntries(Object.values($form().fields).filter((f) => Object.keys($tainted()?.fields ?? {}).includes(f.id.toString())).map((f) => [f.id, f]))
		};
		store_mutate(form, untrack($form).action_name = data.action_name, untrack($form));
		store_mutate(form, untrack($form).action_value = data.action_value, untrack($form));
		let save_fields = true;
		if (["configure", "options"].includes(data.action_name)) save_fields = Object.values(data.fields).length > 0;
		if (save_fields) {
			const res = await form_action({
				route: page.route.id,
				action: "update",
				data
			});
			form.update((state$1) => ({
				...state$1,
				action_name: data.action_name,
				action_value: data.action_value,
				fields: obj(res.fields)
			}), { taint: false });
		}
		if (data.action_name === "configure") await goto(url(`/product/fields/${data.action_value}/settings`), { noScroll: true });
		if (data.action_name === "options") await goto(url(`/product/fields/${data.action_value}/options`), { noScroll: true });
		form.update((state$1) => ({
			...state$1,
			action_name: ""
		}));
		tainted.set({});
		switch (data.action_name) {
			case "add":
				toast.success(_("Field added successfully"));
				break;
			case "delete":
				toast.success(_("Field deleted successfully"));
				break;
			case "delete-fields":
				toast.success(_("Fields deleted successfully"));
				break;
			case "duplicate":
				toast.success(_("Field duplicated successfully"));
				break;
			case "toggle":
				toast.success(_("Field visibility toggled successfully"));
				break;
			case "update":
			case "favorite":
			case "common":
				toast.success(_("Fields updated successfully"));
				break;
		}
	}
	const superform = superForm($$props.data.form, {
		dataType: "json",
		SPA: true,
		resetForm: false,
		invalidateAll: false,
		taintedMessage: _("You have unsaved changes. Are you sure you want to leave this page?"),
		validators: valibot(FieldsFormSchema, { errorMode: "ignore" }),
		async onSubmit({ cancel, submitter }) {
			await submit_form(submitter);
			set(labeled, Object.fromEntries(Object.values($form().fields).map((f) => [f.id, !!f.label[lang.value]])), true);
			cancel();
		}
	});
	const { form, enhance, tainted, submit, errors, submitting, validate, validateForm } = superform;
	let fields = user_derived(() => sort($form().fields));
	let ids = user_derived(() => get(fields).map((f) => f.id).join("-"));
	let filtered_fields = user_derived(() => fields_filter.run(get(fields)));
	let labeled = state(proxy(Object.fromEntries(Object.values($form().fields).map((f) => [f.id, !!f.label[lang.value]]))));
	async function onEnd(ev) {
		const order = Array.from(ev.target.rows).map((row) => +(row.dataset.id ?? 0)).filter((id) => id > 0);
		const res = await form_action({
			route: page.route.id,
			action: "sort",
			data: { order }
		});
		form.update((state$1) => ({
			...state$1,
			action_name: "",
			action_value: "",
			fields: obj(res.fields)
		}));
		tainted.set({});
		if (ev.oldIndex !== ev.newIndex) ev.item.remove();
		toast.success(_("Fields reordered successfully"));
	}
	onMount(() => {
		current_form.set(async () => {
			if (Object.keys($tainted() || {}).length > 0) await submit_form();
		});
	});
	var fragment = root();
	var div = first_child(fragment);
	var form_1 = child(div);
	component(child(form_1), () => Table, ($$anchor$1, Table_Root) => {
		Table_Root($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1();
				var node_1 = first_child(fragment_1);
				component(node_1, () => Table_header, ($$anchor$3, Table_Header) => {
					Table_Header($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_2 = comment();
							component(first_child(fragment_2), () => Table_row, ($$anchor$5, Table_Row) => {
								Table_Row($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_3 = root_3();
										var node_3 = first_child(fragment_3);
										component(node_3, () => Table_head, ($$anchor$7, Table_Head) => {
											Table_Head($$anchor$7, {
												class: "w-12 px-0 text-center",
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_4 = comment();
													var node_4 = first_child(fragment_4);
													var consequent = ($$anchor$9) => {
														{
															let $0 = user_derived(() => Object.values($form().checked).some(Boolean) && !Object.values($form().checked).every(Boolean));
															Checkbox($$anchor$9, {
																class: "border-gray-400",
																"data-testid": "toggle-all",
																get indeterminate() {
																	return get($0);
																},
																onCheckedChange: () => {
																	store_mutate(form, untrack($form).checked = Object.fromEntries(Object.keys($form().fields).map((id) => [id, $form().check_all])), untrack($form));
																},
																get checked() {
																	return $form().check_all;
																},
																set checked($$value) {
																	store_mutate(form, untrack($form).check_all = $$value, untrack($form));
																}
															});
														}
													};
													if_block(node_4, ($$render) => {
														if (Object.values($form().fields).length > 1) $$render(consequent);
													});
													append($$anchor$8, fragment_4);
												},
												$$slots: { default: true }
											});
										});
										var node_5 = sibling(node_3, 2);
										component(node_5, () => Table_head, ($$anchor$7, Table_Head_1) => {
											Table_Head_1($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text$1 = text();
													template_effect(($0) => set_text(text$1, $0), [() => _("Name")]);
													append($$anchor$8, text$1);
												},
												$$slots: { default: true }
											});
										});
										var node_6 = sibling(node_5, 2);
										component(node_6, () => Table_head, ($$anchor$7, Table_Head_2) => {
											Table_Head_2($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_1 = text();
													template_effect(($0) => set_text(text_1, $0), [() => _("Label")]);
													append($$anchor$8, text_1);
												},
												$$slots: { default: true }
											});
										});
										var node_7 = sibling(node_6, 2);
										component(node_7, () => Table_head, ($$anchor$7, Table_Head_3) => {
											Table_Head_3($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_2 = text();
													template_effect(($0) => set_text(text_2, $0), [() => _("Type")]);
													append($$anchor$8, text_2);
												},
												$$slots: { default: true }
											});
										});
										var node_8 = sibling(node_7, 2);
										component(node_8, () => Table_head, ($$anchor$7, Table_Head_4) => {
											Table_Head_4($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_3 = text();
													template_effect(($0) => set_text(text_3, $0), [() => _("Value")]);
													append($$anchor$8, text_3);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_8, 2), () => Table_head, ($$anchor$7, Table_Head_5) => {
											Table_Head_5($$anchor$7, {
												class: "text-right",
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_4 = text();
													template_effect(($0) => set_text(text_4, $0), [() => _("Actions")]);
													append($$anchor$8, text_4);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_3);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_2);
						},
						$$slots: { default: true }
					});
				});
				var node_10 = sibling(node_1, 2);
				component(node_10, () => Table_body, ($$anchor$3, Table_Body) => {
					Table_Body($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_11 = comment();
							key(first_child(fragment_11), () => get(ids), ($$anchor$5) => {
								var fragment_12 = root_12();
								var node_12 = first_child(fragment_12);
								var consequent_1 = ($$anchor$6) => {
									var fragment_13 = comment();
									component(first_child(fragment_13), () => Table_row, ($$anchor$7, Table_Row_1) => {
										Table_Row_1($$anchor$7, {
											children: ($$anchor$8, $$slotProps$2) => {
												var fragment_14 = root_14();
												var node_14 = first_child(fragment_14);
												component(node_14, () => Table_cell, ($$anchor$9, Table_Cell) => {
													Table_Cell($$anchor$9, {
														children: ($$anchor$10, $$slotProps$3) => {
															{
																let $0 = user_derived(() => cn({ "opacity-0": !fields_filter.value }));
																let $1 = user_derived(() => _("Clear filter"));
																Form_button($$anchor$10, {
																	variant: "ghost",
																	type: "button",
																	get class() {
																		return `transition-opacity ease-in-out ${get($0) ?? ""}`;
																	},
																	onclick: () => fields_filter.value = "",
																	get title() {
																		return get($1);
																	},
																	children: ($$anchor$11, $$slotProps$4) => {
																		Icon($$anchor$11, { icon: "mdi:close" });
																	},
																	$$slots: { default: true }
																});
															}
														},
														$$slots: { default: true }
													});
												});
												component(sibling(node_14, 2), () => Table_cell, ($$anchor$9, Table_Cell_1) => {
													Table_Cell_1($$anchor$9, {
														colspan: 5,
														children: ($$anchor$10, $$slotProps$3) => {
															FieldsFilter($$anchor$10, {});
														},
														$$slots: { default: true }
													});
												});
												append($$anchor$8, fragment_14);
											},
											$$slots: { default: true }
										});
									});
									append($$anchor$6, fragment_13);
								};
								if_block(node_12, ($$render) => {
									if (get(fields).length > fields_filter.min) $$render(consequent_1);
								});
								each(sibling(node_12, 2), 17, () => get(filtered_fields), ({ id, type, active, linked, favorite, common, position }) => [id, position].join("-"), ($$anchor$6, $$item) => {
									let id = () => get($$item).id;
									let type = () => get($$item).type;
									let active = () => get($$item).active;
									let linked = () => get($$item).linked;
									let favorite = () => get($$item).favorite;
									let common = () => get($$item).common;
									const config = user_derived(() => FieldConfig.get(+type() || FieldTypes._DP_INPUT_));
									var fragment_18 = comment();
									var node_17 = first_child(fragment_18);
									{
										let $0 = user_derived(() => ({
											"bg-field-row-linked": linked(),
											"bg-field-row-favorite": favorite(),
											"bg-field-row-common": common(),
											"bg-destructive": $form().checked[id()]
										}));
										component(node_17, () => Table_row, ($$anchor$7, Table_Row_2) => {
											Table_Row_2($$anchor$7, {
												"data-testid": "field",
												get "data-id"() {
													return id();
												},
												get title() {
													return `#${id() ?? ""}`;
												},
												get class() {
													return get($0);
												},
												children: ($$anchor$8, $$slotProps$2) => {
													var fragment_19 = root_19();
													var node_18 = first_child(fragment_19);
													component(node_18, () => Table_cell, ($$anchor$9, Table_Cell_2) => {
														Table_Cell_2($$anchor$9, {
															class: "w-12 text-center",
															children: ($$anchor$10, $$slotProps$3) => {
																var fragment_20 = comment();
																var node_19 = first_child(fragment_20);
																var consequent_2 = ($$anchor$11) => {
																	var bind_get = () => $form().checked[id()] || $form().check_all;
																	var bind_set = (checked) => store_mutate(form, untrack($form).checked[id()] = checked, untrack($form));
																	Checkbox($$anchor$11, {
																		class: "border-gray-400",
																		get checked() {
																			return bind_get();
																		},
																		set checked($$value) {
																			bind_set($$value);
																		},
																		onchange: () => {
																			store_mutate(form, untrack($form).check_all = Object.values($form().checked).every(Boolean), untrack($form));
																		}
																	});
																};
																if_block(node_19, ($$render) => {
																	if (Object.values($form().fields).length > 1) $$render(consequent_2);
																});
																append($$anchor$10, fragment_20);
															},
															$$slots: { default: true }
														});
													});
													var node_20 = sibling(node_18, 2);
													component(node_20, () => Table_cell, ($$anchor$9, Table_Cell_3) => {
														Table_Cell_3($$anchor$9, {
															get title() {
																return `ID: ${id() ?? ""}`;
															},
															children: ($$anchor$10, $$slotProps$3) => {
																var div_1 = root_22();
																var node_21 = child(div_1);
																{
																	let $0$1 = user_derived(() => clsx({ "border-error": !!$errors()?.fields?.[id()]?.name }));
																	let $1 = user_derived(() => $errors()?.fields?.[id()]?.name?.join(", ") ?? "");
																	Input(node_21, {
																		get class() {
																			return `col-span-full row-span-full w-48 ${get($0$1) ?? ""}`;
																		},
																		get title() {
																			return get($1);
																		},
																		"data-testid": "field-name",
																		oninput: () => {
																			validate(`fields.${id()}.name`);
																			if (!get(labeled)[id()]) store_mutate(form, untrack($form).fields[id()].label[lang.value] = generateFieldLabel($form().fields[id()].name), untrack($form));
																		},
																		onblur: () => {
																			store_mutate(form, untrack($form).fields[id()].name = sanitizeFieldName($form().fields[id()].name), untrack($form));
																		},
																		get value() {
																			return $form().fields[id()].name;
																		},
																		set value($$value) {
																			store_mutate(form, untrack($form).fields[id()].name = $$value, untrack($form));
																		}
																	});
																}
																var node_22 = sibling(node_21, 2);
																var consequent_3 = ($$anchor$11) => {
																	var div_2 = root_23();
																	Icon(child(div_2), {
																		icon: "ic:round-report-problem",
																		class: "text-error"
																	});
																	reset(div_2);
																	template_effect(($0$1) => set_attribute(div_2, "title", $0$1), [() => $errors()?.fields?.[id()]?.name?.join(", ") ?? ""]);
																	append($$anchor$11, div_2);
																};
																if_block(node_22, ($$render) => {
																	if ($errors()?.fields?.[id()]?.name) $$render(consequent_3);
																});
																reset(div_1);
																append($$anchor$10, div_1);
															},
															$$slots: { default: true }
														});
													});
													var node_24 = sibling(node_20, 2);
													component(node_24, () => Table_cell, ($$anchor$9, Table_Cell_4) => {
														Table_Cell_4($$anchor$9, {
															children: ($$anchor$10, $$slotProps$3) => {
																var div_3 = root_24();
																var node_25 = child(div_3);
																{
																	let $0$1 = user_derived(() => clsx({ "border-error": !!$errors()?.fields?.[id()]?.label }));
																	let $1 = user_derived(() => fallback($form().fields[id()].label));
																	let $2 = user_derived(() => Object.values($errors()?.fields?.[id()]?.label ?? [])?.join(", ") ?? "");
																	Input(node_25, {
																		get class() {
																			return `col-span-full row-span-full w-48 ${get($0$1) ?? ""}`;
																		},
																		get placeholder() {
																			return get($1);
																		},
																		"data-testid": "field-label",
																		get title() {
																			return get($2);
																		},
																		get value() {
																			return $form().fields[id()].label[lang.value];
																		},
																		set value($$value) {
																			store_mutate(form, untrack($form).fields[id()].label[lang.value] = $$value, untrack($form));
																		}
																	});
																}
																var node_26 = sibling(node_25, 2);
																var consequent_4 = ($$anchor$11) => {
																	var div_4 = root_25();
																	Icon(child(div_4), {
																		icon: "ic:round-report-problem",
																		class: "text-error"
																	});
																	reset(div_4);
																	append($$anchor$11, div_4);
																};
																if_block(node_26, ($$render) => {
																	if ($errors()?.fields?.[id()]?.label) $$render(consequent_4);
																});
																reset(div_3);
																append($$anchor$10, div_3);
															},
															$$slots: { default: true }
														});
													});
													var node_28 = sibling(node_24, 2);
													component(node_28, () => Table_cell, ($$anchor$9, Table_Cell_5) => {
														Table_Cell_5($$anchor$9, {
															children: ($$anchor$10, $$slotProps$3) => {
																FieldType($$anchor$10, {
																	get id() {
																		return id();
																	},
																	get field_types() {
																		return $$props.data.field_types;
																	},
																	get superform() {
																		return superform;
																	}
																});
															},
															$$slots: { default: true }
														});
													});
													var node_29 = sibling(node_28, 2);
													component(node_29, () => Table_cell, ($$anchor$9, Table_Cell_6) => {
														Table_Cell_6($$anchor$9, {
															children: ($$anchor$10, $$slotProps$3) => {
																{
																	let $0$1 = user_derived(() => clsx({
																		"border-error": !!$errors()?.fields?.[id()]?.init,
																		"opacity-100": get(config)?.value,
																		"opacity-0": !get(config)?.value
																	}));
																	let $1 = user_derived(() => $errors()?.fields?.[id()]?.init?.join(", ") ?? null);
																	Input($$anchor$10, {
																		get class() {
																			return `w-16 transition-opacity ${get($0$1) ?? ""}`;
																		},
																		get title() {
																			return get($1);
																		},
																		get value() {
																			return $form().fields[id()].init;
																		},
																		set value($$value) {
																			store_mutate(form, untrack($form).fields[id()].init = $$value, untrack($form));
																		}
																	});
																}
															},
															$$slots: { default: true }
														});
													});
													component(sibling(node_29, 2), () => Table_cell, ($$anchor$9, Table_Cell_7) => {
														Table_Cell_7($$anchor$9, {
															children: ($$anchor$10, $$slotProps$3) => {
																var div_5 = root_28();
																var node_31 = child(div_5);
																{
																	let $0$1 = user_derived(() => active() ? "text-green-500" : "text-red-500");
																	let $1 = user_derived(() => _("Toggle field visibility"));
																	Form_button(node_31, {
																		get class() {
																			return `flex gap-2 ${get($0$1) ?? ""}`;
																		},
																		variant: "ghost",
																		size: "sm",
																		name: "toggle",
																		get value() {
																			return id();
																		},
																		get title() {
																			return get($1);
																		},
																		children: ($$anchor$11, $$slotProps$4) => {
																			{
																				let $0$2 = user_derived(() => $submitting() && $form().action_name === "toggle" && $form().action_value === id().toString());
																				Spinner($$anchor$11, {
																					get loading() {
																						return get($0$2);
																					},
																					children: ($$anchor$12, $$slotProps$5) => {
																						{
																							let $0$3 = user_derived(() => active() ? "mdi:eye" : "mdi:eye-off");
																							Icon($$anchor$12, { get icon() {
																								return get($0$3);
																							} });
																						}
																					},
																					$$slots: { default: true }
																				});
																			}
																		},
																		$$slots: { default: true }
																	});
																}
																var node_32 = sibling(node_31, 2);
																{
																	let $0$1 = user_derived(() => get(config)?.settings ? "opacity-100" : "opacity-0");
																	let $1 = user_derived(() => _("Open field settings"));
																	Form_button(node_32, {
																		get class() {
																			return `flex gap-2 transition-opacity ${get($0$1) ?? ""}`;
																		},
																		variant: "ghost",
																		size: "sm",
																		name: "configure",
																		get value() {
																			return id();
																		},
																		get title() {
																			return get($1);
																		},
																		children: ($$anchor$11, $$slotProps$4) => {
																			{
																				let $0$2 = user_derived(() => $submitting() && $form().action_name === "configure" && $form().action_value === id().toString());
																				Spinner($$anchor$11, {
																					get loading() {
																						return get($0$2);
																					},
																					children: ($$anchor$12, $$slotProps$5) => {
																						Icon($$anchor$12, { icon: "mdi:settings" });
																					},
																					$$slots: { default: true }
																				});
																			}
																		},
																		$$slots: { default: true }
																	});
																}
																var node_33 = sibling(node_32, 2);
																{
																	let $0$1 = user_derived(() => get(config)?.options ? "opacity-100" : "opacity-0");
																	let $1 = user_derived(() => _("Configure field options"));
																	Form_button(node_33, {
																		get class() {
																			return `flex gap-2 transition-opacity ${get($0$1) ?? ""}`;
																		},
																		variant: "ghost",
																		size: "sm",
																		name: "options",
																		get value() {
																			return id();
																		},
																		get title() {
																			return get($1);
																		},
																		children: ($$anchor$11, $$slotProps$4) => {
																			{
																				let $0$2 = user_derived(() => $submitting() && $form().action_name === "options" && $form().action_value === id().toString());
																				Spinner($$anchor$11, {
																					get loading() {
																						return get($0$2);
																					},
																					children: ($$anchor$12, $$slotProps$5) => {
																						Icon($$anchor$12, { icon: "mdi:format-list-bulleted" });
																					},
																					$$slots: { default: true }
																				});
																			}
																		},
																		$$slots: { default: true }
																	});
																}
																var node_34 = sibling(node_33, 2);
																component(node_34, () => Root, ($$anchor$11, DropdownMenu_Root) => {
																	DropdownMenu_Root($$anchor$11, {
																		children: ($$anchor$12, $$slotProps$4) => {
																			var fragment_30 = root_35();
																			var node_35 = first_child(fragment_30);
																			{
																				let $0$1 = user_derived(() => _("More actions"));
																				component(node_35, () => Trigger, ($$anchor$13, DropdownMenu_Trigger) => {
																					DropdownMenu_Trigger($$anchor$13, {
																						class: "cursor-pointer",
																						get title() {
																							return get($0$1);
																						},
																						"data-testid": "more-actions",
																						children: ($$anchor$14, $$slotProps$5) => {
																							Icon($$anchor$14, { icon: "mdi:dots-vertical" });
																						},
																						$$slots: { default: true }
																					});
																				});
																			}
																			component(sibling(node_35, 2), () => Dropdown_menu_content, ($$anchor$13, DropdownMenu_Content) => {
																				DropdownMenu_Content($$anchor$13, {
																					children: ($$anchor$14, $$slotProps$5) => {
																						var fragment_32 = comment();
																						component(first_child(fragment_32), () => Group, ($$anchor$15, DropdownMenu_Group) => {
																							DropdownMenu_Group($$anchor$15, {
																								children: ($$anchor$16, $$slotProps$6) => {
																									var fragment_33 = root_38();
																									var node_38 = first_child(fragment_33);
																									component(node_38, () => Dropdown_menu_item, ($$anchor$17, DropdownMenu_Item) => {
																										DropdownMenu_Item($$anchor$17, {
																											children: ($$anchor$18, $$slotProps$7) => {
																												Form_button($$anchor$18, {
																													class: "flex w-full gap-2",
																													variant: "outline",
																													size: "sm",
																													form: "fields-form",
																													name: "duplicate",
																													get value() {
																														return id();
																													},
																													children: ($$anchor$19, $$slotProps$8) => {
																														var fragment_35 = root_40();
																														var node_39 = first_child(fragment_35);
																														{
																															let $0$1 = user_derived(() => $submitting() && $form().action_name === "duplicate" && $form().action_value === id().toString());
																															Spinner(node_39, {
																																get loading() {
																																	return get($0$1);
																																},
																																children: ($$anchor$20, $$slotProps$9) => {
																																	Icon($$anchor$20, { icon: "mdi:content-copy" });
																																},
																																$$slots: { default: true }
																															});
																														}
																														var text_5 = sibling(node_39);
																														template_effect(($0$1) => set_text(text_5, ` ${$0$1 ?? ""}`), [() => _("Duplicate field")]);
																														append($$anchor$19, fragment_35);
																													},
																													$$slots: { default: true }
																												});
																											},
																											$$slots: { default: true }
																										});
																									});
																									var node_40 = sibling(node_38, 2);
																									component(node_40, () => Dropdown_menu_item, ($$anchor$17, DropdownMenu_Item_1) => {
																										DropdownMenu_Item_1($$anchor$17, {
																											children: ($$anchor$18, $$slotProps$7) => {
																												Form_button($$anchor$18, {
																													class: "bg-field-row-favorite flex w-full gap-2",
																													variant: "ghost",
																													size: "sm",
																													form: "fields-form",
																													name: "favorite",
																													get value() {
																														return id();
																													},
																													children: ($$anchor$19, $$slotProps$8) => {
																														var fragment_38 = root_43();
																														var node_41 = first_child(fragment_38);
																														{
																															let $0$1 = user_derived(() => $submitting() && $form().action_name === "favorite" && $form().action_value === id().toString());
																															Spinner(node_41, {
																																get loading() {
																																	return get($0$1);
																																},
																																children: ($$anchor$20, $$slotProps$9) => {
																																	Icon($$anchor$20, { icon: "mdi:star" });
																																},
																																$$slots: { default: true }
																															});
																														}
																														var node_42 = sibling(node_41, 2);
																														var consequent_5 = ($$anchor$20) => {
																															var text_6 = text();
																															template_effect(($0$1) => set_text(text_6, $0$1), [() => _("Remove from favorites")]);
																															append($$anchor$20, text_6);
																														};
																														var alternate = ($$anchor$20) => {
																															var text_7 = text();
																															template_effect(($0$1) => set_text(text_7, $0$1), [() => _("Mark as a favorite field")]);
																															append($$anchor$20, text_7);
																														};
																														if_block(node_42, ($$render) => {
																															if (favorite()) $$render(consequent_5);
																															else $$render(alternate, false);
																														});
																														append($$anchor$19, fragment_38);
																													},
																													$$slots: { default: true }
																												});
																											},
																											$$slots: { default: true }
																										});
																									});
																									var node_43 = sibling(node_40, 2);
																									component(node_43, () => Dropdown_menu_item, ($$anchor$17, DropdownMenu_Item_2) => {
																										DropdownMenu_Item_2($$anchor$17, {
																											children: ($$anchor$18, $$slotProps$7) => {
																												Form_button($$anchor$18, {
																													class: "bg-field-row-common flex w-full gap-2",
																													variant: "ghost",
																													size: "sm",
																													form: "fields-form",
																													name: "common",
																													get value() {
																														return id();
																													},
																													children: ($$anchor$19, $$slotProps$8) => {
																														var fragment_43 = root_48();
																														var node_44 = first_child(fragment_43);
																														{
																															let $0$1 = user_derived(() => $submitting() && $form().action_name === "favorite" && $form().action_value === id().toString());
																															Spinner(node_44, {
																																get loading() {
																																	return get($0$1);
																																},
																																children: ($$anchor$20, $$slotProps$9) => {
																																	Icon($$anchor$20, { icon: "mdi:share-variant" });
																																},
																																$$slots: { default: true }
																															});
																														}
																														var node_45 = sibling(node_44, 2);
																														var consequent_6 = ($$anchor$20) => {
																															var text_8 = text();
																															template_effect(($0$1) => set_text(text_8, $0$1), [() => _("Remove from common fields")]);
																															append($$anchor$20, text_8);
																														};
																														var alternate_1 = ($$anchor$20) => {
																															var text_9 = text();
																															template_effect(($0$1) => set_text(text_9, $0$1), [() => _("Mark as a common field")]);
																															append($$anchor$20, text_9);
																														};
																														if_block(node_45, ($$render) => {
																															if (common()) $$render(consequent_6);
																															else $$render(alternate_1, false);
																														});
																														append($$anchor$19, fragment_43);
																													},
																													$$slots: { default: true }
																												});
																											},
																											$$slots: { default: true }
																										});
																									});
																									var node_46 = sibling(node_43, 2);
																									component(node_46, () => Dropdown_menu_item, ($$anchor$17, DropdownMenu_Item_3) => {
																										DropdownMenu_Item_3($$anchor$17, {
																											children: ($$anchor$18, $$slotProps$7) => {
																												Form_button($$anchor$18, {
																													class: "bg-primary text-primary-foreground flex w-full gap-2",
																													variant: "outline",
																													size: "sm",
																													form: "fields-form",
																													name: "insert",
																													get value() {
																														return id();
																													},
																													children: ($$anchor$19, $$slotProps$8) => {
																														var fragment_48 = root_53();
																														var node_47 = first_child(fragment_48);
																														{
																															let $0$1 = user_derived(() => $submitting() && $form().action_name === "insert" && $form().action_value === id().toString());
																															Spinner(node_47, {
																																get loading() {
																																	return get($0$1);
																																},
																																children: ($$anchor$20, $$slotProps$9) => {
																																	Icon($$anchor$20, { icon: "ic:baseline-library-add" });
																																},
																																$$slots: { default: true }
																															});
																														}
																														var text_10 = sibling(node_47);
																														template_effect(($0$1) => set_text(text_10, ` ${$0$1 ?? ""}`), [() => _("Insert field after")]);
																														append($$anchor$19, fragment_48);
																													},
																													$$slots: { default: true }
																												});
																											},
																											$$slots: { default: true }
																										});
																									});
																									component(sibling(node_46, 2), () => Dropdown_menu_item, ($$anchor$17, DropdownMenu_Item_4) => {
																										DropdownMenu_Item_4($$anchor$17, {
																											closeOnSelect: false,
																											children: ($$anchor$18, $$slotProps$7) => {
																												Form_button($$anchor$18, {
																													class: "flex w-full gap-2",
																													variant: "destructive",
																													size: "sm",
																													form: "fields-form",
																													name: "delete",
																													get value() {
																														return id();
																													},
																													onclick: (e) => {
																														if (!confirm(_("Are you sure you want to delete this field?"))) e.preventDefault();
																													},
																													children: ($$anchor$19, $$slotProps$8) => {
																														var fragment_51 = root_56();
																														var node_49 = first_child(fragment_51);
																														{
																															let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete" && $form().action_value === id().toString());
																															Spinner(node_49, {
																																get loading() {
																																	return get($0$1);
																																},
																																children: ($$anchor$20, $$slotProps$9) => {
																																	Icon($$anchor$20, { icon: "mdi:trash-can" });
																																},
																																$$slots: { default: true }
																															});
																														}
																														var text_11 = sibling(node_49);
																														template_effect(($0$1) => set_text(text_11, ` ${$0$1 ?? ""}`), [() => _("Delete field")]);
																														append($$anchor$19, fragment_51);
																													},
																													$$slots: { default: true }
																												});
																											},
																											$$slots: { default: true }
																										});
																									});
																									append($$anchor$16, fragment_33);
																								},
																								$$slots: { default: true }
																							});
																						});
																						append($$anchor$14, fragment_32);
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$12, fragment_30);
																		},
																		$$slots: { default: true }
																	});
																});
																var node_50 = sibling(node_34, 2);
																{
																	let $0$1 = user_derived(() => cn(buttonVariants({
																		variant: "ghost",
																		size: "sm"
																	}), "handle cursor-move opacity-100 transition-opacity ease-in-out", { "opacity-0 pointer-events-none": fields_filter.value }));
																	let $1 = user_derived(() => _("Drag to reorder"));
																	Label(node_50, {
																		get class() {
																			return get($0$1);
																		},
																		get title() {
																			return get($1);
																		},
																		children: ($$anchor$11, $$slotProps$4) => {
																			Icon($$anchor$11, { icon: "mdi:drag" });
																		},
																		$$slots: { default: true }
																	});
																}
																reset(div_5);
																append($$anchor$10, div_5);
															},
															$$slots: { default: true }
														});
													});
													append($$anchor$8, fragment_19);
												},
												$$slots: { default: true }
											});
										});
									}
									append($$anchor$6, fragment_18);
								}, ($$anchor$6) => {
									var fragment_54 = comment();
									component(first_child(fragment_54), () => Table_row, ($$anchor$7, Table_Row_3) => {
										Table_Row_3($$anchor$7, {
											children: ($$anchor$8, $$slotProps$2) => {
												var fragment_55 = comment();
												component(first_child(fragment_55), () => Table_cell, ($$anchor$9, Table_Cell_8) => {
													Table_Cell_8($$anchor$9, {
														colspan: 6,
														children: ($$anchor$10, $$slotProps$3) => {
															var fragment_56 = comment();
															component(first_child(fragment_56), () => Alert, ($$anchor$11, Alert_Root) => {
																Alert_Root($$anchor$11, {
																	children: ($$anchor$12, $$slotProps$4) => {
																		var fragment_57 = root_62();
																		var node_54 = first_child(fragment_57);
																		Icon(node_54, { icon: "ic:baseline-info" });
																		var node_55 = sibling(node_54, 2);
																		component(node_55, () => Alert_title, ($$anchor$13, Alert_Title) => {
																			Alert_Title($$anchor$13, {
																				children: ($$anchor$14, $$slotProps$5) => {
																					next();
																					var text_12 = text();
																					template_effect(($0) => set_text(text_12, $0), [() => _("No fields found")]);
																					append($$anchor$14, text_12);
																				},
																				$$slots: { default: true }
																			});
																		});
																		component(sibling(node_55, 2), () => Alert_description, ($$anchor$13, Alert_Description) => {
																			Alert_Description($$anchor$13, {
																				children: ($$anchor$14, $$slotProps$5) => {
																					var fragment_59 = comment();
																					var node_57 = first_child(fragment_59);
																					var consequent_7 = ($$anchor$15) => {
																						var text_13 = text();
																						template_effect(($0) => set_text(text_13, $0), [() => _("Click the button below to add a new field")]);
																						append($$anchor$15, text_13);
																					};
																					var alternate_2 = ($$anchor$15) => {
																						var text_14 = text();
																						template_effect(($0) => set_text(text_14, $0), [() => _("No fields match your filter")]);
																						append($$anchor$15, text_14);
																					};
																					if_block(node_57, ($$render) => {
																						if (!fields_filter.value) $$render(consequent_7);
																						else $$render(alternate_2, false);
																					});
																					append($$anchor$14, fragment_59);
																				},
																				$$slots: { default: true }
																			});
																		});
																		append($$anchor$12, fragment_57);
																	},
																	$$slots: { default: true }
																});
															});
															append($$anchor$10, fragment_56);
														},
														$$slots: { default: true }
													});
												});
												append($$anchor$8, fragment_55);
											},
											$$slots: { default: true }
										});
									});
									append($$anchor$6, fragment_54);
								});
								append($$anchor$5, fragment_12);
							});
							append($$anchor$4, fragment_11);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_10, 2), () => Table_footer, ($$anchor$3, Table_Footer) => {
					Table_Footer($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_62 = comment();
							component(first_child(fragment_62), () => Table_row, ($$anchor$5, Table_Row_4) => {
								Table_Row_4($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_63 = comment();
										component(first_child(fragment_63), () => Table_cell, ($$anchor$7, Table_Cell_9) => {
											Table_Cell_9($$anchor$7, {
												colspan: 6,
												children: ($$anchor$8, $$slotProps$3) => {
													var div_6 = root_69();
													var node_61 = child(div_6);
													var consequent_8 = ($$anchor$9) => {
														var fragment_64 = root_70();
														var node_62 = first_child(fragment_64);
														Form_button(node_62, {
															class: "bg-destructive text-destructive-foreground flex gap-2",
															form: "fields-form",
															name: "delete-fields",
															onclick: (e) => {
																if (!confirm(_("Are you sure you want to delete the selected fields?"))) e.preventDefault();
															},
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_65 = root_71();
																var node_63 = first_child(fragment_65);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "delete-fields");
																	Spinner(node_63, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "mdi:trash-can" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_15 = sibling(node_63);
																template_effect(($0) => set_text(text_15, ` ${$0 ?? ""}`), [() => _("Delete selected fields")]);
																append($$anchor$10, fragment_65);
															},
															$$slots: { default: true }
														});
														Form_button(sibling(node_62, 2), {
															variant: "outline",
															onclick: () => {
																store_mutate(form, untrack($form).checked = {}, untrack($form));
																store_mutate(form, untrack($form).check_all = false, untrack($form));
															},
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_67 = root_73();
																var node_65 = first_child(fragment_67);
																Icon(node_65, { icon: "mdi:close" });
																var text_16 = sibling(node_65);
																template_effect(($0) => set_text(text_16, ` ${$0 ?? ""}`), [() => _("Cancel")]);
																append($$anchor$10, fragment_67);
															},
															$$slots: { default: true }
														});
														append($$anchor$9, fragment_64);
													};
													var alternate_3 = ($$anchor$9) => {
														var fragment_68 = root_74();
														var node_66 = first_child(fragment_68);
														Form_button(node_66, {
															class: "flex gap-2",
															name: "add",
															variant: "outline",
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_69 = root_75();
																var node_67 = first_child(fragment_69);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "add");
																	Spinner(node_67, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "mdi:plus" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_17 = sibling(node_67);
																template_effect(($0) => set_text(text_17, ` ${$0 ?? ""}`), [() => _("Add field")]);
																append($$anchor$10, fragment_69);
															},
															$$slots: { default: true }
														});
														var node_68 = sibling(node_66, 2);
														{
															let $0 = user_derived(() => $tainted()?.fields && "btn-highlight");
															let $1 = user_derived(() => !$tainted()?.fields);
															Form_button(node_68, {
																get class() {
																	return `flex gap-2 ${get($0) ?? ""}`;
																},
																get disabled() {
																	return get($1);
																},
																"data-testid": "save-fields",
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_71 = root_77();
																	var node_69 = first_child(fragment_71);
																	{
																		let $0$1 = user_derived(() => $submitting() && [
																			"update",
																			"duplicate",
																			"favorite",
																			"common"
																		].includes($form().action_name));
																		Spinner(node_69, {
																			get loading() {
																				return get($0$1);
																			},
																			children: ($$anchor$11, $$slotProps$5) => {
																				Icon($$anchor$11, { icon: "mdi:content-save" });
																			},
																			$$slots: { default: true }
																		});
																	}
																	var text_18 = sibling(node_69);
																	template_effect(($0$1) => set_text(text_18, ` ${$0$1 ?? ""}`), [() => _("Save fields")]);
																	append($$anchor$10, fragment_71);
																},
																$$slots: { default: true }
															});
														}
														var node_70 = sibling(node_68, 2);
														var consequent_9 = ($$anchor$10) => {
															var p = root_79();
															var node_71 = child(p);
															Icon(node_71, { icon: "mdi:info" });
															var node_72 = sibling(node_71, 2);
															html(node_72, () => kbd(_("Use _Up__ / _Down__ arrows and _Tab__ / _Shift__ _Tab__ to navigate between fields")));
															Form_button(sibling(node_72, 2), {
																type: "button",
																variant: "ghost",
																size: "icon",
																onclick: () => show_navigation_tip.value = "hide",
																class: "dismiss btn btn-small btn-secondary",
																"data-testid": "dismiss-navigation-tip",
																children: ($$anchor$11, $$slotProps$4) => {
																	Icon($$anchor$11, { icon: "mdi:close" });
																},
																$$slots: { default: true }
															});
															reset(p);
															transition(3, p, () => fade);
															append($$anchor$10, p);
														};
														if_block(node_70, ($$render) => {
															if (show_navigation_tip.value === "show" && Object.values($form().fields).length > 3) $$render(consequent_9);
														});
														append($$anchor$9, fragment_68);
													};
													if_block(node_61, ($$render) => {
														if (Object.values($form().checked).some(Boolean)) $$render(consequent_8);
														else $$render(alternate_3, false);
													});
													reset(div_6);
													append($$anchor$8, div_6);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_63);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_62);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment_1);
			},
			$$slots: { default: true }
		});
	});
	reset(form_1);
	action(form_1, ($$node) => enhance?.($$node));
	action(form_1, ($$node) => navigate?.($$node));
	action(form_1, ($$node, $$action_arg) => sortable?.($$node, $$action_arg), () => ({ onEnd }));
	action(form_1, ($$node, $$action_arg) => submitOnEnter?.($$node, $$action_arg), () => ({ submit }));
	var div_7 = sibling(form_1, 2);
	var node_74 = child(div_7);
	FavoriteFields(node_74, { get fields() {
		return $$props.data.favorite_fields;
	} });
	CommonFields(sibling(node_74, 2), {
		get fields() {
			return $$props.data.common_fields;
		},
		get id_product() {
			return dpa.id_product;
		}
	});
	reset(div_7);
	reset(div);
	snippet(sibling(div, 2), () => $$props.children);
	append($$anchor, fragment);
	pop();
	$$cleanup();
}
export { _layout as component, _layout_exports as universal };
