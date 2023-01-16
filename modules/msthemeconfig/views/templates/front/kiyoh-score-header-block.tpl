<script type="text/javascript">
let kiyohDataLink =  "{$attr['reviewPage']}";
let kiyohDataAverage =  "{$attr['averageRating']}";
let kiyohDataAveragePercentage =  "{$attr['averageRatingPercentage']}";
let kiyohDataTotal =  "{$attr['totalReviews']}";
</script>

<a id="kiyoh-block" class="text-decoration-none text-dark d-flex" href="{$link->getCMSLink($attr['reviewPage'], 'beoordelingen')|escape:'html'}" title="{l s='Read more of our reviews' d='Modules.Ijzershopkiyoh.kiyoh-score-header-block'}">
  <ul class="list-group mx-auto">
    <li class="list-group-item border-0 p-0"><span class="icon"><i class="pr-2 fass fa-heart d-none d-sm-inline-flex"></i></span><span class="text">{$attr['averageRatingPercentage']}% adviseert de IJzershop!</span></li>
    <li class="list-group-item border-0 p-0"><span class="icon"><i class="pr-2 fass fa-star d-none d-sm-inline-flex"></i></span><span class="text">Wij krijgen {str_replace('.',',', $attr['averageRating'])}/10 van {$attr['totalReviews']} klanten</span></li>
    <li class="list-group-item border-0 p-0"><span class="icon"><i class="pr-2 fass fa-truck-fast d-none d-sm-inline-flex"></i></span><span class="text">Verzonden met <b>1 werkdag</b> voor <b>10,-</b></span></li>
  </ul>
</a>
