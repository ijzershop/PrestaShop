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

{$target = uniqid()}
<strong>{$input_field->label|escape:'htmlall':'UTF-8'}:</strong>
<a  class="dp_thumb_view" data-toggle="dp_modal" data-target="#dp_modal_{$target|escape:'htmlall':'UTF-8'}"
	href="{$dp_module_dir|escape:'htmlall':'UTF-8'}upload/{$input_field->image|escape:'htmlall':'UTF-8'}"
	title="{l s='Click to enlarge' mod='dynamicproduct'}">
	{if isset($is_pdf) && $is_pdf}
		<img src="{$dp_module_path|escape:'htmlall':'UTF-8'}upload/{$input_field->thumb|escape:'htmlall':'UTF-8'}" alt="">
	{else}
		<img src="{$dp_module_dir|escape:'htmlall':'UTF-8'}upload/{$input_field->thumb|escape:'htmlall':'UTF-8'}" alt="">
    {/if}
</a>
<br>
<div style="display: none" class="dp_modal" id="dp_modal_{$target|escape:'htmlall':'UTF-8'}" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" data-dismiss="modal">
	  <div class="modal-content"  >
		<div class="modal-body">
		  <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">{l s='Close' mod='dynamicproduct'}</span></button>
			{if isset($is_pdf) && $is_pdf}
				<img src="{$dp_module_path|escape:'htmlall':'UTF-8'}upload/{$input_field->image|escape:'htmlall':'UTF-8'}" class="imagepreview" style="width: 100%;" >
			{else}
				<img src="{$dp_module_dir|escape:'htmlall':'UTF-8'}upload/{$input_field->image|escape:'htmlall':'UTF-8'}" class="imagepreview" style="width: 100%;" >
			{/if}


		</div>
	  </div>
   </div>
</div>