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
{block name='order_products_table'}
  <div class="box row pt-2">
  <div class="table-responsive w-100">
    <table id="order-products" class="table table-striped">
      <thead class="thead-default">
        <tr>
          <th>{l s='Product' d='Shop.Theme.Catalog'}</th>
          <th class="text-center">{l s='Quantity' d='Shop.Theme.Catalog'}</th>
          <th class="text-center">{l s='Unit price' d='Shop.Theme.Catalog'}</th>
          <th class="text-right">{l s='Total price' d='Shop.Theme.Catalog'}</th>
        </tr>
      </thead>
         {assign var='totalReductionValue' value=0}
         {assign var='totalForAllProducts' value=0}
      {foreach from=$order.products item=product}
        {assign var='productReduction' value=(($product.total_price_tax_excl) - $product.reduction_amount)}
        {assign var='totalReductionValue' value=$totalReductionValue +  $productReduction}
        {assign var='totalForAllProducts' value=$totalForAllProducts + $product.total_price_tax_excl}
        <tr>
          <td>
            <strong>
              <a {if isset($product.download_link)}href="{$product.download_link}"{/if}>
                {AttributeGroup::stripSawCutModuleAttributeGroupName($product.name, Context::getContext()->cookie->id_lang)}
              </a>
            </strong>
            <br/>
            {if $product.customizations}
            <table class="w-100 table mb-0">
                {foreach from=$product.customizations item="customization"}
                        <tr class="bg-transparent">
                            <td class="border-0 p-0">
                                {foreach from=$customization.fields item="field"}
                                    <div class="w-100">
                                        {if $field.label === 'zaaginstructies' || $field.label === 'instructies' || $field.label === 'knipinstructies'}
                                            <div class="input-group input-group-sm">
                                                <input style="font-size:12px;border:1px solid rgba(0,0,0,.15);" type="text" class="form-control" value="{$field.text nofilter}" title="{$field.text nofilter}" readonly>
                                                <div class="input-group-append">
                                                    <div class="input-group-text pl-1 pr-1 pt-0 pb-0">mm</div>
                                                </div>
                                            </div>
                                        {else}
                                            <span class="mar_r6 font-weight-bold">{$field.label}</span>
                                            {if $field.type == 'text'}
                                                <span>{$field.text nofilter}</span>
                                            {elseif $field.type == 'image'}
                                                <img src="{$field.image.small.url}" alt="{$field.label}" />
                                            {/if}
                                        {/if}
                                    </div>
                                {/foreach}
                            </td>
                        </tr>
                    {/foreach}
                </table>
            {/if}
          </td>
          <td class="text-center">
            {if $product.customizations}
              {foreach $product.customizations as $customization}
                {$customization.quantity}
              {/foreach}
            {else}
              {$product.quantity}
            {/if}
          </td>
          <td class="text-center">
              {if $product.original_product_price > $product.product_price}
                <div class="price">{Context::getContext()->currentLocale->formatPrice($product.product_price, 'EUR')}</div>
                <div class="regular-price">{Context::getContext()->currentLocale->formatPrice($product.original_product_price, 'EUR')}</div>
              {else}
                {Context::getContext()->currentLocale->formatPrice($product.product_price, 'EUR')}
              {/if}
          </td>
          <td class="text-right">{Context::getContext()->currentLocale->formatPrice($product.total_price_tax_excl, 'EUR')}</td>
        </tr>
      {/foreach}
      <tfoot>
        <tr class="text-xs-right">
              <td class="border-0"></td>
              <td colspan="2" >{if (int)$order.products_count > 1}Producten{else}Product{/if} ({$order.products_count})</td>
                  <td class="text-right">{Context::getContext()->currentLocale->formatPrice(floatval($totalForAllProducts), 'EUR')}</span>
              </td>
            </tr>
            <tr>
              <td class="border-0"></td>
              <td colspan="2" class="border-0">Verzending</td>
              <td class="border-0 text-right">{if $order.subtotals.shipping.amount > 0}{Context::getContext()->currentLocale->formatPrice($order.subtotals.shipping.amount/1.21, 'EUR')}{else}{Context::getContext()->currentLocale->formatPrice(0.00, 'EUR')}{/if}</td>
            </tr>
            {if $orderObject->total_discounts_tax_excl > 0}
                <tr>
                  <td class="border-0"></td>
                  <td colspan="2" class="border-0">Korting</td>
                  <td class="border-0 text-right">{Context::getContext()->currentLocale->formatPrice(0-$orderObject->total_discounts_tax_excl, 'EUR')}</td>
                </tr>
            {/if}
            <tr>
              <td class="border-0"></td>
              <td colspan="2" class="border-0" style="padding:0.75rem 0.75rem 0rem 0.75rem;">Btw (21%)</td>
              <td class="border-0 text-right" style="border-bottom:1px solid #c0c0c0c0;padding:0.75rem 0.75rem 0rem 0.75rem;">
                  {if $orderObject->total_discounts_tax_excl > 0 && (int)Context::getContext()->cart->id_customer == (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}
                  {Context::getContext()->currentLocale->formatPrice(0-($orderObject->total_refunded_tax_incl-$orderObject->total_refunded_tax_excl), 'EUR')}
                {else}
                {$order.subtotals.tax.value}
                {/if}
              </td>

              </td>
            </tr>

            <tr class="text-xs-right line-{$order.totals.total.type}">
              <td class="border-0"></td>
              <td colspan="2" class="border-0">{$order.totals.total.label}</td>
                    <td class="text-right h4 text-dark">
                        {if $orderObject->total_discounts_tax_excl > 0 && (int)Context::getContext()->cart->id_customer == (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}
                            {Context::getContext()->currentLocale->formatPrice(0-$orderObject->total_refunded_tax_incl, 'EUR')}</td>
                            {else}
                            {Context::getContext()->currentLocale->formatPrice($order.totals.total.amount, 'EUR')}</td>
                        {/if}
            </tr>
      </tfoot>
    </table>
    </div>
  </div>
{/block}
