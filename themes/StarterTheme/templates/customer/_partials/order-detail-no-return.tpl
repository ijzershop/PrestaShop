<table>
  <thead>
    <tr>
      <th>{l s='Reference'}</th>
      <th>{l s='Product'}</th>
      <th>{l s='Quantity'}</th>
      <th>{l s='Unit price'}</th>
      <th>{l s='Total price'}</th>
    </tr>
  </thead>

  {foreach from=$products item=product}
    <tr>
      <td>{$product.product_reference}</td>
      <td>{$product.product_name}</td>
      <td>{$product.product_quantity}</td>
      <td>{$product.unit_price}</td>
      <td>{$product.total_price}</td>
    </tr>
    {if $product.customizations}
      {foreach $product.customizations  as $customization}
        <tr>
          <td colspan="2">
            <ul>
              {foreach from=$customization.fields item=field}
                {if $field.type == 'image'}
                  <li><img src="{$field.image.small.url}" alt="" /></li>
                {elseif $field.type == 'text'}
                  <li>{$field.label} : {$field.text}</li>
                {/if}
              {/foreach}
            </ul>
          </td>
          <td>{$customization.quantity}</td>
          <td colspan="2"></td>
        </tr>
      {/foreach}
    {/if}
  {/foreach}

  <tfoot>
    {if $priceDisplay && $use_tax}
      <tr>
        <td>{l s='Items (tax excl.)'}</td>
        <td colspan="4">{$order.total_products}</td>
      </tr>
    {/if}
    <tr>
      <td>{l s='Items'} {if $use_tax}{l s='(tax incl.)'}{/if}</td>
      <td colspan="4">{$order.total_products_wt}</td>
    </tr>
    {if $order.total_discounts}
      <tr>
        <td>{l s='Total vouchers'}</td>
        <td colspan="4">{$order.total_discounts}</td>
      </tr>
    {/if}
    {if $order.total_wrapping}
    <tr>
      <td>{l s='Total gift wrapping cost'}</td>
      <td colspan="4">{$order->total_wrapping}</td>
    </tr>
    {/if}
    <tr>
      <td>{l s='Shipping & handling'} {if $use_tax}{l s='(tax incl.)'}{/if}</td>
      <td colspan="4">{$order.total_shipping}</td>
    </tr>
    <tr>
      <td>{l s='Total'}</td>
      <td colspan="4">{$order.total_paid}</td>
    </tr>
  </tfoot>
</table>
