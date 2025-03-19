<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:32
  from 'C:\wampserver\www\ijzershop8.local\modules\sawandcutmodule\views\templates\front\action.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fa09b4262_63844744',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'fcd252db671db06fbb2822d92e9c14384bbfd6bc' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\modules\\sawandcutmodule\\views\\templates\\front\\action.tpl',
      1 => 1731322243,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:modules/sawandcutmodule/views/templates/front/saw-action-buttons-product-page.tpl' => 1,
    'file:modules/sawandcutmodule/views/templates/front/cut-action-buttons-product-page.tpl' => 1,
    'file:modules/sawandcutmodule/views/templates/front/saw-action-buttons.tpl' => 1,
    'file:modules/sawandcutmodule/views/templates/front/cut-action-buttons.tpl' => 1,
  ),
),false)) {
function content_67bc1fa09b4262_63844744 (Smarty_Internal_Template $_smarty_tpl) {
echo '<script'; ?>
>
  var url = "<?php echo $_smarty_tpl->tpl_vars['link']->value->getModuleLink('sawandcutmodule','ajax',array());?>
";
<?php echo '</script'; ?>
>
<?php $_smarty_tpl->_assignInScope('sawLength', 0);
$_smarty_tpl->_assignInScope('cutLength', 0);
$_smarty_tpl->_assignInScope('cutWidth', 0);
$_smarty_tpl->_assignInScope('showAddToCartButton', !$_smarty_tpl->tpl_vars['attr']->value['is_catalog']);
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['product']->value['features'], 'feature');
$_smarty_tpl->tpl_vars['feature']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['feature']->value) {
$_smarty_tpl->tpl_vars['feature']->do_else = false;
?>
    <?php if ((int)$_smarty_tpl->tpl_vars['feature']->value['id_feature'] == (int)$_smarty_tpl->tpl_vars['attr']->value['sawLength']) {?>
      <?php $_smarty_tpl->_assignInScope('sawLength', (int)$_smarty_tpl->tpl_vars['feature']->value['value']);?>
  <?php }?>
    <?php if ((int)$_smarty_tpl->tpl_vars['feature']->value['id_feature'] == (int)$_smarty_tpl->tpl_vars['attr']->value['cutLength']) {?>


  <?php $_smarty_tpl->_assignInScope('cutLength', (int)$_smarty_tpl->tpl_vars['feature']->value['value']);?>
  <?php }?>
  <?php if ((int)$_smarty_tpl->tpl_vars['feature']->value['id_feature'] == (int)$_smarty_tpl->tpl_vars['attr']->value['cutWidth']) {?>
  <?php $_smarty_tpl->_assignInScope('cutWidth', (int)$_smarty_tpl->tpl_vars['feature']->value['value']);?>
  <?php }
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>

<?php if ($_smarty_tpl->tpl_vars['page']->value['page_name'] != 'category' && $_smarty_tpl->tpl_vars['page']->value['page_name'] != 'search') {?>
  <div class="platecutting zaagsnedes row h-100 mt-1">
<?php if ($_smarty_tpl->tpl_vars['sawLength']->value > 0 || $_smarty_tpl->tpl_vars['cutLength']->value > 0) {?>
    <div class="zaagsnedesbuttons col mt-2 mt-md-0 mb-1  mb-md-1">
      <div class="zaagsnedes <?php if ($_smarty_tpl->tpl_vars['sawLength']->value < 0 || $_smarty_tpl->tpl_vars['cutLength']->value < 0) {?> col-sm-2 col-md-1 col-lg-3<?php }?>" <?php if ($_smarty_tpl->tpl_vars['sawLength']->value <= 0 && $_smarty_tpl->tpl_vars['cutLength']->value <= 0) {?>style="display:none;text-align:right;height:100%;"<?php } else { ?>style="text-align:right;height:100%;"<?php }?>>
        <?php if ($_smarty_tpl->tpl_vars['sawLength']->value > 0) {?>
        <?php $_smarty_tpl->_subTemplateRender("file:modules/sawandcutmodule/views/templates/front/saw-action-buttons-product-page.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('product'=>$_smarty_tpl->tpl_vars['product']->value), 0, false);
?>
        <?php }?>
        <?php if ($_smarty_tpl->tpl_vars['cutLength']->value > 0) {?>
        <?php $_smarty_tpl->_subTemplateRender("file:modules/sawandcutmodule/views/templates/front/cut-action-buttons-product-page.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('singleCutEnabled'=>$_smarty_tpl->tpl_vars['attr']->value['singleCutEnabled'],'product'=>$_smarty_tpl->tpl_vars['product']->value,'cutLength'=>$_smarty_tpl->tpl_vars['cutLength']->value,'cutWidth'=>$_smarty_tpl->tpl_vars['cutWidth']->value,'minCutSize'=>$_smarty_tpl->tpl_vars['product']->value->min_cut_size,'maxCuts'=>$_smarty_tpl->tpl_vars['attr']->value['maxCuts'],'combiPrices'=>json_encode($_smarty_tpl->tpl_vars['attr']->value['combiPrices']),'minRemainder'=>$_smarty_tpl->tpl_vars['product']->value->min_cut_remainder), 0, false);
?>
        <?php }?>
      </div>
    </div>
  <?php }?>
  </div>
<?php } else { ?>
<table class="platecutting zaagsnedes w-100 h-100">
  <tr>
    <td class="zaagsnedesbuttons align-middle">
      <?php if ($_smarty_tpl->tpl_vars['sawLength']->value > 0 || $_smarty_tpl->tpl_vars['cutLength']->value > 0) {?>
        <div class="zaagsnedes <?php if ($_smarty_tpl->tpl_vars['sawLength']->value < 0 || $_smarty_tpl->tpl_vars['cutLength']->value < 0) {?> col-sm-2 col-md-1 col-lg-3<?php }?>" <?php if ($_smarty_tpl->tpl_vars['sawLength']->value <= 0 && $_smarty_tpl->tpl_vars['cutLength']->value <= 0) {?>style="display:none;text-align:right"<?php } else { ?>style="text-align:right"<?php }?>>
          <?php if ($_smarty_tpl->tpl_vars['sawLength']->value > 0) {?>
          <?php $_smarty_tpl->_subTemplateRender("file:modules/sawandcutmodule/views/templates/front/saw-action-buttons.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('product'=>$_smarty_tpl->tpl_vars['product']->value), 0, false);
?>
          <?php }?>
          <?php if ($_smarty_tpl->tpl_vars['cutLength']->value > 0) {?>
          <?php $_smarty_tpl->_subTemplateRender("file:modules/sawandcutmodule/views/templates/front/cut-action-buttons.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('singleCutEnabled'=>$_smarty_tpl->tpl_vars['attr']->value['singleCutEnabled'],'product'=>$_smarty_tpl->tpl_vars['product']->value,'cutLength'=>$_smarty_tpl->tpl_vars['cutLength']->value,'cutWidth'=>$_smarty_tpl->tpl_vars['cutWidth']->value,'minCutSize'=>$_smarty_tpl->tpl_vars['product']->value->min_cut_size,'maxCuts'=>$_smarty_tpl->tpl_vars['attr']->value['maxCuts'],'combiPrices'=>json_encode($_smarty_tpl->tpl_vars['attr']->value['combiPrices']),'minRemainder'=>$_smarty_tpl->tpl_vars['product']->value->min_cut_remainder), 0, false);
?>
          <?php }?>
        </div>
      <?php }?>
    </td>
  </tr>
</table>
<?php }?>

<?php }
}
