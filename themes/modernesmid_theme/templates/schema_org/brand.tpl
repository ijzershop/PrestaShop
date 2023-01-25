<script type="text/javascript">
	el = document.createElement('script');
  el.type = 'application/ld+json';
	obj = {
					"@context": "http://schema.org",
					"@type": "Brand",
          "name": '{$shop.name}',
          "url": '{$urls.shop_domain_url}',
					"logo": '{$shop.logo}',
					"sameAs": [
				        "https://nl-nl.facebook.com/ijzershop"
				      ]
				};
   el.text = JSON.stringify(obj);
   document.querySelector('head').appendChild(el);
</script>
