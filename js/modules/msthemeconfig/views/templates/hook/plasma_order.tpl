<div class="card mt-3">
  <div class="card-header"><h3 class="card-header-title">{l s='Plasma cutting files' mod='msthemeconfig'}</h3></div>
  <div class="card-body">
    <p>{l s='Each unit is one complete 1000 x 500 mm sheet. Ship all cutouts and remaining material together.' mod='msthemeconfig'}</p>
    {foreach from=$plasma_order_parts item=part}
      <div class="d-flex align-items-center flex-wrap mb-3">
        <img src="{$part.preview_url|escape:'html':'UTF-8'}" alt="{$part.display_name|escape:'html':'UTF-8'}" width="240" height="120" class="img-thumbnail mr-3" loading="lazy">
        <div>
          <strong>{$part.display_name|escape:'html':'UTF-8'}</strong>
          <p>{l s='Full sheets' mod='msthemeconfig'}: {$part.product_quantity|intval}</p>
          <a class="btn btn-primary" href="{$part.download_url|escape:'html':'UTF-8'}"><i class="material-icons">download</i> {l s='Download Optimized DXF' mod='msthemeconfig'}</a>
        </div>
      </div>
    {/foreach}
  </div>
</div>
