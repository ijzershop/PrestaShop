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
<li class="nav-item">
	<a class="nav-link btn-light {if $page.page_name == 'module-psgdpr-gdpr'}active{/if}" id="identity-link" href="{$link->getModuleLink('psgdpr', 'gdpr')}">
	    <span class="link-item">
	        <i class="fasl fa-user-cog"></i> {l s='GDPR - Personal data' mod='psgdpr'}
	    </span>
	</a>
</li>
