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

<div id="dp_product_settings">
  <div class="dp_active form-group" data-cy="active">
    <label>
      <input type="checkbox" data-toggle="switch" class="dp_ajax_input tiny" data-name="active"
             data-model="product_settings"
             {if $dp_config->active}checked="checked"{/if}>
        {l s='Enable the module for this product' mod='dynamicproduct'}
    </label>
  </div>

  <div class="form-group">
    <label>
      <input type="checkbox" data-toggle="switch" class="dp_ajax_input tiny" data-name="required"
             data-model="product_settings"
             {if $dp_config->required}checked="checked"{/if}>
        {l s='Required customization' mod='dynamicproduct'}
    </label>
  </div>

  <div class="dp_config_container">
    <div class="form-group">
      <div>
        <div style="display: inline-block;">
          <div>
            <label class="control-label">{l s='Displayed price' mod='dynamicproduct'}</label>
          </div>
          <div class="input-group money-type">
            <span class="input-group-addon input-group-text">{$currency->sign|escape:'htmlall':'UTF-8'}</span>
            <input type="text" data-name="displayed_price" class="dp_ajax_input form-control"
                   data-model="product_settings" value="{$dp_config->displayed_price|floatval}"
                   style="max-width: 130px;">
          </div>
        </div>

        <div style="display: inline-block;">
          <div>
            <label class="control-label">{l s='Price unit' mod='dynamicproduct'}</label>
          </div>
          <div class="input-group">
            <input type="text" data-name="displayed_price_label" class="dp_ajax_input form-control"
                   placeholder="{l s='Per Kilo, per litre' mod='dynamicproduct'}"
                   data-model="product_settings" value="{$dp_config->displayed_price_label|escape:'htmlall':'UTF-8'}"
                   style="max-width: 200px">
          </div>
        </div>
        <div class="help-block">{l s='You can configure a displayed price if your product has a price of 0' mod='dynamicproduct'}</div>
      </div>
    </div>

    <div class="form-group">
      <label>
        <input type="checkbox" data-toggle="switch" class="dp_ajax_input tiny" data-name="display_dynamic_price"
               data-model="product_settings"
               {if $dp_config->display_dynamic_price}checked="checked"{/if}>
          {l s='Display the calculated price in the category page' mod='dynamicproduct'}
        <div class="help-block">{l s='Applies only if the product has a price of 0' mod='dynamicproduct'}</div>
      </label>
    </div>
  </div>

  <div class="form-group">
    <label>
      <input type="checkbox" data-toggle="switch" class="dp_ajax_input tiny" data-name="display_weight"
             data-model="product_settings"
             {if $dp_config->display_weight}checked="checked"{/if}>
        {l s='Display weight to customers' mod='dynamicproduct'}
    </label>
  </div>

  <div class="form-group">
    <label>
      <input type="checkbox" data-toggle="switch" class="dp_ajax_input tiny" data-name="hide_qty"
             data-model="product_settings"
             {if $dp_config->hide_qty}checked="checked"{/if}>
        {l s='Hide quantity input' mod='dynamicproduct'}
    </label>
  </div>

  <div class="form-group">
    <label>
      <input type="checkbox" data-toggle="switch" class="dp_ajax_input tiny" data-name="multiply_price"
             data-model="product_settings"
             {if $dp_config->multiply_price}checked="checked"{/if}>
        {l s='Multiply price & weight by quantity' mod='dynamicproduct'}
      <div class="help-block">{l s='If activated, the displayed price & weight on the product page will be multiplied by the quantity' mod='dynamicproduct'}</div>
    </label>
  </div>

  <div class="dp_config_container">
      {if is_array($dp_products) && count($dp_products) && !($dp_config->active && count($dp_products) == 1)}
        <div class="form-group">
          <label class="control-labe">{l s='Load configuration' mod='dynamicproduct'}</label>
          <div class="">
            <select class="dp_chosen form-control" style="width: 250px;" id="dp_source_product">
              <option value="0">{l s='Select a product' mod='dynamicproduct'}</option>
                {foreach from=$dp_products item=prod}
                    {if $prod.id_product == $dp_product}{continue}{/if}
                  <option value="{$prod.id_product|intval}">{$prod.label|escape:'htmlall':'UTF-8'}</option>
                {/foreach}
            </select>
            <button type="button" class="btn btn-primary" id="dp_copy_product"><i
                      class="material-icons">content_copy</i> {l s='Load' mod='dynamicproduct'}</button>
            <div class="help-block">{l s='You can copy the selected product configuration to the current product' mod='dynamicproduct'}</div>
          </div>
        </div>
      {/if}

    <div class="form-group">
      <label class="control-label">{l s='Copy configuration' mod='dynamicproduct'}</label>
      <div>
        <select class="dp_chosen form-control" style="width: 250px;" id="dp_target_category">
          <option value="0">{l s='Select a category' mod='dynamicproduct'}</option>
            {foreach from=$dp_categories item=category}
              <option value="{$category.id_category|intval}">{$category.id_category|intval}
                - {$category.name|escape:'htmlall':'UTF-8'}</option>
            {/foreach}
        </select>
        <button type="button" class="btn btn-primary" id="dp_copy_category"><i
                  class="material-icons">content_copy</i> {l s='Copy' mod='dynamicproduct'}</button>
        <div class="help-block">{l s='You can copy this configuration to all products of the selected category' mod='dynamicproduct'}</div>
      </div>
    </div>
  </div>

  <div class="dp_clear"></div>

  <hr>

  <details data-cy="details" class="col-lg-12">
    <summary style="margin: 10px">{l s='Advanced' mod='dynamicproduct'}</summary>
    <div class="form-group">
      <label class="control-label col-lg-4">{l s='Execution order' mod='dynamicproduct'}</label>
      <div class="col-lg-8">
        <div id="dp_exec_order"></div>
      </div>
    </div>
  </details>

  <div class="dp_clear"></div>
</div>
