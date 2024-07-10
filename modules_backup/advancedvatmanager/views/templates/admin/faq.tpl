{**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 *}
 
<div class="faq_item">
    <h4 class="faq_title">{l s='When the customer has already saved an address with a valid VAT number, does he have to validate the address every time he places an order?' mod='advancedvatmanager'}</h4>
    <p>{l s='When a customer creates an address with a valid VAT number, the system validates it and saves the validation result in the database, so whenever he uses the same address to place orders, he will not have to validate it again.' mod='advancedvatmanager'}<br />{l s='If the VAT number validation Cron task is executed and the VAT number of that customer is no longer valid, the system will detect this and it will be then that the customer will no longer be VAT exempt until they insert a valid VAT number again in the direction.' mod='advancedvatmanager'}</p>
</div>
<div class="faq_item">
    <h4 class="faq_title">{l s='If the store already has customer addresses with VAT numbers saved before the module installation, How can the addresses be checked to find out if customers have entered a valid VAT number or not?' mod='advancedvatmanager'}</h4>
    <p>{l s='The module has a CRON task function to check the VAT numbers of all customer addresses that are already stored in the database. Once the module is installed in the store, the system will automatically check the VAT numbers of customers who create an address or modify the one they already have created.' mod='advancedvatmanager'}</p>
</div> 
<div class="faq_item">
    <h4 class="faq_title">{l s='Whenever I run the CRON task to check customer VAT numbers, does the process check all the addresses in the database again?' mod='advancedvatmanager'}</h4>
    <p>{l s='The system will check all customer addresses stored in the database unless the "Continue scanning process from last scanned address" option is enabled in the CRON settings section. This option allows the system to check addresses that could not be scanned before and scan them to validate their VAT numbers. It is very useful when the scanning system is interrupted for some reason or does not finish scanning all the addresses that meet the scan requirements.' mod='advancedvatmanager'}</p>
</div>
<div class="faq_item">
    <h4 class="faq_title">{l s='I am using a Marketplaces module that imports customer data and orders generated on the platform. However, this platform controls the prices and tax allocation of these orders. How can I configure the module so that it does not try to validate the VAT numbers of the imported customer data by the marketplace module and allows the marketplace to manage the taxes and prices of the orders that are imported?' mod='advancedvatmanager'}</h4>
    <p>{l s='To disable the validation of customer VAT numbers that are imported from these modules for synchronizing data with marketplaces, you must disable the "Disable validation in modules" option in the "Activation" section of the configuration page of this module.' mod='advancedvatmanager'}</p>
</div>
<div class="faq_item">
    <h4 class="faq_title">{l s='When I try to check VAT numbers, an error message is displayed.' mod='advancedvatmanager'}</h4>
    <p>{l s='To check VAT numbers, the system sends a request via VIES, GOV.UK and data.brreg.no API. These API return a response depends on the result of validation or system status. Something, API systems return error message due maintenance status, some limits reached, etc...Below we show the possible error messages and what they mean.' mod='advancedvatmanager'}</p>
    <li><strong>{l s='Invalid country ISO code' mod='advancedvatmanager'}:</strong> {l s='The country ISO code inserted is invalid' mod='advancedvatmanager'}</li>
    <li><strong>{l s='Invalid Merchant VAT information' mod='advancedvatmanager'}:</strong> {l s='The Merchant VAT number inserted in module configuration is not valid.' mod='advancedvatmanager'}</li>
    <li><strong>{l s='Service unavailable' mod='advancedvatmanager'}:</strong> {l s='The API system is unavailable for some reason (maintenance, technical issues, server down...). You should try again later.' mod='advancedvatmanager'}</li>
    <li><strong>{l s='Request unavailable' mod='advancedvatmanager'}:</strong> {l s='The request is unavailable due API server issue. You should try again later.' mod='advancedvatmanager'}</li>
    <li><strong>{l s='Timeout' mod='advancedvatmanager'}:</strong> {l s='The request has been waiting for a long time and the maximum time limit has been exceeded. This may be due to an overload of the server where the API is located. You should try again later.' mod='advancedvatmanager'}</li>
    <li><strong>{l s='VAT number is blocked' mod='advancedvatmanager'}:</strong> {l s='The VAT number is blocked for any reason. There is not anything to do about this.' mod='advancedvatmanager'}</li>
    <li><strong>{l s='Merchant server IP address is blocked' mod='advancedvatmanager'}:</strong> {l s='The API syste has blocked the requester IP address because it has been considered spam. You have to reset the router to change the IP address before trying a new request.' mod='advancedvatmanager'}</li>
    <li><strong>{l s='Internal server error' mod='advancedvatmanager'}:</strong> {l s='The API server has a technical issues. Try again later.' mod='advancedvatmanager'}</li>
    <li><strong>{l s='Maximum of concurrent requests reached' mod='advancedvatmanager'}:</strong> {l s='You have reached the maximum requests limit for a certain time. This occurs when a massive number of requests are made in a short period of time. You will have to wait a few minutes before making requests again.' mod='advancedvatmanager'}</li>
</div>    