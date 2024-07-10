{**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 *}
 
<div id="vatmanagement_legend" class="panel col-lg-4">
    <h3><i class="fal fa-info"></i>&nbsp;{l s='Legend' mod='advancedvatmanager'}</h3>
    <div class="row vatmanagement_legend_container">
        <ul>
            <li style="list-style:none;"><img src="../modules/advancedvatmanager/views/img/company.png" width="20" height="20" data-toggle="tooltip" data-placement="top" title="{l s='Company: Address with valid VAT number and either company address validated or company name validated.' mod='advancedvatmanager'}"/></li>
            <li style="list-style:none;"><img src="../modules/advancedvatmanager/views/img/company_nv.png" width="20" height="20" data-toggle="tooltip" data-placement="top" title="{l s='Company not validated: Address with company name field filled and not validated and VAT number invalid or empty or with valid VAT number but neither company name and company address valid.' mod='advancedvatmanager'}"/></li>
            <li style="list-style:none;"><img src="../modules/advancedvatmanager/views/img/company_certified.png" width="20" height="20" data-toggle="tooltip" data-placement="top" title="{l s='Company certified: Address with valid VAT number, company name validated and company address validated.' mod='advancedvatmanager'}"/></li>
            <li style="list-style:none;"><img src="../modules/advancedvatmanager/views/img/consumer.png" width="20" height="20" data-toggle="tooltip" data-placement="top" title="{l s='Consumer: Address with VAT number invalid or empty and company field empty.' mod='advancedvatmanager'}"/></li>
            <li style="list-style:none;"><i style="font-size:20px;color:#fdc700;position:relative;right:2px;" class="fal fa-exclamation-triangle" data-toggle="tooltip" data-placement="top" title="{l s='The system has failed trying to validate VAT number.' mod='advancedvatmanager'}"></i></li>
            <li style="list-style:none;"><i style="font-size:20px;color:#32db1d;" class="fal fa-badge-percent" data-toggle="tooltip" data-placement="top" title="{l s='The VAT number has been validated successfully.' mod='advancedvatmanager'}"></i></li>
            <li style="list-style:none;"><i style="font-size:20px;color:#f92727;" class="fal fa-badge-percent" data-toggle="tooltip" data-placement="top" title="{l s='The VAT number is invalid.' mod='advancedvatmanager'}"></i></li>
            <li style="list-style:none;"><i style="font-size:20px;color:#32db1d;" class="fal fa-briefcase" data-toggle="tooltip" data-placement="top" title="{l s='Company name has been validated successfully.' mod='advancedvatmanager'}"></i></li>
            <li style="list-style:none;"><i style="font-size:20px;color:#000000;" class="fal fa-briefcase" data-toggle="tooltip" data-placement="top" title="{l s='Company name not validated yet' mod='advancedvatmanager'}"></i></li>
            <li style="list-style:none;"><i style="font-size:20px;color:#f92727;" class="fal fa-briefcase" data-toggle="tooltip" data-placement="top" title="{l s='Company name is invalid.' mod='advancedvatmanager'}"></i></li>
            <li style="list-style:none;"><i style="font-size:20px;color:#32db1d;" class="fad fa-map-marked-alt" data-toggle="tooltip" data-placement="top" title="{l s='Company address has been validated successfully.' mod='advancedvatmanager'}"></i></li>
            <li style="list-style:none;"><i style="font-size:20px;color:#000000;" class="fad fa-map-marked-alt" data-toggle="tooltip" data-placement="top" title="{l s='Company address has not been validated yet because the option to validate company address is disabled.' mod='advancedvatmanager'}"></i></li>
            <li style="list-style:none;"><i style="font-size:20px;color:#f92727;" class="fad fa-map-marked-alt" data-toggle="tooltip" data-placement="top" title="{l s='Company address is invalid.' mod='advancedvatmanager'}"></i></li>
            <li style="list-style:none;"><i style="font-size:20px;color:#32db1d;" class="fas fa-server" data-toggle="tooltip" data-placement="top" title="{l s='API system OK.' mod='advancedvatmanager'}"></i></li>
            <li style="list-style:none;"><i style="font-size:20px;color:#f92727;" class="fas fa-server" data-toggle="tooltip" data-placement="top" title="{l s='An API server error has occurred during validation using the API system for some reason related to the official validation systems server.' mod='advancedvatmanager'}"></i></li>
            <li style="list-style:none;"><i style="font-size:20px;color:#25b9d7;" class="fas fa-info-circle" data-toggle="tooltip" data-placement="top" title="{l s='The result of the responses of the API systems during the validations of VAT numbers is shown.' mod='advancedvatmanager'}"></i></li>
        </ul>
    </div>
</div>