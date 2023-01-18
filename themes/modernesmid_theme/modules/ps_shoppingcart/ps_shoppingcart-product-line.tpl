<div class="row pl-1 cart_product_item_row">
  {if (isset(Context::getContext()->link->getImageLink($product.link_rewrite, $product.id_image, 'cart_default')) && Context::getContext()->link->getImageLink($product.link_rewrite, $product.id_image, 'cart_default')) || isset($urls.no_picture_image)}
  <picture class="p-0 col-3 cart-product-thumbnail text-center">
    {if isset($stwebp) && isset($stwebp.small_default) && $stwebp.small_default && isset(Context::getContext()->link->getImageLink($product.link_rewrite, $product.id_image, 'cart_default')) && Context::getContext()->link->getImageLink($product.link_rewrite, $product.id_image, 'cart_default')}
    <!--[if IE 9]><video style="display: none;"><![endif]-->
    <source srcset="{Context::getContext()->link->getImageLink($product.link_rewrite, $product.id_image, 'cart_default')|regex_replace:'/\.jpg$/':'.webp'}" title="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}" type="image/webp">
    <!--[if IE 9]></video><![endif]-->
    {/if}<img class="small_cart_product_image mx-auto" src="{if isset(Context::getContext()->link->getImageLink($product.link_rewrite, $product.id_image, 'cart_default')) && Context::getContext()->link->getImageLink($product.link_rewrite, $product.id_image, 'cart_default')}{Context::getContext()->link->getImageLink($product.link_rewrite, $product.id_image, 'cart_default')}{elseif isset($urls.no_picture_image)}{$urls.no_picture_image.bySize.small_default.url}{/if}" alt="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}" title="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}" itemprop="image">
  </picture>{/if}
  <div class="col-9 pl-1">
    <div class="row">
      <div class="col-8 cart_product_item_text_row">
        <span class="product-quantity">{$product.quantity}x</span>
        <a title="{$product.name}" class="product-name text-decoration-none text-dark" style="word-break:break-all;">{$product.name}</a>
      </div>
      <div class="price col-2 cart_product_item_text_row" style="padding-right:0px;text-align:right;">{if isset($product.is_gift) && $product.is_gift}{l s='Gift' d='Shop.Theme.Checkout'}
        {else}
        <span class="price float-right">{Context::getContext()->currentLocale->formatPrice(floatval($product.price_with_reduction_without_tax*$product.quantity),'EUR')}</span><br />
        {if $product.price_without_reduction_without_tax != $product.price_with_reduction_without_tax}
        <span class="regular-price float-right">{Context::getContext()->currentLocale->formatPrice(floatval(($product.price_without_reduction_without_tax)*$product.quantity),'EUR')}</span>
        {/if}
        {/if}
      </div>
      {if !isset($product.is_gift) || !$product.is_gift}
      <div class="col-2">
        <div class="dropdown" style="height:25px;margin-bottom:5px;">
          <button type="button" id="cart-product-row-toggle-{$product.id_product}" title="Bekijk, wijzig of verwijder product" class="d-block dropdown-toggle show shoppingcart-ellipsis text-dark" data-toggle="dropdown" aria-expanded="false"><i class="text-right align-top fa-2x fa-sharp fa-ellipsis-v float-right"></i></button>
          <div class="dropdown-menu shoppingcart-dropdown-menu" aria-labelledby="cart-product-row-toggle-{$product.id_product}">
            <a href="{Context::getContext()->link->getProductLink($product)}" rel="noopener" target="_blank" class="dropdown-item"><i class="fa-sharp fa-question-circle"></i> Bekijk product</a>
            <a href="#" class="dropdown-item changeCartProductQty"><i class="fa-sharp fa-edit"></i> Wijzig aantal: {$product.quantity}</a>
            <a href="#" class="ajax_remove_button dropdown-item" rel="nofollow" data-href="{Context::getContext()->link->getRemoveFromCartURL($product.id_product, $product.id_product_attribute, $product.id_customization)}" data-link-action="remove-from-cart" title="{l s=" Remove" d="Shop.Theme.Actions" }"><i class="fa-sharp fa-trash"></i>
              Verwijder
            </a>
          </div>
        </div>
      </div>
      {/if}
      <div class="col-12">
        {if !isset($product.is_gift) || !$product.is_gift}
        <div class="customized_wrap width-100" style="display:block;">
          {if isset($product.attributes) && is_array($product.attributes) && count($product.attributes)}
          {foreach from=$product.attributes item="property_value" key="property"}
          {if !in_array($property, AttributeGroup::getSawCutModuleAttributeGroupNames(Context::getContext()->cookie->id_lang))}
          <div class="small_cart_attr_attr">
            <span class="small_cart_attr_k">{$property}:</span><span>{$property_value}</span>
          </div>
          {/if}
          {/foreach}
          {/if}
          <div class="customizations">
            <ul class="list-unstyled base_list_line">
              {foreach from=Context::getContext()->cart->getProductCustomization($product.id_product) item="customization"}
              {if $product.id_customization == $customization.id_customization}
              <li class="line_item">
                {if Customization::getLabel($customization.index, Context::getContext()->cookie->id_lang) === 'zaaginstructies' || Customization::getLabel($customization.index, Context::getContext()->cookie->id_lang) === 'instructies' || Customization::getLabel($customization.index, Context::getContext()->cookie->id_lang) === 'knipinstructies'}
                <div class="input-group input-group-sm">
                  <input style="font-size:12px;border:1px solid rgba(0,0,0,.15);" type="text" class="form-control" value="{$customization.value nofilter}" title="{$customization.value nofilter}" readonly>
                  <div class="input-group-append">
                    <div class="input-group-text pl-1 pr-1 pt-0 pb-0">mm</div>
                  </div>
                </div>
                {else}
                <span class="mar_r6 font-weight-bold">{Customization::getLabel($customization.index, Context::getContext()->cookie->id_lang)}</span>
                  {if $customization.type == 1 && array_key_exists('text',  $customization)}
                  <span>{$customization.text nofilter}</span>
                  {elseif $customization.type == 0}
                  <img src="{$customization.image.small.url}" alt="{Customization::getLabel($customization.index, Context::getContext()->cookie->id_lang)}" />
                  {/if}
                {/if}
                {if Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($product)}
                  {hook h="displayCustomization" customization=$customization}
                {/if}
              </li>
              {/if}
              {/foreach}
            </ul>
          </div>
        </div>
        <div class="qty_wrap width-100" style="display:none;">
          <div class="input-group input-group-sm">
            <input onclick="this.select()" class="form-control cart_quantity cart_quantity_{$product.id_product}" type="number" min="1" width="auto" value="{$product.quantity}" name="cart_quantity" data-update-url="{Context::getContext()->link->getPageLink('cart')}?token={Tools::getToken(false)}" data-product-id="{$product.id_product}" data-minimal-quantity="{$product.minimal_quantity}" {if Configuration::get('PS_STOCK_MANAGEMENT')}data-stock_quantity="{$product.stock_quantity}"{/if} data-id-product-attribute="{$product.id_product_attribute}" data-id-customization="{$product.id_customization}" data-allow-oosp="{if isset($product.add_to_cart_url) && $product.allow_oosp}1{else}0{/if}" data-allow-oosp="1" />
            <div class="input-group-append">
              <a class="btn btn-success updateCartBurron" href="#" data-update-url="{Context::getContext()->link->getPageLink('cart')}?token={Tools::getToken(false)}" data-current-value="{$product.quantity}" data-product-id="{$product.id_product}" data-id-product-attribute="{$product.id_product_attribute}" data-id-customization="{$product.id_customization}">
                <i class="fa-sharp fa-check"></i>
              </a>
            </div>
          </div>
            {assign var="has_remaining_stock" value=json_decode(Product::hasMaxProductsRemainingStock($product.id_product, 50))}
            {if $has_remaining_stock->is_orderable}
                {$has_remaining_stock->remaining_qty_msg nofilter}
            {/if}
        </div>
      </div>
      {* <div class="price col-2" style="padding-right:0px;text-align:right;">
        {if $product.price_without_reduction_without_tax != $product.price_with_reduction_without_tax}
        <span class="regular-price float-right">{Context::getContext()->currentLocale->formatPrice(floatval(($product.price_without_reduction_without_tax)*$product.quantity),'EUR')}</span>
        {/if}
      </div> *}
      <div class="col-2"></div>
      {/if}
    </div>
  </div>
