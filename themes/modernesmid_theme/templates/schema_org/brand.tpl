<script type="text/javascript">
	var el = document.createElement('script');
   	el.type = 'application/ld+json';
	var obj = {
					"@context": "http://schema.org",
					"@type": "Brand",
					"name": prestashop.shop.name,
					"url": prestashop.urls.shop_domain_url,
					"logo": prestashop.urls.shop_domain_url+prestashop.shop.logo,
					"sameAs": [
				        "https://https://nl-nl.facebook.com/ijzershop"
				      ]
				};
   el.text = JSON.stringify(obj);
   document.querySelector('head').appendChild(el);
</script>
