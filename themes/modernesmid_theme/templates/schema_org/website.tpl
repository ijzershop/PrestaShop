<script type="text/javascript">
	var el = document.createElement('script');
   	el.type = 'application/ld+json';
	var obj = {
				"@context": "http://schema.org",
				"@type": "Website",
				"name": prestashop.shop.name,
				"url": prestashop.urls.shop_domain_url,
				"image": prestashop.urls.shop_domain_url+prestashop.shop.logo,
				"potentialAction": {
					    "@type": "SearchAction",
					    "target": {
					    	"@type": "EntryPoint",
						    "urlTemplate": prestashop.urls.shop_domain_url+"/zoeken?s={literal}{q}{/literal}",
						    "encodingType": "application/ld+json",
						    "contentType": "application/ld+json"
						},
					    "query-input": {
		                  "@type": "PropertyValueSpecification",
		                  "valueRequired": true,
		                  "valueName": "q"
		              }
				 }
			};


   el.text = JSON.stringify(obj);
   document.querySelector('head').appendChild(el);
</script>
