<form action="{$action}" id="payment-form" class="additional-information">
		<div class="form-group row">
			<div class="col-md-12">
				<p>
					Mit eps Online-Überweisung zahlen Sie einfach, schnell und sicher im Online-Banking Ihrer Bank. Im nächsten Schritt werden Sie direkt zum Online-Banking Ihrer Bank weitergeleitet, wo Sie die Zahlung durch Eingabe von PIN und TAN freigeben.
				</p>
			</div>
		</div>

		<div class="form-group row">
			<label class="col-md-2 form-control-label required">
				Ihre Bank
			</label>
			<div class="col-md-6">
				<input type="text" class="form-control" autocomplete="off" id="eps_bic" name="eps_bic" value="" onkeyup="girocheckout_widget(this, event, 'bic', '3')">
				<small>(Suchen Sie nach Bankname, BLZ, Ort oder BIC.)</small>
			</div> 
		</div>  
		
	<input type="hidden" name="payment" value="eps"/>
	<input type="hidden" name="fc" value="module"/>
	<input type="hidden" name="module" value="sisow"/>
	<input type="hidden" name="controller" value="payment"/>
</form>