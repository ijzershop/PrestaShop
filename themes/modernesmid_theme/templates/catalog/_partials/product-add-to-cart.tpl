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
            name="qty"
            id="quantity_wanted_{$product.id_product}"
            data-product-id="{$product.id_product}"
            data-product-customization="{$product.id_customization}"
            value="{$product.quantity_wanted}"
            class="form-control {if !$product.available_for_order}disabled{/if}"
            min="{$product.minimal_quantity}"
            {if  $product.available_for_order && $product.low_stock_threshold >= $product.quantity}max="{$product.quantity}"{/if}
            aria-label="{l s='Quantity' d='Shop.Theme.Actions'}"
            style="{if !$product.add_to_cart_url}pointer-events:none;{elseif Configuration::get('PS_STOCK_MANAGEMENT') &&  (int)$product.quantity <= 0 && (int)$product.out_of_stock == 0}pointer-events:none;{elseif Configuration::get('PS_STOCK_MANAGEMENT') && (int)$product.quantity != 0 && (int)$product.quantity < 100 && (int)$product.quantity < 0 && (int)$product.out_of_stock == 0}pointer-events:none;{/if}"
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
