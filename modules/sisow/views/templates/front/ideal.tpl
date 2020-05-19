<form action="{$action}" id="payment-form" class="additional-information">
  
	<div class="form-group row">
		<label class="col-md-2 form-control-label required">
			{l s='Bank'}
		</label>
		<div class="col-md-6">
			<select class="form-control form-control-select" name="sisow-issuer" id="sisow-issuer">
				<option value="">{l s='Please choose'}</option>
				{foreach from=$issuers key=k item=v}
				   <option value="{$k}">{$v}</option>
				{/foreach}
			</select>
		</div> 
	</div>  
	
	<input type="hidden" name="payment" value="ideal"/>
	<input type="hidden" name="fc" value="module"/>
	<input type="hidden" name="module" value="sisow"/>
	<input type="hidden" name="controller" value="payment"/>
</form>