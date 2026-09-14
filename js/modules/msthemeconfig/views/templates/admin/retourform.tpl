<form id="retourForm" method="post" action="{$retour_submit_url|escape:'html':'UTF-8'}">
  <input type="hidden" name="id_order" value="{$id_order|escape:'html':'UTF-8'}">
  <input type="hidden" name="token" value="{$retour_token|escape:'html':'UTF-8'}">
  <input type="hidden" name="request_key" value="{$retour_request_key|escape:'html':'UTF-8'}">

  <h3>Retour voor bestelling {$order->reference|escape:'html':'UTF-8'}</h3>
  {if $retour_preflight_error|default:''}
    <div class="alert alert-danger retour-preflight-error" role="alert">{$retour_preflight_error|escape:'html':'UTF-8'}</div>
  {/if}
  <div class="retour-booking-summary"{if $retour_created} hidden{/if}>
  <p>Koopman haalt de pakketten op bij de klant en brengt ze terug naar ons afzenderadres.</p>

  <div class="card mb-3">
    <address class="card-body mb-0">
      <strong>Ophaaladres</strong><br>
      {$retour_address.name|escape:'html':'UTF-8'}<br>
      {if $retour_address.company}{$retour_address.company|escape:'html':'UTF-8'}<br>{/if}
      {$retour_address.address1|escape:'html':'UTF-8'} {$retour_address.house_number|escape:'html':'UTF-8'}{$retour_address.house_number_extension|escape:'html':'UTF-8'}<br>
      {if $retour_address.address2}{$retour_address.address2|escape:'html':'UTF-8'}<br>{/if}
      {$retour_address.postcode|escape:'html':'UTF-8'} {$retour_address.city|escape:'html':'UTF-8'}<br>
      {$retour_address.country|escape:'html':'UTF-8'}<br>
      {if $retour_address.phone}Tel: {$retour_address.phone|escape:'html':'UTF-8'}{/if}
    </address>
  </div>
  </div>

  <div class="messages" role="status" aria-live="polite">
    {if $retour_message|default:''}
      <div class="alert {if $retour_blocked}alert-warning{elseif $retour_created}alert-success{else}alert-info{/if}">{$retour_message|escape:'html':'UTF-8'}</div>
    {elseif $retour_created}
      <div class="alert alert-success">Deze retour is al aangemaakt.</div>
    {/if}
  </div>
  <div class="retour-result">
    {if $retour_tracking|default:''}
      <p>Retournummer: <strong>{$retour_tracking|escape:'html':'UTF-8'}</strong></p>
    {/if}
    {foreach from=$retour_labels|default:[] item=retour_label}
      <p><a href="{$retour_label.url|escape:'html':'UTF-8'}" data-preview-url="{$retour_label.preview_url|default:''|escape:'html':'UTF-8'}" class="btn btn-outline-primary retour-label-download" target="_blank" rel="noopener">{$retour_label.label|escape:'html':'UTF-8'}</a></p>
    {/foreach}
  </div>

  <div class="retour-review-stage"{if !$retour_created} hidden{/if}
       data-return-id="{$retour_return_id|default:0|escape:'html':'UTF-8'}"
       data-send-url="{$retour_send_url|default:''|escape:'html':'UTF-8'}"
       data-notification-status="{$retour_notification.status|default:'unsent'|escape:'html':'UTF-8'}"
       data-notification-can-send="{if $retour_notification.can_send|default:false}1{else}0{/if}">
    <h4>Retourlabel controleren</h4>
    <div class="retour-preview-content"></div>
    <p class="retour-email-recipient">{if $retour_customer_email|default:''}Versturen naar {$retour_customer_email|escape:'html':'UTF-8'}{/if}</p>
    <p>De klant ontvangt het retournummer en de trackinglink. De chauffeur brengt het label mee bij het ophalen.</p>
    <div class="retour-email-message" role="status" aria-live="polite">{$retour_notification.message|default:''|escape:'html':'UTF-8'}</div>
    <div class="d-flex justify-content-end mt-3" style="gap: 0.5rem;">
      <button type="button" class="btn btn-outline-secondary cancelRetourLabel">Annuleren</button>
      <button type="button" class="btn btn-success sendRetourToCustomer"{if !($retour_notification.can_send|default:false)} disabled{/if}>{if ($retour_notification.status|default:'unsent') == 'sent'}Verstuurd{else}Versturen naar klant{/if}</button>
    </div>
  </div>

  {if !$retour_created && !$retour_blocked && !($retour_preflight_error|default:'')}
    <fieldset class="retour-booking-fields">
      <div class="form-group">
        <label for="retour-pickup-date">Gewenste ophaaldatum</label>
        <input type="date" class="form-control" id="retour-pickup-date" name="pickup_date" value="{$retour_pickup_date|escape:'html':'UTF-8'}" min="{$retour_min_pickup_date|escape:'html':'UTF-8'}" required>
      </div>

      {if $retour_packages|default:[]}
        <h4>Eerder verzonden pakketten</h4>
        <ul>
          {foreach from=$retour_packages item=package}
            <li>
              {$package.shipping_number|default:''|escape:'html':'UTF-8'}
              {if $package.length|default:''}{$package.length|escape:'html':'UTF-8'} &times; {$package.width|escape:'html':'UTF-8'} &times; {$package.height|escape:'html':'UTF-8'} cm{/if}
              {if $package.weight|default:''} ({$package.weight|escape:'html':'UTF-8'} kg){/if}
            </li>
          {/foreach}
        </ul>
      {/if}

      {if $retour_products|default:[]}
        <h4>Producten in deze bestelling</h4>
        <ul>
          {foreach from=$retour_products item=product}
            <li>
              {$product.product_quantity|escape:'html':'UTF-8'} &times; {$product.product_name|escape:'html':'UTF-8'}
              <span class="retour-product-weight">&mdash; {if isset($product.retour_weight)}Gewicht: {$product.retour_weight|escape:'html':'UTF-8'} kg{else}Gewicht onbekend{/if}</span>
            </li>
          {/foreach}
        </ul>
        <p class="text-muted">Het gewicht per regel is het aantal &times; het gewicht per stuk.</p>
      {/if}

      <h4>Pakketten voor retour</h4>
      <p>Vul alleen de pakketten in die opgehaald moeten worden. Afmetingen en gewicht gelden per pakket.</p>
      <p>Kies een type en vul het gewicht in. U kunt de automatisch ingevulde afmetingen aanpassen.</p>
      <div id="new_collies"></div>
      <button type="button" class="btn btn-outline-primary mb-3" id="addNewCollie">Voeg pakket toe</button>

      <div class="form-group">
        <label for="retour-order-message">Bericht aan chauffeur</label>
        <textarea class="form-control" id="retour-order-message" name="order_msg" rows="3" maxlength="180"></textarea>
      </div>
      <button type="submit" class="btn btn-success saveRetourRequest">Retour aanmaken bij Koopman</button>
    </fieldset>

    <template id="retour-package-template">
      <div class="parentRow card card-body mb-3">
        <div class="row">
          <div class="form-group col-8">
            <label>Type
              <select class="form-control" name="collie_type[]" required>
                <option value="">Kies een type</option>
                <option value="envelope">Envelop</option>
                <option value="plaat">Plaat</option>
                <option value="1-meter">1 meter</option>
                <option value="2-meter">2 meter</option>
                <option value="pallet">Standaardpallet</option>
                <option value="plaat-pallet">Plaatpallet</option>
                <option value="balk-pallet">Balkpallet</option>
              </select>
            </label>
          </div>
          <div class="form-group col-4">
            <label>Aantal <input class="form-control" type="number" min="1" max="100" step="1" name="collie_total[]" value="1" required></label>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-4">
            <label>Lengte (cm) </label><input class="form-control" type="number" min="0.01" max="10000" step="0.01" name="collie_length[]" required>
          </div>
          <div class="form-group col-4">
            <label>Breedte (cm) </label><input class="form-control" type="number" min="0.01" max="10000" step="0.01" name="collie_width[]" required>
          </div>
          <div class="form-group col-4">
            <label>Hoogte (cm) </label><input class="form-control" type="number" min="0.01" max="10000" step="0.01" name="collie_height[]" required>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-4">
            <label>Gewicht (kg) </label><input class="form-control" type="number" min="0.01" max="10000" step="0.01" name="collie_weight[]" required>
          </div>
        </div>
        <button type="button" class="btn btn-outline-danger removeCollieRow">Verwijder pakket</button>
      </div>
    </template>
  {/if}
</form>
