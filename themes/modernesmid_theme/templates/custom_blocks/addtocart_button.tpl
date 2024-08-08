    {assign var=orderable value=Product::isAvailableForOrderCustom((int)$product.id_product, $product.id_product_attribute)}

    {*   Start Multiple Quantity   *}
    <div id="multiple_qty_add_to_cart" data-product-id="{$product.id_product}" class="w-100" style="display: none;">
      <div class="input-group add-to-cart-input-group">
        {*  Start Minus Button    *}
        <span class="input-group-btn remove-cart-product-btn" data-product-id="{$product.id_product}">
            <button type="button" class="btn btn-danger btn-number" data-product-id="{$product.id_product}" data-type="remove" data-field="qty_{$product.id_product}">
              <span class="fasl fa-trash"></span>
            </button>
        </span>
        {*  End Minus Button    *}
        {*  Start Minus Button    *}
        <span class="input-group-btn minus-cart-product-btn" data-product-id="{$product.id_product}"  style="display: none;">
            <button type="button" class="btn btn-primary btn-number" data-product-id="{$product.id_product}" data-type="minus" data-field="qty_{$product.id_product}">
              <span class="fasl fa-minus"></span>
            </button>
        </span>
        {*  End Minus Button    *}
        {*  Start Quantity Input Button    *}
        <input
          class="form-control input-number text-center font-weight-bold" value="1"
          data-product-id="{$product.id_product}"
          type="number"
          name="qty_{$product.id_product}"
          id="quantity_wanted_{$product.id_product}"
          min="{$product.minimal_quantity}"
          max="{Product::isAvailableForOrderCustom((int)$product.id_product, $product.id_product_attribute, 'max')}"
          aria-label="{l s='Quantity' d='Shop.Theme.Actions'}"
          aria-describedby="addToCartInputHelp"
          readonly
        >
        {*  End Quantity Input Button    *}
        {*  Start Plus Button    *}
        <span class="input-group-btn">
              <button type="button" class="btn btn-primary btn-number" data-product-id="{$product.id_product}" data-type="plus" data-field="qty_{$product.id_product}">
                  <span class="fasl fa-plus"></span>
              </button>
        </span>
        {*  End Minus Button    *}
        {*  Start Help Text Input    *}
        <small id="addToCartInputHelp"  data-product-id="{$product.id_product}" class="form-text text-danger w-100 text-center"></small>
        {*  End Help Text Input    *}
      </div>
    </div>
    {*   End Multiple Quantity   *}


    {*   Start Buttons: Info, Modification, Add 1 to cart   *}
    <div id="options_add_to_cart" class="w-100" data-product-id="{$product.id_product}">
      <div class="input-group add-to-cart-input-group">
          <span class="input-group-btn col-3 p-0">
              <a href="{$product.url}" data-product-id="{$product.id_product}" class="btn btn-primary w-100 h-100">
                <span class="fasl fa-info-circle"></span>
              </a>
          </span>
          {if $orderable}
          {*     Start when product is orderable       *}

              {*     Saw & Cut buttons         *}
              {if $type != '' && $type != 'dynamic'}
                <span class="input-group-btn col-3 p-0">
                {if $type == 'saw'}
                  {*       Saw Button       *}
                  <button type="button" class="btn btn-default w-100 h-100 btn-outline-dark" data-type="modify"
                          data-field="qty-wanted">
                    <span class="fak fa-saw"></span>
                  </button>
                {*       End Saw Button       *}
                {elseif $type == 'cut'}
                  {*       Cut Button       *}
                  <button type="button" class="btn btn-default w-100 h-100 btn-outline-dark" data-type="modify"
                          data-field="qty-wanted">
                    <span class="fasl fa-scissors"></span>
                  </button>
                  {*       End Cut Button       *}
                {/if}
              </span>
            {/if}
            {*     End Saw & Cut buttons         *}

            {if $type == 'dynamic'}
              {*       Dynamic Product Button       *}
              <span class="input-group-btn {if $type == '' || $type == 'dynamic'}col-9{else}col-6{/if} p-0">
                    <button type="button" class="btn btn-success w-100 h-100" data-type="minus" data-field="qty-wanted">
                      <span class="fasl fa-sliders-up" data-product-id="{$product.id_product}"></span>
                    </button>
                </span>
              {*       End Dynamic Product Button       *}
            {elseif in_array($type, ['', 'cut', 'saw'])}
              {*       AddToCart Button       *}
              <span class="input-group-btn {if $type == '' || $type == 'dynamic'}col-9{else}col-6{/if} p-0">
                    <a
                      aria-label="Voeg {$product.name|truncate:30:'...'} toe aan winkelwagen"
                      alt="Voeg {$product.name|truncate:30:'...'} toe aan winkelwagen"
                      href="{$link->getPageLink('cart', null, Context::getContext()->language->id,['token'=>$static_token], false, Context::getContext()->shop->id)}"
                      data-product-id="{$product.id_product}"
                      data-product-customization="{json_encode($product.id_customization)}"
                      class="btn btn-success w-100 h-100 add-to-cart {Product::isAvailableForOrderCustom((int)$product.id_product, $product.id_product_attribute, 'class')}"
                      data-button-action="add-to-cart">
                      <span class="fasl fa-plus"  data-product-id="{$product.id_product}"></span> <span class="fasl fa-shopping-cart" data-product-id="{$product.id_product}"></span>
                    </a>
                </span>
              {*       End AddToCart Button       *}
            {/if}

            {*     End when product is orderable       *}
          {else}
            {*     Start when product is not orderable       *}
            {*       No Stock Button       *}
            <span class="input-group-btn col-9 p-0">
                    <button type="button" class="btn btn-danger w-100 h-100" data-type="minus" data-field="qty-wanted">
                      <span class="fasl fa-ban"></span> Geen voorraad
                    </button>
                </span>
            {*       End No Stock Button       *}
            {*     End when product is not orderable       *}
          {/if}

      </div>
    </div>
    {*   End Buttons: Info, Modification, Add 1 to cart   *}




