{*
* 2007-2020 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2020 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}


<div id="dp_generic_equation" class="dp_dynamicproduct_equation dp_style">
    <div class="dp_formula_container dp_generic_container" id="dp_generic_formula_equation">
        <span class="dp_equation_error"></span>
        <textarea class="dp_equation_content" id="dp_generic_formula"></textarea>
        <div class="dp_equation_tools">
            <a href="#" class="dp_equation_tool">=</a>
            <a href="#" data-sign="!=" class="dp_equation_tool" title="{l s='not equal' mod='dynamicproduct'}">≠</a>
            <a href="#" class="dp_equation_tool">&gt;</a>
            <a href="#" class="dp_equation_tool">&lt;</a>
            <a href="#" data-sign="&" class="dp_equation_tool dp_equation_tool_large">AND</a>
            <a href="#" data-sign="|" class="dp_equation_tool dp_equation_tool_large">OR</a>
            <a href="#" class="dp_equation_tool">+</a>
            <a href="#" class="dp_equation_tool">-</a>
            <a href="#" class="dp_equation_tool">*</a>
            <a href="#" class="dp_equation_tool">/</a>
            <a href="#" class="dp_equation_tool">(</a>
            <a href="#" class="dp_equation_tool">)</a>
        </div>
        <div class="dp_equation_fields">
            <a class="dp_equation_field_clone" data-name="" contenteditable="false"></a>
        </div>
        <button style="margin: 5px 0px"
                type="button" class="btn btn-success dp_save_equation">
            <i class="material-icons">save</i> {l s='Save formula' mod='dynamicproduct'}
        </button>
    </div>
</div>
