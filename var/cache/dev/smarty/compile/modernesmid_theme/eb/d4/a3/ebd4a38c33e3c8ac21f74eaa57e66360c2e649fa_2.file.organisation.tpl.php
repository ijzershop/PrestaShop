<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:50
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\schema_org\organisation.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a3430228a147_98743484',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ebd4a38c33e3c8ac21f74eaa57e66360c2e649fa' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\schema_org\\organisation.tpl',
      1 => 1720434468,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a3430228a147_98743484 (Smarty_Internal_Template $_smarty_tpl) {
?> <?php echo '<script'; ?>
 type="text/javascript">
	let el = document.createElement('script');
   	el.type = 'application/ld+json';
	let obj = {
					"@context": "http://schema.org",
					"@type": "Organization",
					"name": "De Moderne Smid",
					"url": "https://www.modernesmid.nl/",
					"logo": "https://www.demodernesmid.nl/img/my-shop-logo-1565161756.jpg",
					"foundingDate": "1954-04-01",
					"address": {
						"@type": "PostalAddress",
						"addressLocality": "Leeuwarden",
						"addressRegion": "Friesland",
						"postalCode": "8938 BC",
						"streetAddress": "Venusweg 15"
					},
					"telephone": "0900 2502500",
					"email": "info@v15.nl",
					"aggregateRating": {
						"@type": "AggregateRating",
					    "ratingCount": kiyohDataTotal,
					    "ratingValue": kiyohDataAverage,
					    "reviewCount": kiyohDataTotal,
					    "bestRating": "10",
					    "worstRating": "1"
					  },
					"sameAs": [
				        "https://https://nl-nl.facebook.com/ijzershop"
				      ]
				};


   el.text = JSON.stringify(obj);
   document.querySelector('head').appendChild(el);
<?php echo '</script'; ?>
>
<?php }
}
