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
  <div class="col-12 mb-2">
    <br>
    <label>Bericht aan chaufeur</label>
      <textarea class="form-control w-100" name="order_msg" rows="10" maxlength="200"></textarea>
  </div>
  <div class="col-12">
    <button style="width:100%;" class="btn btn-sm btn-success saveRetourRequest">Retour aanmaken</button>
  </div>
</form>

<script type="text/javascript">
  $(document).on('click','#addNewCollie', function(elem){
      $('#new_collies').append("<tr class=\"parentRow\"> <td style=\"border-top:1px dotted #000;padding:5px 0px;\"> <table style=\"width:100%;\"> <tr> <td style=\"padding:4px;\"> <label>Type</label> <select class=\"form-control\" name=\"collie_type[]\" width=\"100%\"> <option value=\"5\">15 - 30kg standaardpakket</option> <option value=\"4\">3 - 14kg standaardpakket</option> <option value=\"42\">3kg</option> <option value=\"41\">Enveloppe 1kg</option> <option value=\"388\">Minipallet tot 2 mtr</option> </select> </td><td style=\"padding:4px;\"> <label>Aantal</label> <input class=\"form-control\" type=\"number\" min=\"1\" step=\"1\" name=\"collie_total[]\" width=\"100%\"/> </td><td style=\"padding:4px;\"> <label>Referentie</label> <input class=\"form-control\" type=\"text\" name=\"collie_reference[]\" width=\"100%\"/> </td></tr><tr> <td style=\"padding:4px;\"> <label>Lengte</label> <input class=\"form-control\" type=\"number\" min=\"1\" step=\"0.5\" name=\"collie_length[]\" width=\"100%\"/> </td><td style=\"padding:4px;\"> <label>Breedte</label> <input class=\"form-control\" type=\"number\" min=\"1\" step=\"0.5\" name=\"collie_width[]\" width=\"100%\"/> </td><td style=\"padding:4px;\"> <label>Hoogte</label> <input class=\"form-control\" type=\"number\" min=\"1\" step=\"0.5\" name=\"collie_height[]\" width=\"100%\"/> </td></tr><tr> <td style=\"padding:4px;\"> <label>Gewicht</label> <input class=\"form-control\" type=\"number\" min=\"1\" step=\"0.5\" name=\"collie_weight[]\" width=\"100%\"/> </td><td colspan='2' style=\"padding:4px;\"> <label>&nbsp;</label> <button type=\"button\" class=\"w-100 btn btn-danger removeCollieRow\" width=\"100%\">Verwijder</button> </td></tr></table> </td></tr>")
  });

  $(document).on('click', '.removeCollieRow', function (elem){
    $(this).closest('.parentRow').remove();
  });

</script>
