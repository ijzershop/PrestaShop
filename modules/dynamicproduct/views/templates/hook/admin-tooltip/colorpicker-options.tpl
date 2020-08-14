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
	<input type="hidden" name="action" value="save_colorpicker_settings">
	<table class="table table-condensed table-striped">
		<tbody>
			<tr>
				<td class="fixed-width-md center"><span class="title_box">{l s='Initial color' mod='dynamicproduct'}</span></td>
				<td class="center" style="position: relative">
					<a class="dp_field_color dp_u_color dp_always_visible dp_middle_right"
					   data-color="{$field->settings->color|escape:'htmlall':'UTF-8'}"
					   title="{l s='Select a color' mod='dynamicproduct'}"
					   data-target="colorpicker_option"
					   href="#"
					>
						<i class="material-icons">format_color_fill</i>
					</a>
					<input type="text" value="{$field->settings->color|escape:'htmlall':'UTF-8'}" name="options[color]" class="dp_no_ajax form-control dp_color_input">
				</td>
			</tr>
			<tr>
				<td class="fixed-width-md center"><span class="title_box">{l s='Description' mod='dynamicproduct'}</span></td>
				<td class="center">
					<div class="dp_group dp_input_lang">
						<div class="dp_lang_container">
							{foreach from=$dp_languages item=lang}
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