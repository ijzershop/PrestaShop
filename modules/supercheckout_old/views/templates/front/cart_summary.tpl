{if isset($kb_free_shipping_percent)}
  <div class="" id="kb_cart_summary_free_shipping">
      {if $hidden_amount == 0}
        <h3>{l s='Congratulations!! You have reached the minumum amount limit to get Free Shipping.' mod='supercheckout'} </h3>
      {else}
        <h3>{l s='Almost there, Add ' mod='supercheckout'} {$kb_free_shipping_amount} {l s=' more to get Free Shipping' mod='supercheckout'}</h3>
      {/if}
    <div class="progress red">
      <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"
           aria-valuenow="{$kb_free_shipping_percent}" aria-valuemin="0" aria-valuemax="100"
           style="width:{$kb_free_shipping_percent}%">
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
  <div class="row cart_list_item border-0"
       id="product_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}">
    <table class="col-12 table-condensed border-bottom">
      <tr>
        <td class="shopping-cart-description" colspan="3">
          <a alt="verwijder product" title="verwijder product" class="btn btn-sm btn-link text-decoration-none  btn-hover h-100 product-cart-delete-button"
             id="{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}"
             onclick="deleteProductFromCart(this.id);" class="remove-from-cart" rel="nofollow" href="#"
             style="width:10%;float:right;{if $logged}{if $settings['cart_options']['product_name']['logged']['display'] eq 1 || $settings['cart_options']['product_model']['logged']['display'] eq 1 || $settings['cart_options']['product_qty']['logged']['display'] eq 1 || $settings['cart_options']['product_price']['logged']['display'] eq 1 || $settings['cart_options']['product_total']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['cart_options']['product_name']['guest']['display'] eq 1 || $settings['cart_options']['product_model']['guest']['display'] eq 1 || $settings['cart_options']['product_qty']['guest']['display'] eq 1 || $settings['cart_options']['product_price']['guest']['display'] eq 1 || $settings['cart_options']['product_total']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
            <i class="fa fa-trash"></i>
          </a>
          <div class="product-title text-center text-sm-left" style="width:90%;float:left;">
            <a class="pl-1" href="{$product_url|escape:'quotes'}">{$product.name|escape:'quotes'}</a>
              {if isset($product.attributes) && count($product.attributes) > 0}
                <div class="w-100 text-center text-sm-left">
                    {foreach from=$product.attributes key="attribute" item="value"}
                        {if !in_array($attribute, AttributeGroup::getSawCutModuleAttributeGroupNames(Context::getContext()->cookie->id_lang))}
                          <span><b>{$attribute} </b>{$value}</span>
                        {/if}

                    {/foreach}
                </div>
              {/if}
              {if $product.customizations|count}
                  {foreach from=$product.customizations item="customization"}
                      {foreach from=$customization.fields item="field"}
                        <div class="text-center text-sm-left pl-1">
                          <b>{str_replace(['zaaginstructies', 'knipinstructies','zagen','knippen'],['<i class="fak fa-saw"></i>','<i class="fas fa-cut"></i>', '<i class="fak fa-saw"></i>','<i class="fas fa-cut"></i>'],$field.label) nofilter} </b>
                            {if $field.type == 'text'}
                                {if (int)$field.id_module}
                                    {$field.text nofilter}
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
      <tr>
{*        <td width="30%">*}
{*                        <span class="cart-product-price text-right">*}
{*                          <span class="price special-price d-block text-right"*}
{*                                style="font-size: 14px;"><b>{Context::getContext()->currentLocale->formatPrice($product.price_with_reduction_without_tax, 'EUR')}</b></span> *}{*escape not required as contains html*}
{*                            {if $product.price != $product.regular_price}*}
{*                              <span*}
{*                                class="price regular-price d-block text-right">{Context::getContext()->currentLocale->formatPrice($product.price_without_reduction_without_tax, 'EUR')}</span>*}
{*                                *}{*escape not required as contains html*}

{*                            {/if}*}
{*                        </span>*}
{*        </td>*}
        <td width="60%" class="text-center">
          <div class="text-center"
               style="border:1px solid #ced4da; {if $logged}{if $settings['cart_options']['product_qty']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['cart_options']['product_qty']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
            <div class="bootstrap-touchspin m-0" style="max-width: auto;">
              <div class="input-group">
                <input type="hidden" value="{$product.quantity|intval}"
                       name="quantity_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}_hidden"/>
                <input type="hidden"
                       name="quantity_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}_minqty"
                       value="{$product.minimal_quantity|intval}">
                  {if isset($settings['qty_update_option']) && $settings['qty_update_option'] eq 0 }
                    <span class="input-group-prepend">
                                            <button type="button"
                                                    class="input-group-text cart_quantity_down qty-btn increase_button quantity-left-minus btn btn-primary btn-number"
                                                    data-type="plus" data-field=""
                                                    onclick="downQty('quantity_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}')">

                                                        <span class="fas fa-minus"></span>
                                                </button>
                                        </span>
                    <input min="1" onclick="this.select()" autocomplete="off" type="text" id="quantity"
                           class="form-control input-number quantitybox"
                           name="quantity_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}"
                           value="{$product.quantity|intval}">
                    <span class="input-group-append">
                                                <button type="button"
                                                        class="input-group-text cart_quantity_down qty-btn decrease_button quantity-right-plus btn btn-primary btn-number"
                                                        data-type="plus" data-field=""
                                                        onclick="upQty('quantity_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}')">
                                                        <span class="fas fa-plus"></span>
                                                </button>
                                        </span>
                  {else}
                    <input min="1" onclick="this.select()" autocomplete="off" type="text" id="quantity"
                           class="form-control input-number quantitybox kb_text_update_qty"
                           name="quantity_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}"
                           value="{$product.quantity|intval}">
                    <a href="javascript:void(0)" id="demo_2_s" class="kb_update_link"
                       title="{l s='update quantity' mod='supercheckout'}"
                       onclick="updateQtyByBtn('quantity_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}_{$product.id_customization|intval}')"><small>{l s='Update' mod='supercheckout'}</small></a>
                  {/if}

              </div>
            </div>
          </div>
        </td>
        <td width="40%">
          <div class="pl-0"
               id="total_product_price_{$product.id_product|intval}_{$product.id_product_attribute|intval}_{$product.id_address_delivery|intval}"
               style="{if $logged}{if $settings['cart_options']['product_total']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['cart_options']['product_total']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
            <span class="cart-product-price d-block text-right"
                  style="font-size: 14px;"><b>{Context::getContext()->currentLocale->formatPrice(($product.price_with_reduction_without_tax*$product.quantity), 'EUR')}</b></span>{*escape not required as contains html*}
              {if $product.price != $product.regular_price}
                <span
                  class="cart-product-price regular-price d-block text-right">{Context::getContext()->currentLocale->formatPrice(($product.price_without_reduction_without_tax*$product.quantity), 'EUR')}</span>{*escape not required as contains html*}
              {/if}
          </div>
  </div>
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
    {foreach from=$subtotals item="subtotal"}

        {if isset($subtotal.value) && $subtotal.value}
            {if $subtotal.type == 'products'}
              <tr id="supercheckout_summary_total_{$subtotal.type}"
                  style="{if $logged}{if $settings['order_total_option']['product_sub_total']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['product_sub_total']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
                <td colspan="5" class="text-right title"><strong>Producten ({$total_products}) </strong></td>
                <td class="value text-right"><span id="supercheckout_total_{$subtotal.type}_value"
                                                   class="price">{Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING),'EUR')}{*escape not required as contains html*}</span>
                </td>


                  {else if $subtotal.type == 'shipping'}
              <tr id="supercheckout_summary_total_{$subtotal.type}"
                  style="{if $logged}{if $settings['order_total_option']['shipping_price']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['shipping_price']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
                <td colspan="5" class="text-right title"><strong>{l s=$subtotal.label mod='supercheckout'} </strong>
                </td>
                <td class="value text-right"><span id="supercheckout_total_{$subtotal.type}_value"
                                                   class="price">{if Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING) != '0.00'}{Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING),'EUR')}{else}{Context::getContext()->currentLocale->formatPrice("0.00",'EUR')}{/if}{*escape not required as contains html*}</span>
                </td>

                  {else if $subtotal.type == 'tax'}
              <tr id="supercheckout_summary_total_{$subtotal.type}"
                  style="{if $logged}{if $settings['order_total_option']['total_tax']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['total_tax']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
                <td colspan="5" class="text-right title"><strong>Btw (21%) </strong></td>
                <td class="value text-right"><span id="supercheckout_total_{$subtotal.type}_value"
                                                   class="price">{Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(true, Cart::BOTH)-Context::getContext()->cart->getOrderTotal(false, Cart::BOTH),'EUR')}{*escape not required as contains html*}</span>
                </td>

                  {else}
              <tr id="supercheckout_summary_total_{$subtotal.type}">
              <td colspan="5" class="text-right title"><strong>{l s=$subtotal.label mod='supercheckout'} </strong></td>
              <td class="value text-right"><span id="supercheckout_total_{$subtotal.type}_value"
                                                 class="price">-{Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS),'EUR')}{*escape not required as contains html*}</span>
              </td>
            {/if}
          </tr>
        {/if}
    {/foreach}
    </tfoot>
  </table>

  <div class="custom-panel rewardsection">


      {*  Only show voucher when customer from group or balie mederwerker *}
      {if in_array((int)Configuration::get('MODERNESMIDTHEMECONFIGURATOR_EMPLOYEE_CUSTOMER_VOUCHER_GROUP'), Customer::getGroupsStatic(Context::getContext()->cart->id_customer)) || (int)Context::getContext()->cart->id_customer == (int)Configuration::get('MODERNESMIDTHEMECONFIGURATOR_EMPLOYEE_CUSTOMER_PROFILE')}
          {assign var="total_discount" value=0}
          {if $vouchers.allowed}
              {foreach $vouchers.added as $voucher}
                <div style="margin-bottom: 1%;" id="cart_discount_{$voucher.id_cart_rule}"
                     class="cart_discount text-right p-1"
                     style="{if $logged}{if $settings['order_total_option']['voucher']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['voucher']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
                  <div style="float:left;line-height: 20px;margin-right:5px;"
                       title="{l s='Korting toevoegen' mod='supercheckout'}"></div>
                  <span style="float:left;color:#4862A3;font-size:14px;">Kortingscode: {$voucher.name}</span><a
                    href="javascript:void(0)"
                    style="float: left;margin-left: 2%;"
                    onclick="removeDiscount('{$voucher.id_cart_rule|intval}')"><i
                      class="fas fa-trash"></i></a>
                  <span
                    class="price text-right">{Context::getContext()->currentLocale->formatPrice($voucher.reduction_amount/1.21, 'EUR')}</span>
                </div>
                  {assign var="total_discount" value=$total_discount+($voucher.reduction_amount/1.21)}
              {/foreach}
              {if count($vouchers.added) == 0}
                <div class="rewardHeader"
                     style="{if $logged}{if $settings['order_total_option']['voucher']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['voucher']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
                  <a href="javascript:void(0)"
                     onclick="$('.rewardBody').toggle();">{l s='Heeft u een kortings code?' mod='supercheckout'} </a>
                </div>
                <div class="rewardBody" style="display:none">
                  <!--h2>Coupon / Voucher / Reward</h2-->
                  <div id="supercheckout_voucher_input_row" class="form-group form-coupon"
                       style="{if $logged}{if $settings['order_total_option']['voucher']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['voucher']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
                    <!--label for="input-coupon" class="control-label">Enter your coupon here</label-->
                    <div class="input-group" id="voucher-form">
                      <input type="hidden" value="1" name="submitDiscount">
                      <input name="discount_name" id="discount_name" type="text"
                             placeholder="{l s='Vul hier uw kortingscode in' mod='supercheckout'}"
                             class="voucherText form-control">
                      <span class="input-group-btn"><button id="button-coupon" onClick="callCoupon();" type="button"
                                                            data-loading-text="Loading..."
                                                            class="btn btn-primary orangebuttonapply"
                                                            style="min-height: 33px;">{l s='Korting Toevoegen' mod='supercheckout'}</button>
                    </span>
                    </div>
                  </div>
                </div>
              {/if}
          {else}
            <div id="supercheckout_voucher_input_row" style="display:none;"></div>
          {/if}
      {else}

      {/if}

      {*  End Only show voucher when customer from group or balie mederwerker *}

      {* Start Code Added By Priyanshu on 11-Feb-2021 to implement the Total Price Display functionality*}
    <div class="totalAmount pb-0"
         style="{if $logged}{if $settings['order_total_option']['total']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['total']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
      <h3>
          {l s='Total Amount' mod='supercheckout'} {l s='(Tax incl.)' mod='supercheckout'}:
        <span id="total_price"
              class="price amountMoney">{Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(true, Cart::BOTH),'EUR')}{*escape not required as contains html*}</span>
        <input type="hidden" id="total_price_wfee"
               value="{Context::getContext()->currentLocale->formatPrice($total_products_price, 'EUR')}">{*escape not required as contains html*}</td>
      </h3>
    </div>

      {if (int)Context::getContext()->cart->id_customer == (int)Configuration::get('MODERNESMIDTHEMECONFIGURATOR_EMPLOYEE_CUSTOMER_PROFILE') && $total_discount > 0}
        <div class="totalAmount pb-0"
             style="{if $logged}{if $settings['order_total_option']['total']['logged']['display'] eq 1}{else}display:none{/if}{else}{if $settings['order_total_option']['total']['guest']['display'] eq 1}{else}display:none{/if}{/if};">
          <h3>
              {l s='Retour Bedrag' mod='supercheckout'} {l s='(Tax incl.)' mod='supercheckout'}:
            <span id="total_price"
                  class="price amountMoney">{Context::getContext()->currentLocale->formatPrice($total_discount-Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS),'EUR')}{*escape not required as contains html*}</span>
          </h3>
        </div>
      {/if}
    <br>
      {* End Code Added By Priyanshu on 11-Feb-2021 to implement the Total Price Display functionality*}
  </div>


  <div id="highlighted_cart_rules">
      {if count($other_available_vouchers) == 0}
        <div id="display_cart_vouchers">
            {foreach $other_available_vouchers as $voucher}
                {if $voucher.code != ''}<span onclick="$('#discount_name').val('{$voucher.code}');
                  return false;" class="voucher_name"
                                              data-code="{$voucher.code}">{$voucher.code}</span> - {/if}{$voucher.name}
              <br/>
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
                  <label class="cursor_help"
                         title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}
                      <span style="display:inline;" class="supercheckout-required">*</span>
                      {/if}</label>
                  <input type="text" name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]"
                         value="{$field['default_value']}" class="supercheckout-large-field width_100 form-control">
                  <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}"
                        class="errorsmall_custom hidden_custom"></span>
                {/if}

                {if $field['type'] eq "textarea"}
                  <label class="cursor_help"
                         title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}
                      <span style="display:inline;" class="supercheckout-required">*</span>
                      {/if}</label>
                  <textarea name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]"
                            class="supercheckout-large-field width_100 form-control"
                            style="width: 100%; height: 100px;">{$field['default_value']}</textarea>
                  <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}"
                        class="errorsmall_custom hidden_custom"></span>
                {/if}

                {if $field['type'] eq "selectbox"}
                  <label class="cursor_help"
                         title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}
                      <span style="display:inline;" class="supercheckout-required">*</span>
                      {/if}</label>
                  <select name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]"
                          class="supercheckout-large-field width_100 form-control">
                    <option value="">{l s='Select Option' mod='supercheckout'}</option>
                      {foreach from=$field['options'] item=field_options}
                        <option {if $field_options['default_value'] eq $field_options['option_value']}selected{/if}
                                value="{$field_options['option_value']}">{$field_options['option_label']}</option>
                      {/foreach}
                  </select>
                  <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}"
                        class="errorsmall_custom hidden_custom"></span>
                {/if}

                {if $field['type'] eq "radio"}
                  <label class="cursor_help"
                         title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}
                      <span style="display:inline;" class="supercheckout-required">*</span>
                      {/if}</label>
                    {assign var=radio_counter value=1}
                    {foreach from=$field['options'] item=field_options}
                      <div class="supercheckout-extra-wrap">
                        <div class="radio" id="uniform-field_{$field['id_velsof_supercheckout_custom_fields']}"><span>
                                                        <input type="radio"
                                                               name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]"
                                                               value="{$field_options['option_value']}"
                                                               {if $field_options['default_value'] eq $field_options['option_value']}checked{/if}>
                                                        <label
                                                          for="field_{$field['id_velsof_supercheckout_custom_fields']}">{$field_options['option_label']}</label>
                                                    </span></div>

                      </div>
                        {assign var=radio_counter value=$radio_counter+1}
                    {/foreach}
                  <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}"
                        class="errorsmall_custom hidden_custom"></span>
                {/if}

                {if $field['type'] eq "checkbox"}
                  <label class="cursor_help"
                         title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}
                      <span style="display:inline;" class="supercheckout-required">*</span>
                      {/if}</label>
                    {foreach from=$field['options'] item=field_options}
                      <div class="input-box input-field_{$field['id_velsof_supercheckout_custom_fields']}">
                        <div class="checker checkbox"
                             id="uniform-field_{$field['id_velsof_supercheckout_custom_fields']}">
                                                    <span class="checked">
                                                        <input {if $field_options['default_value'] eq $field_options['option_value']}checked{/if} type="checkbox"
                                                               name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}][]"
                                                               value="{$field_options['option_value']}">
                                                        <label
                                                          for="field_{$field['id_velsof_supercheckout_custom_fields']}"><b>{$field_options['option_label']}</b></label>
                                                    </span>
                        </div>

                      </div>
                    {/foreach}
                  <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}"
                        class="errorsmall_custom hidden_custom"></span>
                {/if}

                {* Start: Code added by Anshul for date field *}
                {if $field['type'] eq "date"}
                  <label class="cursor_help"
                         title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}
                      <span style="display:inline;" class="supercheckout-required">*</span>
                      {/if}</label>
                  <input style="position: relative;" type="text" id=""
                         name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]"
                         value="{$field['default_value']}"
                         class="supercheckout-large-field width_100 kb_sc_custom_field_date form-control"
                         readonly="true">
                  <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}"
                        class="errorsmall_custom hidden_custom"></span>
                    {if isset($field['validation_type']) && $field['validation_type'] == 'isDate'}
                      <span style="color:#999999">
                                                {l s='Date format is Y-m-d' mod='supercheckout'}
                                            </span>
                    {/if}
                {/if}
                {* Code added by Anshul for date field *}

                {* Start: Code added by Anshul for file field *}
                {if $field['type'] eq "file"}
                  <label class="cursor_help"
                         title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}
                      <span style="display:inline;" class="supercheckout-required">*</span>
                      {/if}</label>
                  <input type="file" data-buttonText="{l s='Choose file' mod='supercheckout'}"
                         id="kb_sc_custom_field_file_{$field['id_velsof_supercheckout_custom_fields']}"
                         name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]"
                         value="{$field['default_value']}"
                         class="supercheckout-large-field width_100 kbfiletype form-control">
                  <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}"
                        class="errorsmall_custom hidden_custom"></span>
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
