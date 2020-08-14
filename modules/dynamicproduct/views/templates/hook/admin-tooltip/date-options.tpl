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

<form method="post" class="dp_ajax_form">
	<input type="hidden" name="id_field" value="{$field->id|intval}">
	<input type="hidden" name="action" value="save_date_settings">
	<table class="table table-condensed table-striped" data-id_field="{$field->id|intval}">
		<tbody>
			<tr>
				<td class="fixed-width-lg center"><span class="title_box">{l s='Required' mod='dynamicproduct'}</span></td>
				<td class="center">
					<span class="switch-toggle switch-candy switch prestashop-switch fixed-width-lg">
						<input type="radio" name="options[required]" id="dp_input_required_on_{$field->id|intval}" value="1" {if $field->settings->required}checked="checked"{/if}>
						<label for="dp_input_required_on_{$field->id|intval}">{l s='Yes' mod='dynamicproduct'}</label>
						<input type="radio" name="options[required]" id="dp_input_required_off_{$field->id|intval}" value="0" {if !$field->settings->required}checked="checked"{/if}>
						<label for="dp_input_required_off_{$field->id|intval}">{l s='No' mod='dynamicproduct'}</label>
						<a class="slide-button btn"></a>
					</span>
				</td>
			</tr>
			<tr>
				<td class="fixed-width-md center"><span class="title_box">{l s='Min Date' mod='dynamicproduct'}</span></td>
				<td class="center">
					<input class="dp_input_min form-control" data-name="min" name="options[min_date]" value="{$field->settings->min_date|escape:'htmlall':'UTF-8'}" type="text"/>
					<p class="dp_p_info">-dd {l s='or' mod='dynamicproduct'} dd/mm/yyyy</p>
				</td>
			</tr>
			<tr>
				<td class="fixed-width-md center"><span class="title_box">{l s='Max Date' mod='dynamicproduct'}</span></td>
				<td class="center">
					<input class="dp_input_max form-control" data-name="max" name="options[max_date]" value="{$field->settings->max_date|escape:'htmlall':'UTF-8'}" type="text"/>
					<p class="dp_p_info">+dd {l s='or' mod='dynamicproduct'} dd/mm/yyyy</p>
				</td>
			</tr>
			<tr>
				<td class="fixed-width-md center"><span class="title_box">{l s='Description' mod='dynamicproduct'}</span></td>
				<td class="center" colspan="4">
					<div class="dp_group dp_input_lang">
						<div class="dp_lang_container">
							{foreach from = $dp_languages item=lang}
							<div class="dp_lang">
								<input type="text" value="{if isset($field->description[$lang.id_lang])}{$field->description[$lang.id_lang]|escape:'htmlall':'UTF-8'}{/if}" name="options[description][{$lang.id_lang|intval}]" class="dp_lang_input dp_no_ajax form-control">
								<img class="dp_flag" title="{$lang.name|escape:'htmlall':'UTF-8'}" src="{$ps_base_url|escape:'htmlall':'UTF-8'}img/l/{$lang.id_lang|intval}.jpg"/>
							</div>
							{/foreach}
						</div>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="panel-footer">
		<button type="submit" name="save_options" class="btn btn-default pull-right">
			<i class="material-icons">save</i> {l s='Save' mod='dynamicproduct'}
		</button>
	</div>
</form>