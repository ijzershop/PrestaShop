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

<div class="dp_field_conditions_options">
    {if count($options)}
        <div class="alert alert-info">
            {l s='Click on an option to toggle its visibility' mod='dynamicproduct'}
        </div>

        {foreach $options as $option}

            {$value = 1}
            {$option_visibility_class = ''}
            {if isset($dp_condition_options_visibility[$id_field]) && isset($dp_condition_options_visibility[$id_field][$option->id])}
                {$option_visibility_class = 'dp_condition_field_hidden'}
                {$value = 0}
            {/if}

            <a class="dp_equation_field dp_condition_field {$option_visibility_class|escape:'htmlall':'UTF-8'}" href="#"
               data-id_condition="{$id_condition|intval}"
               data-id_field="{$id_field|intval}"
               data-id_option="{$option->id|intval}"
               data-value="{$value|intval}"
            >
                {$option->label|escape:'htmlall':'UTF-8'}
            </a>
        {/foreach}
    {else}
        <div class="alert alert-info">
            {l s='Please add options to the field then retry' mod='dynamicproduct'}
        </div>
    {/if}
</div>