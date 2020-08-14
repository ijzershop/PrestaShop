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

<div class="row dp_proportion dp_proportion_{$proportion->id|intval}" data-id="{$proportion->id|intval}">
    <div class="col-lg-8">
        <div class="input-group">
            <input class="dp_proportion_id_proportion" type="hidden" value="{$proportion->id|intval}">
            <select class="dp_proportion_id_field form-control">
                <option value="0"></option>
                {foreach from=$dp_fields item=field}
                    {if !$field->active || $field->type != 1}{continue}{/if}
                    <option {if $proportion->id_field == $field->id}selected{/if} value="{$field->id|intval}">{$field->name|escape:'htmlall':'UTF-8'}</option>
                {/foreach}
            </select>
            <span class="input-group-addon input-group-text">=</span>
            <input type="text" class="form-control dp_proportion_value" value="{$proportion->value|floatval}">
            <span class="input-group-addon input-group-text">x</span>
            <select class="dp_proportion_id_field_src form-control">
                <option value="0"></option>
                {foreach from=$dp_fields item=field}
                    {if !$field->active || $field->type != 1}{continue}{/if}
                    <option {if $proportion->id_field_src == $field->id}selected{/if} value="{$field->id|intval}">{$field->name|escape:'htmlall':'UTF-8'}</option>
                {/foreach}
            </select>
        </div>
    </div>
    <div class="col-lg-2">
        <button class="btn btn-danger dp_proportions_delete" title="{l s='Delete this item' mod='dynamicproduct'}">
            <i class="material-icons">close</i>
        </button>
    </div>
</div>
