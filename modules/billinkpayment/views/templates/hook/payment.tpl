{*
* 2007-2014 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2014 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}
<p class="payment_module">
	<a href="{$this_path_ssl}payment.php?scbk={$token}&gb={$gb}&tn={$tn}" title="{l s='Koop nu en betaal later' mod='billinkpayment'}" style="background: #fbfbfb url({$this_path_ssl}logo.png) 15px 15px no-repeat;">
        {l s='Koop nu en betaal binnen 14 dagen op factuur' mod='billinkpayment'} &nbsp; <span>{l s='eenmalig' mod='billinkpayment'} {convertPrice price=$billink_costs} {l s='incl. btw'} {l s='administratiekosten' mod='billinkpayment'}</span>
	</a>
</p>