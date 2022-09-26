/*
* 2010-2022 Tuni-Soft
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
* @copyright 2010-2022 Tuni-Soft
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/!function(t){function e(e){for(var o,u,c=e[0],a=e[1],d=e[2],l=0,f=[];l<c.length;l++)u=c[l],Object.prototype.hasOwnProperty.call(r,u)&&r[u]&&f.push(r[u][0]),r[u]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(t[o]=a[o]);s&&s(e);while(f.length)f.shift()();return i.push.apply(i,d||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],o=!0,c=1;c<n.length;c++){var a=n[c];0!==r[a]&&(o=!1)}o&&(i.splice(e--,1),t=u(u.s=n[0]))}return t}var o={},r={7:0},i=[];function u(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(t){var e=[],n=r[t];if(0!==n)if(n)e.push(n[2]);else{var o=new Promise((function(e,o){n=r[t]=[e,o]}));e.push(n[2]=o);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,u.nc&&c.setAttribute("nonce",u.nc),c.src=function(t){return u.p+""+({}[t]||t)+"-e4c6e36a3e5255ef4acb.js"}(t);var a=new Error;i=function(e){c.onerror=c.onload=null,clearTimeout(d);var n=r[t];if(0!==n){if(n){var o=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",a.name="ChunkLoadError",a.type=o,a.request=i,n[1](a)}r[t]=void 0}};var d=setTimeout((function(){i({type:"timeout",target:c})}),12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return Promise.all(e)},u.m=t,u.c=o,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)u.d(n,o,function(e){return t[e]}.bind(null,o));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="",u.oe=function(t){throw console.error(t),t};var c=window.dp_jsonpFunction=window.dp_jsonpFunction||[],a=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var s=a;i.push([39,0]),n()}({12:function(t,e){t.exports=jQuery},39:function(t,e,n){"use strict";n.r(e);n(20),n(14);var o=n(11),r=function(t,e,n,o){return new(n||(n=Promise))((function(r,i){function u(t){try{a(o.next(t))}catch(t){i(t)}}function c(t){try{a(o.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(u,c)}a((o=o.apply(t,e||[])).next())}))};const i=new class{bootstrap(t){this.starter=t,this.init(),this.detectDocumentReady(),this.detectWindowLoad()}init(){this.document=$(document),this.window=$(window)}detectDocumentReady(){this.document.ready((()=>this.starter.handleDocumentReady()))}detectWindowLoad(){this.window.on("load",(()=>this.starter.handleWindowLoad()))}},u=new class{constructor(){this.tools=new o.a}handleDocumentReady(){return r(this,void 0,void 0,(function*(){this.displayLogoOnDynamicProducts()}))}handleWindowLoad(){return r(this,void 0,void 0,(function*(){}))}displayLogoOnDynamicProducts(){if("undefined"!=typeof dp_products){const t=$("table.product").find("tbody tr").toArray();for(const e of t){const t=this.tools.parseInt($(e).data("product-id"));t&&(dp_products[t]&&!dp_linked_configs[t]&&$(`<img src="${dp_logo_url}" width="24" />`).prependTo($(e).find("td:eq(3)")),dp_linked_configs[t]&&$(`<img src="${dp_logo_link_url}" width="24" />`).prependTo($(e).find("td:eq(3)")))}}}};i.bootstrap(u)}});
//# sourceMappingURL=https://prestalife.net/sourcemaps/dynamic/dp-products-list-fd0071c8b7cf51877db7.js.map