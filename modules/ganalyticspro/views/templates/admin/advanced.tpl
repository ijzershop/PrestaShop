{*
 * Google Analytics : GA4 and Universal-Analytics
 *
 * @author    businesstech.fr <modules@businesstech.fr> - https://www.businesstech.fr/
 * @copyright Business Tech - https://www.businesstech.fr/
 * @license   see file: LICENSE.txt
 *
 *           ____    _______
 *          |  _ \  |__   __|
 *          | |_) |    | |
 *          |  _ <     | |
 *          | |_) |    | |
 *          |____/     |_|
 *}

<div class="bootstrap">
    <form class="form-horizontal col-lg-12" action="{$sURI|escape:'htmlall':'UTF-8'}" method="post" id="bt_advanced-form" name="bt_advanced-form" onsubmit="javascript: oGap.form('bt_advanced-form', '{$sURI|escape:'htmlall':'UTF-8'}', null, 'bt_advanced-settings', 'bt_advanced-settings', false, false, null, 'advanced', 'advanced');return false;">
        <input type="hidden" name="sAction" value="{$aQueryParams.advanced.action|escape:'htmlall':'UTF-8'}" />
        <input type="hidden" name="sType" value="{$aQueryParams.advanced.type|escape:'htmlall':'UTF-8'}" />
        <input type="hidden" name="sDisplay" id="sAdvancedDisplay" value="{if !empty($sDisplay)}{$sDisplay|escape:'htmlall':'UTF-8'}{else}advanced{/if}" />

        {if empty($sDisplay) || (!empty($sDisplay) && $sDisplay == 'advanced')}

            {if !empty($bUpdate)}
                {include file="`$sConfirmInclude`"}
            {elseif !empty($aErrors)}
                {include file="`$sErrorInclude`"}
            {/if}

            <h3><i class="fa fa-cogs"></i>&nbsp;{l s='Event Customization' mod='ganalyticspro'}</h3>

            <div class="clr_10"></div>
            <div class="form-group">
                <label class="control-label col-xs-12 col-md-4 col-lg-3">
                    <span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='By default, the module triggers the "add to cart" event when the add to cart button is clicked. However, if for some reason you want the "add to cart" event to also be triggered when the cart page loads, set this option to "Yes".' mod='ganalyticspro'}"><b>{l s='Also trigger the "add to cart" event when the cart page loads?' mod='ganalyticspro'}</b></span>
                </label>
                <div class="col-xs-12 col-md-5 col-lg-6">

                    <span class="switch prestashop-switch fixed-width-lg">
                        <input type="radio" name="bt_track_cart_page" id="bt_track_cart_page_on" value="1" {if !empty($bTrackCartPage)}checked="checked" {/if} />
                        <label for="bt_track_cart_page_on" class="radioCheck">
                            {l s='Yes' mod='ganalyticspro'}
                        </label>
                        <input type="radio" name="bt_track_cart_page" id="bt_track_cart_page_off" value="0" {if empty($bTrackCartPage)}checked="checked" {/if} />
                        <label for="bt_track_cart_page_off" class="radioCheck">
                            {l s='No' mod='ganalyticspro'}
                        </label>
                        <a class="slide-button btn"></a>
                    </span>
                    <span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='By default, the module triggers the "add to cart" event when the add to cart button is clicked. However, if for some reason you want the "add to cart" event to also be triggered when the cart page loads, set this option to "Yes".' mod='ganalyticspro'}">&nbsp;<span class="icon-question-sign"></span></span>
                </div>
            </div>

            <div class="clr_10"></div>

            <div class="alert alert-info">
                {l s='If you don\'t see certain events in your Google Analytics account when they should be triggered, it may be because your theme is using custom HTML elements instead of the default elements for those events. In this case, please ask your technical contact to indicate below which custom HTML elements replace the default ones in order for tracking to work.' mod='ganalyticspro'}
            </div>

            <div class="form-group">
                <label class="control-label col-xs-12 col-md-4 col-lg-3">
                    <span><b>{l s='HTML element for "select item" event on a product list page' mod='ganalyticspro'}</b></span>:
                </label>
                <div class="col-xs-4">
                    <input type="text" size="5" name="bt_code_category_product" id="bt_code_category_product" value="{if !empty($sDomCategoryProduct)}{$sDomCategoryProduct|escape:'htmlall':'UTF-8'}{/if}" />
                </div>
                <a class="pull-left btn btn-md btn-info" onclick="$('#bt_code_category_product').val('{$aSelectorDefault.category}');">{l s='Reset' mod='ganalyticspro'}</a>
            </div>

            <div class="form-group">
                <label class="control-label col-xs-12 col-md-4 col-lg-3">
                    <span><b>{l s='HTML element for "remove from cart" event on cart page' mod='ganalyticspro'}</b></span>:
                </label>
                <div class="col-xs-4">
                    <input type="text" size="5" name="bt_code_remove_cart" id="bt_code_remove_cart" value="{if !empty($sDomRemoveCart)}{$sDomRemoveCart|escape:'htmlall':'UTF-8'}{/if}" />
                </div>
                <a class="pull-left btn btn-md btn-info" onclick="$('#bt_code_remove_cart').val('{$aSelectorDefault.remove_cart}');">{l s='Reset' mod='ganalyticspro'}</a>
            </div>

            <div class="form-group">
                <label class="control-label col-xs-12 col-md-4 col-lg-3">
                    <span><b>{l s='HTML element for "add shipping info" event in checkout process' mod='ganalyticspro'}</b></span>:
                </label>
                <div class="col-xs-4">
                    <input type="text" size="5" name="bt_code_shipping" id="bt_code_shipping" value="{if !empty($sDomShipping)}{$sDomShipping|escape:'htmlall':'UTF-8'}{/if}" />
                </div>
                <a class="pull-left btn btn-md btn-info" onclick="$('#bt_code_shipping').val('{$aSelectorDefault.shipping}');">{l s='Reset' mod='ganalyticspro'}</a>
            </div>

            <div class="form-group">
                <label class="control-label col-xs-12 col-md-4 col-lg-3">
                    <span><b>{l s='HTML element for "add payment info" event in checkout process' mod='ganalyticspro'}</b></span>:
                </label>
                <div class="col-xs-4">
                    <input type="text" size="5" name="bt_code_payment" id="bt_code_payment" value="{if !empty($sDomPayment)}{$sDomPayment|escape:'htmlall':'UTF-8'}{/if}" />
                </div>
                <a class="pull-left btn btn-md btn-info" onclick="$('#bt_code_payment').val('{$aSelectorDefault.payment}');">{l s='Reset' mod='ganalyticspro'}</a>
            </div>

            <div class="form-group">
                <label class="control-label col-xs-12 col-md-4 col-lg-3">
                    <span><b>{l s='HTML element for "login" event' mod='ganalyticspro'}</b></span>:
                </label>
                <div class="col-xs-4">
                    <input type="text" size="5" name="bt_code_login" id="bt_code_login" value="{if !empty($sDomLogin)}{$sDomLogin|escape:'htmlall':'UTF-8'}{/if}" />
                </div>
                <a class="pull-left btn btn-md btn-info" onclick="$('#bt_code_login').val('{$aSelectorDefault.login}');">{l s='Reset' mod='ganalyticspro'}</a>
            </div>

            <div class="form-group">
                <label class="control-label col-xs-12 col-md-4 col-lg-3">
                    <span><b>{l s='HTML element for "sign up" event' mod='ganalyticspro'}</b></span>:
                </label>
                <div class="col-xs-4">
                    <input type="text" size="5" name="bt_code_signup" id="bt_code_signup" value="{if !empty($sDomSignup)}{$sDomSignup|escape:'htmlall':'UTF-8'}{/if}" />
                </div>
                <a class="pull-left btn btn-md btn-info" onclick="$('#bt_code_signup').val('{$aSelectorDefault.signup}');">{l s='Reset' mod='ganalyticspro'}</a>
            </div>

            {if !empty($bCompare1780)}
                <div class="form-group">
                    <label class="control-label col-xs-12 col-md-4 col-lg-3">
                        <span><b>{l s='HTML element for "add to wishlist" event on a product list page' mod='ganalyticspro'}</b></span>:
                    </label>
                    <div class="col-xs-4">
                        <input type="text" size="5" name="bt_code_wishlist_cat" id="bt_code_wishlist_cat" value="{if !empty($sDomWishCat)}{$sDomWishCat|escape:'htmlall':'UTF-8'}{/if}" />
                    </div>
                    <a class="pull-left btn btn-md btn-info" onclick="$('#bt_code_wishlist_cat').val('{$aSelectorDefault.wish_cat}');">{l s='Reset' mod='ganalyticspro'}</a>
                </div>

                <div class="form-group">
                    <label class="control-label col-xs-12 col-md-4 col-lg-3">
                        <span><b>{l s='HTML element for "add to wishlist" event on a product page' mod='ganalyticspro'}</b></span>:
                    </label>
                    <div class="col-xs-4">
                        <input type="text" size="5" name="bt_code_wishlist_prod" id="bt_code_wishlist_prod" value="{if !empty($sDomWishProd)}{$sDomWishProd|escape:'htmlall':'UTF-8'}{/if}" />
                    </div>
                    <a class="pull-left btn btn-md btn-info" onclick="$('#bt_code_wishlist_prod').val('{$aSelectorDefault.wish_prod}');">{l s='Reset' mod='ganalyticspro'}</a>
                </div>
            {/if}

            <div class="clr_30"></div>
            <h3><i class="fa fa-shopping-cart"></i>&nbsp;{l s='Conversion management' mod='ganalyticspro'}</h3>

            <div class="col-xs-12">
                <div class="alert alert-info">{l s='The options below allow you to configure the exact conversion value (order amount) that will be sent to Google Analytics when an order is placed on your shop. By default, the conversion value sent does NOT include taxes, shipping and wrapping fees. However, if you want to include one or more of these costs, select "Yes" for the corresponding option(s) below:' mod='ganalyticspro'}</div>
            </div>

            <div class="form-group">
                <label class="control-label col-xs-12 col-md-3 col-lg-4">
                    <b>{l s='Include taxes in conversion value' mod='ganalyticspro'}</b> :
                </label>
                <div class="col-xs-12 col-md-5 col-lg-6">
                    <span class="switch prestashop-switch fixed-width-lg">
                        <input type="radio" name="bt_use-tax" id="bt_use-tax_on" value="1" {if !empty($bUseTax)}checked="checked" {/if} />
                        <label for="bt_use-tax_on" class="radioCheck">
                            {l s='Yes' mod='ganalyticspro'}
                        </label>
                        <input type="radio" name="bt_use-tax" id="bt_use-tax_off" value="0" {if empty($bUseTax)}checked="checked" {/if} />
                        <label for="bt_use-tax_off" class="radioCheck">
                            {l s='No' mod='ganalyticspro'}
                        </label>
                        <a class="slide-button btn"></a>
                    </span>
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-xs-12 col-md-3 col-lg-4">
                    <b>{l s='Include shipping cost in conversion value' mod='ganalyticspro'}</b> :
                </label>
                <div class="col-xs-12 col-md-5 col-lg-6">
                    <span class="switch prestashop-switch fixed-width-lg">
                        <input type="radio" name="bt_use-shipping" id="bt_use-shipping_on" value="1" {if !empty($bUseShipping)}checked="checked" {/if} />
                        <label for="bt_use-shipping_on" class="radioCheck">
                            {l s='Yes' mod='ganalyticspro'}
                        </label>
                        <input type="radio" name="bt_use-shipping" id="bt_use-shipping_off" value="0" {if empty($bUseShipping)}checked="checked" {/if} />
                        <label for="bt_use-shipping_off" class="radioCheck">
                            {l s='No' mod='ganalyticspro'}
                        </label>
                        <a class="slide-button btn"></a>
                    </span>
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-xs-12 col-md-3 col-lg-4">
                    <b>{l s='Include wrapping cost in conversion value' mod='ganalyticspro'}</b> :
                </label>
                <div class="col-xs-12 col-md-5 col-lg-6">
                    <span class="switch prestashop-switch fixed-width-lg">
                        <input type="radio" name="bt_use-wrapping" id="bt_use-wrapping_on" value="1" {if !empty($bUseWrapping)}checked="checked" {/if} />
                        <label for="bt_use-wrapping_on" class="radioCheck">
                            {l s='Yes' mod='ganalyticspro'}
                        </label>
                        <input type="radio" name="bt_use-wrapping" id="bt_use-wrapping_off" value="0" {if empty($bUseWrapping)}checked="checked" {/if} />
                        <label for="bt_use-wrapping_off" class="radioCheck">
                            {l s='No' mod='ganalyticspro'}
                        </label>
                        <a class="slide-button btn"></a>
                    </span>
                </div>
            </div>

			<div class="clr_30"></div>
			<h3><i class="icon-plus"></i>&nbsp;{l s='Category wording and refunded orders status' mod='ganalyticspro'}</h3>

            <div class="form-group">
                <label class="control-label col-xs-12 col-sm-12 col-md-5 col-lg-3">
                    <span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='Choose how your category names will be displayed in the Google Analytics reports. You can choose to indicate only the name of the current category (short format), or the full breadcrumb (long format). The long format can be useful to differentiate several subcategories with the same name.' mod='ganalyticspro'}">
                        <strong>{l s='Category wording' mod='ganalyticspro'}</strong>
                    </span>
                </label>
                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-4">
                    <select name="bt_label-format" id="bt_label-format" class="col-xs-8 col-md-8 col-lg-8">
                        {foreach from=$aLabelFormat name=mode key=sFormat item=sTitle}
                            <option value="{$sFormat|escape:'htmlall':'UTF-8'}" {if $sLabelFormat == $sFormat}selected="selected" {/if}>{$sTitle|escape:'htmlall':'UTF-8'}</option>
                        {/foreach}
                    </select>
                    <span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='Choose how your category names will be displayed in the Google Analytics reports. You can choose to indicate only the name of the current category (short format), or the full breadcrumb (long format). The long format can be useful to differentiate several subcategories with the same name.' mod='ganalyticspro'}">&nbsp;<i class="icon-question-sign"></i></span>
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-xs-12 col-sm-12 col-md-5 col-lg-3" for="bt_order-statuses">
                    <span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='Select the status(es) that correspond(s) to refunded orders so that the information is taken into account by Google Analytics.' mod='ganalyticspro'}">
                        <strong>{l s='Refunded order status(es)' mod='ganalyticspro'}</strong>
                    </span>
                </label>
                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3">
                    <div class="btn-actions">
                        <div class="btn btn-default btn-mini" id="categoryCheck" onclick="return oGap.selectAll('.myCheckbox', 'check');"><i class="icon-plus-square"></i>&nbsp;{l s='Check All' mod='ganalyticspro'}</div> - <div class="btn btn-default btn-mini" id="categoryUnCheck" onclick="return oGap.selectAll('.myCheckbox', 'uncheck');"><i class="icon-minus-square"></i>&nbsp;{l s='Uncheck All' mod='ganalyticspro'}</div>
                        <div class="clr_10"></div>
                    </div>
                    <table cellspacing="0" cellpadding="0" class="table table-responsive table-bordered table-striped">
                        {foreach from=$aOrderStatusTitle key=id item=aOrder}
                            <tr>
                                <td>
                                    <input type="checkbox" name="bt_order-status[]" id="bt_order-status" value="{$id|escape:'htmlall':'UTF-8'}" {if !empty($aStatusSelection)}{foreach from=$aStatusSelection key=key item=iIdSelect}{if $iIdSelect == $id} checked="checked" {/if}{/foreach}{/if} class="myCheckbox" />
                                </td>
                                <td>
                                    <label for="bt_order-status">{$aOrder[$iCurrentLang]|escape:'htmlall':'UTF-8'}</label>
                                </td>
                            </tr>
                        {/foreach}
                    </table>
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-xs-12 col-sm-12 col-md-5 col-lg-3" for="bt_order-status_partial_refund">
                    <span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='Select the status(es) that correspond(s) to partially refunded orders so that the information is taken into account by Google Analytics.' mod='ganalyticspro'}">
                        <strong>{l s='Partially refunded order status(es)' mod='ganalyticspro'}</strong>
                    </span>
                </label>
                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3">
                    <div class="btn-actions">
                        <div class="btn btn-default btn-mini" id="categoryCheck" onclick="return oGap.selectAll('.myCheckboxPartial', 'check');"><i class="icon-plus-square"></i>&nbsp;{l s='Check All' mod='ganalyticspro'}</div> - <div class="btn btn-default btn-mini" id="categoryUnCheck" onclick="return oGap.selectAll('.myCheckboxPartial', 'uncheck');"><i class="icon-minus-square"></i>&nbsp;{l s='Uncheck All' mod='ganalyticspro'}</div>
                        <div class="clr_10"></div>
                    </div>
                    <table cellspacing="0" cellpadding="0" class="table table-responsive table-bordered table-striped">
                        {foreach from=$aOrderStatusTitle key=id item=aOrder}
                            <tr>
                                <td>
                                    <input type="checkbox" name="bt_order-status_partial_refund[]" id="bt_order-status_partial_refund" value="{$id|escape:'htmlall':'UTF-8'}" {if !empty($aStatusSelectionPartialRefund)}{foreach from=$aStatusSelectionPartialRefund key=key item=iIdSelect}{if $iIdSelect == $id} checked="checked" {/if}{/foreach}{/if} class="myCheckboxPartial" />
                                </td>
                                <td>
                                    <label for="bt_order-status_partial_refund">{$aOrder[$iCurrentLang]|escape:'htmlall':'UTF-8'}</label>
                                </td>
                            </tr>
                        {/foreach}
                    </table>
                </div>
            </div>
        {/if}

        <div class="clr_10"></div>
        <div class="clr_hr"></div>
        <div class="clr_10"></div>

        <div class="center">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-11 col-lg-11">
                    <div id="bt_error-advanced"></div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-1 col-lg-1">
                    <button class="btn btn-default pull-right" onclick="oGap.form('bt_advanced-form', '{$sURI|escape:'htmlall':'UTF-8'}', null, 'bt_advanced-settings', 'bt_advanced-settings', false, false, null, 'advanced', 'advanced');return false;"><i class="process-icon-save"></i>{l s='Save' mod='ganalyticspro'}</button>
                </div>
            </div>
        </div>

    </form>
</div>

<div class="clr_20"></div>