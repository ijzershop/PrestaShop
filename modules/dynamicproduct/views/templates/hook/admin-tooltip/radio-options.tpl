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
<div class="dp_forms_container">
	<form method="post">
		<table class="table dp_options_table table-condensed table-striped">
			<thead>
			<tr class="nodrag nodrop">
				<th class="fixed-width-sm center"><span class="title_box">{l s='ID' mod='dynamicproduct'}</span></th>
				<th class="fixed-width-lg center"><span class="title_box">{l s='Text' mod='dynamicproduct'}</span></th>
				<th class="fixed-width-sm center"><span class="title_box">{l s='Value' mod='dynamicproduct'}</span></th>
				<th class="fixed-width-sm center"><span class="title_box">{l s='Delete' mod='dynamicproduct'}</span></th>
				<th class="dp_drag center"></th>
			</tr>
			</thead>
			<tbody>
			<tr class="dp_option_clone" data-id_option="0">
				<td class="center"><span class="id_option"></span></td>
				<td class="center">
					<div class="dp_group dp_input_lang" data-id_option="0">
						<div class="dp_lang_container">
							{foreach from=$dp_languages item=lang}
								<div class="dp_lang">
									<input type="text" value="" data-name="label" data-id_lang="{$lang.id_lang|intval}" class="dp_lang_input form-control">
									<img class="dp_flag" title="{$lang.name|escape:'htmlall':'UTF-8'}" src="{$ps_base_url|escape:'htmlall':'UTF-8'}img/l/{$lang.id_lang|intval}.jpg"/>
								</div>
							{/foreach}
						</div>
					</div>
				</td>
				<td class="center"><input data-name="value" name="" value="0" type="text" class="form-control"/></td>
				<td class="center"><a href="#" class="btn btn-default dp_delete_option"><i class="material-icons">delete</i></a></td>
				<td class="dp_drag"><a href="#"></a></td>
			</tr>
			{foreach from=$field->options item=option}
				<tr class="dp_option" id="dp_option_{$option->id|intval}" data-id_option="{$option->id|intval}">
					<td class="center"><span class="id_option">{$option->id|intval}</span></td>
					<td class="center">
						<div class="dp_group dp_input_lang" data-id_option="{$option->id|intval}" data-class="option">
							<div class="dp_lang_container">
								{foreach from=$dp_languages item=lang}
									<div class="dp_lang">
										<input type="text" value="{if isset($option->label[$lang.id_lang])}{$option->label[$lang.id_lang]|escape:'javascript':'UTF-8'}{/if}" data-name="label" data-id_lang="{$lang.id_lang|intval}" class="dp_lang_input form-control">
										<img class="dp_flag" title="{$lang.name|escape:'htmlall':'UTF-8'}" src="{$ps_base_url|escape:'htmlall':'UTF-8'}img/l/{$lang.id_lang|intval}.jpg"/>
									</div>
								{/foreach}
							</div>
						</div>
					</td>
					<td class="center"><input data-name="value" value="{$option->value|escape:'htmlall':'UTF-8'}" type="text" class="form-control"/></td>
					<td class="center"><a data-class="option" href="#" class="btn btn-default dp_delete_option"><i class="material-icons">delete</i></a></td>
					<td class="dp_drag"><a href="#"></a></td>
				</tr>
			{/foreach}
			<tr class="dp_marker">
				<td class="fixed-width-md"><span class="title_box">{l s='Description' mod='dynamicproduct'}</span></td>
				<td class="center" colspan="6">
					<div class="dp_group dp_input_lang" data-class="field">
						<div class="dp_lang_container">
							{foreach from=$dp_languages item=lang}
								<div class="dp_lang">
									<input type="text" value="{if isset($field->description[$lang.id_lang])}{$field->description[$lang.id_lang]|escape:'htmlall':'UTF-8'}{/if}" data-name="description" data-id_lang="{$lang.id_lang|intval}" class="dp_lang_input dp_ajax_input form-control">
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
			<a data-class="option" class="btn btn-default pull-right dp_add_option" href="#">
				<i class="material-icons">add</i>
				<span>{l s='Add a new option' mod='dynamicproduct'}</span>
			</a>
		</div>
	</form>
</div>