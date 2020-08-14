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
*/

!function(e){e.fn.dpLang=function(){function n(n){"focusin"==n.type?(e(this).addClass("expanded"),e(".dp_lang_container.expanded").not(this).removeClass("expanded")):e(n.currentTarget).is("html")&&e(".dp_lang_container.expanded").removeClass("expanded")}!!e("html").data("dp_handled")||(e(document).on("focus",".dp_lang_container",n).on("click",".dp_lang_container",function(n){n.stopPropagation()}).on("keyup",".dp_lang input",function(n){27==n.keyCode&&e(this).closest(".dp_lang_container").removeClass("expanded")}),e("html").click(n).data("dp_handled",!0)),e(".dp_lang_container").on("click",function(){event.stopPropagation()})}}(jQuery);