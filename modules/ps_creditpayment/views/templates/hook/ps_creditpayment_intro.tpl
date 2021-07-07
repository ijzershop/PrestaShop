{**
 * 2007-2020 PrestaShop and Contributors
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
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}




<section>
  <p>
    {if count($customers) > 1}
      Selecteer de gewenste klant om de bestelling aan de lopende rekening toe te voegen.
    {/if}
    <div class="input-group mb-3">
    <select type="text" class="form-control " name="on_credit_customer_select" id="on_credit_customer_select" placeholder="Klant" aria-label="Klant" aria-describedby="customer-selection">
      <option readonly="true">Selecteer een klant</option>
      {foreach from=$customers item=customer key=index}
        <option value="{$customer.id_customer}" {if $index == 0}selected{/if}>{if !empty($customer.company)}{$customer.company} - {/if} {$customer.firstname} {$customer.lastname} - {$customer.email}</option>
      {/foreach}
    </select>
    <div class="input-group-append">
      <span class="input-group-text" id="customer-selection"><i class="fas fa-user"></i></span>
    </div>
  </div>
  </p>
  <p>
    {if $bankcreditCustomText }
        <a data-toggle="modal" data-target="#bankcredit-modal">{l s='More information' d='Modules.Creditpayment.Shop'}</a>
    {/if}
  </p>

  <div class="modal fade" id="bankcredit-modal" tabindex="-1" role="dialog" aria-labelledby="Bankcredit information" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h2>{l s='Bankcredit' d='Modules.Creditpayment.Shop'}</h2>
        </div>
        <div class="modal-body">
          <p>{l s='Payment is made by transfer of the invoice amount to the following account:' d='Modules.Creditpayment.Shop'}</p>
          {include file='module:ps_creditpayment/views/templates/hook/_partials/payment_infos.tpl'}
          {$bankcreditCustomText nofilter}
        </div>
      </div>
    </div>
  </div>
</section>
