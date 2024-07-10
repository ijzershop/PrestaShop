<style>
.modal-body.updating{
  border-width: 4px;
  border-color: #3b56ad;
  border-style: dot-dash;
  animation: ease-in-out;
  opacity: .5;
  pointer-events: none;
  cursor: none;
}

.modal-body.updating {
  background-image: linear-gradient(90deg, #3b56ad 50%, transparent 50%), linear-gradient(90deg, #3b56ad 50%, transparent 50%), linear-gradient(0deg, #3b56ad 50%, transparent 50%), linear-gradient(0deg, #3b56ad 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
  background-position: left top, right bottom, left bottom, right top;
  animation: border-dance .5s infinite linear;
}

@keyframes border-dance {
  0% {
    background-position: left top, right bottom, left bottom, right top;
  }

  100% {
    background-position: left 15px top, right 15px bottom, left bottom 15px, right top 15px;
  }
}

</style>


<div class="modal-dialog" role="document">
  <form id="dynamicproductform" class="dynamicproductform" name="dynamicproduct">
    <div class="modal-content">
      {* Header with product title *}
      <div class="modal-header">
        <div class="">
          <h4 class="modal-title" id="dynamicproductLabel-{$product->id}">{$product->name[$id_lang]|escape:'html':'UTF-8'}</h4>
        </div>
        <div style="position:absolute;right:15px;top: 15px;">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
      </div>
      {* Body *}
      <div class="modal-body">
        {* Product id *}
        <input type="hidden" name="product-id" id="product-id" value="{$product->id}">
        <input type="hidden" name="customer-id" id="customer-id" value="{Context::getContext()->customer->id}">
        <input type="hidden" name="cart-id" id="cart-id" value="{Context::getContext()->cart->id}">
        <input type="hidden" name="dp_cart" id="dp_cart" value="{Context::getContext()->cart->id}">
        <input type="hidden" name="input-id" id="input-id" value="{if !empty($input)}{$input->id|intval}{/if}">
        <input type="hidden" name="dp_id_input" id="dp_id_input" value="{if !empty($input)}{$input->id|intval}{/if}">
        <input type="hidden" name="customization-id" id="customization-id" value="{if !empty($input)}{$input->id_customization|intval}{/if}">

        {$displayed_count = 0}
        <div class="dp_form_group"
             data-id_customization="{if !empty($input)}{$input->id_customization|intval}{/if}"
        >

          <div class="dp_input_div {if !empty($input)}dp_input_{$input->id|intval}{/if}">
            {if count($grouped_fields) > 0}
              {foreach from=$grouped_fields item=group}
                {*          {dd($group)}*}
                {if isset($group.label) && $group.label}
                  <strong>{$group.label|escape:'htmlall':'UTF-8'}</strong>
                  <br>
                {/if}
                {foreach from=$group.fields item=input_field}
                  {assign var="field" value=$input_field->getDynamicField()}
                  {*          {dd($input_field)}*}
                  {if $input_field->isSkippedName()}{continue}{/if}
                  {if $input_field->type === "2" || !empty($input_field->init)}
                    <input type="hidden" {if $field.settings.required}required="{$field.settings.required}"{/if}
                           value="{if $input_field->value != null}{$input_field->value}{else}{$input_field->init}{/if}"
                           class="form-control dp-entry"
                           name="dp_{$field.name}"
                           id="dp_{$field.name}"
                           data-id-product="{$product->id}"
                           data-field="{json_encode($input_field)}"
                           aria-describedby="dp_symbol_{$input_field->id}"/>
                  {/if}

                  {if $input_field->isSkipped() || $input_field->isAdminField()}{continue}{/if}
                  {if !$field.active || $field.name === "preview" && $is_order_detail}{continue}{/if}
                  {$displayed_count = $displayed_count + 1}
                  {$type = $input_field->getModule()->field_types[$input_field->type]['name']}
                  {if $type == 'input'}
                    {*        Start numeric input            *}
                    <div data-name="{$field.name}" data-id-product="{$product->id}" data-id="{$input_field->id}" data-id-group="{$field.id_group}" data-id-step="{$field.id_step}" class="dp_field_container dp_type_{$type}"></div>
                    {if $input_field->label}
                      <label class="dp-input-field-{$field.name|escape:'htmlall':'UTF-8'}" for="dp_{$field.name}">{ucfirst($input_field->label)|escape:'htmlall':'UTF-8'}</label>
                    {/if}
                    <div class="input-group mb-1">
                      <input type="number"
                             min="{if $field.settings.min != null}{$field.settings.min}{else}0{/if}"
                             {if $field.settings.max != null}max="{$field.settings.max}"{/if}
                        {if $field.settings.step != null}step="{$field.settings.step}"{/if}
                        {if $field.settings.required}required="{$field.settings.required}"{/if}
                        {if $field.placeholder != null}placeholder="{$field.placeholder}"{/if}
                             value="{if $input_field->value != null}{$input_field->value}{else}{$input_field->init}{/if}"
                             class="form-control dp-entry"
                             name="dp_{$field.name}"
                             id="dp_{$field.name}"
                             data-name="{$field.name}"
                             data-id-product="{$product->id}"
                             data-field="{json_encode($input_field)}"
                             aria-describedby="dp_symbol_{$input_field->id}"/>
                      {if $field.unit_displayed && $field.id_unit > 0}
                        <div class="input-group-append">
                        <span class="input-group-text dp_unit_symbol" style="font-size:.8rem;" id="dp_symbol_{$input_field->id}">
                          {if $field.unit_symbol != null}
                            {$field.unit_symbol}
                          {else}
                            {$field.unit_name}
                          {/if}
                            </span>
                        </div>
                      {/if}
                    </div>

                    {if !empty($input_field->short_description)}
                      <small id="dp_short_description_{$input_field->id}" class="form-text text-muted">{$input_field->short_description|escape:'htmlall':'UTF-8'}</small>
                    {/if}

                    {if !empty($input_field->description)}
                      <small id="dp_description_{$input_field->id}" class="form-text text-muted">{$input_field->description|escape:'htmlall':'UTF-8'}</small>
                    {/if}
                    {*        End numeric input            *}
                  {elseif $type == 'slider'}
                    Slider
                  {elseif $type == 'dropdown'}
                    {*        Start dropdown input            *}
                    <div data-name="{$field.name}" data-id-product="{$product->id}" data-id="{$input_field->id}" data-id-group="{$field.id_group}" data-id-step="{$field.id_step}" class="dp_field_container dp_type_{$type}"></div>
                    {if $input_field->label}
                      <label class="dp-input-field-{$field.name|escape:'htmlall':'UTF-8'}" for="dp_{$field.name}">{ucfirst($input_field->label)|escape:'htmlall':'UTF-8'}</label>
                    {/if}

                    <div class="input-group mb-1">
                      <select
                        {if $field.settings.required}required="{$field.settings.required}"{/if}
                        {if $field.settings.multiselect}multiple="{$field.settings.multiselect}"{/if}
                        class="form-control dp-entry"
                        name="dp_{$field.name}{if $field.settings.multiselect}[]{/if}"
                        id="dp_{$field.name}"
                        data-id-product="{$product->id}"
                        data-name="{$field.name}"
                        data-field="{json_encode($input_field)}"
                        aria-describedby="dp_symbol_{$input_field->id}">
                        {foreach $field.options as $key => $option}
                          <option id="dp-option-{$option.id_dropdown_option}" value="{$option.value}" {if $input_field->value == $option.value || $option.is_default}selected{/if}>{ucfirst($option.label)}</option>
                        {/foreach}
                      </select>
                      {if $field.unit_displayed && $field.id_unit > 0}
                        <div class="input-group-append">
                        <span class="input-group-text dp_unit_symbol" style="font-size: .8rem;" id="dp_symbol_{$input_field->id}">
                          {if $field.unit_symbol != null}
                            {$field.unit_symbol}
                          {else}
                            {$field.unit_name}
                          {/if}
                            </span>
                        </div>
                      {/if}
                    </div>

                    {if !empty($input_field->short_description)}
                      <small id="dp_short_description_{$input_field->id}" class="form-text text-muted">{$input_field->short_description|escape:'htmlall':'UTF-8'}</small>
                    {/if}

                    {if !empty($input_field->description)}
                      <small id="dp_description_{$input_field->id}" class="form-text text-muted">{$input_field->description|escape:'htmlall':'UTF-8'}</small>
                    {/if}
                    {*        End dropdown input            *}
                  {elseif $type == 'radio'}
                    Radio
                  {elseif $type == 'checkbox'}
                    Checkbox
                  {elseif $type == 'switch'}
                    Switch
                  {elseif $type == 'text'}
                    Text
                  {elseif $type == 'textarea'}
                    Textarea
                  {elseif $type == 'date'}
                    Datum
                  {elseif $type == 'file'}
                    Bestand upload
                    {*                {else}*}
                    {*                  {$input_field->displayValue()|escape:'htmlall':'UTF-8'}*}
                  {/if}
                  <br class="field-br">
                  {if isset($input_field->weight) && $input_field->canDisplayWeight()}
                    <br>
                    <span>
                <strong>{l s='Weight' mod='dynamicproduct'}:</strong>
                  <span class="dp-weight">{$input_field->getWeight()|floatval}</span> {Configuration::get('PS_WEIGHT_UNIT')|escape:'htmlall':'UTF-8'}
              </span>
                  {/if}
                {/foreach}
                {if count($grouped_fields) > 1}
                  <br>
                {/if}

              {/foreach}
            {/if}

          </div>
        </div>


        {* Quantity *}
        <div class="row dynamicproductform-totalen">
          <div class="form-group col-sm-12">
            <label for="aantal">Aantal</label>
            <div class="input-group">
              <input type="number" min="1" step="1" class="form-control quantity" data-name="{$field.name}" name="quantity" id="quantity" value="1">
              <div class="input-group-append">
                <div class="input-group-text" style="font-size: .8rem;">stuk(s)</div>
              </div>
            </div>
            <span class="error-message"></span>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12" id="price-specification">
            <table id="price-specification-table" style="width:100%;line-height:2.5;margin-bottom:20px;">
{*              <tr>*}
{*                <td>Producten</td>*}
{*                <td class="price-td">*}
{*                  <div id="price_excl_no_addition" class="price product-price excl">*}
{*                    <input type="hidden" name="price_excl_no_addition" value="{0}" />*}
{*                    <span class="subtotal-inc-price">&euro; {number_format(Tools::convertPrice(0),2,',','.')}</span>*}
{*                  </div>*}
{*                </td>*}
{*              </tr>*}
{*              <tr id="tr_dynamicproduct_discount_price">*}
{*                <td>Korting</td>*}
{*                <td class="price-td" style="border-bottom:1px solid #ccc">*}
{*                  <div id="dynamicproduct_discount_price" class="price product-price excl">*}
{*                    <span class="subtotal-inc-price">&euro; {number_format(Tools::convertPrice(-0),2,',','.')}</span>*}
{*                  </div>*}
{*                </td>*}
{*              </tr>*}
              <tr>
                <td>Totaal</td>
                <td class="price-td">
                  <div id="total" class="price product-price excl">
                    <span class="subtotal-inc-price">&euro; {number_format(Tools::convertPrice(0),2,',','.')}</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      {* Footer *}
      <div class="modal-footer">
        <button type="button" class="btn view_button btn-default btn-cancel" data-dismiss="modal">Sluiten</button>
        <button type="button" class="btn view_button btn-success addToCart" data-dismiss="modal">In winkelwagen</button>
      </div>
    </div>
  </form>
</div>
