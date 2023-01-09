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
<div id="js-product-list-header" class="col-12 pr-0 pl-0">
    {if $listing.pagination.items_shown_from == 1}
      <h2 class="h2 mb-0">{if !empty($category.second_name)}{$category.second_name}{else}{$category.name}{/if}</h2>
        {if !empty($listing.products)}
            <div class="block-category-inner row">
                <div class="col-12 col-sm-8">
                    {if $category.top_description}
                        <div id="category-description" class="text-muted">{html_entity_decode($category.top_description) nofilter}</div>
                    {/if}
                </div>
                <div class="d-none d-sm-flex col-sm-4 pl-0">
                    {if $category.image.large.url}
                        <div class="category-cover text-center w-100 mx-auto">
                            <img style="max-width: 225px;max-height: 225px;"  class="mx-auto" src="{$link->getCatImageLink($category.link_rewrite, $category.id)}" alt="{if !empty($category.image.legend)}{$category.image.legend}{else}{$category.name}{/if}">
                        </div>
                    {/if}
                </div>
            </div>
            {/if}
    {/if}
</div>
