window.maintenance=function(e){function t(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var i={};return t.m=e,t.c=i,t.i=function(e){return e},t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=331)}({31:function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=window.$,r=function(){function e(t){if(n(this,e),t=t||{},this.tinyMCELoaded=!1,void 0===t.baseAdminUrl)if(void 0!==window.baseAdminDir)t.baseAdminUrl=window.baseAdminDir;else{var i=window.location.pathname.split("/");i.every(function(e){return""===e||(t.baseAdminUrl="/"+e+"/",!1)})}void 0===t.langIsRtl&&(t.langIsRtl=void 0!==window.lang_is_rtl&&"1"===window.lang_is_rtl),this.setupTinyMCE(t)}return a(e,[{key:"setupTinyMCE",value:function(e){"undefined"==typeof tinyMCE?this.loadAndInitTinyMCE(e):this.initTinyMCE(e)}},{key:"fetchKey",value:function(e){var t=[];return t["bouwstaalmat.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["bouwstaalmat.viho.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["constructiebalk.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["constructieklus.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["constructieklus.viho.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["demodernesmid.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["demodernesmid.viho.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["gerofitness.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["gerofitness.viho.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["ijzershop.frl"]="paLRcpM5PcDm1duliaErNH68VcRsntx2MacT2bqMPdq9je0ISiUiWoBLH1+eLBLTCEyySTXdHIxel6w2Aceuki8+MEabGVzHjNngtZBzun4=",t["ijzershop.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["ijzershop176.local"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["paneelhek.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t["paneelhek.viho.nl"]="cO4FCAY9a7EYM+WNt80HO9yHYiDX1FIbMhKaKEsr9z3JUc1FVLBgiEko/nDSAET3Lsm2V0m87mIzeLdJ6yG1rw==",t[e]}},{key:"initTinyMCE",value:function(e){var t=this;if(void 0===i)var i=location.protocol+"//"+location.host+"/";var n=this.fetchKey(window.location.hostname);e=Object.assign({selector:"textarea.rte",plugins:["link","image","table","media","advlist","code","table","autoresize","bootstrap","fullscreen"],browser_spellcheck:!0,toolbar:"undo redo code image| bold italic underline strikethrough fullscreen | fontselect fontsizeselect formatselect styleselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments | bootstrap",contextmenu:"bootstrap",bootstrapConfig:{language:iso_user,url:i+"js/tiny_mce/plugins/bootstrap/",iconFont:"fontawesome5",imagesPath:"/upload",key:n,enableTemplateEdition:!1},editorStyleFormats:{textStyles:!0,blockStyles:!0,containerStyles:!0,responsive:["xs","sm"],spacing:["all","x","y","top","right","bottom","left"]},style_formats_autohide:!0,language:iso_user,content_style:"1"===lang_is_rtl?"body {direction:rtl;}":"",skin:"oxide",theme:"silver",menubar:!1,statusbar:!1,relative_urls:!1,convert_urls:!1,entity_encoding:"raw",extended_valid_elements:"em[class|name|id,@[role|data-*|aria-*]",valid_children:"+*[*]",valid_elements:"*[*]",rel_list:[{title:"nofollow",value:"nofollow"}],images_upload_handler:function(e,t,i){var n,a;n=new XMLHttpRequest,n.withCredentials=!1,n.open("POST","/custom_uploader/upload.php");var o=document.querySelectorAll(".tox-form input")[0].files[0];a=new FormData,a.append("path",""),a.append("path_thumb",""),a.append("file",o,o.name),n.send(a),n.onload=function(){var e;return 200!=n.status?void i("HTTP Error: "+n.status):(e=JSON.parse(n.responseText))&&"string"==typeof e.location?void t(e.location):void i("Invalid JSON: "+n.responseText)}},editor_selector:"autoload_rte",init_instance_callback:function(){},setup:function(e){t.setupEditor(e)}},e),void 0!==e.editor_selector&&(e.selector="."+e.editor_selector),tinyMCE.init(e),this.watchTabChanges(e)}},{key:"setupEditor",value:function(e){var t=this;e.on("loadContent",function(e){t.handleCounterTiny(e.target.id)}),e.on("change",function(e){tinyMCE.triggerSave(),t.handleCounterTiny(e.target.id)}),e.on("blur",function(){tinyMCE.triggerSave()})}},{key:"watchTabChanges",value:function(e){o(e.selector).each(function(e,t){var i=o(t).closest(".translation-field"),n=o(t).closest(".translations.tabbable");if(i.length&&n.length){var a=i.data("locale");o('.nav-item a[data-locale="'+a+'"]',n).on("shown.bs.tab",function(){var e=tinyMCE.get(t.id);e&&e.setContent(e.getContent())})}})}},{key:"loadAndInitTinyMCE",value:function(e){var t=this;if(!this.tinyMCELoaded){this.tinyMCELoaded=!0;var i=e.baseAdminUrl.split("/");i.splice(i.length-2,2);var n=i.join("/");window.tinyMCEPreInit={},window.tinyMCEPreInit.base=n+"/js/tiny_mce",window.tinyMCEPreInit.suffix=".min",o.getScript(n+"/js/tiny_mce/tinymce.min.js",function(){t.setupTinyMCE(e)})}}},{key:"changeToMaterial",value:function(){var e={"mce-i-code":'<i class="material-icons">code</i>',"mce-i-none":'<i class="material-icons">format_color_text</i>',"mce-i-bold":'<i class="material-icons">format_bold</i>',"mce-i-italic":'<i class="material-icons">format_italic</i>',"mce-i-underline":'<i class="material-icons">format_underlined</i>',"mce-i-strikethrough":'<i class="material-icons">format_strikethrough</i>',"mce-i-blockquote":'<i class="material-icons">format_quote</i>',"mce-i-link":'<i class="material-icons">link</i>',"mce-i-alignleft":'<i class="material-icons">format_align_left</i>',"mce-i-aligncenter":'<i class="material-icons">format_align_center</i>',"mce-i-alignright":'<i class="material-icons">format_align_right</i>',"mce-i-alignjustify":'<i class="material-icons">format_align_justify</i>',"mce-i-bullist":'<i class="material-icons">format_list_bulleted</i>',"mce-i-numlist":'<i class="material-icons">format_list_numbered</i>',"mce-i-image":'<i class="material-icons">image</i>',"mce-i-table":'<i class="material-icons">grid_on</i>',"mce-i-media":'<i class="material-icons">video_library</i>',"mce-i-browse":'<i class="material-icons">attachment</i>',"mce-i-checkbox":'<i class="mce-ico mce-i-checkbox"></i>'};o.each(e,function(e,t){o("."+e).replaceWith(t)})}},{key:"handleCounterTiny",value:function(e){var t=o("#"+e),i=t.attr("counter"),n=t.attr("counter_type"),a=tinyMCE.activeEditor.getContent().textContent;t.parent().find("span.currentLength").text(a),"recommended"!==n&&a>i?t.parent().find("span.maxLength").addClass("text-danger"):t.parent().find("span.maxLength").removeClass("text-danger")}}]),e}();t.default=r},331:function(e,t,i){"use strict";var n=i(31),a=function(e){return e&&e.__esModule?e:{default:e}}(n);/**
                   * 2007-2019 PrestaShop and Contributors
                   *
                   * NOTICE OF LICENSE
                   *
                   * This source file is subject to the Open Software License (OSL 3.0)
                   * that is bundled with this package in the file LICENSE.txt.
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
                   * needs please refer to https://www.prestashop.com for more information.
                   *
                   * @author    PrestaShop SA <contact@prestashop.com>
                   * @copyright 2007-2019 PrestaShop SA and Contributors
                   * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
                   * International Registered Trademark & Property of PrestaShop SA
                   */
(0,window.$)(function(){new a.default})}});