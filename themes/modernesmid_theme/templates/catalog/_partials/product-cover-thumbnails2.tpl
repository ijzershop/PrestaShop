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

<style type="text/css">
  .images-container.product-miniature{
    max-width: 100%;
  }

  #product-images-carousel .carousel-inner{
    max-width: 305px;
    margin:0 auto;
  }
  #product-images-carousel .carousel-control-prev{
    left:10px;
  }
  #product-images-carousel .carousel-control-next{
    right:10px;
  }


  .carousel-control-next, .carousel-control-prev{
    top:auto;
    bottom: 8px;
  }

  .carousel-indicators-thumbs li img{
    border: 1px solid #cccc;
    margin: 5px;
    cursor: pointer;
  }
  .carousel-indicators-thumbs li{
    opacity: .5;
    cursor: pointer;
  }

  .carousel-indicators-thumbs li.active{
    opacity: 1;
  }

  .carousel-indicators-thumbs{
    list-style: none;
    margin-top: 30px;
    position: relative;
    justify-content: center;
    left: 0;
    padding: 0;
    height: 105px;
    margin-left: auto;
    margin-right: auto;
    overflow-y: hidden;
    display: flex;
    -webkit-box-pack: center;
  }

  #product-images-carousel .carousel-indicators {
    position: absolute;
    right: 0;
    left: 0;
    z-index: 4;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding-left: 0;
    margin-right: 20%;
    margin-left: 20%;
    list-style: none;
    height: auto;
    bottom:95px;
  }
</style>


<div class="images-container product-miniature">
  {block name='product_images'}

      {assign var="control_check"  value=0}
<div id="product-images-carousel" class="carousel slide" data-ride="false" data-keyboard="true" data-touch="true" data-pause="hover">
  <div class="carousel-inner">
    {foreach from=$product.images item=image key=key}
    {if strpos($image.legend, 'techntabel') == false}
      <div class="carousel-item  {if $image.id_image == $product.cover.id_image}active{/if}">
        <img
              class="w-100 thumb js-thumb {if $image.id_image == $product.cover.id_image} selected {/if}"
              data-image-medium-src="{$image.bySize.medium_default.url}"
              data-image-large-src="{$image.bySize.large_default.url}"
              src="{$image.bySize.medium_default.url}"
              alt="{$image.legend}"
              title="{$image.legend}"
              width="100"
            >
      </div>
        {assign var="control_check"  value=(int)$key}
        {/if}
    {/foreach}
  </div>
    <ol class="carousel-indicators">
        {assign var="index_indicator" value=0}
        {assign var="index_thumbs" value=0}
        {foreach from=$product.images item=image key=key2}
          {if strpos($image.legend, 'techntabel') == false}
            <li data-target="#product-images-carousel" data-slide-to="{$index_indicator}" class=" {if $image.id_image == $product.cover.id_image}active{/if}">
            </li>
              {assign var="index_indicator" value=$index_indicator+1}
          {/if}
        {/foreach}
    </ol>
  <ol class="carousel-indicators-thumbs m-0">
          {foreach from=$product.images item=image key=key3}
              {if strpos($image.legend, 'techntabel') == false}
                <li data-slide-to="{$index_thumbs}" class=" {if $image.id_image == $product.cover.id_image}active{/if}">
                  <img height="70px" width="auto" src="{$image.bySize.small_default.url}" alt="{$image.legend}"/>
                </li>
                  {assign var="index_thumbs" value=$index_thumbs+1}
              {/if}
          {/foreach}
      </ol>
      {if $control_check > 0}
        <a class="carousel-control-prev" href="#product-images-carousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </a>
        <a class="carousel-control-next" href="#product-images-carousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </a>
      {/if}
</div>
  {/block}
</div>
{hook h='displayAfterProductThumbs'}
