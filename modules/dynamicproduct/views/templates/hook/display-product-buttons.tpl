{**
* 2010-2019 Tuni-Soft
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

<div id="dp_oos" class="alert alert-warning">
	{l s='This product is no longer in stock with the selected values, please select smaller values.' mod='dynamicproduct'}
</div>

<div class="dp_container" style="display: _none;">
	<img class="dp_loader" src="{$dp_module_dir|escape:'htmlall':'UTF-8'}views/img/loader.gif" alt="loader" />
	{foreach from=$dp_fields item=field}
		{if !$field->active}{continue}{/if}
		<div class="dp_field_container dp_container_type_{$field->type|intval} dp_field_container_{$field->id|intval}" data-id_field="{$field->id|intval}">
			{if $field->type != 9}
			<label class="attribute_label dp_type_{$field->type|intval}">{$field->label|escape:'htmlall':'UTF-8'}</label>
			{/if}
			{if $field->type == 12}
				{include file="./tooltip/tooltip.tpl"}
				<div class="clear"></div>
			{/if}
			<div class="dp_input_container dp_type_{$field->type|intval}">
				<div class="dp_invalid_btn" title="{l s='This field is required' mod='dynamicproduct'}"></div>
				{if $field->type == 1}
					{include file="./fields/input.tpl"}
				{elseif $field->type == 2}
                    {include file="./fields/fixed.tpl"}
				{elseif $field->type == 3}
                    {include file="./fields/price.tpl"}
				{elseif $field->type == 4}
                    {include file="./fields/text.tpl"}
				{elseif $field->type == 13}
                    {include file="./fields/textarea.tpl"}
                {elseif $field->type == 14}
                    {include file="./fields/feature.tpl"}
                {elseif $field->type == 15}
                    {include file="./fields/divider.tpl"}
				{elseif $field->type == 5}
                    {include file="./fields/date.tpl"}
				{elseif $field->type == 6}
                    {include file="./fields/image.tpl"}
				{elseif $field->type == 7}
                    {include file="./fields/php.tpl"}
				{elseif $field->type == 8}
                    {include file="./fields/dropdown.tpl"}
                {elseif $field->type == 16}
                    {include file="./fields/radio.tpl"}
				{elseif $field->type == 9}
                    {include file="./fields/checkbox.tpl"}
				{elseif $field->type == 10}
                    {include file="./fields/file.tpl"}
				{elseif $field->type == 11}
                    {include file="./fields/slider.tpl"}
				{elseif $field->type == 12}
                    {include file="./fields/thumbnails.tpl"}
				{elseif $field->type == 17}
                    {include file="./fields/colorpicker.tpl"}
				{elseif $field->type == 18}
                    {include file="string:{$field->description}" inline}
				{/if}
			</div>
		</div>
	{/foreach}
	{if $dp_config->display_weight}
		<label class="attribute_label dp_weight_str dp_hidden">{l s='Weight' mod='dynamicproduct'}:</label> <span id="dp_weight_str" class="dp_weight_str dp_hidden">0 {Configuration::get('PS_WEIGHT_UNIT')|escape:'htmlall':'UTF-8'}</span>
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
</div>
