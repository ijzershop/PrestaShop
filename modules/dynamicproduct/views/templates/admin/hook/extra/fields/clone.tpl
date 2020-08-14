{*
* 2007-2018 PrestaShop
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
*  @copyright 2007-2018 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

<tr data-id_field="0" class="dp_tr_clone">
    <td class="dp_fav">
        <a title="{l s='Add this field to your favorites' mod='dynamicproduct'}" class="dp_add_favorite_btn" href="#"><i class="icon-star"></i></a>
        <a title="{l s='Remove this field from your favorites' mod='dynamicproduct'}" class="dp_remove_favorite_btn" href="#"><i class="icon-star-empty"></i></a>
        <a title="{l s='Add this field to common fields' mod='dynamicproduct'}" class="dp_add_common_btn" href="#"><i class="icon-share-alt"></i></a>
        <a title="{l s='Remove this field from common fields' mod='dynamicproduct'}" class="dp_remove_common_btn" href="#"><i class="icon-share-alt-square"></i></a>
    </td>
    <td class="id_field"></td>
    <td><input data-name="name" data-type="plain" value="" type="text" class="form-control"/></td>
    <td>
        <div class="dp_group dp_input_lang" data-id_field="0" data-class="field">
            <div class="dp_lang_container">
                {foreach from=$dp_languages item=lang}
                    <div class="dp_lang">
                        <input type="text" value="" data-name="label" data-id_lang="{$lang.id_lang|intval}" class="dp_lang_input form-control">
                        <img class="dp_flag" title="{$lang.name|escape:'htmlall':'UTF-8'}" src="{$ps_base_url|escape:'htmlall':'UTF-8'}img/l/{$lang.id_lang|intval}.jpg"/>
                    </div>
                {/foreach}
            </div>
        </div>
    </td>
    <td>
        <select data-name="type" class="dp_change_val form-control" data-target="dynamic_field">
            {foreach from=$dp_field_types key=type item=dp_field_type}
                <option value="{$type|intval}">{$dp_field_type|escape:'htmlall':'UTF-8'}</option>
            {/foreach}
        </select>
    </td>
    <td class="center">
        <div class="dp_dynamic_field">
            <input data-name="init" data-type="float" value="0" type="text" class="form-control"/>
        </div>
    </td>
    <td>
        <select data-name="id_unit" class="dp_dynamic_field dp_unit_select form-control">
            <option value="0"></option>
            {foreach from=$dp_units item=unit}
                <option value="{$unit->id|intval}">{$unit->name|escape:'htmlall':'UTF-8'}</option>
            {/foreach}
        </select>
    </td>
    <td class="center"><a class="dp_unit_value dp_dynamic_field" href="#"><i class="icon-list"></i></a></td>
    <td class="center">
        <div class="dp_upload dp_empty">
            <a class="dp_u_delete" data-target="field" href="#"><i class="icon-remove"></i></a>
            <a class="dp_u_external" href="{$dp_module_dir|escape:'htmlall':'UTF-8'}views/img/empty.png" target="_blank"><i class="icon-external-link-sign"></i></a>
            <img class="dp_field_image" src="{$dp_module_dir|escape:'htmlall':'UTF-8'}views/img/empty.png" width="35" height="35" alt="">
        </div>
    </td>
    <td class="center">
        <a data-name="active" data-value="1" class="list-action-enable action-enabled dp_check" href="#" title="{l s='Enabled' mod='dynamicproduct'}">
            <i class="icon-check"></i>
            <i class="icon-remove hidden"></i>
        </a>
        <a data-class="field" href="#" class="btn btn-default dp_del_btn"><i class="icon-trash"></i></a>
    </td>
    <td class="dp_drag"><a href="#"></a></td>
</tr>