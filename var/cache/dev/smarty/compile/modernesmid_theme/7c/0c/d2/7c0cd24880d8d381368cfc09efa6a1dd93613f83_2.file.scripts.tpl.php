<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:42
  from 'C:\wampserver\www\ijzershop8.local\modules\dynamicproduct\views\templates\api\scripts.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fa5c14c5_16513354',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '7c0cd24880d8d381368cfc09efa6a1dd93613f83' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\modules\\dynamicproduct\\views\\templates\\api\\scripts.tpl',
      1 => 1738060473,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a342fa5c14c5_16513354 (Smarty_Internal_Template $_smarty_tpl) {
echo '<script'; ?>
>
	function loadTnScripts() {
		for (var index in window.tn_scripts) {
			System.import(window.tn_scripts[index]);
		}
	}

	if (!window.tn_scripts) {
		window.tn_scripts = [];
	}

	document.addEventListener('DOMContentLoaded', function() {
		for (var index in window.dp_scripts) {
			window.tn_scripts.push(window.dp_scripts[index]);
		}

		if (window.scripts_loading) {
			return;
		}
		window.scripts_loading = true;
		if (typeof window.System === 'undefined') {
			$.getScript('https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.14.3/system.min.js', loadTnScripts);
		} else {
			loadTnScripts();
		}
	});
<?php echo '</script'; ?>
><?php }
}
