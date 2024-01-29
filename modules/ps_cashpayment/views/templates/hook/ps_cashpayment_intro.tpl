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
    {if $bankcashCustomText }
        <a data-toggle="modal" data-target="#bankcash-modal">{l s='More information' d='Modules.Cashpayment.Shop'}</a>
    {/if}
  </p>

  <div class="modal fade" id="bankcash-modal" tabindex="-1" role="dialog" aria-labelledby="Bankcash information" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h2>{l s='Bankcash' d='Modules.Cashpayment.Shop'}</h2>
        </div>
        <div class="modal-body">
          <p>{l s='Payment is made by transfer of the invoice amount to the following account:' d='Modules.Cashpayment.Shop'}</p>
          {include file='module:ps_cashpayment/views/templates/hook/_partials/payment_infos.tpl'}
          {$bankcashCustomText nofilter}
        </div>
      </div>
    </div>
  </div>
</section>
