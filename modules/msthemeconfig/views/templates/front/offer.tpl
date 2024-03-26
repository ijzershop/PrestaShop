{extends file='layouts/layout-both-columns.tpl'}





{block name="content"}
  <script type="application/javascript">
    let offerCode = "{{$offer.access_code}}";
    let offerEmail = "{{$offer.email}}";
    let min_item = '{l s='Please select at least one product'}';
    let max_item = '{l s='You cannot add more than %d product(s) to the product comparison'}';
  </script>

<div class="card mt-3" id="offer_card_access">
  <div class="card-header"><h1>{l s='Uw offerte'}</h1></div>
  <div class="card-body">
    <p class="col-12 col-sm-8 mx-auto">Uw offerte staat klaar, vul uw gegevens in om de offerte te kunnen bekijken. Deze kunt u terugvinden in de offerte mail die u van ons heeft ontvangen.</p>
  <form class="mx-auto col-12 col-sm-8">
    <div class="form-group row">
      <label for="access_email" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="access_email" placeholder="Email" onselectstart="return false" onpaste="return false;" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off>
        <small id="access_email_help_text" class="form-text text-muted">
          Vul hier uw email adres in waarop u de offerte mail heeft ontvangen.
        </small>
      </div>
    </div>
    <div class="form-group row">
      <label for="access_code" class="col-sm-2 col-form-label">Code</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="access_code" placeholder="Code" onselectstart="return false" onpaste="return false;" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off>
        <small id="access_code_help_text" class="form-text text-muted">
          Vul hier de toegangscode in. Deze vind u in de offerte mail die van ons heeft ontvangen.
        </small>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm-12">
        <button type="button" class="btn btn-primary col-12 disabled" disabled id="show_offer_btn">Toon mijn offerte</button>
      </div>
    </div>
  </form>
  </div>
</div>



  <div class="card mt-3 d-none" id="offer_card">
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
              <div class="product-container ajax_block_product row p-2" itemscope itemtype="http://schema.org/Product">
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

    {/if}
{/block}

  {block name="hook_before_body_closing_tag"}
<script type="text/javascript">
  // console.log([offerCode, offerEmail,  localStorage.getItem('offerAccessCode')]);


let comparator_max_item = '{if isset($comparator_max_item)}{$comparator_max_item}{else}0{/if}';
let comparedProductsIds = '{if isset($comparator_max_item)}{$compared_products}{else}[]{/if}';


if(offerCode === localStorage.getItem('offerAccessCode')){
  document.getElementById('offer_card').classList.toggle('d-none');
  document.getElementById('offer_card_access').classList.toggle('d-none');
} else {
  let accessElem = document.getElementById('access_code');
  let emailElem = document.getElementById('access_email');

  emailElem.addEventListener('keyup',function(e){
    return checkValidAccessData();
  });

  emailElem.addEventListener('paste',function(e){
    return checkValidAccessData();
  });

  accessElem.addEventListener('keyup',function(e){
    return checkValidAccessData();
  });

  accessElem.addEventListener('paste',function(e){
    return checkValidAccessData();
  });

  let checkValidAccessData  = function(e){
    if(emailElem.value === offerEmail){
      emailElem.classList.add('is-valid');
    } else {
      emailElem.classList.remove('is-valid');
    }

    if(accessElem.value === offerCode){
      accessElem.classList.add('is-valid');
    } else {
      accessElem.classList.remove('is-valid');
    }

    let subButton = document.getElementById('show_offer_btn');
    if(emailElem.value === offerEmail && accessElem.value === offerCode){
      subButton.classList.remove('disabled');
      subButton.disabled = false;
    } else {
      subButton.classList.add('disabled');
      subButton.disabled = true;
    }
  }
}
document.getElementById('show_offer_btn').addEventListener('click', function(e){
  localStorage.setItem('offerAccessCode', document.getElementById('access_code').value);
  document.getElementById('offer_card').classList.toggle('d-none');
  document.getElementById('offer_card_access').classList.toggle('d-none');
});
</script>
{/block}









