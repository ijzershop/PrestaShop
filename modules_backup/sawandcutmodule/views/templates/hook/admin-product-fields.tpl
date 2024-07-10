<div class="mb-3">
    <div class="sawandcutmodule content"></div>
    <h2>{l s='Zagen' mod='sawandcutmodule'}</h2>
    <fieldset class="form-group mb-0">
        <label class="form-control-label">{l s='Saw Loss' mod='sawandcutmodule'}</label>
    {if is_null($saw_loss) || $saw_loss == 0}  
        <input class="form-control" value="{$default_sawloss}" name="saw_loss" type="text">
    {else}
        <input class="form-control" value="{$saw_loss}" name="saw_loss" type="text">
    {/if}
    </fieldset>
    <fieldset class="form-group mb-0">
        <label class="form-control-label">{l s='Minimum Saw Size' mod='sawandcutmodule'}</label>
    {if is_null($min_saw_size) || $min_saw_size == 0}  
        <input class="form-control" value="{$default_minsawsize}" name="min_saw_size" type="text">
    {else}
        <input class="form-control" value="{$min_saw_size}" name="min_saw_size" type="text">
    {/if}
    </fieldset>
    <h2>{l s='Knippen' mod='sawandcutmodule'}</h2>
    <fieldset class="form-group mb-0">
        <label class="form-control-label">{l s='Minimum Cut Size' mod='sawandcutmodule'}</label>
    {if is_null($min_cut_size) || $min_cut_size == 0}  
        <input class="form-control" value="{$default_mincutsize}" name="min_cut_size" type="text">
    {else}
        <input class="form-control" value="{$min_cut_size}" name="min_cut_size" type="text">
    {/if}
    </fieldset>
    <fieldset class="form-group mb-0">
        <label class="form-control-label">{l s='Minimum Cut Remainder' mod='sawandcutmodule'}</label>
    {if is_null($min_cut_remainder) || $min_cut_remainder == 0}  
        <input class="form-control" value="{$default_mincutremainder}" name="min_cut_remainder" type="text">
    {else}
        <input class="form-control" value="{$min_cut_remainder}" name="min_cut_remainder" type="text">
    {/if}
    </fieldset>
    <h2>{l s='Knip en Zaag kosten' mod='sawandcutmodule'}</h2>
    <fieldset class="form-group mb-0">
        <label class="form-control-label">{l s='Default cut price' mod='sawandcutmodule'}</label>
        <input class="form-control" value="{$default_cut_price}" name="default_cut_price" type="text">
    </fieldset>
    <div class="clearfix"></div>
</div>