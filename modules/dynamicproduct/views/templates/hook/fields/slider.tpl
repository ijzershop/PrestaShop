{*
* 2007-2017 PrestaShop
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
*  @copyright 2007-2019 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

<span class="dp_slider_value" data-unit="{$field->getUnitSymbol()|escape:'htmlall':'UTF-8'}"></span>
<input id="dp_{$field->name|escape:'htmlall':'UTF-8'}"
       data-id="{$field->id|intval}"
       data-type="{$field->type|intval}"
       class="dp_entry dp_input dp_slider"
       data-name="{$field->name|escape:'htmlall':'UTF-8'}"
       data-min="{$field->settings->min|floatval}"
       data-max="{$field->settings->max|floatval}"
       data-step="{$field->settings->step|floatval}"
       value="{$field->init|floatval}"
       readonly
       type="hidden"
       style="border:0; font-weight:bold;">
<div class="dp_slider_buttons">
    <a class="dp_slider_button dp_slider_down" href="#"><span class="ui-icon ui-icon-minus"></span></a>
    <a class="dp_slider_button dp_slider_up" href="#"><span class="ui-icon ui-icon-plus"></span></a>
</div>
<div class="dp_slider_control"></div>
{include file="../tooltip/tooltip.tpl"}