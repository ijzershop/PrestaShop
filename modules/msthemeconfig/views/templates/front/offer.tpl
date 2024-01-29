{extends file='page.tpl'}





{block name="page_content"}
<div class="card mt-3">
  <div class="card-header"><h1>{l s='Uw offerte'}</h1></div>
  <div class="card-body">
        {if {$date_exp_days} > 0}
          <h6>{l s='Uw persoonlijke offerte vindt u hieronder,'} {l s='en vervalt over'} <span class="badge rounded-pill bg-primary text-white"> <b>{$date_exp_days}</b> {if $date_exp_days == 1}{l s='dag op'}{else}{l s='dagen op'}{/if} <b>{date('d-m-Y', strtotime($date_exp))}</b></span>.<br/><br/> {l s='U kunt de gewenste producten en aantallen zelf in uw winkelwagen plaatsen.' mod='offerintegration'}</h6>
      {else}
          <h6>{l s='Uw persoonlijke offerte is helaas verlopen op '} <span class="badge rounded-pill bg-danger text-white"> <b>{date('d-m-Y', strtotime($date_exp))}</b></span>.<br/><br/> {l s='U kunt de producten niet meer bestellen, heeft u nog steeds interesse?'} <a href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" title="Offerte formulier" rel="nofollow">{l s='Vraag dan een nieuwe offerte aan' mod='offerintegration'}</a> {l s='of' mod='offerintegration'} <a href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_PAGE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}" title="Contactformulier" rel="nofollow">{l s='neem dan even contact met ons op.' mod='offerintegration'}</a></h6>
      {/if}
  </div>
  <div class="card-header bg-white border-bottom">
      {$offer.message nofilter}
  </div>
    {if isset($products) && $products}
  <ul class="list-group list-group-flush" {if isset($id) && $id} id="{$id}"{/if}>
      <!-- Products list -->
          {foreach from=$products item=product name=products}
            <!-- PRODUCT -->
            <li class="list-group-item pt-2" style="border-collapse: collapse;border-width:1px 0px 1px 0px;border-style:solid;border-color:#f2f2f2;{if !$product.active}display:none;{/if}">
              <div class="product-container ajax_block_product row" itemscope itemtype="http://schema.org/Product">
                <div class="col-sm-12 col-md-4 col-lg-4 pb-2">
                  <a href="/{Category::getLinkRewrite($product.id_category_default, $product.id_lang)}/{$product.id_product}-{$product.link_rewrite}.html" itemprop="name" class="text-decoration-none text-dark h4 product-title">
                      {$product.name|truncate:256:'...'|escape:'html':'UTF-8'}
                  </a>
                </div>
                <div class="prices col-sm-12 col-md-4 col-lg-4">
                  <!-- Price -->
                  <div class="price product-price incl w-100 text-left text-md-right">
                      {Context::getContext()->currentLocale->formatPrice($product.price_tax_inc, 'EUR')} incl. BTW
                  </div>
                  <div class="price product-price excl  w-100 text-left text-md-right" style="font-weight:100;">
                      {Context::getContext()->currentLocale->formatPrice($product.price_tax_exc, 'EUR')} excl. BTW
                  </div>
                </div>
                <div class="col-12 d-block d-md-none">
                  <p class="" itemprop="description">
                      {$product.description_short nofilter}
                  </p>
                </div>
                <div class="actions col-sm-12 col-md-4 col-lg-4">
                  <div class="row">
                    <div class="input-group col-sm-12">
                      <input
                        class="quantity form-control input-group {if !$product.available_for_order}disabled{/if}"
                        {if  $product.available_for_order && ($product.low_stock_threshold >= $product.quantity || $product.out_of_stock == 0)}max="{$product.quantity}"{/if}
                        id="quantity_wanted_{$product.id_product}"
                        type="number"
                        data-product-id="{$product.id_product|intval}"
                        value="1"
                        size="3"
                        min="{$product.minimal_quantity}"
                        name="qty"
                      />


                      <a

                        alt="Voeg {$product.name|truncate:30:'...'} toe aan winkelwagen" href="{$link->getPageLink('cart')}?token={$static_token}"
                        data-product-id="{$product.id_product}"
                        data-product-customization=""
                        class="btn btn-success add-to-cart w-100 text-nowrap mt-2 {if !$product.available_for_order || ($product.out_of_stock == 0 && $product.quantity <= 0)}disabled{/if}"
                        data-button-action="add-to-cart"
                      ><i data-product-id="{$product.id_product}" class="fasl fa-cart-shopping shopping-cart"></i> <span class="d-none d-sm-inline-block d-md-none d-lg-inline-block">Toevoegen aan winkelwagen</span></a>
                        {if $product.low_stock_threshold >= $product.quantity || ($product.out_of_stock == 0 && $product.quantity <= 0)}
                          <div class="col-12">
                            <span class="help-text text-warning">Dit product is momenteel niet op vooraad, <a href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_PAGE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}"vertical-align: top;width:20%;>neem contact met ons op</a> of <a href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}"vertical-align: top;width:20%;>vraag een offerte aan</a> voor een alternatief en/of de mogelijke levertijden</span>
                          </div>
                        {/if}
                    </div>
                  </div>
                </div>
                <div class="col-12 d-none d-md-block">
                  <p class="" itemprop="description">
                      {$product.description_short nofilter}
                  </p>
                </div>
              </div>
            </li>
          {/foreach}
  </ul>
</div>

<script>
    var min_item = '{l s='Please select at least one product'}';
    var max_item = '{l s='You cannot add more than %d product(s) to the product comparison'}';
    var comparator_max_item = '{if isset($comparator_max_item)}{$comparator_max_item}{else}0{/if}';
    var comparedProductsIds = '{if isset($comparator_max_item)}{$compared_products}{else}[]{/if}';
</script>











{/if}
{/block}
