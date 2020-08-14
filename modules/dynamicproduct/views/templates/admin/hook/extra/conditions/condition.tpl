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

<div class="dp_fields_condition dp_fields_condition_{$dp_condition->id|intval}" data-id="{$dp_condition->id|intval}">

    <div class="dp_condition_formula" title="{l s='Click to edit' mod='dynamicproduct'}">
        <span>{$dp_condition->formula|escape:'htmlall':'UTF-8'}</span>
    </div>

    <div class="dp_condition_name">
        <input type="text" value="{$dp_condition->name|escape:'htmlall':'UTF-8'}" placeholder="{l s='Name (optional)' mod='dynamicproduct'}">
    </div>

    {$dp_condition_visibility = $dp_condition->getVisibilityValues()}
    <div class="dp_equation_fields">
        <label class="dp_condition_label">{l s='Visibility' mod='dynamicproduct'}</label>
        {foreach from=$dp_fields key=id_field item=field}
            {if !strlen($field->name)}{continue}{/if}

            {$value = 1}
            {$field_visibility_class = ''}
            {if isset($dp_condition_visibility[$field->id])}
                {$field_visibility_class = 'dp_condition_field_hidden'}
                {$value = 0}
            {/if}

            <a href="#"
               data-id_field="{$field->id|intval}"
               data-value="{$value|intval}"
               class="dp_equation_field dp_condition_field dp_condition_field_{$field->id|intval} {$field_visibility_class|escape:'htmlall':'UTF-8'}"
            >
                {$field->name|escape:'htmlall':'UTF-8'}
            </a>
        {/foreach}
    </div>

    <button type="button" class="btn btn-danger dp_condition_delete" title="{l s='Delete condition' mod='dynamicproduct'}"><i class="material-icons">delete</i></button>
</div>
