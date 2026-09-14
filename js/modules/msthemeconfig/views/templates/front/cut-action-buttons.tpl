{if isset($product->id)}
	{assign var=id_product value=$product->id}
{else}
	{assign var=id_product value=$product['id_product']}
{/if}

{if !empty($plasmaEnabled)}
  <button type="button" class="btn btn-default btn-outline-secondary rounded-0 js-plasma-open" data-product-id="{$id_product|intval}" data-product-attribute-id="{$plasmaProductAttributeId|default:0|intval}" aria-haspopup="dialog" aria-controls="plasma-modal" aria-label="{l s='Plasma cut this product' mod='msthemeconfig'}" title="{l s='Plasma cut this product' mod='msthemeconfig'}">
    <span class="fasl fa-knife-kitchen" aria-hidden="true"></span> <span class="info d-inline-block d-md-none">{l s='Plasma' mod='msthemeconfig'}</span>
  </button>
{else}
	<button type="button" class="btn btn-default rounded-0 {if $singleCutEnabled}cut-button{else}extended-cut-button{/if}" data-toggle="modal" data-target="#cut-modal" data-min-cut-size="{$minCutSize}" {if $maxCuts >= 0}data-max-cuts="{$maxCuts}"{else}data-max-cuts="6"{/if}  data-cut-width="{$cutWidth}" data-cut-length="{$cutLength}" data-product-id="{$id_product}" data-default-cut-price="{$product->default_cut_price}" data-combi-prices="{$combiPrices}">
		<span class="fasl fa-cut"></span> <span class="info d-inline-block d-md-none d-sm-inline-block d-lg-none">Knip dit product</span>
	</button>
{/if}

