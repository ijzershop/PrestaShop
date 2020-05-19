<form action="{$action}" id="payment-form" class="additional-information">
		<div class="form-group row">
			<div class="col-md-12">
				<p>
					Mit giropay zahlen Sie einfach, schnell und sicher im Online-Banking Ihrer teilnehmenden Bank oder Sparkasse. Sie werden direkt zum Online-Banking Ihrer Bank weitergeleitet, wo Sie die Überweisung durch Eingabe von PIN und TAN freigeben.
				</p>
			</div>
		</div>

		<div class="form-group row">
			<label class="col-md-2 form-control-label required">
				Ihre Bank
			</label>
			<div class="col-md-6">
				<input type="text" class="form-control" id="giropay_bic" name="giropay_bic" autocomplete="off" value="" onkeyup="girocheckout_widget(this, event, 'bic', '0')">
				<small>(Suchen Sie nach Bankname, BLZ, Ort oder BIC.)</small>
			</div> 
		</div>  
		
	<input type="hidden" name="payment" value="giropay"/>
	<input type="hidden" name="fc" value="module"/>
	<input type="hidden" name="module" value="sisow"/>
	<input type="hidden" name="controller" value="payment"/>
</form>