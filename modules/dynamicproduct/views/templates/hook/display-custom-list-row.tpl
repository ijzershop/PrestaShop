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

<tr class="dp_customization_{$dp_input.id_input|intval}">
	<td>
		<div class="dp_input_div" data-id_input="{$dp_input.id_input|intval}">
			{if $dp_input.inputs && count($dp_input.inputs)}
				{foreach from=$dp_input.inputs key=name item=values}
					{if is_numeric($values.value)}
						<strong>{$values.labels.label|escape:'htmlall':'UTF-8'}:</strong> {$values.value|round:3|escape:'htmlall':'UTF-8'} {$values.labels.symbol|escape:'htmlall':'UTF-8'}<br>
					{elseif is_array($values.value)}
						{if isset($values.value.image)}
							{if isset($values.value.upload) && strlen($values.value.image)}
								<strong>{$values.labels.label|escape:'htmlall':'UTF-8'}:</strong>
								<a  class="dp_thumb_view"
									href="{$dp_module_dir|escape:'htmlall':'UTF-8'}upload/{$values.value.image|escape:'htmlall':'UTF-8'}"
									style="background-image: url({$dp_module_dir|escape:'htmlall':'UTF-8'}upload/{$values.value.thumb|escape:'htmlall':'UTF-8'});"
									title="{l s='Click to enlarge' mod='dynamicproduct'}">
								</a>
								<br>
							{/if}
						{elseif isset($values.value.file)}
							{if isset($values.value.upload) && strlen($values.value.file)}
								<strong>{$values.labels.label|escape:'htmlall':'UTF-8'}:</strong>
								<a  class="dp_url" target="_blank"
									href="{$dp_module_dir|escape:'htmlall':'UTF-8'}upload/{$values.value.file|escape:'htmlall':'UTF-8'}"
									title="{l s='Download file' mod='dynamicproduct'}">
									{$values.value.file|escape:'htmlall':'UTF-8'}
								</a>
								<br>
							{/if}
						{/if}
					{else}
						<strong>{$values.labels.label|escape:'htmlall':'UTF-8'}:</strong> {$values.value|escape:'htmlall':'UTF-8'}<br>
					{/if}
				{/foreach}
			{/if}
		</div>
		<div class="dp_input_div">
			<strong>{l s='Price' mod='dynamicproduct'}:</strong> {Product::convertAndFormatPrice($dp_input.price)|escape:'htmlall':'UTF-8'}
		</div>
	</td>
	<td>
		{$url = $dp_link->getProductLink($dp_input.id_product)}
		<a class="link-button" href="{$url|escape:'htmlall':'UTF-8'}{((strpos($url, '?')) ? '&' : '?')|escape:'htmlall':'UTF-8'}id_input={$dp_input.id_input|intval}{$dp_input.hash|escape:'htmlall':'UTF-8'}"><i class="icon-external-link-square"></i>{l s='Edit' mod='dynamicproduct'}</a><br>
		<a class="link-button dp_delete_input" href="#" data-id_input="{$dp_input.id_input|intval}"><i class="icon-remove-sign"></i>{l s='Delete' mod='dynamicproduct'}</a><br>
		<a class="link-button dp_add_input" href="#" data-id_input="{$dp_input.id_input|intval}"><i class="icon-shopping-cart"></i>{l s='Add to cart' mod='dynamicproduct'}</a>
	</td>
</tr>