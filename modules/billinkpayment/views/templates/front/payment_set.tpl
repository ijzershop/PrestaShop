
<div class="extended">
{if $check > 0}
    <form action="{$action}" id="payment-form">
{else}
    <form action="{$action}" id="payment-form">
{/if}
    <h1>{l s='Koop nu en betaal binnen 14 dagen op factuur' mod='billinkpayment'}</h1>

    <p>
        <label>Uw geboortedatum: </label>
        <select name="dag" required>
            <option value="0">Dag</option>
            {section name=foo start=1 loop=32 step=1}
                <option value="{$smarty.section.foo.index}" {if $smarty.section.foo.index == $birthday_dag}selected=selected{/if}>{$smarty.section.foo.index}</option>
            {/section}
        </select>
        <select name="maand" required>
            <option value="0">Maand</option>
            {foreach from=$maanden item=maand key=key}
                <option value="{$key}" {if $key == $birthday_maand}selected=selected{/if}>{$maand}</option>
            {/foreach}
        </select>
        <select name="jaar" required>
            <option value="0">Jaar</option>
            {section name=foo start=1900 loop=$current_year+1 step=1}
                <option value="{$smarty.section.foo.index}" {if $smarty.section.foo.index == $birthday_jaar}selected=selected{/if}>{$smarty.section.foo.index}</option>
            {/section}
        </select>
    </p>

    <p>
        <label>Telefoonnummer: </label><br/>
        <input type="number" name="tn" value="{$telefoon_account}" required/>
    </p>

    <p>
        <input type="hidden" name="scbk" value="{$token}" required/>
		<input type="hidden" name="validateme" value="yes"/>
    </p>
    <p>
        <b>Let op! eenmalig &euro; {$billink_costs} incl. BTW administratiekosten</b>
    </p>
    <p>
        <small>{l s='Na succesvolle controle kunt u direct afrekenen met Billink'}</small>
    </p>
</form>
</div>
<style>
    .extended {
        display: block;
        border: 1px solid #d6d4d4;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        font-size: 17px;
        line-height: 23px;
        color: #333;
        font-weight: bold;
        padding: 33px 40px 34px 99px;
        letter-spacing: -1px;
        position: relative;
        background: url({$this_path_ssl}logo.png) 15px 15px no-repeat #fbfbfb;
    }
    .exclusive {
        margin-top: 10px;
    }
    .form {
        margin-top: 12px
    }
</style>
