{**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 *}

<div class="avm_custom_text_priceblock">
    {if $noTax}
        {$custom_price_text_tax_exempt nofilter}
    {/if}
    {$custom_price_text nofilter}
</div>