<div class="w-100">
  <div class="col-12">
    <div class="card row">
      <div class="card-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        Wijzig het adres van deze bestelling
      </div>
      <div class="card-body">
        <p class="card-text">{$error_message}. Controleer en wijzig het adres.</p>
        <br/>
        <form id="updateAddressKoopman">
          {foreach from=$get_params key=key item=value}
            <input type='hidden' name='{$key}' value='{$value}'/>
          {/foreach}
          <input type="hidden" name="updateAddress" value="1">
          <div class="row mb-3">
            <div class="col-6">
              <div class="form-floating">
                <input type="text" class="form-control" name="address1" id="address1" placeholder="Straat naam" value="{$address1}">
                <label for="address1">Straat</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <input type="text" class="form-control" name="house_number" id="house_number" placeholder="Huisnummer" value="{$house_number}">
                <label for="house_number">Huis Nr.</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <input type="text" class="form-control" name="house_number_extension" id="house_number_extension" placeholder="Toevoeging" value="{$house_number_extension}">
                <label for="house_number_extension">Toev.</label>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-5">
              <div class="form-floating">
                <input type="text" class="form-control" name="postcode" id="postcode" placeholder="Postcode" value="{$postcode}">
                <label for="postcode">Postcode</label>
              </div>
            </div>
            <div class="col-7">
              <div class="form-floating">
                <input type="text" class="form-control" name="city" id="city" placeholder="Stad" value="{$city}">
                <label for="city">Stad</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button type="button" class="btn btn-lg btn-success w-100 updateAddress">Wijzig adres & print label</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
