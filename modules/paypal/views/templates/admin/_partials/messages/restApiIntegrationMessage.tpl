{*
* 2007-2021 PayPal
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
*  @author 2007-2021 PayPal
*  @copyright PayPal
*  @license http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
*
*}

<div class="alert alert-warning">
    <button type="button" class="close" data-dismiss="alert">×</button>

    <div>
        {l s='As we are constantly working on the security of your information, a new version of your merchant account authentication is available starting from the v5.2.0 of PayPal Official module.' mod='paypal'}
    </div>

    <div>
        {{l s='Please pay attention that it is required to [b]reconnect your PayPal merchant account[/b] in order to continue to use PayPal payment solution.' mod='paypal'}|paypalreplace}
    </div>
</div>
