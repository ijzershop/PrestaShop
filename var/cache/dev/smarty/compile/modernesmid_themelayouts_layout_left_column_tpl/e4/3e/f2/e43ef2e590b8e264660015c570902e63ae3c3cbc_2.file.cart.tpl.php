<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:55
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\checkout\cart.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fb75942f8_62486999',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'e43ef2e590b8e264660015c570902e63ae3c3cbc' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\checkout\\cart.tpl',
      1 => 1729504286,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:checkout/_partials/cart-detailed.tpl' => 1,
    'file:checkout/_partials/cart-detailed-totals-small.tpl' => 1,
    'file:checkout/_partials/cart-detailed-totals.tpl' => 1,
    'file:checkout/_partials/cart-detailed-actions.tpl' => 1,
  ),
),false)) {
function content_67bc1fb75942f8_62486999 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, true);
?>


<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_17646155267bc1fb7576578_76668279', 'content');
?>



<?php $_smarty_tpl->inheritance->endChild($_smarty_tpl, $_smarty_tpl->tpl_vars['layout']->value);
}
/* {block 'cart_overview'} */
class Block_58737182367bc1fb7579380_72193692 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

            <?php $_smarty_tpl->_subTemplateRender('file:checkout/_partials/cart-detailed.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('cart'=>$_smarty_tpl->tpl_vars['cart']->value), 0, false);
?>
          <?php
}
}
/* {/block 'cart_overview'} */
/* {block 'hook_shopping_cart_footer'} */
class Block_44161259267bc1fb7580c98_25876093 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayShoppingCartFooter'),$_smarty_tpl ) );?>

        <?php
}
}
/* {/block 'hook_shopping_cart_footer'} */
/* {block 'cart_totals'} */
class Block_34724787067bc1fb7583d09_84673059 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

                  <?php $_smarty_tpl->_subTemplateRender('file:checkout/_partials/cart-detailed-totals-small.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('cart'=>$_smarty_tpl->tpl_vars['cart']->value), 0, false);
?>
              <?php
}
}
/* {/block 'cart_totals'} */
/* {block 'cart_totals'} */
class Block_175383400167bc1fb758aac0_62034168 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

              <?php $_smarty_tpl->_subTemplateRender('file:checkout/_partials/cart-detailed-totals.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('cart'=>$_smarty_tpl->tpl_vars['cart']->value), 0, false);
?>
            <?php
}
}
/* {/block 'cart_totals'} */
/* {block 'cart_actions'} */
class Block_210092940167bc1fb758c240_35890667 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

              <?php $_smarty_tpl->_subTemplateRender('file:checkout/_partials/cart-detailed-actions.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('cart'=>$_smarty_tpl->tpl_vars['cart']->value), 0, false);
?>
            <?php
}
}
/* {/block 'cart_actions'} */
/* {block 'cart_summary'} */
class Block_48209887167bc1fb7583436_84169737 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <style>
            .cart-summary-next-shipment, .cart-discount{
              line-height: 1.2rem;
              font-size: 13px;
              color:#000000;
            }
          </style>
        <div class="cart-summary-small mb-2">
          <div class="card-body bg-light">
              <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_34724787067bc1fb7583d09_84673059', 'cart_totals', $this->tplIndex);
?>

          </div>
        </div>

          <div class="cart-summary-next-shipment mb-2 text-black">
            <div class="card-body bg-light text-bold"><span id="next-shipping-time-icon" class="fasl fa-truck-fast fa-3x float-right"></span>
              Elke werkdag versturen we bestellingen.<br/> <b>Eerstvolgende verzending is over </b><br/><b id="next-shipping-time"><span id="next-shipping-time-days"></span><span id="next-shipping-time-hours"></span><span id="next-shipping-time-minutes"></span></b>
            </div>
          </div>

          <div class="cart-discount mb-2 text-black">
            <div class="card-body bg-light"><span class="fasl fa-badge-percent fa-3x float-right" id="next-discount-icon"></span>
              <?php echo htmlspecialchars_decode($_smarty_tpl->tpl_vars['discount_add']->value['message'], ENT_QUOTES);?>

            </div>
          </div>

          <div class="cart-summary text-black">
            <div class="card-body bg-light">
            <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_175383400167bc1fb758aac0_62034168', 'cart_totals', $this->tplIndex);
?>

            </div>
            <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_210092940167bc1fb758c240_35890667', 'cart_actions', $this->tplIndex);
?>

          </div>
        <?php
}
}
/* {/block 'cart_summary'} */
/* {block 'content'} */
class Block_17646155267bc1fb7576578_76668279 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'content' => 
  array (
    0 => 'Block_17646155267bc1fb7576578_76668279',
  ),
  'cart_overview' => 
  array (
    0 => 'Block_58737182367bc1fb7579380_72193692',
  ),
  'hook_shopping_cart_footer' => 
  array (
    0 => 'Block_44161259267bc1fb7580c98_25876093',
  ),
  'cart_summary' => 
  array (
    0 => 'Block_48209887167bc1fb7583436_84169737',
  ),
  'cart_totals' => 
  array (
    0 => 'Block_34724787067bc1fb7583d09_84673059',
    1 => 'Block_175383400167bc1fb758aac0_62034168',
  ),
  'cart_actions' => 
  array (
    0 => 'Block_210092940167bc1fb758c240_35890667',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <section id="main" class="col-12">
    <div class="cart-grid row m-1">
      <!-- Left Block: cart product informations & shpping -->
      <div class="cart-grid-body col-xs-12 col-lg-8 p-0">
        <!-- cart products detailed -->
        <div class="card cart-container border-0 row">
          <div class="p-2 col">
            <a class="h2 col text-decoration-none text-dark"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Shopping Cart','d'=>'Shop.Theme.Checkout'),$_smarty_tpl ) );?>
</a>
          </div>
          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_58737182367bc1fb7579380_72193692', 'cart_overview', $this->tplIndex);
?>

            <?php if (Context::getContext()->is_counter_customer) {?>
                <div class="col">
                                    <a href="#" id="addCustomProductByEmployee" data-cart="<?php echo htmlspecialchars((string) Context::getContext()->cart->id, ENT_QUOTES, 'UTF-8');?>
"  class="btn btn-success float-right mt-2" alt="Extra product toevoegen"><i class="fasl fa-plus"></i> Regel toevoegen</a>
                  <a href="#" id="removeShoppingCartDefaultDiscount" data-cart="<?php echo htmlspecialchars((string) Context::getContext()->cart->id, ENT_QUOTES, 'UTF-8');?>
"  class="btn btn-warning float-right text-white mt-2" alt="Winkelwagen korting verwijderen"><i class="fasl fa-times"></i> Korting verwijderen</a>
                                  </div>
            <?php }?>
        </div>
        <br>
        <!-- shipping informations -->
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_44161259267bc1fb7580c98_25876093', 'hook_shopping_cart_footer', $this->tplIndex);
?>

      </div>
      <div class="cart-grid-right col-xs-12 col-lg-4 p-0">
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_48209887167bc1fb7583436_84169737', 'cart_summary', $this->tplIndex);
?>

      </div>

    </div>
  </section>
  <?php echo '<script'; ?>
 type="text/javascript">
    let carrierPickupTime = "<?php ob_start();
echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_SELL_CARRIER_PICKUP_TIME',Context::getContext()->language->id), ENT_QUOTES, 'UTF-8');
$_prefixVariable1 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable1, ENT_QUOTES, 'UTF-8');?>
";
    let carrierPickupTimeSkippedDates = "<?php ob_start();
echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_SELL_CARRIER_PICKUP_TIME_SKIPPING_DATES',Context::getContext()->language->id), ENT_QUOTES, 'UTF-8');
$_prefixVariable2 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable2, ENT_QUOTES, 'UTF-8');?>
";

    function setTimeUntilShipping(){
      // Get current date and time
      const now = new Date();

      let fixedString = carrierPickupTimeSkippedDates.replace("/(\s+|\+|\")/", "");
      const freedayArray = fixedString.split(', ');

      let targetDate = new Date();
      let timeArray = carrierPickupTime.split(':')
      if(timeArray.length === 3){

        targetDate.setHours(timeArray[0]);
        targetDate.setMinutes(timeArray[1]);
        targetDate.setSeconds(timeArray[2]);
      } else {
        targetDate.setHours(16);
        targetDate.setMinutes(0);
        targetDate.setSeconds(0);
      }
      // Skip Saturdays and Sundays
      while(targetDate.getDay() === 0 ||
       targetDate.getDay() === 6 ||
       freedayArray.indexOf((targetDate.getMonth()+1)+'/'+targetDate.getDate()+'/'+targetDate.getFullYear()) > -1 ||
      (targetDate.getTime() - now.getTime()) < 0)
      {
        targetDate.setDate(targetDate.getDate() + 1);
      }

      // get total seconds between the times
      let difference = targetDate.getTime() - now.getTime();


      let diff = Math.abs(difference) / 1000;
      // calculate (and subtract) whole days
      let days = Math.floor(diff / 86400);
      // calculate (and subtract) whole hours
      let hours = Math.floor(diff / 3600) % 24;
      // calculate (and subtract) whole minutes
      let minutes = Math.floor(diff / 60) % 60;

      let daysText = '';
      let hoursText = '';
      let minutesText = '';

      if(days === 0){
        daysText = '';
      } else {
        if(days === 1){
          daysText = days + ' Dag ';
        } else {
          daysText = days + ' Dagen ';
          if(minutes === 0){
            daysText += ' en '
          }
        }
      }

      if(hours === 0){
        hoursText = '';
      } else {
        if(hours === 1){
          hoursText = hours + ' uur ';
        } else {
          hoursText = hours + ' uren ';
        }
        if(minutes > 0){
          hoursText += 'en ';
        }
      }

      if(minutes === 0){
        minutesText = '';
      } else {
        if(minutes === 1){
          minutesText = minutes + ' minuut ';
        } else {
          minutesText = minutes + ' minuten ';
        }
      }

      document.getElementById('next-shipping-time-days').textContent = daysText;
      document.getElementById('next-shipping-time-hours').textContent = hoursText;
      document.getElementById('next-shipping-time-minutes').textContent = minutesText;
    }


    setTimeUntilShipping();
    setInterval(setTimeUntilShipping, 60*1000);
  <?php echo '</script'; ?>
>

<?php
}
}
/* {/block 'content'} */
}
