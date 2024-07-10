{**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 *}
 
<div id="orders_statistics" class="panel">
    <h3><i class="fas fa-tasks-alt"></i>&nbsp;{l s='Operations threshold data' mod='advancedvatmanager'}</h3>
    <!-- Progress bar for threshold -->
    <div class="row threshold_limits_container">
        <div class="col-lg-6">
            <div class="threshold-voec_total_container">
                <h4 class="voec_threshold"><img src="../modules/advancedvatmanager/views/img/norway.png" width="20" height="20"/> {l s='VOEC operations' mod='advancedvatmanager'}</h4>
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
        <div class="col-lg-6">
            <div class="threshold-intracommunity_total_container">
                <h4 class="intracommunity_threshold"><img src="../modules/advancedvatmanager/views/img/european-union.png" width="20" height="20"/> {l s='Intra-community operations to final consumers' mod='advancedvatmanager'}</h4>
                <p class="intracommunity_threshold_description">{l s='Threshold reached for sales related to Intra-community operations to final consumers in the current year. This is useful to find out if the limit of %s (tax excl.) has been reached to manage VAT taxation for these operations according to the new European Directive 2017/2455 with entry into force on January 1, 2021.' sprintf=[$intracommunity_limit_currency] mod='advancedvatmanager'}</p>
                <div class=" alert alert-info intracommunity_threshold_lastYear">
                    {l s='In the year %s the total amount from Intra-community operations to final consumers was' sprintf=[$lastYear , $total_lastYearIntracommunity_currency] mod='advancedvatmanager'} <strong>{l s='%s' sprintf=[$total_lastYearIntracommunity_currency] mod='advancedvatmanager'}</strong>
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
