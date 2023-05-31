{if isset($settings['hide_ship_pay']) && $settings['hide_ship_pay'] eq 1 && $address_selector == 'new'}
    <span class="permanent-warning" style="display: inline-block;">{l s='Please choose your shipping address first in order to check the payment methods.' mod='supercheckout'}</span>
{else}
<div class="velsof_sc_overlay"></div>
{if isset($payment_method_not_required)}
    <div class='supercheckout-checkout-content' style='display:block'>
        <div class='permanent-warning not-required-msg'>{l s='No payment method required.' mod='supercheckout'}</div>
    </div>
{elseif count($payment_methods) == 0}
    <div class='supercheckout-checkout-content' style='display:block'>
        <div class='permanent-warning not-required-msg'>{l s='No payment method is available.' mod='supercheckout'}</div>
    </div>
{else}
    <ul>
        {assign var="id_module_mollie" value=Module::getModuleIdByName('mollie')}
        {assign var="id_module_pin" value=Module::getModuleIdByName('ps_pinpayment')}
        {if (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE') === (int)Context::getContext()->customer->id}
            {assign var="selected_payment_method" value=$id_module_pin}
        {/if}
        {if Context::getContext()->cookie->payment_method}
            {assign var="cookie_selected_payment_method" value=Context::getContext()->cookie->payment_method}
        {/if}



{*        {if $selected_payment_method === ""}*}
{*            {assign var="selected_payment_method" value=$id_module_mollie}*}
{*        {/if}*}

        {foreach from=$payment_methods item="option"}
          <li>
            <div class="radio">
                    <input type="radio" name="payment_method" data-module-name="{$option.module_name nofilter}{*escape not required as contains html*}"
                           value="{$option.id}" id="{$option.id}"
                            {if ($cookie_selected_payment_method === $option.id && (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE') !== (int)Context::getContext()->customer->id) || $selected_payment_method === $option.id_module} checked="checked"{/if} class="{if $option.binary}binary{/if}"/>
                  <label id="payment_lbl_{$option.id_module|intval}" for="{$option.id}">
                        {if $display_payment_style neq 0}
                            {if $option.payment_image_url neq ''}
                                <img src='{$option.payment_image_url}' alt='{$option.call_to_action_text}' width="30" {if isset($option.height) && $option.height !="" && $option.height !="auto"}height='{$option.height}'{/if}/>{if $display_payment_style neq 2}{/if}
                            {* Start Code Added By Priyanshu on 3-June-2020 to fix the Payment method logo issue*}
                            {else if $option.logo neq '' }
                                <img src='{$option.logo}' alt='{$option.call_to_action_text}' width="30" {if isset($option.height) && $option.height !="" && $option.height !="auto"}height='{$option.height}'{/if}/>{if $display_payment_style neq 2}{/if}
                            {* End of Code Added By Priyanshu on 3-June-2020 to fix the Payment method logo issue*}
                            {/if}
                        {/if}
                        {if $display_payment_style neq 2}
                            {$option.call_to_action_text}
                        {/if}
                    </label>
                    <div class="paymentInfo" id="payment_methods_additional_container">
                        <div class="{$option.id}_info_container payment-additional-info" style="display:none;">
                            <div class="supercheckout-blocks js-additional-information definition-list additional-information">
                                {$option.additionalInformation nofilter}{*escape not required as contains html*}
                            </div>
                            <div id="pay-with-form">
                                {if $option.form}
                                    {$option.form nofilter}{*escape not required as contains html*}
                                {else}
                                    <form id="payment-form" method="POST" action="{$option.action nofilter}{*escape not required as contains url*}">
                                        {foreach from=$option.inputs item=input}
                                            <input type="{$input.type}" name="{$input.name}" value="{$input.value}">
                                        {/foreach}
                                        <button style="display:none" id="pay-with-{$option.id}" type="submit"></button>
                                    </form>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        {/foreach}
    </ul>
    <div id="payment_methods_binaries" style="display:none;">
        {hook h='displayPaymentByBinaries'}
    </div>
{/if}
{/if}
{*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer tohttp://www.prestashop.com for more information.
* We offer the best and most useful modules PrestaShop and modifications for your online store.
*
* @category  PrestaShop Module
* @author    knowband.com <support@knowband.com>
* @copyright 2016 Knowband
*}
