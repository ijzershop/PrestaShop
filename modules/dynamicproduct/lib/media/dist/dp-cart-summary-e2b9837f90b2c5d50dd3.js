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
*/!function(t){function e(e){for(var n,a,s=e[0],u=e[1],c=e[2],d=0,p=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(t[n]=u[n]);l&&l(e);while(p.length)p.shift()();return i.push.apply(i,c||[]),r()}function r(){for(var t,e=0;e<i.length;e++){for(var r=i[e],n=!0,s=1;s<r.length;s++){var u=r[s];0!==o[u]&&(n=!1)}n&&(i.splice(e--,1),t=a(a.s=r[0]))}return t}var n={},o={2:0},i=[];function a(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.e=function(t){var e=[],r=o[t];if(0!==r)if(r)e.push(r[2]);else{var n=new Promise((function(e,n){r=o[t]=[e,n]}));e.push(r[2]=n);var i,s=document.createElement("script");s.charset="utf-8",s.timeout=120,a.nc&&s.setAttribute("nonce",a.nc),s.src=function(t){return a.p+""+({}[t]||t)+"-e2b9837f90b2c5d50dd3.js"}(t);var u=new Error;i=function(e){s.onerror=s.onload=null,clearTimeout(c);var r=o[t];if(0!==r){if(r){var n=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;u.message="Loading chunk "+t+" failed.\n("+n+": "+i+")",u.name="ChunkLoadError",u.type=n,u.request=i,r[1](u)}o[t]=void 0}};var c=setTimeout((function(){i({type:"timeout",target:s})}),12e4);s.onerror=s.onload=i,document.head.appendChild(s)}return Promise.all(e)},a.m=t,a.c=n,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(r,n,function(e){return t[e]}.bind(null,n));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a.oe=function(t){throw console.error(t),t};var s=window.dp_jsonpFunction=window.dp_jsonpFunction||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var l=u;i.push([38,0]),r()}({12:function(t,e){t.exports=jQuery},38:function(t,e,r){"use strict";r.r(e);var n=r(11);r.p=window.dp_public_path;const o=new class{constructor(t){this.tools=t,this.selector=".customization-modal .dp_cart.dp_seven_cart"}init(){this.displaySummary(),this.displayOrderDetailsSummary(),this.registerEvents()}registerEvents(){prestashop.on("updatedCart",(()=>this.displaySummary())),$(".dp_thumb_view").on("click",(t=>this.openPreviewModal(t)))}openPreviewModal(t){this.tools.stopEvent(t);const e=$(t.currentTarget),r=e.data("target"),n=e.data("label"),o=$(r);return o.find(".modal-title").text(n),o.modal("show"),!1}displaySummary(){this.summaryExists()&&$(this.selector).each(((t,e)=>{const r=$(e),n=r.data("id_customization"),o=$(`[data-target="#product-customizations-modal-${n}"]`);o.hide(),r.insertBefore(o),this.displayPreview(r)}))}displayOrderDetailsSummary(){this.summaryExists()&&$(this.selector).each(((t,e)=>{const r=$(e),n=r.closest(".customization-modal").closest("td").find(".customization a").hide();r.insertBefore(n)}))}displayPreview(t){const e=t.find(".dp-input-field-preview [data-url]");if(e.length){const r=e.data("url");t.closest(".cart-item").find(".product-image img").prop("src",r)}}summaryExists(){return $(this.selector).length>0}}(new n.a);$(function(){o.init()})}});
//# sourceMappingURL=https://prestalife.net/sourcemaps/dynamic/dp-cart-summary-06768def4789af14597b.js.map
