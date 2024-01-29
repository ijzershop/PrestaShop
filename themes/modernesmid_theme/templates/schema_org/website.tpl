

<script type="text/javascript">

	let websiteElement = document.createElement('script');
   	websiteElement.type = 'application/ld+json';
	let jsonLdWebsiteObject = {
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


   websiteElement.text = JSON.stringify(jsonLdWebsiteObject);
   document.querySelector('head').appendChild(websiteElement);
</script>
