{**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 *}

<div style="margin-top: 15px;" class="alert alert-warning">
    {if $brexit_customer}
        {if Configuration::get('ADVANCEDVATMANAGER_BREXIT_NOTALLOWORDERS') == 1}
            {l s='Purchases over %s are not allowed' sprintf=[$gbp_currency_threshold] mod='advancedvatmanager'}
        {else if Configuration::get('ADVANCEDVATMANAGER_BREXIT_NOTALLOWORDERS') == 2}
            {l s='Purchases below %s are not allowed' sprintf=[$gbp_currency_threshold] mod='advancedvatmanager'}
        {/if}
    {else if $voec_customer}
        {l s='It is not allowed to add to the shopping cart products with an unit price equal or higher than %s combined with other products with a lower unit price, according to the VOEC regulation in Norway. You will need to make separate purchases.' sprintf=[$voec_product_threashold] mod='advancedvatmanager'}
    {/if}
</div>