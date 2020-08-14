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

<textarea id="dp_{$field->name|escape:'htmlall':'UTF-8'}"
          data-id="{$field->id|intval}"
          data-type="{$field->type|intval}"
          class="dp_entry dp_textarea {if $field->settings->required && $dp_config->required}dp_required{/if}"
          data-name="{$field->name|escape:'htmlall':'UTF-8'}"
          data-label="{$field->label|escape:'htmlall':'UTF-8'}"
          data-min="{$field->settings->min|intval}"
          data-max="{$field->settings->max|intval}"
          rows="5"
          {if $field->settings->max}maxlength="{$field->settings->max|intval}"{/if}
>{$field->value|escape:'htmlall':'UTF-8'}</textarea>
{include file="../tooltip/text-area-tooltip.tpl"}