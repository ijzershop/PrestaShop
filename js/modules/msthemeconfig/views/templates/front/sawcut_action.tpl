<script>
  var url = "{$link->getModuleLink('msthemeconfig', 'ajax', array() ) nofilter}";
</script>
{assign var=sawLength value=0}
{assign var=cutLength value=0}
{assign var=cutWidth value=0}
{assign var=plasmaEnabled value=$plasmaEnabled|default:false}
{assign var=showAddToCartButton value=!$attr.is_catalog}
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
{if $plasmaEnabled || $sawLength > 0 || $cutLength > 0}
    <div class="zaagsnedesbuttons col mt-2 mt-md-0 mb-1  mb-md-1">
      <div class="zaagsnedes {if !$plasmaEnabled && ($sawLength < 0 || $cutLength < 0)} col-sm-2 col-md-1 col-lg-3{/if}" style="text-align:right;height:100%;">
        {if !$plasmaEnabled && $sawLength > 0}
        {include file="modules/msthemeconfig/views/templates/front/saw-action-buttons-product-page.tpl" product=$product}
        {/if}
        {if $plasmaEnabled || $cutLength > 0}
        {include file="modules/msthemeconfig/views/templates/front/cut-action-buttons-product-page.tpl" singleCutEnabled=$attr.singleCutEnabled  product=$product  cutLength=$cutLength  cutWidth=$cutWidth minCutSize=$product.min_cut_size  maxCuts=$attr.maxCuts combiPrices=$attr.combiPrices|json_encode minRemainder=$product.min_cut_remainder}
        {/if}
      </div>
    </div>
  {/if}
  </div>
{else}
{* Is not on the  single product page *}
<table class="platecutting zaagsnedes w-100 h-100">
  <tr>
    <td class="zaagsnedesbuttons align-middle">
      {if $plasmaEnabled || $sawLength > 0 || $cutLength > 0}
        <div class="zaagsnedes {if !$plasmaEnabled && ($sawLength < 0 || $cutLength < 0)} col-sm-2 col-md-1 col-lg-3{/if}" style="text-align:right">
          {if !$plasmaEnabled && $sawLength > 0}
          {include file="modules/msthemeconfig/views/templates/front/saw-action-buttons.tpl" product=$product}
          {/if}
          {if $plasmaEnabled || $cutLength > 0}
          {include file="modules/msthemeconfig/views/templates/front/cut-action-buttons.tpl" singleCutEnabled=$attr.singleCutEnabled  product=$product  cutLength=$cutLength  cutWidth=$cutWidth  minCutSize=$product.min_cut_size  maxCuts=$attr.maxCuts combiPrices=$attr.combiPrices|json_encode minRemainder=$product.min_cut_remainder}
          {/if}
        </div>
      {/if}
    </td>
  </tr>
</table>
{/if}
