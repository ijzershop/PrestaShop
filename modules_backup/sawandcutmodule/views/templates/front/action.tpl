<script>
  var url = "{$link->getModuleLink('sawandcutmodule', 'ajax', array() ) nofilter}";
</script>
{assign var=sawLength value=0}
{assign var=cutLength value=0}
{assign var=cutWidth value=0}
{foreach from=$product.features item=feature}
    {if (int)$feature.id_feature == (int)$attr.sawLength}
      {assign var='sawLength' value=(int)$feature.value}
  {/if}
    {if (int)$feature.id_feature == (int)$attr.cutLength}


  {assign var='cutLength' value=(int)$feature.value}
  {/if}
  {if (int)$feature.id_feature == (int)$attr.cutWidth}
  {assign var='cutWidth' value=(int)$feature.value}
  {/if}
{/foreach}



{if $page.page_name != 'category' && $page.page_name != 'search'}
{* Is on the  single product page *}
{*    {var_export([$attr,$cutWidth, $cutLength, $sawLength])}*}
  <div class="platecutting zaagsnedes row h-100 mt-1">
{if $sawLength > 0 || $cutLength > 0}
    <div class="zaagsnedesbuttons col mt-2 mt-md-0 mb-1  mb-md-1">
      <div class="zaagsnedes {if $sawLength < 0 || $cutLength < 0 } col-sm-2 col-md-1 col-lg-3{/if}" {if $sawLength <= 0 && $cutLength <= 0 }style="display:none;text-align:right;height:100%;"{else}style="text-align:right;height:100%;"{/if}>
        {if $sawLength > 0}
        {include file="modules/sawandcutmodule/views/templates/front/saw-action-buttons-product-page.tpl" product=$product}
        {/if}
        {if $cutLength > 0}
        {include file="modules/sawandcutmodule/views/templates/front/cut-action-buttons-product-page.tpl" singleCutEnabled=$attr.singleCutEnabled  product=$product  cutLength=$cutLength  cutWidth=$cutWidth minCutSize=$product->min_cut_size  maxCuts=$attr.maxCuts combiPrices=json_encode($attr.combiPrices) minRemainder=$product->min_cut_remainder}
        {/if}
      </div>
    </div>
  {/if}
{*    {if !empty(SpecificPrice::getByProductId($product->id_product))}*}
{*      <div class="col">*}
{*      <div class="btn-group btn-group-sm w-100 h-100">*}
{*        <button type="button" class="btn staffel-button" data-toggle="modal" data-target="#staffel-modal" data-product-id="{$product->id_product}"><span class="fasl fa-percent-staffel"></span> <span class="info d-none d-md-none d-sm-inline-block d-lg-inline-block">Staffelkorting</span></button>*}
{*                        {foreach from=$product.flags item=flag}*}
{*                  {if $flag.type == 'discount'}*}
{*                  <button type="button" class="btn btn-danger product-flag {$flag.type}"><span>{$flag.label}</span></button>*}
{*                  {/if}*}
{*                {/foreach}*}
{*            </div>*}
{*      </div>*}
{*  {/if}*}
{*          <div class="col">*}
{*            <div class="btn-group btn-group-sm w-100 h-100">*}
{*            <button type="button" class="btn open-comment-form staffel-button" data-toggle="modal" data-target="#post-product-comment-modal"><span class="fasl fa-edit"></span> <span class="info d-none d-md-none d-sm-inline-block d-lg-inline-block">Schrijf beoordeling</span></button>*}
{*            {foreach from=$product.flags item=flag}*}
{*                  {if $flag.type == 'discount'}*}
{*                  <button type="button" class="btn btn-danger product-flag {$flag.type}">{$flag.label}</button>*}
{*                  {/if}*}
{*                {/foreach}*}
{*            </div>*}
{*          </div>*}
  </div>
{else}
{* Is not on the  single product page *}
<table class="platecutting zaagsnedes w-100 h-100">
  <tr>
    <td class="zaagsnedesbuttons align-middle">
      {if $sawLength > 0 || $cutLength > 0}
        <div class="zaagsnedes {if $sawLength < 0 || $cutLength < 0 } col-sm-2 col-md-1 col-lg-3{/if}" {if $sawLength <= 0 && $cutLength <= 0 }style="display:none;text-align:right"{else}style="text-align:right"{/if}>
          {if $sawLength > 0}
          {include file="modules/sawandcutmodule/views/templates/front/saw-action-buttons.tpl" product=$product}
          {/if}
          {if $cutLength > 0}
          {include file="modules/sawandcutmodule/views/templates/front/cut-action-buttons.tpl" singleCutEnabled=$attr.singleCutEnabled  product=$product  cutLength=$cutLength  cutWidth=$cutWidth  minCutSize=$product->min_cut_size  maxCuts=$attr.maxCuts combiPrices=json_encode($attr.combiPrices) minRemainder=$product->min_cut_remainder}
          {/if}
        </div>
      {/if}
{*      {if !empty(SpecificPrice::getByProductId($product->id_product))}*}
{*          <div class="text-right mt-2">*}
{*            <div class="btn-group btn-group-sm w-100 h-100">*}
{*            <button type="button" class="btn staffel-button" data-toggle="modal" data-target="#staffel-modal" data-product-id="{$product->id_product}" ><span class="fasl fa-percent-staffel"></span> <span class="info d-none d-md-none d-sm-inline-block d-lg-inline-block">Staffelkorting</span></button>*}
{*                {foreach from=$product.flags item=flag}*}
{*                  {if $flag.type == 'discount'}*}
{*                  <button type="button" class="btn btn-danger product-flag {$flag.type}">{$flag.label}</button>*}
{*                  {/if}*}
{*                {/foreach}*}
{*            </div>*}
{*          </div>*}
{*      {/if}*}
    </td>
  </tr>
</table>
{/if}

