{**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 *}
 
{if $invoice_exist}
    <a href="{$href|escape:'htmlall':'UTF-8'}" class="send" title="{$action|escape:'htmlall':'UTF-8'}">
    	<i class="far fa-file-invoice"></i> {l s='Download invoice' mod='advancedvatmanager'}
    </a>
{/if}
