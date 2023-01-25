<div class="row">
	<div class="col-lg-12">
		<ul id="kiyoh-comment-list" class="list-unstyled">
		</ul>
	</div>
	<div class="col-lg-12 text-center">
		<input type="hidden" value="1" id="review-page">
		<div class="btn-group" role="group" aria-label="{l s='Kiyoh review buttons' d='Modules.Ijzershopkiyoh.reviews'}">
		<button type="button" id="loadMoreReviews" class="btn btn-success btn-lg btn-secondary loadMoreReviews">{l s='Laad meer beoordelingen' d='Modules.Ijzershopkiyoh.reviews'}</button>
  		<button type="button" id="readMoreOnKiyohSite" onclick="readMoreOnKiyohWebsite()" class="btn btn-primary btn-lg  btn-secondary">{l s='Lees meer beoordelingen op de Kiyoh Website' d='Modules.Ijzershopkiyoh.reviews'}</button>
		</div>
		<br/>
		<br/>
	</div>
</div>

<script type="text/javascript">
  let reviewsPerPage = "{$attr['reviewsPerPage']}";
	let totalReviewsInDatabase = "{$attr['totalReviewsInDatabase']}";
	let latestSavedFeed = '{$attr['latestSavedFeed'] nofilter}';
	let ourReactionText = "{l s='Onze reactie' d='Modules.Ijzershopkiyoh.reviews'}";
	let url= "{url entity='module' name='ijzershopkiyoh' controller='ajax' params = ['action' => 'updateLatestKiyohReviews']}";
</script>
