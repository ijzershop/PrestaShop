{**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 *}
 
<div class="panel col-lg-12 vat_statistics_panel">
    <div class="panel-heading">
        <i class="fad fa-chart-bar"></i> <span class="panel-heading-title">{l s='VAT number Statistics' mod='advancedvatmanager'}</span>
    </div>
    <div class="row">
        <div class="col-lg-2 statistic_container">
            <div class="icon_container valid_value">
                <span class="counter">{$total_vat_valid|escape:'htmlall':'UTF-8'}</span> <i class="fal fa-badge-percent"></i>
            </div>
            <p class="counter_description valid_value">{l s='Addresses with valid VAT' mod='advancedvatmanager'}</p>
        </div>
        <div class="col-lg-2 statistic_container">
            <div class="icon_container invalid_value">
                <span class="counter">{$total_vat_invalid|escape:'htmlall':'UTF-8'}</span> <i class="fal fa-badge-percent"></i>
            </div>
            <p class="counter_description invalid_value">{l s='Addresses with invalid VAT ' mod='advancedvatmanager'}</p>
        </div>
        <div class="col-lg-2 statistic_container">
            <div class="icon_container valid_value">
                <span class="counter">{$total_company_valid|escape:'htmlall':'UTF-8'}</span> <i class="fal fa-briefcase"></i>
            </div>
            <p class="counter_description valid_value">{l s='Addresses with valid company name' mod='advancedvatmanager'}</p>
        </div>
        <div class="col-lg-2 statistic_container">
            <div class="icon_container invalid_value">
                <span class="counter">{$total_company_invalid|escape:'htmlall':'UTF-8'}</span> <i class="fal fa-briefcase"></i>
            </div>
            <p class="counter_description invalid_value">{l s='Addresses with invalid company name' mod='advancedvatmanager'}</p>
        </div>
        <div class="col-lg-2 statistic_container">
            <div class="icon_container notvalidated_value">
                <span class="counter">{$total_company_notvalidated|escape:'htmlall':'UTF-8'}</span> <i class="fal fa-briefcase"></i>
            </div>
            <p class="counter_description notvalidated_value">{l s='Addresses with not validated company name' mod='advancedvatmanager'}</p>
        </div> 
        <div class="col-lg-2 statistic_container">
            <div class="icon_container valid_value">
                <span class="counter">{$total_companyAddress_valid|escape:'htmlall':'UTF-8'}</span> <i class="fad fa-map-marked-alt"></i>
            </div>
            <p class="counter_description valid_value">{l s='Addresses with valid company address' mod='advancedvatmanager'}</p>
        </div>     
    </div>
    <div class="row">
        <div class="col-lg-2 statistic_container">
            <div class="icon_container invalid_value">
                <span class="counter">{$total_companyAddress_invalid|escape:'htmlall':'UTF-8'}</span> <i class="fad fa-map-marked-alt"></i>
            </div>
            <p class="counter_description invalid_value">{l s='Addresses with invalid company address' mod='advancedvatmanager'}</p>
        </div> 
        <div class="col-lg-2 statistic_container">
            <div class="icon_container notvalidated_value">
                <span class="counter">{$total_companyAddress_notvalidated|escape:'htmlall':'UTF-8'}</span> <i class="fad fa-map-marked-alt"></i>
            </div>
            <p class="counter_description notvalidated_value">{l s='Addresses with not validated company address' mod='advancedvatmanager'}</p>
        </div> 
        <div class="col-lg-2 statistic_container">
            <div class="icon_container">
                <span class="counter">{$total_companies|escape:'htmlall':'UTF-8'}</span> <img src="../modules/advancedvatmanager/views/img/company.png" width="30" height="30"/>
            </div>
            <p class="counter_description">{l s='Companies' mod='advancedvatmanager'}</p>
        </div> 
        <div class="col-lg-2 statistic_container">
            <div class="icon_container">
                <span class="counter">{$total_companyAddress_notvalidated|escape:'htmlall':'UTF-8'}</span> <img src="../modules/advancedvatmanager/views/img/company_nv.png" width="30" height="30"/>
            </div>
            <p class="counter_description">{l s='Companies not validated' mod='advancedvatmanager'}</p>
        </div> 
        <div class="col-lg-2 statistic_container">
            <div class="icon_container">
                <span class="counter">{$total_companiesCertified|escape:'htmlall':'UTF-8'}</span> <img src="../modules/advancedvatmanager/views/img/company_certified.png" width="30" height="30"/>
            </div>
            <p class="counter_description">{l s='Companies certified' mod='advancedvatmanager'}</p>
        </div> 
        <div class="col-lg-2 statistic_container">
            <div class="icon_container">
                <span class="counter">{$total_consumers|escape:'htmlall':'UTF-8'}</span> <img src="../modules/advancedvatmanager/views/img/consumer.png" width="30" height="30"/>
            </div>
            <p class="counter_description">{l s='Consumers' mod='advancedvatmanager'}</p>
        </div> 
    </div>
</div>