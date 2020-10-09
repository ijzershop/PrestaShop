{*
*  @author JK Webdesign Alkmaar <info@jk.nl>
*  @copyright 2007-2018 JK Webdesign Alkmaar
*  @url https://www.jk.nl
*}

{capture name=path}{l s='Koop nu en betaal later' mod='billinkpayment'}{/capture}

<h2>{l s='Samenvatting van uw bestelling' mod='billinkpayment'}</h2>

{assign var='current_step' value='payment'}

{if $nbProducts <= 0}
	<p class="warning">{l s='Uw winkelwagen is leeg.' mod='billinkpayment'}</p>
{else}

<form action="{$this_path_ssl}validation.php?scbk={$smarty.get.scbk}&gb={$smarty.get.gb}&tn={$smarty.get.tn}" method="post">

	<h3>{l s='Koop nu en betaal later' mod='billinkpayment'}</h3>

	<p>
		{l s='U heeft ervoor gekozen om uw bestelling achteraf te betalen (op factuur).' mod='billinkpayment'}
	</p>

	<p>
		{l s='Hier ziet u een kort overzicht van uw order:' mod='billinkpayment'}
	</p>

	<p>
		{if $billink_costs}
			- {l s='Voor deze betaalmethode wordt'} <span id="amount" class="price">{displayPrice price=$billink_costs}</span> {l s='administratiekosten in rekening gebracht.'}<br/>
		{/if}
			- {l s='Het totaalbedrag van uw order'} <span id="amount" class="price">{displayPrice price=$total}</span>
		{if $use_taxes == 1}
			{l s='(tax incl.)' mod='bankwire'}
		{/if}<br/>
	</p>	
	
	<p>
		<br/>
		<b>{l s='Klik op "Ik bevestig mijn order" om uw order te bevestigen.' mod='billinkpayment'}</b>
	</p>
	
	<p class="cart_navigation">
		<input type="submit" name="submit" value="{l s='Ik bevestig mijn order' mod='billinkpayment'}" class="exclusive_large hideOnSubmit" />
	</p>
	
	
</form>

{/if}