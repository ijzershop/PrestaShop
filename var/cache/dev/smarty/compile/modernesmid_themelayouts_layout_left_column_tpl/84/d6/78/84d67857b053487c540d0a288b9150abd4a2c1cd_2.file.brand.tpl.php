<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:47
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\schema_org\brand.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342ff579495_75936550',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '84d67857b053487c540d0a288b9150abd4a2c1cd' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\schema_org\\brand.tpl',
      1 => 1674649060,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a342ff579495_75936550 (Smarty_Internal_Template $_smarty_tpl) {
echo '<script'; ?>
 type="text/javascript">
	el = document.createElement('script');
  el.type = 'application/ld+json';
	obj = {
					"@context": "http://schema.org",
					"@type": "Brand",
          "name": '<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['name'], ENT_QUOTES, 'UTF-8');?>
',
          "url": '<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['shop_domain_url'], ENT_QUOTES, 'UTF-8');?>
',
					"logo": '<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['logo'], ENT_QUOTES, 'UTF-8');?>
',
					"sameAs": [
				        "https://nl-nl.facebook.com/ijzershop"
				      ]
				};
   el.text = JSON.stringify(obj);
   document.querySelector('head').appendChild(el);
<?php echo '</script'; ?>
>
<?php }
}
