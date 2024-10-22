<!-- <div class="btn-group" id="store-switcher">
  <button type="button" class="btn btn-outline btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Bekijk onze andere winkels
  </button>
  <div class="dropdown-menu p-0">
    {foreach from=ShopGroup::getShopGroups(true) key=groupKey item=group}
      {if $groupKey > 0}
        <a class="dropdown-item pl-1 pr-2" href="#" data-key="{$groupKey}">{$group->name}</a>
        <div class="dropdown-divider px-1"></div>
      {/if}
      {foreach from=Shop::getShops(true, $group->id) key=shopKey item=shop}
        {if $shop.active && $shop.id_shop !== Context::getContext()->shop->id}
          <a class="dropdown-item pl-1 pr-2" href="https://{$shop.domain_ssl}" data-key="{$shopKey}">
            <img class="store-switcher-shop-logo mr-1" src="/themes/modernesmid_theme/assets/favicons/{Context::getContext()->shop_favicon}_favicons/favicon-32x32.png"/> <span class="font-weight-bold"> {$shop.name}</span></a>
        {/if}
      {/foreach}
    {/foreach}
  </div>
</div> -->
