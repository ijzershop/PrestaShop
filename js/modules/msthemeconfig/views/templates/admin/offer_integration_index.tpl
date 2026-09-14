{* Fallback template when Twig is not available. Provides a simple list view for Offers. *}
<div class="container">
  <div class="row">
    <div class="col-12">
      <h1>{$layoutTitle|default:'Offer Integration'}</h1>
      {if isset($layoutHeaderToolbarBtn.new_offer.href)}
        <p>
          <a class="btn btn-primary" href="{$layoutHeaderToolbarBtn.new_offer.href|escape:'html'}">{$layoutHeaderToolbarBtn.new_offer.desc|default:'Maak nieuwe offerte'}</a>
        </p>
      {/if}

      {assign var=grid value=$offerIntegrationGrid}
      {if isset($grid.data.records) && $grid.data.records|@count > 0}
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                {foreach from=$grid.columns item=col}
                  <th>{$col.name|default:$col.id|escape:'html'}</th>
                {/foreach}
              </tr>
            </thead>
            <tbody>
              {foreach from=$grid.data.records item=row}
                <tr>
                  {foreach from=$grid.columns item=col}
                    {assign var=colId value=$col.id}
                    <td>{if isset($row[$colId])}{$row[$colId]|escape:'html'}{else}-{/if}</td>
                  {/foreach}
                </tr>
              {/foreach}
            </tbody>
          </table>
        </div>
      {else}
        <div class="alert alert-info">Er zijn nog geen offertes gevonden.</div>
      {/if}
    </div>
  </div>
</div>
