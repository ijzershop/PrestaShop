{**
* Mollie       https://www.mollie.nl
*
* @author      Mollie B.V. <info@mollie.nl>
* @copyright   Mollie B.V.
* @link        https://github.com/mollie/PrestaShop
* @license     https://github.com/mollie/PrestaShop/blob/master/LICENSE.md
*}
{extends "page.tpl"}
{block name="page_content"}

	<div class="alert alert-danger" role="alert">
	  <h4 class="alert-heading">Fout tijdens het betalen!</h4>
	  <p>Helaas ging er wat fout tijdens de betaling, probeer het nogmaal of neem contact op met onze administratie, we helpen u graag verder.</p>
	</div>
	<br>

    <a class="btn btn-primary button button-small"
       href="{$link->getPageLink('order.php', true, null, ['step' => 3])|escape:'htmlall':'UTF-8'}"
       title="{l s='Back to your shopping cart' mod='mollie'}">
        <span><i class="fasr fa-chevron-left"></i> {l s='Back to your shopping cart' mod='mollie'}</span>
    </a>
{/block}
