<script type="text/javascript">
let kiyohDataLink =  "https://www.kiyoh.com/reviews/1046584/ijzershop";
let kiyohDataAverage =  "{$attr['averageRating']}";
let kiyohDataAveragePercentage =  "{$attr['averageRatingPercentage']}";
let kiyohDataTotal =  "{$attr['totalReviews']}";



</script>

<script type="application/ld+json">
  {
      "@context": "https://schema.org/",
      "@type": "Product",
      "image": "",
      "name": "Ijzershop.nl",
      "sameAs": "https://www.Ijzershop.nl",
      "aggregateRating":"{$attr['rating'] nofilter}"
}
</script>

{assign var="transmissionCarrier" value=Carrier::getCarrierByReference(2,Context::getContext()->cookie->id_lang)}
{assign var="defaultShippingPrice" value=$transmissionCarrier->getMaxDeliveryPriceByPrice(Context::getContext()->country->id_zone)}

<div id="kiyoh-block" class="text-decoration-none text-dark d-flex">
  <ul class="list-group mx-auto">
    <li class="list-group-item border-0 p-0"><a target="_blank" href="https://www.kiyoh.com/reviews/1046584/ijzershop" title="{l s='98% adviseert de IJzershop!, lees hier onze reviews' d='Modules.Ijzershopkiyoh.kiyoh-score-header-block'}"><span class="icon"><i class="pr-2 fasr fa-heart d-none d-sm-inline-flex"></i></span><span class="text">{$attr['averageRatingPercentage']}% adviseert de IJzershop!</span></a></li>
    <li class="list-group-item border-0 p-0"><a target="_blank" href="https://www.kiyoh.com/reviews/1046584/ijzershop" title="{l s='98% adviseert de IJzershop!, lees hier onze reviews' d='Modules.Ijzershopkiyoh.kiyoh-score-header-block'}"><span class="icon"><i class="pr-2 fasr fa-star d-none d-sm-inline-flex"></i></span><span class="text">Wij krijgen {str_replace('.',',', $attr['averageRating'])}/10 van {$attr['totalReviews']} klanten</span></a></li>
    <li class="list-group-item border-0 p-0"><a href="{$attr['shippingPage']|escape:'html'}" title="{l s='Verzonden met 1 werkdag, lees hier over onze verzending' d='Modules.Ijzershopkiyoh.kiyoh-score-header-block'}"><span class="icon"><i class="pr-2 fasr fa-truck-fast d-none d-sm-inline-flex"></i></span><span class="text">Verzonden met <b>1 werkdag</b> voor <b> {number_format(Tools::convertPrice($defaultShippingPrice*1.21),0,',','.')},-</b></span></a></li>
  </ul>
</div>




