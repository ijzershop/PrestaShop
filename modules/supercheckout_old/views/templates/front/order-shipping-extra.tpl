{if $conditions AND $cms_id AND $show_TOS}
<div id="supercheckout-agree">
        {* GDPR Change*}
        <input type="hidden" value="{l s='I agree to the terms of service and will adhere to them unconditionally. ' mod='supercheckout'}" name="supercheckout_default_policy" />
	<label><input type="checkbox" name="cgv" value="1" {if $checkedTOS} checked {/if}/>
        {* GDPR Change*}
	{l s='I agree to the terms of service and will adhere to them unconditionally. ' mod='supercheckout'}
	</label>
	(<a href="{$link_conditions|escape:'html':'UTF-8'}" target="_blank" class="iframe various fancybox.ajax" rel="nofollow">{l s='Read the term of services' mod='supercheckout'}</a>)
</div>
