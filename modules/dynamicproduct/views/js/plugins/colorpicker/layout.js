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

!function(c){var r=function(o){var i=c("ul.navigationTabs a").removeClass("active").index(this);c(this).addClass("active").blur(),c("div.tab").hide().eq(i).show()};EYE.register(function(){var o=window.location.hash.replace("#",""),o=c("ul.navigationTabs a").bind("click",r).filter("a[rel="+o+"]");0==o.length&&(o=c("ul.navigationTabs a:first")),r.apply(o.get(0)),c("#colorpickerHolder").ColorPicker({flat:!0}),c("#colorpickerHolder2").ColorPicker({flat:!0,color:"#00ff00",onSubmit:function(o,i,r){c("#colorSelector2 div").css("backgroundColor","#"+i)}}),c("#colorpickerHolder2>div").css("position","absolute");var i=!1;c("#colorSelector2").bind("click",function(){c("#colorpickerHolder2").stop().animate({height:i?0:173},500),i=!i}),c("#colorpickerField1, #colorpickerField2, #colorpickerField3").ColorPicker({onSubmit:function(o,i,r,e){c(e).val(i),c(e).ColorPickerHide()},onBeforeShow:function(){c(this).ColorPickerSetColor(this.value)}}).bind("keyup",function(){c(this).ColorPickerSetColor(this.value)}),c("#colorSelector").ColorPicker({color:"#0000ff",onShow:function(o){return c(o).fadeIn(500),!1},onHide:function(o){return c(o).fadeOut(500),!1},onChange:function(o,i,r){c("#colorSelector div").css("backgroundColor","#"+i)}})},"init")}(jQuery);