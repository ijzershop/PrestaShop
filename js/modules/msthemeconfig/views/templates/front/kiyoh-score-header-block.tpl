<script type="text/javascript">
let kiyohDataLink =  "https://www.kiyoh.com/reviews/1046584/ijzershop";
let kiyohDataAverage =  "{$attr['averageRating']}";
let kiyohDataAveragePercentage =  "{$attr['averageRatingPercentage']}";
let kiyohDataTotal =  "{$attr['totalReviews']}";
</script>
<style>
  #kiyoh-block .list-group-item{
    padding: .2rem !important;
  }
</style>
<div id="kiyoh-block" class="text-decoration-none text-dark d-flex">
  <ul class="list-group mx-auto">
    <li class="list-group-item border-0"><a target="_blank" href="https://www.kiyoh.com/reviews/1046584/ijzershop"
                                            title="{l s='98% adviseert de IJzershop!, lees hier onze reviews' d='Modules.Ijzershopkiyoh.kiyoh-score-header-block'}"><span
          class="icon"><i class="pr-2 fass fa-heart d-inline-flex"></i></span><span
          class="text text-sm">{$attr['averageRatingPercentage']}% adviseert de IJzershop!</span></a></li>

    <li class="list-group-item border-0 slide_hidden"><a target="_blank" href="https://www.kiyoh.com/reviews/1046584/ijzershop" title="{l s='98% adviseert de IJzershop!, lees hier onze reviews' d='Modules.Ijzershopkiyoh.kiyoh-score-header-block'}"><span class="icon"><i class="pr-2 fass fa-star d-inline-flex"></i></span><span class="text text-sm">Wij krijgen {$attr['averageRating']|replace:'.':','}/10 van {$attr['totalReviews']} klanten</span></a></li>
    <li class="list-group-item border-0 slide_hidden"><a href="{$attr['shippingPage']|escape:'html'}" title="{l s='Verzonden met 1 werkdag, lees hier over onze verzending' d='Modules.Ijzershopkiyoh.kiyoh-score-header-block'}"><span class="icon"><i class="pr-2 fass fa-truck-fast d-inline-flex"></i></span><span class="text text-sm">Verzonden met <b>1 werkdag</b> voor <b>{$attr['shippingPriceText']|escape:'html'}</b></span></a></li>
  </ul>
</div>
<script type="application/ld+json">
  {
      "@context": "https://schema.org/",
      "@type": "Product",
      "image": "",
      "name": "Ijzershop.nl",
      "sameAs": "https://www.Ijzershop.nl",
      "aggregateRating":{$attr['rating'] nofilter}
  }
</script>
<script type="text/javascript">
document.addEventListener('DOMContentLoaded', () => {
  // Get the ul element
  const ul = document.querySelector('#kiyoh-block ul');
  // Get all the li elements
  const lis = ul.querySelectorAll('li');
  // Current position
  let pos = 0;
  // Next slide function
  const next = () => {
    // Hide current li
    lis[pos].classList.add('slide_hidden');
    // Increment pos
    pos++;

    // Wrap position if needed
    if (pos >= lis.length) {
      pos = 0;
    }

    // Show next li
    lis[pos].classList.remove('slide_hidden');
  }
  // Set first slide
  lis[pos].classList.remove('slide_hidden');
  // Auto slide
  setInterval(() => {
    next();
  }, 4000);
});
</script>




