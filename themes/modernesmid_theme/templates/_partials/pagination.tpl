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
<nav class="w-100 pt-3 pb-3">
  <div class="col-12 text-center">
    {block name='pagination_summary'}
      {l s='Showing %from%-%to% of %total% item(s)' d='Shop.Theme.Catalog' sprintf=['%from%' => $pagination.items_shown_from ,'%to%' => $pagination.items_shown_to, '%total%' => $pagination.total_items]}
    {/block}
  </div>
  {if $pagination.pages_count > 1}
  <div class="col-md-12 text-center">
    {block name='pagination_page_list'}
        <div class="page-list clearfix text-sm-center btn-toolbar" style="justify-content: center; display: flex;">
          <div class="btn-group">
            {foreach from=$pagination.pages item="page"}
              <div class="btn btn-secondary" {if array_key_exists('current', $page) && $page.current} class="current" {/if}>
                {if array_key_exists('type', $page) && $page.type === 'spacer'}
                  <span class="spacer">&hellip;</span>
                {else}
                  <a
                    rel="{if array_key_exists('type', $page) && $page.type === 'previous'}prev{elseif array_key_exists('type', $page) && $page.type === 'next'}next{else}nofollow{/if}"
                    href="{$page.url}"
                    class="text-decoration-none text-white {if array_key_exists('type', $page) && $page.type === 'previous'}previous {elseif array_key_exists('type', $page) && $page.type === 'next'}next {/if}{['disabled' => !$page.clickable, 'js-search-link' => true]|classnames}"
                  >
                    {if array_key_exists('type', $page) && $page.type === 'previous'}
                      <i class="fasr fa-chevron-left"></i> {l s='Previous' d='Shop.Theme.Actions'}
                    {elseif array_key_exists('type', $page) && $page.type === 'next'}
                      {l s='Next' d='Shop.Theme.Actions'} <i class="fasr fa-chevron-right"></i>
                    {else}
                      {$page.page}
                    {/if}
                  </a>
                {/if}
              </div>
            {/foreach}
          </div>
        </div>
    {/block}
  </div>
  {/if}

</nav>
