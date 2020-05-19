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

{if isset($success_message)}
	<div class="alert alert-success">{$success_message|escape:'htmlall':'UTF-8'}</div>
{/if}

<div class="panel">
	<h3>{l s='ABOUT CHANNABLE' mod='channable'}</h3>
	<img src="{$module_dir|escape:'html'}views/img/channable.png" class="img_responsive channable_logo" />
	<p>
		{l s='Channable offers a cloud-based datafeed management tool, which makes online advertisement much easier for online retailers and marketing agencies. Within the tool you can set up clever rules in order to create optimized product feeds and/or connect with the APIs of several platforms, such as Amazon or Admarkt. Free technical support is included.' mod='channable'}
	</p>
	<div class="channable_clear"></div>
	<h3>{l s='SEND YOUR PRESTASHOP ARTICLES TO MORE THAN 100 PRICE COMPARISON WEBSITES, AFFILIATES OR MARKETPLACES.' mod='channable'}</h3>	
	<p>
		{l s='You can generate more traffic for your webshop by creating ads with product information on comparison websites, affiliate networks or marketplaces like eBay, Marktplaats, Beslist.nl, Bol.com, Amazon.com and more. With the Channable datafeed management tool you can easily control the flow of products to each channel. In this way, you can maximize the impact of your online campaign in one control center.' mod='channable'}
	</p>
	<div class="channable_clear"></div>
</div>

<form method="post" action="{$form_url|escape:'html':'UTF-8'}"> 
<div class="panel channable_configuration">
	<h3>{l s='CONFIGURATION' mod='channable'}</h3>
	
	<div class="row">	
		<div class="col-xs-12 col-sm-6">
			<p class="channable_orderstates_config_head">
				{l s='Order states "shipped":' mod='channable'}
			</p>
	
			{foreach from=$order_states item=os}
				<input type="checkbox" name="os[shipped][]" value="{$os.id_order_state|escape:'html':'UTF-8'}" id="os_shipped_{$os.id_order_state|escape:'html':'UTF-8'}" {if $os.id_order_state|in_array:$order_states_shipped}checked{/if} /> <label for="os_shipped_{$os.id_order_state|escape:'html':'UTF-8'}">{$os.name|escape:'html':'UTF-8'}</label>
				<br />
			{/foreach}
		</div>
		
		<div class="col-xs-12 col-sm-6">	
			<p class="channable_orderstates_config_head">
				{l s='Order states "cancelled":' mod='channable'}
			</p>
	
			{foreach from=$order_states item=os}
				<input type="checkbox" name="os[cancelled][]" value="{$os.id_order_state|escape:'html':'UTF-8'}" id="os_cancelled_{$os.id_order_state|escape:'html':'UTF-8'}" {if $os.id_order_state|in_array:$order_states_cancelled}checked{/if} /> <label for="os_cancelled_{$os.id_order_state|escape:'html':'UTF-8'}">{$os.name|escape:'html':'UTF-8'}</label>
				<br />
			{/foreach}		
		</div>		
	</div>
	<div class="row">
		<div class="col-xs-12 col-sm-6">
			<p class="channable_orderstates_config_head channable_top_marged">
				{l s='Order state for imported orders:' mod='channable'}
			</p>
			<select name="os_import" id="os_import">
				{foreach from=$order_states item=os}
					<option value="{$os.id_order_state|escape:'html':'UTF-8'}" {if $os.id_order_state == $order_state_import}selected{/if}>{$os.name|escape:'html':'UTF-8'}</option>
				{/foreach}
			</select>
		</div>
		<div class="col-xs-12 col-sm-6">
			<p class="channable_orderstates_config_head channable_top_marged">
				{l s='Warehouse for imported orders:' mod='channable'}
			</p>
			<select name="order_warehouse" id="order_warehouse">
				<option value="">---</option>
				{if isset($warehouses)}
					{foreach from=$warehouses item=wh}
						<option value="{$wh.id_warehouse|escape:'html':'UTF-8'}" {if $wh.id_warehouse == $order_warehouse}selected{/if}>{$wh.name|escape:'html':'UTF-8'}</option>
					{/foreach}
				{/if}
			</select>		
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12 col-sm-6">
			<p class="channable_orderstates_config_head channable_top_marged">
				{l s='Carrier to use for generated orders:' mod='channable'}
			</p>
			<select name="carrier_import" id="carrier_import">
				<option value="0">---</option>
				{foreach from=$carriers item=c}
					<option value="{$c.id_carrier|escape:'html':'UTF-8'}" {if $c.id_carrier == $order_carrier_import}selected{/if}>{$c.name|escape:'html':'UTF-8'}</option>
				{/foreach}
			</select>
		</div>
	</div>	
	<div class="row">
		<div class="col-xs-12 col-sm-6">		
			<p class="channable_orderstates_config_head channable_top_marged">
				{l s='Use Channable order comment as Private Note' mod='channable'}
			</p>	
			<select name="comment_as_note" id="comment_as_note">
				<option value="0">No</option>
				<option value="1" {if Configuration::get('CHANNABLE_COMMENT_AS_NOTE') == '1'}selected{/if}>Yes</option>
			</select>
		</div>
		<div class="col-xs-12 col-sm-6">		
			<p class="channable_orderstates_config_head channable_top_marged">
				{l s='Use Channable order comment as Customer Thread' mod='channable'}
			</p>	
			<select name="comment_as_customer_thread" id="comment_as_customer_thread">
				<option value="0">No</option>
				<option value="1" {if Configuration::get('CHANNABLE_COMMENT_AS_CUSTOMER_THREAD') == '1'}selected{/if}>Yes</option>
			</select>
		</div>		
	</div>
	<div class="panel-footer">
		<button type="submit" value="1"	id="module_form_submit_btn" name="submitChannableModule" class="btn btn-default pull-right">
			<i class="process-icon-save"></i> {l s='Save' mod='channable'}
		</button>
	</div>
</div>
</form>

<div class="panel">
	<h3>{l s='Feed-URL' mod='channable'}</h3>
	<p>
		{$feed_url|replace:'%2C':','|escape:'html':'UTF-8'}
	</p>
	<p>
		{l s='Key' mod='channable'}: {$channable_key|escape:'html':'UTF-8'}<br />
		{l s='Lang-ID' mod='channable'}: {$lang_id|escape:'html':'UTF-8'}<br />
	</p>
	<p>
		<a href="https://app.channable.com/connect/prestashop_plugin.html?url={$auto_connect_feed_url|escape:'html':'UTF-8'}&api_key={$channable_key|escape:'html':'UTF-8'}" target="_blank" class="btn btn-default">Click here to auto-connect with Channable</a>
	</p>
</div>

<div class="panel">
	<h3>{l s='Webhook-URL & Order-API-URL' mod='channable'}</h3>
	<p>
		{$webhook_url|replace:'%2C':','|escape:'html':'UTF-8'}<br />
		{$order_api_url|replace:'%2C':','|escape:'html':'UTF-8'}<br />
		{$order_api_fetch_url|replace:'%2C':','|escape:'html':'UTF-8'}<br />
	</p>
	<br>
	<h3>{l s='Product-Info-URL' mod='channable'}</h3>
	<p>
		{$product_api_url|replace:'%2C':','|escape:'html':'UTF-8'}<br />
		{l s='Use PrestaShop product ID or reference as id_product-Parameter.' mod='channable'}
	</p>
</div>


{$mainform nofilter} {* not escaped! comes from PS scripts *}


<form method="post" action="{$form_url|escape:'html':'UTF-8'}"> 
	<div class="panel">
		<h3>{l s='Expert: Additional fields in feed' mod='channable'}</h3>
		
		<div class="row">
			<div class="col-xs-12 col-md-6">
				<h4>{l s='Assigned fields:' mod='channable'}</h4>
				
				<div id="no_assign_fields_message">
					{l s='No fields assigned yet. Please use the menu "Avaiable fields".' mod='channable'}
				</div>
				
				<div id="assigned_fields">
					<div id="assign_fields_head" style="display: none;" class="row">
						<div class="col-xs-3">{l s='Table' mod='channable'}</div>
						<div class="col-xs-3">{l s='Field' mod='channable'}</div>
						<div class="col-xs-6">{l s='Name in feed' mod='channable'}</div>
					</div>
				</div>
				
			</div>
			<div class="col-xs-12 col-md-6">
				<h4>{l s='Available fields:' mod='channable'}</h4>
				
				{l s='Please select the additional fields to export' mod='channable'}
				
				<select name="fields_available">
					<option value=""></option>
					{foreach from=$feedfields_available key=fagroup item=faitems}
						<optgroup label="{$fagroup|escape:'html':'UTF-8'}">
							{foreach from=$faitems item=fa}
								<option value="{$fagroup|escape:'html':'UTF-8'}.{$fa|escape:'html':'UTF-8'}">{$fa|escape:'html':'UTF-8'}</option>
							{/foreach}
						</optgroup>
					{/foreach}
				</select>
				
				<button type="button" id="assign_field" class="btn btn-default">
					<i class="icon-chevron-right"></i> {l s='assign' mod='channable'}
				</button>
				
			</div>
		</div>		
		<div class="panel-footer">
			<button type="submit" value="1"	id="module_assignment_form_submit_btn" name="submitChannableAssignmentModule" class="btn btn-default pull-right">
				<i class="process-icon-save"></i> {l s='Save' mod='channable'}
			</button>
		</div>
	</div>
</form>

{if isset($feedfields_assigned) && is_array($feedfields_assigned)}
	<script>
		$(document).ready(function() {literal}{{/literal}			
			{foreach from=$feedfields_assigned item=fa}
				addAssignedRow('{$fa.tablename|escape:'javascript':'UTF-8'}', '{$fa.field_in_db|escape:'javascript':'UTF-8'}', '{$fa.field_in_feed|escape:'javascript':'UTF-8'}');
			{/foreach}			
		{literal}}{/literal});
	</script>
{/if}
