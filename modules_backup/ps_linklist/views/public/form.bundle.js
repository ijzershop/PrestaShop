/*! For license information please see form.bundle.js.LICENSE.txt */
!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([,function(e,t,n){"use strict";var o,r="object"==typeof Reflect?Reflect:null,i=r&&"function"==typeof r.apply?r.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};o=r&&"function"==typeof r.ownKeys?r.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var s=Number.isNaN||function(e){return e!=e};function l(){l.init.call(this)}e.exports=l,e.exports.once=function(e,t){return new Promise((function(n,o){function r(n){e.removeListener(t,i),o(n)}function i(){"function"==typeof e.removeListener&&e.removeListener("error",r),n([].slice.call(arguments))}g(e,t,i,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&g(e,"error",t,n)}(e,r,{once:!0})}))},l.EventEmitter=l,l.prototype._events=void 0,l.prototype._eventsCount=0,l.prototype._maxListeners=void 0;var c=10;function a(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function u(e){return void 0===e._maxListeners?l.defaultMaxListeners:e._maxListeners}function f(e,t,n,o){var r,i,s,l;if(a(n),void 0===(i=e._events)?(i=e._events=Object.create(null),e._eventsCount=0):(void 0!==i.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),i=e._events),s=i[t]),void 0===s)s=i[t]=n,++e._eventsCount;else if("function"==typeof s?s=i[t]=o?[n,s]:[s,n]:o?s.unshift(n):s.push(n),(r=u(e))>0&&s.length>r&&!s.warned){s.warned=!0;var c=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");c.name="MaxListenersExceededWarning",c.emitter=e,c.type=t,c.count=s.length,l=c,console&&console.warn&&console.warn(l)}return e}function p(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function d(e,t,n){var o={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=p.bind(o);return r.listener=n,o.wrapFn=r,r}function h(e,t,n){var o=e._events;if(void 0===o)return[];var r=o[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):m(r,r.length)}function v(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function m(e,t){for(var n=new Array(t),o=0;o<t;++o)n[o]=e[o];return n}function g(e,t,n,o){if("function"==typeof e.on)o.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function r(i){o.once&&e.removeEventListener(t,r),n(i)}))}}Object.defineProperty(l,"defaultMaxListeners",{enumerable:!0,get:function(){return c},set:function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");c=e}}),l.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},l.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},l.prototype.getMaxListeners=function(){return u(this)},l.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var o="error"===e,r=this._events;if(void 0!==r)o=o&&void 0===r.error;else if(!o)return!1;if(o){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var l=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw l.context=s,l}var c=r[e];if(void 0===c)return!1;if("function"==typeof c)i(c,this,t);else{var a=c.length,u=m(c,a);for(n=0;n<a;++n)i(u[n],this,t)}return!0},l.prototype.addListener=function(e,t){return f(this,e,t,!1)},l.prototype.on=l.prototype.addListener,l.prototype.prependListener=function(e,t){return f(this,e,t,!0)},l.prototype.once=function(e,t){return a(t),this.on(e,d(this,e,t)),this},l.prototype.prependOnceListener=function(e,t){return a(t),this.prependListener(e,d(this,e,t)),this},l.prototype.removeListener=function(e,t){var n,o,r,i,s;if(a(t),void 0===(o=this._events))return this;if(void 0===(n=o[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete o[e],o.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,i=n.length-1;i>=0;i--)if(n[i]===t||n[i].listener===t){s=n[i].listener,r=i;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(o[e]=n[0]),void 0!==o.removeListener&&this.emit("removeListener",e,s||t)}return this},l.prototype.off=l.prototype.removeListener,l.prototype.removeAllListeners=function(e){var t,n,o;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,i=Object.keys(n);for(o=0;o<i.length;++o)"removeListener"!==(r=i[o])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(o=t.length-1;o>=0;o--)this.removeListener(e,t[o]);return this},l.prototype.listeners=function(e){return h(this,e,!0)},l.prototype.rawListeners=function(e){return h(this,e,!1)},l.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):v.call(e,t)},l.prototype.listenerCount=v,l.prototype.eventNames=function(){return this._eventsCount>0?o(this._events):[]}},,,,function(e,t,n){e.exports=n(7)},,function(e,t,n){"use strict";n.r(t);var o=new(n(1).EventEmitter),r=window.$,i=function(){function e(e){void 0===e&&(e={});var t=e||{};this.localeItemSelector=t.localeItemSelector||".js-locale-item",this.localeButtonSelector=t.localeButtonSelector||".js-locale-btn",this.localeInputSelector=t.localeInputSelector||".js-locale-input",this.selectedLocale=r(this.localeItemSelector).data("locale"),r("body").on("click",this.localeItemSelector,this.toggleLanguage.bind(this)),o.on("languageSelected",this.toggleInputs.bind(this))}return e.prototype.refreshInputs=function(e){this.selectedLocale&&o.emit("languageSelected",{selectedLocale:this.selectedLocale,form:e})},e.prototype.toggleLanguage=function(e){var t=r(e.target),n=t.closest("form");this.selectedLocale=t.data("locale"),this.refreshInputs(n)},e.prototype.toggleInputs=function(e){var t=e.form;this.selectedLocale=e.selectedLocale;var n=t.find(this.localeButtonSelector),o=n.data("change-language-url");n.text(this.selectedLocale),t.find(this.localeInputSelector).addClass("d-none"),t.find("".concat(this.localeInputSelector,".js-locale-").concat(this.selectedLocale)).removeClass("d-none"),o&&this.saveSelectedLanguage(o,this.selectedLocale)},e.prototype.saveSelectedLanguage=function(e,t){r.post({url:e,data:{language_iso_code:t}})},e}(),s=window.$,l=function(){function e(e){var t=this;this.$container=s(e),this.$container.on("click",".js-input-wrapper",(function(e){var n=s(e.currentTarget);t.toggleChildTree(n)})),this.$container.on("click",".js-toggle-choice-tree-action",(function(e){var n=s(e.currentTarget);t.toggleTree(n)}))}return e.prototype.enableAutoCheckChildren=function(){this.$container.on("change",'input[type="checkbox"]',(function(e){var t=s(e.currentTarget);t.closest("li").find('ul input[type="checkbox"]').prop("checked",t.is(":checked"))}))},e.prototype.enableAllInputs=function(){this.$container.find("input").removeAttr("disabled")},e.prototype.disableAllInputs=function(){this.$container.find("input").attr("disabled","disabled")},e.prototype.toggleChildTree=function(e){var t=e.closest("li");t.hasClass("expanded")?t.removeClass("expanded").addClass("collapsed"):t.hasClass("collapsed")&&t.removeClass("collapsed").addClass("expanded")},e.prototype.toggleTree=function(e){var t=e.closest(".js-choice-tree-container"),n=e.data("action"),o={addClass:{expand:"expanded",collapse:"collapsed"},removeClass:{expand:"collapsed",collapse:"expanded"},nextAction:{expand:"collapse",collapse:"expand"},text:{expand:"collapsed-text",collapse:"expanded-text"},icon:{expand:"collapsed-icon",collapse:"expanded-icon"}};t.find("li").each((function(e,t){var r=s(t);r.hasClass(o.removeClass[n])&&r.removeClass(o.removeClass[n]).addClass(o.addClass[n])})),e.data("action",o.nextAction[n]),e.find(".material-icons").text(e.data(o.icon[n])),e.find(".js-toggle-text").text(e.data(o.text[n]))},e}();const c=window.$;c((()=>{new i({localeInputSelector:".js-locale-input"});if(c("#form_link_block_id_hook").hasClass("select2-hidden-accessible")){const e=document.getElementsByTagName("body")[0];new MutationObserver((function(e,t){for(let t of e)if("childList"===t.type&&1==t.addedNodes.length){let e=t.addedNodes[0];c(e).hasClass("select2-container--open")&&c("#select2-form_link_block_id_hook-results li").each((function(){c(this).attr("data-hook-name",c(this).html())}))}})).observe(e,{childList:!0})}const e=c(".add-collection-btn");e.on("click",r);const t=e.data().collectionId,n=document.getElementById(t),o=n.dataset.prototype;function r(e){e&&e.preventDefault();const r=o.replace(/__name__/g,n.children.length+1),i=c(r);c("#"+t).append(i),s(i)}function s(e){const t=e.closest(".custom_collection"),n=c('<button class="remove_custom_url btn btn-primary mt-1">'+t.data("deleteButtonLabel")+"</button>");n.on("click",(e=>{e.preventDefault();return c(e.target).closest(".row").remove(),!1})),e.find(".locale-input-group").first().closest(".col-sm-12").append(n)}n.children.length?c(".custom_collection .col-sm-12").each(((e,t)=>{s(c(t))})):r(),new l("#form_link_block_shop_association").enableAutoCheckChildren()}))}]);