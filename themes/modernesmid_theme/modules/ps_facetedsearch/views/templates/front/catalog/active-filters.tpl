{**
  * 2007-2019 PrestaShop.
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
  * needs please refer to http://www.prestashop.com for more information.
  *
  * @author    PrestaShop SA <contact@prestashop.com>
  * @copyright 2007-2019 PrestaShop SA
  * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
  * International Registered Trademark & Property of PrestaShop SA
  *}
<section id="js-active-search-filters" class="row bg-light {if $activeFilters|count}active_filters pb-2 mb-2{else}hide{/if}">
  {if $activeFilters|count}
{*   {block name='active_filters_title'}
    <p class="{if $activeFilters|count}active-filter-title{else}hidden-xs-up{/if}">{l s='Active filters' d='Shop.Theme.Global'}</p>
  {/block} *}

  {if $activeFilters|count}
    <ul class="list-unstyled list-group list-group-horizontal pl-2">
      {foreach from=$activeFilters item="filter"}
        {block name='active_filters_item'}
          <li class="filter-block list-group-item p-1 border-1">
            <a class="js-search-link text-dark text-decoration-none" href="{$filter.nextEncodedFacetsURL}">{l s='%1$s: ' d='Shop.Theme.Catalog' sprintf=[$filter.facetLabel]} {$filter.label} <i class="fasl fa-times close"></i></a>
          </li>
        {/block}
      {/foreach}
    </ul>
  {/if}
  {/if}
</section>
