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
<div class="clr_20"></div>

<div class="alert alert-danger">
	<button type="button" class="close" data-dismiss="alert">×</button>
	{foreach from=$aErrors name=condition key=nKey item=aError}
	<strong>{$aError.msg|escape:'htmlall':'UTF-8'}</strong>
	{if $bDebug == true}
	<ol>
		{if !empty($aError.code)}<li>{l s='Error code' mod='ganalyticspro'} : {$aError.code|intval}</li>{/if}
		{if !empty($aError.file)}<li>{l s='Error file' mod='ganalyticspro'} : {$aError.file|escape:'htmlall':'UTF-8'}</li>{/if}
		{if !empty($aError.line)}<li>{l s='Error line' mod='ganalyticspro'} : {$aError.line|intval}</li>{/if}
		{if !empty($aError.context)}<li>{l s='Error context' mod='ganalyticspro'} : {$aError.context|escape:'htmlall':'UTF-8'}</li>{/if}
	</ol>
	{/if}
	{/foreach}
</div>