{**
 * 2017-2022 liewebs - Prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2022 www.liewebs.com - Liewebs
 * 	@module Advanced VAT Manager
 *}
{if $product_price_mode != 'price_default'}
    <div class="avm_priceblock">
        {if $product_price_mode == 'price_both'}
            {if $product.price_without_reduction != $product.price_without_reduction_without_tax}
                <span class="avm_price_amount">{l s='%price%' mod='advancedvatmanager' sprintf=['%price%' => $product.price]}</span>&nbsp;<span class="avm_price_label">{if $noTax}{if !empty($price_label_tax_exempt)}{$price_label_tax_exempt|escape:'html':'UTF-8'}{else}{l s='tax incl.' mod='advancedvatmanager'}{/if}{else}{l s='tax incl.' mod='advancedvatmanager'}{/if}</span>
            {/if}
            <div class="product-without-taxes"><span class="avm_price_amount">{l s='%price%' mod='advancedvatmanager' sprintf=['%price%' => Tools::displayPrice($product.price_tax_exc)]}</span>&nbsp;<span class="avm_price_label">{if $noTax}{if !empty($price_label_tax_exempt)}{$price_label_tax_exempt|escape:'html':'UTF-8'}{else}{l s='tax excl.' mod='advancedvatmanager'}{/if}{else}{l s='tax excl.' mod='advancedvatmanager'}{/if}</span></div>
        {/if}
        {if $product_price_mode == 'price_tax'}
            <div class="product-with-taxes">    
                <span class="avm_price_amount">{l s='%price%' mod='advancedvatmanager' sprintf=['%price%' => $product.price]}</span>&nbsp;<span class="avm_price_label">{if $noTax}{if !empty($price_label_tax_exempt)}{$price_label_tax_exempt|escape:'html':'UTF-8'}{else}{l s='tax incl.' mod='advancedvatmanager'}{/if}{else}{l s='tax incl.' mod='advancedvatmanager'}{/if}</span>
            </div>            
        {/if}
        {if $product_price_mode == 'price_wt'}
            <div class="product-without-taxes">    
                <span class="avm_price_amount">{l s='%price%' mod='advancedvatmanager' sprintf=['%price%' => Tools::displayPrice($product.price_tax_exc)]}</span>&nbsp;<span class="avm_price_label">{if $noTax}{if !empty($price_label_tax_exempt)}{$price_label_tax_exempt|escape:'html':'UTF-8'}{else}{l s='tax excl.' mod='advancedvatmanager'}{/if}{else}{l s='tax excl.' mod='advancedvatmanager'}{/if}</span>
            </div>            
        {/if}
    </div>
{else if $product_price_mode == 'price_default'}
    <span class="avm_price_amount">{$product.price nofilter}</span>&nbsp;{if $noTax}{if !empty($price_label_tax_exempt)}<span class="avm_label_taxexempt">{$price_label_tax_exempt|escape:'html':'UTF-8'}</span>{/if}{/if}
{/if}