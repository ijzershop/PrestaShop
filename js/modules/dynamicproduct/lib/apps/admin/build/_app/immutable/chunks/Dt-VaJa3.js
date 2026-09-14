import { Qt as __toESM, Xt as __commonJSMin } from "./DUscB9kS.js";
import { B as ViewPlugin, E as ensureSyntaxTree, I as syntaxHighlighting, L as syntaxTree, R as Decoration, Y as placeholder, Z as tooltips, at as highlightCode, i as linter, nt as Prec, q as keymap, rt as RangeSetBuilder, st as tags, u as autocompletion, v as HighlightStyle, z as EditorView } from "./BirQbuIK.js";
import { n as parser, t as javascript } from "./BAR_jctJ.js";
import { n as indentAndCompletionWithTab, r as tabObservable, t as minimalSetup } from "./CAZFn-OP.js";
const supported_functions = [
	"SQR",
	"SQRT",
	"ABS",
	"SIGN",
	"TRUNC",
	"CEIL",
	"FLOOR",
	"ROUND",
	"ROUNDUP",
	"ROUNDDOWN",
	"VAL",
	"POW",
	"MIN",
	"MAX",
	"IF",
	"STRLEN",
	"SUBSTR",
	"REPLACE",
	"CONCAT",
	"PI",
	"CONTAINS",
	"CHECK",
	"PRICE",
	"BINARY_AND",
	"BINARY_OR",
	"LABEL",
	"REF",
	"NUM_SELECTED"
];
const custom_functions = ["GRID"];
const completions = [...supported_functions.map((label) => ({
	label,
	type: "function",
	apply: `${label}(`
})), {
	label: "GRID(\"csv_file\", column_value, row_value, default_value)",
	type: "function",
	info: "Reads a CSV file and returns the value at the specified column and row",
	apply: "GRID(\"csv_file\", [column_value], [row_value], 0)"
}];
function functions(completions$1) {
	return (context) => {
		if (syntaxTree(context.state).resolveInner(context.pos, 0).name === "TextToken") return null;
		const word = context.matchBefore(/\w*/);
		if (word && word.from == word.to && !context.explicit) return null;
		return {
			from: word.from,
			options: completions$1
		};
	};
}
function variables(options) {
	return (context) => {
		if (syntaxTree(context.state).resolveInner(context.pos, 0).name === "TextToken") return null;
		const word = context.matchBefore(/\w*/);
		if (word && word.from == word.to && !context.explicit) return null;
		return {
			from: word.from,
			options: options.map((label) => ({
				label,
				type: "variable",
				apply: `${label}`
			}))
		};
	};
}
var field = Decoration.mark({ attributes: { class: "cm-field" } });
function fieldsDeco(view, fields) {
	const builder = new RangeSetBuilder();
	for (const { from, to } of view.visibleRanges) ensureSyntaxTree(view.state, to)?.iterate({
		from,
		to,
		enter: (node) => {
			if (node.name === "VariableName") {
				const node_value = view.state.sliceDoc(node.from, node.to);
				if (fields.includes(node_value)) builder.add(node.from, node.to, field);
			}
		}
	});
	return builder.finish();
}
function fieldsHighlighting(fields) {
	return [ViewPlugin.fromClass(class {
		decorations;
		constructor(view) {
			this.decorations = fieldsDeco(view, fields);
		}
		update(update) {
			if (update.docChanged || update.viewportChanged) this.decorations = fieldsDeco(update.view, fields);
		}
	}, { decorations: (v) => v.decorations })];
}
var require_core = /* @__PURE__ */ __commonJSMin((() => {
	(function() {
		if (typeof window === "undefined") window = global;
		window.excelFormulaUtilities = window.excelFormulaUtilities || {};
		var core = window.excelFormulaUtilities.core = {};
		window.excelFormulaUtilities.string = window.excelFormulaUtilities.string || {};
		window.excelFormulaUtilities.string.formatStr = function(inStr) {
			var formattedStr = inStr;
			var argIndex = 1;
			for (; argIndex < arguments.length; argIndex++) {
				var replaceIndex = argIndex - 1;
				var replaceRegex = new RegExp("\\{{1}" + replaceIndex.toString() + "{1}\\}{1}", "g");
				formattedStr = formattedStr.replace(replaceRegex, arguments[argIndex]);
			}
			return formattedStr;
		};
		window.excelFormulaUtilities.string.trim = function(inStr) {
			return inStr.replace(/^\s|\s$/, "");
		};
		window.excelFormulaUtilities.string.trim = function(inStr) {
			return inStr.replace(/^(?:\s|&nbsp;|<\s*br\s*\/*\s*>)*|(?:\s|&nbsp;|<\s*br\s*\/*\s*>)*$/, "");
		};
		var isFunction = core.isFunction = function(obj$1) {
			return typeof obj$1 === "function";
		};
		var isArray = core.isArray = function(obj$1) {
			return typeof obj$1 === "object" && obj$1.length;
		};
		var isWindow = core.isWindow = function() {
			return obj && typeof obj === "object" && "setInterval" in obj;
		};
		var isPlainObject = core.isPlainObject = function(obj$1) {
			if (!obj$1 || typeof obj$1 !== "object" || obj$1.nodeType || isWindow(obj$1)) return false;
			if (obj$1.constructor && !hasOwnProperty.call(obj$1, "constructor") && !hasOwnProperty.call(obj$1.constructor.prototype, "isPrototypeOf")) return false;
			var lastKey;
			for (key in obj$1) lastKey = key;
			return lastKey === void 0 || hasOwnProperty.call(obj$1, lastKey);
		};
		core.extend = function() {
			var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
			if (typeof target === "boolean") {
				deep = target;
				target = arguments[1] || {};
				i = 2;
			}
			if (typeof target !== "object" && !isFunction(target)) target = {};
			if (length === i) {
				target = this;
				--i;
			}
			for (; i < length; i++) if ((options = arguments[i]) != null) for (name in options) {
				src = target[name];
				copy = options[name];
				if (target === copy) continue;
				if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && isArray(src) ? src : [];
					} else clone = src && isPlainObject(src) ? src : {};
					target[name] = core.extend(deep, clone, copy);
				} else if (copy !== void 0) target[name] = copy;
			}
			return target;
		};
	})();
}));
var require_ExcelFormulaUtilities = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root) {
		var excelFormulaUtilities$1 = root.excelFormulaUtilities = root.excelFormulaUtilities || {}, core = root.excelFormulaUtilities.core, formatStr = root.excelFormulaUtilities.string.formatStr, trim = root.excelFormulaUtilities.string.trim, types = {}, TOK_TYPE_NOOP = types.TOK_TYPE_NOOP = "noop", TOK_TYPE_OPERAND = types.TOK_TYPE_OPERAND = "operand", TOK_TYPE_FUNCTION = types.TOK_TYPE_FUNCTION = "function", TOK_TYPE_SUBEXPR = types.TOK_TYPE_SUBEXPR = "subexpression", TOK_TYPE_ARGUMENT = types.TOK_TYPE_ARGUMENT = "argument", TOK_TYPE_OP_PRE = types.TOK_TYPE_OP_PRE = "operator-prefix", TOK_TYPE_OP_IN = types.TOK_TYPE_OP_IN = "operator-infix", TOK_TYPE_OP_POST = types.TOK_TYPE_OP_POST = "operator-postfix", TOK_TYPE_WHITE_SPACE = types.TOK_TYPE_WHITE_SPACE = "white-space", TOK_TYPE_UNKNOWN = types.TOK_TYPE_UNKNOWN = "unknown", TOK_SUBTYPE_START = types.TOK_SUBTYPE_START = "start", TOK_SUBTYPE_STOP = types.TOK_SUBTYPE_STOP = "stop", TOK_SUBTYPE_TEXT = types.TOK_SUBTYPE_TEXT = "text", TOK_SUBTYPE_NUMBER = types.TOK_SUBTYPE_NUMBER = "number", TOK_SUBTYPE_LOGICAL = types.TOK_SUBTYPE_LOGICAL = "logical", TOK_SUBTYPE_ERROR = types.TOK_SUBTYPE_ERROR = "error", TOK_SUBTYPE_RANGE = types.TOK_SUBTYPE_RANGE = "range", TOK_SUBTYPE_MATH = types.TOK_SUBTYPE_MATH = "math", TOK_SUBTYPE_CONCAT = types.TOK_SUBTYPE_CONCAT = "concatenate", TOK_SUBTYPE_INTERSECT = types.TOK_SUBTYPE_INTERSECT = "intersect", TOK_SUBTYPE_UNION = types.TOK_SUBTYPE_UNION = "union";
		root.excelFormulaUtilities.isEu = typeof root.excelFormulaUtilities.isEu === "boolean" ? root.excelFormulaUtilities.isEu : false;
		function F_token(value, type, subtype) {
			this.value = value;
			this.type = type;
			this.subtype = subtype;
		}
		function F_tokens() {
			this.items = [];
			this.add = function(value, type, subtype) {
				if (!subtype) subtype = "";
				var token = new F_token(value, type, subtype);
				this.addRef(token);
				return token;
			};
			this.addRef = function(token) {
				this.items.push(token);
			};
			this.index = -1;
			this.reset = function() {
				this.index = -1;
			};
			this.BOF = function() {
				return this.index <= 0;
			};
			this.EOF = function() {
				return this.index >= this.items.length - 1;
			};
			this.moveNext = function() {
				if (this.EOF()) return false;
				this.index += 1;
				return true;
			};
			this.current = function() {
				if (this.index === -1) return null;
				return this.items[this.index];
			};
			this.next = function() {
				if (this.EOF()) return null;
				return this.items[this.index + 1];
			};
			this.previous = function() {
				if (this.index < 1) return null;
				return this.items[this.index - 1];
			};
		}
		function F_tokenStack() {
			this.items = [];
			this.push = function(token) {
				this.items.push(token);
			};
			this.pop = function(name) {
				var token = this.items.pop();
				return new F_token(name || "", token.type, TOK_SUBTYPE_STOP);
			};
			this.token = function() {
				return this.items.length > 0 ? this.items[this.items.length - 1] : null;
			};
			this.value = function() {
				return this.token() ? this.token().value.toString() : "";
			};
			this.type = function() {
				return this.token() ? this.token().type.toString() : "";
			};
			this.subtype = function() {
				return this.token() ? this.token().subtype.toString() : "";
			};
		}
		function getTokens(formula) {
			var tokens = new F_tokens(), tokenStack = new F_tokenStack(), offset = 0, currentChar = function() {
				return formula.substr(offset, 1);
			}, doubleChar = function() {
				return formula.substr(offset, 2);
			}, nextChar = function() {
				return formula.substr(offset + 1, 1);
			}, EOF = function() {
				return offset >= formula.length;
			}, token = "", inString = false, inPath = false, inRange = false, inError = false, regexSN = /^[1-9]{1}(\.[0-9]+)?E{1}$/;
			while (formula.length > 0) if (formula.substr(0, 1) === " ") formula = formula.substr(1);
			else {
				if (formula.substr(0, 1) === "=") formula = formula.substr(1);
				break;
			}
			while (!EOF()) {
				if (inString) {
					if (currentChar() === "\"") if (nextChar() === "\"") {
						token += "\"";
						offset += 1;
					} else {
						inString = false;
						tokens.add(token, TOK_TYPE_OPERAND, TOK_SUBTYPE_TEXT);
						token = "";
					}
					else token += currentChar();
					offset += 1;
					continue;
				}
				if (inPath) {
					if (currentChar() === "'") if (nextChar() === "'") {
						token += "'";
						offset += 1;
					} else {
						inPath = false;
						token += "'";
					}
					else token += currentChar();
					offset += 1;
					continue;
				}
				if (inRange) {
					if (currentChar() === "]") inRange = false;
					token += currentChar();
					offset += 1;
					continue;
				}
				if (inError) {
					token += currentChar();
					offset += 1;
					if (",#NULL!,#DIV/0!,#VALUE!,#REF!,#NAME?,#NUM!,#N/A,".indexOf("," + token + ",") !== -1) {
						inError = false;
						tokens.add(token, TOK_TYPE_OPERAND, TOK_SUBTYPE_ERROR);
						token = "";
					}
					continue;
				}
				if ("+-".indexOf(currentChar()) !== -1) {
					if (token.length > 1) {
						if (token.match(regexSN)) {
							token += currentChar();
							offset += 1;
							continue;
						}
					}
				}
				if (currentChar() === "\"") {
					if (token.length > 0) {
						tokens.add(token, TOK_TYPE_UNKNOWN);
						token = "";
					}
					inString = true;
					offset += 1;
					continue;
				}
				if (currentChar() === "'") {
					if (token.length > 0) {
						tokens.add(token, TOK_TYPE_UNKNOWN);
						token = "";
					}
					token = "'";
					inPath = true;
					offset += 1;
					continue;
				}
				if (currentChar() === "[") {
					inRange = true;
					token += currentChar();
					offset += 1;
					continue;
				}
				if (currentChar() === "#") {
					if (token.length > 0) {
						tokens.add(token, TOK_TYPE_UNKNOWN);
						token = "";
					}
					inError = true;
					token += currentChar();
					offset += 1;
					continue;
				}
				if (currentChar() === "{") {
					if (token.length > 0) {
						tokens.add(token, TOK_TYPE_UNKNOWN);
						token = "";
					}
					tokenStack.push(tokens.add("ARRAY", TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
					tokenStack.push(tokens.add("ARRAYROW", TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
					offset += 1;
					continue;
				}
				if (currentChar() === ";") if (root.excelFormulaUtilities.isEu) {
					if (token.length > 0) {
						tokens.add(token, TOK_TYPE_OPERAND);
						token = "";
					}
					if (tokenStack.type() !== TOK_TYPE_FUNCTION) tokens.add(currentChar(), TOK_TYPE_OP_IN, TOK_SUBTYPE_UNION);
					else tokens.add(currentChar(), TOK_TYPE_ARGUMENT);
					offset += 1;
					continue;
				} else {
					if (token.length > 0) {
						tokens.add(token, TOK_TYPE_OPERAND);
						token = "";
					}
					tokens.addRef(tokenStack.pop());
					tokens.add(",", TOK_TYPE_ARGUMENT);
					tokenStack.push(tokens.add("ARRAYROW", TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
					offset += 1;
					continue;
				}
				if (currentChar() === "}") {
					if (token.length > 0) {
						tokens.add(token, TOK_TYPE_OPERAND);
						token = "";
					}
					tokens.addRef(tokenStack.pop("ARRAYROWSTOP"));
					tokens.addRef(tokenStack.pop("ARRAYSTOP"));
					offset += 1;
					continue;
				}
				if (currentChar() === " ") {
					if (token.length > 0) {
						tokens.add(token, TOK_TYPE_OPERAND);
						token = "";
					}
					tokens.add("", TOK_TYPE_WHITE_SPACE);
					offset += 1;
					while (currentChar() === " " && !EOF()) offset += 1;
					continue;
				}
				if (",>=,<=,<>,".indexOf("," + doubleChar() + ",") !== -1) {
					if (token.length > 0) {
						tokens.add(token, TOK_TYPE_OPERAND);
						token = "";
					}
					tokens.add(doubleChar(), TOK_TYPE_OP_IN, TOK_SUBTYPE_LOGICAL);
					offset += 2;
					continue;
				}
				if ("+-*/^&=><".indexOf(currentChar()) !== -1) {
					if (token.length > 0) {
						tokens.add(token, TOK_TYPE_OPERAND);
						token = "";
					}
					tokens.add(currentChar(), TOK_TYPE_OP_IN);
					offset += 1;
					continue;
				}
				if ("%".indexOf(currentChar()) !== -1) {
					if (token.length > 0) {
						tokens.add(token, TOK_TYPE_OPERAND);
						token = "";
					}
					tokens.add(currentChar(), TOK_TYPE_OP_POST);
					offset += 1;
					continue;
				}
				if (currentChar() === "(") {
					if (token.length > 0) {
						tokenStack.push(tokens.add(token, TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
						token = "";
					} else tokenStack.push(tokens.add("", TOK_TYPE_SUBEXPR, TOK_SUBTYPE_START));
					offset += 1;
					continue;
				}
				if (currentChar() === "," && !root.excelFormulaUtilities.isEu) {
					if (token.length > 0) {
						tokens.add(token, TOK_TYPE_OPERAND);
						token = "";
					}
					if (tokenStack.type() !== TOK_TYPE_FUNCTION) tokens.add(currentChar(), TOK_TYPE_OP_IN, TOK_SUBTYPE_UNION);
					else tokens.add(currentChar(), TOK_TYPE_ARGUMENT);
					offset += 1;
					continue;
				}
				if (currentChar() === ")") {
					if (token.length > 0) {
						tokens.add(token, TOK_TYPE_OPERAND);
						token = "";
					}
					tokens.addRef(tokenStack.pop());
					offset += 1;
					continue;
				}
				token += currentChar();
				offset += 1;
			}
			if (token.length > 0 || inString || inPath || inRange || inError) if (inString || inPath || inRange || inError) {
				if (inString) token = "\"" + token;
				else if (inPath) token = "'" + token;
				else if (inRange) token = "[" + token;
				else if (inError) token = "#" + token;
				tokens.add(token, TOK_TYPE_UNKNOWN);
			} else tokens.add(token, TOK_TYPE_OPERAND);
			var tokens2 = new F_tokens();
			while (tokens.moveNext()) {
				token = tokens.current();
				if (token.type.toString() === TOK_TYPE_WHITE_SPACE) {
					var doAddToken = tokens.BOF() || tokens.EOF();
					doAddToken = doAddToken && (tokens.previous().type.toString() === TOK_TYPE_FUNCTION && tokens.previous().subtype.toString() === TOK_SUBTYPE_STOP || tokens.previous().type.toString() === TOK_TYPE_SUBEXPR && tokens.previous().subtype.toString() === TOK_SUBTYPE_STOP || tokens.previous().type.toString() === TOK_TYPE_OPERAND);
					doAddToken = doAddToken && (tokens.next().type.toString() === TOK_TYPE_FUNCTION && tokens.next().subtype.toString() === TOK_SUBTYPE_START || tokens.next().type.toString() === TOK_TYPE_SUBEXPR && tokens.next().subtype.toString() === TOK_SUBTYPE_START || tokens.next().type.toString() === TOK_TYPE_OPERAND);
					if (doAddToken) tokens2.add(token.value.toString(), TOK_TYPE_OP_IN, TOK_SUBTYPE_INTERSECT);
					continue;
				}
				tokens2.addRef(token);
			}
			while (tokens2.moveNext()) {
				token = tokens2.current();
				if (token.type.toString() === TOK_TYPE_OP_IN && token.value.toString() === "-") {
					if (tokens2.BOF()) token.type = TOK_TYPE_OP_PRE.toString();
					else if (tokens2.previous().type.toString() === TOK_TYPE_FUNCTION && tokens2.previous().subtype.toString() === TOK_SUBTYPE_STOP || tokens2.previous().type.toString() === TOK_TYPE_SUBEXPR && tokens2.previous().subtype.toString() === TOK_SUBTYPE_STOP || tokens2.previous().type.toString() === TOK_TYPE_OP_POST || tokens2.previous().type.toString() === TOK_TYPE_OPERAND) token.subtype = TOK_SUBTYPE_MATH.toString();
					else token.type = TOK_TYPE_OP_PRE.toString();
					continue;
				}
				if (token.type.toString() === TOK_TYPE_OP_IN && token.value.toString() === "+") {
					if (tokens2.BOF()) token.type = TOK_TYPE_NOOP.toString();
					else if (tokens2.previous().type.toString() === TOK_TYPE_FUNCTION && tokens2.previous().subtype.toString() === TOK_SUBTYPE_STOP || tokens2.previous().type.toString() === TOK_TYPE_SUBEXPR && tokens2.previous().subtype.toString() === TOK_SUBTYPE_STOP || tokens2.previous().type.toString() === TOK_TYPE_OP_POST || tokens2.previous().type.toString() === TOK_TYPE_OPERAND) token.subtype = TOK_SUBTYPE_MATH.toString();
					else token.type = TOK_TYPE_NOOP.toString();
					continue;
				}
				if (token.type.toString() === TOK_TYPE_OP_IN && token.subtype.length === 0) {
					if ("<>=".indexOf(token.value.substr(0, 1)) !== -1) token.subtype = TOK_SUBTYPE_LOGICAL.toString();
					else if (token.value.toString() === "&") token.subtype = TOK_SUBTYPE_CONCAT.toString();
					else token.subtype = TOK_SUBTYPE_MATH.toString();
					continue;
				}
				if (token.type.toString() === TOK_TYPE_OPERAND && token.subtype.length === 0) {
					if (isNaN(parseFloat(token.value))) if (token.value.toString() === "TRUE" || token.value.toString() === "FALSE") token.subtype = TOK_SUBTYPE_LOGICAL.toString();
					else token.subtype = TOK_SUBTYPE_RANGE.toString();
					else token.subtype = TOK_SUBTYPE_NUMBER.toString();
					continue;
				}
				if (token.type.toString() === TOK_TYPE_FUNCTION) {
					if (token.value.substr(0, 1) === "@") token.value = token.value.substr(1).toString();
					continue;
				}
			}
			tokens2.reset();
			tokens = new F_tokens();
			while (tokens2.moveNext()) if (tokens2.current().type.toString() !== TOK_TYPE_NOOP) tokens.addRef(tokens2.current());
			tokens.reset();
			return tokens;
		}
		excelFormulaUtilities$1.parseFormula = function(inputID, outputID) {
			var indentCount = 0;
			var indent = function() {
				var s = "|", i = 0;
				for (; i < indentCount; i += 1) s += "&nbsp;&nbsp;&nbsp;|";
				return s;
			};
			var formulaControl = document.getElementById(inputID);
			var formula = formulaControl.value;
			var tokens = getTokens(formula);
			var tokensHtml = "";
			tokensHtml += "<table cellspacing='0' style='border-top: 1px #cecece solid; margin-top: 5px; margin-bottom: 5px'>";
			tokensHtml += "<tr>";
			tokensHtml += "<td class='token' style='font-weight: bold; width: 50px'>index</td>";
			tokensHtml += "<td class='token' style='font-weight: bold; width: 125px'>type</td>";
			tokensHtml += "<td class='token' style='font-weight: bold; width: 125px'>subtype</td>";
			tokensHtml += "<td class='token' style='font-weight: bold; width: 150px'>token</td>";
			tokensHtml += "<td class='token' style='font-weight: bold; width: 300px'>token tree</td></tr>";
			while (tokens.moveNext()) {
				var token = tokens.current();
				if (token.subtype === TOK_SUBTYPE_STOP) indentCount -= indentCount > 0 ? 1 : 0;
				tokensHtml += "<tr>";
				tokensHtml += "<td class='token'>" + (tokens.index + 1) + "</td>";
				tokensHtml += "<td class='token'>" + token.type + "</td>";
				tokensHtml += "<td class='token'>" + (token.subtype.length === 0 ? "&nbsp;" : token.subtype.toString()) + "</td>";
				tokensHtml += "<td class='token'>" + (token.value.length === 0 ? "&nbsp;" : token.value).split(" ").join("&nbsp;") + "</td>";
				tokensHtml += "<td class='token'>" + indent() + (token.value.length === 0 ? "&nbsp;" : token.value).split(" ").join("&nbsp;") + "</td>";
				tokensHtml += "</tr>";
				if (token.subtype === TOK_SUBTYPE_START) indentCount += 1;
			}
			tokensHtml += "</table>";
			document.getElementById(outputID).innerHTML = tokensHtml;
			formulaControl.select();
			formulaControl.focus();
		};
		function breakOutRanges(rangeStr, delimStr) {
			if (!RegExp("[a-z]+[0-9]+:[a-z]+[0-9]+", "gi").test(rangeStr)) throw "This is not a valid range: " + rangeStr;
			var range = rangeStr.split(":"), startRow = parseInt(range[0].match(/[0-9]+/gi)[0]), startCol = range[0].match(/[A-Z]+/gi)[0], startColDec = fromBase26(startCol);
			endRow = parseInt(range[1].match(/[0-9]+/gi)[0]), endCol = range[1].match(/[A-Z]+/gi)[0], endColDec = fromBase26(endCol), totalRows = endRow - startRow + 1, totalCols = fromBase26(endCol) - fromBase26(startCol) + 1, curCol = 0, curRow = 1, curCell = "", retStr = "";
			for (; curRow <= totalRows; curRow += 1) {
				for (; curCol < totalCols; curCol += 1) {
					curCell = toBase26(startColDec + curCol) + "" + (startRow + curRow - 1);
					retStr += curCell + (curRow === totalRows && curCol === totalCols - 1 ? "" : delimStr);
				}
				curCol = 0;
			}
			return retStr;
		}
		var toBase26 = excelFormulaUtilities$1.toBase26 = function(value) {
			value = Math.abs(value);
			var converted = "", iteration = false, remainder;
			do {
				remainder = value % 26;
				if (iteration && value < 25) remainder--;
				converted = String.fromCharCode(remainder + "A".charCodeAt(0)) + converted;
				value = Math.floor((value - remainder) / 26);
				iteration = true;
			} while (value > 0);
			return converted;
		};
		var fromBase26 = excelFormulaUtilities$1.fromBase26 = function(number) {
			number = number.toUpperCase();
			var s = 0, i = 0, dec = 0;
			if (number !== null && typeof number !== "undefined" && number.length > 0) for (; i < number.length; i++) {
				s = number.charCodeAt(number.length - i - 1) - "A".charCodeAt(0);
				dec += Math.pow(26, i) * (s + 1);
			}
			return dec - 1;
		};
		function applyTokenTemplate(token, options, indent, lineBreak, override) {
			var lastToken = arguments[5] === null ? null : arguments[5];
			var replaceTokenTmpl = function(inStr) {
				return inStr.replace(/\{\{token\}\}/gi, "{0}").replace(/\{\{autoindent\}\}/gi, "{1}").replace(/\{\{autolinebreak\}\}/gi, "{2}");
			};
			var tokenString = "";
			if (token.subtype === "text" || token.type === "text") tokenString = token.value.toString();
			else if (token.type === "operand" && token.subtype === "range") tokenString = token.value.toString();
			else tokenString = (token.value.length === 0 ? " " : token.value.toString()).split(" ").join("").toString();
			if (typeof override === "function") {
				var returnVal = override(tokenString, token, indent, lineBreak);
				tokenString = returnVal.tokenString;
				if (!returnVal.useTemplate) return tokenString;
			}
			switch (token.type) {
				case "function":
					switch (token.value) {
						case "ARRAY":
							tokenString = formatStr(replaceTokenTmpl(options.tmplFunctionStartArray), tokenString, indent, lineBreak);
							break;
						case "ARRAYROW":
							tokenString = formatStr(replaceTokenTmpl(options.tmplFunctionStartArrayRow), tokenString, indent, lineBreak);
							break;
						case "ARRAYSTOP":
							tokenString = formatStr(replaceTokenTmpl(options.tmplFunctionStopArray), tokenString, indent, lineBreak);
							break;
						case "ARRAYROWSTOP":
							tokenString = formatStr(replaceTokenTmpl(options.tmplFunctionStopArrayRow), tokenString, indent, lineBreak);
							break;
						default:
							if (token.subtype.toString() === "start") tokenString = formatStr(replaceTokenTmpl(options.tmplFunctionStart), tokenString, indent, lineBreak);
							else tokenString = formatStr(replaceTokenTmpl(options.tmplFunctionStop), tokenString, indent, lineBreak);
							break;
					}
					break;
				case "operand":
					switch (token.subtype.toString()) {
						case "error":
							tokenString = formatStr(replaceTokenTmpl(options.tmplOperandError), tokenString, indent, lineBreak);
							break;
						case "range":
							tokenString = formatStr(replaceTokenTmpl(options.tmplOperandRange), tokenString, indent, lineBreak);
							break;
						case "logical":
							tokenString = formatStr(replaceTokenTmpl(options.tmplOperandLogical), tokenString, indent, lineBreak);
							break;
						case "number":
							tokenString = formatStr(replaceTokenTmpl(options.tmplOperandNumber), tokenString, indent, lineBreak);
							break;
						case "text":
							tokenString = formatStr(replaceTokenTmpl(options.tmplOperandText), tokenString, indent, lineBreak);
							break;
						case "argument":
							tokenString = formatStr(replaceTokenTmpl(options.tmplArgument), tokenString, indent, lineBreak);
							break;
						default: break;
					}
					break;
				case "operator-infix":
					tokenString = formatStr(replaceTokenTmpl(options.tmplOperandOperatorInfix), tokenString, indent, lineBreak);
					break;
				case "logical":
					tokenString = formatStr(replaceTokenTmpl(options.tmplLogical), tokenString, indent, lineBreak);
					break;
				case "argument":
					if (lastToken.type !== "argument") tokenString = formatStr(replaceTokenTmpl(options.tmplArgument), tokenString, indent, lineBreak);
					else tokenString = formatStr(replaceTokenTmpl("{{autoindent}}" + options.tmplArgument), tokenString, indent, lineBreak);
					break;
				case "subexpression":
					if (token.subtype.toString() === "start") tokenString = formatStr(replaceTokenTmpl(options.tmplSubexpressionStart), tokenString, indent, lineBreak);
					else tokenString = formatStr(replaceTokenTmpl(options.tmplSubexpressionStop), tokenString, indent, lineBreak);
					break;
				default: break;
			}
			return tokenString;
		}
		var formatFormula = excelFormulaUtilities$1.formatFormula = function(formula, options) {
			formula = formula.replace(/^\s*=\s+/, "=");
			var defaultOptions = {
				tmplFunctionStart: "{{autoindent}}{{token}}(\n",
				tmplFunctionStop: "\n{{autoindent}}{{token}})",
				tmplOperandError: " {{token}}",
				tmplOperandRange: "{{autoindent}}{{token}}",
				tmplLogical: "{{token}}{{autolinebreak}}",
				tmplOperandLogical: "{{autoindent}}{{token}}",
				tmplOperandNumber: "{{autoindent}}{{token}}",
				tmplOperandText: "{{autoindent}}\"{{token}}\"",
				tmplArgument: "{{token}}\n",
				tmplOperandOperatorInfix: " {{token}}{{autolinebreak}}",
				tmplFunctionStartArray: "",
				tmplFunctionStartArrayRow: "{",
				tmplFunctionStopArrayRow: "}",
				tmplFunctionStopArray: "",
				tmplSubexpressionStart: "{{autoindent}}(\n",
				tmplSubexpressionStop: "\n)",
				tmplIndentTab: "	",
				tmplIndentSpace: " ",
				autoLineBreak: "TOK_TYPE_FUNCTION | TOK_TYPE_ARGUMENT | TOK_SUBTYPE_LOGICAL | TOK_TYPE_OP_IN ",
				newLine: "\n",
				customTokenRender: null,
				prefix: "",
				postfix: ""
			};
			if (options) options = core.extend(true, defaultOptions, options);
			else options = defaultOptions;
			var indentCount = 0;
			var indent_f = function() {
				var s = "", i = 0;
				for (; i < indentCount; i += 1) s += options.tmplIndentTab;
				return s;
			};
			var tokens = getTokens(formula);
			var outputFormula = "";
			var autoBreakArray = options.autoLineBreak.replace(/\s/gi, "").split("|");
			var isNewLine = true;
			var testAutoBreak = function(nextToken$1) {
				var i = 0;
				for (; i < autoBreakArray.length; i += 1) if (nextToken$1 !== null && typeof nextToken$1 !== "undefined" && (types[autoBreakArray[i]] === nextToken$1.type.toString() || types[autoBreakArray[i]] === nextToken$1.subtype.toString())) return true;
				return false;
			};
			var lastToken = null;
			while (tokens.moveNext()) {
				var token = tokens.current();
				var nextToken = tokens.next();
				if (token.subtype.toString() === TOK_SUBTYPE_STOP) indentCount -= indentCount > 0 ? 1 : 0;
				new RegExp("^" + options.newLine, "");
				var matchEndNewLine = new RegExp(options.newLine + "$", ""), autoBreak = testAutoBreak(nextToken), indent = isNewLine ? indent_f() : options.tmplIndentSpace, lineBreak = autoBreak ? options.newLine : "";
				outputFormula += applyTokenTemplate(token, options, indent, lineBreak, options.customTokenRender, lastToken);
				if (token.subtype.toString() === TOK_SUBTYPE_START) indentCount += 1;
				isNewLine = autoBreak || matchEndNewLine.test(outputFormula);
				lastToken = token;
			}
			outputFormula = options.prefix + trim(outputFormula) + options.postfix;
			return outputFormula;
		};
		excelFormulaUtilities$1.formatFormulaHTML = function(formula, options) {
			var tokRender = function(tokenStr, token, indent, lineBreak) {
				var outStr = tokenStr;
				switch (token.type.toString()) {
					case TOK_TYPE_OPERAND:
						if (token.subtype === TOK_SUBTYPE_TEXT) outStr = tokenStr.replace(/</gi, "&lt;").replace(/>/gi, "&gt;");
						break;
				}
				return {
					tokenString: outStr,
					useTemplate: true
				};
			};
			var defaultOptions = {
				tmplFunctionStart: "{{autoindent}}<span class=\"function\">{{token}}</span><span class=\"function_start\">(</span><br />",
				tmplFunctionStop: "<br />{{autoindent}}{{token}}<span class=\"function_stop\">)</span>",
				tmplOperandText: "{{autoindent}}<span class=\"quote_mark\">\"</span><span class=\"text\">{{token}}</span><span class=\"quote_mark\">\"</span>",
				tmplArgument: "{{token}}<br />",
				tmplSubexpressionStart: "{{autoindent}}(",
				tmplSubexpressionStop: " )",
				tmplIndentTab: "<span class=\"tabbed\">&nbsp;&nbsp;&nbsp;&nbsp;</span>",
				tmplIndentSpace: "&nbsp;",
				newLine: "<br />",
				autoLineBreak: "TOK_TYPE_FUNCTION | TOK_TYPE_ARGUMENT | TOK_SUBTYPE_LOGICAL | TOK_TYPE_OP_IN ",
				trim: true,
				prefix: "=",
				customTokenRender: tokRender
			};
			if (options) options = core.extend(true, defaultOptions, options);
			else options = defaultOptions;
			return formatFormula(formula, options);
		};
		var formula2CSharp = excelFormulaUtilities$1.formula2CSharp = function(formula, options) {
			var functionStack = [];
			var tokRender = function(tokenStr, token, indent, lineBreak) {
				var outStr = "", tokenString = tokenStr, directConversionMap = {
					"=": "==",
					"<>": "!=",
					"MIN": "Math.min",
					"MAX": "Math.max",
					"ABS": "Math.abs",
					"SUM": "",
					"IF": "",
					"&": "+",
					"AND": "",
					"OR": ""
				}, currentFunctionOnStack = functionStack[functionStack.length - 1], useTemplate = false;
				switch (token.type.toString()) {
					case TOK_TYPE_FUNCTION:
						switch (token.subtype) {
							case TOK_SUBTYPE_START:
								functionStack.push({
									name: tokenString,
									argumentNumber: 0
								});
								outStr = typeof directConversionMap[tokenString.toUpperCase()] === "string" ? directConversionMap[tokenString.toUpperCase()] : tokenString;
								useTemplate = true;
								break;
							case TOK_SUBTYPE_STOP:
								useTemplate = true;
								switch (currentFunctionOnStack.name.toLowerCase()) {
									case "if":
										outStr = currentFunctionOnStack.argumentNumber === 1 ? ":0)" : ")";
										useTemplate = false;
										break;
									default:
										outStr = typeof directConversionMap[tokenString.toUpperCase()] === "string" ? directConversionMap[tokenString.toUpperCase()] : tokenString;
										break;
								}
								functionStack.pop();
								break;
						}
						break;
					case TOK_TYPE_ARGUMENT:
						switch (currentFunctionOnStack.name.toLowerCase()) {
							case "if":
								switch (currentFunctionOnStack.argumentNumber) {
									case 0:
										outStr = "?";
										break;
									case 1:
										outStr = ":";
										break;
								}
								break;
							case "sum":
								outStr = "+";
								break;
							case "and":
								outStr = "&&";
								break;
							case "or":
								outStr = "||";
								break;
							default:
								outStr = typeof directConversionMap[tokenString.toUpperCase()] === "string" ? directConversionMap[tokenString.toUpperCase()] : tokenString;
								useTemplate = true;
								break;
						}
						currentFunctionOnStack.argumentNumber += 1;
						break;
					case TOK_TYPE_OPERAND: switch (token.subtype) {
						case TOK_SUBTYPE_RANGE:
							if (!currentFunctionOnStack) break;
							switch (currentFunctionOnStack.name.toLowerCase()) {
								case "sum":
									if (RegExp(":", "gi").test(tokenString)) outStr = breakOutRanges(tokenString, "+");
									else outStr = tokenString;
									break;
								case "and":
									if (RegExp(":", "gi").test(tokenString)) outStr = breakOutRanges(tokenString, "&&");
									else outStr = tokenString;
									break;
								case "or":
									if (RegExp(":", "gi").test(tokenString)) outStr = breakOutRanges(tokenString, "||");
									else outStr = tokenString;
									break;
								default:
									if (RegExp(":", "gi").test(tokenString)) outStr = "[" + breakOutRanges(tokenString, ",") + "]";
									else outStr = tokenString;
									break;
							}
							break;
						default: break;
					}
					default:
						if (outStr === "") outStr = typeof directConversionMap[tokenString.toUpperCase()] === "string" ? directConversionMap[tokenString.toUpperCase()] : tokenString;
						useTemplate = true;
						break;
				}
				return {
					tokenString: outStr,
					useTemplate
				};
			};
			var defaultOptions = {
				tmplFunctionStart: "{{token}}(",
				tmplFunctionStop: "{{token}})",
				tmplOperandError: "{{token}}",
				tmplOperandRange: "{{token}}",
				tmplOperandLogical: "{{token}}",
				tmplOperandNumber: "{{token}}",
				tmplOperandText: "\"{{token}}\"",
				tmplArgument: "{{token}}",
				tmplOperandOperatorInfix: "{{token}}",
				tmplFunctionStartArray: "",
				tmplFunctionStartArrayRow: "{",
				tmplFunctionStopArrayRow: "}",
				tmplFunctionStopArray: "",
				tmplSubexpressionStart: "(",
				tmplSubexpressionStop: ")",
				tmplIndentTab: "	",
				tmplIndentSpace: " ",
				autoLineBreak: "TOK_SUBTYPE_STOP | TOK_SUBTYPE_START | TOK_TYPE_ARGUMENT",
				trim: true,
				customTokenRender: tokRender
			};
			if (options) options = core.extend(true, defaultOptions, options);
			else options = defaultOptions;
			return formatFormula(formula, options);
		};
		excelFormulaUtilities$1.formula2JavaScript = function(formula, options) {
			return formula2CSharp(formula, options).replace("==", "===");
		};
		excelFormulaUtilities$1.formula2Python = function(formula, options) {
			var functionStack = [];
			var tokRender = function(tokenStr, token, indent, lineBreak) {
				var outStr = "", tokenString = tokenStr, directConversionMap = {
					"=": "==",
					"<>": "!=",
					"MIN": "min",
					"MAX": "max",
					"ABS": "math.fabs",
					"SUM": "",
					"IF": "",
					"&": "+",
					"AND": "",
					"OR": "",
					"NOT": "!",
					"TRUE": "True",
					"FALSE": "False"
				}, currentFunctionOnStack = functionStack[functionStack.length - 1], useTemplate = false;
				switch (token.type.toString()) {
					case TOK_TYPE_FUNCTION:
						switch (token.subtype) {
							case TOK_SUBTYPE_START:
								functionStack.push({
									name: tokenString,
									argumentNumber: 0
								});
								outStr = typeof directConversionMap[tokenString.toUpperCase()] === "string" ? directConversionMap[tokenString.toUpperCase()] : tokenString;
								useTemplate = true;
								break;
							case TOK_SUBTYPE_STOP:
								useTemplate = true;
								switch (currentFunctionOnStack.name.toLowerCase()) {
									case "if":
										outStr = ",))[0]";
										if (currentFunctionOnStack.argumentNumber === 1) outStr = " or (0" + outStr;
										useTemplate = false;
										break;
									default:
										outStr = typeof directConversionMap[tokenString.toUpperCase()] === "string" ? directConversionMap[tokenString.toUpperCase()] : tokenString;
										break;
								}
								functionStack.pop();
								break;
						}
						break;
					case TOK_TYPE_ARGUMENT:
						switch (currentFunctionOnStack.name.toLowerCase()) {
							case "if":
								switch (currentFunctionOnStack.argumentNumber) {
									case 0:
										outStr = " and (";
										break;
									case 1:
										outStr = ",) or (";
										break;
								}
								break;
							case "sum":
								outStr = "+";
								break;
							case "and":
								outStr = " and ";
								break;
							case "or":
								outStr = " or ";
								break;
							default:
								outStr = typeof directConversionMap[tokenString.toUpperCase()] === "string" ? directConversionMap[tokenString.toUpperCase()] : tokenString;
								useTemplate = true;
								break;
						}
						currentFunctionOnStack.argumentNumber += 1;
						break;
					case TOK_TYPE_OPERAND: switch (token.subtype) {
						case TOK_SUBTYPE_RANGE:
							if (!currentFunctionOnStack) break;
							if (RegExp("true|false", "gi").test(tokenString)) {
								outStr = typeof directConversionMap[tokenString.toUpperCase()] === "string" ? directConversionMap[tokenString.toUpperCase()] : tokenString;
								break;
							}
							switch (currentFunctionOnStack.name.toLowerCase()) {
								case "sum":
									if (RegExp(":", "gi").test(tokenString)) outStr = breakOutRanges(tokenString, "+");
									else outStr = tokenString;
									break;
								case "and":
									if (RegExp(":", "gi").test(tokenString)) outStr = breakOutRanges(tokenString, " and ");
									else outStr = tokenString;
									break;
								case "or":
									if (RegExp(":", "gi").test(tokenString)) outStr = breakOutRanges(tokenString, " or ");
									else outStr = tokenString;
									break;
								default:
									if (RegExp(":", "gi").test(tokenString)) outStr = "[" + breakOutRanges(tokenString, ",") + "]";
									else outStr = tokenString;
									break;
							}
							break;
						default: break;
					}
					default:
						if (outStr === "") outStr = typeof directConversionMap[tokenString.toUpperCase()] === "string" ? directConversionMap[tokenString.toUpperCase()] : tokenString;
						useTemplate = true;
						break;
				}
				return {
					tokenString: outStr,
					useTemplate
				};
			};
			var defaultOptions = {
				tmplFunctionStart: "{{token}}(",
				tmplFunctionStop: "{{token}})",
				tmplOperandError: "{{token}}",
				tmplOperandRange: "{{token}}",
				tmplOperandLogical: "{{token}}",
				tmplOperandNumber: "{{token}}",
				tmplOperandText: "\"{{token}}\"",
				tmplArgument: "{{token}}",
				tmplOperandOperatorInfix: "{{token}}",
				tmplFunctionStartArray: "",
				tmplFunctionStartArrayRow: "{",
				tmplFunctionStopArrayRow: "}",
				tmplFunctionStopArray: "",
				tmplSubexpressionStart: "(",
				tmplSubexpressionStop: ")",
				tmplIndentTab: "	",
				tmplIndentSpace: " ",
				autoLineBreak: "TOK_SUBTYPE_STOP | TOK_SUBTYPE_START | TOK_TYPE_ARGUMENT",
				trim: true,
				customTokenRender: tokRender
			};
			if (options) options = core.extend(true, defaultOptions, options);
			else options = defaultOptions;
			return formatFormula(formula, options);
		};
		excelFormulaUtilities$1.getTokens = getTokens;
	})(window || module.exports || {});
}));
var import_excel_formula = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var xl;
		require_core();
		require_ExcelFormulaUtilities();
		xl = excelFormulaUtilities;
		module.exports = {
			getTokens: function(f) {
				return xl.getTokens(f).items;
			},
			formatFormula: function(f, opts) {
				return xl.formatFormula(f, opts);
			},
			formatFormulaHTML: xl.formatFormulaHTML,
			toJavaScript: xl.formula2JavaScript,
			toCSharp: xl.formula2CSharp,
			toPython: xl.formula2Python
		};
	}).call(exports);
})))(), 1);
function insertField(editor, field$1) {
	return insertText(editor, `[${field$1.name}]`);
}
function insertSymbol(editor, symbol) {
	return insertText(editor, symbol);
}
function insertText(editor, text) {
	const state = editor.state;
	const from = state.selection.main.from;
	const to = state.selection.main.to;
	editor.dispatch({ changes: {
		from,
		to,
		insert: text
	} });
	editor.dispatch({ selection: { anchor: from + text.length } });
	editor.focus();
}
function reformatFormula(editor) {
	let code = editor.state.doc.toString();
	code = code.replace(/\s*$/, "");
	code = import_excel_formula.formatFormula(code, {
		autoLineBreak: "",
		newLine: " "
	});
	code = code.replace(/! =/g, "!=");
	code = code.replace(/\s+/g, " ");
	editor.dispatch({ changes: {
		from: 0,
		to: editor.state.doc.length,
		insert: code
	} });
}
function generateColors() {
	return [
		"red",
		"orange",
		"yellow",
		"green",
		"blue",
		"indigo",
		"violet"
	];
}
var rainbowBracketsPlugin = ViewPlugin.fromClass(class {
	decorations;
	constructor(view) {
		this.decorations = this.getBracketDecorations(view);
	}
	update(update) {
		if (update.docChanged || update.selectionSet || update.viewportChanged) this.decorations = this.getBracketDecorations(update.view);
	}
	getBracketDecorations(view) {
		const { doc } = view.state;
		const decorations = [];
		const stack = [];
		const colors = generateColors();
		for (let pos = 0; pos < doc.length; pos += 1) {
			const char = doc.sliceString(pos, pos + 1);
			if (char === "(" || char === "[" || char === "{") stack.push({
				type: char,
				from: pos
			});
			else if (char === ")" || char === "]" || char === "}") {
				const open = stack.pop();
				if (open && open.type === this.getMatchingBracket(char)) {
					const color = colors[stack.length % colors.length];
					decorations.push(Decoration.mark({ class: `rainbow-bracket-${color}` }).range(open.from, open.from + 1), Decoration.mark({ class: `rainbow-bracket-${color}` }).range(pos, pos + 1));
				}
			}
		}
		decorations.sort((a, b) => a.from - b.from || a.startSide - b.startSide);
		return Decoration.set(decorations);
	}
	getMatchingBracket(closingBracket) {
		switch (closingBracket) {
			case ")": return "(";
			case "]": return "[";
			case "}": return "{";
			default: return null;
		}
	}
}, { decorations: (v) => v.decorations });
function rainbowBrackets() {
	return [rainbowBracketsPlugin, EditorView.baseTheme({
		".rainbow-bracket-red": { color: "red" },
		".rainbow-bracket-red > span": { color: "red" },
		".rainbow-bracket-orange": { color: "orange" },
		".rainbow-bracket-orange > span": { color: "orange" },
		".rainbow-bracket-yellow": { color: "yellow" },
		".rainbow-bracket-yellow > span": { color: "yellow" },
		".rainbow-bracket-green": { color: "green" },
		".rainbow-bracket-green > span": { color: "green" },
		".rainbow-bracket-blue": { color: "blue" },
		".rainbow-bracket-blue > span": { color: "blue" },
		".rainbow-bracket-indigo": { color: "indigo" },
		".rainbow-bracket-indigo > span": { color: "indigo" },
		".rainbow-bracket-violet": { color: "violet" },
		".rainbow-bracket-violet > span": { color: "violet" }
	})];
}
const myHighlightStyle = HighlightStyle.define([
	{
		tag: tags.name,
		class: "cm-name"
	},
	{
		tag: tags.bool,
		class: "cm-bool"
	},
	{
		tag: tags.arithmeticOperator,
		class: "cm-operator"
	},
	{
		tag: tags.number,
		class: "cm-number"
	},
	{
		tag: tags.paren,
		class: "cm-paren"
	}
]);
var formulaLinter = ({ known_identifiers, known_tables }) => {
	return linter((view) => {
		const known_identifiers_lowercase = known_identifiers.map((x) => x.toLowerCase());
		const diagnostics = [];
		syntaxTree(view.state).cursor().iterate((node) => {
			if (node.name == "CallExpression") {
				let seen_function = false;
				let function_name = "";
				node.node.cursor().iterate((call_node) => {
					const node_value = view.state.sliceDoc(call_node.from, call_node.to).toLowerCase();
					if (call_node.name === "VariableName" && !seen_function) {
						function_name = node_value;
						seen_function = true;
					}
					if (call_node.name == "String" && function_name === "grid") {
						const grid_name = view.state.sliceDoc(call_node.from + 1, call_node.to - 1);
						if (!known_tables.includes(grid_name)) diagnostics.push({
							from: call_node.from + 1,
							to: call_node.to - 1,
							severity: "error",
							message: "Unknown table name",
							actions: [{
								name: "Remove",
								apply(view$1, from, to) {
									view$1.dispatch({ changes: {
										from,
										to: to - 1
									} });
								}
							}]
						});
					}
				});
			}
			if (node.name == "VariableName" || node.name == "VariableDefinition") {
				const node_value = view.state.sliceDoc(node.from, node.to).toLowerCase();
				if (!known_identifiers_lowercase.includes(node_value)) diagnostics.push({
					from: node.from,
					to: node.to,
					severity: "error",
					message: "Unknown identifier",
					actions: [{
						name: "Remove",
						apply(view$1, from, to) {
							view$1.dispatch({ changes: {
								from,
								to: to - 1
							} });
						}
					}]
				});
			}
		});
		return diagnostics;
	});
};
async function initEditor({ parent, code, fields, tables, placeholder: placeholder$1, form, callback }) {
	const all_fields = [
		...fields,
		"changed",
		"quantity",
		"product_price",
		"product_weight"
	];
	return new EditorView({
		doc: code,
		extensions: [
			minimalSetup,
			keymap.of([indentAndCompletionWithTab]),
			syntaxHighlighting(myHighlightStyle),
			rainbowBrackets(),
			...fieldsHighlighting(all_fields),
			tabObservable(),
			EditorView.lineWrapping,
			javascript(),
			placeholder(placeholder$1 ?? ""),
			autocompletion({
				override: [functions(completions), variables(all_fields)],
				tooltipClass: () => "cm-tooltip"
			}),
			tooltips({ parent: document.body }),
			EditorView.updateListener.of((v) => {
				callback(v.state.doc.toString());
			}),
			formulaLinter({
				known_identifiers: [
					...all_fields,
					...supported_functions,
					...custom_functions
				],
				known_tables: tables
			}),
			Prec.highest(keymap.of([{
				key: "Cmd-Enter",
				run: (view) => {
					reformatFormula(view);
					let form_el;
					if (form) form_el = document.getElementById(form);
					else form_el = parent.closest("form");
					if (form_el) {
						const submitter = form_el.querySelector("button[data-ctrl-enter]");
						form_el.requestSubmit(submitter);
						return true;
					}
					return true;
				}
			}]))
		],
		parent
	});
}
var bracketColors = [
	"rainbow-bracket-red",
	"rainbow-bracket-orange",
	"rainbow-bracket-yellow",
	"rainbow-bracket-green",
	"rainbow-bracket-blue",
	"rainbow-bracket-indigo",
	"rainbow-bracket-violet"
];
function highlight(code) {
	const result = document.createElement("pre");
	let bracketDepth = 0;
	function emit(text, classes) {
		const chars = text.split("");
		for (const char of chars) {
			let charClasses = classes;
			if (char === "(" || char === "[" || char === "{") {
				const colorClass = bracketColors[bracketDepth % bracketColors.length];
				charClasses = charClasses ? `${charClasses} ${colorClass}` : colorClass;
				bracketDepth++;
			} else if (char === ")" || char === "]" || char === "}") {
				bracketDepth--;
				const colorClass = bracketColors[bracketDepth % bracketColors.length];
				charClasses = charClasses ? `${charClasses} ${colorClass}` : colorClass;
			}
			if (charClasses) {
				const node = document.createTextNode(char);
				const span = document.createElement("span");
				span.appendChild(node);
				span.className = charClasses;
				result.appendChild(span);
			} else result.appendChild(document.createTextNode(char));
		}
	}
	function emitBreak() {
		result.appendChild(document.createTextNode("\n"));
	}
	highlightCode(code, parser.parse(code), myHighlightStyle, emit, emitBreak);
	return result.innerHTML;
}
export { reformatFormula as a, insertSymbol as i, initEditor as n, insertField as r, highlight as t };
