/*
* 2010-2021 Tuni-Soft
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
* @copyright 2010-2021 Tuni-Soft
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/

!function(r){r.fn.ajaxfileupload=function(t){var i={params:{},action:"",onStart:function(){},onComplete:function(t){},onCancel:function(){},validate_extensions:!0,valid_extensions:["gif","png","jpg","jpeg"],submit_button:null},o=!1;return t&&r.extend(i,t),this.each(function(){var n,a,e=r(this);!0!==e.data("ajaxUploader-setup")&&(e.change(function(){o=!1,null===i.submit_button&&n()}),null===i.submit_button||i.submit_button.click(function(t){t.preventDefault(),o||n()}),n=function(){if(""===e.val())return i.onCancel.apply(e,[i.params]);var t=e.val().split(".").pop().toLowerCase();!0===i.validate_extensions&&-1===r.inArray(t,i.valid_extensions)?i.onComplete.apply(e,[{status:!1,message:"The select file type is invalid. File must be "+i.valid_extensions.join(", ")+"."},i.params]):(o=!0,a(e),!1!==i.onStart.apply(e,[i.params])?e.parent("form").submit(function(t){t.stopPropagation()}).submit():o=!1)},e.data("ajaxUploader-setup",!0),a=function(t){var n="ajaxUploader-iframe-"+Math.round((new Date).getTime()/1e3);r("body").after('<iframe width="0" height="0" style="display:none;" name="'+n+'" id="'+n+'"/>'),r("#"+n).get(0).onload=function(){!function(n,t){var a,n=r(n).contents().text();try{a=JSON.parse(n)}catch(t){a=n}t.siblings().remove(),t.unwrap(),o=!1,i.onComplete.apply(t,[a,i.params])}(this,t)},t.wrap(function(){return'<form action="'+i.action+'" method="POST" enctype="multipart/form-data" target="'+n+'" />'}).before(function(){var t,n="";for(t in i.params){var a=i.params[t];n+='<input type="hidden" name="'+t+'" value="'+(a="function"==typeof a?a():a)+'" />'}return n})})})}}(jQuery);