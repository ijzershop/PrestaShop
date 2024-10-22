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

    {assign var=withTax value=Context::getContext()->cookie->price_vat_settings_incl === "true"}
{if $cart.vouchers.added}
{block name='cart_voucher_list'}
  <div class="col-12"><h6>Toegepaste korting</h6></div>
{foreach from=$cart.vouchers.added item=voucher}
<div class="product-line-grid col-12">
  <div class="row">
    <!--  product left content: image-->
    <div class="product-line-grid-left col-12 col-sm-2 col-md-2 col-lg-2">
      <span class="product-image media-middle row mx-auto"></span>
    </div>
    <!--  product left body: description -->
    <div class="product-line-grid-body col-12 col-sm-10 col-md-10 col-lg-10 pl-lg-0 pr-0 text-center text-sm-left">
      <div class="row">
        <div class="product-line-info col-12 col-sm-6 col-md-6 col-lg-6 pl-3 pr-3 pl-sm-0 pr-sm-0 pt-2">
          <a class="label text-decoration-none text-dark" data-toggle="tooltip" data-placement="top" title="Deze korting geeft u een reductie van {str_replace('-','', $voucher.reduction_formatted)} incl. btw">{$voucher.name}</a></div>

        <!--  product left body: description -->
        <div class="product-line-grid-right product-line-actions col-12 col-sm-6 col-md-6 col-lg-6">
          <div class="row">
            <div class="col-md-10 col-sm-10 col-12 pl-3 pl-sm-2 pr-3 pr-sm-2">
              <div class="row">
                <div class="col-12 col-sm-6 qty">
                  <div class="row">
                    <div class="col-2 p-0 pt-2">
                      {if Context::getContext()->belongs_to_voucher_group}
                        <a href="{$voucher.delete_url}" data-link-action="remove-voucher" class="text-dark"><i class="fasl fa-trash fa-2x"></i></a>
                      {/if}
                    </div>
                    <div class="col-10">

                    </div>
                  </div>

                </div>
                <div class="col-12 col-sm-6 price pl-0 mt-2 mt-sm-0">
            <span class="product-price" style="line-height: .7rem;">
              <strong>
                    <span class="inclusive-price">
                      {if $withTax}
                        {if $voucher.reduction_percentage > 0}
                          {$voucher.reduction_value}
                        {else}
                          {$voucher.reduction_amount_full}
                        {/if}
                      {else}
                        {if $voucher.reduction_percentage > 0}
                          {$voucher.reduction_value_tax_excl}
                        {else}
                          {$voucher.reduction_amount_full_tax_exc}
                        {/if}
                      {/if}
                    </span>
              </strong>
            </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <hr class="text-dark" style="opacity: 0.8">
  </div>
</div>
    {/foreach}
    {/block}
    {/if}
  {/block}
