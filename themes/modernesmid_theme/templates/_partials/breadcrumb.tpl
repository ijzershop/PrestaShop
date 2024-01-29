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
{if $breadcrumb.count > 1}
<nav data-depth="{$breadcrumb.count-1}" class="container breadcrumb hidden-sm-down rounded-0 mt-1 mb-1">
  <ol class="breadcrumb mb-0 pl-2" itemscope itemtype="https://schema.org/BreadcrumbList">
    {block name='breadcrumb'}
        {foreach from=$breadcrumb.links item=path name=breadcrumb}
          {if $path.title != 'Home'}
          {block name='breadcrumb_item'}
            <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
              <a itemtype="https://schema.org/Thing" itemprop="item"  class="text-decoration-none text-dark" href="{$path.url}">
                <meta itemprop="item" content="{$path.url}">
                <meta itemprop="url" content="{$path.url}">
                <meta itemprop="position" content="{$smarty.foreach.breadcrumb.iteration-1}">
                <span itemprop="name">{$path.title}</span>
              </a>
            </li>
          {/block}
          {/if}
        {/foreach}
    {/block}
  </ol>
</nav>
{/if}
