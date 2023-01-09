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
{extends file='page.tpl'}

    {block name='page_content_container'}
      <section id="content" class="page-home">
        {block name='page_content_top'}{/block}

        {block name='page_content'}
          {block name='hook_home'}


            <div class="row">
              {assign var="selectedCategories" value=explode(',',Configuration::get('MSTHEMECONFIG_HOMEPAGE_SELECTED_CATEGORIES'))}
             {if is_array($selectedCategories) && count($selectedCategories) >= 1 && $selectedCategories[0] != ''}
              {assign var="categoriesInfo" value=Category::getCategoryInformation($selectedCategories)}
              {foreach from=$selectedCategories item=category key=key}
               {if strtolower($categoriesInfo[$category].name) != 'home'}
               <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                <div class="row text-center category-list-item mb-1">
                 <div class="category-list-item-img mx-auto overflow-hidden">
                   <a class="text-decoration-none text-dark mx-auto" href="{$link->getCategoryLink($categoriesInfo[$category].id_category, $categoriesInfo[$category].link_rewrite)}">
                  <img src="{$link->getCatImageLink($categoriesInfo[$category].link_rewrite, $categoriesInfo[$category].id_category, 'category_default')}" class="img-responsive"  width="140px" height="105px" alt="{$categoriesInfo[$category].name}" title="{$categoriesInfo[$category].name}">
                </a>
              </div>
                <a class="text-decoration-none text-dark w-100" href="{$link->getCategoryLink($categoriesInfo[$category].id_category, $categoriesInfo[$category].link_rewrite)}">
                    <span class="category-list-item-title mb-2 text-wordbreak d-block">{$categoriesInfo[$category].name}</span>
                    </a>
                </div>
              </div>
              {/if}
              {/foreach}
              {/if}
            </div>
            {if strlen(Configuration::get('MSTHEMECONFIG_HOMEPAGE_TEXT')) > 3}
            <div class="row mt-3" style="background-color:{Configuration::get('MSTHEMECONFIG_HOMEPAGE_BACKGROUND_COLOR', null, null,  null, '#efefef')};">
              <div class="col-12 p-4">
                {Configuration::get('MSTHEMECONFIG_HOMEPAGE_TEXT') nofilter}
              </div>
            </div>
            {/if}



            {$HOOK_HOME nofilter}
          {/block}
        {/block}

      {include file="schema_org/organisation.tpl"}
      {include file="schema_org/brand.tpl"}
      {include file="schema_org/website.tpl"}
      </section>
    {/block}
