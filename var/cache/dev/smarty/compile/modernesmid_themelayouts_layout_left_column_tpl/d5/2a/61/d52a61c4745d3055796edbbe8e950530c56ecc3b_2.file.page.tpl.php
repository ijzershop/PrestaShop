<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:43
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\page.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fb953c72_00561547',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd52a61c4745d3055796edbbe8e950530c56ecc3b' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\page.tpl',
      1 => 1722495750,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:custom_blocks/notification.tpl' => 1,
  ),
),false)) {
function content_67a342fb953c72_00561547 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, true);
?>


<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_83856061067a342fb949d35_50433528', 'content');
?>

<?php $_smarty_tpl->inheritance->endChild($_smarty_tpl, $_smarty_tpl->tpl_vars['layout']->value);
}
/* {block 'page_title'} */
class Block_191417807367a342fb94b854_15857629 extends Smarty_Internal_Block
{
public $callsChild = 'true';
public $hide = 'true';
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <header class="page-header col-12">
          <h1><?php 
$_smarty_tpl->inheritance->callChild($_smarty_tpl, $this);
?>
</h1>
        </header>
      <?php
}
}
/* {/block 'page_title'} */
/* {block 'page_header_container'} */
class Block_110451705667a342fb94ae57_01149163 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_191417807367a342fb94b854_15857629', 'page_title', $this->tplIndex);
?>

    <?php
}
}
/* {/block 'page_header_container'} */
/* {block 'page_content_top'} */
class Block_181672750267a342fb94fde2_34160052 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
}
}
/* {/block 'page_content_top'} */
/* {block 'page_content'} */
class Block_51841711767a342fb950cb4_12929559 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <!-- Page content -->
        <?php
}
}
/* {/block 'page_content'} */
/* {block 'page_content_container'} */
class Block_148208131567a342fb94f5f9_98833260 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <section id="content" class="page-content">
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_181672750267a342fb94fde2_34160052', 'page_content_top', $this->tplIndex);
?>

        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_51841711767a342fb950cb4_12929559', 'page_content', $this->tplIndex);
?>

      </section>
    <?php
}
}
/* {/block 'page_content_container'} */
/* {block 'page_footer'} */
class Block_160550567a342fb952659_22494082 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <!-- Footer content -->
        <?php
}
}
/* {/block 'page_footer'} */
/* {block 'page_footer_container'} */
class Block_36227999867a342fb951ee1_45508135 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <footer class="page-footer">
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_160550567a342fb952659_22494082', 'page_footer', $this->tplIndex);
?>

      </footer>
    <?php
}
}
/* {/block 'page_footer_container'} */
/* {block 'content'} */
class Block_83856061067a342fb949d35_50433528 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'content' => 
  array (
    0 => 'Block_83856061067a342fb949d35_50433528',
  ),
  'page_header_container' => 
  array (
    0 => 'Block_110451705667a342fb94ae57_01149163',
  ),
  'page_title' => 
  array (
    0 => 'Block_191417807367a342fb94b854_15857629',
  ),
  'page_content_container' => 
  array (
    0 => 'Block_148208131567a342fb94f5f9_98833260',
  ),
  'page_content_top' => 
  array (
    0 => 'Block_181672750267a342fb94fde2_34160052',
  ),
  'page_content' => 
  array (
    0 => 'Block_51841711767a342fb950cb4_12929559',
  ),
  'page_footer_container' => 
  array (
    0 => 'Block_36227999867a342fb951ee1_45508135',
  ),
  'page_footer' => 
  array (
    0 => 'Block_160550567a342fb952659_22494082',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <section id="main" class="col p-3 p-xs-0 p-md-3">
    <?php $_smarty_tpl->_subTemplateRender('file:custom_blocks/notification.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_110451705667a342fb94ae57_01149163', 'page_header_container', $this->tplIndex);
?>


    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_148208131567a342fb94f5f9_98833260', 'page_content_container', $this->tplIndex);
?>


    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_36227999867a342fb951ee1_45508135', 'page_footer_container', $this->tplIndex);
?>


  </section>
<?php
}
}
/* {/block 'content'} */
}
