/*
* 2010-2019 Tuni-Soft
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* It is available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade this module to newer
* versions in the future. If you wish to customize the module for your
* needs please refer to
* http://doc.prestashop.com/display/PS15/Overriding+default+behaviors
* for more information.
*
* @author    Tuni-Soft
* @copyright 2010-2019 Tuni-Soft
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/!function(t){function n(n){for(var r,u,c=n[0],a=n[1],l=n[2],p=0,s=[];p<c.length;p++)u=c[p],o[u]&&s.push(o[u][0]),o[u]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r]);f&&f(n);while(s.length)s.shift()();return i.push.apply(i,l||[]),e()}function e(){for(var t,n=0;n<i.length;n++){for(var e=i[n],r=!0,c=1;c<e.length;c++){var a=e[c];0!==o[a]&&(r=!1)}r&&(i.splice(n--,1),t=u(u.s=e[0]))}return t}var r={},o={3:0},i=[];function u(n){if(r[n])return r[n].exports;var e=r[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,u),e.l=!0,e.exports}u.e=function(){return Promise.resolve()},u.m=t,u.c=r,u.d=function(t,n,e){u.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},u.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,n){if(1&n&&(t=u(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(u.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)u.d(e,r,function(n){return t[n]}.bind(null,r));return e},u.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return u.d(n,"a",n),n},u.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},u.p="";var c=window.dp_jsonpFunction=window.dp_jsonpFunction||[],a=c.push.bind(c);c.push=n,c=c.slice();for(var l=0;l<c.length;l++)n(c[l]);var f=a;i.push([31,1,0]),e()}({26:function(t,n,e){},31:function(t,n,e){"use strict";e.r(n);e(26),e(4);var r=function(){function t(){}return t.prototype.bootstrap=function(t){this.starter=t,this.init(),this.detectDocumentReady(),this.detectWindowLoad()},t.prototype.init=function(){this.document=$(document),this.window=$(window)},t.prototype.detectDocumentReady=function(){var t=this;this.document.ready(function(){return t.starter.handleDocumentReady()})},t.prototype.detectWindowLoad=function(){var t=this;this.window.on("load",function(){return t.starter.handleWindowLoad()})},t}(),o=function(t,n,e,r){return new(e||(e=Promise))(function(o,i){function u(t){try{a(r.next(t))}catch(t){i(t)}}function c(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){t.done?o(t.value):new e(function(n){n(t.value)}).then(u,c)}a((r=r.apply(t,n||[])).next())})},i=function(t,n){var e,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(e)throw new TypeError("Generator is already executing.");while(u)try{if(e=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=n.call(t,u)}catch(t){i=[6,t],r=0}finally{e=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}},u=function(){function t(){}return t.prototype.handleDocumentReady=function(){return o(this,void 0,void 0,function(){return i(this,function(t){return this.initModuleForm(),[2]})})},t.prototype.handleWindowLoad=function(){return o(this,void 0,void 0,function(){return i(this,function(t){return[2]})})},t.prototype.initModuleForm=function(){$(document).dpLang()},t}(),c=new r,a=new u;c.bootstrap(a)}});
//# sourceMappingURL=https://dynamic.prestalife.net/sourcemap/admin/dp-module-form-6d582644fcc144a4d924.js.map