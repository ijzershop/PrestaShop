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
*  @copyright 2007-2020 PrestaShop SA
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
                data-color="{$dropdown_option->color|escape:'htmlall':'UTF-8'}"
                data-thumb="{$dropdown_option->getThumbUrl()|escape:'htmlall':'UTF-8'}"
                data-image="{$dropdown_option->getImageUrl()|escape:'htmlall':'UTF-8'}"
                data-has-image="{$dropdown_option->hasImage()|boolval}"
                value="{$dropdown_option->value|escape:'htmlall':'UTF-8'}"
                data-secondary_value="{$dropdown_option->secondary_value|escape:'htmlall':'UTF-8'}"
                class="dp_option dp_option_{$dropdown_option->id|intval}"
                {if $dropdown_option->is_default}selected="selected"{/if}
        >
            {$dropdown_option->label|escape:'htmlall':'UTF-8'}
        </option>
    {/foreach}
</select>
{include file="module:dynamicproduct/views/templates/hook/tooltip/tooltip.tpl"}
<div class="dp_dropdown_image_container">
    <a class="dp_dropdown_image_link" href="#">
        <img class="dp_dropdown_image"
             data-pixel="{$field->getPixelUrl()|escape:'htmlall':'UTF-8'}"
             src="{$field->getPixelUrl()|escape:'htmlall':'UTF-8'}"
             alt="{l s='Option image' mod='dynamicproduct'}"
        />
    </a>
    <div class="dp_dropdown_color"></div>
    {include file="module:dynamicproduct/views/templates/hook/fields/components/modal.tpl"}
</div>
