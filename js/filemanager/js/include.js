var encodeURL,show_animation,hide_animation,apply,apply_none,apply_img,apply_any,apply_video,apply_link,apply_file_rename,apply_file_duplicate,apply_folder_rename;!function(y,n,a){"use strict";var t,i=null,c=0,r=(t=0,function(e,a){clearTimeout(t),t=setTimeout(e,a)}),l=function(e){if(1==jQuery("#ftp").val())var a=jQuery("#ftp_base_url").val()+jQuery("#upload_dir").val()+jQuery("#fldr_value").val();else a=jQuery("#base_url").val()+jQuery("#cur_dir").val();var t=e.find("a.link").attr("data-file");return""!=t&&null!=t&&(a+=t),""!=(t=e.find("h4 a.folder-link").attr("data-file"))&&null!=t&&(a+=t),a},s={contextActions:{copy_url:function(e){var a=l(e);bootbox.alert('URL:<br/><div class="input-append" style="width:100%"><input id="url_text" type="text" style="width:80%; height:30px;" value="'+encodeURL(a)+'" /><button id="copy-button" class="btn btn-inverse copy-button" style="width:20%; height:30px;" data-clipboard-target="#url_text" title="copy"><i class="icon icon-white icon-share"></i> '+jQuery("#lang_copy").val()+"</button></div>")},unzip:function(e){var a=jQuery("#sub_folder").val()+jQuery("#fldr_value").val()+e.find("a.link").attr("data-file");show_animation(),y.ajax({type:"POST",url:"ajax_calls.php?action=extract",data:{path:a}}).done(function(e){hide_animation(),""!=e?bootbox.alert(e):window.location.href=jQuery("#refresh").attr("href")+"&"+(new Date).getTime()})},edit_img:function(e){var a=e.attr("data-name"),t=e.attr("data-path");if(1==jQuery("#ftp").val())var r=jQuery("#ftp_base_url").val()+jQuery("#upload_dir").val()+jQuery("#fldr_value").val()+a;else r=jQuery("#base_url").val()+jQuery("#upload_dir").val()+t;var i,n=jQuery("#tui-image-editor");n.attr("data-name",a),n.attr("data-path",r),show_animation(),n.attr("id"),i=r,imageEditor.loadImageFromURL(i,"SampleImage").then(function(e){imageEditor.ui.resizeEditor({imageSize:{oldWidth:e.oldWidth,oldHeight:e.oldHeight,newWidth:e.newWidth,newHeight:e.newHeight}})}).catch(function(e){bootbox.alert("Something went wrong: "+e)}),hide_animation(),n.removeClass("hide")},duplicate:function(a){var t=a.find("h4").text().trim();bootbox.prompt(jQuery("#lang_duplicate").val(),jQuery("#cancel").val(),jQuery("#ok").val(),function(e){null!==e&&(e=Q(e))!=t&&g("duplicate_file",a.attr("data-path"),e,a,"apply_file_duplicate")},t+" - copy")},select:function(e){var a,t=l(e),r=jQuery("#field_id").val();(1==jQuery("#return_relative_url").val()&&(t=(t=t.replace(jQuery("#base_url").val(),"")).replace(jQuery("#cur_dir").val(),"")),a=1==jQuery("#popup").val()?window.opener:window.parent,""!=r)?1==jQuery("#crossdomain").val()?a.postMessage({sender:"responsivefilemanager",url:t,field_id:r},"*"):(jQuery("#"+r,a.document).val(t).trigger("change"),"function"==typeof a.responsive_filemanager_callback&&a.responsive_filemanager_callback(r),j()):apply_any(t)},copy:function(e){u(e,"copy")},cut:function(e){u(e,"cut")},paste:function(){d()},chmod:function(e){!function(e){jQuery("#files_permission_start").parent().parent().remove();var r=e.find(".rename-file-paths"),i=e.closest("figure").attr("data-path"),a=r.attr("data-permissions"),n=r.attr("data-folder");y.ajax({type:"POST",url:"ajax_calls.php?action=chmod",data:{path:i,permissions:a,folder:n}}).done(function(e){bootbox.dialog(e,[{label:jQuery("#cancel").val(),class:"btn"},{label:jQuery("#ok").val(),class:"btn-inverse",callback:function(){var a="-";jQuery("#u_4").is(":checked")?a+="r":a+="-",jQuery("#u_2").is(":checked")?a+="w":a+="-",jQuery("#u_1").is(":checked")?a+="x":a+="-",jQuery("#g_4").is(":checked")?a+="r":a+="-",jQuery("#g_2").is(":checked")?a+="w":a+="-",jQuery("#g_1").is(":checked")?a+="x":a+="-",jQuery("#a_4").is(":checked")?a+="r":a+="-",jQuery("#a_2").is(":checked")?a+="w":a+="-",jQuery("#a_1").is(":checked")?a+="x":a+="-";var e=jQuery("#chmod_form #chmod_value").val();if(""!=e&&void 0!==e){var t=jQuery("#chmod_form input[name=apply_recursive]:checked").val();""!=t&&void 0!==t||(t="none"),y.ajax({type:"POST",url:"execute.php?action=chmod",data:{path:i,new_mode:e,is_recursive:t,folder:n}}).done(function(e){""!=e?bootbox.alert(e):r.attr("data-permissions",a)})}}}],{header:jQuery("#lang_file_permission").val()}),setTimeout(function(){o(!1)},100)})}(e)},edit_text_file:function(e){!function(a){jQuery("#textfile_edit_area").parent().parent().remove();var t=a.closest("figure").attr("data-path");y.ajax({type:"POST",url:"ajax_calls.php?action=get_file&sub_action=edit&preview_mode=text",data:{path:t}}).done(function(e){bootbox.dialog(e,[{label:jQuery("#cancel").val(),class:"btn"},{label:jQuery("#ok").val(),class:"btn-inverse",callback:function(){var e=jQuery("#textfile_edit_area").val();window.editor&&"function"==typeof window.editor.getData&&(e=window.editor.getData()),y.ajax({type:"POST",url:"execute.php?action=save_text_file",data:{path:t,new_content:e}}).done(function(e){""!=e&&bootbox.alert(e)})}}],{header:a.find(".name_download").val()})})}(e)}},makeContextMenu:function(){var r=this;y.contextMenu({selector:"figure:not(.back-directory), .list-view2 figure:not(.back-directory)",autoHide:!0,build:function(t){t.addClass("selected");var e={callback:function(e,a){r.contextActions[e](t)},items:{}};return(t.find(".img-precontainer-mini .filetype").hasClass("png")||t.find(".img-precontainer-mini .filetype").hasClass("jpg")||t.find(".img-precontainer-mini .filetype").hasClass("jpeg"))&&a&&(e.items.edit_img={name:jQuery("#lang_edit_image").val(),icon:"edit_img",disabled:!1}),t.hasClass("directory")&&0!=jQuery("#type_param").val()&&(e.items.select={name:jQuery("#lang_select").val(),icon:"",disabled:!1}),e.items.copy_url={name:jQuery("#lang_show_url").val(),icon:"url",disabled:!1},(t.find(".img-precontainer-mini .filetype").hasClass("zip")||t.find(".img-precontainer-mini .filetype").hasClass("tar")||t.find(".img-precontainer-mini .filetype").hasClass("gz"))&&1==jQuery("#extract_files").val()&&(e.items.unzip={name:jQuery("#lang_extract").val(),icon:"extract",disabled:!1}),t.find(".img-precontainer-mini .filetype").hasClass("edit-text-file-allowed")&&(e.items.edit_text_file={name:jQuery("#lang_edit_file").val(),icon:"edit",disabled:!1}),t.hasClass("directory")||1!=jQuery("#duplicate").val()||(e.items.duplicate={name:jQuery("#lang_duplicate").val(),icon:"duplicate",disabled:!1}),t.hasClass("directory")||1!=jQuery("#copy_cut_files_allowed").val()?t.hasClass("directory")&&1==jQuery("#copy_cut_dirs_allowed").val()&&(e.items.copy={name:jQuery("#lang_copy").val(),icon:"copy",disabled:!1},e.items.cut={name:jQuery("#lang_cut").val(),icon:"cut",disabled:!1}):(e.items.copy={name:jQuery("#lang_copy").val(),icon:"copy",disabled:!1},e.items.cut={name:jQuery("#lang_cut").val(),icon:"cut",disabled:!1}),0==jQuery("#clipboard").val()||t.hasClass("directory")||(e.items.paste={name:jQuery("#lang_paste_here").val(),icon:"clipboard-apply",disabled:!1}),t.hasClass("directory")||1!=jQuery("#chmod_files_allowed").val()?t.hasClass("directory")&&1==jQuery("#chmod_dirs_allowed").val()&&(e.items.chmod={name:jQuery("#lang_file_permission").val(),icon:"key",disabled:!1}):e.items.chmod={name:jQuery("#lang_file_permission").val(),icon:"key",disabled:!1},e.items.sep="----",e.items.info={type:"html",html:"<strong>"+jQuery("#lang_file_info").val()+"</strong>"},e.items.name={name:t.attr("data-name"),icon:"label",disabled:!0},"img"==t.attr("data-type")&&(e.items.dimension={name:t.find(".img-dimension").html(),icon:"dimension",disabled:!0}),"true"!==jQuery("#show_folder_size").val()&&"true"!==jQuery("#show_folder_size").val()||(t.hasClass("directory")?e.items.size={name:t.find(".file-size").html()+" - "+t.find(".nfiles").val()+" "+jQuery("#lang_files").val()+" - "+t.find(".nfolders").val()+" "+jQuery("#lang_folders").val(),icon:"size",disabled:!0}:e.items.size={name:t.find(".file-size").html(),icon:"size",disabled:!0}),e.items.date={name:t.find(".file-date").html(),icon:"date",disabled:!0},e},events:{hide:function(){jQuery("figure").removeClass("selected")}}}),jQuery(document).on("contextmenu",function(e){if(!jQuery(e.target).is("figure"))return!1})},updateMultipleSelectionButtons:function(){0<c?jQuery("#multiple-selection").show(300):jQuery("#multiple-selection").hide(300)},bindGridEvents:function(){var e=jQuery("ul.grid");function r(e){var a=e.attr("data-function");"apply_multiple"==a?(e.find(".selection:visible").trigger("click"),e.find(".selector:visible").trigger("click")):window[a](e.attr("data-file"),jQuery("#field_id").val(),e)}e.on("click",".modalAV",function(e){var a=jQuery(this);e.preventDefault();var t=jQuery("#previewAV"),r=jQuery(".body-preview");t.removeData("modal"),t.modal({backdrop:"static",keyboard:!1}),a.hasClass("audio")?r.css("height","80px"):r.css("height","345px"),y.ajax({url:a.attr("data-url"),success:function(e){r.html(e)}})}),e.on("click",".file-preview-btn",function(e){var a=jQuery(this);e.preventDefault(),y.ajax({url:a.attr("data-url"),success:function(e){bootbox.modal(e," "+a.parent().parent().parent().find(".name").val())}})}),e.on("click",".preview",function(){var e=jQuery(this);return 0==e.hasClass("disabled")&&jQuery("#full-img").attr("src",decodeURIComponent(e.attr("data-url"))),!0}),e.on("click",".rename-file",function(){var a=jQuery(this).closest("figure"),t=a.attr("data-path"),e=a.find("h4"),r=y.trim(e.text());bootbox.prompt(jQuery("#rename").val(),jQuery("#cancel").val(),jQuery("#ok").val(),function(e){null!==e&&(e=Q(e))!=r&&g("rename_file",t,e,a,"apply_file_rename")},r)}),e.on("click",".rename-folder",function(){var a=jQuery(this).closest("figure"),t=a.attr("data-path"),e=a.find("h4"),r=y.trim(e.text());bootbox.prompt(jQuery("#rename").val(),jQuery("#cancel").val(),jQuery("#ok").val(),function(e){null!==e&&(e=Q(e).replace(".",""))!=r&&g("rename_folder",t,e,a,"apply_folder_rename")},r)}),e.on("click",".delete-file",function(){var t=jQuery(this),r=t.closest("figure").attr("data-path");bootbox.confirm(t.attr("data-confirm"),jQuery("#cancel").val(),jQuery("#ok").val(),function(e){if(1==e){g("delete_file",r,"","","");var a=jQuery("#files_number");a.text(parseInt(a.text())-1),t.parent().parent().parent().parent().remove()}})}),e.on("click",".delete-folder",function(){var t=jQuery(this),r=t.closest("figure").attr("data-path");bootbox.confirm(t.attr("data-confirm"),jQuery("#cancel").val(),jQuery("#ok").val(),function(e){if(1==e){g("delete_folder",r,"","","");var a=jQuery("#folders_number");a.text(parseInt(a.text())-1),t.parent().parent().parent().remove()}})}),jQuery("ul.grid").on("click",".link",function(e){e.stopPropagation(),r(jQuery(this))}),jQuery("ul.grid").on("click","div.box",function(e){var a=jQuery(this).find(".link");if(0!==a.length)r(a);else{var t=jQuery(this).find(".folder-link");0!==t.length&&(document.location=jQuery(t).prop("href"))}})},makeFilters:function(e){jQuery("#filter-input").on("keyup",function(){c=0,y(".selection:checkbox").removeAttr("checked"),s.updateMultipleSelectionButtons(),jQuery(".filters label").removeClass("btn-inverse"),jQuery(".filters label").find("i").removeClass("icon-white"),jQuery("#ff-item-type-all").addClass("btn-inverse"),jQuery("#ff-item-type-all").find("i").addClass("icon-white");var a=Q(jQuery(this).val()).toLowerCase();jQuery(this).val(a),e&&r(function(){jQuery("li","ul.grid ").each(function(){var e=jQuery(this);""!=a&&-1==e.attr("data-name").toLowerCase().indexOf(a)?e.hide(100):e.show(100)}),y.ajax({url:"ajax_calls.php?action=filter&type="+a}).done(function(e){""!=e&&bootbox.alert(e)}),r(function(){_(0!=jQuery("#descending").val(),"."+jQuery("#sort_by").val()),b()},500)},300)}).keypress(function(e){13==e.which&&jQuery("#filter").trigger("click")}),jQuery("#filter").on("click",function(){var e=Q(jQuery("#filter-input").val()),a=jQuery("#current_url").val();0<=a.indexOf("?")?a+="&":a+="?",window.location.href=a+"filter="+e})},makeUploader:function(){jQuery("#fileupload").fileupload({url:"upload.php",maxChunkSize:2097152}),jQuery("#fileupload").bind("fileuploaddrop",function(e,a){jQuery(".uploader").show(200),setTimeout(function(){jQuery("#fileupload > div > div.fileupload-buttonbar > div.text-center > button").click()},200)}),jQuery("#fileupload").bind("fileuploadsubmit",function(e,a){a.formData={fldr:jQuery("#sub_folder").val()+jQuery("#fldr_value").val()+(a.files[0].relativePath||a.files[0].webkitRelativePath||"")}}),jQuery("#fileupload").addClass("fileupload-processing"),y.ajax({url:jQuery("#fileupload").fileupload("option","url"),dataType:"json",context:jQuery("#fileupload")[0]}).always(function(){jQuery(this).removeClass("fileupload-processing")}),jQuery(".upload-btn").on("click",function(){jQuery(".uploader").show(200)}),jQuery(".close-uploader").on("click",function(){jQuery(".uploader").hide(200),setTimeout(function(){window.location.href=jQuery("#refresh").attr("href")+"&"+(new Date).getTime()},420)})},uploadURL:function(){jQuery("#uploadURL").on("click",function(e){e.preventDefault();var a=jQuery("#url").val(),t=jQuery("#fldr_value").val();show_animation(),y.ajax({type:"POST",url:"upload.php",data:{fldr:t,url:a}}).done(function(e){hide_animation(),jQuery("#url").val("")}).fail(function(e){bootbox.alert(jQuery("#lang_error_upload").val()),hide_animation(),jQuery("#url").val("")})})},makeSort:function(r){jQuery("input[name=radio-sort]").on("click",function(){var e=jQuery(this).attr("data-item"),a=jQuery("#"+e),t=jQuery(".filters label");c=0,y(".selection:checkbox").removeAttr("checked"),s.updateMultipleSelectionButtons(),t.removeClass("btn-inverse"),t.find("i").removeClass("icon-white"),jQuery("#filter-input").val(""),a.addClass("btn-inverse"),a.find("i").addClass("icon-white"),"ff-item-type-all"==e?(r?jQuery(".grid li").show(300):window.location.href=jQuery("#current_url").val()+"&sort_by="+jQuery("#sort_by").val()+"&descending="+(i?1:0),"undefined"!=typeof Storage&&localStorage.setItem("sort","")):jQuery(this).is(":checked")&&(jQuery(".grid li").not("."+e).hide(300),jQuery(".grid li."+e).show(300),"undefined"!=typeof Storage&&localStorage.setItem("sort",e)),b()});var i=jQuery("#descending").val();jQuery(".sorter").on("click",function(){var e=jQuery(this);i=jQuery("#sort_by").val()!==e.attr("data-sort")||0==i,r?(y.ajax({url:"ajax_calls.php?action=sort&sort_by="+e.attr("data-sort")+"&descending="+(i?1:0)}),_(i,"."+e.attr("data-sort")),jQuery(" a.sorter").removeClass("descending").removeClass("ascending"),i?jQuery(".sort-"+e.attr("data-sort")).addClass("descending"):jQuery(".sort-"+e.attr("data-sort")).addClass("ascending"),jQuery("#sort_by").val(e.attr("data-sort")),jQuery("#descending").val(i?1:0),b()):window.location.href=jQuery("#current_url").val()+"&sort_by="+e.attr("data-sort")+"&descending="+(i?1:0)})}};function o(e){var n=[];if(n.user=0,n.group=0,void(n.all=0)!==e&&1==e){var a=jQuery("#chmod_form #chmod_value").val();n.user=a.substr(0,1),n.group=a.substr(1,1),n.all=a.substr(2,1),y.each(n,function(e){(""==n[e]||0==y.isNumeric(n[e])||parseInt(n[e])<0||7<parseInt(n[e]))&&(n[e]="0")}),jQuery("#chmod_form input:checkbox").each(function(){var e,a,t,r=jQuery(this).attr("data-group"),i=jQuery(this).attr("data-value");e=n[r],a=i,(t=[])[1]=[1,3,5,7],t[2]=[2,3,6,7],t[4]=[4,5,6,7],e=parseInt(e),a=parseInt(a),-1!=y.inArray(e,t[a])?jQuery(this).prop("checked",!0):jQuery(this).prop("checked",!1)})}else jQuery("#chmod_form input:checkbox:checked").each(function(){var e=jQuery(this).attr("data-group"),a=jQuery(this).attr("data-value");n[e]=parseInt(n[e])+parseInt(a)}),jQuery("#chmod_form #chmod_value").val(n.user.toString()+n.group.toString()+n.all.toString())}function u(e,a){var t;"copy"!=a&&"cut"!=a||(t=e.closest("figure").attr("data-path"),y.ajax({type:"POST",url:"ajax_calls.php?action=copy_cut",data:{path:t,sub_action:a}}).done(function(e){""!=e?bootbox.alert(e):(jQuery("#clipboard").val("1"),f(!0))}))}function d(t){bootbox.confirm(jQuery("#lang_paste_confirm").val(),jQuery("#cancel").val(),jQuery("#ok").val(),function(e){var a;1==e&&(a=void 0!==t?t.closest("figure").attr("data-path"):jQuery("#sub_folder").val()+jQuery("#fldr_value").val(),y.ajax({type:"POST",url:"execute.php?action=paste_clipboard",data:{path:a}}).done(function(e){""!=e?bootbox.alert(e):(jQuery("#clipboard").val("0"),f(!1),setTimeout(function(){window.location.href=jQuery("#refresh").attr("href")+"&"+(new Date).getTime()},300))}))})}function f(e){1==e?jQuery(".paste-here-btn, .clear-clipboard-btn").removeClass("disabled"):jQuery(".paste-here-btn, .clear-clipboard-btn").addClass("disabled")}function p(e){var a=jQuery(".breadcrumb").width()+e,t=jQuery("#view"),r=jQuery("#help");if(0<t.val()){if(1==t.val())jQuery("ul.grid li, ul.grid figure").css("width","100%");else{var i=Math.floor(a/380);0==i&&(i=1,jQuery("h4").css("font-size",12)),a=Math.floor(a/i-3),jQuery("ul.grid li, ul.grid figure").css("width",a)}r.hide()}else n.touch&&r.show()}function v(){var e=jQuery(this);0==jQuery("#view").val()&&(1==e.attr("toggle")?(e.attr("toggle",0),e.animate({top:"0px"},{queue:!1,duration:300})):(e.attr("toggle",1),e.animate({top:"-30px"},{queue:!1,duration:300})))}function m(e){var a=jQuery("#cur_dir").val();a=a.replace("\\","/");var t=jQuery("#sub_folder").val();t=t.replace("\\","/");var r=jQuery("#base_url").val(),i=jQuery("#fldr_value").val();i=i.replace("\\","/");for(var n=[],l=jQuery("#return_relative_url").val(),o=1==jQuery("#ftp").val(),u=0;u<e.length;u++){var c=e[u];o?n.push(encodeURL(jQuery("#ftp_base_url").val()+jQuery("#upload_dir").val()+i+c)):n.push(encodeURL((1==l?t+i:r+a)+c))}return n}function h(){return 1==jQuery("#popup").val()?window.opener:window.parent}function j(){1==jQuery("#popup").val()?window.close():("function"==typeof parent.jQuery(".modal:has(iframe)").modal&&parent.jQuery(".modal:has(iframe)").modal("hide"),void 0!==parent.jQuery&&parent.jQuery?"object"==typeof parent.jQuery.fancybox?parent.jQuery.fancybox.getInstance().close():"function"==typeof parent.jQuery.fancybox&&parent.jQuery.fancybox.close():"function"==typeof parent.$.fancybox&&parent.$.fancybox.close())}function Q(e){return null!=e?("true"==jQuery("#transliteration").val()&&(e=(e=function(e){for(var a=[/[\300-\306]/g,/[\340-\346]/g,/[\310-\313]/g,/[\350-\353]/g,/[\314-\317]/g,/[\354-\357]/g,/[\322-\330]/g,/[\362-\370]/g,/[\331-\334]/g,/[\371-\374]/g,/[\321]/g,/[\361]/g,/[\307]/g,/[\347]/g],t=["A","a","E","e","I","i","O","o","U","u","N","n","C","c"],r=0;r<a.length;r++)e=e.replace(a[r],t[r]);return e}(e)).replace(/[^A-Za-z0-9\.\-\[\] _]+/g,"")),"true"==jQuery("#convert_spaces").val()&&(e=e.replace(/ /g,jQuery("#replace_with").val())),"true"==jQuery("#lower_case").val()&&(e=e.toLowerCase()),e=(e=(e=(e=(e=e.replace('"',"")).replace("'","")).replace("/","")).replace("\\","")).replace(/<\/?[^>]+(>|$)/g,""),y.trim(e)):null}function g(e,a,t,r,i){null!==t&&(t=Q(t),y.ajax({type:"POST",url:"execute.php?action="+e,data:{path:a,name:t.replace("/","")}}).done(function(e){return""!=e?(bootbox.alert(e),!1):(""!=i&&window[i](r,t),!0)}))}function _(e,t){var a=jQuery("li.dir","ul.grid").filter(":visible"),r=jQuery("li.file","ul.grid").filter(":visible");c=0,y(".selection:checkbox").removeAttr("checked"),s.updateMultipleSelectionButtons();var i=[],n=[],l=[],o=[];a.each(function(){var e=jQuery(this),a=e.find(t).val();if(y.isNumeric(a))for(a=parseFloat(a);void 0!==i[a]&&i[a];)a=parseFloat(parseFloat(a)+parseFloat(.001));else a=a+"a"+e.find("h4 a").attr("data-file");i[a]=e.html(),n.push(a)}),r.each(function(){var e=jQuery(this),a=e.find(t).val();if(y.isNumeric(a))for(a=parseFloat(a);void 0!==l[a]&&l[a];)a=parseFloat(parseFloat(a)+parseFloat(.001));else a=a+"a"+e.find("h4 a").attr("data-file");l[a]=e.html(),o.push(a)}),y.isNumeric(n[0])?n.sort(function(e,a){return parseFloat(e)-parseFloat(a)}):n.sort(),y.isNumeric(o[0])?o.sort(function(e,a){return parseFloat(e)-parseFloat(a)}):o.sort(),e&&(n.reverse(),o.reverse()),a.each(function(e){jQuery(this).html(i[n[e]])}),r.each(function(e){jQuery(this).html(l[o[e]]),jQuery(this).attr("data-name",jQuery(this).children().attr("data-name"))})}function b(){i.update()}jQuery(document).ready(function(){if(s.makeContextMenu(),"undefined"!=typeof Storage&&1!=jQuery("#type_param").val()&&3!=jQuery("#type_param").val()){var e=localStorage.getItem("sort");if(e){var a=jQuery("#"+e);a.addClass("btn-inverse"),a.find("i").addClass("icon-white"),jQuery(".grid li").not("."+e).hide(300),jQuery(".grid li."+e).show(300)}}if(jQuery(".ff-container").on("click",".checkmark",function(e){e.stopPropagation(),jQuery(this).parent().find("input").is(":checked")?c--:c++,s.updateMultipleSelectionButtons()}),jQuery("#full-img").on("click",function(){jQuery("#previewLightbox").lightbox("hide")}),jQuery("body").on("click",function(){jQuery(".tip-right").tooltip("hide")}),s.bindGridEvents(),parseInt(jQuery("#file_number").val())>parseInt(jQuery("#file_number_limit_js").val()))var t=!1;else t=!0;s.makeSort(t),s.makeFilters(t),s.uploadURL(),jQuery("#info").on("click",function(){bootbox.alert('<div class="text-center"><br/><img src="img/logo.png" alt="responsive filemanager"/><br/><br/><p><strong>RESPONSIVE filemanager v.9.14.0</strong><br/><a href="http://www.responsivefilemanager.com">responsivefilemanager.com</a></p><br/><p>Copyright © <a href="http://www.tecrail.com" alt="tecrail">Tecrail</a> - Alberto Peripolli. All rights reserved.</p><br/><p>License<br/><small><img alt="Creative Commons License" style="border-width:0" src="https://www.responsivefilemanager.com/license.php" /><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/3.0/">Creative Commons Attribution-NonCommercial 3.0 Unported License</a>.</small></p></div>')}),jQuery("#change_lang_btn").on("click",function(){y.ajax({type:"POST",url:"ajax_calls.php?action=get_lang",data:{}}).done(function(e){bootbox.dialog(e,[{label:jQuery("#cancel").val(),class:"btn"},{label:jQuery("#ok").val(),class:"btn-inverse",callback:function(){var a=jQuery("#new_lang_select").val();y.ajax({type:"POST",url:"ajax_calls.php?action=change_lang",data:{choosen_lang:a}}).done(function(e){""!=e?bootbox.alert(e):setTimeout(function(){window.location.href=jQuery("#refresh").attr("href").replace(/lang=[\w]*&/i,"lang="+a+"&")+"&"+(new Date).getTime()},100)})}}],{header:jQuery("#lang_lang_change").val()})})}),s.makeUploader(),jQuery("body").on("keypress",function(e){var a=String.fromCharCode(e.which);if("'"==a||'"'==a||"\\"==a||"/"==a)return!1}),jQuery("ul.grid li figcaption").on("click",'a[data-toggle="lightbox"]',function(){!function(e){show_animation();var a=new Image;a.src=e,jQuery(a).on("load",function(){hide_animation()})}(decodeURIComponent(jQuery(this).attr("data-url")))}),jQuery(".create-file-btn").on("click",function(){jQuery("#textfile_create_area").parent().parent().remove(),y.ajax({type:"GET",url:"ajax_calls.php?action=new_file_form"}).done(function(e){bootbox.dialog(e,[{label:jQuery("#cancel").val(),class:"btn"},{label:jQuery("#ok").val(),class:"btn-inverse",callback:function(){var e=jQuery("#create_text_file_name").val()+jQuery("#create_text_file_extension").val(),a=jQuery("#textfile_create_area").val();if(null!==e){e=Q(e);var t=jQuery("#sub_folder").val()+jQuery("#fldr_value").val();y.ajax({type:"POST",url:"execute.php?action=create_file",data:{path:t,name:e,new_content:a}}).done(function(e){""!=e&&bootbox.alert(e,function(){setTimeout(function(){window.location.href=jQuery("#refresh").attr("href")+"&"+(new Date).getTime()},500)})})}}}],{header:jQuery("#lang_new_file").val()})})}),jQuery(".new-folder").on("click",function(){bootbox.prompt(jQuery("#insert_folder_name").val(),jQuery("#cancel").val(),jQuery("#ok").val(),function(e){if(null!==e){e=Q(e).replace(".","");var a=jQuery("#sub_folder").val()+jQuery("#fldr_value").val();y.ajax({type:"POST",url:"execute.php?action=create_folder",data:{path:a,name:e}}).done(function(e){e?bootbox.alert(jQuery("#rename_existing_folder").val()):setTimeout(function(){window.location.href=jQuery("#refresh").attr("href")+"&"+(new Date).getTime()},300)})}})}),jQuery(".view-controller button").on("click",function(){var e=jQuery(this);jQuery(".view-controller button").removeClass("btn-inverse"),jQuery(".view-controller i").removeClass("icon-white"),e.addClass("btn-inverse"),e.find("i").addClass("icon-white"),y.ajax({url:"ajax_calls.php?action=view&type="+e.attr("data-value")}).done(function(e){""!=e&&bootbox.alert(e)}),void 0!==jQuery("ul.grid")[0]&&jQuery("ul.grid")[0]&&(jQuery("ul.grid")[0].className=jQuery("ul.grid")[0].className.replace(/\blist-view.*?\b/g,"")),void 0!==jQuery(".sorter-container")[0]&&jQuery(".sorter-container")[0]&&(jQuery(".sorter-container")[0].className=jQuery(".sorter-container")[0].className.replace(/\blist-view.*?\b/g,""));var a=e.attr("data-value");jQuery("#view").val(a),jQuery("ul.grid").addClass("list-view"+a),jQuery(".sorter-container").addClass("list-view"+a),1<=e.attr("data-value")?p(14):(jQuery("ul.grid li").css("width",126),jQuery("ul.grid figure").css("width",122)),b()}),n.touch?(jQuery("#help").show(),jQuery(".box:not(.no-effect)").swipe({swipeLeft:v,swipeRight:v,threshold:30})):(jQuery(".tip").tooltip({placement:"bottom"}),jQuery(".tip-top").tooltip({placement:"top"}),jQuery(".tip-left").tooltip({placement:"left"}),jQuery(".tip-right").tooltip({placement:"right"}),jQuery("body").addClass("no-touch")),jQuery(".paste-here-btn").on("click",function(){0==jQuery(this).hasClass("disabled")&&d()}),jQuery(".clear-clipboard-btn").on("click",function(){0==jQuery(this).hasClass("disabled")&&bootbox.confirm(jQuery("#lang_clear_clipboard_confirm").val(),jQuery("#cancel").val(),jQuery("#ok").val(),function(e){1==e&&y.ajax({type:"POST",url:"ajax_calls.php?action=clear_clipboard",data:{}}).done(function(e){""!=e?bootbox.alert(e):jQuery("#clipboard").val("0"),f(!1)})})});var u=function(a){var t=[];return jQuery(".selection:checkbox:checked:visible").each(function(){var e=jQuery(this).val();a&&(e=jQuery(this).closest("figure").attr("data-path")),t.push(e)}),t};if(jQuery(".multiple-action-btn").on("click",function(){var e=u();window[jQuery(this).attr("data-function")](e,jQuery("#field_id").val())}),jQuery(".multiple-deselect-btn").on("click",function(){y(".selection:checkbox").removeAttr("checked"),jQuery("#multiple-selection").hide(300)}),jQuery(".multiple-select-btn").on("click",function(){y(".selection:checkbox:visible").prop("checked",!0)}),jQuery(".multiple-delete-btn").on("click",function(){if(0!=jQuery(".selection:checkbox:checked:visible").length){var e=jQuery(this);bootbox.confirm(e.attr("data-confirm"),jQuery("#cancel").val(),jQuery("#ok").val(),function(e){if(1==e){var a=u(!0);r="delete_files",i=a,o=l=n="",null!==name&&(name=Q(name),y.ajax({type:"POST",url:"execute.php?action="+r,data:{path:i[0],paths:i,names:n}}).done(function(e){return""!=e?(bootbox.alert(e),!1):(""!=o&&window[o](l,name),!0)}));var t=jQuery("#files_number");t.text(parseInt(t.text())-a.length),jQuery(".selection:checkbox:checked:visible").each(function(){jQuery(this).closest("li").remove()}),jQuery("#multiple-selection").hide(300)}var r,i,n,l,o})}}),!n.csstransforms){var r=jQuery("figure");r.on("mouseover",function(){0==jQuery("#view").val()&&!1===jQuery("#main-item-container").hasClass("no-effect-slide")&&jQuery(this).find(".box:not(.no-effect)").animate({top:"-26px"},{queue:!1,duration:300})}),r.on("mouseout",function(){0==jQuery("#view").val()&&jQuery(this).find(".box:not(.no-effect)").animate({top:"0px"},{queue:!1,duration:300})})}jQuery(window).resize(function(){p(28)}),p(14),1==jQuery("#clipboard").val()?f(!0):f(!1),jQuery("li.dir, li.file").draggable({distance:20,cursor:"move",helper:function(){jQuery(this).find("figure").find(".box").css("top","0px");var e=jQuery(this).clone().css("z-index",1e3).find(".box").css("box-shadow","none").css("-webkit-box-shadow","none").parent().parent();return jQuery(this).addClass("selected"),e},start:function(e,a){jQuery(a.helper).addClass("ui-draggable-helper"),0==jQuery("#view").val()&&jQuery("#main-item-container").addClass("no-effect-slide")},stop:function(){jQuery(this).removeClass("selected"),0==jQuery("#view").val()&&jQuery("#main-item-container").removeClass("no-effect-slide")}}),jQuery("li.dir,li.back").droppable({accept:"ul.grid li",activeClass:"ui-state-highlight",hoverClass:"ui-state-hover",drop:function(e,a){!function(t,r){t.hasClass("directory")?t.find(".rename-folder"):t.find(".rename-file");var e=t.closest("figure").attr("data-path");t.parent().hide(100),y.ajax({type:"POST",url:"ajax_calls.php?action=copy_cut",data:{path:e,sub_action:"cut"}}).done(function(e){var a;""!=e?bootbox.alert(e):(a=void 0!==r?r.hasClass("back-directory")?r.find(".path").val():r.closest("figure").attr("data-path"):jQuery("#sub_folder").val()+jQuery("#fldr_value").val(),y.ajax({type:"POST",url:"execute.php?action=paste_clipboard",data:{path:a}}).done(function(e){""!=e?(bootbox.alert(e),t.parent().show(100)):(jQuery("#clipboard").val("0"),f(!1),t.parent().remove())}))}).error(function(){t.parent().show(100)})}(a.draggable.find("figure"),jQuery(this).find("figure"))}}),jQuery(document).on("keyup","#chmod_form #chmod_value",function(){o(!0)}),jQuery(document).on("change","#chmod_form input",function(){o(!1)}),jQuery(document).on("focusout","#chmod_form #chmod_value",function(){var e=jQuery("#chmod_form #chmod_value");null==e.val().match(/^[0-7]{3}$/)&&(e.val(e.attr("data-def-value")),o(!0))}),i=new LazyLoad,new Clipboard(".btn")}),encodeURL=function(e){for(var a=e.split("/"),t=3;t<a.length;t++)a[t]=encodeURIComponent(a[t]);return a.join("/")},apply=function(e,a){var t=h(),r=jQuery("#callback").val(),i="",n=["ogg","mp3","wav"],l=["mp4","ogg","webm"];Array.isArray(e)||(e=new Array(e));var o=m(e),u=JSON.stringify(o);if(1==o.length&&(u=o[0]),""!=a){if(1==jQuery("#crossdomain").val())t.postMessage({sender:"responsivefilemanager",url:u,field_id:a},"*");else jQuery("#"+a,t.document).val(u).trigger("change"),0==r?"function"==typeof t.responsive_filemanager_callback&&t.responsive_filemanager_callback(a):"function"==typeof t[r]&&t[r](a),j()}else{for(var c=0;c<o.length;c++){var s=e[c],d=s.substr(0,s.lastIndexOf(".")),f=s.split(".").pop();f=f.toLowerCase();var p=o[c];-1<y.inArray(f,ext_img)?(jQuery("#add_time_to_img").val()&&(p=p+"?"+(new Date).getTime()),i+='<img src="'+p+'" alt="'+d+'" /> '):-1<y.inArray(f,l)?i+='<video controls source src="'+p+'" type="video/'+f+'">'+d+"</video> ":-1<y.inArray(f,n)?("mp3"==f&&(f="mpeg"),i+='<audio controls src="'+p+'" type="audio/'+f+'">'+d+"</audio> "):i+='<a href="'+p+'" title="'+d+'">'+d+"</a> "}1==jQuery("#crossdomain").val()?t.postMessage({sender:"responsivefilemanager",url:u,field_id:null,html:i},"*"):parent.tinymce.majorVersion<4?(parent.tinymce.activeEditor.execCommand("mceInsertContent",!1,i),parent.tinymce.activeEditor.windowManager.close(parent.tinymce.activeEditor.windowManager.params.mce_window_id)):(parent.tinymce.activeEditor.insertContent(i),parent.tinymce.activeEditor.windowManager.close())}},apply_link=function(e,a){var t=h(),r=jQuery("#callback").val();Array.isArray(e)||(e=new Array(e));var i=m(e),n=JSON.stringify(i);(1==i.length&&(n=i[0]),""!=a)?1==jQuery("#crossdomain").val()?t.postMessage({sender:"responsivefilemanager",url:i[0],field_id:a},"*"):(jQuery("#"+a,t.document).val(n).trigger("change"),0==r?"function"==typeof t.responsive_filemanager_callback&&t.responsive_filemanager_callback(a):"function"==typeof t[r]&&t[r](a),j()):apply_any(i[0])},apply_img=function(e,a){var t=h(),r=jQuery("#callback").val();Array.isArray(e)||(e=new Array(e));var i=m(e),n=JSON.stringify(i);if(1==i.length&&(n=i[0]),""!=a){if(1==jQuery("#crossdomain").val())t.postMessage({sender:"responsivefilemanager",url:i[0],field_id:a},"*");else jQuery("#"+a,t.document).val(n).trigger("change"),0==r?"function"==typeof t.responsive_filemanager_callback&&t.responsive_filemanager_callback(a):"function"==typeof t[r]&&t[r](a),j()}else{if(jQuery("#add_time_to_img").val())var l=i[0]+"?"+(new Date).getTime();else l=i[0];apply_any(l)}},apply_video=function(e,a){var t=h(),r=jQuery("#callback").val();Array.isArray(e)||(e=new Array(e));var i=m(e),n=JSON.stringify(i);(1==i.length&&(n=i[0]),""!=a)?1==jQuery("#crossdomain").val()?t.postMessage({sender:"responsivefilemanager",url:i[0],field_id:a},"*"):(jQuery("#"+a,t.document).val(n).trigger("change"),0==r?"function"==typeof t.responsive_filemanager_callback&&t.responsive_filemanager_callback(a):"function"==typeof t[r]&&t[r](a),j()):apply_any(i[0])},apply_none=function(e,a,t){t.parent().find("form a")[1].click(),jQuery(".tip-right").tooltip("hide")},apply_any=function(e){if(1==jQuery("#crossdomain").val())window.parent.postMessage({sender:"responsivefilemanager",url:e,field_id:null},"*");else if("ckeditor"===jQuery("#editor").val()){var a=(t=new RegExp("(?:[?&]|&)"+"CKEditorFuncNum"+"=([^&]+)","i"),(r=window.location.search.match(t))&&1<r.length?r[1]:null);window.opener.CKEDITOR.tools.callFunction(a,e),window.close()}else window.parent.postMessage({sender:"responsivefilemanager",url:e,field_id:null},window.location.origin),parent.tinymce.activeEditor.windowManager.close();var t,r},apply_file_duplicate=function(e,a){var t=e.parent();t.after("<li class='"+t.attr("class")+"' data-name='"+t.attr("data-name")+"'>"+t.html()+"</li>");var r=t.next();apply_file_rename(r.find("figure"),a);var i=r.find(".download-form"),n="form"+(new Date).getTime();i.attr("id",n),i.find(".tip-right").first().attr("onclick","jQuery('#"+n+"').submit();")},apply_file_rename=function(e,a){var t;e.attr("data-name",a),e.parent().attr("data-name",a),e.find("h4").text(a);var r=e.find("a.link"),i=(t=r.attr("data-file")).substring(t.lastIndexOf("/")+1),n=t.substring(t.lastIndexOf(".")+1);n=n?"."+n:"",r.each(function(){jQuery(this).attr("data-file",encodeURIComponent(a+n))}),e.find("img").each(function(){if(e=jQuery(this).attr("src"))jQuery(this).attr("src",e.replace(i,a+n)+"?time="+(new Date).getTime());else{var e=jQuery(this).attr("data-src");jQuery(this).attr("data-src",e.replace(i,a+n)+"?time="+(new Date).getTime())}jQuery(this).attr("alt",a+" thumbnails")});var l=e.find("a.preview");void 0!==(t=l.attr("data-url"))&&t&&l.attr("data-url",t.replace(encodeURIComponent(i),encodeURIComponent(a+n))),e.parent().attr("data-name",a+n),e.attr("data-name",a+n),e.find(".name_download").val(a+n);var o=e.attr("data-path").replace(i,a+n);e.attr("data-path",o)},apply_folder_rename=function(e,a){e.attr("data-name",a),e.find("figure").attr("data-name",a);var t=e.find("h4").find("a").text();e.find("h4 > a").text(a);var r=e.find(".folder-link"),i=r.attr("href"),n=jQuery("#fldr_value").val(),l=i.replace("fldr="+n+encodeURIComponent(t),"fldr="+n+encodeURIComponent(a));r.each(function(){jQuery(this).attr("href",l)});var o=e.attr("data-path"),u=o.lastIndexOf("/"),c=o.substr(0,u+1)+a;e.attr("data-path",c)},show_animation=function(){jQuery("#loading_container").css("display","block"),jQuery("#loading").css("opacity",".7")},hide_animation=function(){jQuery("#loading_container").fadeOut()}}(jQuery,Modernizr,image_editor),function(){if("function"==typeof window.CustomEvent)return;function e(e,a){a=a||{bubbles:!1,cancelable:!1,detail:void 0};var t=document.createEvent("CustomEvent");return t.initCustomEvent(e,a.bubbles,a.cancelable,a.detail),t}e.prototype=window.Event.prototype,window.CustomEvent=e}();