{*
* 2007-2017 PrestaShop
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
*  @copyright 2007-2019 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

<input
    id="dp_{$field->name|escape:'htmlall':'UTF-8'}"
    data-id="{$field->id|intval}"
    data-type="{$field->type|intval}"
    class="dp_entry dp_colorpicker"
    type="text"
    data-name="{$field->name|escape:'htmlall':'UTF-8'}"
    value="{$field->settings->color|strtoupper|escape:'htmlall':'UTF-8'}"
    data-label="{$field->label|escape:'htmlall':'UTF-8'}"
    style="background-color: {$field->settings->color|escape:'htmlall':'UTF-8'}; color: {$field->getClearColor()|escape:'htmlall':'UTF-8'}"
> {include file="../tooltip/tooltip.tpl"}
<a href="#"
   {if $field->settings->color}
   value="{$field->settings->color|strtoupper|escape:'htmlall':'UTF-8'}"
   {else}
   value="#FFFFFF"
   {/if}
   class="dp_colorpicker_handle">
</a>