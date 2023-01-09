{*
* 2007-2018 PrestaShop
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
* @author    PrestaShop SA <contact@prestashop.com>
* @copyright 2007-2018 PrestaShop SA
* @license   http://addons.prestashop.com/en/content/12-terms-and-conditions-of-use
* International Registered Trademark & Property of PrestaShop SA
*}
{extends file='customer/page.tpl'}

{block name='page_title'}
    {l s='Verzamelde persoons gegevens' mod='psgdpr'}
{/block}

{block name='page_content'}
<div class="container">
    <section class="page_content">
        <div class="col-12 psgdprinfo17">
            <h2>{l s='Toegang tot uw verzamelde gegevens' mod='psgdpr'}</h2>
            <p>U heeft op ieder moment te mogelijkheid om gegevens op te vragen die u heeft ingevuld en die bij gebruik van onze webshop zijn verzameld. Klik op één van de onderstaande knoppen om alle gegevens te exporteren naar csv of pdf bestand.</p>
            <div class="btn-group btn-toolbar justify-content-between">
            <a id="exportDataToCsv" class="btn btn-secondary btn-primary psgdprgetdatabtn17" rel="noopener" target="_blank" href="{$psgdpr_csv_controller|escape:'htmlall':'UTF-8'}">{l s='Exporteer mijn gegevens naar csv bestand' mod='psgdpr'}</a>
            <a id="exportDataToPdf" class="btn btn-secondary btn-primary psgdprgetdatabtn17" rel="noopener" target="_blank" href="{$psgdpr_pdf_controller|escape:'htmlall':'UTF-8'}">{l s='Exporteer mijn gegevens naar pdf bestand' mod='psgdpr'}</a>
            </div>
        </div>
        <div class="col-xs-12 psgdprinfo17">
            <h2>{l s='Wijziging & Verwijdering verzamelde gegevens' mod='psgdpr'}</h2>
            <p>U kunt uw gegevens op ieder moment wijzigen in uw account omgeving. Voor alle andere wijzigingen en/of verwijderen van uw verzamelde gegevens kunt u > <a class="text-decoration-none text-dark" href="{$psgdpr_contactUrl|escape:'htmlall':'UTF-8'}">{l s='contact' mod='psgdpr'}</a> met ons opnemen, wij voeren uw aanvraag z.s.m. voor u door.</p>
            <p><a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_AVG_INFO_PAGE'))}">> Voor meer informatie over de gegevens die van u verzameld worden klik dan hier</a></p>
        </div>
    </section>
</div>
{literal}
<script type="text/javascript">
    var psgdpr_front_controller = "{/literal}{$psgdpr_front_controller|escape:'htmlall':'UTF-8'}{literal}";
    var psgdpr_id_customer = "{/literal}{$psgdpr_front_controller|escape:'htmlall':'UTF-8'}{literal}";
    var psgdpr_ps_version = "{/literal}{$psgdpr_ps_version|escape:'htmlall':'UTF-8'}{literal}";
</script>
{/literal}
{/block}
