/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"dp-module-form": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["dp_jsonpFunction"] = window["dp_jsonpFunction"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./views/ts/admin/module-form.ts","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./views/scss/admin/module-form.scss":
/*!*******************************************!*\
  !*** ./views/scss/admin/module-form.scss ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./views/ts/adapter/Adapter.ts":
/*!*************************************!*\
  !*** ./views/ts/adapter/Adapter.ts ***!
  \*************************************/
/*! exports provided: Adapter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Adapter", function() { return Adapter; });
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @decorators/autobind */ "./views/ts/decorators/autobind.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class Adapter {
    constructor() {
        if (typeof window.TnModules === "undefined") {
            const modules = {
                list: [],
                modules: {},
                prices: {},
                locks: {
                    price: false,
                    cart: false,
                    scroll: false,
                },
                customization: null
            };
            window.TnModules = modules;
        }
        this.registerEvents();
    }
    getData() {
        return {
            prices: TnModules.prices
        };
    }
    registerEvents() {
        if (typeof prestashop === "object" && typeof prestashop.on === "function") {
            prestashop.on("updateCart", this.handleAddedToCart);
        }
    }
    registerModule(dp_id_module, data) {
        if (TnModules.list.indexOf(dp_id_module) === -1) {
            TnModules.modules[dp_id_module] = data;
            TnModules.list.push(dp_id_module);
        }
    }
    registerModuleCallback(id_module, callback) {
        TnModules.modules[id_module].customization_callback = callback;
    }
    registerSyncCallback(id_module, callback) {
        TnModules.modules[id_module].sync_callback = callback;
    }
    registerResponseCallback(id_module, callback) {
        TnModules.modules[id_module].response_callback = callback;
    }
    handleAddedToCart() {
        this.release("cart");
    }
    isEnabled() {
        return TnModules.list.length > 1;
    }
    setModulePrices(id_module, customization_prices) {
        TnModules.prices[id_module] = customization_prices;
    }
    setModuleResponse(id_current_module, response) {
        for (const id_module of TnModules.list) {
            if (id_module !== id_current_module) {
                const moduleData = TnModules.modules[id_module];
                if (moduleData.response_callback) {
                    moduleData.response_callback(response);
                }
            }
        }
    }
    lock(lock_name) {
        TnModules.locks[lock_name] = true;
    }
    release(lock_name) {
        TnModules.locks[lock_name] = false;
    }
    lockRelease(lock_name) {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (!TnModules.locks[lock_name]) {
                    resolve();
                    clearInterval(interval);
                }
            }, 100);
        });
    }
    isLocked(lock_name) {
        return TnModules.locks[lock_name];
    }
    acquireCartLock() {
        if (this.isLocked("cart")) {
            return false;
        }
        this.lock("cart");
        return true;
    }
    saveCustomization(response) {
        TnModules.customization = {
            id_module: response.id_module,
            id_customizations: response.id_customizations,
        };
    }
    addCustomizationData(data) {
        if (TnModules.customization) {
            data.id_customizations = TnModules.customization.id_customizations;
        }
    }
    clearCustomization() {
        TnModules.customization = null;
    }
    saveCustomizations(current_id_module) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const id_module of TnModules.list) {
                if (id_module !== current_id_module) {
                    const moduleData = TnModules.modules[id_module];
                    if (moduleData.customization_callback) {
                        const result = yield moduleData.customization_callback();
                        if (!result) {
                            return false;
                        }
                    }
                }
            }
            return true;
        });
    }
    notifyValueChange(current_id_module, name, value) {
        for (const id_module of TnModules.list) {
            if (id_module !== current_id_module) {
                const moduleData = TnModules.modules[id_module];
                if (moduleData.sync_callback) {
                    moduleData.sync_callback(name, value);
                }
            }
        }
    }
    scrollToFirstError() {
        if (this.isLocked("scroll")) {
            return false;
        }
        this.lock("scroll");
        const element = $(".tn_invalid:eq(0)").get(0);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            this.release("scroll");
        }
    }
}
__decorate([
    Object(_decorators_autobind__WEBPACK_IMPORTED_MODULE_0__["autobind"])(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Adapter.prototype, "handleAddedToCart", null);


/***/ }),

/***/ "./views/ts/admin/module-form.ts":
/*!***************************************!*\
  !*** ./views/ts/admin/module-form.ts ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _views_scss_admin_module_form_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @views/scss/admin/module-form.scss */ "./views/scss/admin/module-form.scss");
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entry */ "./views/ts/entry.ts");
/* harmony import */ var _module_form_module_form_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module-form/module-form-bootstrap */ "./views/ts/admin/module-form/module-form-bootstrap.ts");
/* harmony import */ var _module_form_module_form_starter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./module-form/module-form-starter */ "./views/ts/admin/module-form/module-form-starter.ts");




const moduleFormBootstrap = new _module_form_module_form_bootstrap__WEBPACK_IMPORTED_MODULE_2__["ModuleFormBootstrap"]();
const moduleFormStarter = new _module_form_module_form_starter__WEBPACK_IMPORTED_MODULE_3__["ModuleFormStarter"]();
moduleFormBootstrap.bootstrap(moduleFormStarter);


/***/ }),

/***/ "./views/ts/admin/module-form/module-form-bootstrap.ts":
/*!*************************************************************!*\
  !*** ./views/ts/admin/module-form/module-form-bootstrap.ts ***!
  \*************************************************************/
/*! exports provided: ModuleFormBootstrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModuleFormBootstrap", function() { return ModuleFormBootstrap; });
/* harmony import */ var _plugins_lang_jquery_dp_lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../plugins/lang/jquery.dp_lang */ "./views/ts/plugins/lang/jquery.dp_lang.js");
/* harmony import */ var _plugins_lang_jquery_dp_lang__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_lang_jquery_dp_lang__WEBPACK_IMPORTED_MODULE_0__);

class ModuleFormBootstrap {
    bootstrap(starter) {
        this.starter = starter;
        this.init();
        this.detectDocumentReady();
        this.detectWindowLoad();
    }
    init() {
        this.document = $(document);
        this.window = $(window);
    }
    detectDocumentReady() {
        this.document.ready(() => this.starter.handleDocumentReady());
    }
    detectWindowLoad() {
        this.window.on("load", () => this.starter.handleWindowLoad());
    }
}


/***/ }),

/***/ "./views/ts/admin/module-form/module-form-starter.ts":
/*!***********************************************************!*\
  !*** ./views/ts/admin/module-form/module-form-starter.ts ***!
  \***********************************************************/
/*! exports provided: ModuleFormStarter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModuleFormStarter", function() { return ModuleFormStarter; });
/* harmony import */ var _tools_ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tools/ajax */ "./views/ts/tools/ajax.ts");
/* harmony import */ var _tools_messenger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tools/messenger */ "./views/ts/tools/messenger.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class ModuleFormStarter {
    constructor() {
        this.ajax = new _tools_ajax__WEBPACK_IMPORTED_MODULE_0__["Ajax"]();
        this.messenger = new _tools_messenger__WEBPACK_IMPORTED_MODULE_1__["Messenger"]();
    }
    handleDocumentReady() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initModuleForm();
            this.initConfigForm();
        });
    }
    handleWindowLoad() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    initModuleForm() {
        $(document).dpLang();
    }
    initConfigForm() {
        $("#configuration_form").on("change", "input", (event) => __awaiter(this, void 0, void 0, function* () {
            const input = event.currentTarget;
            const name = input.name;
            const value = input.value;
            const data = {
                model: "config",
                action: "save_input_value",
                name: name,
                value: value
            };
            const response = yield this.ajax.send(data);
            this.messenger.showMessage(response);
        }));
    }
}


/***/ }),

/***/ "./views/ts/decorators/autobind.ts":
/*!*****************************************!*\
  !*** ./views/ts/decorators/autobind.ts ***!
  \*****************************************/
/*! exports provided: autobind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autobind", function() { return autobind; });
function autobind() {
    return (target, key, descriptor) => {
        let fn = descriptor.value;
        if (typeof fn !== "function") {
            throw new TypeError(`@boundMethod decorator can only be applied to methods not: ${typeof fn}`);
        }
        // In IE11 calling Object.defineProperty has a side-effect of evaluating the
        // getter for the property which is being replaced. This causes infinite
        // recursion and an "Out of stack space" error.
        let definingProperty = false;
        return {
            configurable: true,
            get() {
                // eslint-disable-next-line no-prototype-builtins
                if (definingProperty || this === target.prototype || this.hasOwnProperty(key) ||
                    typeof fn !== "function") {
                    return fn;
                }
                const boundFn = fn.bind(this);
                definingProperty = true;
                Object.defineProperty(this, key, {
                    configurable: true,
                    get() {
                        return boundFn;
                    },
                    set(value) {
                        fn = value;
                        delete this[key];
                    }
                });
                definingProperty = false;
                return boundFn;
            },
            set(value) {
                fn = value;
            }
        };
    };
}


/***/ }),

/***/ "./views/ts/plugins/lang/jquery.dp_lang.js":
/*!*************************************************!*\
  !*** ./views/ts/plugins/lang/jquery.dp_lang.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function ( $ ) {

	$.fn.dpLang = function(){

		function expandLangs(event)
		{
			if(event.type == 'focusin'){
				var count = $(this).find('.dp_lang').length;
				if (count > 1 || true) {
					$(this).addClass('expanded');
				}
				$('.dp_lang_container.expanded').not(this).removeClass('expanded');
			}else if($(event.currentTarget).is('html')){
				$('.dp_lang_container.expanded').removeClass('expanded');
			}
		}

		function collapseLangs(event)
		{
			if(event.keyCode == 27){
				$(this).closest('.dp_lang_container').removeClass('expanded');
			}
		}

		var handled = !!$('html').data('dp_handled');
		if (!handled){
			$(document).on('focus', '.dp_lang_container', expandLangs)
			.on('click', '.dp_lang_container', function(event){
				event.stopPropagation();
			})
			.on('keyup', '.dp_lang input', collapseLangs);

			$('html').click(expandLangs).data('dp_handled', true);
		}

		$('.dp_lang_container').on('click', function(){
			event.stopPropagation();
		});

	};

	}( jQuery ));

/***/ }),

/***/ "./views/ts/tools/ajax.ts":
/*!********************************!*\
  !*** ./views/ts/tools/ajax.ts ***!
  \********************************/
/*! exports provided: Ajax */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ajax", function() { return Ajax; });
/* harmony import */ var _tools_messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tools/messenger */ "./views/ts/tools/messenger.ts");
/* harmony import */ var _views_ts_adapter_Adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @views/ts/adapter/Adapter */ "./views/ts/adapter/Adapter.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const lockMap = {
    "calculateResult": "price",
};
class Ajax {
    constructor() {
        this.requests = {};
        this.messenger = new _tools_messenger__WEBPACK_IMPORTED_MODULE_0__["Messenger"]();
        this.adapter = new _views_ts_adapter_Adapter__WEBPACK_IMPORTED_MODULE_1__["Adapter"]();
    }
    send(data, can_throw = false, abort_key = null) {
        const promise = $.Deferred();
        const xhr = $.ajax({
            data: data,
            dataType: "json",
            method: "post",
            url: this.getController(data.model)
        });
        if (abort_key) {
            this.abortPreviousRequests(abort_key, xhr);
        }
        $.when(xhr).then((response) => {
            this.clearAbortKey(abort_key);
            if (response.error && can_throw) {
                promise.reject(new Error(response.message));
            }
            promise.resolve(response);
        }).fail(() => {
            promise.resolve();
        });
        return promise;
    }
    getController(model) {
        const var_name = `dp_${model}`;
        if (typeof window[var_name] !== "undefined") {
            return window[var_name];
        }
        throw new Error("controller not found");
    }
    sendWithMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.send(data);
            this.messenger.showMessage(response);
            return response;
        });
    }
    abortPreviousRequests(abort_key, Xhr = null) {
        if (this.requests[abort_key]) {
            if (lockMap[abort_key]) {
                this.adapter.release(lockMap[abort_key]);
            }
            this.requests[abort_key].abort();
        }
        if (Xhr) {
            this.requests[abort_key] = Xhr;
        }
    }
    clearAbortKey(abort_key) {
        this.requests[abort_key] = null;
    }
}


/***/ }),

/***/ "./views/ts/tools/messenger.ts":
/*!*************************************!*\
  !*** ./views/ts/tools/messenger.ts ***!
  \*************************************/
/*! exports provided: Messenger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Messenger", function() { return Messenger; });
class Messenger {
    showSuccessMessage(message) {
        showSuccessMessage(message);
    }
    showErrorMessage(message) {
        showErrorMessage(message);
    }
    showMessage(response) {
        if (response.success) {
            this.showSuccessMessage(response.message || dpa_message.success);
        }
        else {
            this.showErrorMessage(response.message || dpa_message.error);
        }
    }
}


/***/ })

/******/ });
//# sourceMappingURL=dp-module-form-b8800bb6832a80e9bf54.js.map