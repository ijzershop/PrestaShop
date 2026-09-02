<?php
/* Smarty version 4.5.5, created on 2026-09-02 08:31:43
  from '43ac7bd4b7a9756ff364b7c018be5b944e2b66ce' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.5.5',
  'unifunc' => 'content_6a97deefab2542_71369725',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6a97deefab2542_71369725 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\wampserver\\www\\modernesmid-webshop\\vendor\\smarty\\smarty\\libs\\plugins\\modifier.explode.php','function'=>'smarty_modifier_explode',),));
$_smarty_tpl->_assignInScope('enabledFeatures', $_smarty_tpl->tpl_vars['ms']->value['config']['MSTHEMECONFIG_FEATURE_ENABLED']);?>
                <?php $_smarty_tpl->_assignInScope('enabledFeaturesList', $_smarty_tpl->tpl_vars['enabledFeatures']->value);?>
                <?php if (!is_array($_smarty_tpl->tpl_vars['enabledFeaturesList']->value)) {?>
                  <?php if (empty($_smarty_tpl->tpl_vars['enabledFeaturesList']->value)) {?>
                    <?php $_smarty_tpl->_assignInScope('enabledFeaturesList', array());?>
                  <?php } else { ?>
                    <?php $_smarty_tpl->_assignInScope('enabledFeaturesList', smarty_modifier_explode($_smarty_tpl->tpl_vars['enabledFeaturesList']->value,","));?>
                  <?php }?>
                <?php }?>
                <?php $_smarty_tpl->_assignInScope('orderedFeatures', array());?>
                <?php if (!empty($_smarty_tpl->tpl_vars['enabledFeaturesList']->value)) {?>
                  <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['enabledFeaturesList']->value, 'enabledFeatureId');
$_smarty_tpl->tpl_vars['enabledFeatureId']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['enabledFeatureId']->value) {
$_smarty_tpl->tpl_vars['enabledFeatureId']->do_else = false;
?>
                    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['product']->value['grouped_features'], 'feature');
$_smarty_tpl->tpl_vars['feature']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['feature']->value) {
$_smarty_tpl->tpl_vars['feature']->do_else = false;
?>
                      <?php if ($_smarty_tpl->tpl_vars['feature']->value['id_feature'] == $_smarty_tpl->tpl_vars['enabledFeatureId']->value) {?>
                        <?php $_tmp_array = isset($_smarty_tpl->tpl_vars['orderedFeatures']) ? $_smarty_tpl->tpl_vars['orderedFeatures']->value : array();
if (!(is_array($_tmp_array) || $_tmp_array instanceof ArrayAccess)) {
settype($_tmp_array, 'array');
}
$_tmp_array[] = $_smarty_tpl->tpl_vars['feature']->value;
$_smarty_tpl->_assignInScope('orderedFeatures', $_tmp_array);?>
                      <?php }?>
                    <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                  <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                <?php } else { ?>
                  <?php $_smarty_tpl->_assignInScope('orderedFeatures', $_smarty_tpl->tpl_vars['product']->value['grouped_features']);?>
                <?php }?>
                <?php $_smarty_tpl->_assignInScope('sizeString', '');?>
                <?php $_smarty_tpl->_assignInScope('width', '');?>
                <?php $_smarty_tpl->_assignInScope('height', '');?>
                <?php $_smarty_tpl->_assignInScope('weight', '');?>
                <?php $_smarty_tpl->_assignInScope('length', '');?>
                <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['orderedFeatures']->value, 'feature');
$_smarty_tpl->tpl_vars['feature']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['feature']->value) {
$_smarty_tpl->tpl_vars['feature']->do_else = false;
?>
                  <?php if ($_smarty_tpl->tpl_vars['feature']->value['id_feature'] == $_smarty_tpl->tpl_vars['ms']->value['config']['MSTHEMECONFIG_FEATURE_WIDTH']) {?>
                    <?php $_smarty_tpl->_assignInScope('width', $_smarty_tpl->tpl_vars['feature']->value['value']);?>
                  <?php } elseif ($_smarty_tpl->tpl_vars['feature']->value['id_feature'] == $_smarty_tpl->tpl_vars['ms']->value['config']['MSTHEMECONFIG_FEATURE_HEIGHT']) {?>
                    <?php $_smarty_tpl->_assignInScope('height', $_smarty_tpl->tpl_vars['feature']->value['value']);?>

                  <?php } elseif ($_smarty_tpl->tpl_vars['feature']->value['id_feature'] == $_smarty_tpl->tpl_vars['ms']->value['config']['MSTHEMECONFIG_FEATURE_LENGTH']) {?>
                    <?php $_smarty_tpl->_assignInScope('length', $_smarty_tpl->tpl_vars['feature']->value['value']);?>

                  <?php } elseif ($_smarty_tpl->tpl_vars['feature']->value['id_feature'] == $_smarty_tpl->tpl_vars['ms']->value['config']['MSTHEMECONFIG_FEATURE_WEIGHT']) {?>
                    <?php $_smarty_tpl->_assignInScope('weight', $_smarty_tpl->tpl_vars['feature']->value['value']);?>
                  <?php } else { ?>
                    <tr>
                      <th style="vertical-align: top;width:20%;"><?php echo $_smarty_tpl->tpl_vars['feature']->value['name'];?>
</th>
                      <td style="vertical-align: top;"><?php echo nl2br((string) htmlentities(mb_convert_encoding((string)$_smarty_tpl->tpl_vars['feature']->value['value'], 'UTF-8', 'UTF-8'), ENT_QUOTES, 'UTF-8', true), (bool) 1);?>
</td>
                    </tr>
                  <?php }?>
                <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                <?php if (!empty($_smarty_tpl->tpl_vars['length']->value) || !empty($_smarty_tpl->tpl_vars['width']->value) || !empty($_smarty_tpl->tpl_vars['height']->value)) {?>
                  <tr>
                    <th style="vertical-align: top;width:20%;">Formaat (<?php if (!empty($_smarty_tpl->tpl_vars['length']->value)) {?>h<?php }
if (!empty($_smarty_tpl->tpl_vars['width']->value)) {?> x b<?php }
if (!empty($_smarty_tpl->tpl_vars['height']->value)) {?>x h<?php }?>)</th>
                    <td style="vertical-align: top;"><?php if (!empty($_smarty_tpl->tpl_vars['length']->value)) {
echo $_smarty_tpl->tpl_vars['length']->value;
}
if (!empty($_smarty_tpl->tpl_vars['width']->value)) {?> x <?php echo $_smarty_tpl->tpl_vars['width']->value;
}
if (!empty($_smarty_tpl->tpl_vars['height']->value)) {?> x <?php echo $_smarty_tpl->tpl_vars['height']->value;
}?></td>
                  </tr>
                <?php }?>
                <?php if ($_smarty_tpl->tpl_vars['weight']->value != '') {?>
                  <tr>
                    <th style="vertical-align: top;width:20%;">Gewicht</th>
                    <td style="vertical-align: top;"><?php echo $_smarty_tpl->tpl_vars['weight']->value;?>
 Kg</td>
                  </tr>
                <?php }?>
                <?php }
}
