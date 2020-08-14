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

<div id="dp_product_settings">
    <div class="form-group">
        <label class="control-label col-lg-4">{l s='Enable the module for this product' mod='dynamicproduct'}</label>
        <div class="col-lg-8 ">
			<span class="switch-toggle switch-candy switch prestashop-switch fixed-width-lg">
	            <input data-name="active" class="dp_ajax_input" data-model="product_settings" type="radio" name="dp_config_active" id="dp_config_active_on" value="1" {if $dp_config->active}checked="checked"{/if}>
	            <label for="dp_config_active_on">{l s='Yes' mod='dynamicproduct'}</label>
	            <input data-name="active" class="dp_ajax_input" data-model="product_settings" type="radio" name="dp_config_active" id="dp_config_active_off" value="0" {if !$dp_config->active}checked="checked"{/if}>
	            <label for="dp_config_active_off">{l s='No' mod='dynamicproduct'}</label>
	            <a class="slide-button btn"></a>
	        </span>
        </div>
    </div>

    <div class="form-group">
        <label class="control-label col-lg-4">{l s='Required customization' mod='dynamicproduct'}</label>
        <div class="col-lg-8 ">
			<span class="switch-toggle switch-candy switch prestashop-switch fixed-width-lg">
	            <input data-name="required" class="dp_ajax_input" data-model="product_settings" type="radio" name="dp_config_required" id="dp_config_required_on" value="1" {if $dp_config->required}checked="checked"{/if}>
	            <label for="dp_config_required_on">{l s='Yes' mod='dynamicproduct'}</label>
	            <input data-name="required" class="dp_ajax_input" data-model="product_settings" type="radio" name="dp_config_required" id="dp_config_required_off" value="0" {if !$dp_config->required}checked="checked"{/if}>
	            <label for="dp_config_required_off">{l s='No' mod='dynamicproduct'}</label>
	            <a class="slide-button btn"></a>
	        </span>
        </div>
    </div>

    <div id="dp_displayed_price" class="form-group">
        <label class="control-label col-lg-4">{l s='Displayed price' mod='dynamicproduct'}</label>
        <div class="col-lg-8 ">
            <div class="input-group money-type">
                <span class="input-group-addon input-group-text">{$currency->sign|escape:'htmlall':'UTF-8'}</span>
                <input type="text" data-name="displayed_price" name="dp_displayed_price" class="dp_ajax_input form-control" data-model="product_settings" value="{$dp_config->displayed_price|floatval}" style="max-width: 131px">
            </div>
            <div class="help-block">{l s='You can configure a displayed price if your product has a price of 0' mod='dynamicproduct'}</div>
        </div>
    </div>

    <div class="form-group">
        <label class="control-label col-lg-4">{l s='Display weight to customers' mod='dynamicproduct'}</label>
        <div class="col-lg-8 ">
			<span class="switch-toggle switch-candy switch prestashop-switch fixed-width-lg">
	            <input data-name="display_weight" class="dp_ajax_input" data-model="product_settings" type="radio" name="dp_config_display_weight" id="dp_config_display_weight_on" value="1" {if $dp_config->display_weight}checked="checked"{/if}>
	            <label for="dp_config_display_weight_on">{l s='Yes' mod='dynamicproduct'}</label>
	            <input data-name="display_weight" class="dp_ajax_input" data-model="product_settings" type="radio" name="dp_config_display_weight" id="dp_config_display_weight_off" value="0" {if !$dp_config->display_weight}checked="checked"{/if}>
	            <label for="dp_config_display_weight_off">{l s='No' mod='dynamicproduct'}</label>
	            <a class="slide-button btn"></a>
	        </span>
        </div>
    </div>

    <div class="form-group">
        <label class="control-label col-lg-4">{l s='Hide quantity input' mod='dynamicproduct'}</label>
        <div class="col-lg-8 ">
			<span class="switch-toggle switch-candy switch prestashop-switch fixed-width-lg">
	            <input data-name="hide_qty" class="dp_ajax_input" data-model="product_settings" type="radio" name="dp_config_hide_qty" id="dp_config_hide_qty_on" value="1" {if $dp_config->hide_qty}checked="checked"{/if}>
	            <label for="dp_config_hide_qty_on">{l s='Yes' mod='dynamicproduct'}</label>
	            <input data-name="hide_qty" class="dp_ajax_input" data-model="product_settings" type="radio" name="dp_config_hide_qty" id="dp_config_hide_qty_off" value="0" {if !$dp_config->hide_qty}checked="checked"{/if}>
	            <label for="dp_config_hide_qty_off">{l s='No' mod='dynamicproduct'}</label>
	            <a class="slide-button btn"></a>
	        </span>
        </div>
    </div>

    <div class="form-group">
        <label class="control-label col-lg-4">{l s='Multiply price & weight by quantity' mod='dynamicproduct'}</label>
        <div class="col-lg-8 ">
			<span class="switch-toggle switch-candy switch prestashop-switch fixed-width-lg">
	            <input data-name="multiply_price" class="dp_ajax_input" data-model="product_settings" type="radio" name="dp_config_multiply_price" id="dp_config_multiply_price_on" value="1" {if $dp_config->multiply_price}checked="checked"{/if}>
	            <label for="dp_config_multiply_price_on">{l s='Yes' mod='dynamicproduct'}</label>
	            <input data-name="multiply_price" class="dp_ajax_input" data-model="product_settings" type="radio" name="dp_config_multiply_price" id="dp_config_multiply_price_off" value="0" {if !$dp_config->multiply_price}checked="checked"{/if}>
	            <label for="dp_config_multiply_price_off">{l s='No' mod='dynamicproduct'}</label>
	            <a class="slide-button btn"></a>
	        </span>
            <div class="help-block">{l s='If activated, the displayed price & weight on the product page will be multiplied by the quantity' mod='dynamicproduct'}</div>
        </div>
    </div>

    {if is_array($dp_products) && count($dp_products) && !($dp_config->active && count($dp_products) == 1)}
        <div class="form-group">
            <label class="control-label col-lg-4">{l s='Load configuration' mod='dynamicproduct'}</label>
            <div class="col-lg-8 ">
                <select class="dp_chosen form-control" style="width: 250px;" id="dp_source_product">
                    <option value="0">{l s='Select a product' mod='dynamicproduct'}</option>
                    {foreach from=$dp_products item=prod}
                        {if $prod.id_product == $dp_product}{continue}{/if}
                        <option value="{$prod.id_product|intval}">{$prod.label|escape:'htmlall':'UTF-8'}</option>
                    {/foreach}
                </select>
                <button type="button" class="btn btn-primary" id="dp_copy_product"><i class="material-icons">content_copy</i> {l s='Load' mod='dynamicproduct'}</button>
            </div>
        </div>
    {/if}

    <div class="form-group">
        <label class="control-label col-lg-4">{l s='Copy configuration' mod='dynamicproduct'}</label>
        <div class="col-lg-8 ">
            <select class="dp_chosen form-control" style="width: 250px;" id="dp_target_category">
                <option value="0">{l s='Select a category' mod='dynamicproduct'}</option>
                {foreach from=$dp_categories item=category}
                    <option value="{$category.id_category|intval}">{$category.id_category|intval} - {$category.name|escape:'htmlall':'UTF-8'}</option>
                {/foreach}
            </select>
            <button type="button" class="btn btn-primary" id="dp_copy_category"><i class="material-icons">content_copy</i> {l s='Copy' mod='dynamicproduct'}</button>
            <div class="help-block">{l s='You can copy this configuration to all products of the selected category' mod='dynamicproduct'}</div>
        </div>
    </div>

    <p>&nbsp;</p>
</div>
