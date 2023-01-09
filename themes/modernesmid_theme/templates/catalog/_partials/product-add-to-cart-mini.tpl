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
            data-product-id="{$product.id_product}"
            type="number"
            name="qty"
            id="quantity_wanted_{$product.id_product}"
            value="1"
            class="form-control input-group {if !$product.available_for_order}disabled{/if}"
            min="{$product.minimal_quantity}"
            {if  $product.available_for_order && $product.low_stock_threshold <= $product.quantity}max="{$product.quantity}"{/if}
            aria-label="{l s='Quantity' d='Shop.Theme.Actions'}"
            style="{if !$product.add_to_cart_url}pointer-events:none;{elseif Configuration::get('PS_STOCK_MANAGEMENT') &&  (int)$product.quantity <= 0 && (int)$product.out_of_stock == 0}pointer-events:none;{elseif Configuration::get('PS_STOCK_MANAGEMENT') && (int)$product.quantity != 0 && (int)$product.quantity < 100 && (int)$product.quantity < 0 && (int)$product.out_of_stock == 0}pointer-events:none;{/if}"
          >
        </div>

        <div class="add" >
          <a alt="Voeg {$product.name|truncate:30:'...'} toe aan winkelwagen" href="{$link->getPageLink('cart')}?token={$static_token}"
            data-product-id="{$product.id_product}"
            data-product-customization="{json_encode($product.id_customization)}"
            class="btn btn-success add-to-cart w-100 text-nowrap mt-2 {if !$product.add_to_cart_url}disabled{elseif !$product.available_for_order}disabled{/if}"
            data-button-action="add-to-cart"
          ><i data-product-id="{$product.id_product}" class="fa-sharp fa-shopping-cart shopping-cart"></i></a>
        </div>
        {hook h='displayProductActions' product=$product}
      </div>
    {/block}
  {/if}
</div>
