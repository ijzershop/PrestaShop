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
	<input type="hidden" name="action" value="save_image_settings">
	<table class="table table-condensed table-striped">
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
				<td class="fixed-width-lg center"><span class="title_box">{l s='Minimum width' mod='dynamicproduct'} ({l s='px' mod='dynamicproduct'})</span></td>
				<td class="center">
					<input class="dp_input_min_width form-control" data-name="min_width" name="options[min_width]" data-type="pos" value="{$field->settings->min_width|intval}" type="text"/>
				</td>
			</tr>
			<tr>
				<td class="fixed-width-lg center"><span class="title_box">{l s='Minimum height' mod='dynamicproduct'} ({l s='px' mod='dynamicproduct'})</span></td>
				<td class="center">
					<input class="dp_input_min_height form-control" data-name="min_height" name="options[min_height]" data-type="pos" value="{$field->settings->min_height|intval}" type="text"/>
				</td>
			</tr>
			<tr>
				<td class="fixed-width-lg center dp_td_info"><span class="title_box">{l s='Maximum size' mod='dynamicproduct'} ({l s='MB' mod='dynamicproduct'})</span></td>
				<td class="center">
					<input class="dp_input_max_size form-control" data-name="max_size" name="options[max_size]" data-type="float" value="{$field->settings->max_size|floatval}" type="text"/>
					<p class="dp_p_info">{l s='0: unlimited' mod='dynamicproduct'}</p>
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