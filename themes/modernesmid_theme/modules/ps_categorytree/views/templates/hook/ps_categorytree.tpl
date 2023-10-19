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
{assign var="key" value=0}
{assign var="sub_id" value=0}
{assign var="loopindex" value=0}
{function name="categories" nodes=[] depth=0}
    {strip}
        {if $nodes|count}
          <ul class="category-sub-menu depth{$depth} p-0 collapse {if (int)$loopindex <= 1 && $depth <= 1 && $key === 0}show{/if}" id="submenu-item{$sub_id}">
              {foreach from=$nodes key=key item=node}
                  {assign var="key" value=$key}
                  {assign var="sub_id" value=$node.id}
                <li data-depth="{$depth}" data-sub="{$sub_id}" data-index="{$loopindex}"  data-key="{$key}" class="p-0 pb-1 pt-1 {if $depth >= 2}pl-{$depth*1}{/if}">
                    {if $depth === 0}
                      <a class="menu-category-header font-weight-bold" data-toggle="collapse"
                         data-target="#submenu-item{$node.id}" aria-expanded="false"
                         aria-controls="#submenu-item{$node.id}"
                         aria-label="open/sluit {$node.name} categorie">{if $depth == 0}{strtoupper($node.name)}
                          <span class="float-right submenu-chevron"> <i class="fasl {if (int)$loopindex <= 1 && $depth <= 1 && $key === 0}fa-chevron-up{else}fa-chevron-down{/if}"></i></span>
                          {else}{$node.name}{/if}</a>
                        {if $node.children}
                            {categories nodes=$node.children depth=$depth+1}
                        {/if}
                    {else}
                      <a class="category-sub-link" href="{$node.link}"><i
                          class="fasl fa-chevron-right"></i> {$node.name}</a>
                        {if $node.children}
                          <button type="button" class="text-dark btn btn-link arrows float-right" data-toggle="collapse"
                                  data-target="#submenu-item{$node.id}" aria-expanded="false"
                                  aria-controls="#submenu-item{$node.id}"
                                  aria-label="open/sluit {$node.name} categorie">
                            <i style="font-size:0.7em" class="fasl fa-plus"></i>
                          </button>
                            {categories nodes=$node.children depth=$depth+1}
                        {/if}
                    {/if}
                </li>
                  {assign var="loopindex" value=$loopindex++}
              {/foreach}
          </ul>
        {/if}
    {/strip}
{/function}

<div class="w-100 block-categories hidden-sm-down p-0">
  <ul class="category-top-menu p-0">
    <li>{categories nodes=$categories.children depth=0}</li>
  </ul>
</div>
