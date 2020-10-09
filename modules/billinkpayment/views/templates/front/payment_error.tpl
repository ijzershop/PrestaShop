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

<h2>{l s='We kunnen deze bestelling niet accepteren' mod='billinkpayment'}</h2>


    <p class="error alert alert-danger">{$params.err}</p>

		</div>
	</section>
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