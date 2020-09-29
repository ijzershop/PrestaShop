{*
* 2007-2020 PrestaShop
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
*  @copyright 2007-2020 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

<div class="pull-left" style="float: left">
    {l s='Load a field from favorites' mod='dynamicproduct'}
    <div>
        <select class="dp_chosen form-control" style="width: 250px;" id="dp_favorite_fields">
            <option value="0">{l s='Select a field' mod='dynamicproduct'}</option>
            {foreach from=$dp_favorite_fields item=favorite_field}
                <option value="{$favorite_field->id|intval}">{$favorite_field->id|intval} - {$favorite_field->name|escape:'htmlall':'UTF-8'}</option>
            {/foreach}
        </select>
        <button type="button" class="btn btn-primary" id="dp_load_favorite_field"><i class="material-icons">content_copy</i> {l s='Add' mod='dynamicproduct'}</button>
    </div>
</div>