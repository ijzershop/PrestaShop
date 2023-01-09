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
{extends file='customer/page.tpl'}

{block name='page_title'}
  {l s='Order history' d='Shop.Theme.Customeraccount'}
{/block}

{block name='page_content'}
  <h6>{l s='Here are the orders you\'ve placed since your account was created.' d='Shop.Theme.Customeraccount'}</h6>
  {if $orders}
  <div class="table-responsive">
    <table class="table table-striped table-bordered table-labeled d-sm-none d-none d-md-block d-lg-block">
      <thead class="thead-default">
        <tr>
          <th>{l s='Order reference' d='Shop.Theme.Checkout'}</th>
          <th style="min-width:90px;">{l s='Date' d='Shop.Theme.Checkout'}</th>
          <th>{l s='Total price' d='Shop.Theme.Checkout'}</th>
          <th class="d-sm-none d-none">{l s='Payment' d='Shop.Theme.Checkout'}</th>
          <th>{l s='Status' d='Shop.Theme.Checkout'}</th>
          <th class="d-sm-none d-none">{l s='Invoice' d='Shop.Theme.Checkout'}</th>
          <th style="min-width:130px;">&nbsp;</th>
{*           <th>{l s='Tracking' d='Shop.Theme.Checkout'}</th> *}
        </tr>
      </thead>
      <tbody>
        {foreach from=$orders item=order}
          <tr>
            <th scope="row">{$order.details.reference}</th>
            <td>{$order.details.order_date}</td>
            <td class="text-xs-right">{$order.totals.total.value}</td>
            <td class="d-sm-none d-none">{$order.details.payment}</td>
            <td>
              <span
                class="label label-pill {$order.history.current.contrast}"
                {* style="background-color:{$order.history.current.color}" *}
              >
                {$order.history.current.ostate_name}
              </span>
            </td>
            <td class="text-sm-center d-sm-none d-none">
              {if $order.details.invoice_url}
                <a href="{$order.details.invoice_url}"><i class="fa-2x fa-sharp fa-file-pdf"></i></a>
              {else}
                -
              {/if}
            </td>
            <td class="text-sm-center order-actions">

              {if $order.details.invoice_url}
              {if Context::getContext()->customer->isLogged() && Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE') == Context::getContext()->customer->id}
                <a target="_blank" href="/index.php?controller=pdf-physical-on-credit-order-slip&id_order={$order.details.id}" id="printShoppingCartOnCreditByEmployeeAfterCheckout" data-order="{$order.details.id}"  class="btn btn-link text-dark float-right" alt="Winkelwagen als pdf opslaan">Credit Bon</a><br/>
                <a target="_blank" hp?controller=pdf-physical-order-slip&id_order={$order.details.id}" id="printShoppingCartByEmployeeAfterCheckout" data-order="{$order.details.id}"  class="btn btn-link text-dark float-right" alt="Winkelwagen als pdf opslaan">Balie Bon</a><br/>
              {/if}
                <a target="_blank" href="{$order.details.invoice_url}">{l s='Factuur downloaden' d='Shop.Theme.Actions'}</a>
                <br>
              {/if}

              <a href="{$order.details.details_url}" data-link-action="view-order-details">
                {l s='Details' d='Shop.Theme.Customeraccount'}
              </a>
              {if $order.details.reorder_url}
                <br>
                <a href="{$order.details.reorder_url}">{l s='Opnieuw bestellen' d='Shop.Theme.Actions'}</a>
              {/if}
            </td>
{*             <td class="text-center">
              <button data-history="{json_encode($order.history)}" data-order-reference="{$order.details.reference}" data-toggle="modal" data-target="#trackingModal" class="btn-link btn text-dark showOrderTracking"><i class="fa-sharp fa-truck fa-2x"></i></a>
            </td> *}
          </tr>
        {/foreach}
      </tbody>
    </table>
  </div>
    <div class="orders d-block d-sm-block d-md-none d-lg-none">
      {foreach from=$orders item=order}
        <div class="order border-bottom pb-2 pt-2">
          <div class="w-100">
            <div class="table-responsive">
            <table class="table table-sm table-borderless">
              <tr>
                <td colspan="3"><a class="text-decoration-none" href="{$order.details.details_url}"><h3>{$order.details.reference}</h3></a></td>
              </tr>
              <tr>
                <th>Besteld op</th>
                <td>{$order.details.order_date}</td>
                <td rowspan="3">
                  <div class="text-center w-100 pb-1">
                    <a href="{$order.details.details_url}" data-link-action="view-order-details" title="{l s='Details' d='Shop.Theme.Customeraccount'}">
                      <i class="fa-2x fa-sharp fa-file-pdf"></i>
                    </a>
                  </div>
                  {if $order.details.reorder_url}
                  <div class="text-center w-100 pt-2">
                    <a href="{$order.details.reorder_url}" title="{l s='Opnieuw bestellen' d='Shop.Theme.Actions'}">
                      <i class="fa-2x fa-sharp fa-sync"></i>
                    </a>
                  </div>
                  {/if}
                </td>
              </tr>
              <tr>
                <th>Totaal</th>
                <td>{$order.totals.total.value}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{$order.history.current.ostate_name}</td>
              </tr>
            </table>
            </div>
          </div>
        </div>
      {/foreach}
    </div>

  {/if}



<div class="modal fade" id="trackingModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="trackingModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="trackingModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body pl-5 pr-5">
            <div class="w-100">
              <div class="table-responsive">
                <table class="table-sm table-hover">
                  <tr id="trackingModalEstimateDelivery">
                    <th class="text-nowrap">Geschat levermoment</th><td id="trackingModalDeliveryTimeEstimate"></td>
                  </tr>
                  <tr id="trackingModalDelivered" style="display:none;">
                    <th class="text-nowrap">Geleverd op</th><td id="trackingModalDeliveredOn"></td>
                  </tr>
                  <tr>
                    <th class="text-nowrap">Barcode</th><td id="trackingModalBarcode"></td>
                  </tr>
                  <tr>
                    <th class="text-nowrap">Gewicht</th><td id="trackingModalWeight"></td>
                  </tr>
                  <tr>
                    <th class="text-nowrap">Formaat</th><td id="trackingModalPackageSize"></td>
                  </tr>
                  <tr class="text-center" style="display:none;" id="trackingModalSignatureBox">
                    <th>Ontvanger</th><td id="trackingModalSignature"></td>
                  </tr>
                </table>
              </div>
            </div>

            {* {foreach from=$order.history item=historyState}
                <li>{$historyState.history_date} {$historyState.ostate_name}</li>
            {/foreach} *}
              <div class="vprogress w-100">
                <div class="col-12 vprogress-row">
                  <div class="circle" id="trackingModalOrderReceived">
                    <span class="label" title="Bestelling ontvangen" data-toggle="popover" data-content="Uw bestelling is ontvangen"><i class="fa-sharp fa-shopping-basket"></i></span>
                  </div>
                    <span class="title">Bestelling ontvangen</span>
                </div>
                <div class="col-12 vprogress-row">
                  <div class="circle failed"  id="trackingModalPaymentReceived">
                    <span class="label" title="Betaling ontvangen" data-toggle="popover" data-content="De betaling voor de bestelling is geverifieerd"><i class="fa-sharp fa-money-bill-alt"></i></span>
                  </div>
                    <span class="title">Betaling ontvangen</span>
                </div>
                <div class="col-12 vprogress-row">
                  <div class="circle" id="trackingModalOrderPicked">
                    <span class="label" title="Bestelling word voorbereid" data-toggle="popover" data-content="Uw bestelling word momenteel voorbereid"><i class="fa-sharp fa-dolly"></i></span>
                  </div>
                    <span class="title">Bestelling word voorbereid</span>
                </div>
                <div class="col-12 vprogress-row">
                  <div class="circle" id="trackingModalOrderReadyForShipping">
                    <span class="label" title="Bestelling klaar voor verzending" data-toggle="popover" data-content="Uw bestelling is ingepakt en staat klaar voor verzending"><i class="fa-sharp fa-boxes"></i></span>
                  </div>
                    <span class="title">Bestelling klaar voor verzending</span>
                </div>
                <div class="col-12 vprogress-row">
                  <div class="circle" id="trackingModalOrderTransferredToTransmission">
                    <span class="label" title="Overgedragen aan transmission" data-toggle="popover" data-content="We hebben uw pakket overgedragen aan transmission"><i class="fa-sharp fa-pallet"></i></span>
                  </div>
                    <span class="title">Overgedragen aan transmission</span>
                </div>
                <div class="col-12 vprogress-row">
                  <div class="circle" id="trackingModalOrderArivedTransmissionDepot">
                    <span class="label" title="Aangekomen op transmission depot" data-toggle="popover" data-content="Uw pakket is aangekomen op het depot van Transmission"><i class="fa-sharp fa-warehouse"></i></span>
                  </div>
                    <span class="title">Aangekomen op transmission depot</span>
                </div>
                <div class="col-12 vprogress-row">
                  <div class="circle" id="trackingModalOrderDeliveryOnRoute">
                    <span class="label" title="Bezorger onderweg" data-toggle="popover" data-content="De bezorgen van transmission is momenteel onderweg om u het pakket te bezorgen"><i class="fa-sharp fa-truck"></i></span>
                  </div>
                    <span class="title">Bezorger onderweg</span>
                </div>
                <div class="col-12 vprogress-row">
                  <div class="circle" id="trackingModalOrderDeliverd">
                    <span class="label" title="Afgeleverd" data-toggle="popover" data-content="Het pakket is afgeleverd"><i class="fa-sharp fa-check"></i></span>
                  </div>
                    <span class="title">Afgeleverd</span>
                </div>
              </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Sluiten</button>
      </div>
    </div>
  </div>
</div>
{/block}

