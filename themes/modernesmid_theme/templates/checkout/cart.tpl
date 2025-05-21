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
    <div class="cart-grid row m-1">
      <!-- Left Block: cart product informations & shpping -->
      <div class="cart-grid-body col-xs-12 col-lg-8 p-0">
        <!-- cart products detailed -->
        <div class="card cart-container border-0 row">
          <div class="p-2 col">
            <a class="h2 col text-decoration-none text-dark">{l s='Shopping Cart' d='Shop.Theme.Checkout'}</a>
          </div>
          {block name='cart_overview'}
            {include file='checkout/_partials/cart-detailed.tpl' cart=$cart}
          {/block}
            {if Context::getContext()->is_counter_customer}
                <div class="col">
                  {* Show print cart button *}
                  <a href="#" id="addCustomProductByEmployee" data-cart="{Context::getContext()->cart->id}"  class="btn btn-success float-right mt-2" alt="Extra product toevoegen"><i class="fasl fa-plus"></i> Regel toevoegen</a>
                  <a href="#" id="removeShoppingCartDefaultDiscount" data-cart="{Context::getContext()->cart->id}"  class="btn btn-warning float-right text-white mt-2" alt="Winkelwagen korting verwijderen"><i class="fasl fa-times"></i> Korting verwijderen</a>
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
      <div class="cart-grid-right col-xs-12 col-lg-4 p-0">
        {block name='cart_summary'}
          <style>
            .cart-summary-next-shipment, .cart-discount{
              line-height: 1.2rem;
              font-size: 13px;
              color:#000000;
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
              Elke werkdag versturen we bestellingen.<br/> <b>Eerstvolgende verzending is over </b><br/><b id="next-shipping-time"><span id="next-shipping-time-days"></span><span id="next-shipping-time-hours"></span><span id="next-shipping-time-minutes"></span></b>
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
    let carrierPickupTimeSkippedDates = "{{Configuration::get('MSTHEMECONFIG_SELL_CARRIER_PICKUP_TIME_SKIPPING_DATES', Context::getContext()->language->id)}}";

    // Parse the skipped dates once, not on every interval
    let freedayArray = carrierPickupTimeSkippedDates.replaceAll(' ', '').split(',');

    // Parse the pickup time once
    var timeArray = carrierPickupTime.split(':');
    var targetHour = timeArray.length === 3 ? parseInt(timeArray[0], 10) : 16;
    var targetMinute = timeArray.length === 3 ? parseInt(timeArray[1], 10) : 0;
    var targetSecond = timeArray.length === 3 ? parseInt(timeArray[2], 10) : 0;

    // Cache DOM elements
    var daysElement = document.getElementById('next-shipping-time-days');
    var hoursElement = document.getElementById('next-shipping-time-hours');
    var minutesElement = document.getElementById('next-shipping-time-minutes');

    // Track previous values to avoid unnecessary DOM updates
    var prevDaysText = '';
    var prevHoursText = '';
    var prevMinutesText = '';

    function formatDateForComparison(date) {
      return date.getDate().toString().padStart(2, '0') + '/' + (date.getMonth()+1).toString().padStart(2, '0') + '/' + date.getFullYear();
    }

    function isSkippedDate(date) {
      let dateString = formatDateForComparison(date);

      if(freedayArray.indexOf(dateString) !== -1){
        return true;
      } else {
        return false;
      }
    }

    function getNextValidShippingDate() {
      var now = new Date();
      var targetDate = new Date(now);
      // Set target time
      targetDate.setHours(targetHour, targetMinute, targetSecond, 0);

      // If target time has already passed today, move to next day
      if (targetDate.getTime() <= now.getTime()) {
        targetDate.setDate(targetDate.getDate() + 1);
      }

      // Skip weekends
      if (targetDate.getDay() === 0) { // Sunday
        targetDate.setDate(targetDate.getDate() + 1);
      }
      if (targetDate.getDay() === 6) { // Saturday
        targetDate.setDate(targetDate.getDate() + 2);
      }

      // Skip holidays
      while (isSkippedDate(targetDate)) {
        targetDate.setDate(targetDate.getDate() + 1);

        // Check for weekends again after moving the date
        if (targetDate.getDay() === 0) { // Sunday
          targetDate.setDate(targetDate.getDate() + 1);
        }
        if (targetDate.getDay() === 6) { // Saturday
          targetDate.setDate(targetDate.getDate() + 2);
        }
      }


      return targetDate;
    }

    function formatTimeDifference(diff) {
      // Calculate days, hours, minutes
      var days = Math.floor(diff / 86400);
      var hours = Math.floor((diff % 86400) / 3600);
      var minutes = Math.floor((diff % 3600) / 60);

      // Format text with proper pluralization
      var daysText = '';
      var hoursText = '';
      var minutesText = '';

      if (days > 0) {
        daysText = days + ' ' + (days === 1 ? 'Dag' : 'Dagen') + ' ';
        if (hours === 0 && minutes > 0) {
          daysText += 'en ';
        }
      }

      if (hours > 0) {
        hoursText = hours + ' ' + (hours === 1 ? 'uur' : 'uren') + ' ';
        if (minutes > 0) {
          hoursText += 'en ';
        }
      }

      if (minutes > 0) {
        minutesText = minutes + ' ' + (minutes === 1 ? 'minuut' : 'minuten') + ' ';
      }

      return {
        daysText: daysText,
        hoursText: hoursText,
        minutesText: minutesText
      };
    }

    function setTimeUntilShipping() {
      var now = new Date();
      var targetDate = getNextValidShippingDate();
      // Calculate time difference in seconds
      var diff = Math.max(0, Math.floor((targetDate.getTime() - now.getTime()) / 1000));
      var formattedTime = formatTimeDifference(diff);

      var daysText = formattedTime.daysText;
      var hoursText = formattedTime.hoursText;
      var minutesText = formattedTime.minutesText;

      // Update DOM only if values changed (reduces reflows)
      if (daysText !== prevDaysText) {
        daysElement.textContent = daysText;
        prevDaysText = daysText;
      }

      if (hoursText !== prevHoursText) {
        hoursElement.textContent = hoursText;
        prevHoursText = hoursText;
      }

      if (minutesText !== prevMinutesText) {
        minutesElement.textContent = minutesText;
        prevMinutesText = minutesText;
      }
    }

    // Initial call
    setTimeUntilShipping();

    // Update every minute
    setInterval(setTimeUntilShipping, 60 * 1000);
  </script>

{/block}


