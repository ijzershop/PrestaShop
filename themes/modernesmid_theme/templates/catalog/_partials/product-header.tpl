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
<style>
  .block-category-inner{
    height: 70px;
    opacity: 0.4;
    overflow: hidden;
    -webkit-transition: all .3s linear;
    -moz-transition: all .3s linear;
    -o-transition: all .3s linear;
    transition: all .3s linear;
  }

  .block-category-inner.active{
    height: auto;
    opacity: 1;
    -webkit-transition: all .3s linear;
    -moz-transition: all .3s linear;
    -o-transition: all .3s linear;
    transition: all .3s linear;
  }
  #toggle-cat-description span{
    min-width: 50%;
    display: inline-block;
  }

  #toggle-cat-description:hover{
    background-color: rgba(59, 86, 173, 1);
    color: #ffffff;
  }
  #toggle-cat-description{
    color: rgba(59, 86, 173, 0.5);
    padding: 5px 0px;
  }
</style>

<div id="js-product-list-header" class="col-12 pr-3 pl-3  pr-lg-0 pl-lg-0 ">
    {if $listing.pagination.items_shown_from == 1}
      <h2 class="h2 mb-0 text-center">{if !empty($category.second_name)}{$category.second_name}{else}{$category.name}{/if}</h2>
        {if !empty($listing.products)}
            <div id="block-category-inner" class="block-category-inner row">
                <div class="col-12 col-sm-8">
                    {if $category.top_description}
                        <div id="category-description" class="text-muted">{html_entity_decode($category.top_description) nofilter}</div>
                    {/if}
                </div>
                <div class="d-none d-sm-flex col-sm-4 pl-0">
                    {if $category.image.large.url}
                        <div class="category-cover text-center mx-auto">
                            <img style="max-width: 225px;max-height: auto;"  class="mx-auto" src="{$link->getCatImageLink($category.link_rewrite, $category.id, 'category_default')}" alt="{if !empty($category.image.legend)}{$category.image.legend}{else}{$category.name}{/if}">
                        </div>
                    {/if}
                </div>
            </div>
          <div class="row text-center"><a href="#" class="w-100 display-4 text-decoration-none" id="toggle-cat-description" data-shown="0" onclick="toggleCategoryDescr(this)"> <i class="fasl fa-chevron-down"></i>  <span>Toon meer informatie</span>  <i class="fasl fa-chevron-down"></i> </a></div>
        {/if}
    {/if}
</div>
<script type="text/javascript">


  function toggleCategoryDescr(e){
    if(document.getElementById('block-category-inner').classList.contains('active')){
        document.getElementById('block-category-inner').classList.remove('active');
        document.getElementById('toggle-cat-description').innerHTML = '<i class="fasl fa-chevron-down"></i>  <span>Toon meer informatie</span> <i class="fasl fa-chevron-down"></i>';
    } else {
      document.getElementById('block-category-inner').classList.add('active');
      document.getElementById('toggle-cat-description').innerHTML = '<i class="fasl fa-chevron-up"></i> <span>Verberg Informatie</span> <i class="fasl fa-chevron-up"></i> ';
        }


  }


</script>
