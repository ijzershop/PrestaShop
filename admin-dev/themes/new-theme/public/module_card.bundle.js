/******/!function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}// webpackBootstrap
/******/
var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=394)}({187:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){var e=n(231);(0,t.$)(function(){(new e.a).init()})}.call(e,n(2))},2:function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},231:function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),l=window.$,a={on:function(t,e,n){document.addEventListener(t,function(t){void 0!==n?e.call(n,t):e(t)})},emitEvent:function(t,e){var n=document.createEvent(e);n.initEvent(t,!0,!0),document.dispatchEvent(n)}},u=function(){function t(){o(this,t),this.moduleActionMenuLinkSelector="button.module_action_menu_",this.moduleActionMenuInstallLinkSelector="button.module_action_menu_install",this.moduleActionMenuEnableLinkSelector="button.module_action_menu_enable",this.moduleActionMenuUninstallLinkSelector="button.module_action_menu_uninstall",this.moduleActionMenuDisableLinkSelector="button.module_action_menu_disable",this.moduleActionMenuEnableMobileLinkSelector="button.module_action_menu_enable_mobile",this.moduleActionMenuDisableMobileLinkSelector="button.module_action_menu_disable_mobile",this.moduleActionMenuResetLinkSelector="button.module_action_menu_reset",this.moduleActionMenuUpdateLinkSelector="button.module_action_menu_upgrade",this.moduleItemListSelector=".module-item-list",this.moduleItemGridSelector=".module-item-grid",this.moduleActionModalDisableLinkSelector="a.module_action_modal_disable",this.moduleActionModalResetLinkSelector="a.module_action_modal_reset",this.moduleActionModalUninstallLinkSelector="a.module_action_modal_uninstall",this.forceDeletionOption="#force_deletion"}return r(t,[{key:"init",value:function(){this._initActionButtons()}},{key:"_initActionButtons",value:function(){var t=this;l(document).on("click",this.forceDeletionOption,function(){var e=l(t.moduleActionModalUninstallLinkSelector,l("div.module-item-list[data-tech-name='"+l(this).attr("data-tech-name")+"']"));!0===l(this).prop("checked")?e.attr("data-deletion","true"):e.removeAttr("data-deletion")}),l(document).on("click",this.moduleActionMenuInstallLinkSelector,function(){return l("#modal-prestatrust").length&&l("#modal-prestatrust").modal("hide"),t._dispatchPreEvent("install",this)&&t._confirmAction("install",this)&&t._requestToController("install",l(this))}),l(document).on("click",this.moduleActionMenuEnableLinkSelector,function(){return t._dispatchPreEvent("enable",this)&&t._confirmAction("enable",this)&&t._requestToController("enable",l(this))}),l(document).on("click",this.moduleActionMenuUninstallLinkSelector,function(){return t._dispatchPreEvent("uninstall",this)&&t._confirmAction("uninstall",this)&&t._requestToController("uninstall",l(this))}),l(document).on("click",this.moduleActionMenuDisableLinkSelector,function(){return t._dispatchPreEvent("disable",this)&&t._confirmAction("disable",this)&&t._requestToController("disable",l(this))}),l(document).on("click",this.moduleActionMenuEnableMobileLinkSelector,function(){return t._dispatchPreEvent("enable_mobile",this)&&t._confirmAction("enable_mobile",this)&&t._requestToController("enable_mobile",l(this))}),l(document).on("click",this.moduleActionMenuDisableMobileLinkSelector,function(){return t._dispatchPreEvent("disable_mobile",this)&&t._confirmAction("disable_mobile",this)&&t._requestToController("disable_mobile",l(this))}),l(document).on("click",this.moduleActionMenuResetLinkSelector,function(){return t._dispatchPreEvent("reset",this)&&t._confirmAction("reset",this)&&t._requestToController("reset",l(this))}),l(document).on("click",this.moduleActionMenuUpdateLinkSelector,function(){return t._dispatchPreEvent("update",this)&&t._confirmAction("update",this)&&t._requestToController("update",l(this))}),l(document).on("click",this.moduleActionModalDisableLinkSelector,function(){return t._requestToController("disable",l(t.moduleActionMenuDisableLinkSelector,l("div.module-item-list[data-tech-name='"+l(this).attr("data-tech-name")+"']")))}),l(document).on("click",this.moduleActionModalResetLinkSelector,function(){return t._requestToController("reset",l(t.moduleActionMenuResetLinkSelector,l("div.module-item-list[data-tech-name='"+l(this).attr("data-tech-name")+"']")))}),l(document).on("click",this.moduleActionModalUninstallLinkSelector,function(e){l(e.target).parents(".modal").on("hidden.bs.modal",function(n){return t._requestToController("uninstall",l(t.moduleActionMenuUninstallLinkSelector,l("div.module-item-list[data-tech-name='"+l(e.target).attr("data-tech-name")+"']")),l(e.target).attr("data-deletion"))}.bind(e))})}},{key:"_getModuleItemSelector",value:function(){return l(this.moduleItemListSelector).length?this.moduleItemListSelector:this.moduleItemGridSelector}},{key:"_confirmAction",value:function(t,e){var n=l("#"+l(e).data("confirm_modal"));return 1!=n.length||(n.first().modal("show"),!1)}},{key:"_confirmPrestaTrust",value:function(t){var e=this,n=this._replacePrestaTrustPlaceholders(t);n.find(".pstrust-install").off("click").on("click",function(){var o=l(e.moduleActionMenuInstallLinkSelector,'.module-item[data-tech-name="'+t.module.attributes.name+'"]'),i=o.parent("form");l("<input>").attr({type:"hidden",value:"1",name:"actionParams[confirmPrestaTrust]"}).appendTo(i),o.click(),n.modal("hide")}),n.modal()}},{key:"_replacePrestaTrustPlaceholders",value:function(t){var e=l("#modal-prestatrust"),n=t.module.attributes;if("PrestaTrust"===t.confirmation_subject&&e.length){var o=n.prestatrust.status?"success":"warning";return n.prestatrust.check_list.property?(e.find("#pstrust-btn-property-ok").show(),e.find("#pstrust-btn-property-nok").hide()):(e.find("#pstrust-btn-property-ok").hide(),e.find("#pstrust-btn-property-nok").show(),e.find("#pstrust-buy").attr("href",n.url).toggle(null!==n.url)),e.find("#pstrust-img").attr({src:n.img,alt:n.name}),e.find("#pstrust-name").text(n.displayName),e.find("#pstrust-author").text(n.author),e.find("#pstrust-label").attr("class","text-"+o).text(n.prestatrust.status?"OK":"KO"),e.find("#pstrust-message").attr("class","alert alert-"+o),e.find("#pstrust-message > p").text(n.prestatrust.message),e}}},{key:"_dispatchPreEvent",value:function(t,e){var n=jQuery.Event("module_card_action_event");return l(e).trigger(n,[t]),!1===n.isPropagationStopped()&&!1===n.isImmediatePropagationStopped()&&!1!==n.result}},{key:"_requestToController",value:function(t,e,n){var o=this,r=e.closest("div.btn-group"),u=e.closest("form"),s=l('<button class="btn-primary-reverse onclick unbind spinner "></button>'),c="//"+window.location.host+u.attr("action"),d=u.serializeArray();return"true"!==n&&!0!==n||d.push({name:"actionParams[deletion]",value:!0}),l.ajax({url:c,dataType:"json",method:"POST",data:d,beforeSend:function(){r.hide(),r.after(s)}}).done(function(e){if(void 0===(void 0===e?"undefined":i(e)))l.growl.error({message:"No answer received from server"});else{var n=Object.keys(e)[0];if(!1===e[n].status)void 0!==e[n].confirmation_subject&&o._confirmPrestaTrust(e[n]),l.growl.error({message:e[n].msg});else{l.growl.notice({message:e[n].msg});var u=null,s=null;"uninstall"==t?(r.fadeOut(function(){u=o._getModuleItemSelector().replace(".",""),s=r.parents("."+u).first(),s.remove()}),a.emitEvent("Module Uninstalled","CustomEvent")):"disable"==t?(u=o._getModuleItemSelector().replace(".",""),s=r.parents("."+u).first(),s.addClass(u+"-isNotActive"),s.attr("data-active","0"),a.emitEvent("Module Disabled","CustomEvent")):"enable"==t&&(u=o._getModuleItemSelector().replace(".",""),s=r.parents("."+u).first(),s.removeClass(u+"-isNotActive"),s.attr("data-active","1"),a.emitEvent("Module Enabled","CustomEvent")),r.replaceWith(e[n].action_menu_html)}}}).always(function(){r.fadeIn(),s.remove()}),!1}}]),t}();e.a=u},394:function(t,e,n){t.exports=n(187)}});