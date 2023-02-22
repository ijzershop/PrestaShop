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
<div id="order-items" class="col-12">
  <div class="row p-2">

  <div class="order-confirmation-table col-12 table-responsive">

<table style="min-width:500px;" class="table table-hover table-condensed">
  <thead>
    <tr>
    {block name='order_items_table_head'}
      <th class="card-title text-left" colspan="2">{l s='Order items' d='Shop.Theme.Checkout'}</th>
      <th class="card-title text-center _desktop-title">{l s='Unit price' d='Shop.Theme.Checkout'}</th>
      <th class="card-title text-center _desktop-title">{l s='Quantity' d='Shop.Theme.Checkout'}</th>
      <th class="card-title text-center _desktop-title">{l s='Total products' d='Shop.Theme.Checkout'}</th>
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
          <td class="align-middle">
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
          <td class="qty align-middle text-sm-center text-left">{Context::getContext()->currentLocale->formatPrice($product.product_price, 'EUR')}</td>
          <td class="qty align-middle text-sm-center">{$product.quantity}</td>
          <td class="qty align-middle text-sm-center text-xs-right bold">{Context::getContext()->currentLocale->formatPrice($product.total_price_tax_excl, 'EUR')}</td>
        </div>
                                        </td>
                </tr>
      {/foreach}
                </tbody>
              </table>

      <hr>
      <table class="tabl col-12 col-md-4 float-right">
            <tr>
              <td>Producten ({$total_products})</td>
              <td class="text-right">{Context::getContext()->currentLocale->formatPrice($subtotal_products_price,'EUR')}</td>
            </tr>

          {if (in_array((int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_VOUCHER_GROUP'), Customer::getGroupsStatic(Context::getContext()->cart->id_customer)) || (int)Context::getContext()->cart->id_customer == (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE')) && $total_discount > 0}
            <tr>
              <td>Korting</td>
              <td class="text-right">- {Context::getContext()->currentLocale->formatPrice($total_discount,'EUR')}</td>
            </tr>
          {/if}


        <tr>
              <td>Verzending</td>
              <td class="text-right">{if $subtotals.shipping.amount > 0}{Context::getContext()->currentLocale->formatPrice($subtotals.shipping.amount/1.21,'EUR')}{else}{Context::getContext()->currentLocale->formatPrice(0,'EUR')}{/if}</td>
            </tr>

        {if $subtotals.tax.label !== null}
          <tr class="sub taxes">
            <td><span class="label">{l s='%label%:' sprintf=['%label%' => Btw] d='Shop.Theme.Global'}</span></td><td class="text-right"><span class="value">{$subtotals.tax.value}</span></td>
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

          {if (int)Context::getContext()->cart->id_customer == (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE')}
            {if  $discount_check < 0}
              <tr class="total-value font-weight-bold">
                <td><span>Terugbetaling</span></td>
                <td class="text-right">{Context::getContext()->currentLocale->formatPrice($discount_check,  'EUR')}</td>
              </tr>
              {else}
              <tr class="total-value font-weight-bold">
                <td><span>{$totals.total.label}&nbsp;{if $configuration.taxes_enabled}{$labels.tax_short}{/if}</span></td>
                <td class="text-right">{Context::getContext()->currentLocale->formatPrice($totals.total.amount,  'EUR')}</td>
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
