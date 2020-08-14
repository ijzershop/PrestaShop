{*
* 2007-2019 PrestaShop
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

<table id="dp_fields_table" class="table dp_dnd_table dp_ajax_table dp_lang_table table-condensed table-striped" data-class="field">
    <thead>
    <tr class="nodrag nodrop">
        <th class="dp_fav"><span class="title_box"></span></th>
        <th class="fixed-width-xs"><span class="title_box"></span></th>
        <th class="fixed-width-md"><span class="title_box">{l s='Name' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-lg"><span class="title_box">{l s='Label' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-md center"><span class="title_box">{l s='Type' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-sm center"><span class="title_box">{l s='Value' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-sm center"><span class="title_box">{l s='Unit' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-xs center"><span class="title_box">{l s='Options' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-xs center"><span class="title_box">{l s='Image' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-sm center"><span class="title_box">{l s='Actions' mod='dynamicproduct'}</span></th>
        <th class="dp_drag center"></th>
    </tr>
    </thead>
    <tbody>
    {foreach from=$dp_fields item=field}
        <tr id="dp_row_{$field->id|intval}"
            data-id_field="{$field->id|intval}"
            data-type="{$field->type|intval}"
            type="field_{$field->type|intval}"
            class="{if $field->favorite}dp_favorite_field{/if} {if $field->common}dp_common_field{/if} {if $field->linked}dp_linked_field{/if}"
        >
            <td class="dp_fav">
                {if !$field->linked}
                    <a title="{l s='Add this field to your favorites' mod='dynamicproduct'}" class="dp_add_favorite_btn" href="#"><i class="material-icons">star</i></a>
                    <a title="{l s='Remove this field from your favorites' mod='dynamicproduct'}" class="dp_remove_favorite_btn" href="#"><i class="material-icons">star_border</i></a>
                    <a title="{l s='Add this field to common fields' mod='dynamicproduct'}" class="dp_add_common_btn" href="#"><i class="material-icons">share</i></a>
                    <a title="{l s='Remove this field from common fields' mod='dynamicproduct'}" class="dp_remove_common_btn" href="#"><i class="material-icons">share</i></a>
                {/if}
            </td>
            <td class="id_field">
                {$field->id|intval}
            </td>
            <td><input data-name="name" data-type="plain" value="{$field->name|escape:'htmlall':'UTF-8'}" type="text" class="form-control"/></td>
            <td>
                <div class="dp_group dp_input_lang" data-id_field="{$field->id|intval}" data-class="field">
                    <div class="dp_lang_container">
                        {foreach from=$dp_languages item=lang}
                            <div class="dp_lang">
                                <input type="text" value="{if isset($field->label[$lang.id_lang])}{$field->label[$lang.id_lang]|escape:'javascript':'UTF-8'}{/if}" data-name="label" data-id_lang="{$lang.id_lang|intval}" class="dp_lang_input form-control">
                                <img alt="{$lang.name|escape:'htmlall':'UTF-8'}" class="dp_flag" title="{$lang.name|escape:'htmlall':'UTF-8'}" src="{$ps_base_url|escape:'htmlall':'UTF-8'}img/l/{$lang.id_lang|intval}.jpg"/>
                            </div>
                        {/foreach}
                    </div>
                </div>
            </td>
            <td>
                <select data-name="type" class="form-control dp_field_type_{$field->type|intval}">
                    {foreach from=$dp_field_types key=type item=dp_field_type}
                        <option {if $field->type == $type}selected="selected"{/if}
                                class="dp_field_type_{$type|intval}"
                                value="{$type|intval}">
                            {$dp_field_type.label|escape:'htmlall':'UTF-8'}
                        </option>
                    {/foreach}
                </select>
            </td>
            <td class="center">
                <div class="dp_field_value">
                    <div class="input-group">
                        <span class="input-group-addon input-group-text">{$currency->sign|escape:'htmlall':'UTF-8'}</span>
                        <input data-name="init" data-type="float" value="{$field->init|floatval}" type="text" class="form-control"/>
                    </div>
                </div>
            </td>
            <td>
                <select data-name="id_unit" class="dp_unit_select form-control">
                    <option value="0"></option>
                    {foreach from=$dp_units item=unit}
                        <option {if $field->id_unit == $unit->id}selected="selected"{/if} value="{$unit->id|intval}">{$unit->name|escape:'htmlall':'UTF-8'}</option>
                    {/foreach}
                </select>
            </td>
            <td class="center">
                <a class="dp_field_settings_btn" href="#">
                    <i class="material-icons">settings</i>
                </a>
                {include file="./options.tpl"}
            </td>
            <td class="center">
                {$cls = 'dp_empty'}
                {if $field->hasImage()}
                    {$cls = ''}
                {/if}
                <div class="dp_upload {$cls|escape:'htmlall':'UTF-8'}">
                    <a class="dp_u_delete" href="#"><i class="material-icons">delete</i></a>
                    <a class="dp_u_external" href="{$field->getImageUrl()|escape:'htmlall':'UTF-8'}" target="_blank"><i class="material-icons">link</i></a>
                    <img class="dp_field_image" src="{if $field->hasImage()}{$field->getThumbUrl()|escape:'htmlall':'UTF-8'}{else}{$dp_module_dir|escape:'htmlall':'UTF-8'}views/img/empty.png{/if}" width="35" height="35" alt="">
                    <input type="file" title="">
                </div>
            </td>
            <td class="center">
                {if $field->active}
                    <a data-name="active" data-value="1" class="list-action-enable action-enabled dp_active" href="#" title="{l s='Displayed' mod='dynamicproduct'}">
                        <i class="material-icons dp_on">visibility</i>
                        <i class="material-icons dp_off">visibility_off</i>
                    </a>
                {else}
                    <a data-name="active" data-value="0" class="list-action-enable action-disabled" href="#" title="{l s='Not displayed' mod='dynamicproduct'}">
                        <i class="material-icons dp_on">visibility</i>
                        <i class="material-icons dp_off">visibility_off</i>
                    </a>
                {/if}
                <div class="dp_more_options_container">
                    <a title="{l s='More options' mod='dynamicproduct'}" data-class="field" class="btn dp_more_options">
                        <i class="material-icons">more_vert</i>
                    </a>
                    <div class="dp_more_options_list">
                        <ul>
                            <li>
                                <a class="btn dp_duplicate_field">
                                    <i class="material-icons">content_copy</i> {l s='Duplicate this field' mod='dynamicproduct'}
                                </a>
                            </li>
                            <li>
                                <a title="{if $field->linked}{l s='This will not delete the original field' mod='dynamicproduct'}{else}{l s='Delete this field' mod='dynamicproduct'}{/if}"
                                   data-class="field"
                                   class="btn dp_danger dp_delete_field">
                                    <i class="material-icons">delete</i> {l s='Delete this field' mod='dynamicproduct'}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </td>
            <td class="dp_drag"><a href="#"></a></td>
        </tr>
    {/foreach}
    </tbody>
</table>
