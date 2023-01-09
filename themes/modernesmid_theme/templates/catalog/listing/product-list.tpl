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
{extends file=$layout}

{block name='content'}

  <section id="main" class="w-100">
    {include file='custom_blocks/notification.tpl'}
    {if $listing.products|count}
    {block name='product_list_header'}
      <h2 id="js-product-list-header" class="h2 mb-4 col-12 p-0">{if strtolower($listing.label) != 'zoekresultaten'}{$listing.label}{/if}</h2>
    {/block}
    {/if}
    <section id="products" class="col-12">

      {hook h="displayFilter"}

      {if $listing.products|count}
        {block name='product_list_active_filters'}
          <div id="" class="hidden-sm-down">
            {$listing.rendered_active_filters nofilter}
          </div>
        {/block}

          {block name='product_list'}
            {include file='catalog/_partials/products.tpl' listing=$listing}
          {/block}

          {block name='product_list_bottom'}
        <div id="js-product-list-bottom">
            {include file='catalog/_partials/products-bottom.tpl' listing=$listing}
        </div>
          {/block}
      {else}
        <div id="js-product-list-top"></div>

        <div id="js-product-list">
          {include file='errors/not-found.tpl'}
        </div>

        <div id="js-product-list-bottom"></div>
      {/if}
    </section>
  </section>

    {*  Product data JSON+ld  *}
  <script type="application/ld+json">{$listing.result->jsonld_category_seo nofilter}</script>
{/block}


