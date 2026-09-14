<div class="w-100">
  <div class="col-12">
    <div class="card row">
      <div class="card-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close"><span aria-hidden="true"></span></button>
        Adres van klant en ingevoerde postcode komen niet overeen.
      </div>
      <div class="card-body">
        <div class="row mt-3 border-bottom">
          <p class="col-12"><b>Ingevuld door klant:</b><span class="large-text"> {$klant_straat}, {$postcode} {$klant_plaats}</span></p>
        </div>
        <div class="row mt-3 border-bottom">
          <div class="col-12">
            <div class="form-group">
              <label for="postalcode">Postcode</label>
              <select id="postalcode" name="postalcode" class="form-control">
                <option value="">Select postcode</option>
              </select>
            </div>

            <div class="form-group">
              <label for="street">Street</label>
              <select id="street" name="street" class="form-control">
                <option value="">Select street</option>
              </select>
              <small id="house_numbers_help" class="form-text text-muted"></small>
            </div>

            <div class="form-group">
              <label for="city">City</label>
              <select id="city" name="city" class="form-control">
                <option value="">Select city</option>
              </select>
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

<script type="text/javascript">
    // Get the encoded data and decode HTML entities first
    var encodedData = '{$suggestions|json_encode|escape:'javascript'}';
    var decodedData = encodedData.replace(/&quot;/g, '"');
    var addressData;


    addressData = JSON.parse(decodedData);
console.log(decodedData, addressData);

    var postalcodeSelect = document.getElementById('postalcode');
    var streetSelect = document.getElementById('street');
    var citySelect = document.getElementById('city');
    var houseNumbersHelp = document.getElementById('house_numbers_help');

    // Initialize postal codes
    if (addressData.postcode) {
        addressData.postcode.forEach(function(item) {
            if (item.value) {
                var option = new Option(item.label, item['data-postcode']);
                postalcodeSelect.add(option);
            }
        });
    }

    // Initialize streets
    if (addressData.street) {
        addressData.street.forEach(function(item) {
            var option = new Option(item.label, item.value);
            option.setAttribute('data-postcode', item['data-postcode']);
            option.setAttribute('data-city', item['data-city']);
            option.setAttribute('data-house-numbers', item['data-house_numbers']);
            streetSelect.add(option);
        });
    }

    // Initialize cities
    if (addressData.city) {
        addressData.city.forEach(function(item) {
            var option = new Option(item.label, item.value);
            option.setAttribute('data-postcode', item['data-postcode']);
            citySelect.add(option);
        });
    }

    // Event handlers
    postalcodeSelect.addEventListener('change', function() {
        var selectedPostcode = this.value;

        // Filter streets
        Array.from(streetSelect.options).forEach(function(option) {
            var postcodes = option.getAttribute('data-postcode') || '';
            var show = !selectedPostcode || postcodes.includes(selectedPostcode);
            option.style.display = show ? '' : 'none';
        });

        // Filter cities
        Array.from(citySelect.options).forEach(function(option) {
            var show = !selectedPostcode || option.getAttribute('data-postcode') === selectedPostcode;
            option.style.display = show ? '' : 'none';
        });

        // Reset selections
        streetSelect.value = '';
        citySelect.value = '';
        houseNumbersHelp.textContent = '';
    });

    streetSelect.addEventListener('change', function() {
        var selectedOption = this.options[this.selectedIndex];

        // Show house numbers help text
        if (selectedOption && selectedOption.getAttribute('data-house-numbers')) {
            houseNumbersHelp.textContent = 'Beschikbare huisnummers: ' +
                selectedOption.getAttribute('data-house-numbers');
        } else {
            houseNumbersHelp.textContent = '';
        }

        // Filter cities based on selected street
        var selectedCity = selectedOption ? selectedOption.getAttribute('data-city') : '';
        Array.from(citySelect.options).forEach(function(option) {
            var show = !selectedCity || option.value === selectedCity;
            option.style.display = show ? '' : 'none';
        });

        // Auto-select city if there's only one match
        if (selectedCity) {
            citySelect.value = selectedCity;
        }
    });

    // Pre-select values if they exist
    var defaultPostcode = '{$default_postcode|escape:'javascript'}';
    var defaultStreet = '{$default_street|escape:'javascript'}';
    var defaultCity = '{$default_city|escape:'javascript'}';

    if (defaultPostcode) {
        postalcodeSelect.value = defaultPostcode;
        postalcodeSelect.dispatchEvent(new Event('change'));
    }
    if (defaultStreet) {
        streetSelect.value = defaultStreet;
        streetSelect.dispatchEvent(new Event('change'));
    }
    if (defaultCity) {
        citySelect.value = defaultCity;
    }

</script>
