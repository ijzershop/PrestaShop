<?php
/* Smarty version 4.3.4, created on 2024-10-10 12:11:03
  from 'C:\wampserver\www\ijzershop8.local\modules\modernesmiddynamicproduct\views\templates\admin\display-dynamic-input-summary.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_6707a837b56850_17507952',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '37d10a40ebf932f51aa476b557f30db2c9587136' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\modules\\modernesmiddynamicproduct\\views\\templates\\admin\\display-dynamic-input-summary.tpl',
      1 => 1728555058,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6707a837b56850_17507952 (Smarty_Internal_Template $_smarty_tpl) {
?><!-- ✅ ✅ ✅ If the summary is not displayed correctly, open the module configuration page and click the "Troubleshooting" button, then Fix the templates then clear the cache ✅ -->

<?php $_smarty_tpl->_assignInScope('displayed_count', 0);?>

<div class="dp_cart dp_seven_cart"
     data-id_customization="<?php echo intval($_smarty_tpl->tpl_vars['input']->value->id_customization);?>
"
>
    <div class="dp_input_div dp_input_<?php echo intval($_smarty_tpl->tpl_vars['input']->value->id);?>
">
        <?php if (count($_smarty_tpl->tpl_vars['grouped_fields']->value)) {?>
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['grouped_fields']->value, 'group');
$_smarty_tpl->tpl_vars['group']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['group']->value) {
$_smarty_tpl->tpl_vars['group']->do_else = false;
?>
                <?php if ($_smarty_tpl->tpl_vars['group']->value['label']) {?>
                    <strong><?php echo htmlentities(mb_convert_encoding((string)$_smarty_tpl->tpl_vars['group']->value['label'], 'UTF-8', 'UTF-8'), ENT_QUOTES, 'UTF-8', true);?>
</strong>
                    <br>
                <?php }?>
                <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['group']->value['fields'], 'input_field');
$_smarty_tpl->tpl_vars['input_field']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['input_field']->value) {
$_smarty_tpl->tpl_vars['input_field']->do_else = false;
?>
                    <?php if ($_smarty_tpl->tpl_vars['input_field']->value->isSkippedName()) {
continue 1;
}?>
                    <?php if ($_smarty_tpl->tpl_vars['input_field']->value->isSkipped() && !$_smarty_tpl->tpl_vars['input_field']->value->isAdminField()) {
continue 1;
}?>
                    <?php if ($_smarty_tpl->tpl_vars['input_field']->value->name === "preview" && $_smarty_tpl->tpl_vars['is_order_detail']->value) {
continue 1;
}?>
                    <?php $_smarty_tpl->_assignInScope('displayed_count', $_smarty_tpl->tpl_vars['displayed_count']->value+1);?>
                    <span style="<?php if ($_smarty_tpl->tpl_vars['group']->value['label']) {?>padding-left: 1em;<?php }?>">
                <?php if ($_smarty_tpl->tpl_vars['input_field']->value->label) {?>
                    <strong><?php echo htmlentities(mb_convert_encoding((string)$_smarty_tpl->tpl_vars['input_field']->value->label, 'UTF-8', 'UTF-8'), ENT_QUOTES, 'UTF-8', true);?>
:</strong>
                <?php }?>
                        <?php if ($_smarty_tpl->tpl_vars['input_field']->value->getTemplatePath()) {?>
                            <?php $_smarty_tpl->_subTemplateRender($_smarty_tpl->tpl_vars['input_field']->value->getTemplatePath(), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, true);
?>
                        <?php } else { ?>
                            <?php echo htmlentities(mb_convert_encoding((string)$_smarty_tpl->tpl_vars['input_field']->value->getDynamicValue($_smarty_tpl->tpl_vars['input']->value->input_fields), 'UTF-8', 'UTF-8'), ENT_QUOTES, 'UTF-8', true);?>

                        <?php }?>
                        <?php $_smarty_tpl->_assignInScope('sku', $_smarty_tpl->tpl_vars['input_field']->value->getSKU());?>
                        <?php if ($_smarty_tpl->tpl_vars['sku']->value) {?>
                            (<?php echo htmlentities(mb_convert_encoding((string)$_smarty_tpl->tpl_vars['sku']->value, 'UTF-8', 'UTF-8'), ENT_QUOTES, 'UTF-8', true);?>
)
                        <?php }?>
            </span>
                    <br>
                <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                <br>
            <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
        <?php }?>
    </div>

    <?php if ($_smarty_tpl->tpl_vars['displayed_count']->value == 0) {?>
        <style>
            .dp_cart[data-id_customization="<?php echo intval($_smarty_tpl->tpl_vars['input']->value->id_customization);?>
"] {
                display: none;
            }
        </style>
    <?php }?>
</div>
<?php }
}
