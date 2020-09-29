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

<table class="table table-condensed table-striped">
    <thead>
    <tr class="nodrag nodrop">
      <th class="fixed-width-xl"><span class="title_box">{l s='Combination' mod='dynamicproduct'}</span></th>
      {foreach from=$dp_combination_fields item=combination_field}
        {if isset($dp_fields[$combination_field->id_field])}
          {$field = $dp_fields[$combination_field->id_field]}
          {if strlen($field->name)}
            <th class="fixed-width-sm dp_combination dp_combination_{$field->id|intval}" data-id_field="{$field->id|intval}">
                <span class="title_box">
                    <strong>{$field->name|escape:'htmlall':'UTF-8'}</strong>
                </span>
                <a title="{l s='Remove this column' mod='dynamicproduct'}" class="dp_danger dp_delete_combination_field" href="#">
                  <i class="material-icons">delete</i>
                </a>
            </th>
          {/if}
        {/if}
      {/foreach}
      <th style="width: 165px">
        <select title="{l s='Select the field that you want to add' mod='dynamicproduct'}" class="dp_combination_field" style="width: 100px">
          {foreach from=$dp_fields item=field}
            {if strlen($field->name)}
              <option value="{$field->id|intval}">{$field->name|escape:'htmlall':'UTF-8'}</option>
            {/if}
          {/foreach}
        </select>
        <a title="{l s='Add field column' mod='dynamicproduct'}" class="btn btn-success dp_add_combination_field" href="#">
          <i class="material-icons">add_circle</i>
        </a>
      </th>
    </tr>
    </thead>
    <tbody>
    {foreach from=$dp_combinations item=combination}
        {$id_attribute = $combination.id_product_attribute}
        <tr data-id_attribute="{$id_attribute|intval}">
          <td>{$combination.attribute_designation|escape:'htmlall':'UTF-8'}</td>
          {foreach from=$dp_combination_fields item=combination_field}
            {if isset($dp_fields[$combination_field->id_field])}
                {$field = $dp_fields[$combination_field->id_field]}
                {if strlen($field->name)}
                  <td class="dp_combination dp_combination_{$field->id|intval} {($field->type == 2) ? 'dp_fixed_value' : ''|escape:'htmlall':'UTF-8'}">
                    <div class="input-group">
                      {if $field->type == 3}
                        <span class="input-group-addon input-group-text">{$currency->sign|escape:'htmlall':'UTF-8'}</span>
                      {/if}
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
                {/if}
              {/if}
            {/foreach}
          <td></td>
        </tr>
    {/foreach}
    </tbody>
</table>
