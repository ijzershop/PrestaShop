{extends file='checkout/checkout.tpl'}
{block name='content'}
    {capture name=path}
        {l s='SuperCheckout' mod='supercheckout'}
    {/capture}
    {if !isset($empty)}
      <script>
        var postcodeApiUrl = "{url entity='module' name='modernesmidthemeconfigurator' controller='ajax'}";
        var check_dni_valid = "{$check_dni_valid|escape:'javascript':'UTF-8'}"; {*Feature:Spain DNI Check (Jan 2020)*}
        {if $ps_checkout_enabled}
        var paypalOrderId = "{$paypalOrderId|escape:'javascript':'UTF-8'}";
        var validateOrderLinkByCard = "{$validateOrderLinkByCard|escape:'javascript':'UTF-8'}";
        var validateOrderLinkByPaypal = "{$validateOrderLinkByPaypal|escape:'javascript':'UTF-8'}";
        {/if}
        {if (isset($mobileLoginActive) && ($mobileLoginActive eq 1))}
        var kbmobile_front_url = '{$kbmobile_front_url nofilter}';{*escape not required as contains url*}
        var login_by_mobile = "{$mobile_login_setting['login_by_mobile']}";
        var login_by_otp = "{$mobile_login_setting['login_by_otp']}";
        var kb_input_error_msg = "{l s='Kindly input valid values in all required fields' mod='supercheckout'}";
        {/if}
        var cartRefreshURL = '{$cartRefreshURL}';
        var hideShippingMethod = {$settings['hide_ship_pay']};
        var supercheckout_image_path = "{$module_image_path nofilter}"; {*escape not required as contains url*}
        var empty_cart_warning = "{l s='Your cart is empty' mod='supercheckout'}";
        var google_auto_fill_warning = "{l s='There is some issue with Google Auto Address feature. Please contact support.' mod='supercheckout'}";
        var notification_title = "{l s='Notification' mod='supercheckout'}";
        var warning = "{$warning}";
        var product_remove_success = "{$product_remove_success}";
        var product_qty_update_success = "{$product_qty_update_success}";
        var freeShippingTranslation = "{l s='Free Shipping' mod='supercheckout'}";
        var display_general_error_msg = "{l s='Please provide required information.' mod='supercheckout'}";
        var noShippingRequired = "{l s='No Delivery Method Required' mod='supercheckout'}";
        var ShippingRequired = "{l s='Delivery Method Required' mod='supercheckout'}";
        var paymentRequired = "{l s='Payment Method Required' mod='supercheckout'}";
        var updateSameQty = "{l s='No change found in quantity' mod='supercheckout'}";
        var scInvalidQty = "{l s='Invalid Quantity' mod='supercheckout'}";
        var scOtherError = "{l s='Technical Error Occured. Please contact to support.' mod='supercheckout'}";
        var commentInvalid = "{l s='Message is in invalid format' mod='supercheckout'}";
        var tosRequire = "{l s='Please acccept our terms & conditions before confirming your order' mod='supercheckout'}";
        var requestToLogin = "{l s='Please login first' mod='supercheckout'}";
        var ajaxRequestFailedMsg = "{l s='TECHNICAL ERROR- Request Failed' mod='supercheckout'}";
        var validationfailedMsg = "{l s='Please provide required Information' mod='supercheckout'}";
        var totalVoucherText = "{l s='Total Vouchers' mod='supercheckout'}";
        var tax_incl_text = "{l s='(Tax incl.)' mod='supercheckout'}";
        var tax_excl_text = "{l s='(Tax excl.)' mod='supercheckout'}";
        var update_text = "{l s='Update' mod='supercheckout'}";
        var kb_input_error_msg = "{l s='Kindly input valid values in all required fields' mod='supercheckout'}";
        var idAddress_delivery = {$id_address_delivery|intval};
        var scp_use_taxes = 1;
        var nanvalidqty = "{l s='Please enter a valid quanity.' mod='supercheckout'}";

        var scp_guest_tracking_url = "{$link->getPageLink("guest-tracking", true)|addslashes nofilter}{*escape not required as contains url*}";
        var scp_history_url = "{$link->getPageLink("history", true)|addslashes nofilter}{*escape not required as contains url*}";
        var payment_content_id = 'center_column';
        var scp_required_tos = {$settings['confirm']['term_condition'][$user_type]['require']|intval};
        var show_delivery_add_for_virtualcart = false;
        {if $show_delivery_add_for_virtualcart eq true}
        show_delivery_add_for_virtualcart = true;
        {/if}
        var is_virtual_cart = false;
        {if $is_virtual_cart eq true}
        is_virtual_cart = true;
        {/if}
        var cart_update_url = "{$link->getPageLink('cart')|escape:'quotes'}"; {*escape not required as contains html*}
        var enable_save_address_front = "{$settings['enable_save_address']}";
        var orderOpcUrl = "{$link->getPageLink("order-opc", true)|escape:'quotes'}";{*escape not required as contains html*}
        var button_background = "{$settings['customizer']['button_color']}";
        var required_error = "{l s='Required Field' mod='supercheckout'}";
        var invalid_email = "{l s='Email is invalid' mod='supercheckout'}";
        var pwd_error = "{l s='(Five characters minimum)' mod='supercheckout'}";
        var invalid_city = "{l s='Special Characters !<>;?=+@#°{}_$% are not allowed' mod='supercheckout'}";
        var invalid_address = "{l s='Special Characters !<>?=+@{}_$% are not allowed' mod='supercheckout'}";
        var invalid_title = "{l s='Special Characters <>={} are not allowed' mod='supercheckout'}";
        var invalid_number = "{l s='Only +.-() and numbers are allowed' mod='supercheckout'}";
        var invalid_other_info = "{l s='Special Characters <>{} are not allowed' mod='supercheckout'}";
        var invalid_dob = "{l s='Invalid Date of Birth' mod='supercheckout'}";
        var invalid_country_msg = "{l s='Invalid Country' mod='supercheckout'}";
        var invalid_state_msg = "{l s='Invalid State' mod='supercheckout'}";
        var invalid_name = "{l s='Name is invalid' mod='supercheckout'}";
        var number_error = "{l s='Numbers not allowed' mod='supercheckout'}";
        var toc_error = "{l s='Please acccept our terms & conditions before confirming your order' mod='supercheckout'}";
        var zipcode_error = "{l s='Some Products in your cart can not be delivered to the selected address.Kindly remove the same or change your address.' mod='supercheckout'}";
        var order_place_confirmation = "{l s='All the information provided by you are correct?' mod='supercheckout'}";
        var splchar_error = "{l s='Special Characters !<>,;?=+()@#°{}_$%: are not allowed' mod='supercheckout'}";
        var inline_validation = {$settings['inline_validation']['enable']|intval};
        var street_number_warning = "{l s='Street Number in address is missing, are you sure you don\'t have one?' mod='supercheckout'}";

        /*
         * Added by Anshul Mittal
         */
        var save_update_address = "{l s='You might forgot to update the address. Please save the address first or cancel it.' mod='supercheckout'}";
        var upload_file_text = "{l s='Please upload a file.' mod='supercheckout'}";
        var valid_format_file_text = "{l s='Please upload a file with a valid format.' mod='supercheckout'}";


        {if isset($settings['qty_update_option']) && $settings['qty_update_option'] eq 0 }
        var update_qty_button = 1;
        {else}
        var update_qty_button = 0;
        {/if}
        {*Below code added by Nimish for google auto address feature*}
        {if $settings['google_auto_address']['enable'] eq 1}
        {if isset($settings['google_auto_address']['api_key']) && $settings['google_auto_address']['api_key'] neq ''}
        var google_auto_address_api_key = "{$settings['google_auto_address']['api_key']|escape:'htmlall':'UTF-8'}";
        {/if}
        {/if}
        {*Above code added by Nimish for google auto address feature*}
        {if isset($guest_information) && $guest_information != ''}
        var guest_information = JSON.parse('{$guest_information nofilter}'); {*escape not required as contains JS*}
        {/if}
        {urldecode($settings['custom_js']) nofilter}  {*escape not required as contains JS*}
        {*      Custom added variables by ijzershop      *}

        var shippingCarrier = parseInt("{Configuration::get('MSTHEMECONFIG_SHIPPING_CARRIER')}");
        var pickupCarrier = parseInt("{Configuration::get('MSTHEMECONFIG_PICKUP_CARRIER')}");
        var add2OrderCarrier = parseInt("{Configuration::get('MSTHEMECONFIG_ADD2ORDER_CARRIER')}");

        {*      Custom added variables by ijzershop      *}
      </script>
        {if $ps_checkout_enabled}
          <script id="paypalSdk"
                  src="https://www.paypal.com/sdk/js?components=hosted-fields,buttons&amp;client-id={$paypalClientId|escape:'htmlall':'UTF-8'}&amp;merchant-id={$merchantId|escape:'htmlall':'UTF-8'}&amp;intent={$intent|escape:'htmlall':'UTF-8'}&amp;currency={$currencyIsoCode|escape:'htmlall':'UTF-8'}"
                  data-client-token="{$clientToken|escape:'htmlall':'UTF-8'}">
          </script>
        {/if}
        {assign var='login_boxes_width' value=50|intval}
        {if $settings['fb_login']['enable'] || $settings['fb_login']['enable']}
            {$login_boxes_width = 33}
        {/if}
      <style>

        {literal}
        .supercheckout_top_boxes {
          width: {/literal}{$login_boxes_width|intval}{literal}%;
        }

        {/literal}
        {urldecode($settings['custom_css']) nofilter}{*Variable contains css content, escape not required*}
        #column-2-upper {
          padding: 0;
        }

        #header .header-nav {
          padding: 1rem 0 .9375rem;
          border: none !important;
          margin-bottom: 20px !important;
        }

        #footer {
          padding-bottom: .9375rem;
          padding-top: .9375rem !important;
        }

        .opc-container {
          letter-spacing: 0px !important;
        }

        .opc-container .custom-panel h2 {
          letter-spacing: 0px !important;
        }

        #velsof_supercheckout_form .progress {
          margin-bottom: 10px;
        }

        .table-bordered.totalTable tr td.value {
          width: 70px;
          font-size: 13px;
        }

        .table.table-bordered.totalTable td {
          font-size: 13px;
          text-align: right;
        }

        .shippingInfo {
          display: block;
          margin-top: 5px;
          padding-left: 0px;
          font-size: 12px;
          text-align: right;
        }

        a.label-link {
          font-size: 13px;
        }

        #button-login {
          letter-spacing: 0px
        }

        .opc-container label {
          margin-bottom: 1px;
        }

        .opc-container input[type=checkbox] {
          min-height: 0px;
        }

        .register-section {
          font-size: 13px;
        }

        .register-section tr td div {
          display: inline-block;
        }

        .responsvieKB {
          width: 100% !important;
          flex: 100% !important;
          max-width: 100% !important;
        }

        .social-login a {

          text-align: left;
        }

        #forgotpasswordlink {
          height: 20px;
        }

        #button-login {
          background: rgb(92, 184, 92);
          width: 85%;
          display: block;
          max-width: initial;
          text-align: center;
          margin: 0 auto;
          margin-top: 10px;
          clear: both;
          padding-top: 10px;
        }

        .shippingInfo {
          margin-bottom: 0px;
        }

        .delete_product i {
          width: 16px;
          height: 16px;
        }

        .delete_product {
          font-size: 11px;
        }

        #shipping_address_table td {
          vertical-align: top;
        }

        #payment_address_table td {
          vertical-align: top;
        }


        .opc-container input[type=checkbox]:checked + label:before {
          background-color: #3b56ad;
          border-color: #3b56ad;
          color: #{$settings['customizer']['button_text_color']};
        }

        .opc-container .custom-panel h2:after {
          position: absolute;
          content: '';
          border-left: 3px solid #3b56ad;
          left: 0;
          top: 0;
          height: 100%;
        }

        .opc-container a, .opc-container a:hover, .opc-container a:focus {
          color: #{$settings['customizer']['product_name_color']};
        }

        button.cart_quantity_down.qty-btn.increase_button.quantity-left-minus.btn.btn-primary.btn-number,
        button.cart_quantity_down.qty-btn.decrease_button.quantity-right-plus.btn.btn-primary.btn-number {
          background-color: #3b56ad;
        }

        .myAccountLi a, .myAccountLi a:focus, .myAccountLi a:hover {
          background-color: # {$settings['customizer']['my_account_button_color']} !important;
          color: # {$settings['customizer']['button_text_color']} !important;
        }

        .accountLogoutLi a, .accountLogoutLi a:focus, .accountLogoutLi a:hover {
          background-color: # {$settings['customizer']['logout_button_color']} !important;
          color: # {$settings['customizer']['button_text_color']} !important;
        }

        #velsof_supercheckout_form .progress-bar-striped, .progress-striped .progress-bar {
          background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
          -webkit-background-size: 40px 40px;
          background-size: 40px 40px;
          height: 100%;
          background-color: #{$settings['customizer']['progressbar_button_color']};
        }

        #velsof_supercheckout_form .progress .progress-bar:after {
          border-left-color: #{$settings['customizer']['progressbar_button_color']};
        }

        .progress-bar {
          color: # {$settings['customizer']['button_text_color']} !important;
        }


        #velsof_supercheckout_form .kb_velsof_sc_overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: white;
          opacity: 0.5;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          z-index: 1;
        }


      </style>
        {if (isset($mobileLoginActive) && ($mobileLoginActive eq 1))}
          <style>
            /* For Firefox */
            input[type='number'] {
              -moz-appearance: textfield;
            }

            /* Webkit browsers like Safari and Chrome */
            input[type=number]::-webkit-inner-spin-button,
            input[type=number]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            .kb-help-block {
              margin-top: 5px;
            }
          </style>
        {/if}
      <a style="display:none;" href="javascript:void(0)" id="bancasella_process_payment"></a>
        {capture name=path}<span class="navigation_page">{l s='Your shopping cart' mod='supercheckout'}</span>{/capture}
      <div id="fb-root"></div>
      <div id="supercheckout-empty-page-content" class="supercheckout-empty-page-content mt-2 col-12"
           style="display:block">
          {if isset($velsof_errors) && count($velsof_errors) > 0}
            <div class="permanent-warning">
                {foreach $velsof_errors as $err}
                    {$err}
                  <br>
                {/foreach}</div>
          {/if}
      </div>
        {hook h='displayPaymentTop'}
        {hook h="displayContentWrapperTop"}
      <form id="velsof_supercheckout_form" autocomplete="form-none" class="container opc-container p-0"
            action="{$supercheckout_url}" method="POST" onsubmit=" return isPressedEnter(this)"
            enctype="multipart/form-data">
          {*Added by Anshul to change the progressive loader*}

        <div class="kb_velsof_sc_overlay" style="display: none;"></div>
        <div class="pay-loader" style="display: none;">
          <div class="loader"></div>
        </div>
        <style>
          .pay-loader {
            position: fixed;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            top: 0;
            z-index: 9999;
            text-align: center;
            left: 0;
            opacity: 1;
          }

          .loader,
          .loader:before,
          .loader:after {
            border-radius: 50%;
            width: 2.5em;
            height: 2.5em;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
            -webkit-animation: load7 1.8s infinite ease-in-out;
            animation: load7 1.8s infinite ease-in-out;
          }

          .loader {
            color: #4862a3;
            font-size: 10px;
            margin: 22% auto;
            position: relative;
            text-indent: -9999em;
            -webkit-transform: translateZ(0);
            -ms-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
          }

          .loader:before,
          .loader:after {
            content: '';
            position: absolute;
            top: 0;
          }

          .loader:before {
            left: -3.5em;
            -webkit-animation-delay: -0.32s;
            animation-delay: -0.32s;
          }

          .loader:after {
            left: 3.5em;
          }

          @-webkit-keyframes load7 {
            0%,
            80%,
            100% {
              box-shadow: 0 2.5em 0 -1.3em;
            }
            40% {
              box-shadow: 0 2.5em 0 0;
            }
          }

          @keyframes load7 {
            0%,
            80%,
            100% {
              box-shadow: 0 2.5em 0 -1.3em;
            }
            40% {
              box-shadow: 0 2.5em 0 0;
            }
          }


        </style>
          {*Added by Anshul to change the progressive loader*}
        <input type='hidden' name='{$plugin_name}PlaceOrder' value='1'/>
          {if isset($settings['html_value']['header']) && $settings['html_value']['header'] neq ''}
            <div id="supercheckout_html_content_header">
                {$settings['html_value']['header'] nofilter}{*Variable contains html content, escape not required*}
            </div>
          {/if}
        <div id="submission_progress_overlay" class="submit_progress_disable"></div>
          {*Added by Anshul to change the progressive loader*}
        <div class="container" id="supercheckout_order_progress_bar" style="display:none;">
          <div class="row">
            <div class="col-md-12">
              <h3 class="progress-title">{l s='Loading' mod='supercheckout'}....</h3>
              <div class="progress">
                <div class="progress-bar progress-bar-danger progress-bar-striped active" style="width:20%;">
                  <div class="progress-value" id="supercheckout_order_progress_status_text">20%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
          {*Added by Anshul to change the progressive loader*}
        <div class="panel panel-default p-0">


          <fieldset class="group-select row" id="supercheckout-fieldset">
            <div class="col-12 supercheckout-threecolumns supercheckout-container supercheckout-skin-generic panel-body"
                 id="supercheckout-columnleft">
              <div class="col">
                  {*                          Eerste kolom *}
                <div class="col-12 col-sm-12 col-md-4" id="first_checkout_column">
                  <div class="supercheckout-column-left columnleftsort checkout-section section-login custom-panel"
                       id="columnleft-1"> {*Need to change later*}

                      {*                                Login *}
                    <div class="supercheckout-blocks">
                      <h2 class="title section-title">{l s='Login Options' mod='supercheckout'} <span
                          class="section-title-number">1</span></h2>
                      <div id="checkoutLogin" class="section-body">
                        <div class="supercheckout-checkout-content"></div>
                          {include file='module:supercheckout/views/templates/front/login.tpl'}
                      </div>
                    </div>
                      {*                               Verzending*}
                    <div class="supercheckout-blocks">
                      <div class="opc_shipping_method">
                        <h2
                          class="supercheckout-numbers supercheckout-numbers-4 title section-title">{l s='Delivery Method' mod='supercheckout'}
                          <span class="section-title-number">2</span></h2>
                        <div id="shipping_method_update_warning" class="supercheckout-checkout-content"></div>
                        <div id="shipping-method">
                            {*Here Delivery Methods will be rendered*}
                        </div>
                      </div>
                    </div>
                      {*                                Betaling*}
                    <div class="supercheckout-blocks">
                      <div class="opc_payment_method">
                        <h2
                          class="supercheckout-numbers supercheckout-numbers-4 title section-title">{l s='Payment Method' mod='supercheckout'}
                          <span class="section-title-number">3</span></h2>
                        <div id="payment_method_update_warning" class="supercheckout-checkout-content"></div>
                        <div id="payment-method">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                  {*                          Tweede kolom *}
                <div class="col-12 col-sm-6 col-md-4" id="second_checkout_column">
                  <div class="supercheckout-column-middle columnleftsort" id="columnleft-2">
                    <div class="supercheckout-column-left columnleftsort row" id="column-2-upper">
                      <div class="col-12 opc_shipping_address custom-panel">
                        <div class="supercheckout-blocks">
                          <div id="checkoutShippingAddress">
                              {include file='module:supercheckout/views/templates/front/shipping_address.tpl'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="supercheckout-column-left columnleftsort row" id="column-2-lower">
                      <div class="col-12 opc_payment_address custom-panel">
                        <div class="supercheckout-blocks">
                          <div id="checkoutBillingAddress" {$settings['use_delivery_for_payment_add'][$user_type]}
                               style="display:{if (int)$settings['use_delivery_for_payment_add'][$user_type] == 1}none{else}block{/if};">
                              {include file='module:supercheckout/views/templates/front/payment_address.tpl'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {*                          Derde kolom *}
              <div class="col-12 col-sm-6 col-md-4" id="last_checkout_column">
                <div class="supercheckout-column-right columnleftsort kb_mobile_sc_respo" id="columnleft-3">
                  <div class="supercheckout-blocks confirmCheckoutBack">
                    <div class="opc_shoppingcart custom-panel">
                      <h2>{l s='Shopping Cart' mod='supercheckout'} <span class="section-title-number"
                                                                          id="section-title-number-last">5</span></h2>
                      <div id="cart_update_warning" class="supercheckout-checkout-content"></div>
                      <div id="complete_cart_summary">
                          {*Here Cart Summary will be rendered*}
                      </div>
                    </div>

                  </div>
                  <div class="supercheckout-blocks opc_confirmcart custom-panel columnleftsort">
                    <div class="form-group" id="supercheckout-comments">
                      <textarea id="supercheckout-comment_order" maxlength="70" class="form-control" name="comment"
                                placeholder="{l s='Voeg instructie voor expediteur toe (max. 70 tekens)' mod='supercheckout'}"></textarea>
                      <span id="order_comment_box_totals">0/70 tekens</span>
                    </div>
                    <div id="placeorderButton" style="text-align: center;margin-bottom: 10px;">
                        {* changes over *}
                      <div id="buttonWithProgres">
                        <button id="supercheckout_confirm_order" class="orangebutton btn btn-success">
                            {if $settings['checkout_option'] eq 2}Plaats Bestelling & Registreer{else}{l s='Place Order' mod='supercheckout'}{/if}
                          <div id="progressbar" style="text-align:center;margin-top: 0px;"></div>
                        </button>
                      </div>
                    </div>
                    <div id="bottomloginButton" style="text-align: center;margin-bottom: 10px;display:none;">
                      <button id="supercheckout_bottom_login" type="button" class="btn btn-primary w-100">
                        LOG IN
                      </button>
                    </div>
                    <input type="hidden" name="supercheckout_submission" value=""/>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
            <input type="hidden" id="module_url"
                   value="{$supercheckout_url|escape:'quotes'}"/> {*escape not required as contains html*}
            <input type="hidden" id="addon_url"
                   value="{$addon_url|escape:'quotes'}"/> {*escape not required as contains html*}
            <input type="hidden" id="analytic_url"
                   value="{$analytic_url|escape:'quotes'}"/> {*escape not required as contains html*}
          </fieldset>
        </div>

      </form>
      <script>

        document.getElementById('supercheckout-comment_order').onkeyup = function () {
          document.getElementById('order_comment_box_totals').innerText = this.value.length + '/70 tekens';
        };


        var default_country = {$default_country};
        var js_countries = '{json_encode($countries)|addslashes nofilter}{*escape not required as contains html*}';
        var countries = JSON.parse(js_countries);
        delete js_countries;
        var allowed_countries = [];
        for (var country in countries) {
          if (country == default_country) {
            allowed_countries.push(countries[country].iso_code);
          }
        }
        var page_lang_code = "{$iso_code}";


      </script>
    {else}
      <div class="supercheckout-empty-page-content" style="display:block">
        <div class="permanent-warning">{l s='Your shopping cart is empty.' mod='supercheckout'}</div>
      </div>
    {/if}
{/block}

