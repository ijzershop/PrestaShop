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
        class="form-control dp_entry dp_thumbnails"
        data-name="{$field->name|escape:'htmlall':'UTF-8'}"
        data-label="{$field->label|escape:'htmlall':'UTF-8'}"
        data-multiselect="{$field->settings->multiselect|intval}"
        {if $field->settings->multiselect}multiple{/if}>
    {foreach from=$field->options item=thumbnails_option}
        <option data-id="{$thumbnails_option->id|intval}"
                value="{$thumbnails_option->value|escape:'htmlall':'UTF-8'}"
                data-secondary_value="{$thumbnails_option->secondary_value|escape:'htmlall':'UTF-8'}"
                {if $thumbnails_option->is_default}selected="selected"{/if}
        >{$thumbnails_option->label|escape:'htmlall':'UTF-8'}</option>
    {/foreach}
</select>
<ul id="dp_thumbnails_{$field->name|escape:'htmlall':'UTF-8'}" class="dp_thumbnails_list {if $field->settings->multiselect}dp_multiselect{/if}">
    {foreach from=$field->options item=thumbnails_option}
        {$size = max($field->settings->max_size, 26)}
        <li class="{if $thumbnails_option->is_default}dp_selected{/if} dp_thumb_{$thumbnails_option->id|intval} dp_option dp_option_{$thumbnails_option->id|intval}"
            style="{if $size != 26} width: {$size|intval}px; height: {$size|intval}px; {/if}">
            {if $size >= 50}
                <a href="#" data-url="{$thumbnails_option->getImageUrl()|escape:'htmlall':'UTF-8'}"
                   title="{l s='View image' mod='dynamicproduct'}" class="dp-thumb-magnify">
                    <i class="material-icons">zoom_in</i>
                </a>
            {/if}
            <a style="background-color: {$thumbnails_option->color|escape:'htmlall':'UTF-8'};"
               title="{$thumbnails_option->label|escape:'htmlall':'UTF-8'}" data-id="{$thumbnails_option->id|intval}">
                <img loading="lazy"
                     width="{$size|intval}"
                     height="{$size|intval}"
                     src="{$thumbnails_option->getThumbUrl()|escape:'htmlall':'UTF-8'}" />
            </a>
            <span>{$thumbnails_option->label|escape:'htmlall':'UTF-8'}</span>
        </li>
    {/foreach}
</ul>
{include file="module:dynamicproduct/views/templates/hook/fields/components/modal.tpl"}