{**
 * 2007-2020 PrestaShop SA and Contributors
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
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}

<div id="search_filters_brands">
  <section class="facet">
    {if $display_link_brand}
      <a href="{$page_link}" class="h6 text-uppercase facet-label" title="{l s='brands' d='shop.theme.catalog'}">
        {l s='brands' d='shop.theme.catalog'}
      </a>
    {else}
      <p class="h6 text-uppercase facet-label">
        {l s='brands' d='shop.theme.catalog'}
      </p>
    {/if}

    <div>
      {if $brands}
        {include file="module:ps_brandlist/views/templates/_partials/$brand_display_type.tpl" brands=$brands}
      {else}
        <p>{l s='No brand' d='Shop.Theme.Catalog'}</p>
      {/if}
    </div>
  </section>
</div>
