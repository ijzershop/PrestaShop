{**
* 2010-2018 Tuni-Soft
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
*  @copyright 2014-2015
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*}


<div class="dp_input_div dp_input_{$input->id|intval}">
	{if count($input->fields)}
		{foreach from=$input->fields item=input_field}
			{if !$input_field->displayed}{continue}{/if}
			{if !$input_field->upload && is_numeric($input_field->value)}
				<strong>{$input_field->label|escape:'htmlall':'UTF-8'}:</strong> {$input_field->value|round:3|escape:'htmlall':'UTF-8'} {$input_field->unit_symbol|escape:'htmlall':'UTF-8'}<br>
			{elseif $input_field->upload}
				{if $input_field->image}
					{include file="./partial/thumbnail.tpl"}
				{elseif $input_field->file}
					<strong>{$input_field->label|escape:'htmlall':'UTF-8'}:</strong>
					<a  class="dp_url" target="_blank"
						href="{$dp_module_dir|escape:'htmlall':'UTF-8'}upload/{$input_field->file|escape:'htmlall':'UTF-8'}"
						title="{l s='Download file' mod='dynamicproduct'}">
						{$input_field->file|escape:'htmlall':'UTF-8'}
					</a>
					<br>
				{/if}
			{else}
				{if !is_array($input_field->value)}
					<strong>{$input_field->label|escape:'htmlall':'UTF-8'}:</strong> {$input_field->value|escape:'htmlall':'UTF-8'|nl2br}<br>
				{else}
					{$values = implode(', ', $input_field->value)}
					{if strlen($values)}
						<strong>{$input_field->label|escape:'htmlall':'UTF-8'}:</strong> {$values|escape:'htmlall':'UTF-8'}<br>
					{/if}
				{/if}
			{/if}
		{/foreach}
	{/if}

	{if $input->canDisplayWeight()}
	<strong>{l s='Weight' mod='dynamicproduct'}:</strong>
	{$input->weight|floatval} {Configuration::get('PS_WEIGHT_UNIT')|escape:'htmlall':'UTF-8'}<br>
	{/if}

	{if !$is_seven}
		<strong>{l s='Price' mod='dynamicproduct'}:</strong>
		{Product::convertAndFormatPrice($input->getCombinedPriceWithReduction())|escape:'htmlall':'UTF-8'}
	{/if}
</div>