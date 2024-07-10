{if isset($product->id)}
	{assign var=id_product value=$product->id}
{else}
	{assign var=id_product value=$product['id_product']}
{/if}


	<button type="button" class="btn saw-button text-center rounded-0" data-toggle="modal" data-target="#saw-modal" data-product-id="{$id_product}">
		<i class="fak fa-saw"></i> <span class="info d-inline-block d-md-none d-sm-inline-block d-lg-inline-block">Zaag in delen</span>
	</button>

