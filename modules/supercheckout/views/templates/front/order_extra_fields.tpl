{if $show_TOS && count($conditions_to_approve) > 0}
    {* GDPR Change*}
    <input type="hidden" value="{l s='I agree to the terms of service and will adhere to them unconditionally. ' mod='supercheckout'}" name="supercheckout_default_policy" />
    {* GDPR Change*}
    <div id="supercheckout-agree">
        {foreach from=$conditions_to_approve item="condition" key="condition_name"}
            <div class="checkbox">
                <input id="conditions_to_approve[{$condition_name}]" type="checkbox" name="conditions_to_approve[{$condition_name}]" value="1" {if $checkedTOS} checked {/if} />
                <label for="conditions_to_approve[{$condition_name}]">

                    {$condition nofilter}{*escape not required as contains html*}
                </label>
            </div>
        {/foreach}
    </div>
{/if}
{* GDPR Change*}
{hook h='customSuperCheckoutGDPRHook'}
{* GDPR Change*}
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
