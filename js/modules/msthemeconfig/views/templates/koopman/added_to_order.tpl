<div class="w-100">
  <div class="col-12">
    <div class="card row">
      <div class="card-body">
        <form class="mt-2" method="post" id="{$form_id}">
          <input type="hidden" name="addedToOrderChoice" id="addedToOrderChoice" value="1"/>
          {foreach from=$get_params key=key item=value}
            <input type="hidden" name="{$key}" value="{$value}"/>
          {/foreach}

          Dit is een toevoeging aan bestelling met factuurnummer(s):
          <table class="table w-100">
            {foreach from=$linked_orders item=order}
              <tr>
                <td>
                  <input type="checkbox" class="form-control linked_order"
                         value="{$order.id}"
                         data-tracking="{$order.tracking_number}"
                         data-weight="{$order.weight}"
                         name="linked_orders[]" checked/>
                </td>
                <td>
                  <a class="text-decoration-none"
                     href="/admin-dev/index.php/sell/orders/{$order.id}/generate-delivery-slip-pdf"
                     target="_blank">{$order.reference}</a>
                </td>
                <td>{$order.weight}<sub>kg</sub></td>
                <td>{$order.tracking_number}</td>
                <td>{$order.order_state_name}</td>
              </tr>
            {/foreach}
          </table>
          <div class="w-100">
            <div class="btn-group w-100" role="group" aria-label="Basic example">
              <button type="button" data-all="0" class="btn btn-danger">Nee, alleen deze</button>
              <button type="button" data-all="1" class="btn btn-success">Ja, alle geselecteerden</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
