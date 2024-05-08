{extends file='checkout/_partials/steps/checkout-step.tpl'}

{block name='step_content'}
  <style>
    body{
      font-size: 1rem;
    }
    input[type=radio]:checked + .payment-option-row{
      background-color: #CCCCCC;
    }
  </style>
  {hook h='displayPaymentTop'}

  {* used by javascript to correctly handle cart updates when we are on payment step (eg vouchers added) *}
  <div style="display:none" class="js-cart-payment-step-refresh"></div>

  {if !empty($display_transaction_updated_info)}
  <p class="cart-payment-step-refreshed-info">
    {l s='Transaction amount has been correctly updated' d='Shop.Theme.Checkout'}
  </p>
  {/if}

  {if $is_free}
    <p class="cart-payment-step-not-needed-info">{l s='No payment needed for this order' d='Shop.Theme.Checkout'}</p>
  {/if}

  <div class="payment-options {if $is_free}hidden-xs-up{/if}">
    {foreach from=$payment_options item="module_options"}
      {foreach from=$module_options item="option"}
        <div class="payment-option-row p-1 {if ($selected_payment_option == $option.id || $is_free) ||
        ($selected_payment_option == null && $option.call_to_action_text == 'Ideal' && (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',
                                                                                                    Context::getContext()->language->id,
                                                                                                    Context::getContext()->shop->id_shop_group,
                                                                                                    Context::getContext()->shop->id) !== (int)Context::getContext()->customer->id) ||
        ($selected_payment_option == null && $option.module_name == 'ps_pinpayment' && (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',
        Context::getContext()->language->id,
        Context::getContext()->shop->id_shop_group,
        Context::getContext()->shop->id) == (int)Context::getContext()->customer->id)
        } selected {/if}">
          <div id="{$option.id}-container" class="payment-option clearfix row mb-0">
            {* This is the way an option should be selected when Javascript is enabled *}
            <span  style="line-height: 75px;max-width: 25px;" class="custom-radio float-none col">
              <input
                class="ps-shown-by-js {if $option.binary} binary {/if}"
                id="{$option.id}"
                data-module-name="{$option.module_name}"
                name="payment-option"
                type="radio"
                required
                {if ($selected_payment_option == $option.id || $is_free) ||
                ($selected_payment_option == null && $option.call_to_action_text == 'Ideal' && (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',
                Context::getContext()->language->id,
                Context::getContext()->shop->id_shop_group,
                Context::getContext()->shop->id) !== (int)Context::getContext()->customer->id) ||
                ($selected_payment_option == null && $option.module_name == 'ps_pinpayment' && (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',
                Context::getContext()->language->id,
                Context::getContext()->shop->id_shop_group,
                Context::getContext()->shop->id) == (int)Context::getContext()->customer->id)
                } checked {/if}
              >
              <span></span>
            </span>
{*            *}{* This is the way an option should be selected when Javascript is disabled *}
{*            <form method="GET" class="ps-hidden-by-js">*}
{*              {if $option.id === $selected_payment_option}*}
{*                {l s='Selected' d='Shop.Theme.Checkout'}*}
{*              {else}*}
{*                <button class="ps-hidden-by-js" type="submit" name="select_payment_option" value="{$option.id}">*}
{*                  {l s='Choose' d='Shop.Theme.Actions'}*}
{*                </button>*}
{*              {/if}*}
{*            </form>*}

            <label  style="line-height: 75px;" for="{$option.id}" class="col mb-0">
              <span class="w-auto h5">{$option.call_to_action_text}</span>
              {if $option.logo}
                <img style="width:100px;" class="img-responsive float-right" height="auto" src="{$option.logo}" loading="lazy">
              {/if}
            </label>


          {if $option.additionalInformation && ($option.module_name !== 'ps_pinpayment' && $option.module_name !== 'ps_cashpayment')}
            <div
              id="{$option.id}-additional-information"
              class="js-additional-information definition-list additional-information{if $option.id != $selected_payment_option} ps-hidden {/if} mt-0 mb-2 col-12 ml-0"
            >
              {$option.additionalInformation nofilter}
            </div>
          {/if}
          </div>
          <div
            id="pay-with-{$option.id}-form"
            class="js-payment-option-form {if $option.id != $selected_payment_option} ps-hidden {/if}"
          >
            {if $option.form}
              {$option.form nofilter}
            {else}
              <form id="payment-{$option.id}-form" method="POST" action="{$option.action nofilter}">
                {foreach from=$option.inputs item=input}
                  <input type="{$input.type}" name="{$input.name}" value="{$input.value}">
                {/foreach}
                <button style="display:none" id="pay-with-{$option.id}" type="submit"></button>
              </form>
            {/if}
          </div>
        </div>

      {/foreach}
    {foreachelse}
      <p class="alert alert-danger">{l s='Unfortunately, there are no payment method available.' d='Shop.Theme.Checkout'}</p>
    {/foreach}
  </div>

  {if $conditions_to_approve|count}
    <p class="ps-hidden-by-js">
      {* At the moment, we're not showing the checkboxes when JS is disabled
         because it makes ensuring they were checked very tricky and overcomplicates
         the template. Might change later.
      *}
      {l s='By confirming the order, you certify that you have read and agree with all of the conditions below:' d='Shop.Theme.Checkout'}
    </p>

    <form id="conditions-to-approve" class="js-conditions-to-approve" method="GET">
      <ul class="list-unstyled w-100">
        {foreach from=$conditions_to_approve item="condition" key="condition_name"}
          <li class="row">
            <div class="float-xs-left col mt-1">
              <span class="custom-checkbox">
                <input  id    = "conditions_to_approve[{$condition_name}]"
                        name  = "conditions_to_approve[{$condition_name}]"
                        required
                        type  = "checkbox"
                        value = "1"
                        class = "ps-shown-by-js"
                        checked
                >
              </span>
            </div>
            <div class="condition-label col-11 float-right mt-0">
              <label class="js-terms" for="conditions_to_approve[{$condition_name}]">
                {$condition nofilter}
              </label>
            </div>
          </li>
        {/foreach}
      </ul>
    </form>
  {/if}

  {hook h='displayCheckoutBeforeConfirmation'}

  {if $show_final_summary}
    {include file='checkout/_partials/order-final-summary.tpl'}
  {/if}

  <div id="payment-confirmation" class="js-payment-confirmation">
    <div class="ps-shown-by-js">
      <button type="submit" class="btn btn-success w-100 center-block{if !$selected_payment_option} disabled{/if}">
        {l s='Place order' d='Shop.Theme.Checkout'}
      </button>
      {if $show_final_summary}
        <article class="alert alert-danger mt-2 js-alert-payment-conditions" role="alert" data-alert="danger">
          {l
            s='Please make sure you\'ve chosen a [1]payment method[/1] and accepted the [2]terms and conditions[/2].'
            sprintf=[
              '[1]' => '<a href="#checkout-payment-step">',
              '[/1]' => '</a>',
              '[2]' => '<a href="#conditions-to-approve">',
              '[/2]' => '</a>'
            ]
            d='Shop.Theme.Checkout'
          }
        </article>
      {/if}
    </div>
    <div class="ps-hidden-by-js">
      {if $selected_payment_option and $all_conditions_approved}
        <label for="pay-with-{$selected_payment_option}">{l s='Order with an obligation to pay' d='Shop.Theme.Checkout'}</label>
      {/if}
    </div>
  </div>

  {hook h='displayPaymentByBinaries'}
{/block}
