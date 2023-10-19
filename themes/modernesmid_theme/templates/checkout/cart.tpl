{**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
{extends file=$layout}

{block name='content'}

  <section id="main" class="col-12">
    <div class="cart-grid row">

      <!-- Left Block: cart product informations & shpping -->
      <div class="cart-grid-body col-xs-12 col-lg-8">

        <!-- cart products detailed -->
        <div class="card cart-container border-0">
          <div class="p-2 ">
            <a class="h2 w-100 text-decoration-none text-dark">{l s='Shopping Cart' d='Shop.Theme.Checkout'}</a>
          </div>
          {block name='cart_overview'}
            {include file='checkout/_partials/cart-detailed.tpl' cart=$cart}
          {/block}
            {if Context::getContext()->customer->isLogged() && Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id) == Context::getContext()->customer->id}
                <div>
    {*            {block name='continue_shopping'}*}
    {*              <a class="btn btn-dark mt-2" href="{$urls.pages.index}">*}
    {*                <i class="fasl fa-chevron-left"></i> {l s='Continue shopping' d='Shop.Theme.Actions'}*}
    {*              </a>*}
    {*            {/block}*}
                  {* Show print cart button *}
                  <a href="#" id="addCustomProductByEmployee" data-cart="{Context::getContext()->cart->id}"  class="btn btn-success float-right mt-2" alt="Extra product toevoegen"><i class="fasl fa-plus"></i> Regel toevoegen</a>
    {*              <a href="#" id="printShoppingCartByEmployee" data-cart="{Context::getContext()->cart->id}" class="btn btn-link text-dark float-right mt-1" alt="Winkelwagen als pdf opslaan"><i class="fa-2x fasl fa-file-pdf"></i></a>*}
                </div>
            {/if}
        </div>
          <br>
        <!-- shipping informations -->
        {block name='hook_shopping_cart_footer'}
          {hook h='displayShoppingCartFooter'}
        {/block}
      </div>
      <div class="cart-grid-right col-xs-12 col-lg-4">
{*        <div class="card cart-summary">*}
{*          <div class="card-body">*}
{*              <b>Bestel nog {Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getTotalBeforeNextAutoDiscount(false, 'amount'),'EUR')} extra {Context::getContext()->cart->getTotalBeforeNextAutoDiscount(true, 'name')}</b>*}
{*          </div>*}
{*        </div>*}

        {block name='cart_summary'}
          <style>
            .cart-summary-next-shipment, .cart-discount{
              font-size: 13px;
              color:#000000;
            }
            #next-shipping-time,#next-discount-message{
              font-weight: bold;
            }
          </style>

        <div class="cart-summary-small mb-2">
          <div class="card-body bg-light">
              {block name='cart_totals'}
                  {include file='checkout/_partials/cart-detailed-totals-small.tpl' cart=$cart}
              {/block}
          </div>
        </div>

          <div class="cart-summary-next-shipment mb-2 text-black">
            <div class="card-body bg-light text-bold"><span id="next-shipping-time-icon" class="fasl fa-truck-fast fa-3x float-right"></span>
              Elke werkdag versturen we bestellingen.<br/> Eerstvolgende verzending over ongeveer <br/><span id="next-shipping-time"><span id="next-shipping-time-hours">1</span> uur en <span id="next-shipping-time-minutes">30</span> min</span>
            </div>
          </div>

          <div class="cart-discount mb-2 text-black">
            <div class="card-body bg-light"><span class="fasl fa-badge-percent fa-3x float-right" id="next-discount-icon"></span>
              {$discount_add.message|unescape: "html" nofilter}
            </div>
          </div>

          <div class="cart-summary text-black">
            <div class="card-body bg-light">
            {block name='cart_totals'}
              {include file='checkout/_partials/cart-detailed-totals.tpl' cart=$cart}
            {/block}
            </div>
            {block name='cart_actions'}
              {include file='checkout/_partials/cart-detailed-actions.tpl' cart=$cart}
            {/block}
          </div>
        {/block}
      </div>

    </div>
  </section>
  <script type="text/javascript">
    let carrierPickupTime = "{{Configuration::get('MSTHEMECONFIG_SELL_CARRIER_PICKUP_TIME', Context::getContext()->language->id)}}";

    function setTimeUntilShipping(){
      // Get current date and time
      const now = new Date();

      // Set target time to 4pm today
      const targetDate = new Date();
      let timeArray = carrierPickupTime.split(':')

      if(timeArray.length === 3){
        targetDate.setHours(timeArray[0]);
        targetDate.setMinutes(timeArray[1]);
        targetDate.setSeconds(timeArray[2]);
      } else {
        targetDate.setHours(16);
        targetDate.setMinutes(0);
        targetDate.setSeconds(0);
      }

      // Calculate difference in milliseconds between target and now
      const diff = targetDate.getTime() - now.getTime();

      // Convert difference to hours, minutes, seconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      document.getElementById('next-shipping-time-hours').textContent = hours;
      document.getElementById('next-shipping-time-minutes').textContent = minutes;
    }

    setTimeUntilShipping();
    setInterval(setTimeUntilShipping, 60*1000);
  </script>

{/block}


