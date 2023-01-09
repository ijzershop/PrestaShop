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
{assign var="products" value=$category->getProductsNoCurrent(Context::getContext()->language->id, 0, 11, $product.id_product)}
{if count($products) > 1}
<section class="featured-products clearfix mt-3 col-12">
  <span style="font-size:15px;font-weight:bold;color:#777777;font-family:Helvetica, Tahoma, sans-serif, Arial;">Producten uit dezelfde categorie</span>
              <div class="products col-12 p-0 mx-auto my-auto">
                  <div id="you-like-carousel" class="carousel slide w-100" data-ride="false">
                  <ol class="carousel-indicators">
                        {foreach from=array_chunk($products, 4) item="product" key="index"}
                          <li data-target="#you-like-carousel" data-slide-to="{$index}" class="rounded {if $index == 0}active{/if}"></li>
                        {/foreach}
                  </ol>
                  <div class="carousel-inner mx-auto">
                    {foreach from=array_chunk($products, 4) item="product" key="index2"}
                    	{if count($product) >= 2}
	                      <div class="carousel-item {if $index2 == 0}active{/if}">
	                        <div class="row">
	                        {foreach from=$product item=productItem key=productItemIndex}
							{assign var="imageId" value=explode('-',$productItem['id_image'])}
	                           <a href="{Context::getContext()->link->getProductLink($productItem['id_product'])}" class="text-decoration-none col-3 col-md-3">
	                          	<div class="w-100">
	                              <div class="card border-0 w-100 pl-2 pr-2">
	                                <div class="card-body w-100 p-0">
	                                  	<img class="img-fluid w-100 d-block mb-1" src="{$link->getImageLink($productItem['link_rewrite'][Context::getContext()->language->id], $imageId[1], 'medium_default')}" alt="{$productItem.name}"/>
	                                	<span class="product-title font-weight-bold text-dark">{$productItem.name}</span>
	                                	<span class="product-description">{$productItem.description_short nofilter}</span>
	                                	{if (Configuration::get('PS_CATALOG_MODE') && Configuration::get('PS_CATALOG_MODE_WITH_PRICES')) || !Configuration::get('PS_CATALOG_MODE')}
                                    <span class="product-price text-dark">
		                                	{block name='product_prices'}
						                      {include file='catalog/_partials/related-product-prices.tpl' product=$productItem}
						                    {/block}
	                                	</span>
                                    {/if}
	                                </div>
	                              </div>
	                             </div>
	                           </a>
	                        {/foreach}
	                        </div>
	                      </div>
	                     {/if}
                    {/foreach}
                  </div>
                  <a class="carousel-control-prev" href="#you-like-carousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  </a>
                  <a class="carousel-control-next" href="#you-like-carousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  </a>
                </div>

              </div>
</section>
{/if}
