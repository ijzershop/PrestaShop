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
* @author PrestaShop SA <contact@prestashop.com>
  * @copyright 2007-2019 PrestaShop SA and Contributors
  * @license https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
  * International Registered Trademark & Property of PrestaShop SA
  *}
  {if $product.show_price}
  <div class="product-prices text-center text-md-right  mt-1 mt-sm-0">
    {block name='product_price'}
      <div style="line-height: .7;" class="product-price {if $product.has_discount}has-discount{/if}">
        {if Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($product)}
          <div class="current-price">
            {assign var="productPrices" value=Module::getInstanceByName('modernesmiddynamicproduct')->fetchDefaultDynamicProductPrice($product, $product.id_attribute)}
            {hook h='displayProductPriceBlock' product=$product type="old_price"}
            {hook h='displayProductPriceBlock' product=$product type="before_price"}
            <span class="inclusive-price text-center text-md-right"
                  data-product-id="{$product.id_product}">{if Context::getContext()->cookie->price_vat_settings_incl === "true"}{{Context::getContext()->currentLocale->formatPrice((float)$productPrices.final_prices.price_ttc ,'EUR')}}{else}{{Context::getContext()->currentLocale->formatPrice((float)$productPrices.final_prices.price_ht ,'EUR')}}{/if}  </span>
            <br>
          </div>
        {else}
        <div class="current-price">
          <span class="inclusive-price text-center text-md-right"
                data-product-id="{$product.id_product}">{if Context::getContext()->cookie->price_vat_settings_incl === "true"}{Context::getContext()->currentLocale->formatPrice((float)$product.price_after_cartrule_reduction_with_tax, 'EUR')}{else}{Context::getContext()->currentLocale->formatPrice((float)$product.price_after_cartrule_reduction_without_tax, 'EUR')}{/if}  </span>
          <br>
        </div>
        {/if}
    </div>
    {/block}
  </div>
  {/if}
