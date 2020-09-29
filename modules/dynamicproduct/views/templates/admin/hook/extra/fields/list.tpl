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

<table id="dp_fields_table" class="table dp_dnd_table dp_ajax_table dp_lang_table table-condensed table-striped" data-class="field">
    <thead>
    <tr class="nodrag nodrop">
        <th class="dp_fav"><span class="title_box"></span></th>
        <th class="fixed-width-xs"><span class="title_box"></span></th>
        <th class="fixed-width-md"><span class="title_box">{l s='Name' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-lg"><span class="title_box">{l s='Label' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-md center"><span class="title_box">{l s='Type' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-sm center"><span class="title_box">{l s='Value' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-sm center"><span class="title_box">{l s='Unit' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-xs center"><span class="title_box">{l s='Options' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-xs center"><span class="title_box">{l s='Image' mod='dynamicproduct'}</span></th>
        <th class="fixed-width-sm center"><span class="title_box">{l s='Actions' mod='dynamicproduct'}</span></th>
        <th class="dp_drag center"></th>
    </tr>
    </thead>
    <tbody>
    {foreach from=$dp_fields item=field}
        {include file="./field.tpl"}
    {/foreach}
        {include file="./field.tpl" field=$dp_field_empty}
    </tbody>
</table>
