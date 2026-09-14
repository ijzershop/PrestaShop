{extends file='page.tpl'}

{block name='page_title'}
    Zendingstatus — Order {$order_reference|escape:'html':'UTF-8'}
{/block}

{block name='page_content'}
<div class="shipment-status-page">

    <h2 class="h3 mb-4">Zendingstatus</h2>
    <p class="text-muted mb-4">
        Ordernummer: <strong>{$order_reference|escape:'html':'UTF-8'}</strong>
    </p>

    {if !$has_statuses}
        <div class="alert alert-info">
            Er is nog geen verzendstatus beschikbaar voor uw bestelling.
            Dit wordt bijgewerkt zodra uw pakket is aangemeld bij de vervoerder.
        </div>
    {else}
        {foreach from=$shipment_statuses item=shipment}
        <div class="card mb-4 shipment-card {if $shipment.is_completed}shipment-completed{/if}">
            <div class="card-header d-flex justify-content-between align-items-center">
                <span class="font-weight-bold">
                    Tracking: {$shipment.tracking_number|escape:'html':'UTF-8'}
                </span>
                <span class="badge badge-{if $shipment.is_completed}success{elseif $shipment.status_code == 'REGISTERED'}secondary{else}primary{/if}">
                    {$shipment.status_description|escape:'html':'UTF-8'}
                </span>
            </div>
            <div class="card-body">

                {* ETA block — only shown when available *}
                {if $shipment.eta_date}
                <div class="alert alert-success mb-3">
                    <strong>Verwachte bezorging:</strong>
                    {$shipment.eta_date|escape:'html':'UTF-8'}
                    {if $shipment.eta_from && $shipment.eta_to}
                        tussen {$shipment.eta_from|truncate:5:'':true|escape:'html':'UTF-8'}
                        en {$shipment.eta_to|truncate:5:'':true|escape:'html':'UTF-8'}
                    {/if}
                </div>
                {/if}

                {* Status history timeline *}
                {if $shipment.full_history|@count > 0}
                <h6 class="mb-3">Statusgeschiedenis</h6>
                <ul class="list-group shipment-history">
                    {foreach from=$shipment.full_history item=entry}
                    <li class="list-group-item d-flex justify-content-between align-items-start py-2">
                        <div>
                            <span class="font-weight-bold">
                                {$entry.status_description|default:'–'|escape:'html':'UTF-8'}
                            </span>
                            {if isset($entry.eta)}
                            <br>
                            <small class="text-success">
                                ETA: {$entry.eta.date|escape:'html':'UTF-8'}
                                {if $entry.eta.from && $entry.eta.to}
                                    {$entry.eta.from|truncate:5:'':true|escape:'html':'UTF-8'}
                                    – {$entry.eta.to|truncate:5:'':true|escape:'html':'UTF-8'}
                                {/if}
                            </small>
                            {/if}
                            {if isset($entry.pod.signed_by)}
                            <br>
                            <small class="text-muted">
                                Getekend door: {$entry.pod.signed_by|escape:'html':'UTF-8'}
                            </small>
                            {/if}
                        </div>
                        <small class="text-muted text-nowrap ml-2">
                            {$entry.status_date|default:''|escape:'html':'UTF-8'}
                            {if $entry.status_time}
                                {$entry.status_time|truncate:5:'':true|escape:'html':'UTF-8'}
                            {/if}
                        </small>
                    </li>
                    {/foreach}
                </ul>
                {else}
                <p class="text-muted mb-0">
                    Status: <strong>{$shipment.status_description|escape:'html':'UTF-8'}</strong>
                    {if $shipment.status_date}— {$shipment.status_date|escape:'html':'UTF-8'}{/if}
                </p>
                {/if}

                <p class="text-muted mt-3 mb-0">
                    <small>Laatste update: {$shipment.date_upd|escape:'html':'UTF-8'}</small>
                </p>
            </div>
        </div>
        {/foreach}
    {/if}

    <a href="{$urls.pages.order_detail|cat:'?id_order='|cat:$order->id}" class="btn btn-secondary mt-2">
        &larr; Terug naar mijn bestelling
    </a>
</div>

<style>
.shipment-history .list-group-item:last-child {
    background-color: #f8f9fa;
    font-weight: 600;
}
.shipment-completed .card-header {
    background-color: #d4edda;
}
</style>
{/block}
