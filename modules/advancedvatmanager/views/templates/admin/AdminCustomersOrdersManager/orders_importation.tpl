{**
 * 2017-2023 liewebs - Prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2023 www.liewebs.com - Liewebs
 * 	@module Advanced VAT Manager
 *}
 
<div id="orders_importation" class="col-lg-4 panel">
    <h3><i class="fal fa-cart-arrow-down"></i>&nbsp;{l s='Orders importation' mod='advancedvatmanager'}</h3>
    <div class="alert alert-info">{l s='This tool imports orders that have not been saved in this section yet. This tool is very useful to save orders when the module was not installed. Once the module is installed, the orders that meet the requirements (VOEC customer or Brexit depends if these options are enabled from module configuration page) will be saved in this section. In any case, orders related to intra-community operations will be imported.' mod='advancedvatmanager'}</div>
    <div class="alert alert-warning">{l s='If there are thousands of orders in the database, the import process could take a few minutes. It is recommended to increase the max_execution_time server parameter to 300 or higher to avoid interruptions in the process.' mod='advancedvatmanager'}</div>
    <div class="orders_inportation_options">
        <p>{l s='Intra-community orders importation' mod='advancedvatmanager'}&nbsp;<span class="import_options_enabled"><i class="fal fa-check-circle"></i>&nbsp;{l s='Enabled' mod='advancedvatmanager'}</span></p> 
        <p>{l s='Brexit orders importation' mod='advancedvatmanager'}&nbsp;{if Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED')}<span class="import_options_enabled"><i class="fal fa-check-circle"></i>&nbsp;{l s='Enabled' mod='advancedvatmanager'}</span>{else}<span class="import_options_disabled"><i class="fal fa-times-circle"></i></i>&nbsp;{l s='Disabled' mod='advancedvatmanager'}</span>{/if}</p> 
        <p>{l s='VOEC orders importation' mod='advancedvatmanager'}&nbsp;{if Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED')}<span class="import_options_enabled"><i class="fal fa-check-circle"></i>&nbsp;{l s='Enabled' mod='advancedvatmanager'}</span>{else}<span class="import_options_disabled"><i class="fal fa-times-circle"></i></i>&nbsp;{l s='Disabled' mod='advancedvatmanager'}</span>{/if}</p>    
    </div>
    <form method="POST">
        <div class="button_import_container">
            <button type="submit" class="btn btn-info" name="submit_import_orders"><i class="fal fa-download"></i> {l s='Import orders' mod='advancedvatmanager'}</button>
        </div>
    </form>
</div>
