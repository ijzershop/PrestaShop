!function(){"use strict";var e=function(t,a){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])})(t,a)};var t=function(){return(t=Object.assign||function(e){for(var t,a=1,s=arguments.length;a<s;a++)for(var i in t=arguments[a])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function a(){for(var e=0,t=0,a=arguments.length;t<a;t++)e+=arguments[t].length;var s=Array(e),i=0;for(t=0;t<a;t++)for(var r=arguments[t],o=0,n=r.length;o<n;o++,i++)s[i]=r[o];return s}var s=function(){function e(){var e=this;this.pluginMode="insert",this.elStyles={},this.miscAttributes=[],this.miscClasses=[],this.reservedAttributes=[],this.reservedClasses=[],this.reservedClassesRegex=[],this.reservedIconClasses=[],this.reservedIconClassesRegex=[],this.reservedStyles=[],this.btnToggleActiveClass="btn-primary",this.btnToggleInactiveClass="btn-outline-secondary",this.beautifyOptions={indent_size:"4",indent_char:" ",max_preserve_newlines:"5",preserve_newlines:!0,keep_array_indentation:!1,break_chained_methods:!1,indent_scripts:"normal",brace_style:"collapse",space_before_conditional:!0,unescape_strings:!1,jslint_happy:!1,end_with_newline:!1,wrap_line_length:"0",indent_inner_html:!1,comma_first:!1,e4x:!1,indent_empty_lines:!1},this.bootstrapDialogLogo='<span id="bootstrap-dialog-logo"><svg width="24" height="24"><path d="M16.7 11.7c2 1 2.8 2.6 2.6 4.6-.4 2.1-1.5 3.4-3.6 3.8-1 .2-2.2.2-3.3.2H6v-16H14c2.3 0 4 1.2 4.4 3 .3 1.8-.1 3.3-1.8 4.4zM9 17.8h4.8c1.4 0 2.3-.8 2.4-2 .1-1.4-.6-2.4-2-2.5-1.7-.2-3.4 0-5.2 0v4.5zm0-11v4h4.6c1.2 0 1.8-.8 1.8-2s-.5-2-1.8-2H9z"></path></svg></span>',this.editor=window.parent.tinymce.activeEditor,this.bsInstance=window.parent.tinymce.activeEditor.plugins.bootstrap.getInstance(),this.parentDocument=window.parent.document;var t=this.bsInstance.pluginUrl;loadjs(this.bsInstance.bootstrapCss),loadjs(["https://code.jquery.com/jquery-3.4.1.min.js",t+"langs/"+this.bsInstance.language+"-dialogs.js",t+"assets/js/dialogs-dot-data.js",t+"lib/dot/dot.min.js",t+"lib/prism/prism.min.css",t+"lib/prism/prism.min.js"],"bundle1"),loadjs.ready("bundle1",(function(){e.setPluginMode(),jQuery.noConflict(),jQuery(window.parent.document).find(".tox-dialog__header").prepend(e.bootstrapDialogLogo),jQuery(".selector *[data-value]").each((function(){jQuery(this).closest(".selector").attr("title",jQuery(this).data("value"))})),loadjs([t+"lib/js-beautify/beautify-html.min.js"],"js-beautify"),loadjs([t+"lib/nice-check/dist/js/jquery.nice-check.min.js",t+"lib/nice-check/dist/css/nice-check-gray-dark.min.css"],"niceCheck"),loadjs.ready("niceCheck",(function(){jQuery("body").niceCheck()})),loadjs.ready("js-beautify",(function(){e.init()}))}))}return e.prototype.init=function(){},e.prototype.addOriginalAttributes=function(){if(!Object.keys(this.miscAttributes).length)return"";for(var e=" ",t=0,a=Object.entries(this.miscAttributes);t<a.length;t++){var s=a[t];e+=s[0]+'="'+s[1]+'"'}return e},e.prototype.addOriginalClasses=function(){return this.miscClasses.length?" "+this.miscClasses.join(" "):""},e.prototype.escapeHtml=function(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return e.replace(/[&<>"']/g,(function(e){return t[e]}))},e.prototype.getOriginalAttributes=function(e){var t=this;void 0===e.classList&&(e=e[0]);for(var s=a(this.reservedAttributes,["data-mce-href","data-mce-selected","data-mce-src","data-mce-style","src","style"]),i=this.reservedClasses,r=this.reservedStyles,o=void 0,n=0,l=e.classList,c=l.length;n<c;n++)if(o=l[n],-1===i.indexOf(o))if(this.reservedClassesRegex.length<1)this.miscClasses.push(o);else for(var d=0;d<this.reservedClassesRegex.length;d++){var h=new RegExp(this.reservedClassesRegex[d],"g");o.match(h)||this.miscClasses.push(o)}var u=void 0,g=(n=0,e.attributes);for(c=g.length;n<c;n++)"class"!==(u=g[n]).nodeName&&-1===s.indexOf(u.nodeName)&&(this.miscAttributes[u.nodeName]=u.nodeValue);var p="";if(Object.keys(this.elStyles).forEach((function(e){-1===r.indexOf(e)&&(p+=" "+t.reverseCamelize(e)+":"+t.elStyles[e]+";")})),p.length>0){this.miscAttributes.style=p.trim()}},e.prototype.getIconClass=function(e){var t=this,a=[],s=jQuery(e).attr("class").split(" "),i=this.bsInstance.iconBaseClasses.join("|").length,r=new RegExp(this.bsInstance.iconSearchClass,"g"),o=new RegExp(this.bsInstance.iconBaseClasses.join("|"),"g");return jQuery.each(s,(function(e,s){if(s.match(r)){var n=!1;if(-1!==t.reservedIconClasses.indexOf(s)||-1!==t.reservedClasses.indexOf(s))n=!0;else for(var l=0;l<t.reservedIconClassesRegex.length;l++){var c=new RegExp(t.reservedIconClassesRegex[l],"g");s.match(c)&&(n=!0)}!1===n&&a.push(s)}else i>0&&s.match(o)&&a.push(s)})),a.join(" ")},e.prototype.getStyles=function(e){var t={};if(!e||!e.style||!e.style.cssText)return t;for(var a=e.style.cssText.split(";"),s=0;s<a.length;++s){var i=a[s].trim();if(i){var r=i.split(":");t[this.camelize(r[0].trim())]=r[1].trim()}}return t},e.prototype.initEvents=function(e){var t=this;void 0===e&&(e=!0),!0===e&&(jQuery(".selector").on("click",(function(e){var a=jQuery(e.target);a.hasClass("selector")&&(a=a.find(":first-child[data-prop]"));var s=a.data("prop");t[s]=a.data("value"),t.updateDialog(s,t[s]),t.render()})),jQuery('input[type="radio"]').on("change keyup",(function(e){var a=jQuery(e.target).data("prop");t[a]=jQuery(e.target).val(),t.updateDialog(a,t[a]),t.render()})),jQuery('input[type="text"], input[type="number"]').on("change keyup",(function(e){var a=jQuery(e.target).data("prop");t[a]=jQuery(e.target).val(),t.updateDialog(a,t[a],"text"),t.render()})),jQuery("select").on("change",(function(e){var a=jQuery(e.target).data("prop");t[a]=jQuery(e.target).val(),t.render()})),jQuery(".btn-group button").on("click",(function(e){var a=jQuery(e.target).data("prop");t[a]=jQuery(e.target).data("value"),t.updateDialog(a,t[a],"boolean"),t.render()})),jQuery("a.dropdown-item").on("click",(function(e){var a=jQuery(e.target).data("prop");t[a]=jQuery(e.target).data("value"),t.updateDialog(a,t[a],"dropdown"),t.render()}))),window.addEventListener("message",(function(e){if("customInsertAndClose"===e.data.mceAction){t.onBeforeMessage();var a={pluginMode:t.pluginMode,outputCode:t.gc()};jQuery("#preview-content").html().length>0&&window.parent.postMessage({mceAction:"execCommand",cmd:"iframeCommand",value:a},origin),window.parent.postMessage({mceAction:"close"},origin)}}))},e.prototype.onBeforeMessage=function(){window.parent.tinymce.dom.DomQuery(this.editor.dom.select(".tbp-context-active")).removeClass("tbp-context-active").children(".context-trigger-wrapper").remove()},e.prototype.render=function(){},e.prototype.setPluginMode=function(){console.log("No Action defined!")},e.prototype.updateDialog=function(e,t,a){void 0===a&&(a="array-value"),"array-value"===a?(jQuery("#"+e).find(".selector").removeClass("active"),jQuery("#"+e+' [data-value="'+t+'"]').closest(".selector").addClass("active")):"boolean"===a?(jQuery('button[data-prop="'+e+'"][data-value!="'+t+'"]').removeClass(this.btnToggleActiveClass).addClass(this.btnToggleInactiveClass),jQuery('button[data-prop="'+e+'"][data-value="'+t+'"]').removeClass(this.btnToggleInactiveClass).addClass(this.btnToggleActiveClass)):"radio"===a?jQuery('input[name="'+e+'"]').each((function(){jQuery(this).prop("checked",!1),jQuery(this).val()===t&&jQuery(this).prop("checked",!0)})):"text"===a||"number"===a||"select"===a?jQuery("#"+e).val(t):"dropdown"===a&&jQuery('*[data-content="'+e+'"]').html(t),jQuery("."+e+"-toggle")[0]&&(jQuery("."+e+"-toggle").removeClass("active"),jQuery("."+e+'-toggle[data-activate*="'+t+'"]').addClass("active"))},e.prototype.camelize=function(e){return e.replace(/(?:^|[-])(\w)/g,(function(e,t){return(t="-"===e.substr(0,1)?t.toUpperCase():t)||""}))},e.prototype.enc=function(e,t){var a=this.bsInstance.getKey(e);return this.bsInstance.cjs.AES.encrypt(t,a,{iv:this.bsInstance.cjs.enc.Utf8.parse("1111111111111111")}).ciphertext.toString(this.bsInstance.cjs.enc.Base64)},e.prototype.gc=function(){var e=this.gk(),t=this.enc(this.bsInstance.getHostname(),e),a=this.enc(t,jQuery("#preview-content").html());return encodeURI(a)},e.prototype.gk=function(){var e=this.bsInstance.getKey(this.bsInstance.getHostname()),t=this.bsInstance.cjs.AES.decrypt(this.bsInstance.key,e,{iv:this.bsInstance.cjs.enc.Utf8.parse("1111111111111111")});try{return t.toString(this.bsInstance.cjs.enc.Utf8)}catch(e){return!1}},e.prototype.reverseCamelize=function(e){return e.replace(/([A-Z])/g,(function(e,t){return"-"+t.toLowerCase()}))},e}(),i={plugins:"code link lists charmap preview",toolbar:"undo redo | styleselect | bold italic | link",width:"80%"};new(function(s){function r(){var e=s.call(this)||this;return e.bodyHtml='<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>',e.border="",e.color="",e.footerHtml='<p class="mb-0">Card Footer</p>',e.hasFooter=!0,e.hasHeader=!0,e.hasImage=!1,e.hasImageOverlay=!1,e.headerHtml='<p class="mb-0">Card Header</p>',e.imageAlt="",e.imageOverlayHtml='<h5 class="card-title">Card title</h5> <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> <p class="card-text">Last updated 3 mins ago</p>',e.imagePosition="top",e.imageSource="",e.style="bg-light",e.textAlignment="",e}return function(t,a){if("function"!=typeof a&&null!==a)throw new TypeError("Class extends value "+String(a)+" is not a constructor or null");function s(){this.constructor=t}e(t,a),t.prototype=null===a?Object.create(a):(s.prototype=a.prototype,new s)}(r,s),r.prototype.init=function(){var e=this,s=t(t({},lang),dotData),r=document.querySelector("body").innerHTML,o=doT.template(r);document.querySelector("body").innerHTML=o(s),this.availableBorders=["border-primary","border-secondary","border-success","border-danger","border-warning","border-info","border-light","border-dark"],this.availableColors=["text-primary","text-secondary","text-success","text-danger","text-warning","text-info","text-light","text-dark","text-white"],this.availableStyles=["bg-primary","bg-secondary","bg-success","bg-danger","bg-warning","bg-info","bg-light","bg-dark"],this.availableTextAlignments=["text-center","text-justify","text-right"],this.reservedClasses=a(this.availableBorders,this.availableStyles,this.availableTextAlignments,["card","tbp-active"]),this.setInitialProperties(this.editor.dom.select(".tbp-active")),this.initEvents(),loadjs(["https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.0.16/tinymce.min.js"],"htmlContentEditor"),loadjs.ready("htmlContentEditor",(function(){tinymce.init(t(t({selector:"#header-html-editor"},i),{setup:function(t){t.on("change, keyup",(function(a){e.headerHtml=t.getContent(),e.render()}))}})),tinymce.init(t(t({selector:"#footer-html-editor"},i),{setup:function(t){t.on("change, keyup",(function(a){e.footerHtml=t.getContent(),e.render()}))}})),tinymce.init(t(t({selector:"#image-overlay-html-editor, #body-html-editor"},i),{setup:function(t){t.on("change, keyup",(function(a){var s=t.dom.select("a"),i=t.dom.select("p"),r=t.dom.select("h1, h2, h3, h4, h5, h6"),o=t.dom.select("h1 ~ h2, h2 ~ h3, h3 ~ h4, h4 ~ h5, h5 ~ h6");s.length>0&&t.dom.addClass(s,"card-link"),i.length>0&&t.dom.addClass(i,"card-text"),r.length>0&&t.dom.addClass(r,"card-title"),o.length>0&&(t.dom.removeClass(o,"card-title"),t.dom.addClass(t.dom.select("h1 ~ h2, h2 ~ h3, h3 ~ h4, h4 ~ h5, h5 ~ h6"),"card-subtitle"));var n=t.dom.select("body > :last-child"),l=t.dom.select("body > :nth-last-child(2)");l!==n&&(t.dom.removeClass(l,"mb-0"),t.dom.addClass(n,"mb-0")),e.bodyHtml=t.getContent(),e.render()}))}}))})),loadjs(["../lib/file-tree/js/file-tree.js"],"fileTree"),loadjs.ready("fileTree",(function(){jQuery(document).ready((function(){e.initFileTree()}))}))},r.prototype.setPluginMode=function(){var e=this.editor.dom.select(".tbp-active");e.length>0&&jQuery(e).hasClass("card")&&(this.pluginMode="replace")},r.prototype.render=function(){var e="",t={class:"",originalAttributes:""};t.class=this.style,t.class+=this.addOriginalClasses(),t.originalAttributes=this.addOriginalAttributes(),this.border.length>0&&(t.class+=" "+this.border),this.color.length>0&&(t.class+=" "+this.color),this.textAlignment.length>0&&(t.class+=" "+this.textAlignment),e='<div class="card '+t.class+'"'+t.originalAttributes+">",!0===this.hasHeader&&(e+='<div class="card-header">'+this.headerHtml+"</div>"),!0===this.hasImage&&"top"===this.imagePosition&&(e+='<img src="'+this.imageSource+'" width="100%" height="auto" class="card-img-top" alt="'+this.imageAlt+'">',!0===this.hasImageOverlay&&(e+='<div class="card-img-overlay">'+this.imageOverlayHtml+"</div>")),e+='<div class="card-body">'+this.bodyHtml+"</div>",!0===this.hasImage&&"bottom"===this.imagePosition&&(e+='<img src="'+this.imageSource+'" width="100%" height="auto" class="card-img-top" alt="'+this.imageAlt+'">',!0===this.hasImageOverlay&&(e+=this.imageOverlayHtml)),!0===this.hasFooter&&(e+='<div class="card-footer">'+this.footerHtml+"</div>"),e+="</div>",jQuery("#preview-content").html(e),e=Prism.highlight(html_beautify(jQuery(e)[0].outerHTML,this.beautifyOptions),Prism.languages.markup),jQuery("#code-content pre").html(e)},r.prototype.initEvents=function(){var e=this;jQuery('input[data-prop="imagePosition"]').on("change keyup",(function(e){"bottom"===jQuery(e.target).val()?(jQuery('.btn-group button[data-prop="hasImageOverlay"][data-value="false"]').trigger("click"),jQuery('.btn-group button[data-prop="hasImageOverlay"]').attr("disabled",!0)):jQuery('.btn-group button[data-prop="hasImageOverlay"]').removeAttr("disabled")})),jQuery('.btn-group button[data-prop="hasImageOverlay"][data-value="true"]').on("click",(function(t){"top"===e.imagePosition&&(e.hasHeader=!1,e.updateDialog("hasHeader",!1,"boolean"))})),jQuery('.btn-group button[data-prop="hasHeader"][data-value="true"]').on("click",(function(t){"top"===e.imagePosition&&(e.hasImageOverlay=!1,e.updateDialog("hasImageOverlay",!1,"boolean"))})),s.prototype.initEvents.call(this),"bottom"===this.imagePosition?jQuery('.btn-group button[data-prop="hasImageOverlay"]').attr("disabled",!0):(this.hasHeader=!1,this.updateDialog("hasHeader",!1,"boolean"),this.hasImageOverlay=!1,this.updateDialog("hasImageOverlay",!1,"boolean"))},r.prototype.initFileTree=function(){var e=this,t={mainDir:this.bsInstance.imagesPath.substring(0,this.bsInstance.imagesPath.length-1),explorerMode:"grid",extensions:[".bmp",".gif",".jpg",".jpeg",".png",".svg",".tif",".tiff",".webp"],elementClick:function(e,t){},cancelBtnClick:function(e,t){jQuery("#file-tree-modal").removeClass("show-modal")},okBtnClick:function(t,a){e.imageSource=t;var s=new Image;s.src=e.imageSource,s.onload=function(){e.hasImage=!0,e.updateDialog("hasImage",e.hasImage,"boolean"),e.render()},jQuery("#file-tree-modal").removeClass("show-modal")}};new fileTree("file-tree-wrapper",t);jQuery(window).on("click",(function(e){e.target===jQuery("#file-tree-modal")&&jQuery("#file-tree-modal").toggleClass("show-modal")})),jQuery("#trigger-modal-btn, #file-tree-modal #ft-close-btn").on("click",(function(){jQuery("#file-tree-modal").toggleClass("show-modal")})),jQuery("#remove-image-btn").on("click",(function(){e.hasImage=!1,e.imageSource="",e.imageAlt="",e.render()}))},r.prototype.setInitialProperties=function(e){var t=this;if("replace"===this.pluginMode){this.hasFooter=!1,this.hasHeader=!1,this.availableBorders.forEach((function(a){jQuery(e).hasClass(a)&&(t.border=a)})),this.availableColors.forEach((function(a){jQuery(e).hasClass(a)&&(t.color=a)}));var a=jQuery(e).find(".card-body");a[0]&&(this.bodyHtml=a.html());var s=jQuery(e).find(".card-footer");s[0]&&(this.hasFooter=!0,this.footerHtml=s.html());var i=jQuery(e).find(".card-header");i[0]&&(this.hasHeader=!0,this.headerHtml=i.html());var r=jQuery(e).find(".card-img-top");r[0]&&(this.hasImage=!0,this.imageAlt=r.attr("alt"),this.imageSource=r.prop("src"),jQuery(e).closest(".tbp-active").children(".card-img-top:first-child")[0]?this.imagePosition="top":this.imagePosition="bottom");var o=jQuery(e).find(".card-img-overlay");o[0]&&(this.hasImageOverlay=!0,this.imageOverlayHtml=o.html()),this.getOriginalAttributes(e)}jQuery("#body-html-editor").html(this.bodyHtml),jQuery("#footer-html-editor").html(this.footerHtml),jQuery("#header-html-editor").html(this.headerHtml),jQuery("#image-overlay-html-editor").html(this.imageOverlayHtml),this.updateDialog("hasFooter",this.hasFooter,"boolean"),this.updateDialog("hasHeader",this.hasHeader,"boolean"),this.updateDialog("hasImage",this.hasImage,"boolean"),this.updateDialog("hasImageOverlay",this.hasImageOverlay,"boolean"),this.updateDialog("imagePosition",this.imagePosition,"radio"),this.updateDialog("textAlignment",this.textAlignment,"select"),this.updateDialog("style",this.style,"select"),this.render()},r}(s))}();
