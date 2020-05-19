<style>
.help-block
{
	color: #f7750b;
}
</style>

<div class=".v15OfferteForm">
<form id="v15_offerte" method="post">
		
	<div class="input-group col-lg-12" style="margin-top: .5em;">
		<div class="row">
			<div class="col-lg-12 col-xs-12">
				<label for="firm">Firma</label>
			</div><!-- /col-lg-6 -->
			<div class="col-lg-8 col-xs-12">
				<input type="text" class="form-control" name="firm" placeholder="Firma" value="{$v15Vars['{firm}']}" autofocus/>
			</div><!-- /col-lg-6 -->
		</div><!-- /.row -->
	</div><!-- /.input-group -->
	
	<div class="input-group col-lg-12" style="margin-top: .5em;">
		<div class="row">
			<div class="col-lg-12 col-xs-12">
				<label for="name">Naam*</label>
			</div><!-- /col-lg-6 -->
			<div class="col-lg-8 col-xs-12">
				<input type="text" class="form-control" id="name" name="name" value="{$v15Vars['{name}']}" placeholder="Voornaam Achternaam"/>
			</div><!-- /col-lg-6 -->
		</div><!-- /.row -->
	</div><!-- /.input-group -->
	
	<div class="input-group col-lg-12" style="margin-top: .5em;">
		<div class="row">
			<div class="col-lg-12 col-xs-12">
				<label for="street">Adres*</label>
			</div><!-- /col-lg-6 -->
			<div class="col-lg-8 col-xs-12">
				<div class="row">
					<div class="col-lg-8 col-xs-8">
						<input type="text" class="form-control" name="street" value="{$v15Vars['{street}']}" placeholder="Straatnaam"/>
					</div>
					<div class="col-lg-4 col-xs-4">
						<input type="text" class="form-control" name="streetnumber" value="{$v15Vars['{streetnumber}']}" placeholder="12"/>
					</div>
				</div><!-- .row -->	
			</div><!-- /col-lg-6 -->
		</div><!-- /.row -->
	</div><!-- /.input-group -->
	
	<div class="input-group col-lg-12" style="margin-top: .5em;">
		<div class="row">
			<div class="col-lg-12 col-xs-12">
				<label for="place">Postcode + Woonplaats*</label>
			</div><!-- /col-lg-6 -->
			<div class="col-lg-8 col-xs-12">
				<div class="row">
					<div class="col-lg-4 col-xs-4">
						<input type="text" class="form-control" name="postalCode" value="{$v15Vars['{postalCode}']}" placeholder="1234AB"/>
					</div>
					<div class="col-lg-8 col-xs-8">
						<input type="text" class="form-control" name="place" value="{$v15Vars['{place}']}" placeholder="Woonplaats"/>
					</div>
				</div><!-- .row -->	
			</div><!-- /col-lg-6 -->
		</div><!-- /.row -->
	</div><!-- /.input-group -->

	<div class="input-group col-lg-12" style="margin-top: .5em;">
		<div class="row">
			<div class="col-lg-12 col-xs-12">
				<label for="email">Emailadres*</label>
			</div><!-- /col-lg-6 -->
			<div class="col-lg-8 col-xs-12">
				<input type="email" class="form-control" name="email" value="{$v15Vars['{email}']}" placeholder="email@adres.nl"/>
			</div><!-- /col-lg-6 -->
		</div><!-- /.row -->
	</div><!-- /.input-group -->

	<div class="input-group col-lg-12" style="margin-top: .5em;">
		<div class="row">
			<div class="col-lg-12 col-xs-12">
				<label for="phone">Telefoonnummer*</label>
			</div><!-- /col-lg-6 -->
			<div class="col-lg-8 col-xs-12">
				<input type="tel" class="form-control" name="phone" value="{$v15Vars['{phone}']}" placeholder="012-3456789"/>
			</div><!-- /col-lg-6 -->
		</div><!-- /.row -->
	</div><!-- /.input-group -->

	<div class="input-group col-lg-12" style="margin-top: .5em;">
		<div class="row">
			<div class="col-lg-12 col-xs-12">
				<label for="mobile">Mobiele telefoonnummer</label>
			</div><!-- /col-lg-6 -->
			<div class="col-lg-8 col-xs-12">
				<input type="tel" class="form-control" name="mobile" value="{$v15Vars['{mobile}']}" placeholder="06-12345678"/>
			</div><!-- /col-lg-6 -->
		</div><!-- /.row -->
	</div><!-- /.input-group -->


	<div class="input-group col-lg-12" style="margin-top: .5em;">
		<div class="row">
			<div class="col-lg-12 col-xs-12">
				<label for="subject">Onderwerp*</label>
			</div><!-- /col-lg-6 -->
			<div class="col-lg-8 col-xs-12">
				<input type="text" class="form-control" name="subject" value="{$v15Vars['{subject}']}" placeholder="Offerteaanvraag voor .."/>
			</div><!-- /col-lg-6 -->
		</div><!-- /.row -->
	</div><!-- /.input-group -->
	
	<div class="input-group col-lg-12" style="margin-top: .5em;">
		<div class="row">
			<div class="col-lg-12 col-xs-12">
				<label for="comment">Uw vraag, opmerking</label>
			</div><!-- /col-lg-6 -->
			<div class="col-lg-12 col-xs-12">
				 <textarea class="form-control" rows="8" name="comment">{$v15Vars['{comment}']}</textarea>
			</div><!-- /col-lg-6 -->
		</div><!-- /.row -->
	</div><!-- /.input-group -->

			
	<div class="input-group col-lg-12" style="margin-top: 1em;">
		<input type="submit" value="Verstuur aanvraag" name="v15OfferteSend" class="btn btn-md"/>
	</div>

</form>
</div><!-- /.row 0-->



<script type="text/javascript">
</script>



