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
	<form class="form-horizontal col-lg-12" action="{$sURI|escape:'htmlall':'UTF-8'}" method="post" id="bt_consent_form" name="bt_consent_form" onsubmit="javascript: oGap.form('bt_consent_form', '{$sURI|escape:'htmlall':'UTF-8'}', null, 'bt_consent_settings', 'bt_consent_settings', false, false, null, 'consent', 'consent');return false;">
		<input type="hidden" name="sAction" value="{$aQueryParams.consent.action|escape:'htmlall':'UTF-8'}" />
		<input type="hidden" name="sType" value="{$aQueryParams.consent.type|escape:'htmlall':'UTF-8'}" />
		<input type="hidden" name="sDisplay" id="sBasicDisplay" value="{if !empty($sDisplay)}{$sDisplay|escape:'htmlall':'UTF-8'}{else}basic{/if}" />

        <h3><i class="fa fa-check"></i>&nbsp;{l s='Consent mode' mod='ganalyticspro'}</h3>
	
        <div class="alert alert-info">
        {l s='This tab allows you to activate the consent mode of the tag. Consent mode allows you to adjust the behavior of your Google Analytics tag according to the user\'s cookie consent. This means that until the user\'s consent is received, only non-identifying information will be sent. To learn more about consent mode, please read' mod='ganalyticspro'}&nbsp;<a class="badge badge-info" href="{$smarty.const._GAP_BT_FAQ_MAIN_URL|escape:'htmlall':'UTF-8'}{$sFaqLang|escape:'htmlall':'UTF-8'}/faq/471" target="_blank"><i class="icon icon-link"/></i>&nbsp;{l s='this FAQ' mod='ganalyticspro'}</a>
        </div>

		<div class="clr_20"></div>

        <div class="form-group">
            <label class="control-label col-xs-12 col-md-3 col-lg-3"><span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='Select "Yes" to activate the consent mode' mod='ganalyticspro'}"><b>{l s='Enable consent mode?' mod='ganalyticspro'}</b></span></label>
            <div class="col-xs-12 col-md-5 col-lg-6">
                <span class="switch prestashop-switch fixed-width-lg">
                    <input type="radio" name="bt_activate_consent" id="bt_activate_consent_on" value="1" {if !empty($bActivateConsent|escape:'htmlall':'UTF-8')}checked="checked"{/if} onclick="javascript: oGap.changeSelect('consent_config', 'consent_config', null, null, true, true);"/>
                    <label for="bt_activate_consent_on" class="radioCheck">
                        {l s='Yes' mod='ganalyticspro'}
                    </label>
                    <input type="radio" name="bt_activate_consent" id="bt_activate_consent_off" value="0" {if empty($bActivateConsent|escape:'htmlall':'UTF-8')}checked="checked"{/if} onclick="javascript: oGap.changeSelect('consent_config', 'consent_config', null, null, true, false);" />
                    <label for="bt_activate_consent_off" class="radioCheck">
                        {l s='No' mod='ganalyticspro'}
                    </label>
                    <a class="slide-button btn"></a>
                </span>
                <span class="label-tooltip" data-toggle="tooltip" title data-original-title="{l s='Select "Yes" to activate the consent mode' mod='ganalyticspro'}">&nbsp;<span class="icon-question-sign"></span></span>
            </div>
        </div>

		<div class="clr_20"></div>

        <div id="consent_config" {if empty($bActivateConsent)}style="display: none;" {/if}>
            {if !empty($bPmCookieBanner)}
                <div class="alert alert-success">
                    {l s='We\'ve detected that the module "Advanced Cookie Banner" is installed. Your two modules are now synchronized to respect your visitor preferences.' mod='ganalyticspro'}
                </div>
            {else}
                <div class="alert alert-info">
                    {l s='Indicate in the option below the ID or CLASS of the button that allows your visitors to authorize the installation of cookies, and save.' mod='ganalyticspro'}
                    <br/>
                    {l s='For a complete management of your visitors\' consent regarding cookies, discover' mod='ganalyticspro'}&nbsp;<a href="https://addons.prestashop.com/{$sFaqLang|escape:'htmlall':'UTF-8'}/24853-advanced-cookie-banner-loi-cookies-mars-2021-cnil-rgpd.html">{l s='Advanced Cookie Banner' mod='ganalyticspro'}</a>
                </div>

		    <div class="clr_20"></div>

                <div class="form-group">
                    <label class="control-label col-xs-12 col-sm-12 col-md-5 col-lg-3">
                        <span>
                            <strong>{l s='HTML element of the button that allows cookies' mod='ganalyticspro'}</strong>
                        </span>
                    </label>
                    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-2">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="icon-link"></i></span>
                            <input type="text" id ="bt_accept_element-id" name="bt_accept_element-id" size="35" value="{if !empty($sAcceptElement)}{$sAcceptElement|escape:'htmlall':'UTF-8'}{/if}" placeholder="# for id and . for class" />
                        </div>
                        <p class="help-block">{l s='Don\'t forget to enter a "#" for an id and a "." for a class' mod='ganalyticspro'}</p>
                    </div>
                </div>
            {/if}
        </div>


    
		<div class="clr_10"></div>
		<div class="clr_hr"></div>
		<div class="clr_10"></div>

		<div class="center">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-11 col-lg-11">
					<div id="bt_error-consent"></div>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-1 col-lg-1">
					<button  class="btn btn-default pull-right" onclick="oGap.form('bt_consent_form', '{$sURI|escape:'htmlall':'UTF-8'}', null, 'bt_consent_settings', 'bt_consent_settings', false, false, null, 'consent', 'consent');return false;"><i class="process-icon-save"></i>{l s='Save' mod='ganalyticspro'}</button>
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