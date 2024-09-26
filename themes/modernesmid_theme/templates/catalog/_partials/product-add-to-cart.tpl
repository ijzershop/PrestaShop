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

<div class="product-add-to-cart">
  {if !$configuration.is_catalog}
    {block name='product_quantity'}
      <div class="product-quantity clearfix">
        <div class="qty">
          <input
            type="number"
            name="qty_{$product.id_product}"
            id="quantity_wanted_{$product.id_product}"
            data-product-id="{$product.id_product}"
            data-product-customization="{$product.id_customization}"
            value="{if $product.quantity_wanted > 0}{$product.quantity_wanted}{else}{$product.minimal_quantity}{/if}"
            class="form-control {Product::isAvailableForOrderCustom((int)$product.id_product, $product.id_product_attribute, 'class')}"
            min="{$product.minimal_quantity}"
            max="{Product::isAvailableForOrderCustom((int)$product.id_product, $product.id_product_attribute, 'max')}"
            aria-label="{l s='Quantity' d='Shop.Theme.Actions'}"
            style="{Product::isAvailableForOrderCustom((int)$product.id_product, $product.id_product_attribute, 'style')}"
            {Product::isAvailableForOrderCustom((int)$product.id_product, $product.id_product_attribute, 'attr')}
          >
        </div>

        {hook h='displayProductActions' product=$product}
      </div>
    {/block}

    {block name='product_minimal_quantity'}
      <p class="product-minimal-quantity">
        {if $product.minimal_quantity > 1}
          {l
          s='The minimum purchase order quantity for the product is %quantity%.'
          d='Shop.Theme.Checkout'
          sprintf=['%quantity%' => $product.minimal_quantity]
          }
        {/if}
      </p>
    {/block}
  {/if}
</div>
