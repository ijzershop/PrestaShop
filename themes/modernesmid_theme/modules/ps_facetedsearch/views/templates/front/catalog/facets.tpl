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
* @author PrestaShop SA <contact@prestashop.com>
  * @copyright 2007-2019 PrestaShop SA
  * @license https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
  * International Registered Trademark & Property of PrestaShop SA
  *}
  <div class="w-100 bg-light" id="facets">
    <ul class="nav">
      {if $displayedFacets|count}
      <li>
        <a class="h6 nav-link p-1 mb-0 text-dark font-weight-bold">Filteren op:</a>
      </li>
      {foreach from=$displayedFacets item="facet"}
      {assign var=_expand_id value=10|mt_rand:100000}
      {assign var=_collapse value=true}
      {foreach from=$facet.filters item="filter"}
      {if $filter.active}{assign var=_collapse value=false}{/if}
      {/foreach}
      <li class="nav-item dropdown">
        <a class="nav-link p-1 mb-0 text-dark dropdown-toggle" href="#" id="{$_expand_id}" role="button" data-toggle="dropdown" aria-haspopup="true">
          {$facet.label}
        </a>
        <div class="dropdown-menu pb-0" aria-labelledby="{$_expand_id}" style="z-index:999;">
          {if in_array($facet.widgetType, ['radio', 'checkbox'])}
          {block name='facet_item_other'}
          <ul id="facet_{$_expand_id}" class="facet-list list-unstyled col-12" data-facet-type="{$facet.label}">
            {foreach from=$facet.filters key=filter_key item="filter"}
            {if !$filter.displayed}
            {continue}
            {/if}
            <li>
              <label class="facet-label{if $filter.active} active {/if}" for="facet_input_{$_expand_id}_{$filter_key}">
                {if $facet.multipleSelectionAllowed}
                <div class="custom-control custom-checkbox custom-control-inline mr-0">
                  <input type="checkbox" class="custom-control-input" id="facet_input_{$_expand_id}_{$filter_key}" data-search-url="{$filter.nextEncodedFacetsURL}" data-filter-type="{$filter.facetLabel}" data-filter-value="{$filter.label}" type="checkbox" {if $filter.active }checked{/if}>
                  <label class="custom-control-label" for="facet_input_{$_expand_id}_{$filter_key}">
                    {if isset($filter.properties.color)}
                    <span class="color" style="background-color:{$filter.properties.color}"></span>
                    {elseif isset($filter.properties.texture)}
                    <span class="color texture" style="background-image:url({$filter.properties.texture})"></span>
                    {else}
                    <span {if !$js_enabled} class="ps-shown-by-js" {/if}> </span> {/if} </label> </div> </span> {/if} <a class="_gray-darker search-link js-search-link" rel="nofollow">
                      {$filter.label}
                      {if $filter.magnitude and $show_quantities}
                      <span class="magnitude">({$filter.magnitude})</span>
                      {/if}
                      </a>
                  </label>
            </li>
            {/foreach}
            <li class="row">
              <button class="btn btn-sm btn-primary rounded-0 w-100 doFilter" data-filter-id="{$_expand_id}" data-filter-type="{$facet.label}">
                <i class=" fasr fa-check"></i> Filteren
              </button>
            </li>
          </ul>
          {/block}

          {/if}
        </div>
      </li>
      {/foreach}
      {if $activeFilters|count}
      <li class="nav-item float-right position-absolute" style="right:160px">
        <div id="_desktop_search_filters_clear_all" class="clear-all-wrapper">
          <a href="{$clear_all_link}" class="nav-link p-1 mb-0 text-decoration-none text-dark js-search-filters-clear-all">
            <i class="fasr fa-times"></i>
            {l s='Clear all filters' d='Shop.Theme.Actions'}
          </a>
        </div>
      </li>
      {/if}

      {/if}
    </ul>
  </div>

