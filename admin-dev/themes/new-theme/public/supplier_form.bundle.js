window.supplier_form=function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=533)}({0:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},1:function(e,t,n){"use strict";t.__esModule=!0;var i=n(19),r=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),(0,r.default)(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}()},10:function(e,t,n){var i=n(6),r=n(12);e.exports=n(2)?function(e,t,n){return i.f(e,t,r(1,n))}:function(e,t,n){return e[t]=n,e}},11:function(e,t,n){var i=n(4);e.exports=function(e){if(!i(e))throw TypeError(e+" is not an object!");return e}},12:function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},13:function(e,t,n){var i=n(4);e.exports=function(e,t){if(!i(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!i(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!i(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!i(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")}},131:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=i(r),a=n(1),s=i(a),u=n(36),l=window.$,c=function(){function e(t){(0,o.default)(this,e),t=t||{},this.localeButtonSelector=t.localeButtonSelector||'.translationsLocales.nav .nav-item a[data-toggle="tab"]',this.localeNavigationSelector=t.localeNavigationSelector||".translationsLocales.nav",l("body").on("shown.bs.tab",this.localeButtonSelector,this.toggleLanguage.bind(this)),u.EventEmitter.on("languageSelected",this.toggleFields.bind(this))}return(0,s.default)(e,[{key:"toggleLanguage",value:function(e){var t=l(e.target),n=t.closest("form");u.EventEmitter.emit("languageSelected",{selectedLocale:t.data("locale"),form:n})}},{key:"toggleFields",value:function(e){l(this.localeNavigationSelector).each(function(t,n){var i=l(".nav-item a.active",n),r=i.data("locale");e.selectedLocale!==r&&l('.nav-item a[data-locale="'+e.selectedLocale+'"]',n).tab("show")})}}]),e}();t.default=c},139:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=i(r),a=n(1),s=i(a),u=window.$,l=function(){function e(t,n,i){var r=this;(0,o.default)(this,e),this.$countryDniInput=u(n),this.$countryDniInputLabel=u(i),this.$countryInput=u(t),this.countryInputSelectedSelector=t+">option:selected",this.countryDniInputLabelDangerSelector=i+">span.text-danger",this.$countryDniInput.attr("required")||(this.$countryInput.on("change",function(){return r.toggle()}),this.toggle())}return(0,s.default)(e,[{key:"toggle",value:function(){u(this.countryDniInputLabelDangerSelector).remove(),this.$countryDniInput.prop("required",!1),1===parseInt(u(this.countryInputSelectedSelector).attr("need_dni"),10)&&(this.$countryDniInput.prop("required",!0),this.$countryDniInputLabel.prepend(u('<span class="text-danger">*</span>')))}}]),e}();t.default=l},140:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(67),o=i(r),a=n(0),s=i(a),u=n(1),l=i(u),c=window.$,f=function(){function e(t,n,i){var r=this;return(0,s.default)(this,e),this.$stateSelectionBlock=c(i),this.$countryStateSelector=c(n),this.$countryInput=c(t),this.$countryInput.on("change",function(){return r.change()}),{}}return(0,l.default)(e,[{key:"change",value:function(){var e=this,t=this.$countryInput.val();""!==t&&c.get({url:this.$countryInput.data("states-url"),dataType:"json",data:{id_country:t}}).then(function(t){e.$countryStateSelector.empty(),(0,o.default)(t.states).forEach(function(n){e.$countryStateSelector.append(c("<option></option>").attr("value",t.states[n]).text(n))}),e.toggle()}).catch(function(e){void 0!==e.responseJSON&&showErrorMessage(e.responseJSON.message)})}},{key:"toggle",value:function(){this.$countryStateSelector.find("option").length>0?(this.$stateSelectionBlock.fadeIn(),this.$stateSelectionBlock.removeClass("d-none")):this.$stateSelectionBlock.fadeOut()}}]),e}();t.default=f},15:function(e,t,n){var i=n(18);e.exports=function(e,t,n){if(i(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,i){return e.call(t,n,i)};case 3:return function(n,i,r){return e.call(t,n,i,r)}}return function(){return e.apply(t,arguments)}}},16:function(e,t,n){var i=n(4),r=n(5).document,o=i(r)&&i(r.createElement);e.exports=function(e){return o?r.createElement(e):{}}},17:function(e,t,n){e.exports=!n(2)&&!n(7)(function(){return 7!=Object.defineProperty(n(16)("div"),"a",{get:function(){return 7}}).a})},18:function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},19:function(e,t,n){e.exports={default:n(20),__esModule:!0}},2:function(e,t,n){e.exports=!n(7)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},20:function(e,t,n){n(21);var i=n(3).Object;e.exports=function(e,t,n){return i.defineProperty(e,t,n)}},21:function(e,t,n){var i=n(8);i(i.S+i.F*!n(2),"Object",{defineProperty:n(6).f})},22:function(e,t,n){var i=n(51),r=n(38);e.exports=function(e){return i(r(e))}},27:function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},3:function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},34:function(e,t,n){var i=n(55),r=n(49);e.exports=Object.keys||function(e){return i(e,r)}},36:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.EventEmitter=void 0;var i=n(53),r=function(e){return e&&e.__esModule?e:{default:e}}(i);t.EventEmitter=new r.default},38:function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},39:function(e,t){var n=Math.ceil,i=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?i:n)(e)}},4:function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},422:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
t.default={supplierCountrySelect:"#supplier_id_country",supplierStateSelect:"#supplier_id_state",supplierStateBlock:".js-supplier-state",supplierDniInput:"#supplier_dni",supplierDniInputLabel:'label[for="supplier_dni"]'}},43:function(e,t){var n=0,i=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+i).toString(36))}},44:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=i(r),a=n(1),s=i(a),u=n(36),l=window.$,c=function(){function e(t){(0,o.default)(this,e),t=t||{},this.localeItemSelector=t.localeItemSelector||".js-locale-item",this.localeButtonSelector=t.localeButtonSelector||".js-locale-btn",this.localeInputSelector=t.localeInputSelector||".js-locale-input",l("body").on("click",this.localeItemSelector,this.toggleLanguage.bind(this)),u.EventEmitter.on("languageSelected",this.toggleInputs.bind(this))}return(0,s.default)(e,[{key:"toggleLanguage",value:function(e){var t=l(e.target),n=t.closest("form");u.EventEmitter.emit("languageSelected",{selectedLocale:t.data("locale"),form:n})}},{key:"toggleInputs",value:function(e){var t=e.form,n=e.selectedLocale,i=t.find(this.localeButtonSelector),r=i.data("change-language-url");i.text(n),t.find(this.localeInputSelector).addClass("d-none"),t.find(this.localeInputSelector+".js-locale-"+n).removeClass("d-none"),r&&this._saveSelectedLanguage(r,n)}},{key:"_saveSelectedLanguage",value:function(e,t){l.post({url:e,data:{language_iso_code:t}})}}]),e}();t.default=c},46:function(e,t,n){var i=n(38);e.exports=function(e){return Object(i(e))}},47:function(e,t,n){var i=n(50)("keys"),r=n(43);e.exports=function(e){return i[e]||(i[e]=r(e))}},48:function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},49:function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},5:function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},50:function(e,t,n){var i=n(5),r=i["__core-js_shared__"]||(i["__core-js_shared__"]={});e.exports=function(e){return r[e]||(r[e]={})}},51:function(e,t,n){var i=n(48);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==i(e)?e.split(""):Object(e)}},52:function(e,t){t.f={}.propertyIsEnumerable},53:function(e,t,n){"use strict";function i(e){console&&console.warn&&console.warn(e)}function r(){r.init.call(this)}function o(e){return void 0===e._maxListeners?r.defaultMaxListeners:e._maxListeners}function a(e,t,n,r){var a,s,u;if("function"!=typeof n)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof n);if(s=e._events,void 0===s?(s=e._events=Object.create(null),e._eventsCount=0):(void 0!==s.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),s=e._events),u=s[t]),void 0===u)u=s[t]=n,++e._eventsCount;else if("function"==typeof u?u=s[t]=r?[n,u]:[u,n]:r?u.unshift(n):u.push(n),(a=o(e))>0&&u.length>a&&!u.warned){u.warned=!0;var l=new Error("Possible EventEmitter memory leak detected. "+u.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");l.name="MaxListenersExceededWarning",l.emitter=e,l.type=t,l.count=u.length,i(l)}return e}function s(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);this.fired||(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,y(this.listener,this.target,e))}function u(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=s.bind(i);return r.listener=n,i.wrapFn=r,r}function l(e,t,n){var i=e._events;if(void 0===i)return[];var r=i[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?p(r):f(r,r.length)}function c(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function f(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function d(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}function p(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}var h,v="object"==typeof Reflect?Reflect:null,y=v&&"function"==typeof v.apply?v.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};h=v&&"function"==typeof v.ownKeys?v.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var g=Number.isNaN||function(e){return e!==e};e.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._eventsCount=0,r.prototype._maxListeners=void 0;var m=10;Object.defineProperty(r,"defaultMaxListeners",{enumerable:!0,get:function(){return m},set:function(e){if("number"!=typeof e||e<0||g(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");m=e}}),r.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},r.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||g(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},r.prototype.getMaxListeners=function(){return o(this)},r.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,r=this._events;if(void 0!==r)i=i&&void 0===r.error;else if(!i)return!1;if(i){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var a=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw a.context=o,a}var s=r[e];if(void 0===s)return!1;if("function"==typeof s)y(s,this,t);else for(var u=s.length,l=f(s,u),n=0;n<u;++n)y(l[n],this,t);return!0},r.prototype.addListener=function(e,t){return a(this,e,t,!1)},r.prototype.on=r.prototype.addListener,r.prototype.prependListener=function(e,t){return a(this,e,t,!0)},r.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.on(e,u(this,e,t)),this},r.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.prependListener(e,u(this,e,t)),this},r.prototype.removeListener=function(e,t){var n,i,r,o,a;if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);if(void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){a=n[o].listener,r=o;break}if(r<0)return this;0===r?n.shift():d(n,r),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,a||t)}return this},r.prototype.off=r.prototype.removeListener,r.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,o=Object.keys(n);for(i=0;i<o.length;++i)"removeListener"!==(r=o[i])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},r.prototype.listeners=function(e){return l(this,e,!0)},r.prototype.rawListeners=function(e){return l(this,e,!1)},r.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):c.call(e,t)},r.prototype.listenerCount=c,r.prototype.eventNames=function(){return this._eventsCount>0?h(this._events):[]}},533:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var r=n(140),o=i(r),a=n(139),s=i(a),u=n(422),l=i(u),c=n(44),f=i(c),d=n(131),p=i(d),h=n(87),v=i(h),y=n(60),g=i(y),m=n(96),_=i(m);(0,window.$)(document).ready(function(){new g.default("#supplier_shop_association").enableAutoCheckChildren(),new o.default(l.default.supplierCountrySelect,l.default.supplierStateSelect,l.default.supplierStateBlock),new s.default(l.default.supplierCountrySelect,l.default.supplierDniInput,l.default.supplierDniInputLabel),new _.default,new f.default,new p.default,new v.default({tokenFieldSelector:"input.js-taggable-field",options:{createTokensOnBlur:!0}})})},55:function(e,t,n){var i=n(27),r=n(22),o=n(58)(!1),a=n(47)("IE_PROTO");e.exports=function(e,t){var n,s=r(e),u=0,l=[];for(n in s)n!=a&&i(s,n)&&l.push(n);for(;t.length>u;)i(s,n=t[u++])&&(~o(l,n)||l.push(n));return l}},56:function(e,t,n){var i=n(39),r=Math.min;e.exports=function(e){return e>0?r(i(e),9007199254740991):0}},57:function(e,t){t.f=Object.getOwnPropertySymbols},58:function(e,t,n){var i=n(22),r=n(56),o=n(59);e.exports=function(e){return function(t,n,a){var s,u=i(t),l=r(u.length),c=o(a,l);if(e&&n!=n){for(;l>c;)if((s=u[c++])!=s)return!0}else for(;l>c;c++)if((e||c in u)&&u[c]===n)return e||c||0;return!e&&-1}}},59:function(e,t,n){var i=n(39),r=Math.max,o=Math.min;e.exports=function(e,t){return e=i(e),e<0?r(e+t,0):o(e,t)}},6:function(e,t,n){var i=n(11),r=n(17),o=n(13),a=Object.defineProperty;t.f=n(2)?Object.defineProperty:function(e,t,n){if(i(e),t=o(t,!0),i(n),r)try{return a(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},60:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=i(r),a=n(1),s=i(a),u=window.$,l=function(){function e(t){var n=this;return(0,o.default)(this,e),this.$container=u(t),this.$container.on("click",".js-input-wrapper",function(e){var t=u(e.currentTarget);n._toggleChildTree(t)}),this.$container.on("click",".js-toggle-choice-tree-action",function(e){var t=u(e.currentTarget);n._toggleTree(t)}),{enableAutoCheckChildren:function(){return n.enableAutoCheckChildren()},enableAllInputs:function(){return n.enableAllInputs()},disableAllInputs:function(){return n.disableAllInputs()}}}return(0,s.default)(e,[{key:"enableAutoCheckChildren",value:function(){this.$container.on("change",'input[type="checkbox"]',function(e){var t=u(e.currentTarget);t.closest("li").find('ul input[type="checkbox"]').prop("checked",t.is(":checked"))})}},{key:"enableAllInputs",value:function(){this.$container.find("input").removeAttr("disabled")}},{key:"disableAllInputs",value:function(){this.$container.find("input").attr("disabled","disabled")}},{key:"_toggleChildTree",value:function(e){var t=e.closest("li");if(t.hasClass("expanded"))return void t.removeClass("expanded").addClass("collapsed");t.hasClass("collapsed")&&t.removeClass("collapsed").addClass("expanded")}},{key:"_toggleTree",value:function(e){var t=e.closest(".js-choice-tree-container"),n=e.data("action"),i={addClass:{expand:"expanded",collapse:"collapsed"},removeClass:{expand:"collapsed",collapse:"expanded"},nextAction:{expand:"collapse",collapse:"expand"},text:{expand:"collapsed-text",collapse:"expanded-text"},icon:{expand:"collapsed-icon",collapse:"expanded-icon"}};t.find("li").each(function(e,t){var r=u(t);r.hasClass(i.removeClass[n])&&r.removeClass(i.removeClass[n]).addClass(i.addClass[n])}),e.data("action",i.nextAction[n]),e.find(".material-icons").text(e.data(i.icon[n])),e.find(".js-toggle-text").text(e.data(i.text[n]))}}]),e}();t.default=l},67:function(e,t,n){e.exports={default:n(82),__esModule:!0}},7:function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},76:function(e,t,n){var i=n(8),r=n(3),o=n(7);e.exports=function(e,t){var n=(r.Object||{})[e]||Object[e],a={};a[e]=t(n),i(i.S+i.F*o(function(){n(1)}),"Object",a)}},8:function(e,t,n){var i=n(5),r=n(3),o=n(15),a=n(10),s=function(e,t,n){var u,l,c,f=e&s.F,d=e&s.G,p=e&s.S,h=e&s.P,v=e&s.B,y=e&s.W,g=d?r:r[t]||(r[t]={}),m=g.prototype,_=d?i:p?i[t]:(i[t]||{}).prototype;d&&(n=t);for(u in n)(l=!f&&_&&void 0!==_[u])&&u in g||(c=l?_[u]:n[u],g[u]=d&&"function"!=typeof _[u]?n[u]:v&&l?o(c,i):y&&_[u]==c?function(e){var t=function(t,n,i){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,i)}return e.apply(this,arguments)};return t.prototype=e.prototype,t}(c):h&&"function"==typeof c?o(Function.call,c):c,h&&((g.virtual||(g.virtual={}))[u]=c,e&s.R&&m&&!m[u]&&a(m,u,c)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,e.exports=s},80:function(e,t,n){e.exports={default:n(81),__esModule:!0}},81:function(e,t,n){n(85),e.exports=n(3).Object.assign},82:function(e,t,n){n(86),e.exports=n(3).Object.keys},83:function(e,t,n){"use strict";var i=n(34),r=n(57),o=n(52),a=n(46),s=n(51),u=Object.assign;e.exports=!u||n(7)(function(){var e={},t={},n=Symbol(),i="abcdefghijklmnopqrst";return e[n]=7,i.split("").forEach(function(e){t[e]=e}),7!=u({},e)[n]||Object.keys(u({},t)).join("")!=i})?function(e,t){for(var n=a(e),u=arguments.length,l=1,c=r.f,f=o.f;u>l;)for(var d,p=s(arguments[l++]),h=c?i(p).concat(c(p)):i(p),v=h.length,y=0;v>y;)f.call(p,d=h[y++])&&(n[d]=p[d]);return n}:u},85:function(e,t,n){var i=n(8);i(i.S+i.F,"Object",{assign:n(83)})},86:function(e,t,n){var i=n(46),r=n(34);n(76)("keys",function(){return function(e){return r(i(e))}})},87:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),r=function(e){return e&&e.__esModule?e:{default:e}}(i),o=window.$,a=function e(t){var n=t.tokenFieldSelector,i=t.options,a=void 0===i?{}:i;(0,r.default)(this,e),o(n).tokenfield(a)};t.default=a},96:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(80),o=i(r),a=n(0),s=i(a),u=n(1),l=i(u),c=(n(36),window),f=c.$,d=function(){function e(t){if((0,s.default)(this,e),t=t||{},this.tinyMCELoaded=!1,void 0===t.baseAdminUrl)if(void 0!==window.baseAdminDir)t.baseAdminUrl=window.baseAdminDir;else{var n=window.location.pathname.split("/");n.every(function(e){return""===e||(t.baseAdminUrl="/"+e+"/",!1)})}void 0===t.langIsRtl&&(t.langIsRtl=void 0!==window.lang_is_rtl&&"1"===window.lang_is_rtl),this.setupTinyMCE(t)}return(0,l.default)(e,[{key:"setupTinyMCE",value:function(e){"undefined"==typeof tinyMCE?this.loadAndInitTinyMCE(e):this.initTinyMCE(e)}},{key:"initTinyMCE",value:function(e){var t=this;e=(0,o.default)({selector:".rte",plugins:"align colorpicker link image filemanager table media placeholder advlist code table autoresize",browser_spellcheck:!0,toolbar1:"code,colorpicker,bold,italic,underline,strikethrough,blockquote,link,align,bullist,numlist,table,image,media,formatselect",toolbar2:"",external_filemanager_path:e.baseAdminUrl+"filemanager/",filemanager_title:"File manager",external_plugins:{filemanager:e.baseAdminUrl+"filemanager/plugin.min.js"},language:iso_user,content_style:e.langIsRtl?"body {direction:rtl;}":"",skin:"prestashop",menubar:!1,statusbar:!1,relative_urls:!1,convert_urls:!1,entity_encoding:"raw",extended_valid_elements:"em[class|name|id],@[role|data-*|aria-*]",valid_children:"+*[*]",valid_elements:"*[*]",rel_list:[{title:"nofollow",value:"nofollow"}],editor_selector:"autoload_rte",init_instance_callback:function(){t.changeToMaterial()},setup:function(e){t.setupEditor(e)}},e),void 0!==e.editor_selector&&(e.selector="."+e.editor_selector),f("body").on("click",".mce-btn, .mce-open, .mce-menu-item",function(){t.changeToMaterial()}),tinyMCE.init(e),this.watchTabChanges(e)}},{key:"setupEditor",value:function(e){var t=this;e.on("loadContent",function(e){t.handleCounterTiny(e.target.id)}),e.on("change",function(e){tinyMCE.triggerSave(),t.handleCounterTiny(e.target.id)}),e.on("blur",function(){tinyMCE.triggerSave()})}},{key:"watchTabChanges",value:function(e){f(e.selector).each(function(e,t){var n=f(t).closest(".translation-field"),i=f(t).closest(".translations.tabbable");if(n.length&&i.length){var r=n.data("locale");f('.nav-item a[data-locale="'+r+'"]',i).on("shown.bs.tab",function(){var e=(f(t).closest("form"),tinyMCE.get(t.id));e&&e.setContent(e.getContent())})}})}},{key:"loadAndInitTinyMCE",value:function(e){var t=this;if(!this.tinyMCELoaded){this.tinyMCELoaded=!0;var n=e.baseAdminUrl.split("/");n.splice(n.length-2,2);var i=n.join("/");window.tinyMCEPreInit={},window.tinyMCEPreInit.base=i+"/js/tiny_mce",window.tinyMCEPreInit.suffix=".min",f.getScript(i+"/js/tiny_mce/tinymce.min.js",function(){t.setupTinyMCE(e)})}}},{key:"changeToMaterial",value:function(){var e={"mce-i-code":'<i class="material-icons">code</i>',"mce-i-none":'<i class="material-icons">format_color_text</i>',"mce-i-bold":'<i class="material-icons">format_bold</i>',"mce-i-italic":'<i class="material-icons">format_italic</i>',"mce-i-underline":'<i class="material-icons">format_underlined</i>',"mce-i-strikethrough":'<i class="material-icons">format_strikethrough</i>',"mce-i-blockquote":'<i class="material-icons">format_quote</i>',"mce-i-link":'<i class="material-icons">link</i>',"mce-i-alignleft":'<i class="material-icons">format_align_left</i>',"mce-i-aligncenter":'<i class="material-icons">format_align_center</i>',"mce-i-alignright":'<i class="material-icons">format_align_right</i>',"mce-i-alignjustify":'<i class="material-icons">format_align_justify</i>',"mce-i-bullist":'<i class="material-icons">format_list_bulleted</i>',"mce-i-numlist":'<i class="material-icons">format_list_numbered</i>',"mce-i-image":'<i class="material-icons">image</i>',"mce-i-table":'<i class="material-icons">grid_on</i>',"mce-i-media":'<i class="material-icons">video_library</i>',"mce-i-browse":'<i class="material-icons">attachment</i>',"mce-i-checkbox":'<i class="mce-ico mce-i-checkbox"></i>'};f.each(e,function(e,t){f("."+e).replaceWith(t)})}},{key:"handleCounterTiny",value:function(e){var t=f("#"+e),n=t.attr("counter"),i=t.attr("counter_type"),r=tinyMCE.activeEditor.getBody().textContent.length;t.parent().find("span.currentLength").text(r),"recommended"!==i&&r>n?t.parent().find("span.maxLength").addClass("text-danger"):t.parent().find("span.maxLength").removeClass("text-danger")}}]),e}();t.default=d}});