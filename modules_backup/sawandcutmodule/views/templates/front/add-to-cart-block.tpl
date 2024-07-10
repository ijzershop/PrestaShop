<div class="actions">
  <div class="s_quantity_wanted qty_wrap">
    <input
    class="{*pro_quantity*}"
    type="text"
    value="{if $product.minimal_quantity}{$product.minimal_quantity}{else}1{/if}"
    name="pro_quantity"
    data-minimal-quantity="{$product.minimal_quantity}"
    data-quantity="{$product.quantity}"
    />
  </div>
  <div class="act_box_cart {if $sttheme.display_add_to_cart==2 || $sttheme.display_add_to_cart==5 || $sttheme.use_view_more_instead==1} display_normal {elseif $sttheme.display_add_to_cart==1 || $sttheme.display_add_to_cart==4 || (!$sttheme.display_add_to_cart && ($sttheme.pro_quantity_input==1 || $sttheme.pro_quantity_input==3)) || $sttheme.use_view_more_instead==2} display_when_hover {/if}{if $sttheme.mobile_add_to_cart} add_show_on_mobile {else} add_hide_on_mobile {/if}">
    {assign var="add_to_cart_class" value="btn btn-default"}
    {include file='catalog/_partials/miniatures/btn-add-to-cart.tpl' classname=$add_to_cart_class}
  </div>
</div>