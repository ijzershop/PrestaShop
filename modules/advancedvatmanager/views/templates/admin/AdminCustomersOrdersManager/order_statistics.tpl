{**
 * 2017-2023 liewebs - Prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2023 www.liewebs.com - Liewebs
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
    <!-- Progress bar for threshold -->
    <div class="row threshold_limits_container">
        <div class="col-lg-12">
            <div class="threshold-voec_total_container">
                <h4 class="voec_threshold"><img src="../modules/advancedvatmanager/views/img/norway.png" width="20" height="20"/> {l s='VOEC threshold reached' mod='advancedvatmanager'}</h4>
                <p class="voec_threshold_description">{l s='Threshold reached for sales related to VOEC (Norway) operations in the last 12 months. This is useful to find out if the limit of %s (50,000 NOK tax excl.) has been reached to manage VAT taxation.' sprintf=[$voec_limit_currency, $voec_limit_currency] mod='advancedvatmanager'}</p>
                <div class="progress_container">
                    <div class="progress" style="height: 30px;">
                      <div class="progress-bar avm_progress-bar {if $las12months_voec_percent >= 100}completed{else}in_progress{/if}" role="progressbar" style="width: {if $las12months_voec_percent >= 100}100{else}{$las12months_voec_percent|escape:'htmlall':'UTF-8'}{/if}%;" aria-valuenow="{$las12months_voec|escape:'htmlall':'UTF-8'}" aria-valuemin="0" aria-valuemax="{$voec_limit|escape:'htmlall':'UTF-8'}">{$las12months_voec_currency|escape:'htmlall':'UTF-8'}</div>
                    </div>
                    <div class="voec_threshold_progresion">
                        {if $las12months_voec_percent >= 100}
                            <p class="limit_reached">{l s='Threashold of %s has been reached!' sprintf=[$voec_limit_currency] mod='advancedvatmanager'}</p>
                        {else}
                            <p class="limits">{l s='%s of %s' sprintf=[$las12months_voec_currency, $voec_limit_currency] mod='advancedvatmanager'}</p>
                            <p class="dates">{l s='Period between date %s and %s' sprintf=[$dateLast12months, $today] mod='advancedvatmanager'}</p>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="threshold-intracommunity_total_container">
                <h4 class="intracommunity_threshold"><img src="../modules/advancedvatmanager/views/img/european-union.png" width="20" height="20"/> {l s='Intra-community operations threshold reached' mod='advancedvatmanager'}</h4>
                <p class="intracommunity_threshold_description">{l s='Threshold reached for sales related to Intra-community operations in the current year. This is useful to find out if the limit of %s (tax excl.) has been reached to manage VAT taxation for these operations according to the new European Directive 2017/2455 with entry into force on January 1, 2021.' sprintf=[$intracommunity_limit_currency] mod='advancedvatmanager'}</p>
                <div class=" alert alert-info intracommunity_threshold_lastYear">
                    {l s='In the year %s the total amount from intracommunity operations was' sprintf=[$lastYear , $total_lastYearIntracommunity_currency] mod='advancedvatmanager'} <strong>{l s='%s' sprintf=[$total_lastYearIntracommunity_currency] mod='advancedvatmanager'}</strong>
                </div>
                <div class="progress_container">
                    <div class="progress" style="height: 30px;">
                      <div class="progress-bar avm_progress-bar {if $currentYear_intracommunity_percent >= 100}completed{else}in_progress{/if}" role="progressbar" style="width: {if $currentYear_intracommunity_percent >= 100}100{else}{$currentYear_intracommunity_percent|escape:'htmlall':'UTF-8'}{/if}%;" aria-valuenow="{$currentYear_intracommunity|escape:'htmlall':'UTF-8'}" aria-valuemin="0" aria-valuemax="{$intracommunity_limit|escape:'htmlall':'UTF-8'}">{$currentYear_intracommunity_currency|escape:'htmlall':'UTF-8'}</div>
                    </div>
                    <div class="intracommunity_threshold_progresion">
                        {if $currentYear_intracommunity_percent >= 100}
                            <p class="limit_reached">{l s='Threashold of %s has been reached within current year!' sprintf=[$intracommunity_limit_currency] mod='advancedvatmanager'}</p>
                        {else}
                            <p class="limits">{l s='%s of %s' sprintf=[$currentYear_intracommunity_currency, $intracommunity_limit_currency] mod='advancedvatmanager'}</p>
                            <p class="dates">{l s='Period between date %s and %s' sprintf=[$currentYearDate, $today] mod='advancedvatmanager'}</p>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
