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

<table class="table table-condensed table-striped">
    <thead>
    <tr class="nodrag nodrop">
        <th class="fixed-width-xl"><span class="title_box">{l s='Combination' mod='dynamicproduct'}</span></th>
        {foreach from=$dp_fields key=id_field item=field}
            {if ($field->type != 2 && $field->type != 3) || !strlen($field->name)}{continue}{/if}
            <th class="fixed-width-sm dp_combination dp_combination_{$field->id|intval}" data-id_field="{$field->id|intval}">
                        <span class="title_box">
                            <strong>{$field->name|escape:'htmlall':'UTF-8'}</strong>
                        </span>
            </th>
        {/foreach}
    </tr>
    </thead>
    <tbody>
    {foreach from=$dp_combinations item=combination}
        {$id_attribute = $combination.id_product_attribute}
        <tr data-id_attribute="{$id_attribute|intval}">
            <td>{$combination.attribute_designation|escape:'htmlall':'UTF-8'}</td>
            {foreach from=$dp_fields key=id_field item=field}
                {if ($field->type != 2 && $field->type != 3) || !strlen($field->name)}{continue}{/if}
                <td class="dp_combination dp_combination_{$field->id|intval} {($field->type == 2) ? 'dp_fixed_value' : ''|escape:'htmlall':'UTF-8'}">
                    <div class="input-group">
                        <span class="input-group-addon input-group-text">{$currency->sign|escape:'htmlall':'UTF-8'}</span>
                        <input class="dp_combination_input dp_combination_input_{$field->id|intval} form-control"
                               placeholder="{$field->init|floatval}"
                               data-id_field="{$field->id|intval}"
                               data-type="float"
                               {if isset($dp_combination_values[$id_attribute]) && isset($dp_combination_values[$id_attribute][$field->id])}
                                    {$combination_value = $dp_combination_values[$id_attribute][$field->id]}
                                    {if Validate::isLoadedObject($combination_value)}
                                        value="{$combination_value->value|floatval}"
                                        rel="full"
                                    {/if}
                               {/if}
                               type="text"
                        />
                    </div>
                </td>
            {/foreach}
        </tr>
    {/foreach}
    </tbody>
</table>