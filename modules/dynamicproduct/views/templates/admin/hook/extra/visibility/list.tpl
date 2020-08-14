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

<table class="table table-condensed table-striped">
    <thead>
    <tr class="nodrag nodrop">
        <th class="fixed-width-xl"><span class="title_box">{l s='Combination' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-sm dp_visibility dp_visibility_0" data-id_field="0">
                    <span class="title_box" title="{l s='Show or Hide the fields based on the selected combination' mod='dynamicproduct'}">
                        <strong>{l s='All' mod='dynamicproduct'}</strong>
                    </span>
        </th>
        {foreach from=$dp_fields key=id_field item=field}
            {if !strlen($field->name)}{continue}{/if}
            <th class="fixed-width-sm dp_visibility dp_visibility_{$id_field|intval}" data-id_field="{$field->id|intval}">
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
        <tr data-id_attribute="{$combination.id_product_attribute|intval}">
            <td>{$combination.attribute_designation|escape:'htmlall':'UTF-8'}</td>
            <td class="dp_visibility dp_visibility_0">
                <div class="input-group">
                    {$visible = !isset($dp_visibility.$id_attribute[0])}
                    <a data-id_field="0"
                       data-value="{($visible) ? 1 : 0|intval}"
                       class="dp_visibility_input dp_visibility_input_0 {($visible) ? 'dp_active' : ''|escape:'htmlall':'UTF-8'}"
                       href="#"
                    >
                        <i class="material-icons dp_on">check</i>
                        <i class="material-icons dp_off">close</i>
                    </a>
                </div>
            </td>
            {foreach from=$dp_fields key=id_field item=field}
                {if !strlen($field->name)}{continue}{/if}
                <td class="dp_visibility dp_visibility_{$field->id|intval}">
                    {$visible = !isset($dp_visibility.$id_attribute[$field->id])}
                    <a data-id_field="0"
                       data-value="{($visible) ? 1 : 0|intval}"
                       class="dp_visibility_input dp_visibility_input_{$field->id|intval} {($visible) ? 'dp_active' : ''|escape:'htmlall':'UTF-8'}"
                       href="#"
                    >
                        <i class="material-icons dp_on">check</i>
                        <i class="material-icons dp_off">close</i>
                    </a>
                </td>
            {/foreach}
        </tr>
    {/foreach}
    </tbody>
</table>