<div class="w-100">
  <div class="col-12">
    <div class="card row">
      <div class="card-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        Adres van klant en ingevoerde postcode komen niet overeen.
      </div>
      <div class="card-body">
        <div class="row mt-3 border-bottom">
          <p class="col-12"><b>Ingevuld door klant:</b><span class="large-text"> {$klant_straat}, {$postcode} {$klant_plaats}</span></p>
        </div>
        <div class="row mt-3 border-bottom">
          <div class="col-12">
            <b>Straat en woonplaats, bij postcode:</b>
            <ul id="street-list">
              {foreach from=$addresses key=ix item=adres}
                <li class="large-text">
                  <a href="#" class="text-decoration-none insert-address" data-rowid="{$ix}">
                    <span class="insert-address-street" data-rowid="{$ix}">{if isset($adres.straat)}{$adres.straat}{else}{$adres->straat}{/if}</span>
                    <span class="insert-address-city" data-rowid="{$ix}">{if isset($adres.plaats)}{$adres.plaats}{else}{$adres->plaats}{/if}</span>
                  </a>
                </li>
              {/foreach}
            </ul>
          </div>
        </div>
        <div class="row mt-5"><div class="col-12"><b>Pas het adres aan</b></div></div>
        <form class="mt-2" method="post" id="updateAddressKoopman">
          {foreach from=$get_params key=key item=value}
            <input type="hidden" name="{$key}" value="{$value}"/>
          {/foreach}
          <input type="hidden" name="updateAddress" value="1">
          <div class="row mb-3">
            <div class="col-6">
              <div class="form-floating">
                <input type="text" class="form-control address-input-text" name="address1" id="address1" placeholder="Straat naam" value="{$default_street}">
                <label for="address1">Straat</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <input type="text" class="form-control address-input-text" name="house_number" id="house_number" placeholder="Huisnummer" value="{$house_number}">
                <label for="house_number">Huis Nr.</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-floating">
                <input type="text" class="form-control address-input-text" name="house_number_extension" id="house_number_extension" placeholder="Toevoeging" value="{$house_number_extension}">
                <label for="house_number_extension">Toev.</label>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-5">
              <div class="form-floating">
                <input type="text" class="form-control address-input-text" name="postcode" id="postcode" placeholder="Postcode" value="{$default_postcode}">
                <label for="postcode">Postcode</label>
              </div>
            </div>
            <div class="col-7">
              <div class="form-floating">
                <input type="text" class="form-control address-input-text" name="city" id="city" placeholder="Stad" value="{$default_city}">
                <label for="city">Stad</label>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12">
              <button type="button" class="btn btn-lg btn-success w-100 updateAddress">Wijzig adres & print label</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
