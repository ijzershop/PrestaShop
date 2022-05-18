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
	<form class="form-horizontal col-lg-12" action="{$sURI|escape:'htmlall':'UTF-8'}" method="post" id="bt_ua-form" name="bt_ua-form" onsubmit="javascript: oGap.form('bt_ua-form', '{$sURI|escape:'htmlall':'UTF-8'}', null, 'bt_ua-settings', 'bt_ua-settings', false, false, null, 'ua', 'ua');return false;">
		<input type="hidden" name="sAction" value="{$aQueryParams.ua.action|escape:'htmlall':'UTF-8'}" />
		<input type="hidden" name="sType" value="{$aQueryParams.ua.type|escape:'htmlall':'UTF-8'}" />
		<input type="hidden" name="sDisplay" id="sBasicDisplay" value="{if !empty($sDisplay)}{$sDisplay|escape:'htmlall':'UTF-8'}{else}basic{/if}" />

		<h3><i class="icon-code"></i>&nbsp;{l s='Universal Analytics tracking' mod='ganalyticspro'}</h3>

		{if !empty($bUpdate)}
			{include file="`$sConfirmInclude`"}
		{elseif !empty($aErrors)}
			{include file="`$sErrorInclude`"}
		{/if}

		<div class="alert alert-info">
			{l s='Universal Analytics refers to the previous generation of Google Analytics for measuring website traffic. If you have been using Universal Analytics until now, you can continue to fill out reports for your UA property, and access its history, provided you:' mod='ganalyticspro'}
			<ul>
				<li>{l s='associate your existing UA property with a GA4 property following' mod='ganalyticspro'}&nbsp;<a class="badge badge-info" href="{$smarty.const._GAP_BT_FAQ_MAIN_URL|escape:'htmlall':'UTF-8'}{$sFaqLang|escape:'htmlall':'UTF-8'}/faq/466" target="_blank"><i class="icon icon-link"/></i>&nbsp;{l s='this FAQ' mod='ganalyticspro'}</a>&nbsp;</li>
				<li>{l s='enter the measurement ID of your GA4 property in the previous tab' mod='ganalyticspro'}</li>
				<li>{l s='enter the tracking ID of your existing UA property below' mod='ganalyticspro'}</li>
			</ul>			
			<div class="clr_10"></div>
			{l s='If you just have a GA4 property, the activation of the UA tracking is not manadatory for the use of the module. However, know that you can trigger it at any time by creating a UA property, enter below its tracking ID, and associating it with your existing GA4 property. You can follow the procedure in' mod='ganalyticspro'}&nbsp;<a class="badge badge-info" href="{$smarty.const._GAP_BT_FAQ_MAIN_URL|escape:'htmlall':'UTF-8'}{$sFaqLang|escape:'htmlall':'UTF-8'}/faq/470" target="_blank"><i class="icon icon-link"/></i>&nbsp;{l s='this FAQ' mod='ganalyticspro'}</a>
		</div>

		<div class="clr_20"></div>

		<div class="form-group">
			<label class="control-label col-xs-12 col-md-3 col-lg-3"><span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='Select "Yes" to enable the Universal Analytics tracking' mod='ganalyticspro'}"><b>{l s='Enable UA tracking?' mod='ganalyticspro'}</b></span></label>
			<div class="col-xs-12 col-md-5 col-lg-6">
				<span class="switch prestashop-switch fixed-width-lg">
					<input type="radio" name="bt_activate_ua" id="bt_activate_ua_on" value="1" {if !empty($bActivateUa|escape:'htmlall':'UTF-8')}checked="checked"{/if} onclick="javascript: oGap.changeSelect('ua_config', 'ua_config', null, null, true, true);"/>
					<label for="bt_activate_ua_on" class="radioCheck">
						{l s='Yes' mod='ganalyticspro'}
					</label>
					<input type="radio" name="bt_activate_ua" id="bt_activate_ua_off" value="0" {if empty($bActivateUa|escape:'htmlall':'UTF-8')}checked="checked"{/if} onclick="javascript: oGap.changeSelect('ua_config', 'ua_config', null, null, true, false);" />
					<label for="bt_activate_ua_off" class="radioCheck">
						{l s='No' mod='ganalyticspro'}
					</label>
					<a class="slide-button btn"></a>
				</span>
				<span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='Select "Yes" to enable the Universal Analytics tracking' mod='ganalyticspro'}">&nbsp;<span class="icon-question-sign"></span></span>
			</div>
		</div>

		<div id="ua_config"  {if empty($bActivateUa)}style="display: none;" {/if}>
			<div class="form-group" id="bt_div-email-test">
				<label class="control-label col-xs-12 col-sm-12 col-md-5 col-lg-3">
					<span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='Enter the tracking ID of your UA property. It is an alpha-numeric code prefixed by "UA-".' mod='ganalyticspro'}">
						<strong>{l s='Your Universal Analytics tracking ID:' mod='ganalyticspro'}</strong>
					</span>
				</label>
				<div class="col-xs-12 col-sm-12 col-md-5 col-lg-2">
					<div class="input-group">
						<span class="input-group-addon"><i class="icon-link"></i></span>
						<input type="text" id ="bt_ga-id" name="bt_ga-id" size="35" value="{if !empty($sGaId)}{$sGaId|escape:'htmlall':'UTF-8'}{/if}" placeholder="UA-XXXX-Y" />
					</div>
				</div>
				<span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='Enter the tracking ID of your UA property. It is an alpha-numeric code prefixed by "UA-".' mod='ganalyticspro'}">&nbsp;<i class="icon-question-sign"></i></span>
				&nbsp;<a class="badge badge-info" href="{$smarty.const._GAP_BT_FAQ_MAIN_URL|escape:'htmlall':'UTF-8'}{$sFaqLang|escape:'htmlall':'UTF-8'}/faq/472" target="_blank"><i class="icon icon-link"></i>&nbsp;{l s='FAQ about UA tracking ID' mod='ganalyticspro'}</a>
			</div>
		</div>

		<div class="clr_10"></div>
		<div class="clr_hr"></div>
		<div class="clr_10"></div>

		<div class="center">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-11 col-lg-11">
					<div id="bt_error-ua"></div>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-1 col-lg-1">
					<button  class="btn btn-default pull-right" onclick="oGap.form('bt_ua-form', '{$sURI|escape:'htmlall':'UTF-8'}', null, 'bt_ua-settings', 'bt_ua-settings', false, false, null, 'ua', 'ua');return false;"><i class="process-icon-save"></i>{l s='Save' mod='ganalyticspro'}</button>
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