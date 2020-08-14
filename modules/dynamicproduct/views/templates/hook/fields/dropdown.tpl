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

<select id="dp_{$field->name|escape:'htmlall':'UTF-8'}"
        data-id="{$field->id|intval}"
        data-type="{$field->type|intval}"
        class="form-control dp_entry dp_dropdown"
        data-name="{$field->name|escape:'htmlall':'UTF-8'}"
        data-label="{$field->label|escape:'htmlall':'UTF-8'}">
    {foreach from=$field->options item=dropdown_option}
        <option data-id="{$dropdown_option->id|intval}"
                data-label="{$dropdown_option->label|escape:'htmlall':'UTF-8'}"
                value="{$dropdown_option->value|escape:'htmlall':'UTF-8'}"
                {if $dropdown_option->is_default}selected="selected"{/if}
        >
            {$dropdown_option->label|escape:'htmlall':'UTF-8'}
        </option>
    {/foreach}
</select>
{include file="../tooltip/tooltip.tpl"}