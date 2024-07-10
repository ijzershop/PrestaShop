{**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 *}

{if !$emptyVAT}
<a href="{$href|escape:'htmlall':'UTF-8'}" title="{$action|escape:'htmlall':'UTF-8'}">
	<i class="fas fa-user-check"></i> {l s='Validate VAT manually' mod='advancedvatmanager'}
</a>
{/if}
