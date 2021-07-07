
<div class="supercheckout-checkout-content"></div>
        <h2>{l s='Delivery Address' mod='supercheckout'} <span class="section-title-number">4</span></h2>

{assign var='existing_address' value=[]}
{if !isset($guest_information)}
    {if $customer.addresses}
      {assign var='existing_address' value=reset($customer.addresses)}
    {/if}
{/if}



<div class="opc_shipping_address custom-panel">



    <div id="shipping-new" style="display: block;">

      <div class="form-group" id="on-credit-customer-shipping-address-selection" style="{if isset($guest_information) && !$existing_address}display: none;{/if}">
        <label class="control-label" for="shipping_address[id_customer_address]" >Selecteer opgeslagen adres
        </label>
        <select name="shipping_address[id_customer_address]" class="supercheckout-large-field form-control"  onchange="AutofillCustomerShippingAddress(this)" tabindex="-1">
          <option value="new">Nieuw adres</option>
          {if !isset($guest_information) && $existing_address}
            {foreach from=$customer.addresses key='customer_address_key' item='caddress'}
              <option data-company="{$caddress['company']}"
                      data-firstname="{$caddress['firstname']}"
                      data-lastname="{$caddress['lastname']}"
                      data-phone="{$caddress['phone']}"
                      data-postcode="{$caddress['postcode']}"
                      data-house_number="{$caddress['house_number']}"
                      data-houser_number_extension="{$caddress['house_number_extension']}" value="{$caddress['id']}" {if (int)$existing_address['id'] == (int)$caddress['id']}selected="selected"{/if}>
                {$caddress['company']} {$caddress['firstname']} {$caddress['lastname']} - {$caddress['address1']} {$caddress['postcode']} {$caddress['house_number']} {$caddress['house_number_extension']}
              </option>
            {/foreach}
          {/if}
        </select>
      </div>
      <input type="hidden" name="shipping_address[shipping_address_id]" value="{if !isset($guest_information) && $existing_address}{$existing_address['id']}{/if}">
        {assign var='display_row' value=''}
        {assign var='google_region_type' value=''}
        {foreach from=$settings['shipping_address'] key='p_address_key' item='p_address_field'}
            {$display_row = ''}
            {$google_region_type = ''}
            {if $settings['shipping_address'][$p_address_key][$user_type]['display'] eq 1 || (isset($settings['shipping_address'][$p_address_key]['conditional']) && $settings['shipping_address'][$p_address_key]['conditional'] eq 1)}
                {if $p_address_key eq 'dni' && !$need_dni}
                    {$display_row = 'display:none;'}
                {else if $p_address_key eq 'dni' && $settings['shipping_address'][$p_address_key][$user_type]['display'] == 0}
                    {$display_row = 'display:none;'}
                {/if}
                {if $p_address_key eq 'vat_number' && $settings['shipping_address'][$p_address_key][$user_type]['display'] == 0}
                    {$display_row = 'display:none;'}
                {/if}
                {if ($p_address_key eq 'postcode' || $p_address_key eq 'id_country' || $p_address_key eq 'id_state' || $p_address_key eq 'alias') && !$settings['shipping_address'][$p_address_key][$user_type]['require'] && !$settings['shipping_address'][$p_address_key][$user_type]['display']}
                    {$display_row = 'display:none;'}
                {/if}
                {if $p_address_key eq 'postcode'}
                    {$google_region_type='postal_code'}
                {else if $p_address_key eq 'address1'}
                    {$google_region_type='street_number'}
                {else if $p_address_key eq 'address2'}
                    {$google_region_type='route'}
                {else if $p_address_key eq 'city'}
                    {$google_region_type='locality'}
                {else if $p_address_key eq 'id_country'}
                    {$google_region_type='country'}
                {else if $p_address_key eq 'id_state'}
                    {$google_region_type='administrative_area_level_1'}
                {/if}
                {if $p_address_key eq 'id_state'}
                    <script>var show_shipping_state = {$settings['shipping_address'][$p_address_key][$user_type]['display']};</script>
                {/if}
                {if $p_address_key eq 'postcode'}
                    <script>var show_shipping_postcode = {$settings['shipping_address'][$p_address_key][$user_type]['display']};</script>

                {/if}

                {if $settings['shipping_address'][$p_address_key]['html_format'] == 1}
                    {if $p_address_key eq 'postcode'}
                        <div class="row sort_data d-flex" id="shipping_post_code" data-percentage="{$settings['shipping_address'][$p_address_key]['sort_order']}" style="{$display_row}">
                        {else}
                            <div class="sort_data col-12 p-0" data-percentage="{$settings['shipping_address'][$p_address_key]['sort_order']}" style="{$display_row}">
                            {/if}
                            <div class="{if $p_address_key == 'id_country' || $p_address_key == 'city'}col-12{else}col-12 col-sm-6{/if} {if $p_address_key == 'postcode' || $p_address_key == 'phone' ||  $p_address_key == 'firstname'}{if $p_address_key == 'firstname'}pl-sm-0 float-left p-0 {/if} pr-sm-0{elseif $p_address_key == 'phone_mobile' || $p_address_key == 'lastname'}pl-sm-1 {if $p_address_key == 'lastname'}pr-sm-0 float-right{/if}{/if}">
                                <div class="form-group ">
                                    <label class="control-label" for="shipping_address[{$p_address_key}]" >{l s={$settings['shipping_address'][$p_address_key]['title']} mod='supercheckout'}
                                        {if $p_address_key eq 'vat_number'}
                                            <span style="display:{if $need_vat}inline{else}none{/if};" class="supercheckout-required">*</span>
                                        {else}
                                            <span style="display:{if $settings['shipping_address'][$p_address_key][$user_type]['require'] eq 1}inline{else}none{/if};" class="supercheckout-required">*</span>
                                        {/if}
                                    </label>
                                    {if $p_address_key eq 'id_country' || $p_address_key eq 'id_state'}
                                        <input type='hidden' class="{$google_region_type|escape:'htmlall':'UTF-8'}"/>
                                        <select name="shipping_address[{$p_address_key}]" class="supercheckout-large-field form-control" {if $p_address_key eq 'id_country'} onchange="restrictAutofillbyCountry(this)" {/if} disabled tabindex="-1">
                                            {if $p_address_key eq 'id_country'}
                                                <option value="0">--</option>
                                                {foreach from=$countries item='country'}
                                                    <option value="{$country['id_country']}"  id='{$country['iso_code']}' {if $country['id_country'] == $default_country && isset($guest_information)} selected="selected"{elseif !isset($guest_information) && $existing_address['id_country'] == $country['id_country']} selected="selected" {/if}>{$country['name']}</option>
                                                {/foreach}
                                            {else}
                                                <option value="0">{l s='Select State' mod='supercheckout'}</option>
                                            {/if}
                                        </select>
                                    {else if  $p_address_key eq 'other'}
                                        <input type="text" name="shipping_address[{$p_address_key}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control">
                                    {else}

                                        {if $settings['google_auto_address']['enable'] eq 1}
                                            <input autocomplete="off" type="text"  {if $p_address_key eq 'address1'|| $p_address_key eq 'address2'} placeholder="{l s='Enter a location' mod='supercheckout'}" id='shipping_address_{$p_address_key|escape:'htmlall':'UTF-8'}'onFocus="geolocate()"{/if} name="shipping_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="form-control supercheckout-large-field {$google_region_type|escape:'htmlall':'UTF-8'} {if $p_address_key eq 'address1'|| $p_address_key eq 'address2'}autocomplete{/if}" />
                                        {else}
                                          {if $p_address_key == 'city' || $p_address_key == 'address1'}
                                            <input autocomplete="off" type="text" name="shipping_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" readonly disabled tabindex="-1"/>
                                          {else}
                                            <input autocomplete="off" type="text" name="shipping_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" />
                                          {/if}
                                        {/if}
                                    {/if}
                                </div>
                            </div>

                        {elseif $settings['shipping_address'][$p_address_key]['html_format'] == 2}

                            <div class="{if $p_address_key == 'id_country' || $p_address_key == 'city' }col-12{else}col-12 col-sm-6{/if} {if $p_address_key == 'postcode' ||  $p_address_key == 'firstname'}pr-sm-1 pr-sm-0{elseif $p_address_key == 'city' || $p_address_key == 'lastname'}pl-sm-1 {if $p_address_key == 'lastname'}pr-sm-0 float-right p-0{/if}{/if}">
                                <div class="form-group ">
                                    <label class="control-label" for="shipping_address[{$p_address_key}]">{l s={$settings['shipping_address'][$p_address_key]['title']} mod='supercheckout'}
                                        {if $p_address_key eq 'vat_number'}
                                            <span style="display:{if $need_vat}inline{else}none{/if};" class="supercheckout-required">*</span>
                                        {else}
                                            <span style="display:{if $settings['shipping_address'][$p_address_key][$user_type]['require'] eq 1}inline{else}none{/if};" class="supercheckout-required">*</span>
                                        {/if}
                                    </label>
                                    {if $p_address_key eq 'id_country' || $p_address_key eq 'id_state'}
                                        <input type='hidden' class="{$google_region_type|escape:'htmlall':'UTF-8'}"/>
                                        <select name="shipping_address[{$p_address_key}]" class="supercheckout-large-field form-control" {if $p_address_key eq 'id_country'} onchange="restrictAutofillbyCountry(this)" {/if} disabled tabindex="-1">
                                            {if $p_address_key eq 'id_country'}
                                                <option value="0">--</option>
                                                {foreach from=$countries item='country'}
                                                    <option value="{$country['id_country']}"  id='{$country['iso_code']}' {if $country['id_country'] == $default_country} selected="selected"{/if}>{$country['name']}</option>
                                                {/foreach}
                                            {else}
                                                <option value="0">{l s='Select State' mod='supercheckout'}</option>
                                            {/if}
                                        </select>
                                    {else if  $p_address_key eq 'other'}
                                        <input type="text" name="shipping_address[{$p_address_key}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control">
                                    {else}

                                        {if $settings['google_auto_address']['enable'] eq 1}
                                            <input autocomplete="off" type="text"  {if $p_address_key eq 'address1'|| $p_address_key eq 'address2'} placeholder="{l s='Enter a location' mod='supercheckout'}" id='shipping_address_{$p_address_key|escape:'htmlall':'UTF-8'}'onFocus="geolocate()"{/if} name="shipping_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="form-control supercheckout-large-field {$google_region_type|escape:'htmlall':'UTF-8'} {if $p_address_key eq 'address1'|| $p_address_key eq 'address2'}autocomplete{/if}" />
                                        {else}
                                          {if $p_address_key == 'city' || $p_address_key == 'address1'}
                                            <input autocomplete="off" type="text" name="shipping_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" readonly disabled tabindex="-1"/>
                                          {else}
                                            <input autocomplete="off" type="text" name="shipping_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" />
                                          {/if}
                                        {/if}
                                    {/if}
                                </div>
                            </div>
                        </div>


                    {else}
                        {if $p_address_key eq 'postcode'}
                            <div class="sort_data col-12 col-sm-6 p-0 float-left" id="shipping_post_code" data-percentage="{$settings['shipping_address'][$p_address_key]['sort_order']}" style="{$display_row}">
                            {else}
                              {if $p_address_key == 'address1'}
                              <div class="row">
                                <div class="sort_data col-12 " data-percentage="{$settings['shipping_address'][$p_address_key]['sort_order']|intval}" style="display: flow-root;">
                                  {elseif $p_address_key == 'house_number'}
                                  <div class="sort_data col-8 col-sm-3 pl-sm-1 pr-sm-0 pr-0 pl-0 float-left" data-percentage="{$settings['shipping_address'][$p_address_key]['sort_order']|intval}" style="{$display_row}">
                                    {elseif $p_address_key == 'house_number_extension'}
                                    <div class="sort_data col-4 col-sm-3 pl-sm-1 pl-1 pr-0 float-right" data-percentage="{$settings['shipping_address'][$p_address_key]['sort_order']|intval}" style="{$display_row}">
                                      {else}
                                      <div class="sort_data col-12 p-0" data-percentage="{$settings['shipping_address'][$p_address_key]['sort_order']|intval}" style="{$display_row}">
                                        {/if}

{*                                <div class="sort_data" data-percentage="{$settings['shipping_address'][$p_address_key]['sort_order']}" style="{$display_row}">*}
                                {/if}
                                <div class="form-group {if $p_address_key == 'phone'}col-12{/if}">
                                    <label class="control-label" for="shipping_address[{$p_address_key}]">{l s={$settings['shipping_address'][$p_address_key]['title']} mod='supercheckout'}
                                        {if $p_address_key eq 'vat_number'}
                                            <span style="display:{if $need_vat}inline{else}none{/if};" class="supercheckout-required">*</span>
                                        {else}
                                            <span style="display:{if $settings['shipping_address'][$p_address_key][$user_type]['require'] eq 1}inline{else}none{/if};" class="supercheckout-required">*</span>
                                        {/if}
                                    </label>
                                    {if $p_address_key eq 'id_country' || $p_address_key eq 'id_state'}
                                        <input type='hidden' class="{$google_region_type|escape:'htmlall':'UTF-8'}"/>
                                        <select name="shipping_address[{$p_address_key}]" class="supercheckout-large-field form-control" {if $p_address_key eq 'id_country'} onchange="restrictAutofillbyCountry(this)" {/if} disabled>
                                            {if $p_address_key eq 'id_country'}
                                                <option value="0">--</option>
                                                {foreach from=$countries item='country'}
                                                    <option value="{$country['id_country']}"  id='{$country['iso_code']}' {if $country['id_country'] == $default_country} selected="selected"{/if}>{$country['name']}</option>
                                                {/foreach}
                                            {else}
                                                <option value="0">{l s='Select State' mod='supercheckout'}</option>
                                            {/if}
                                        </select>
                                    {else if  $p_address_key eq 'other'}
                                        <input type="text" name="shipping_address[{$p_address_key}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control">
                                    {else}

                                        {if $settings['google_auto_address']['enable'] eq 1}
                                            <input autocomplete="off" type="text"  {if $p_address_key eq 'address1'|| $p_address_key eq 'address2'} placeholder="{l s='Enter a location' mod='supercheckout'}" id='shipping_address_{$p_address_key|escape:'htmlall':'UTF-8'}'onFocus="geolocate()"{/if} name="shipping_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="form-control supercheckout-large-field {$google_region_type|escape:'htmlall':'UTF-8'} {if $p_address_key eq 'address1'|| $p_address_key eq 'address2'}autocomplete{/if}" />
                                        {else}
                                          {if $p_address_key == 'city' || $p_address_key == 'address1'}
                                            <input autocomplete="off" type="text" name="shipping_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" readonly disabled tabindex="-1"/>
                                          {else}
                                            <input autocomplete="off" type="text" name="shipping_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" />
                                          {/if}
                                        {/if}
                                    {/if}
                                </div>
                                        {if $p_address_key == 'house_number_extension'}
                                      </div>
                                      {/if}
                            </div>
                        {/if}
                    {/if}
                {/foreach}
            </div>
        </div>


        <ul class="list-unstyled">
            <li>
                <div class="input-box input-different-shipping" {if !$settings['show_use_delivery_for_payment_add'][$user_type]} style="display:none;" {/if}>
                  <input style="height:auto;" type="radio" name="use_for_invoice" id="use_for_invoice" value="on"
                         {if $settings['use_delivery_for_payment_add'][$user_type]}checked="checked"{/if}
                  >
                  <label for="use_for_invoice"><b>Factuur adres is hetzelfde als het bezorg adres</b></label>
                  <br><br><br>

                    <input style="height:auto;margin-top:40px" type="radio" name="use_for_invoice" id="use_for_invoice_none" value="off"
                           {if !$settings['use_delivery_for_payment_add'][$user_type]}checked="checked"{/if}
                           >
                    <label for="use_for_invoice_none"><b>Ander factuur adres</b></label>

                </div>
            </li>
        </ul>

        <div style="display: none;">
            <label>{l s='First Name' mod='supercheckout'}</label>
            <label>{l s='Last Name' mod='supercheckout'}</label>
            <label>{l s='Company' mod='supercheckout'}</label>
            <label>{l s='Vat Number' mod='supercheckout'}</label>
            <label>{l s='Address Line 1' mod='supercheckout'}</label>
            <label>{l s='House Number' mod='supercheckout'}</label>
            <label>{l s='House Number Extension' mod='supercheckout'}</label>
            <label>{l s='Address Line 2' mod='supercheckout'}</label>
            <label>{l s='Zip/Postal Code' mod='supercheckout'}</label>
            <label>{l s='City' mod='supercheckout'}</label>
            <label>{l s='Country' mod='supercheckout'}</label>
            <label>{l s='State' mod='supercheckout'}</label>
            <label>{l s='Identification Number' mod='supercheckout'}</label>
            <label>{l s='Home Phone' mod='supercheckout'}</label>
            <label>{l s='Mobile Phone' mod='supercheckout'}</label>
            <label>{l s='Address Title' mod='supercheckout'}</label>
            <label>{l s='Other Information' mod='supercheckout'}</label>
        </div>
        {*
        * DISCLAIMER
        *
        * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
        * versions in the future. If you wish to customize PrestaShop for your
        * needs please refer tohttp://www.prestashop.com for more information.
        * We offer the best and most useful modules PrestaShop and modifications for your online store.
        *
        * @category  PrestaShop Module
        * @author    knowband.com <support@knowband.com>
        * @copyright 2016 Knowband
        *}
