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
  <section id="main">
    {include file='custom_blocks/notification.tpl'}
    {block name='product_list_header'}
    <div class="row">
      <h2 id="js-product-list-header" class="h2 mb-4 col-12">{if !empty($category.second_name)}{$category.second_name}{else}{$category.name}{/if}</h2>
       <div class="block-category-inner col-12">
                {if $category.top_description != ''}
                    <div class="row">
                      <div id="category-description" class="text-muted col-12 col-sm-8">{$category.top_description|unescape: "html" nofilter}</div>
                      {if $category.image.large.url}
                          <div class="category-cover float-right col-12 col-sm-4">
                              <img style="width:100%;max-height: 225px;" class="mx-auto" src="{$category.image.large.url}" alt="{if !empty($category.image.legend)}{$category.image.legend}{else}{$category.name}{/if}">
                          </div>
                      {/if}
                    </div>
                {/if}
            </div>
    {/block}
    <div class="col-12 pr-0">
      <div class="row">
      {assign var="subCategories" value=Category::getChildren($category.id, Context::getContext()->cookie->id_lang)}
      {foreach from=$subCategories item=subcat key=key}
        <div class="col-6 col-sm-4 col-md-3 col-lg-2">
            <div class="row text-center category-list-item mb-1">
             <div class="category-list-item-img mx-auto overflow-hidden">
               <a class="text-decoration-none text-dark mx-auto" href="{$link->getCategoryLink($subcat.id_category, $subcat.link_rewrite)}">
                <img src="{$link->getCatImageLink($subcat.link_rewrite, $subcat.id_category, 'category_default')}" class="img-responsive" alt="{$subcat.name}" title="{$subcat.name}" width="140px" height="105px">
              </a>
              </div>
               <a class="text-decoration-none text-dark w-100" href="{$link->getCategoryLink($subcat.id_category, $subcat.link_rewrite)}">
                  <span class="category-list-item-title mb-2 text-nowrap d-block">{$subcat.name}</span>
               </a>
             </div>
          </div>
          {/foreach}
        </div>
      </div>
    </div>
    {if !empty($category.description)}
      <div class="row bg-info mt-3">
        <div class="col-12 p-4">
          {$category.description nofilter}

          {include file='themes/modernesmid_theme/templates/custom_blocks/category_footer.tpl'}
        </div>
      </div>
    {/if}
  </section>
  <script type="application/ld+json">{$listing.result->jsonld_category_seo nofilter}</script>
{/block}
