<div class="form-group row">
	<label class="form-control-label" for="second_name">
		<span class="label-tooltip">
			{l s='Second name for showing on category page' mod='displaybocategorytopdescription'}
		</span>
	</label>
	<div class="col-sm">
		<input type="text" width="100%" class="form-control" id="second_name" name="second_name" value="{$second_name}" />
	</div>
</div>

<div class="form-group row">
	<label class="form-control-label" for="top_description">
		<span class="label-tooltip">
			{l s='Header Omschrijving' mod='displaybocategorytopdescription'}
		</span>
	</label>
	<div class="col-sm">
		<textarea width="100%" rows="10" class="autoload_rte form-control" id="top_description" name="top_description">{$top_description nofilter}</textarea>
	</div>
</div>
