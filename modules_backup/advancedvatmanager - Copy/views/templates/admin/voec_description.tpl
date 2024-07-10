{**
 * 2017-2023 liewebs - Prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2023 www.liewebs.com - Liewebs
 * 	@module Advanced VAT Manager
 *}

<p>{l s='The VOEC scheme (VAT On Ecommerce) is a tax system created by the Norwegian government designed for companies residing outside Norwegian territory and selling products to consumers residing in Norway. If the total computation of the amount of sales for 12 months exceeds the %s (50.000 NOK) threshold, then you would be required to register with the VOEC system to collect VAT directly from the point of sale (the online store) when a customer purchases a product whose value is less than %s (3,000 NOK). If you do not exceed the annual sales threshold of %s, but still meet the requirements to register with the VOEC system, you must do so.' sprintf=[$getNOKThreshold, $getNOKProductThreshold, $getNOKThreshold] mod='advancedvatmanager'}</p>
<p>{l s='You can find more information on the official website of the Norwegian Tax Agency at the following link:' mod='advancedvatmanager'}</p>
<strong><a href="https://www.skatteetaten.no/en/business-and-organisation/vat-and-duties/vat/foreign/e-commerce-voec/" target="_blank">{l s='Norwegian Tax Agency website' mod='advancedvatmanager'}</a></strong>
<br /><br />
<h4 style="font-size: 17px;"><strong>{l s='VOEC mode' mod='advancedvatmanager'}</strong></h4>
<li><strong>{l s='Standard mode:' mod='advancedvatmanager'}</strong> {l s='It does not allow combined purchases of products that fall within the VOEC scheme (amount less than 3,000 NOK) with products that are outside the VOEC scheme (amount greater than 3,000 NOK or exceptional products). The customers will not be able to make the purchase until they eliminate the product/s that differ from the rest in the shopping cart.' mod='advancedvatmanager'}</li>
<br />
<li><strong>{l s='Bundling mode:' mod='advancedvatmanager'}</strong> {l s='It allows customers to make combined purchases within the same package of products that are included inside the VOEC scheme and those that are not included. In this case, the sale will be made exempt from VAT at the point of sale and the customer will have to pay VAT when the package reaches the border.' mod='advancedvatmanager'}</li>