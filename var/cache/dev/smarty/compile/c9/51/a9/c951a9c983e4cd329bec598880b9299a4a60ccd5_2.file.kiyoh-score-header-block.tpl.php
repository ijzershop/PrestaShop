<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:46
  from 'C:\wampserver\www\ijzershop8.local\modules\msthemeconfig\views\templates\front\kiyoh-score-header-block.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fe5f4ba9_83107848',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'c951a9c983e4cd329bec598880b9299a4a60ccd5' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\modules\\msthemeconfig\\views\\templates\\front\\kiyoh-score-header-block.tpl',
      1 => 1718602854,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a342fe5f4ba9_83107848 (Smarty_Internal_Template $_smarty_tpl) {
echo '<script'; ?>
 type="text/javascript">
let kiyohDataLink =  "https://www.kiyoh.com/reviews/1046584/ijzershop";
let kiyohDataAverage =  "<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['attr']->value['averageRating'], ENT_QUOTES, 'UTF-8');?>
";
let kiyohDataAveragePercentage =  "<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['attr']->value['averageRatingPercentage'], ENT_QUOTES, 'UTF-8');?>
";
let kiyohDataTotal =  "<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['attr']->value['totalReviews'], ENT_QUOTES, 'UTF-8');?>
";
<?php echo '</script'; ?>
>

<?php echo '<script'; ?>
 type="application/ld+json">
  {
      "@context": "https://schema.org/",
      "@type": "Product",
      "image": "",
      "name": "Ijzershop.nl",
      "sameAs": "https://www.Ijzershop.nl",
      "aggregateRating":<?php echo $_smarty_tpl->tpl_vars['attr']->value['rating'];?>

}
<?php echo '</script'; ?>
>
<?php $_smarty_tpl->_assignInScope('transmissionCarrier', Carrier::getCarrierByReference(2,Context::getContext()->cookie->id_lang));
$_smarty_tpl->_assignInScope('defaultShippingPrice', $_smarty_tpl->tpl_vars['transmissionCarrier']->value->getMaxDeliveryPriceByPrice(Context::getContext()->country->id_zone));?>

<div id="kiyoh-block" class="text-decoration-none text-dark d-flex">
  <ul class="list-group mx-auto">
    <li class="list-group-item border-0"><a target="_blank" href="https://www.kiyoh.com/reviews/1046584/ijzershop" title="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'98% adviseert de IJzershop!, lees hier onze reviews','d'=>'Modules.Ijzershopkiyoh.kiyoh-score-header-block'),$_smarty_tpl ) );?>
"><span class="icon"><i class="pr-2 fasl fa-heart d-inline-flex"></i></span><span class="text"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['attr']->value['averageRatingPercentage'], ENT_QUOTES, 'UTF-8');?>
% adviseert de IJzershop!</span></a></li>
    <li class="list-group-item border-0 slide_hidden"><a target="_blank" href="https://www.kiyoh.com/reviews/1046584/ijzershop" title="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'98% adviseert de IJzershop!, lees hier onze reviews','d'=>'Modules.Ijzershopkiyoh.kiyoh-score-header-block'),$_smarty_tpl ) );?>
"><span class="icon"><i class="pr-2 fasl fa-star d-inline-flex"></i></span><span class="text">Wij krijgen <?php echo htmlspecialchars((string) str_replace('.',',',$_smarty_tpl->tpl_vars['attr']->value['averageRating']), ENT_QUOTES, 'UTF-8');?>
/10 van <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['attr']->value['totalReviews'], ENT_QUOTES, 'UTF-8');?>
 klanten</span></a></li>
    <li class="list-group-item border-0 slide_hidden"><a href="<?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['attr']->value['shippingPage'],'html' )), ENT_QUOTES, 'UTF-8');?>
" title="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Verzonden met 1 werkdag, lees hier over onze verzending','d'=>'Modules.Ijzershopkiyoh.kiyoh-score-header-block'),$_smarty_tpl ) );?>
"><span class="icon"><i class="pr-2 fasl fa-truck-fast d-inline-flex"></i></span><span class="text">Verzonden met <b>1 werkdag</b> voor <b> <?php if (Context::getContext()->cookie->price_vat_settings_incl === "true") {?>€ <?php echo htmlspecialchars((string) number_format(Tools::convertPrice($_smarty_tpl->tpl_vars['defaultShippingPrice']->value*1.21),0,',','.'), ENT_QUOTES, 'UTF-8');?>
,-<?php } else { ?> € <?php echo htmlspecialchars((string) number_format(Tools::convertPrice($_smarty_tpl->tpl_vars['defaultShippingPrice']->value),2,',','.'), ENT_QUOTES, 'UTF-8');
}?></b></span></a></li>
  </ul>
</div>

<?php echo '<script'; ?>
 type="text/javascript">
document.addEventListener('DOMContentLoaded', () => {
  // Get the ul element
  const ul = document.querySelector('#kiyoh-block ul');
  // Get all the li elements
  const lis = ul.querySelectorAll('li');
  // Current position
  let pos = 0;
  // Next slide function
  const next = () => {
    // Hide current li
    lis[pos].classList.add('slide_hidden');
    // Increment pos
    pos++;

    // Wrap position if needed
    if (pos >= lis.length) {
      pos = 0;
    }

    // Show next li
    lis[pos].classList.remove('slide_hidden');
  }
  // Set first slide
  lis[pos].classList.remove('slide_hidden');
  // Auto slide
  setInterval(() => {
    next();
  }, 4000);
});
<?php echo '</script'; ?>
>



<?php }
}
