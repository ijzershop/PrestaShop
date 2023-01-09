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
  <div class="col-12 col-md-6 col-xl-4">
    {foreach from=$steps item="step" key="index"}
      {if $step.identifier == 'checkout-personal-information-step'}
        <div class="card">
        <div class="card-body">
          {render identifier  =  'checkout-personal-information-step'
            position    =  0
            ui          =  $step.ui
          }
        </div>
        </div>

      {/if}
    {/foreach}
    {foreach from=$steps item="step" key="index"}
      {if $step.identifier == 'checkout-delivery-step'}
        <div class="card">
          <div class="card-body">
          {render identifier  =  'checkout-delivery-step'
                position    =  0
                ui          =  $step.ui
        }
      </div>
      </div>
      {/if}
    {/foreach}
  </div>
  <div class="col-12 col-md-6 col-xl-4">
    {foreach from=$steps item="step" key="index"}
      {if $step.identifier == 'checkout-addresses-step'}
        <div class="card">
          <div class="card-body">
            {render identifier  =  'checkout-addresses-step'
            position    =  0
            ui          =  $step.ui
            }
          </div>
        </div>
      {/if}
    {/foreach}
  </div>
  <div class="col-12 col-md-6 col-xl-4">
    {*    Summary Card *}
    <div class="card">
      <div class="card-body">
        {block name='cart_summary'}
          {include file='checkout/_partials/cart-summary.tpl' cart = $cart}
        {/block}
      </div>
    </div>
    {hook h='displayReassurance'}
    {foreach from=$steps item="step" key="index"}
      {if $step.identifier == 'checkout-payment-step'}
        <div class="card">
          <div class="card-body">
            {render identifier  =  'checkout-payment-step'
            position    =  0
            ui          =  $step.ui
            }
          </div>
        </div>
      {/if}
    {/foreach}
  </div>




