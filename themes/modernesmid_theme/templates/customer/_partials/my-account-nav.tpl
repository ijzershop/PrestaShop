{block name='page_menu'}
    <ul class="nav nav-tabs d-flex flex-column">
      <li class="nav-item">
      <a class="nav-link btn-light {if $page.page_name == 'identity'}active{/if}" id="identity-link" href="{$urls.pages.identity}">
        <span class="link-item">
          <i class="fasr fa-info-circle"></i>
          {l s='Information' d='Shop.Theme.Customeraccount'}
        </span>
      </a>
    </li>

      {if $customer.addresses|count}
        <li class="nav-item">
        <a class="nav-link btn-light {if $page.page_name == 'addresses'}active{/if}" id="addresses-link" href="{$urls.pages.addresses}">
          <span class="link-item">
            <i class="fasr fa-location-dot"></i>
            {l s='Addresses' d='Shop.Theme.Customeraccount'}
          </span>
        </a>
      </li>
      {else}
        <li class="nav-item">
        <a class="nav-link btn-light {if $page.page_name == 'address'}active{/if}" id="address-link" href="{$urls.pages.address}">
          <span class="link-item">
            <i class="fasr fa-location-dot"></i>
            {l s='Add first address' d='Shop.Theme.Customeraccount'}
          </span>
        </a>
      </li>
      {/if}

      {if !$configuration.is_catalog}
        <li class="nav-item">
        <a class="nav-link btn-light {if $page.page_name == 'history'}active{/if}" id="history-link" href="{$urls.pages.history}">
          <span class="link-item">
            <i class="fasr fa-cart-shopping"></i>
            {l s='Order history and details' d='Shop.Theme.Customeraccount'}
          </span>
        </a>
      </li>
      {/if}

{*       {if !$configuration.is_catalog}
        <li class="nav-item">
        <a class="nav-link btn-light {if $page.page_name == 'order_slip'}active{/if}" id="order-slips-link" href="{$urls.pages.order_slip}">
          <span class="link-item">
            <i class="fasr fa-list"></i>
            {l s='Credit slips' d='Shop.Theme.Customeraccount'}
          </span>
        </a>
      </li>
      {/if} *}

   {if $configuration.voucher_enabled && !$configuration.is_catalog}
        <li class="nav-item">
        <a class="nav-link btn-light {if $page.page_name == 'discount'}active{/if}" id="discounts-link" href="{$urls.pages.discount}">
          <span class="link-item">
            <i class="fasr fa-tag"></i>
            {l s='Vouchers' d='Shop.Theme.Customeraccount'}
          </span>
        </a>
      </li>
      {/if}

      {if $configuration.return_enabled && !$configuration.is_catalog}
        <li class="nav-item">
        <a class="nav-link btn-light {if $page.page_name == 'order_follow'}active{/if}" id="returns-link" href="{$urls.pages.order_follow}">
          <span class="link-item">
            <i class="fasr fa-truck"></i>
            {l s='Merchandise returns' d='Shop.Theme.Customeraccount'}
          </span>
        </a>
      </li>
      {/if}

      {block name='display_customer_account'}
        {hook h='displayCustomerAccount'}
      {/block}
    </ul>
{/block}
