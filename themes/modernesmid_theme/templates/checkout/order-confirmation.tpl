{extends file='page.tpl'}

{block name='page_content_container' prepend}
    <section id="content-hook_order_confirmation">
      <div class="card-block">
        <div class="row p-4">
          <div class="col-12 col-sm-8">
            {block name='order_confirmation_header'}
              <h3 class="card-title p-2">
                <i class="fasr fa-check rtl-no-flip done text-success"></i> {l s='Your order is confirmed' d='Shop.Theme.Checkout'}
                {if Context::getContext()->customer->isLogged() && Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE') == Context::getContext()->customer->id}
                  {* Show print cart button *}
                  {if isset(Tools::getValue('oncredit')) && Tools::getValue('oncredit') == 'true'}
                    <a target="_blank" href="/index.php?controller=pdf-physical-on-credit-order-slip&id_order={$order.details.id}" id="printShoppingCartOnCreditByEmployeeAfterCheckout" data-order="{$order.details.id}"  class="btn btn-link text-dark float-right" alt="Winkelwagen als pdf opslaan"><i class="fa-2x fasr fa-file-pdf"></i></a>
                  {else}
                    <a target="_blank" href="/index.php?controller=pdf-physical-order-slip&id_order={$order.details.id}" id="printShoppingCartByEmployeeAfterCheckout" data-order="{$order.details.id}"  class="btn btn-link text-dark float-right" alt="Winkelwagen als pdf opslaan"><i class="fa-2x fasr fa-file-pdf"></i></a>
                  {/if}
                {/if}
              </h3>
            {/block}

            <p class="p-2">
              {l s='An email has been sent to your mail address %email%.' d='Shop.Theme.Checkout' sprintf=['%email%' => $customer.email]}
              {if $order.details.invoice_url}
                {* [1][/1] is for a HTML tag. *}
                {l
                  s='You can also [1]download your invoice[/1]'
                  d='Shop.Theme.Checkout'
                  sprintf=[
                    '[1]' => "<a href='{$order.details.invoice_url}' id='printInvoiceAtConfirmation'>",
                    '[/1]' => "</a>"
                  ]
                }
              {/if}
            </p>

            {block name='hook_order_confirmation'}
              {$HOOK_ORDER_CONFIRMATION nofilter}
            {/block}

          </div>
          {block name='order_details'}
          <div id="order-details" class="col-12 col-sm-4 p-2">
            <h6 class="card-title">{l s='Order details' d='Shop.Theme.Checkout'}</h6>
            <ul class="list-unstyled">
              <li>{l s='Order reference: %reference%' d='Shop.Theme.Checkout' sprintf=['%reference%' => $order.details.reference]}</li>
              <li>{l s='Payment method: %method%' d='Shop.Theme.Checkout' sprintf=['%method%' => $order.details.payment]}</li>
              {if !$order.details.is_virtual}
                <li>
                  {l s='Shipping method: %method%' d='Shop.Theme.Checkout' sprintf=['%method%' => $order.carrier.name]}<br>
                  <em>{$order.carrier.delay}</em>
                </li>
              {/if}
            </ul>
          </div>
        {/block}
        </div>
      </div>
    </section>
{/block}

{block name='page_content_container'}
  <section id="content" class="page-content page-order-confirmation">
    <div class="card-block">
      <div class="w-100">

        {block name='order_confirmation_table'}
          {include
            file='checkout/_partials/order-confirmation-table.tpl'
            products=$order.products
            subtotals=$order.subtotals
            totals=$order.totals
            labels=$order.labels
            add_product_link=false
          }
        {/block}
      </div>
    </div>
  </section>

{*  {block name='hook_payment_return'}*}
{*    {if ! empty($HOOK_PAYMENT_RETURN)}*}
{*    <section id="content-hook_payment_return" class="definition-list">*}
{*      <div class="card-block">*}
{*        <div class="row p-4">*}
{*          <div class="col-12 col-sm-4 offset-sm-8 p-0">*}
{*            {$HOOK_PAYMENT_RETURN nofilter}*}
{*          </div>*}
{*        </div>*}
{*      </div>*}
{*    </section>*}
{*    {/if}*}
{*  {/block}*}

  {block name='customer_registration_form'}
    {if $customer.is_guest}
      <div id="registration-form" class="col-12 p-4">
        <div class="card-block">
          <h4 class="h4">{l s='Save time on your next order, sign up now' d='Shop.Theme.Checkout'}</h4>
          <a href="{$urls.pages.register}" title="Nu Registreren" class="btn btn-xl btn-primary"> Naar de registreer pagina </a>
        </div>
      </div>
    {/if}
  {/block}

  {block name='hook_order_confirmation'}
    {hook h='displayOrderConfirmation'}
  {/block}

  {block name='hook_order_confirmation_1'}
    {hook h='displayOrderConfirmation1'}
  {/block}

{/block}



{block name='javascript_bottom' append}
    {if Context::getContext()->customer->isLogged() && Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE') == Context::getContext()->customer->id}
  <script type="text/javascript">
    window.onload = function() {

      let pinPayment = "{Module::getModuleIdByName('ps_pinpayment')}";
      let cashPayment = "{Module::getModuleIdByName('ps_cashpayment')}";
      let creditPayment = "{Module::getModuleIdByName('ps_creditpayment')}";
      let currentPaymentModule = "{Tools::getValue('id_module')}";

      //Is an pinpayment
      if(currentPaymentModule === pinPayment){
        document.getElementById('printShoppingCartByEmployeeAfterCheckout').click();
      }
      //is an cashpayment
      if(currentPaymentModule === cashPayment){
        document.getElementById('printShoppingCartByEmployeeAfterCheckout').click();
      }
      //is and creditpayment
      if(currentPaymentModule === creditPayment){
        document.getElementById('printShoppingCartOnCreditByEmployeeAfterCheckout').click();
      }
    };
  </script>
    {/if}
{/block}
