<form id="retourForm">
	<input type="hidden" name="order_id" value="{$id_order}">
	<input type="hidden" name="order_reference" value="{$order->reference}">
  <h3 class="col-12">Maak nieuwe retour opdracht aan voor {$order->reference}</h3>
  <div class="col-12 bg-info card">
    <address class="card-body">
      <b>Geleverd op adres</b><br/>
        {ucwords($data['delivery_address']->firstname)} {ucwords($data['delivery_address']->lastname)}<br>
      {$data['delivery_address']->address1} {$data['delivery_address']->house_number}{$data['delivery_address']->house_number_extension}<br>
      {$data['delivery_address']->city}<br>
      {$data['delivery_address']->country}<br>
      Tel: {$data['delivery_address']->phone}<br>
    </address>
  </div>
  <div class="messages"></div>
  <br>
  <div class="col-12 p-0">
    <div class="col-12">
      <label for="">Verzonden Paketten</label>
        {foreach from=$data['packages'] item=package key=index}
        <div data-collo="{$package['nr_collo']}" data-length="{$package['length']}" data-width="{$package['width']}" data-height="{$package['height']}" data-weight="{$package['weight']}">
          <strong>Col. {$package['nr_collo']}:</strong> <i>{strtoupper($package['shipping_number'])}</i> |
          {if $package['length'] != ""}<small>Lengte {$package['length']}cm </small>{/if} {if $package['width'] != ""}<small>Breedte {$package['width']}cm</small>{/if} {if $package['height'] != ""}<small>{$package['height']}cm</small>{/if} {if $package['weight'] != ""}<small>á {$package['weight']}kg</small>{/if}</div>
        {/foreach}
      <br/>
    </div>
      <div class="col-12">
        <button type="button" class="w-100 btn btn-warning" id="addNewCollie">Voeg nieuw pakket toe</button>
        <br>
        <br>
        <table style="width:100%" id="new_collies">

        </table>
      </div>
      <div class="col-12">
        <table style="width:100%;margin-top:20px;" border="1px">
          <thead>
            <tr>
              <th style="text-align: left">Product</th>
              <th style="text-align:center">Aantal</th>
              <th style="text-align:center">Stuk</th>
              <th style="text-align:center">Totaal</th>
              <th style="text-align:center">Terugbetaald</th>
            </tr>
          </thead>
          {foreach from=$data['products'] item=product}
          <tr>
            <td>
              <strong>
                <a> {if strpos($product['name'], "- Knippen" )> 0}
                  {substr($product['name'], 0, strpos($product['name'], "- Knippen"))}
                  {/if}
                  {if strpos($product['name'], "- Zagen") > 0}
                  {substr($product['name'], 0, strpos($product['name'], "- Zagen"))}
                  {/if}
                </a>
              </strong>
              <br />
              {if $product['customization']}
              <table class="w-100 table mb-0">
                {foreach from=$product['customization'] item="customization"}
                <tr class="bg-transparent">
                  <td class="border-0 p-0">
                    {$customization}
                  </td>
                </tr>
                {/foreach}
              </table>
              {/if}
            </td>
            <td style="text-align:center">
              {$product['qty']}x
            </td>
            <td style="text-align:center">
              {Context::getContext()->currentLocale->formatPrice($product['unit_price'] , 'EUR')}
            </td>
            <td style="text-align:center">{Context::getContext()->currentLocale->formatPrice($product['price'], 'EUR')}</td>
            <td style="text-align:center"><span	style="color:green;">{$product['refunded']}</span>/<span>{$product['qty']}</span></td>
          </tr>
          {/foreach}
        </table>
      </div>
    </div>
  </div>
  <div class="col-12">
    <button style="width:100%;" class="btn btn-sm btn-success saveRetourRequest">Retour aanmaken</button>
  </div>
</form>

<script type="text/javascript">
  // Constants for package dimensions
  const VOLUME_MULTIPLIER = 250;
  const ENVELOPE_LENGTH = 0.3;
  const ENVELOPE_WIDTH = 0.21;
  const MIN_ENVELOPE_HEIGHT = 0.01;

  const PLAAT_LENGTH = 1.0;
  const PLAAT_WIDTH = 0.5;
  const MIN_PLAAT_HEIGHT = 0.005;

  const METER_LENGTH = 1.0;
  const METER_WIDTH = 0.3;
  const MIN_METER_HEIGHT = 0.3;

  const METER_2_LENGTH = 2.0;
  const METER_2_WIDTH = 0.3;
  const MIN_METER_2_HEIGHT = 0.3;

  // Function to check and fix weight
  function checkFixWeight(weight) {
    weight = parseFloat(weight);
    if (isNaN(weight) || weight <= 0) {
      return 0;
    }
    return weight;
  }

  // Calculate volume size by weight in centimeters
  function calculateVolumeSize(weight, type) {
    weight = checkFixWeight(weight);
    if (!['envelope', 'plaat', '1-meter', '2-meter', 'pallet'].includes(type)) {
      type = 'collie';
    }
    if (weight <= 0) {
      return 0;
    }

    let volumeHeight = 0;
    let volumeWidth = 0;
    let packageSize = {
      'width': 0,
      'height': 0,
      'length': 0,
      'weight': 0,
      'formula': '',
    };

    switch (type) {
      case 'envelope':
        volumeHeight = weight / (ENVELOPE_LENGTH * ENVELOPE_WIDTH * VOLUME_MULTIPLIER);
        volumeWidth = ENVELOPE_WIDTH;
        // Add check for minimum height and recalculate width if needed
        if (volumeHeight < MIN_ENVELOPE_HEIGHT) {
          volumeHeight = MIN_ENVELOPE_HEIGHT;
          volumeWidth = weight / (ENVELOPE_LENGTH * MIN_ENVELOPE_HEIGHT * VOLUME_MULTIPLIER);
        }
        packageSize.width = volumeWidth * 100;
        packageSize.height = volumeHeight * 100;
        packageSize.length = ENVELOPE_LENGTH * 100;
        packageSize.volumeMultiplier = VOLUME_MULTIPLIER;
        packageSize.weight = weight;
        packageSize.volumeSize = (ENVELOPE_LENGTH * 100).toString() +
          ' x ' + Math.round(volumeWidth * 100).toString() +
          ' x ' + Math.round(volumeHeight * 100).toString() + '';
        packageSize.formula = ENVELOPE_LENGTH.toString() + ' x ' + volumeWidth.toString() + ' x ' + volumeHeight.toFixed(4).toString() + ' x ' + VOLUME_MULTIPLIER.toString();
        break;

      case 'plaat':
        volumeHeight = weight / (PLAAT_LENGTH * PLAAT_WIDTH * VOLUME_MULTIPLIER);
        volumeWidth = PLAAT_WIDTH;
        // Add check for minimum height and recalculate width if needed
        if (volumeHeight < MIN_PLAAT_HEIGHT) {
          volumeHeight = MIN_PLAAT_HEIGHT;
          volumeWidth = weight / (PLAAT_LENGTH * MIN_PLAAT_HEIGHT * VOLUME_MULTIPLIER);
        }
        packageSize.width = volumeWidth * 100;
        packageSize.height = volumeHeight * 100;
        packageSize.length = PLAAT_LENGTH * 100;
        packageSize.volumeMultiplier = VOLUME_MULTIPLIER;
        packageSize.weight = weight;
        packageSize.volumeSize = (PLAAT_LENGTH * 100).toString() +
          ' x ' + Math.round(volumeWidth * 100).toString() +
          ' x ' + Math.round(volumeHeight * 100).toString() + '';
        packageSize.formula = PLAAT_LENGTH.toString() + ' x ' + volumeWidth.toString() + ' x ' + volumeHeight.toFixed(4).toString() + ' x ' + VOLUME_MULTIPLIER.toString();
        break;

      case '1-meter':
        volumeHeight = weight / (METER_LENGTH * METER_WIDTH * VOLUME_MULTIPLIER);
        volumeWidth = METER_WIDTH;
        // Add check for minimum height and recalculate width if needed
        if (volumeHeight < MIN_METER_HEIGHT) {
          volumeHeight = MIN_METER_HEIGHT;
          volumeWidth = weight / (METER_LENGTH * MIN_METER_HEIGHT * VOLUME_MULTIPLIER);
        }
        packageSize.width = volumeWidth * 100;
        packageSize.height = volumeHeight * 100;
        packageSize.length = METER_LENGTH * 100;
        packageSize.volumeMultiplier = VOLUME_MULTIPLIER;
        packageSize.weight = weight;
        packageSize.volumeSize = (METER_LENGTH * 100).toString() +
          ' x ' + Math.round(volumeWidth * 100).toString() +
          ' x ' + Math.round(volumeHeight * 100).toString() + '';
        packageSize.formula = METER_LENGTH.toString() + ' x ' + volumeWidth.toString() + ' x ' + volumeHeight.toFixed(4).toString() + ' x ' + VOLUME_MULTIPLIER.toString();
        break;

      case '2-meter':
        volumeHeight = weight / (METER_2_LENGTH * METER_2_WIDTH * VOLUME_MULTIPLIER);
        volumeWidth = METER_2_WIDTH;
        // Add check for minimum height and recalculate width if needed
        if (volumeHeight < MIN_METER_2_HEIGHT) {
          volumeHeight = MIN_METER_2_HEIGHT;
          volumeWidth = weight / (METER_2_LENGTH * MIN_METER_2_HEIGHT * VOLUME_MULTIPLIER);
        }
        packageSize.width = volumeWidth * 100;
        packageSize.height = volumeHeight * 100;
        packageSize.length = METER_2_LENGTH * 100;
        packageSize.volumeMultiplier = VOLUME_MULTIPLIER;
        packageSize.weight = weight;
        packageSize.volumeSize = (METER_2_LENGTH * 100).toString() +
          ' x ' + Math.round(volumeWidth * 100).toString() +
          ' x ' + Math.round(volumeHeight * 100).toString() + '';
        packageSize.formula = METER_2_LENGTH.toString() + ' x ' + volumeWidth.toString() + ' x ' + volumeHeight.toFixed(4).toString() + ' x ' + VOLUME_MULTIPLIER.toString();
        break;

      case 'pallet':
      case 'balk-pallet':
      case 'plaat-pallet':
        // Default pallet dimensions
        packageSize.width = 80;
        packageSize.height = Math.max(20, weight * 0.5);
        packageSize.length = 120;
        packageSize.weight = weight;

        if (type === 'plaat-pallet') {
          packageSize.width = 100;
          packageSize.length = 200;
          packageSize.height = Math.max(10, weight * 0.3);
        }
        break;

      default:
        // Default calculation for collie
        const volume = weight * VOLUME_MULTIPLIER;
        packageSize.length = 40;
        packageSize.width = 30;
        packageSize.height = volume / (packageSize.length * packageSize.width);
        packageSize.weight = weight;
        break;
    }

    return packageSize;
  }

  // Add event handler for weight and type changes
  $(document).on('change', '.collie-type, .collie-weight', function() {
    const row = $(this).closest('.parentRow');
    const type = row.find('.collie-type').val();
    const weightInput = row.find('.collie-weight');
    const lengthInput = row.find('.collie-length');
    const widthInput = row.find('.collie-width');
    const heightInput = row.find('.collie-height');

    const weight = parseFloat(weightInput.val()) || 0;

    if (weight > 0) {
      // Calculate dimensions based on weight and type
      const packageSize = calculateVolumeSize(weight, type);

      // Update dimension fields
      lengthInput.val(Math.round(packageSize.length));
      widthInput.val(Math.round(packageSize.width));
      heightInput.val(Math.round(packageSize.height));
    }
  });

  // Update the package type dropdown in the addNewCollie function
  $(document).on('click','#addNewCollie', function(elem){
    $('#new_collies').append("<tr class=\"parentRow\"> <td style=\"border-top:1px dotted #000;padding:5px 0px;\"> <table style=\"width:100%;\"> <tr> <td style=\"padding:4px;\"> <label>Type</label> <select class=\"form-control collie-type\" name=\"collie_type[]\" width=\"100%\"> <option value=\"envelope\">Enveloppe (1kg)</option> <option value=\"plaat\">Plaat</option> <option value=\"1-meter\">1-meter pakket</option> <option value=\"2-meter\">2-meter pakket</option> <option value=\"pallet\">Standaard pallet</option> <option value=\"balk-pallet\">Balk pallet</option> <option value=\"plaat-pallet\">Plaat pallet</option> </select> </td><td style=\"padding:4px;\"> <label>Aantal</label> <input class=\"form-control\" value=\"1\" type=\"number\" min=\"1\" step=\"1\" name=\"collie_total[]\" width=\"100%\"/> </td><td style=\"padding:4px;\"> <label>Referentie</label> <input class=\"form-control\" value=\"{$order->reference}\" type=\"text\" name=\"collie_reference[]\" width=\"100%\"/> </td></tr><tr> <td style=\"padding:4px;\"> <label>Lengte</label> <input class=\"form-control collie-length\" type=\"number\" min=\"1\" step=\"0.5\" name=\"collie_length[]\" width=\"100%\"/> </td><td style=\"padding:4px;\"> <label>Breedte</label> <input class=\"form-control collie-width\" type=\"number\" min=\"1\" step=\"0.5\" name=\"collie_width[]\" width=\"100%\"/> </td><td style=\"padding:4px;\"> <label>Hoogte</label> <input class=\"form-control collie-height\" type=\"number\" min=\"1\" step=\"0.5\" name=\"collie_height[]\" width=\"100%\"/> </td></tr><tr> <td style=\"padding:4px;\"> <label>Gewicht</label> <input class=\"form-control collie-weight\" type=\"number\" min=\"1\" step=\"0.5\" name=\"collie_weight[]\" width=\"100%\"/> </td><td colspan='2' style=\"padding:4px;\"> <label>&nbsp;</label> <button type=\"button\" class=\"w-100 btn btn-danger removeCollieRow\" width=\"100%\">Verwijder</button> </td></tr></table> </td></tr>");
  });

  $(document).on('click', '.removeCollieRow', function (elem){
    $(this).closest('.parentRow').remove();
  });

  // Initialize dimensions for existing collies
  $(document).ready(function() {
    // Set default values for any pre-existing collies
    $('.collie-weight').trigger('change');
  });


</script>
