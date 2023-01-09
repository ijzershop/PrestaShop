{extends file='customer/_partials/address-form.tpl'}

{block name='form_field'}
  {if $field.name eq "alias"}
    {* we don't ask for alias here *}
  {else}
    {$smarty.block.parent}
  {/if}
{/block}

{block name="address_form_url"}
    <form
      id="customer_address_form"
      method="POST"
      action="{url entity='order' params=['id_address' => $id_address]}"
      data-id-address="{$id_address}"
      data-refresh-url="{url entity='order' params=['ajax' => 1, 'action' => 'addressForm']}"
    >
{/block}

{block name='form_fields' append}
  <input type="hidden" name="saveAddress" value="{$type}">
  {if $type === "delivery"}
    <div class="form-group col-12">
      <div>
        <input name = "use_same_address" id="use_same_address" type = "checkbox" value = "1" {if $use_same_address} checked {/if}>
        <label for="use_same_address">{l s='Use this address for invoice too' d='Shop.Theme.Checkout'}</label>
      </div>
    </div>
  {/if}
{/block}

{block name='form_buttons'}
  {if !$form_has_continue_button}
      <div class="row">
      <div class="btn btn-group btn-group-justified col-12" >
    <button type="submit" class="btn btn-primary  col-12 col-sm-5 col-md-4 float-xs-right">{l s='Save' d='Shop.Theme.Actions'}</button>
    <a class="js-cancel-address cancel-address btn btn-secondary btn-dark w-100 float-xs-right" href="{url entity='order' params=['cancelAddress' => {$type}]}">{l s='Cancel' d='Shop.Theme.Actions'}</a>
  </div>
</div>
  {else}
    <form>
        <div class="row">
      <div class="btn btn-group btn-group-justified col-12" >
          {if $customer.addresses|count > 0}
            <a class="js-cancel-address btn btn-secondary btn-danger col-12 col-sm-5 col-md-4 cancel-address float-xs-right" href="{url entity='order' params=['cancelAddress' => {$type}]}">{l s='Cancel' d='Shop.Theme.Actions'}</a>
          {/if}
          
          <button type="submit" class="continue {if $customer.addresses|count > 0} col-sm-7 col-md-8 {else} col-12 {/if} btn btn-secondary btn-dark w-100 float-xs-right" name="confirm-addresses" value="1" {if !$customer.addresses}disabled{/if}>
              {l s='Continue' d='Shop.Theme.Actions'}
          </button>
        </div>
      </div>
    </form>
  {/if}
{/block}

