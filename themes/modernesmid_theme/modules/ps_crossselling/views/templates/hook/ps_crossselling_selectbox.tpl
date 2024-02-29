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
{assign var="products" value=$category->getProductsNoCurrent(Context::getContext()->language->id, 0, 11, $product.id_product)}
{if count($products) > 1}
  <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
  <fieldset>
    <label for="related_products_select" class="font-weight-bold mb-0">Andere Maat? Wissel snel!</label>
    <select class="form-control-select" name="related_products_select" id="related_products_select" width="100%">
        {foreach from=$products item=productItem key=productItemIndex}
            {assign var="imageId" value=explode('-',$productItem['id_image'])}
{*          {dd($productItem)}*}
            <option data-class="avatar"
                    data-style="background-image: url('{$link->getImageLink($productItem['link_rewrite'][Context::getContext()->language->id], $imageId[1], 'medium_default')}')"
                    data-url="{Context::getContext()->link->getProductLink($productItem['id_product'])}"
                    data-price="{if Context::getContext()->cookie->price_vat_settings_incl === "true"}{Context::getContext()->currentLocale->formatPrice($productItem['price'], 'EUR')}{else}{Context::getContext()->currentLocale->formatPrice($productItem['price_tax_exc'], 'EUR')}{/if}">
              <span class="product-title font-weight-bold text-dark">{$productItem.name}</span>
            </option>
        {/foreach}
    </select>
  </fieldset>
{/if}

<style type="text/css">
  /* select with CSS avatar icons */
  option.avatar {
    background-repeat: no-repeat !important;
    padding-left: 20px;
  }

  .avatar .ui-icon {
    background-position: center center;
  }

  span.ui-icon.avatar {
    width: 40px;
    height: 40px;
    display: inline-block;
    background-size: contain;
  }

#related_products_select-menu .ui-menu-item-wrapper .product-name, #related_products_select-menu .ui-menu-item-wrapper.ui-state-active .product-name{
  vertical-align: middle;
  display: table-cell;
  padding-left: 50px;
  width: 100%;
  font-size: 14px;
}
  #related_products_select-menu .ui-menu-item-wrapper .product-name .price{
    font-weight: bold;
    padding-right: 10px;
  }

#related_products_select-menu .ui-menu-item-wrapper{
  height: 40px;
  display: inline-table;
  width: 100%;
}
  .ui-menu .ui-menu-item {
    margin: 0;
    cursor: pointer;
    list-style-image: url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
    border: 1px solid #f9f9f9;
    border-collapse: collapse;
  }

  .ui-state-hover, .ui-widget-content .ui-state-hover, .ui-widget-header .ui-state-hover, .ui-state-focus, .ui-widget-content .ui-state-focus, .ui-widget-header .ui-state-focus, .ui-button:hover, .ui-button:focus {
    border: 1px solid #cccccc;
    background: #ffffff;
    font-weight: normal;
    color: #2b2b2b;
    height: 40px;
  }
  .ui-selectmenu-button.ui-button {
    text-align: left;
    white-space: nowrap;
    width: 100%;
    height: 40px;
    vertical-align: ;
    display: inline-table;
  }
  .ui-selectmenu-text{
    vertical-align: middle;
    display: table-cell;
  }

  .ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active, a.ui-button:active, .ui-button:active, .ui-button.ui-state-active:hover {
    border: 1px solid #003eff;
    background: #007fff;
    font-weight: normal;
    color: #ffffff;
    width: 100%;
  }
  .ui-selectmenu-icon.ui-icon {
    float: right;
    margin-top: 5px;
    right: 15px;
    position: absolute;
  }

  .ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default, .ui-button, html .ui-button.ui-state-disabled:hover, html .ui-button.ui-state-disabled:active {
    border: 1px solid #c5c5c5;
    background: #ffffff;
    font-weight: normal;
    color: #454545;
  }

  #related_products_select-menu{
    max-height: 250px;
  }
</style>

