{**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 *}
 
<div id="orders_vat_manager_panel" class="panel">
    <h3><i class="fal fa-info-circle"></i>&nbsp;{l s='Information' mod='advancedvatmanager'}</h3>
    <p>{l s='This list shows the orders placed and that comply with the regulation in intra-community operations, Brexit or VOEC (as long as the Brexit or VOEC options are activated in the module configuration page).' mod='advancedvatmanager'}</p>
    <br />
    <div class="alert alert-info">
        <li>{l s='Only the orders made by customers since the module was installed in the shop will be shown automatically in the list of orders. If you have orders prior to the module installation date, you must use the order import tool.' mod='advancedvatmanager'}</li>
        <li>{l s='Only revenue from orders that have already been invoiced is shown in the statistics.' mod='advancedvatmanager'}</li>
        <li>{l s='The data in the customer type column (Company or end consumer) does not have to match the same customer type column in the Customer VAT Number Administration section. To determine the type of customer in this section, the system relies on objective tax data (order address with a valid VAT number or not) to determine whether the customer has placed an order as a company or as an end consumer.' mod='advancedvatmanager'}</li>
    </div>
</div>
