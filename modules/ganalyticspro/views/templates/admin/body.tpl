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

<div id='{$sModuleName|lower|escape:'htmlall':'UTF-8'}' class="bootstrap form">
	{* HEADER *}
	{include file="`$sHeaderInclude`"  bContentToDisplay=true}
	{* /HEADER *}

	{* USE CASE - module update not ok  *}
	{if !empty($aUpdateErrors)}
		<div class="alert alert-danger">

		</div>
		{* USE CASE - display configuration ok *}
	{else}
		<div class="clr_20"></div>

		<div class="row">
			<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">

				<div id="header_bar" class="row bg-white">
					<div class="col-xs-6">
						<img class="img-responsive" src="{$imagePath|escape:'htmlall':'UTF-8'}admin/logo.png" height="57" width="57" alt="" />
					</div>
					<div class="col-xs-6">
						<img class="img-responsive pull-right" src="{$imagePath|escape:'htmlall':'UTF-8'}admin/bt_logo.jpg" width="150" style="margin-top: 5px;" alt="" />
					</div>

					<div class="clr_20"></div>
					<div class="clr_hr"></div>
					<div class="clr_20"></div>

					<div class="col-xs-12 text-center">
						<a class="btn btn-lg btn-info" target="_blank" href="{$sFaqURL|escape:'htmlall':'UTF-8'}/faq/476"><span class="icon icon-book"></span>&nbsp;{l s='How to configure the module?' mod='ganalyticspro'}</a>
					</div>

					<div class="clr_20"></div>

				</div>
				<div class="clr_20"></div>

				<div class="alert alert-warning text-center">
					{l s='Data can take 24-48 hours to be displayed in Google reports' mod='ganalyticspro'}
				</div>

				<div class="list-group workTabs">
					<a class="list-group-item active" id="tab-2"><span class="icon-code"></span>&nbsp;{l s='Google Analytics 4 tracking' mod='ganalyticspro'}</a>
					<a class="list-group-item" id="tab-3"><span class="icon-plus"></span>&nbsp;{l s='Advanced settings' mod='ganalyticspro'}</a>
					<a class="list-group-item" id="tab-4"><span class="fa fa-check"></span>&nbsp;{l s='Consent mode' mod='ganalyticspro'}</a>
				</div>

				{*more tools*}
				<div class="list-group">
					<a class="list-group-item" target="_blank" href="https://analytics.google.com/analytics/web/"><span class="fa fa-signal"></span>&nbsp;&nbsp;{l s='My Google Analytics account' mod='ganalyticspro'}</a>
					<a class="list-group-item" target="_blank" href="https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna?hl=fr"><span class="icon icon-link"></span>&nbsp;&nbsp;{l s='Google Analytics Debugger' mod='ganalyticspro'}</a>
					<a class="list-group-item" target="_blank" href="{$sFaqURL|escape:'htmlall':'UTF-8'}{$sFaqLang|escape:'htmlall':'UTF-8'}/product/69"><span class="icon-info-circle"></span>&nbsp;&nbsp;{l s='Online FAQ' mod='ganalyticspro'}</a>
					<a class="list-group-item" target="_blank" href="{$sContactUs|escape:'htmlall':'UTF-8'}"><span class="icon-user"></span>&nbsp;&nbsp;{l s='Contact support' mod='ganalyticspro'}</a>
				</div>

				{* rate *}
				<div class="list-group">
					<a class="list-group-item" target="_blank" href="{$sRateUrl|escape:'htmlall':'UTF-8'}"><i class="icon-star" style="color: #fbbb22;"></i>&nbsp;&nbsp;{l s='Rate me' mod='ganalyticspro'}</a>
				</div>

				{*module version*}
				<div class="list-group">
					<a class="list-group-item" href="#"><span class="icon icon-info"></span>&nbsp;&nbsp;{l s='Version' mod='ganalyticspro'} : {$sModuleVersion}</a>
				</div>
			</div>

			<div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
				{*START TAB CONTENT*}
				<div class="tab-content">


					{* G4 SETTINGS *}
					<div id="content-tab-2" class="tab-pane panel in active information">
						<div id="bt_gfour_settings">
							{if !empty($bMultiShop)}
								<div class="alert alert-danger">
									{l s='Attention: you cannot configure the module in a "all shops" or "group of shops" context. Please select only one shop to configure the module.' mod='ganalyticspro'}
								</div>
							{else}
								{if empty($bHideConfiguration)}
									{include file="`$sG4Include`"}
								{else}
									<div class="clr_20"></div>
								{/if}
							{/if}
						</div>
						<div class="clr_20"></div>
						<div id="bt_loading-div-gfour" style="display: none;">
							<div class="alert alert-info">
								<p style="text-align: center !important;"><img src="{$sLoadingImg|escape:'htmlall':'UTF-8'}" alt="Loading" /></p>
								<div class="clr_20"></div>
								<p style="text-align: center !important;">{l s='The update of your configuration is in progress...' mod='ganalyticspro'}</p>
							</div>
						</div>
					</div>
					{* END G4 SETTINGS *}

					{* START ADVANCED SETTINGS *}
					<div id="content-tab-3" class="tab-pane panel">
						{if !empty($bMultiShop)}
							<div class="alert alert-danger">
								{l s='Attention: you cannot configure the module in a "all shops" or "group of shops" context. Please select only one shop to configure the module.' mod='ganalyticspro'}
							</div>
						{else}
							<div id="bt_advanced-settings">
								{if empty($bHideConfiguration)}
									{include file="`$sAdvancedInclude`"}
								{else}
									<div class="clr_20"></div>
								{/if}
							</div>
						{/if}
						<div class="clr_20"></div>
						<div id="bt_loading-div-advanced" style="display: none;">
							<div class="alert alert-info">
								<p style="text-align: center !important;"><img src="{$sLoadingImg|escape:'htmlall':'UTF-8'}" alt="Loading" /></p>
								<div class="clr_20"></div>
								<p style="text-align: center !important;">{l s='The update of your configuration is in progress...' mod='ganalyticspro'}</p>
							</div>
						</div>
					</div>
					{* END ADVANCED SETTINGS *}

					{* START CONSENT SETTINGS *}
					<div id="content-tab-4" class="tab-pane panel">
						{if !empty($bMultiShop)}
							<div class="alert alert-danger">
								{l s='Attention: you cannot configure the module in a "all shops" or "group of shops" context. Please select only one shop to configure the module.' mod='ganalyticspro'}
							</div>
						{else}
							<div id="bt_consent_settings">
								{if empty($bHideConfiguration)}
									{include file="`$sConsentInclude`"}
								{else}
									<div class="clr_20"></div>
								{/if}
							</div>
						{/if}
						<div class="clr_20"></div>
						<div id="bt_loading-div-consent" style="display: none;">
							<div class="alert alert-info">
								<p style="text-align: center !important;"><img src="{$sLoadingImg|escape:'htmlall':'UTF-8'}" alt="Loading" /></p>
								<div class="clr_20"></div>
								<p style="text-align: center !important;">{l s='The update of your configuration is in progress...' mod='ganalyticspro'}</p>
							</div>
						</div>
					</div>
					{* END CONSENT SETTINGS *}
				</div>
				{*END TAB CONTENT*}
			</div>
		</div>




		{literal}
			<script type="text/javascript">
				$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
					e.target // activated tab
					e.relatedTarget // previous tab
				});

				$(document).ready(function() {
					$('#content').removeClass('nobootstrap');
					$('#content').addClass('bootstrap');
					$(".workTabs a").click(function(e) {
						e.preventDefault();
						// currentId is the current workTabs id
						var currentId = $(".workTabs a.active").attr('id').substr(4);
						// id is the wanted workTabs id
						var id = $(this).attr('id').substr(4);

						if ($(this).attr("id") != $(".workTabs a.active").attr('id')) {
							$(".workTabs a[id='tab-" + currentId + "']").removeClass('active');
							$("#content-tab-" + currentId).hide();
							$(".workTabs a[id='tab-" + id + "']").addClass('active');
							$("#content-tab-" + id).show();
						}
					});
					$(".workTabs a.active").click();

					$('.label-tooltip, .help-tooltip').tooltip();
					$('.dropdown-toggle').dropdown();
					{/literal}
						{if !empty($bDisplayAdvice)}
							{literal}
								$("a#bt_disp-advice").fancybox({
									'hideOnContentClick': false
								});
								$('#bt_disp-advice').trigger('click');
								{/literal}{/if}{literal}
							});
						</script>
					{/literal}
				{/if}
			</div>