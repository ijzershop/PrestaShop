{**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 *}
 
{if $ps160}
    <script>
        var ajax_url_customersordersmanager = "{Context::getContext()->link->getAdminLink('AdminCustomersOrdersManager') nofilter}"
    </script>
{/if} 

<div id="orders_statistics" class="panel">
    <h3><i class="fad fa-chart-bar"></i>&nbsp;{l s='Order statistics' mod='advancedvatmanager'}</h3>
    <div class="row dates_container">
        <label for="order_date_input_from">{l s='Date from:' mod='advancedvatmanager'}</label>  
        <div class="input-group date_container col-lg-2" data-provide="datetimepicker">
            <input id="order_date_input_from" name="order_date_input_from" type="text" class="form-control date" placeholder="{l s='Date from' mod='advancedvatmanager'}">
            <div class="input-group-addon">
                <i class="fal fa-calendar-alt"></i>
            </div>
        </div>
        <label for="order_date_input_to">{l s='Date to:' mod='advancedvatmanager'}</label>  
        <div class="input-group date_container col-lg-2" data-provide="datetimepicker">
            <input id="order_date_input_to" name="order_date_input_to" type="text" class="form-control date" placeholder="{l s='Date to' mod='advancedvatmanager'}">
            <div class="input-group-addon">
                <i class="fal fa-calendar-alt"></i>
            </div>
        </div>
        <button type="button" id="total_orders_filtered_by_dates" name="total_orders_filtered_by_dates" class="btn btn-light" value="1"><i class="fal fa-filter"></i> {l s='Filter orders' mod='advancedvatmanager'}</button>
        <button style="display:none;" type="submit" id="reset_total_orders_filter" name="reset_total_orders_filter" class="btn btn-danger" value="1"><i class="fal fa-sync-alt"></i>&nbsp;{l s='Reset filter' mod='advancedvatmanager'}</button>
    </div>
    <div class="row">
        <div class="col-lg-4">
            <div class="total_container">
                <h4 class="brexit_total"><i class="fal fa-shopping-cart"></i> {l s='Total collected in Brexit orders' mod='advancedvatmanager'}</h4>
                <div class="icon_container">
                    <img src="../modules/advancedvatmanager/views/img/united-kingdom.png" width="50" height="50"/> 
                    
                </div>
                <div class="amount_container">
                    <div class="total_brexit"><span class="total_brexit_amount">{$total_brexit|escape:'htmlall':'UTF-8'}</span></div>
                    <div class="total_brexit_wt"><span class="total_brexit_wt_amount">{$total_brexit_wt|escape:'htmlall':'UTF-8'}</span>&nbsp;{l s='Tax incl.' mod='advancedvatmanager'}</div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="total_container">
                <h4 class="voec_total"><i class="fal fa-shopping-cart"></i> {l s='Total collected in VOEC orders' mod='advancedvatmanager'}</h4>
                <div class="icon_container">
                    <img src="../modules/advancedvatmanager/views/img/norway.png" width="50" height="50"/>                     
                </div>
                <div class="amount_container">
                    <div class="total_voec"><span class="total_voec_amount">{$total_voec|escape:'htmlall':'UTF-8'}</span></div>
                    <div class="total_voec_wt"><span class="total_voec_wt_amount">{$total_voec_wt|escape:'htmlall':'UTF-8'}</span>&nbsp;{l s='Tax incl.' mod='advancedvatmanager'}</div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="total_container">
                <h4 class="intracommunity_total"><i class="fal fa-shopping-cart"></i> {l s='Total collected in intra-community operations' mod='advancedvatmanager'}</h4>
                <div class="icon_container">
                    <img src="../modules/advancedvatmanager/views/img/european-union.png" width="50" height="50"/>
                </div>
                <div class="amount_container">
                    <div class="total_intracommunity"><span class="total_intracommunity_amount">{$total_intracommunity|escape:'htmlall':'UTF-8'}</span></div>
                    <div class="total_intracommunity_wt"><span class="total_intracommunity_wt_amount">{$total_intracommunity_wt|escape:'htmlall':'UTF-8'}</span>&nbsp;{l s='Tax incl.' mod='advancedvatmanager'}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-4">
            <div class="total_container">
                <h4 class="tax_exempt_total"><i class="fal fa-badge-percent"></i> {l s='Total collected in tax exempt orders' mod='advancedvatmanager'}</h4>
                <div class="icon_container">
                    <img src="../modules/advancedvatmanager/views/img/tax-free.png" width="50" height="50"/>
                </div>
                <div class="amount_container">
                    <div class="total_tax_exemptt"><span class="total_tax_exempt_amount">{$total_tax_exempt|escape:'htmlall':'UTF-8'}</span></div>
                </div>
            </div>
        </div>
    </div>
</div>
