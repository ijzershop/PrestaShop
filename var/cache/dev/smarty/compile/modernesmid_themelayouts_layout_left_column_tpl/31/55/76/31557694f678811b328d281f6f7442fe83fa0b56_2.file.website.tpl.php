<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:47
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\schema_org\website.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342ff63d0e1_88417710',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '31557694f678811b328d281f6f7442fe83fa0b56' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\schema_org\\website.tpl',
      1 => 1674802652,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a342ff63d0e1_88417710 (Smarty_Internal_Template $_smarty_tpl) {
?>

<?php echo '<script'; ?>
 type="text/javascript">

	let websiteElement = document.createElement('script');
   	websiteElement.type = 'application/ld+json';
	let jsonLdWebsiteObject = {
				"@context": "http://schema.org",
				"@type": "Website",
				"name": '<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['name'], ENT_QUOTES, 'UTF-8');?>
',
				"url": '<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['shop_domain_url'], ENT_QUOTES, 'UTF-8');?>
',
				"image": '<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['logo'], ENT_QUOTES, 'UTF-8');?>
',
				"potentialAction": {
					    "@type": "SearchAction",
					    "target": {
					    	"@type": "EntryPoint",
						    "urlTemplate": "<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['shop_domain_url'], ENT_QUOTES, 'UTF-8');?>
/zoeken?s={q}",
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
<?php echo '</script'; ?>
>
<?php }
}
