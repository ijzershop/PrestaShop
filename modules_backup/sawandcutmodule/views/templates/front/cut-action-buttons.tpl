{if isset($product->id)}
	{assign var=id_product value=$product->id}
{else}
	{assign var=id_product value=$product['id_product']}
{/if}

	<button type="button" class="btn btn-default rounded-0 {if $singleCutEnabled}cut-button{else}extended-cut-button{/if}" data-toggle="modal" data-target="#cut-modal" data-min-cut-size="{$minCutSize}" {if $maxCuts >= 0}data-max-cuts="{$maxCuts}"{else}data-max-cuts="6"{/if}  data-cut-width="{$cutWidth}" data-cut-length="{$cutLength}" data-product-id="{$id_product}" data-default-cut-price="{$product->default_cut_price}" data-combi-prices="{$combiPrices}">
		<span class="fasl fa-cut"></span> <span class="info d-inline-block d-md-none d-sm-inline-block d-lg-none">Knip dit product</span>
	</button>

