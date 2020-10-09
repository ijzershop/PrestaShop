{*
*  @author JK Webdesign Alkmaar <info@jk.nl>
*  @copyright 2007-2018 JK Webdesign Alkmaar
*  @url https://www.jk.nl
*}

<!doctype html>
<html lang="{$language.iso_code}">

<head>
  {block name='head'}
    {include file='_partials/head.tpl'}
  {/block}
</head>

<body id="{$page.page_name}" class="{$page.body_classes|classnames}">

  {hook h='displayAfterBodyOpeningTag'}

  <main>

    <header id="header">
      {block name='header'}
        {include file='_partials/header.tpl'}
      {/block}
    </header>

      <section id="wrapper">
          <div class="container page_container">

{capture name=path}{l s='Koop nu en betaal later' mod='billinkpayment'}{/capture}

<h2>{l s='Samenvatting van uw bestelling' mod='billinkpayment'}</h2>

{assign var='current_step' value='payment'}

{if $nbProducts <= 0}
    <p class="warning">{l s='Uw winkelwagen is leeg.' mod='billinkpayment'}</p>
{else}
    <form action="{$action}?scbk={$smarty.get.scbk}&gb={$smarty.get.dag}-{$smarty.get.maand}-{$smarty.get.jaar}&tn={$smarty.get.tn}" method="post">
    {*<form action="{$action}?scbk={$params.scbk}&gb={$params.gb}&tn={$params.telefoon}" method="post">*}

        <h3>{l s='Koop nu en betaal later' mod='billinkpayment'}</h3>

        <p>
            {l s='U heeft ervoor gekozen om uw bestelling achteraf te betalen (op factuur).' mod='billinkpayment'}
        </p>

        <p>
            {l s='Hier ziet u een kort overzicht van uw order:' mod='billinkpayment'}
        </p>

        <p>
            {if $billink_costs}
                {*- {l s='Voor deze betaalmethode wordt'} <span id="amount" class="price">&euro;{displayPrice price=$billink_costs}</span> {l s='administratiekosten in rekening gebracht.'}<br/>*}
                - {l s='Voor deze betaalmethode wordt'} <span id="amount" class="price">&euro;{$billink_costs}</span> {l s='administratiekosten in rekening gebracht.'}<br/>
            {/if}
            - {l s='Het totaalbedrag van uw order'} <span id="amount" class="price">&euro;{$total}</span>
            {if $use_taxes == 1}
                {* {l s='(tax incl.)' mod='bankwire'} *}
				(Incl. BTW)
            {/if}<br/>
        </p>

        <p>
            <br/>
            <b>{l s='Klik op "Ik bevestig mijn order" om uw order te bevestigen.' mod='billinkpayment'}</b>
        </p>

        <p class="cart_navigation">
            <button type="submit" name="submit" class="btn btn-primary  exclusive_large hideOnSubmit">{l s='Ik bevestig mijn order' mod='billinkpayment'}</button>
        </p>


    </form>

    </div>
    </section>


{/if}

      <footer id="footer">
          {block name="footer"}
              {include file="_partials/footer.tpl"}
          {/block}
      </footer>

  </main>

  {hook h='displayBeforeBodyClosingTag'}

  {block name='javascript_bottom'}
      {include file="_partials/javascript.tpl" javascript=$javascript.bottom}
  {/block}

</body>

</html>