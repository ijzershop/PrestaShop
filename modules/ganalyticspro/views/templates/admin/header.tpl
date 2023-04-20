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

<link rel="stylesheet" type="text/css" href="{$moduleCssPath}admin.css">
<link rel="stylesheet" type="text/css" href="{$moduleCssPath}font-awesome.css">
<link rel="stylesheet" type="text/css" href="{$moduleCssPath|escape:'htmlall':'UTF-8'}toastr.min.css">
<script type="text/javascript" src="{$moduleJsPath}module.js"></script>
<script type="text/javascript" src="{$moduleJsPath|escape:'htmlall':'UTF-8'}toastr.js"></script>

<script type="text/javascript">
	// instantiate object
	var oGap = oGap || new GapModule('{$sModuleName|escape:'htmlall':'UTF-8'}');

	{if !empty($oJsTranslatedMsg)}
	// get errors translation
	oGap.msgs = {$oJsTranslatedMsg};
	{/if}

	// set URL of admin img
	oGap.sImgUrl = '{$imagePath|escape:'htmlall':'UTF-8'}';

	{if !empty($sModuleURI)}
	// set URL of module's web service
	oGap.sWebService = '{$sModuleURI|escape:'htmlall':'UTF-8'}';
	{/if}
</script>