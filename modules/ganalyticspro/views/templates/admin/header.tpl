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

<link rel="stylesheet" type="text/css" href="{$smarty.const._GAP_URL_CSS|escape:'htmlall':'UTF-8'}admin.css">
<link rel="stylesheet" type="text/css" href="{$smarty.const._GAP_URL_CSS|escape:'htmlall':'UTF-8'}font-awesome.css">
<script type="text/javascript" src="{$smarty.const._GAP_URL_JS|escape:'htmlall':'UTF-8'}module.js"></script>
<script type="text/javascript">
	// instantiate object
	var oGap = oGap || new GapModule('{$sModuleName|escape:'htmlall':'UTF-8'}');

	{if !empty($oJsTranslatedMsg)}
	// get errors translation
	oGap.msgs = {$oJsTranslatedMsg};
	{/if}

	// set URL of admin img
	oGap.sImgUrl = '{$smarty.const._GAP_URL_IMG|escape:'htmlall':'UTF-8'}';

	{if !empty($sModuleURI)}
	// set URL of module's web service
	oGap.sWebService = '{$sModuleURI|escape:'htmlall':'UTF-8'}';
	{/if}
</script>