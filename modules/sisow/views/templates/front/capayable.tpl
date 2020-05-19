<form action="{$action}" id="payment-form" class="additional-information">
	<p>
		Je betaalt de  bestelling in drie gelijke termijnen. De eerste termijn betaal je nu direct via iDEAL. Van Capayable ontvang je vervolgens een iDEAL link voor de tweede (dag 30) en derde (dag 60) termijn.
	<p>
		<div class="form-group row">
			<label class="col-md-3 form-control-label required">
				Geslacht
			</label>
			<div class="col-md-6">
				<select class="form-control form-control-select" name="capayable_gender" id="capayable_gender" required>
					<option value="">{l s='Please choose'}</option>
					<option value="m">{l s='Male'}</option>
					<option value="f">{l s='Female'}</option>
				</select>
			</div> 
		</div> 

		<div class="form-group row">
			<label class="col-md-3 form-control-label required">
				Telefoonnummer
			</label>
			<div class="col-md-6">
				<input type="text" class="form-control" autocomplete="off" id="capayable_phone" name="capayable_phone" required="required">
			</div> 
		</div> 
		
		<div class="form-group row">
			<label class="col-md-3 form-control-label required">
				Geboortedatum
			</label>
			<div class="row">
				<div class="col-md-8">
					<div class="col-md-4">
						<select class="form-control form-control-select" name="capayable_day" id="capayable_day" required>
							<option value="">{l s='Day'}</option>
							{for $day=1 to 31}
								<option value="{$day|string_format:"%02d"}">{$day|string_format:"%02d"}</option>
							{/for}
						</select>
					</div> 
					<div class="col-md-4">
						<select class="form-control form-control-select" name="capayable_month" id="capayable_month" required>
							<option value="">{l s='Month'}</option>
							<option value="01">{l s='January'}</option>
							<option value="02">{l s='February'}</option>
							<option value="03">{l s='March'}</option>
							<option value="04">{l s='April'}</option>
							<option value="05">{l s='May'}</option>
							<option value="06">{l s='June'}</option>
							<option value="07">{l s='July'}</option>
							<option value="08">{l s='August'}</option>
							<option value="09">{l s='September'}</option>
							<option value="10">{l s='October'}</option>
							<option value="11">{l s='November'}</option>
							<option value="12">{l s='December'}</option>
						</select>
					</div> 
					<div class="col-md-4">
						<select class="form-control form-control-select" name="capayable_year" id="capayable_year">
							<option value="">{l s='Year'}</option>
							{for $year = ('Y'|date - 17) to ('Y'|date - 120) step -1}
								<option value="{$year}">{$year}</option>
							{/for}
						</select>
					</div> 
				</div>
			</div> 
		</div> 

	<input type="hidden" name="payment" value="capayable"/>
	<input type="hidden" name="fc" value="module"/>
	<input type="hidden" name="module" value="sisow"/>
	<input type="hidden" name="controller" value="payment"/>
</form>