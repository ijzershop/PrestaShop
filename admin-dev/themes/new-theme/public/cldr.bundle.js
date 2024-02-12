(()=>{var t={2544:(t,i,e)=>{"use strict";e.d(i,{c:()=>r});const r=
/**
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
class{constructor(t){this.message=t,this.name="LocalizationException"}}},8376:(t,i,e)=>{"use strict";e.d(i,{c:()=>n});var r=e(2544);
/**
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
 */const n=class{constructor(t,i,e,r,n,s,o,c,a,p,u){this.decimal=t,this.group=i,this.list=e,this.percentSign=r,this.minusSign=n,this.plusSign=s,this.exponential=o,this.superscriptingExponent=c,this.perMille=a,this.infinity=p,this.nan=u,this.validateData()}getDecimal(){return this.decimal}getGroup(){return this.group}getList(){return this.list}getPercentSign(){return this.percentSign}getMinusSign(){return this.minusSign}getPlusSign(){return this.plusSign}getExponential(){return this.exponential}getSuperscriptingExponent(){return this.superscriptingExponent}getPerMille(){return this.perMille}getInfinity(){return this.infinity}getNan(){return this.nan}validateData(){if(!this.decimal||"string"!=typeof this.decimal)throw new r.c("Invalid decimal");if(!this.group||"string"!=typeof this.group)throw new r.c("Invalid group");if(!this.list||"string"!=typeof this.list)throw new r.c("Invalid symbol list");if(!this.percentSign||"string"!=typeof this.percentSign)throw new r.c("Invalid percentSign");if(!this.minusSign||"string"!=typeof this.minusSign)throw new r.c("Invalid minusSign");if(!this.plusSign||"string"!=typeof this.plusSign)throw new r.c("Invalid plusSign");if(!this.exponential||"string"!=typeof this.exponential)throw new r.c("Invalid exponential");if(!this.superscriptingExponent||"string"!=typeof this.superscriptingExponent)throw new r.c("Invalid superscriptingExponent");if(!this.perMille||"string"!=typeof this.perMille)throw new r.c("Invalid perMille");if(!this.infinity||"string"!=typeof this.infinity)throw new r.c("Invalid infinity");if(!this.nan||"string"!=typeof this.nan)throw new r.c("Invalid nan")}}},6308:(t,i,e)=>{"use strict";e.d(i,{c:()=>s});var r=e(2544),n=e(8376);const s=
/**
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
class{constructor(t,i,e,s,o,c,a,p){if(this.positivePattern=t,this.negativePattern=i,this.symbol=e,this.maxFractionDigits=s,this.minFractionDigits=s<o?s:o,this.groupingUsed=c,this.primaryGroupSize=a,this.secondaryGroupSize=p,!this.positivePattern||"string"!=typeof this.positivePattern)throw new r.c("Invalid positivePattern");if(!this.negativePattern||"string"!=typeof this.negativePattern)throw new r.c("Invalid negativePattern");if(!(this.symbol&&this.symbol instanceof n.c))throw new r.c("Invalid symbol");if("number"!=typeof this.maxFractionDigits)throw new r.c("Invalid maxFractionDigits");if("number"!=typeof this.minFractionDigits)throw new r.c("Invalid minFractionDigits");if("boolean"!=typeof this.groupingUsed)throw new r.c("Invalid groupingUsed");if("number"!=typeof this.primaryGroupSize)throw new r.c("Invalid primaryGroupSize");if("number"!=typeof this.secondaryGroupSize)throw new r.c("Invalid secondaryGroupSize")}getSymbol(){return this.symbol}getPositivePattern(){return this.positivePattern}getNegativePattern(){return this.negativePattern}getMaxFractionDigits(){return this.maxFractionDigits}getMinFractionDigits(){return this.minFractionDigits}isGroupingUsed(){return this.groupingUsed}getPrimaryGroupSize(){return this.primaryGroupSize}getSecondaryGroupSize(){return this.secondaryGroupSize}}},516:(t,i,e)=>{var r=1/0,n="[object Symbol]",s=/[\\^$.*+?()[\]{}|]/g,o=RegExp(s.source),c="object"==typeof e.g&&e.g&&e.g.Object===Object&&e.g,a="object"==typeof self&&self&&self.Object===Object&&self,p=c||a||Function("return this")(),u=Object.prototype.toString,g=p.Symbol,l=g?g.prototype:void 0,h=l?l.toString:void 0;function y(t){if("string"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&u.call(t)==n}(t))return h?h.call(t):"";var i=t+"";return"0"==i&&1/t==-r?"-0":i}t.exports=function(t){var i;return(t=null==(i=t)?"":y(i))&&o.test(t)?t.replace(s,"\\$&"):t}}},i={};function e(r){var n=i[r];if(void 0!==n)return n.exports;var s=i[r]={exports:{}};return t[r](s,s.exports,e),s.exports}e.d=(t,i)=>{for(var r in i)e.o(i,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:i[r]})},e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),e.o=(t,i)=>Object.prototype.hasOwnProperty.call(t,i),e.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};(()=>{"use strict";e.r(r),e.d(r,{NumberFormatter:()=>p,NumberSpecification:()=>n.c,NumberSymbol:()=>t.c,PriceSpecification:()=>o});var t=e(8376),i=e(2544),n=e(6308);class s extends n.c{constructor(t,e,r,n,s,o,c,a,p,u){if(super(t,e,r,n,s,o,c,a),this.currencySymbol=p,this.currencyCode=u,!this.currencySymbol||"string"!=typeof this.currencySymbol)throw new i.c("Invalid currencySymbol");if(!this.currencyCode||"string"!=typeof this.currencyCode)throw new i.c("Invalid currencyCode")}static getCurrencyDisplay(){return"symbol"}getCurrencySymbol(){return this.currencySymbol}getCurrencyCode(){return this.currencyCode}}const o=s,c=e(516);class a{constructor(t){this.numberSpecification=t}format(t,i){void 0!==i&&(this.numberSpecification=i);const e=Math.abs(t).toFixed(this.numberSpecification.getMaxFractionDigits());let[r,n]=this.extractMajorMinorDigits(e);r=this.splitMajorGroups(r),n=this.adjustMinorDigitsZeroes(n);let s=r;n&&(s+="."+n);const o=this.getCldrPattern(t<0);return s=this.addPlaceholders(s,o),s=this.replaceSymbols(s),s=this.performSpecificReplacements(s),s}extractMajorMinorDigits(t){const i=t.toString().split(".");return[i[0],void 0===i[1]?"":i[1]]}splitMajorGroups(t){if(!this.numberSpecification.isGroupingUsed())return t;const i=t.split("").reverse();let e=[];for(e.push(i.splice(0,this.numberSpecification.getPrimaryGroupSize()));i.length;)e.push(i.splice(0,this.numberSpecification.getSecondaryGroupSize()));e=e.reverse();const r=[];return e.forEach((t=>{r.push(t.reverse().join(""))})),r.join(",")}adjustMinorDigitsZeroes(t){let i=t;return i.length>this.numberSpecification.getMaxFractionDigits()&&(i=i.replace(/0+$/,"")),i.length<this.numberSpecification.getMinFractionDigits()&&(i=i.padEnd(this.numberSpecification.getMinFractionDigits(),"0")),i}getCldrPattern(t){return t?this.numberSpecification.getNegativePattern():this.numberSpecification.getPositivePattern()}replaceSymbols(t){const i=this.numberSpecification.getSymbol(),e={};return e["."]=i.getDecimal(),e[","]=i.getGroup(),e["-"]=i.getMinusSign(),e["%"]=i.getPercentSign(),e["+"]=i.getPlusSign(),this.strtr(t,e)}strtr(t,i){const e=Object.keys(i).map(c);return t.split(RegExp(`(${e.join("|")})`)).map((t=>i[t]||t)).join("")}addPlaceholders(t,i){return i.replace(/#?(,#+)*0(\.[0#]+)*/,t)}performSpecificReplacements(t){return this.numberSpecification instanceof o?t.split("¤").join(this.numberSpecification.getCurrencySymbol()):t}static build(i){let e,r;return e=void 0!==i.numberSymbols?new t.c(...i.numberSymbols):new t.c(...i.symbol),r=i.currencySymbol?new o(i.positivePattern,i.negativePattern,e,parseInt(i.maxFractionDigits,10),parseInt(i.minFractionDigits,10),i.groupingUsed,i.primaryGroupSize,i.secondaryGroupSize,i.currencySymbol,i.currencyCode):new n.c(i.positivePattern,i.negativePattern,e,parseInt(i.maxFractionDigits,10),parseInt(i.minFractionDigits,10),i.groupingUsed,i.primaryGroupSize,i.secondaryGroupSize),new a(r)}}const p=a})
/**
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
 */(),window.cldr=r})();