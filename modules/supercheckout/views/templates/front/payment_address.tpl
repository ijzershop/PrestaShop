<br>
<ul class="list-unstyled">
    <li>
        <h2>{l s='Invoice Address' mod='supercheckout'}</h2></li>
</ul>

{if !isset($guest_information)}
  {assign var='existing_address' value=null}
  {if $customer.addresses}
    {assign var='existing_address' value=reset($customer.addresses)}
  {/if}
{/if}

<div class="supercheckout-checkout-content"></div>
    <div class="opc_billing_address custom-panel">

        <div id="payment-new" style="display: block;">
            {*    <div id="payment_address_table" class="supercheckout-form"> *} {*Need to change later*}
            {assign var='display_row' value=''}
            {assign var='google_region_type' value=''}
            {foreach from=$settings['payment_address'] key='p_address_key' item='p_address_field'}

{*          {var_export([$p_address_key,$p_address_field])}*}

                {$display_row = ''}
                {$google_region_type = ''}
                {if $settings['payment_address'][$p_address_key][$user_type]['display'] eq 1 || (isset($settings['payment_address'][$p_address_key]['conditional']) && $settings['payment_address'][$p_address_key]['conditional'] eq 1)}
                    {if $p_address_key eq 'dni' && !$need_dni}
                        {$display_row = 'display:none;'}
                    {else if $p_address_key eq 'dni' && $settings['payment_address'][$p_address_key][$user_type]['display'] == 0}
                        {$display_row = 'display:none;'}
                    {/if}
                    {if $p_address_key eq 'vat_number' && $settings['payment_address'][$p_address_key][$user_type]['display'] == 0}
                        {$display_row = 'display:none;'}
                    {/if}
                    {if ($p_address_key eq 'postcode' || $p_address_key eq 'id_country' || $p_address_key eq 'id_state' || $p_address_key eq 'alias') && !$settings['payment_address'][$p_address_key][$user_type]['require'] && !$settings['payment_address'][$p_address_key][$user_type]['display']}
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
                        <script>var show_payment_state = {$settings['payment_address'][$p_address_key][$user_type]['display']};</script>
                    {/if}
                    {if $p_address_key eq 'postcode'}
                        <script>var show_payment_postcode = {$settings['payment_address'][$p_address_key][$user_type]['display']};</script>
                    {/if}

                    {if $settings['payment_address'][$p_address_key]['html_format'] == 1}

                        {if $p_address_key eq 'postcode'}
                            <div class="row sort_data d-flex" id="payment_post_code" data-percentage="{$settings['payment_address'][$p_address_key]['sort_order']|intval}" style="{$display_row}">
                            {else}
                                <div class="row sort_data d-flex" data-percentage="{$settings['payment_address'][$p_address_key]['sort_order']|intval}" style="{$display_row}">
                                {/if}
                                <div class="{if $p_address_key == 'id_country'}col-12{else}col-12 col-sm-6{/if} {if $p_address_key == 'postcode' || $p_address_key == 'phone' ||  $p_address_key == 'firstname'}pr-sm-0{elseif $p_address_key == 'city' || $p_address_key == 'phone_mobile' || $p_address_key == 'lastname'}pl-sm-1{/if}">
                                    <div class="form-group ">
                                        <label class="control-label"for="payment_address[{$p_address_key}]">{l s={$settings['payment_address'][$p_address_key]['title']} mod='supercheckout'}
                                            {if $p_address_key eq 'vat_number'}
                                                <span style="display:{if $need_vat}inline{else}none{/if};" class="supercheckout-required">*</span>
                                            {else}
                                                <span style="display:{if $settings['payment_address'][$p_address_key][$user_type]['require'] eq 1}inline{else}none{/if};" class="supercheckout-required">*</span>
                                            {/if}
                                        </label>
                                        {if $p_address_key eq 'id_country' || $p_address_key eq 'id_state'}
                                            <input type='hidden' class="{$google_region_type|escape:'htmlall':'UTF-8'}"/>
                                            <select name="payment_address[{$p_address_key}]" {if $p_address_key eq 'id_country'} onchange="restrictAutofillbyCountry(this)" {/if} class="form-control supercheckout-large-field" disabled tabindex="-1">
                                                {if $p_address_key eq 'id_country'}
                                                    <option value="0">--</option>
                                                    {foreach from=$countries item='country'}
                                                        <option value="{$country['id_country']|intval}"  id='{$country['iso_code']}' {if $country['id_country'] == $default_country && isset($guest_information)} selected="selected" {elseif !isset($guest_information) && $existing_address['id_country'] == $country['id_country']} selected="selected" {/if}>{$country['name']}</option>
                                                    {/foreach}
                                                {else}
                                                    <option value="0">{l s='Select State' mod='supercheckout'}</option>
                                                {/if}
                                            </select>
                                        {else if $p_address_key eq 'dob'}
                                            <div class="supercheckout_dob_box supercheckout-large-field">
                                                <select name="payment_address[dob_days]">
                                                    <option value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}">--</option>
                                                    {foreach from=$days item='day'}
                                                        <option value="{$day|intval}">{$day|intval}</option>
                                                    {/foreach}
                                                </select>
                                                <select name="payment_address[dob_months]">
                                                    <option value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}">--</option>
                                                    {foreach from=$months item='month'}
                                                        <option value="{$month}">{$month}</option>
                                                    {/foreach}
                                                </select>
                                                <select name="payment_address[dob_years]">
                                                    <option value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}">--</option>
                                                    {foreach from=$years item='year'}
                                                        <option value="{$year}">{$year}</option>
                                                    {/foreach}
                                                </select>
                                            </div>
                                        {else if  $p_address_key eq 'other'}
                                            <input type="text" name="payment_address[{$p_address_key}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control">
                                        {else}

                                            {if $settings['google_auto_address']['enable'] eq 1}
                                                <input autocomplete="off" {if $p_address_key eq 'address1'|| $p_address_key eq 'address2'} placeholder="{l s='Enter a location' mod='supercheckout'}" id='payment_address_{$p_address_key|escape:'htmlall':'UTF-8'}' onFocus="geolocate()"{/if} type="text" name="payment_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="form-control supercheckout-large-field {$google_region_type|escape:'htmlall':'UTF-8'} {if $p_address_key eq 'address1'|| $p_address_key eq 'address2'}autocomplete{/if}" />
                                            {else}
                                              {if $p_address_key == 'city' ||  $p_address_key == 'address1'}
                                                <input autocomplete="off" type="text" name="payment_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" readonly tabindex="-1"/>
                                              {else}
                                                <input autocomplete="off" type="text" name="payment_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" />
                                              {/if}
                                            {/if}
                                        {/if}
                                    </div>
                                </div>
                            {elseif $settings['payment_address'][$p_address_key]['html_format'] == 2}
                                <div class="{if $p_address_key == 'id_country'}col-12{else}col-12 col-sm-6{/if} {if $p_address_key == 'postcode' || $p_address_key == 'phone' ||  $p_address_key == 'firstname'}pr-sm-0{elseif $p_address_key == 'city' || $p_address_key == 'phone_mobile' || $p_address_key == 'lastname'}pl-sm-1{/if}">
                                    <div class="form-group ">
                                        <label class="control-label"for="payment_address[{$p_address_key}]">{l s={$settings['payment_address'][$p_address_key]['title']} mod='supercheckout'}
                                            {if $p_address_key eq 'vat_number'}
                                                <span style="display:{if $need_vat}inline{else}none{/if};" class="supercheckout-required">*</span>
                                            {else}
                                                <span style="display:{if $settings['payment_address'][$p_address_key][$user_type]['require'] eq 1}inline{else}none{/if};" class="supercheckout-required">*</span>
                                            {/if}
                                        </label>
                                        {if $p_address_key eq 'id_country' || $p_address_key eq 'id_state'}
                                            <input type='hidden' class="{$google_region_type|escape:'htmlall':'UTF-8'}"/>
                                            <select name="payment_address[{$p_address_key}]" {if $p_address_key eq 'id_country'} onchange="restrictAutofillbyCountry(this)" {/if} class="form-control supercheckout-large-field" disabled tabindex="-1">
                                                {if $p_address_key eq 'id_country'}
                                                    <option value="0">--</option>
                                                    {foreach from=$countries item='country'}
                                                        <option value="{$country['id_country']|intval}"  id='{$country['iso_code']}' {if $country['id_country'] == $default_country} selected="selected"{/if}>{$country['name']}</option>
                                                    {/foreach}
                                                {else}
                                                    <option value="0">{l s='Select State' mod='supercheckout'}</option>
                                                {/if}
                                            </select>
                                        {else if $p_address_key eq 'dob'}
                                            <div class="supercheckout_dob_box supercheckout-large-field">
                                                <select name="payment_address[dob_days]">
                                                    <option value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}">--</option>
                                                    {foreach from=$days item='day'}
                                                        <option value="{$day|intval}">{$day|intval}</option>
                                                    {/foreach}
                                                </select>
                                                <select name="payment_address[dob_months]">
                                                    <option value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}">--</option>
                                                    {foreach from=$months item='month'}
                                                        <option value="{$month}">{$month}</option>
                                                    {/foreach}
                                                </select>
                                                <select name="payment_address[dob_years]">
                                                    <option value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}">--</option>
                                                    {foreach from=$years item='year'}
                                                        <option value="{$year}">{$year}</option>
                                                    {/foreach}
                                                </select>
                                            </div>
                                        {else if  $p_address_key eq 'other'}
                                            <input type="text" name="payment_address[{$p_address_key}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control">
                                        {else}

                                            {if $settings['google_auto_address']['enable'] eq 1}
                                                <input autocomplete="off" {if $p_address_key eq 'address1'|| $p_address_key eq 'address2'} placeholder="{l s='Enter a location' mod='supercheckout'}" id='payment_address_{$p_address_key|escape:'htmlall':'UTF-8'}' onFocus="geolocate()"{/if} type="text" name="payment_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="form-control supercheckout-large-field {$google_region_type|escape:'htmlall':'UTF-8'} {if $p_address_key eq 'address1'|| $p_address_key eq 'address2'}autocomplete{/if}" />
                                            {else}
                                              {if $p_address_key == 'city' ||  $p_address_key == 'address1'}
                                                <input autocomplete="off" type="text" name="payment_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" readonly tabindex="-1"/>
                                                {else}
                                                <input autocomplete="off" type="text" name="payment_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" />
                                            {/if}
                                            {/if}
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        {else}
                            {if $p_address_key eq 'postcode'}
                                <div class="sort_data" id="payment_post_code" data-percentage="{$settings['payment_address'][$p_address_key]['sort_order']|intval}" style="{$display_row}">
                                {else}
                                    {if $p_address_key == 'address1'}
                                    <div class="row d-flex">
                                        <div class="sort_data col-7 pr-0" data-percentage="{$settings['payment_address'][$p_address_key]['sort_order']|intval}" style="{$display_row}">
                                    {elseif $p_address_key == 'house_number'}
                                        <div class="sort_data col-3 pl-1 pr-0" data-percentage="{$settings['payment_address'][$p_address_key]['sort_order']|intval}" style="{$display_row}">
                                    {elseif $p_address_key == 'house_number_extension'}
                                        <div class="sort_data col-2 pl-1" data-percentage="{$settings['payment_address'][$p_address_key]['sort_order']|intval}" style="{$display_row}">
                                    {else}
                                        <div class="sort_data" data-percentage="{$settings['payment_address'][$p_address_key]['sort_order']|intval}" style="{$display_row}">
                                    {/if}

                                  {/if}
                                    <div class="form-group ">
                                        <label class="control-label"for="payment_address[{$p_address_key}]">{l s={$settings['payment_address'][$p_address_key]['title']} mod='supercheckout'}
                                            {if $p_address_key eq 'vat_number'}
                                                <span style="display:{if $need_vat}inline{else}none{/if};" class="supercheckout-required">*</span>
                                            {else}
                                                <span style="display:{if $settings['payment_address'][$p_address_key][$user_type]['require'] eq 1}inline{else}none{/if};" class="supercheckout-required">*</span>
                                            {/if}
                                        </label>
                                        {if $p_address_key eq 'id_country' || $p_address_key eq 'id_state'}
                                            <input type='hidden' class="{$google_region_type|escape:'htmlall':'UTF-8'}"/>
                                            <select name="payment_address[{$p_address_key}]" {if $p_address_key eq 'id_country'} onchange="restrictAutofillbyCountry(this)" {/if} class="form-control supercheckout-large-field" disabled tabindex="-1">
                                                {if $p_address_key eq 'id_country'}
                                                    <option value="0">--</option>
                                                    {foreach from=$countries item='country'}
                                                        <option value="{$country['id_country']|intval}"  id='{$country['iso_code']}' {if $country['id_country'] == $default_country} selected="selected"{/if}>{$country['name']}</option>
                                                    {/foreach}
                                                {else}
                                                    <option value="0">{l s='Select State' mod='supercheckout'}</option>
                                                {/if}
                                            </select>
                                        {else if $p_address_key eq 'dob'}
                                            <div class="supercheckout_dob_box supercheckout-large-field">
                                                <select name="payment_address[dob_days]">
                                                    <option value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}">--</option>
                                                    {foreach from=$days item='day'}
                                                        <option value="{$day|intval}">{$day|intval}</option>
                                                    {/foreach}
                                                </select>
                                                <select name="payment_address[dob_months]">
                                                    <option value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}">--</option>
                                                    {foreach from=$months item='month'}
                                                        <option value="{$month}">{$month}</option>
                                                    {/foreach}
                                                </select>
                                                <select name="payment_address[dob_years]">
                                                    <option value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}">--</option>
                                                    {foreach from=$years item='year'}
                                                        <option value="{$year}">{$year}</option>
                                                    {/foreach}
                                                </select>
                                            </div>
                                        {else if  $p_address_key eq 'other'}
                                            <input type="text" name="payment_address[{$p_address_key}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control">
                                        {else}
                                            {if $settings['google_auto_address']['enable'] eq 1}
                                                <input autocomplete="off" {if $p_address_key eq 'address1'|| $p_address_key eq 'address2'} placeholder="{l s='Enter a location' mod='supercheckout'}" id='payment_address_{$p_address_key|escape:'htmlall':'UTF-8'}' onFocus="geolocate()"{/if} type="text" name="payment_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="form-control supercheckout-large-field {$google_region_type|escape:'htmlall':'UTF-8'} {if $p_address_key eq 'address1'|| $p_address_key eq 'address2'}autocomplete{/if}" />
                                            {else}

                                              {if $p_address_key == 'address1'}
                                                <input autocomplete="off" type="text" name="payment_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" readonly tabindex="-1"/>
                                              {elseif $p_address_key == 'house_number'}
                                                <input autocomplete="off" type="text" name="payment_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" />
                                              {elseif $p_address_key == 'house_number_extension'}
                                                <input autocomplete="off" type="text" name="payment_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" />
                                              {elseif $p_address_key == 'city'}
                                                <input autocomplete="off" type="text" name="payment_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" readonly tabindex="-1"/>
                                              {else}
                                                <input autocomplete="off" type="text" name="payment_address[{$p_address_key|escape:'htmlall':'UTF-8'}]" value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}" class="supercheckout-large-field form-control" />
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
                {*</div>*}
            </div>
            <!-- INSERT INTO #BILLING ADDRESS -->
            <!-- Start - Code to insert custom fields in billing address form block -->
   <div class="div_custom_fields">
                        {foreach from=$array_fields item=field}
                            {if $field['position'] eq 'payment_address_form'}
                                <div class="supercheckout-blocks form-group">
                                    {if $field['type'] eq "textbox"}
                                        <label class="cursor_help" title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}<span style="display:inline;" class="supercheckout-required">*</span>{/if}</label>
                                        <input type="text" name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]" value="{$field['default_value']}" class="supercheckout-large-field width_100 form-control">
                                        <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}" class="errorsmall_custom hidden_custom"></span>
                                    {/if}

                                    {if $field['type'] eq "textarea"}
                                        <label class="cursor_help" title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}<span style="display:inline;" class="supercheckout-required">*</span>{/if}</label>
                                        <textarea name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]" class="supercheckout-large-field width_100 form-control" style="width: 100%; height: 100px;">{$field['default_value']}</textarea>
                                        <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}" class="errorsmall_custom hidden_custom"></span>
                                    {/if}

                                    {if $field['type'] eq "selectbox"}
                                        <label class="cursor_help" title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}<span style="display:inline;" class="supercheckout-required">*</span>{/if}</label>
                                        <select name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]" class="supercheckout-large-field width_100 form-control">
                                            <option value="{if !isset($guest_information) && $existing_address}{$existing_address[$p_address_key]}{/if}">{l s='Select Option' mod='supercheckout'}</option>
                                            {foreach from=$field['options'] item=field_options}
                                                <option {if $field_options['default_value'] eq $field_options['option_value']}selected{/if} value="{$field_options['option_value']}">{$field_options['option_label']}</option>
                                            {/foreach}
                                        </select>
                                        <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}" class="errorsmall_custom hidden_custom"></span>
                                    {/if}

                                    {if $field['type'] eq "radio"}
                                        <label class="cursor_help" title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}<span style="display:inline;" class="supercheckout-required">*</span>{/if}</label>
                                        {assign var=radio_counter value=1}
                                        {foreach from=$field['options'] item=field_options}
                                            <div class="supercheckout-extra-wrap">
                                                <div class="radio" id="uniform-field_{$field['id_velsof_supercheckout_custom_fields']}"><span>
                                                        <input type="radio" name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]" value="{$field_options['option_value']}" {if $field_options['default_value'] eq $field_options['option_value']}checked{/if}>
                                                        <label for="field_{$field['id_velsof_supercheckout_custom_fields']}">{$field_options['option_label']}</label>
                                                    </span></div>

                                            </div>
                                            {assign var=radio_counter value=$radio_counter+1}
                                        {/foreach}
                                        <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}" class="errorsmall_custom hidden_custom"></span>
                                    {/if}

                                    {if $field['type'] eq "checkbox"}
                                        <label class="cursor_help" title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}<span style="display:inline;" class="supercheckout-required">*</span>{/if}</label>
                                        {foreach from=$field['options'] item=field_options}
                                            <div class="input-box input-field_{$field['id_velsof_supercheckout_custom_fields']}">
                                                <div class="checker checkbox" id="uniform-field_{$field['id_velsof_supercheckout_custom_fields']}">
                                                    <span class="checked">
                                                        <input {if $field_options['default_value'] eq $field_options['option_value']}checked{/if} type="checkbox" name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}][]" value="{$field_options['option_value']}">
                                                        <label for="field_{$field['id_velsof_supercheckout_custom_fields']}"><b>{$field_options['option_label']}</b></label>
                                                    </span>
                                                </div>

                                            </div>
                                        {/foreach}
                                        <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}" class="errorsmall_custom hidden_custom"></span>
                                    {/if}

                                    {* Start: Code added by Anshul for date field *}
                                    {if $field['type'] eq "date"}
                                        <label class="cursor_help" title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}<span style="display:inline;" class="supercheckout-required">*</span>{/if}</label>
                                        <input style="position: relative;" type="text" id="" name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]" value="{$field['default_value']}" class="supercheckout-large-field width_100 kb_sc_custom_field_date form-control" readonly="true">
                                        <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}" class="errorsmall_custom hidden_custom"></span>
                                        {if isset($field['validation_type']) && $field['validation_type'] == 'isDate'}
                                            <span style="color:#999999">
                                                {l s='Date format is Y-m-d' mod='supercheckout'}
                                            </span>
                                        {/if}
                                    {/if}
                                    {* Code added by Anshul for date field *}

                                    {* Start: Code added by Anshul for file field *}
                                    {if $field['type'] eq "file"}
                                        <label class="cursor_help" title="{$field['field_help_text']}">{$field['field_label']}{if $field['required'] eq "1"}<span style="display:inline;" class="supercheckout-required">*</span>{/if}</label>
                                        <input type="file" data-buttonText="{l s='Choose file' mod='supercheckout'}" id="kb_sc_custom_field_file_{$field['id_velsof_supercheckout_custom_fields']}" name="custom_fields[field_{$field['id_velsof_supercheckout_custom_fields']}]" value="{$field['default_value']}" class="supercheckout-large-field width_100 kbfiletype form-control">
                                        <span id="error_field_{$field['id_velsof_supercheckout_custom_fields']}" class="errorsmall_custom hidden_custom"></span>
                                        {if isset($field['validation_type']) && $field['validation_type'] == 'isFile'}
                                            <span style="color:#999999">
                                                {l s='Supported file formats are PDF, JPEG, PNG, DOCX, CSV & GIF.' mod='supercheckout'}
                                            </span>
                                        {/if}
                                    {/if}
                                    {* Code added by Anshul for file field *}
                                </div>
                            {/if}
                        {/foreach}
                    </div>
            <!-- End - Code to insert custom fields in billing address form block -->
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
