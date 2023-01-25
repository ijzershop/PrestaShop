

<script type="text/javascript">

	let el = document.createElement('script');
   	el.type = 'application/ld+json';
	let obj = {
				"@context": "http://schema.org",
				"@type": "Website",
				"name": '{$shop.name}',
				"url": '{$urls.shop_domain_url}',
				"image": '{$shop.logo}',
				"potentialAction": {
					    "@type": "SearchAction",
					    "target": {
					    	"@type": "EntryPoint",
						    "urlTemplate": "{$urls.shop_domain_url}/zoeken?s={literal}{q}{/literal}",
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
