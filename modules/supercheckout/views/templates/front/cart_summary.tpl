    {if isset($kb_free_shipping_percent)}
        <div class="" id="kb_cart_summary_free_shipping">
                    {if $hidden_amount == 0}
                        <h3>{l s='Congratulations!! You have reached the minumum amount limit to get Free Shipping.' mod='supercheckout'} </h3>
                    {else}
                        <h3>{l s='Almost there, Add ' mod='supercheckout'} {$kb_free_shipping_amount} {l s=' more to get Free Shipping' mod='supercheckout'}</h3>
                    {/if}
                    <div class="progress red">
                        <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"
                             aria-valuenow="{$kb_free_shipping_percent}" aria-valuemin="0" aria-valuemax="100" style="width:{$kb_free_shipping_percent}%">
                            {$kb_free_shipping_percent}% {l s='Complete (success) ' mod='supercheckout'}
                        </div>
                    </div>
            </div>
    {/if}

    <div id="confirmCheckout" class="shopping-cart-totals col">
            {assign var='image_display' value=0}
            {assign var='total_products' value=0}
            {assign var='total_products_price' value=0}
            {assign var='odd' value=0}
            {assign var='have_non_virtual_products' value=false}
            {if $logged}
                        {assign var='image_display' value=$settings['cart_options']['product_image']['logged']['display']}
            {else}
                {assign var='image_display' value=$settings['cart_options']['product_image']['guest']['display']}
            {/if}
            {foreach $products as $product}
                {assign var='total_products' value=($total_products+$product.quantity)}
                {assign var='total_products_price' value=$total_products_price+($product.price_with_reduction*$product.quantity)}

                 {if $product.is_virtual == 0}
                    {assign var='have_non_virtual_products' value=true}
                {/if}
                {assign var='productId' value=$product.id_product}
                {assign var='product_url' value=$link->getProductLink($product.id_product, $product.link_rewrite, $product.category, null, null, $product.id_shop, $product.id_product_attribute)}
                {assign var='productAttributeId' value=$product.id_product_attribute}
                {assign var='odd' value=($odd+1)%2}
            <div class="row cart_list_item border-0" id="product_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}">
                  <table class="col-12">
                    <tr class="row">
                      <td class="d-flex float-none float-sm-left mb-0 col-12 col-sm-3 pr-0 text-center">
                        <div class="Cart-product-Image">
                          <img class="product_img img-responsive" src="{$product.cover.bySize.large_default.url|escape:'quotes'}" alt='{$product.name|escape:'quotes'}' onclick="showEnlargedImage(this)"/>
                        </div>
                      </td>
                      <td class="d-flex w-sm-auto text-center text-sm-left float-left mb-0 col-12 col-sm-9 shopping-cart-description">
                        <div class="product-title text-center text-sm-left  w-100">
                          <a href="{$product_url|escape:'quotes'}">{$product.name|escape:'quotes'}</a>
                        {if isset($product.attributes) && count($product.attributes) > 0}
                        <div class="w-100 text-center text-sm-left">
                          {foreach from=$product.attributes key="attribute" item="value"}
                            {if !in_array($attribute, AttributeGroup::getSawCutModuleAttributeGroupNames(Context::getContext()->cookie->id_lang))}
                              <span><b>{$attribute} </b>{$value}</span>
                            {/if}

                          {/foreach}
                        </div>
                        {/if}
{*                        <span class="product_stock_status" style="display: none;" >*}
{*                                        {if $product.quantity_available <= 0}*}
{*                                          <p class="kblabel{if $product.quantity_available <= 0 && isset($product.allow_oosp) && !$product.allow_oosp} label-danger{elseif $product.quantity_available <= 0} label-warning{else} label-success{/if}">*}
{*                                            {if isset($product.allow_oosp) && $product.allow_oosp}*}
{*                                              {if isset($product.available_later) && $product.available_later}{$product.available_later}*}
{*                                              {else}*}
{*                                                {l s='In Stock' mod='supercheckout'}*}
{*                                              {/if}*}

{*                                            {else}*}
{*                                              {l s='Out of stock' mod='supercheckout'}*}
{*                                            {/if}*}
{*                                            </p>*}
{*                                    {else}*}

{*                                        {if isset($product.available_now) && $product.available_now}*}
{*                                          <p class="kblabel label-success">{l s='In Stock' mod='supercheckout'}</p>*}
{*                                        {else if $product.stock_quantity < $product.quantity}*}
{*                                            <p class="kblabel label-danger">{l s='Out of stock' mod='supercheckout'}</p>*}
{*                                        {else}*}
{*                                            <p  class="kblabel label-success">{l s='In Stock' mod='supercheckout'}</p>*}
{*                                        {/if}*}
{*                                        {/if}*}
{*                                </span>*}
                        {if $product.customizations|count}
                          {foreach from=$product.customizations item="customization"}
                            {foreach from=$customization.fields item="field"}
                              <div class="text-center text-sm-left  w-100">
                                <b>{$field.label} </b>
                                {if $field.type == 'text'}
                                  {if (int)$field.id_module}
                                    {$field.text nofilter}{*escape not required as contains html*}
                                  {else}
                                    {$field.text}
                                  {/if}
                                {elseif $field.type == 'image'}
                                  <img src="{$field.image.large.url}" onclick="showEnlargedImage(this)">
                                {/if}
                              </div>
                            {/foreach}
                          {/foreach}
                        {/if}
                        </div>
                      </td>
                    </tr>
                  </table>


                <div class="clear-mobile-div"></div>


              <table class="col table-condensed border-bottom">
                <tr>
                  <td width="30%">
                        <span class="cart-product-price text-right">
                          <span class="price special-price d-block text-right" style="font-size: 14px;"><b>{Context::getContext()->currentLocale->formatPrice($product.price_with_reduction_without_tax, 'EUR')}</b></span> {*escape not required as contains html*}
                          {if $product.price != $product.regular_price}
                            <span class="price regular-price d-block text-right">{Context::getContext()->currentLocale->formatPrice($product.price_without_reduction_without_tax, 'EUR')}</span> {*escape not required as contains html*}

                          {/if}
                        </span>
                  </td>
                  <td width="35%" class="text-center">
                    <div class="text-center" style="border:1px solid #ced4da; {if $logged}{if $settings['cart_options']['product_qty']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['cart_options']['product_qty']['guest']['display'] eq 1}{else}display:none{/if}{/if};" >
                      <div class="bootstrap-touchspin m-0" style="max-width: auto;">
                        <div class="input-group">
                          <input type="hidden" value="{$product.quantity|intval}" name="quantity_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}_hidden" />
                          <input type="hidden" name="quantity_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}_minqty" value="{$product.minimal_quantity|intval}">
                          {if isset($settings['qty_update_option']) && $settings['qty_update_option'] eq 0 }
                            <span class="input-group-prepend">
                                            <button type="button" class="input-group-text cart_quantity_down qty-btn increase_button quantity-left-minus btn btn-primary btn-number" data-type="plus" data-field="" onclick="downQty('quantity_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}')">

                                                        <span class="fas fa-minus"></span>
                                                </button>
                                        </span>
                            <input min="1" max="100" autocomplete="off" type="text" id="quantity" class="form-control input-number quantitybox" name="quantity_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}" value="{$product.quantity|intval}">
                            <span class="input-group-append">
                                                <button type="button" class="input-group-text cart_quantity_down qty-btn decrease_button quantity-right-plus btn btn-primary btn-number" data-type="plus" data-field=""  onclick="upQty('quantity_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}')">
                                                        <span class="fas fa-plus"></span>
                                                </button>
                                        </span>
                          {else}
                            <input min="1" max="100" autocomplete="off" type="text" id="quantity" class="form-control input-number quantitybox kb_text_update_qty" name="quantity_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}" value="{$product.quantity|intval}">
                            <a href="javascript:void(0)" id="demo_2_s" class="kb_update_link" title="{l s='update quantity' mod='supercheckout'}" onclick="updateQtyByBtn('quantity_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}')" ><small>{l s='Update' mod='supercheckout'}</small></a>
                          {/if}

                        </div>
                      </div>
                    </div>
                  </td>
                  <td width="{if $product.price != $product.regular_price}30%{else}22%{/if}">
                    <div class="pl-0" id="total_product_price_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}" style="{if $logged}{if $settings['cart_options']['product_total']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['cart_options']['product_total']['guest']['display'] eq 1}{else}display:none{/if}{/if};" >
                          <span class="cart-product-price d-block text-right" style="font-size: 14px;"><b>{Context::getContext()->currentLocale->formatPrice(($product.price_with_reduction_without_tax*$product.quantity), 'EUR')}</b></span>{*escape not required as contains html*}
                          {if $product.price != $product.regular_price}
                            <span class="cart-product-price regular-price d-block text-right">{Context::getContext()->currentLocale->formatPrice(($product.price_without_reduction_without_tax*$product.quantity), 'EUR')}</span>{*escape not required as contains html*}
                          {/if}
                    </div>
                    </div>
                  </td>
                  <td width="5%">
                    <a class="btn btn-sm btn-default float-right" id="{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}" onclick="deleteProductFromCart(this.id);" class="remove-from-cart" rel="nofollow" href="#" style="{if $logged}{if $settings['cart_options']['product_name']['logged']['display'] eq 1 || $settings['cart_options']['product_model']['logged']['display'] eq 1 || $settings['cart_options']['product_qty']['logged']['display'] eq 1 || $settings['cart_options']['product_price']['logged']['display'] eq 1 || $settings['cart_options']['product_total']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['cart_options']['product_name']['guest']['display'] eq 1 || $settings['cart_options']['product_model']['guest']['display'] eq 1 || $settings['cart_options']['product_qty']['guest']['display'] eq 1 || $settings['cart_options']['product_price']['guest']['display'] eq 1 || $settings['cart_options']['product_total']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
                      <i class="fa fa-trash"></i>
                    </a>
                  </td>
                </tr>
              </table>

    </div>

            {/foreach}

<div id="confirmCheckout" class="row">
<script type="text/javascript">
    var subtotal_msg = "{l s='Subtotal' mod='supercheckout'}";
    var shipping_msg = "{l s='Shipping' mod='supercheckout'}";
    var taxex_msg = "{l s='Taxes' mod='supercheckout'}";
</script>

<div class="velsof_sc_overlay"></div>

<div class="row cart_list_item border-0">

</div>

<table class="supercheckout-totals table table-bordered totalTable">

    <tfoot>
{*    {var_dump($subtotals)}*}
        {foreach from=$subtotals item="subtotal"}

            {if isset($subtotal.value) && $subtotal.value}
                {if $subtotal.type == 'products'}
                    <tr id="supercheckout_summary_total_{$subtotal.type}" style="{if $logged}{if $settings['order_total_option']['product_sub_total']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['product_sub_total']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
                      <td colspan="5" class="text-right title"><strong>Producten ({$total_products}) </strong></td>
                      <td class="value text-right"><span id="supercheckout_total_{$subtotal.type}_value" class="price">{Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING),'EUR')}{*escape not required as contains html*}</span></td>


                      {else if $subtotal.type == 'shipping'}
                    <tr id="supercheckout_summary_total_{$subtotal.type}" style="{if $logged}{if $settings['order_total_option']['shipping_price']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['shipping_price']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
                    <td colspan="5" class="text-right title"><strong>{l s=$subtotal.label mod='supercheckout'} </strong></td>
                  <td class="value text-right"><span id="supercheckout_total_{$subtotal.type}_value" class="price">{if Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING) != '0.00'}{Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING),'EUR')}{else}Gratis{/if}{*escape not required as contains html*}</span></td>

                    {else if $subtotal.type == 'tax'}
                    <tr id="supercheckout_summary_total_{$subtotal.type}" style="{if $logged}{if $settings['order_total_option']['total_tax']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['total_tax']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
                  <td colspan="5" class="text-right title"><strong>Btw (21%) </strong></td>
                  <td class="value text-right"><span id="supercheckout_total_{$subtotal.type}_value" class="price">{Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(true, Cart::BOTH)-Context::getContext()->cart->getOrderTotal(false, Cart::BOTH),'EUR')}{*escape not required as contains html*}</span></td>

                    {else}
                    <tr id="supercheckout_summary_total_{$subtotal.type}">
                  <td colspan="5" class="text-right title"><strong>{l s=$subtotal.label mod='supercheckout'} </strong></td>
                  <td class="value text-right"><span id="supercheckout_total_{$subtotal.type}_value" class="price">{$subtotal.value nofilter}{*escape not required as contains html*}</span></td>

                {/if}
                </tr>
            {/if}
        {/foreach}
    </tfoot>
</table>

<div class="custom-panel rewardsection">
    {if $vouchers.allowed}
        {foreach $vouchers.added as $voucher}
            <div style="margin-bottom: 1%;" id="cart_discount_{$voucher.id_cart_rule}" class="cart_discount text-right" style="{if $logged}{if $settings['order_total_option']['voucher']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['voucher']['guest']['display'] eq 1}{else}display:none{/if}{/if};">

                <span style="float:left;"><b>{$voucher.name}</b></span><a href="javascript:void(0)" style="float: left;margin-left: 2%;" onclick="removeDiscount('{$voucher.id_cart_rule|intval}')"><div title="{l s='Redeem' mod='supercheckout'}" class="removeProduct"><i class="fas fa-trash"></i></div></a>
                <span class="price text-right">{$voucher.reduction_formatted nofilter}{*escape not required as contains html*}</span>
            </div>
        {/foreach}
        <div class="rewardHeader" style="{if $logged}{if $settings['order_total_option']['voucher']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['voucher']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
            <a href="javascript:void(0)" onclick="$('.rewardBody').toggle();">{l s='Have a promo code?' mod='supercheckout'} </a>
        </div>
        <div class="rewardBody" style="display:none">
            <!--h2>Coupon / Voucher / Reward</h2-->
            <div id="supercheckout_voucher_input_row" class="form-group form-coupon" style="{if $logged}{if $settings['order_total_option']['voucher']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['voucher']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
                <!--label for="input-coupon" class="control-label">Enter your coupon here</label-->
                <div class="input-group" id="voucher-form">
                    <input type="hidden" value="1" name="submitDiscount">
                    <input name="discount_name" id="discount_name" type="text" placeholder="{l s='Enter your coupon here' mod='supercheckout'}" class="voucherText form-control">
                    <span class="input-group-btn"><button id="button-coupon" onClick="callCoupon();" type="button" data-loading-text="Loading..." class="btn btn-primary orangebuttonapply" style="min-height: 33px;">{l s='Apply' mod='supercheckout'}</button>
                    </span>
                </div>
            </div>
        </div>
    {else}
        <div id="supercheckout_voucher_input_row" style="display:none;"></div>
    {/if}
    {* Start Code Added By Priyanshu on 11-Feb-2021 to implement the Total Price Display functionality*}
        <div class="totalAmount" style="{if $logged}{if $settings['order_total_option']['total']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['total']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
            <h3>
                    {l s='Total Amount' mod='supercheckout'} {l s='(Tax incl.)' mod='supercheckout'}:
                    <span id="total_price" class="price amountMoney">{Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(true, Cart::BOTH),'EUR')}{*escape not required as contains html*}</span>
                    <input type="hidden" id="total_price_wfee" value="{Context::getContext()->currentLocale->formatPrice($total_products_price, 'EUR')}">{*escape not required as contains html*}</td>
            </h3>
        </div><br>
    {* End Code Added By Priyanshu on 11-Feb-2021 to implement the Total Price Display functionality*}
</div>



<div id="highlighted_cart_rules">
    {if count($other_available_vouchers) > 0}
        <p id="title" class="title-offers" style="font-weight: 600;color: black!important;">{l s='Take advantage of our exclusive offers' mod='supercheckout'}:</p>
        <div id="display_cart_vouchers">
            {foreach $other_available_vouchers as $voucher}
                {if $voucher.code != ''}<span onclick="$('#discount_name').val('{$voucher.code}');
                        return false;" class="voucher_name" data-code="{$voucher.code}">{$voucher.code}</span> - {/if}{$voucher.name}<br />
                    {/foreach}
                    </div>
                    {/if}
                    </div>

                    <!-- INSERT INTO #CART BLOCK -->
                    <!-- Start - Code to insert custom fields in cart block -->
                    <div class="div_custom_fields">
                        {foreach from=$array_fields item=field}
                            {if $field['position'] eq 'cart_block'}
                                <div class="supercheckout-blocks form-group">
                                    {if $field['type'] eq "textbox"}
                                        <label class="cursor_help" title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}<span style="display:inline;" class="supercheckout-required">*</span>{/if}</label>
                                        <input type="text" name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]" value="{$field['default_value']}" class="supercheckout-large-field width_100 form-control">
                                        <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}" class="errorsmall_custom hidden_custom"></span>
                                    {/if}

                                    {if $field['type'] eq "textarea"}
                                        <label class="cursor_help" title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}<span style="display:inline;" class="supercheckout-required">*</span>{/if}</label>
                                        <textarea name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]" class="supercheckout-large-field width_100 form-control" style="width: 100%; height: 100px;">{$field['default_value']}</textarea>
                                        <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}" class="errorsmall_custom hidden_custom"></span>
                                    {/if}

                                    {if $field['type'] eq "selectbox"}
                                        <label class="cursor_help" title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}<span style="display:inline;" class="supercheckout-required">*</span>{/if}</label>
                                        <select name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]" class="supercheckout-large-field width_100 form-control">
                                            <option value="">{l s='Select Option' mod='supercheckout'}</option>
                                            {foreach from=$field['options'] item=field_options}
                                                <option {if $field_options['default_value'] eq $field_options['option_value']}selected{/if} value="{$field_options['option_value']}">{$field_options['option_label']}</option>
                                            {/foreach}
                                        </select>
                                        <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}" class="errorsmall_custom hidden_custom"></span>
                                    {/if}

                                    {if $field['type'] eq "radio"}
                                        <label class="cursor_help" title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}<span style="display:inline;" class="supercheckout-required">*</span>{/if}</label>
                                        {assign var=radio_counter value=1}
                                        {foreach from=$field['options'] item=field_options}
                                            <div class="supercheckout-extra-wrap">
                                                <div class="radio" id="uniform-field_{$field['id_velsof_supercheckout_custom_fields']}"><span>
                                                        <input type="radio" name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]" value="{$field_options['option_value']}" {if $field_options['default_value'] eq $field_options['option_value']}checked{/if}>
                                                        <label for="field_{$field['id_velsof_supercheckout_custom_fields']}">{$field_options['option_label']}</label>
                                                    </span></div>

                                            </div>
                                            {assign var=radio_counter value=$radio_counter+1}
                                        {/foreach}
                                        <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}" class="errorsmall_custom hidden_custom"></span>
                                    {/if}

                                    {if $field['type'] eq "checkbox"}
                                        <label class="cursor_help" title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}<span style="display:inline;" class="supercheckout-required">*</span>{/if}</label>
                                        {foreach from=$field['options'] item=field_options}
                                            <div class="input-box input-field_{$field['id_velsof_supercheckout_custom_fields']}">
                                                <div class="checker checkbox" id="uniform-field_{$field['id_velsof_supercheckout_custom_fields']}">
                                                    <span class="checked">
                                                        <input {if $field_options['default_value'] eq $field_options['option_value']}checked{/if} type="checkbox" name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}][]" value="{$field_options['option_value']}">
                                                        <label for="field_{$field['id_velsof_supercheckout_custom_fields']}"><b>{$field_options['option_label']}</b></label>
                                                    </span>
                                                </div>

                                            </div>
                                        {/foreach}
                                        <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}" class="errorsmall_custom hidden_custom"></span>
                                    {/if}

                                    {* Start: Code added by Anshul for date field *}
                                    {if $field['type'] eq "date"}
                                        <label class="cursor_help" title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}<span style="display:inline;" class="supercheckout-required">*</span>{/if}</label>
                                        <input style="position: relative;" type="text" id="" name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]" value="{$field['default_value']}" class="supercheckout-large-field width_100 kb_sc_custom_field_date form-control" readonly="true">
                                        <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}" class="errorsmall_custom hidden_custom"></span>
                                        {if isset($field['validation_type']) && $field['validation_type'] == 'isDate'}
                                            <span style="color:#999999">
                                                {l s='Date format is Y-m-d' mod='supercheckout'}
                                            </span>
                                        {/if}
                                    {/if}
                                    {* Code added by Anshul for date field *}

                                    {* Start: Code added by Anshul for file field *}
                                    {if $field['type'] eq "file"}
                                        <label class="cursor_help" title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}<span style="display:inline;" class="supercheckout-required">*</span>{/if}</label>
                                        <input type="file" data-buttonText="{l s='Choose file' mod='supercheckout'}" id="kb_sc_custom_field_file_{$field['id_velsof_supercheckout_custom_fields']}" name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]" value="{$field['default_value']}" class="supercheckout-large-field width_100 kbfiletype form-control">
                                        <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}" class="errorsmall_custom hidden_custom"></span>
                                        {if isset($field['validation_type']) && $field['validation_type'] == 'isFile'}
                                            <span style="color:#999999">
                                                {l s='Supported file formats are PDF, JPEG, PNG, DOCX, CSV & GIF.' mod='supercheckout'}
                                            </span>
                                        {/if}
                                    {/if}
                                    {* Code added by Anshul for file field *}
                                </div>
                            {/if}
                        {/foreach}
                    </div>
        </div>
                    <!-- End - Code to insert custom fields in registration form block -->

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
