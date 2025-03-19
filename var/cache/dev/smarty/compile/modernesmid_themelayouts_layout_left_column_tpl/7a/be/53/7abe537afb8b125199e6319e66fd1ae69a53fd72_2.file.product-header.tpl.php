<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:31
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\catalog\_partials\product-header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1f9f3dba42_62633111',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '7abe537afb8b125199e6319e66fd1ae69a53fd72' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\catalog\\_partials\\product-header.tpl',
      1 => 1736935241,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1f9f3dba42_62633111 (Smarty_Internal_Template $_smarty_tpl) {
?><style>
  .block-category-inner{
    height: 70px;
    opacity: 0.4;
    overflow: hidden;
    -webkit-transition: all .3s linear;
    -moz-transition: all .3s linear;
    -o-transition: all .3s linear;
    transition: all .3s linear;
  }

  .block-category-inner.active{
    height: auto;
    opacity: 1;
    -webkit-transition: all .3s linear;
    -moz-transition: all .3s linear;
    -o-transition: all .3s linear;
    transition: all .3s linear;
  }
  #toggle-cat-description span{
    min-width: 50%;
    display: inline-block;
  }

  #toggle-cat-description:hover{
    background-color: rgba(59, 86, 173, 1);
    color: #ffffff;
  }
  #toggle-cat-description{
    color: rgba(59, 86, 173, 0.5);
    padding: 5px 0px;
  }
</style>

<div id="js-product-list-header" class="col-12 pr-3 pl-3  pr-lg-0 pl-lg-0 ">
    <?php if ($_smarty_tpl->tpl_vars['listing']->value['pagination']['items_shown_from'] == 1) {?>
      <h2 class="h2 mb-0 text-center"><?php if (!empty($_smarty_tpl->tpl_vars['category']->value['second_name'])) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['category']->value['second_name'], ENT_QUOTES, 'UTF-8');
} else {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['category']->value['name'], ENT_QUOTES, 'UTF-8');
}?></h2>
        <?php if (!empty($_smarty_tpl->tpl_vars['listing']->value['products'])) {?>
            <div id="block-category-inner" class="block-category-inner row">
                <div class="col-12 col-sm-8">
                  <div id="category-description" class="text-muted">
                    <?php if ($_smarty_tpl->tpl_vars['category']->value['additional_description'] != '') {?>
                      <?php echo htmlspecialchars_decode($_smarty_tpl->tpl_vars['category']->value['additional_description'], ENT_QUOTES);?>

                    <?php }?>
                    <?php if ($_smarty_tpl->tpl_vars['category']->value['top_description'] != '') {?>
                      <?php echo htmlspecialchars_decode($_smarty_tpl->tpl_vars['category']->value['top_description'], ENT_QUOTES);?>

                    <?php }?>
                  </div>
                </div>
                <div class="d-none d-sm-flex col-sm-4 pl-0">
                    <?php if (($_smarty_tpl->tpl_vars['category']->value['additional_description'] != '' || $_smarty_tpl->tpl_vars['category']->value['top_description'] != '') && ((isset($_smarty_tpl->tpl_vars['category']->value['image']['large']['url'])) && $_smarty_tpl->tpl_vars['category']->value['image']['large']['url'])) {?>
                        <div class="category-cover text-center mx-auto">
                            <img style="max-width: 225px;max-height: 100%;"  class="mx-auto" src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCatImageLink($_smarty_tpl->tpl_vars['category']->value['link_rewrite'],$_smarty_tpl->tpl_vars['category']->value['id'],'category_default'), ENT_QUOTES, 'UTF-8');?>
" alt="<?php if (!empty($_smarty_tpl->tpl_vars['category']->value['image']['legend'])) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['category']->value['image']['legend'], ENT_QUOTES, 'UTF-8');
} else {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['category']->value['name'], ENT_QUOTES, 'UTF-8');
}?>">
                        </div>
                    <?php }?>
                </div>
            </div>
          <div class="row text-center"><a href="#" class="w-100 display-4 text-decoration-none" id="toggle-cat-description" data-shown="0" onclick="toggleCategoryDescr(this)"> <i class="fasl fa-chevron-down"></i>  <span>Toon meer informatie</span>  <i class="fasl fa-chevron-down"></i> </a></div>
        <?php }?>
    <?php }?>
</div>
<?php echo '<script'; ?>
 type="text/javascript">


  function toggleCategoryDescr(e){
    if(document.getElementById('block-category-inner').classList.contains('active')){
        document.getElementById('block-category-inner').classList.remove('active');
        document.getElementById('toggle-cat-description').innerHTML = '<i class="fasl fa-chevron-down"></i>  <span>Toon meer informatie</span> <i class="fasl fa-chevron-down"></i>';
    } else {
      document.getElementById('block-category-inner').classList.add('active');
      document.getElementById('toggle-cat-description').innerHTML = '<i class="fasl fa-chevron-up"></i> <span>Verberg Informatie</span> <i class="fasl fa-chevron-up"></i> ';
        }


  }


<?php echo '</script'; ?>
>
<?php }
}
