{*
 * Google Analytics : GA4 and Universal-Analytics
 *
 * @author    businesstech.fr <modules@businesstech.fr> - https://www.businesstech.fr/
 * @copyright Business Tech - https://www.businesstech.fr/
 * @license   see file: LICENSE.txt
 *
 *           ____    _______
 *          |  _ \  |__   __|
 *          | |_) |    | |
 *          |  _ <     | |
 *          | |_) |    | |
 *          |____/     |_|
 *}

<div class="bootstrap">
	<form class="form-horizontal col-lg-12" action="{$sURI|escape:'htmlall':'UTF-8'}" method="post" id="bt_gfour_form" name="bt_gfour_form" onsubmit="javascript: oGap.form('bt_gfour_form', '{$sURI|escape:'htmlall':'UTF-8'}', null, 'bt_gfour_settings', 'bt_gfour_settings', false, false, null, 'gfour', 'gfour');return false;">
		<input type="hidden" name="sAction" value="{$aQueryParams.gfour.action|escape:'htmlall':'UTF-8'}" />
		<input type="hidden" name="sType" value="{$aQueryParams.gfour.type|escape:'htmlall':'UTF-8'}" />
		<input type="hidden" name="sDisplay" id="sBasicDisplay" value="{if !empty($sDisplay)}{$sDisplay|escape:'htmlall':'UTF-8'}{else}basic{/if}" />

        <h3><i class="icon-code"></i>&nbsp;{l s='Google Analytics 4 tracking' mod='ganalyticspro'}</h3>

        <div class="alert alert-warning">
            {l s='Before enabling Google Analytics 4 (GA4) tracking, you must create a GA4 property in your Google Analytics account by following' mod='ganalyticspro'}&nbsp;<a class="badge badge-info" href="{$smarty.const._GAP_BT_FAQ_MAIN_URL|escape:'htmlall':'UTF-8'}{$sFaqLang|escape:'htmlall':'UTF-8'}/faq/467" target="_blank"><i class="icon icon-link"/></i>&nbsp;{l s='this FAQ' mod='ganalyticspro'}</a>
            <div class="clr_10"></div>
            {l s='If you were using a Universal Analytics (UA) property, you just need to associate it with this new property following' mod='ganalyticspro'}&nbsp;<a class="badge badge-info" href="{$smarty.const._GAP_BT_FAQ_MAIN_URL|escape:'htmlall':'UTF-8'}{$sFaqLang|escape:'htmlall':'UTF-8'}/faq/466" target="_blank"><i class="icon icon-link"/></i>&nbsp;{l s='this FAQ' mod='ganalyticspro'}</a>&nbsp;{l s='The UA property will continue to collect data (provided that you enter its tracking ID in the next tab) and you will still be able to access it. To know more, please visit' mod='ganalyticspro'}&nbsp;<a href="https://support.google.com/analytics/answer/9744165?hl=fr&ref_topic=9303319" target="_blank">{l s='the Google official documentation' mod='ganalyticspro'}</a>
            <div class="clr_10"></div>
            {l s='Once your GA4 property is created, select "Yes" for the "Enable GA4 tracking" option below.' mod='ganalyticspro'}
        </div>
        
        <div class="clr_10"></div>

        <div>
            <div class="form-group">
                <label class="control-label col-xs-12 col-md-3 col-lg-3"><span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='Select "Yes" to enable the Google Analytics 4 tracking' mod='ganalyticspro'}"><b>{l s='Enable GA4 tracking?' mod='ganalyticspro'}</b></span></label>
                <div class="col-xs-12 col-md-5 col-lg-6">
                    <span class="switch prestashop-switch fixed-width-lg">
                        <input type="radio" name="bt_activate_gfour" id="bt_activate_gfour_on" value="1" {if !empty($bActivateGfour|escape:'htmlall':'UTF-8')}checked="checked"{/if} onclick="javascript: oGap.changeSelect('gfour_config', 'gfour_config', null, null, true, true);"/>
                        <label for="bt_activate_gfour_on" class="radioCheck">
                            {l s='Yes' mod='ganalyticspro'}
                        </label>
                        <input type="radio" name="bt_activate_gfour" id="bt_activate_gfour_off" value="0" {if empty($bActivateGfour|escape:'htmlall':'UTF-8')}checked="checked"{/if} onclick="javascript: oGap.changeSelect('gfour_config', 'gfour_config', null, null, true, false);" />
                        <label for="bt_activate_gfour_off" class="radioCheck">
                            {l s='No' mod='ganalyticspro'}
                        </label>
                        <a class="slide-button btn"></a>
                    </span>
                    <span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='Select "Yes" to enable the Google Analytics 4 tracking' mod='ganalyticspro'}">&nbsp;<span class="icon-question-sign"></span></span>
                </div>
            </div>

            <div id="gfour_config"  {if empty($bActivateGfour)}style="display: none;" {/if}>
                <div class="form-group" id="bt_div-email-test">
                    <label class="control-label col-xs-12 col-sm-12 col-md-5 col-lg-3">
                        <span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='Enter the measurement ID of your GA4 property. It is an alpha-numeric code prefixed by "G-".' mod='ganalyticspro'}">
                            <strong>{l s='Your GA4 measurement ID:' mod='ganalyticspro'}</strong>
                        </span>
                    </label>
                    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-2">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="icon-link"></i></span>
                            <input type="text" id ="bt_gfour-id" name="bt_gfour-id" size="35" value="{if !empty($sGfourId)}{$sGfourId|escape:'htmlall':'UTF-8'}{/if}" placeholder="G-XXXXX" />
                        </div>
                    </div>
                    <span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='Enter the measurement ID of your GA4 property. It is an alpha-numeric code prefixed by "G-".' mod='ganalyticspro'}">&nbsp;<i class="icon-question-sign"></i></span>
                    &nbsp;<a class="badge badge-info" href="{$smarty.const._GAP_BT_FAQ_MAIN_URL|escape:'htmlall':'UTF-8'}{$sFaqLang|escape:'htmlall':'UTF-8'}/faq/468" target="_blank"><i class="icon icon-link"/></i>&nbsp;{l s='FAQ about GA4 measurement ID' mod='ganalyticspro'}</a>
                </div>
            </div>
        </div>

		<div class="clr_10"></div>
		<div class="clr_hr"></div>
		<div class="clr_10"></div>

		<div class="center">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-11 col-lg-11">
					<div id="bt_error-gfour"></div>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-1 col-lg-1">
					<button  class="btn btn-default pull-right" onclick="oGap.form('bt_gfour_form', '{$sURI|escape:'htmlall':'UTF-8'}', null, 'bt_gfour_settings', 'bt_gfour_settings', false, false, null, 'gfour', 'gfour');return false;"><i class="process-icon-save"></i>{l s='Save' mod='ganalyticspro'}</button>
				</div>
			</div>
		</div>

	</form>
</div>

<div class="clr_20"></div>

<div id="bt_error-ua"></div>

{literal}
<script type="text/javascript">
	//bootstrap components init
	{/literal}{if !empty($bAjaxMode)}{literal}
	$('.label-tooltip, .help-tooltip').tooltip();
	{/literal}{/if}{literal}
</script>
{/literal}