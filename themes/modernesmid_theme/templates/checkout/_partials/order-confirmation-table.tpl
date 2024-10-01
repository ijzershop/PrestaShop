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
{assign var=withTax value=Context::getContext()->cookie->price_vat_settings_incl === "true"}
<div id="order-items" class="col-12">
  <div class="row p-2">

  <div class="order-confirmation-table col-12 table-responsive">

<table style="min-width:500px;" class="table table-condensed mb-0">
  <thead>
    <tr>
    {block name='order_items_table_head'}
      <th class="card-title text-left" colspan="3">{l s='Order items' d='Shop.Theme.Checkout'}</th>
      <th class="card-title text-center _desktop-title">{l s='Quantity' d='Shop.Theme.Checkout'}</th>
      <th class="card-title text-right _desktop-title">{l s='Total products' d='Shop.Theme.Checkout'}</th>
    {/block}
    </tr>
  </thead>
  <tbody>
    {block name='order_confirmation_table'}
    {assign var='total_products' value=0}
    {assign var='subtotal_products_price' value=0}

      {foreach from=$products item=product}
        {assign var='total_products' value=($total_products+$product.quantity)}
        {assign var='subtotal_products_price' value=($subtotal_products_price+$product.total_price_tax_excl)}

        <tr class="order-line">
          <td class="align-middle">
            <span class="image">
              {if isset($product.cover.small.url)}
              <img src="{$product.cover.small.url}"  alt="product image"/>
              {/if}
            </span>
          </td>
          <td class="align-middle" colspan="2">
            {if $add_product_link}<a href="{$product.url}" rel="noopener" target="_blank">{/if}
              <span>{AttributeGroup::stripSawCutModuleAttributeGroupName($product.name, Context::getContext()->cookie->id_lang)}</span>
            {if $add_product_link}</a>{/if}
            {if is_array($product.customizations) && $product.customizations|count}
              {foreach from=$product.customizations item="customization"}
                <div class="customizations">
                  <a href="#" data-toggle="modal" data-target="#product-customizations-modal-{$customization.id_customization}">{l s='Product customization' d='Shop.Theme.Catalog'}</a>
                </div>
                <div class="modal fade customization-modal" id="product-customizations-modal-{$customization.id_customization}" tabindex="-1" role="dialog" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title">{l s='Product customization' d='Shop.Theme.Catalog'}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        {foreach from=$customization.fields item="field"}
                          <div class="product-customization-line row">
                            <div class="col-sm-3 col-xs-4 label">
                              {$field.label}
                            </div>
                            <div class="col-sm-9 col-xs-8 value">
                              {if $field.type == 'text'}
                                {if (int)$field.id_module}
                                  {$field.text nofilter}
                                {else}
                                  {$field.text}
                                {/if}
                              {elseif $field.type == 'image'}
                                <img src="{$field.image.small.url}">
                              {/if}
                            </div>
                          </div>
                        {/foreach}
                      </div>
                    </div>
              {/foreach}
            {/if}
            {hook h='displayProductPriceBlock' product=$product type="unit_price"}
          </td>
          <td class="qty align-middle text-sm-center">{$product.quantity}</td>
          <td class="qty align-middle text-right bold">
            {if $withTax}
            {Context::getContext()->currentLocale->formatPrice((float)$product.total_price_tax_incl, 'EUR')}</td>
          {else}
             {Context::getContext()->currentLocale->formatPrice((float)$product.total_price_tax_excl, 'EUR')}</td>
            {/if}
  </div>
                                        </td>
                </tr>
      {/foreach}
    {if $cart_rules}
      <tr class="order-line">
        <td class="text-dark text-left disabled border-bottom-0" colspan="5">
          Toegepaste korting
        </td>
      </tr>
      {/if}

    {* Kortingen   *}
    {assign var='first_free_shipping' value=false}
    {foreach from=$cart_rules key='key' item='rule'}
      {assign var='border_top' value=''}
      {if $key === 0}
        {assign var='border_top' value='border-top-0'}
      {/if}
      <tr class="order-line">
        <td class="align-middle {$border_top}" colspan="3">
          <span> {$rule.name}</span>
        </td>
        {if $rule.reduction_percent > 0}
          <td class="qty align-middle text-sm-center {$border_top}">{$rule.reduction_percent}%</td>
          <td class="qty align-middle text-right bold {$border_top}">{Context::getContext()->currentLocale->formatPrice((float)$rule.value_tax_exc, 'EUR')}</td>
        {else}
          <td colspan="2" class="qty align-middle text-right bold {$border_top}">
            {if (int)Context::getContext()->cart->id_customer == (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}
              {if $withTax}
                {Context::getContext()->currentLocale->formatPrice(-(float)$rule.reduction_amount, 'EUR')}
              {else}
                {Context::getContext()->currentLocale->formatPrice(-(float)$rule.reduction_amount/1.21, 'EUR')}
              {/if}
            {else}

              {if $withTax}
                {Context::getContext()->currentLocale->formatPrice(-(float)$rule.value_real, 'EUR')}
              {else}
                {Context::getContext()->currentLocale->formatPrice(-(float)$rule.value_tax_exc, 'EUR')}
              {/if}
            {/if}
          </td>
        {/if}
      </tr>
    {if $rule.free_shipping && !$first_free_shipping}
      {assign var='first_free_shipping' value=true}

      <tr class="order-line">
        <td class="align-middle {$border_top}" colspan="3">
          <span> Korting verzending</span>
        </td>
          <td colspan="2" class="qty align-middle text-right bold {$border_top}">
              {if $withTax}
                {Context::getContext()->currentLocale->formatPrice(-(float)$subtotals.shipping.amount,'EUR')}
              {else}
                {Context::getContext()->currentLocale->formatPrice(-(float)$subtotals.shipping.amount/1.21,'EUR')}
              {/if}
          </td>
      </tr>
    {/if}
    {/foreach}
    </tbody>
    </table>


      <hr class="w-100 mt-0">
      <table class="table col-12 col-md-4 float-right">
            <tr>
              <td class="border-top-0">Producten ({$total_products})</td>
              <td class="text-right border-top-0">{Context::getContext()->currentLocale->formatPrice((float)$subtotal_products_price,'EUR')}</td>
            </tr>

        <tr>
          <td>Verzending</td>
          <td class="text-right">{if $subtotals.shipping.amount > 0}{Context::getContext()->currentLocale->formatPrice((float)$subtotals.shipping.amount/1.21,'EUR')}{else}{Context::getContext()->currentLocale->formatPrice((float)0,'EUR')}{/if}</td>
        </tr>
          {if ((int)Context::getContext()->cart->id_customer == (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)) && $total_discount_no_calc > 0}
            <tr>
              <td>Korting</td>
              <td class="text-right">{Context::getContext()->currentLocale->formatPrice((float)-$total_discount_no_calc_tax_exc,'EUR')}</td>
            </tr>
            {else}
            <tr>
              <td>Korting</td>
              <td class="text-right">{Context::getContext()->currentLocale->formatPrice((float)-$total_discount_tax_exc,'EUR')}</td>
            </tr>
          {/if}

        {if $subtotals.total_paid_tax_incl !== null}
          <tr class="sub taxes">
            <td><span class="label">{l s='%label%:' sprintf=['%label%' => Btw] d='Shop.Theme.Global'}</span></td>
            <td class="text-right"><span class="value">
                {if (int)Context::getContext()->cart->id_customer == (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id) && $total_remainder < 0}
                    {Context::getContext()->currentLocale->formatPrice((float)$total_remainder - $total_remainder_tax_exc,  'EUR')}
                  {else}
                    {Context::getContext()->currentLocale->formatPrice((float)$subtotals.total_paid_tax_incl-(float)$subtotals.total_paid_tax_excl,'EUR')}
                  {/if}

              </span></td>
          </tr>
        {/if}
        {if !$configuration.display_prices_tax_incl && $configuration.taxes_enabled}
          <tr>
            <td><span class="text-uppercase">{$totals.total.label}&nbsp;{$labels.tax_short}</span></td>
            <td class="text-right">{$totals.total.value}</td>
          </tr>
          <tr class="total-value font-weight-bold">
            <td><span>{$totals.total_including_tax.label}</span></td>
            <td class="text-right">{$totals.total_including_tax.value}</td>
          </tr>
        {else}
          {if (int)Context::getContext()->cart->id_customer == (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}
            {if  $total_remainder < 0}
              <tr class="total-value font-weight-bold">
                <td><span>Terugbetaling</span></td>
                <td class="text-right">{Context::getContext()->currentLocale->formatPrice((float)$total_remainder,  'EUR')}</td>
              </tr>
              {else}
              <tr class="total-value font-weight-bold">
                <td><span>{$totals.total.label}&nbsp;{if $configuration.taxes_enabled}{$labels.tax_short}{/if}</span></td>
                <td class="text-right">{Context::getContext()->currentLocale->formatPrice((float)$totals.total.amount,  'EUR')}</td>
              </tr>
              {/if}
          {else}
            <tr class="total-value font-weight-bold">
              <td><span>{$totals.total.label}&nbsp;{if $configuration.taxes_enabled}{$labels.tax_short}{/if}</span></td>
              <td class="text-right">{$totals.total.value}</td>
            </tr>
          {/if}
        {/if}

      </table>
    {/block}

  </div>
</div>
