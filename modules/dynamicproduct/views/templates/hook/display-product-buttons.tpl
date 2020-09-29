{**
* 2010-2020 Tuni-Soft
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
*  @author
*  @copyright 2014-2020
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*}

<div style="display: none;" id="dp_oos" class="alert alert-warning">
    {l s='This product is no longer in stock with the selected values, please select smaller values.' mod='dynamicproduct'}
</div>

<style>
  .dp_hide_container {
    display: none;
  }
</style>

<div class="dp_container dp_hide_container" data-move="{if isset($move_container)}{$move_container}{else}true{/if}"
     style="display: none;">
  <img class="dp_loader" src="{$dp_module_dir|escape:'htmlall':'UTF-8'}views/img/loader.gif" alt="loader"/>
    {foreach $dp_grouped_fields as $id_product_group => $dp_product_group}
        {if $dp_has_groups}
          <fieldset class="dp_group{if $dp_product_group.group->name} dp_group_{$dp_product_group.group->name}{/if}{if $dp_product_group.group->id === 0} dp_group_default{/if}">
            {if $dp_product_group.group->show_label}
              <legend class="dp_group_label">{$dp_product_group.group->label}</legend>
            {/if}
        {/if}
        {foreach $dp_product_group.fields as $field}
            {if !$field->active}{continue}{/if}
            {$label_pos = $field_types[$field->type]['label_pos']}
          <div class="dp_field_container dp_container_type_{$field->type|intval} dp_field_container_{$field->id|intval} dp_no_image"
               data-id_field="{$field->id|intval}">
              {if $field->type != 9}
                <label class="attribute_label dp_type_{$field->type|intval}"
                       style="{if $label_pos === "before"}display:inline-block !important;{/if}"
                >
                    {$field->label|escape:'htmlall':'UTF-8'}
                </label>
              {/if}
              {if $label_pos === "before"}
                  {include file="module:dynamicproduct/views/templates/hook/tooltip/tooltip.tpl"}
                <div class="clear"></div>
              {/if}
            <div class="dp_input_container dp_type_{$field->type|intval}">
              <div class="dp_invalid_btn" title="{l s='This field is required' mod='dynamicproduct'}"></div>
                {if isset($field_types[$field->type])}
                    {$field_file = "module:dynamicproduct/views/templates/hook/fields/`$field_types[$field->type]['name']`.tpl"}
                    {include file=$field_file}
                {/if}
                {if $label_pos === "after"}
                    {include file="module:dynamicproduct/views/templates/hook/tooltip/tooltip.tpl"}
                {/if}
            </div>
          </div>
        {/foreach}
        {if $dp_has_groups}
          </fieldset>
        {/if}
    {/foreach}

    {if $dp_config->display_weight}
      <label class="attribute_label dp_weight_str dp_hidden">{l s='Weight' mod='dynamicproduct'}:</label>
      <span id="dp_weight_str"
            class="dp_weight_str dp_hidden">0 {Configuration::get('PS_WEIGHT_UNIT')|escape:'htmlall':'UTF-8'}</span>
    {/if}

  <div class="dp_validation_messages alert alert-danger">
    <ul>
      <li></li>
    </ul>
  </div>

  <div class="dp_messages alert alert-danger">

  </div>

  <div id="dp_alert" style="display: none;">
    <span></span>
    <br/>
    <p class="submit" style="text-align:right; padding-bottom: 0">
      <input class="button" type="button" value="OK" onclick="$.fancybox.close();"/>
    </p>
  </div>

  <div class="dp-unit-cost">
    <span class="price"></span> {l s='per unit' mod='dynamicproduct'}
  </div>

    {if $main_config->debug_mode}
      <div class="alert alert-warning">
          {l s='Dynamic Product: Debug mode enabled' mod='dynamicproduct'}
      </div>
    {/if}

    {if $is_admin}
      <div class="alert alert-info">
        <ul>
          <li><i class="material-icons">info</i> {l s='This section is displayed to admins only.' mod='dynamicproduct'}
          </li>
          <li>{l s='You can save this customization without adding it to cart.' mod='dynamicproduct'}</li>
          <li>{l s='Saving this customization does not change the order total.' mod='dynamicproduct'}</li>
        </ul>
        <button id="dp_save" class="btn btn-primary">{l s='Save customization' mod='dynamicproduct'}</button>
      </div>
    {/if}
</div>
