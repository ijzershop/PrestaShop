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

  {block name='cart_voucher'}
    <div class="block-promo mb-2 pt-2 border-top" style="border-top-style:dashed!important;">
    <div class="cart-voucher">
    {if $cart.vouchers.added}
          {block name='cart_voucher_list'}
            <ul class="promo-name card-block list-unstyled">
              {foreach from=$cart.vouchers.added item=voucher}
                <li class="cart-summary-line" data-toggle="tooltip" data-placement="top" title="Deze korting geeft u een reductie van {str_replace('-','', $voucher.reduction_formatted)} incl. btw">
                  <table class="w-100 text-muted">
                    <tr>
                      <td>{$voucher.name}</td>
                      {if Context::getContext()->belongs_to_voucher_group}
                      <td class="text-right"><a href="{$voucher.delete_url}" data-link-action="remove-voucher"><i class="fasl fa-trash text-danger"></i></a></td>
                      {/if}
                    </tr>
                  </table>
                </li>
              {/foreach}
            </ul>
          {/block}
        {/if}
  {/block}
