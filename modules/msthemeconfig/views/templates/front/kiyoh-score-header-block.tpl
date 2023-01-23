<script type="text/javascript">
let kiyohDataLink =  "{$attr['reviewPage']}";
let kiyohDataAverage =  "{$attr['averageRating']}";
let kiyohDataAveragePercentage =  "{$attr['averageRatingPercentage']}";
let kiyohDataTotal =  "{$attr['totalReviews']}";
</script>

{assign var="transmissionCarrier" value=Carrier::getCarrierByReference(2,Context::getContext()->cookie->id_lang)}
{assign var="defaultShippingPrice" value=$transmissionCarrier->getMaxDeliveryPriceByPrice(Context::getContext()->country->id_zone)}

<div id="kiyoh-block" class="text-decoration-none text-dark d-flex">
  <ul class="list-group mx-auto">
    <li class="list-group-item border-0 p-0"><a href="{$attr['reviewPage']|escape:'html'}" title="{l s='98% adviseert de IJzershop!, lees hier onze reviews' d='Modules.Ijzershopkiyoh.kiyoh-score-header-block'}"><span class="icon"><i class="pr-2 fass fa-heart d-none d-sm-inline-flex"></i></span><span class="text">{$attr['averageRatingPercentage']}% adviseert de IJzershop!</span></a></li>
    <li class="list-group-item border-0 p-0"><a href="{$attr['reviewPage']|escape:'html'}" title="{l s='98% adviseert de IJzershop!, lees hier onze reviews' d='Modules.Ijzershopkiyoh.kiyoh-score-header-block'}"><span class="icon"><i class="pr-2 fass fa-star d-none d-sm-inline-flex"></i></span><span class="text">Wij krijgen {str_replace('.',',', $attr['averageRating'])}/10 van {$attr['totalReviews']} klanten</span></a></li>
    <li class="list-group-item border-0 p-0"><a href="{$attr['shippingPage']|escape:'html'}" title="{l s='Verzonden met 1 werkdag, lees hier over onze verzending' d='Modules.Ijzershopkiyoh.kiyoh-score-header-block'}"><span class="icon"><i class="pr-2 fass fa-truck-fast d-none d-sm-inline-flex"></i></span><span class="text">Verzonden met <b>1 werkdag</b> voor <b> {number_format(Tools::convertPrice($defaultShippingPrice),2,',','.')},-</b></span></a></li>
  </ul>
</div>
