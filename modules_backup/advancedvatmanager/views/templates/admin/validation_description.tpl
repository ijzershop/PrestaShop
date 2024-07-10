{**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 *}

<p><li><strong>{l s='Validation system:' mod='advancedvatmanager'}</strong> {l s='It is highly recommended to use the 2-way validation system to ensure the legal integrity of the tax exemption in intra-community transactions, verifying both the VAT number of the merchant and the customer. For 2-way validation, it is necessary to set Merchant vat number in general settings. If Merchant vat option is empty, the system will use 1-way validation in any case.' mod='advancedvatmanager'}</li></p>
<p><li><strong>{l s='Company address validation:' mod='advancedvatmanager'}</strong> {l s='It will work when the [Company address validation] option is activated and will adjust to the accuracy percentage indicated. The comparison algorithm between the address entered by the client and the one registered in official systems is based on a comparison of characters and an approximation to the exact address. There may be some small differences in the address indicated by the client and the one registered in the system. For this reason, percentage accuracy values between 60 - 90 percent are recommended. Values above 90% can cause problems when validating addresses that are almost identical.' mod='advancedvatmanager'}</li></p>
<p><li><strong>{l s='Company name validation:' mod='advancedvatmanager'}</strong> {l s='It will work when the [Company name validation] option is activated and will adjust to the accuracy percentage indicated. The comparison algorithm between the name entered by the client and the one registered in official systems is based on a comparison of characters and an approximation to the exact address. There may be some small differences in the address indicated by the client and the one registered in the system. For this reason, percentage accuracy values between 90 - 100 percent are recommended. Values below 90% can cause non exactcompanies name inserted.' mod='advancedvatmanager'}</li></p>