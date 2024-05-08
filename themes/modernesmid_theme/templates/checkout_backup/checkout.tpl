{**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
<!doctype html>
<html lang="{$language.iso_code}">

  <head>
    {block name='head'}
      {include file='_partials/head.tpl'}
    {/block}
  </head>

  <body id="{$page.page_name}" class="{$page.body_classes|classnames}">

    {block name='hook_after_body_opening_tag'}
      {hook h='displayAfterBodyOpeningTag'}
    {/block}

    <header id="header">
      {block name='header'}
        {include file='checkout/_partials/header.tpl'}
      {/block}
    </header>


    <section id="wrapper" class="w-100 bg-light">
      {hook h="displayWrapperTop"}
      <div class="container-fluid pt-2">
      {include file='custom_blocks/notification.tpl'}
      </div>
        <div class="container p-2">

      {block name='content'}
        <section id="content">
          {block name='notifications'}
            {include file='_partials/notifications.tpl'}
          {/block}


          <div class="row pt-3">
            <div class="cart-grid-right col-xs-12 col-sm-12 col-md-12 col-lg-5 order-1 order-lg-2">

              {block name='cart_summary'}
                {include file='checkout/_partials/cart-summary.tpl' cart = $cart}
              {/block}

              {hook h='displayReassurance'}
            </div>
            <div class="cart-grid-body col-xs-12 col-sm-12 col-md-12 col-lg-7  order-2 order-lg-1">
              <div class="card border-0">
                <div class="card-body p-0">
                  {block name='cart_summary'}
                    {render file='checkout/checkout-process.tpl' ui=$checkout_process}
                  {/block}
                </div>
              </div>
            </div>

          </div>
        </section>
      {/block}
      {hook h="displayWrapperBottom"}
{*        {block name='continue_shopping'}*}
{*          <div class="container">*}
{*          <div class="row">*}
{*            <div class="col-12">*}
{*              <a class="btn btn-dark mt-2 mb-2" href="{$urls.pages.index}">*}
{*                <i class="fasl fa-chevron-left"></i> {l s='Continue shopping' d='Shop.Theme.Actions'}*}
{*              </a>*}
{*            </div>*}
{*          </div>*}
{*          </div>*}
{*        {/block}*}
      </div>
    </section>
    <footer id="footer">
      {block name='footer'}
        {include file='_partials/footer.tpl'}
      {/block}
    </footer>

    {block name='javascript_bottom'}
      {include file="_partials/javascript.tpl" javascript=$javascript.bottom}
    {/block}

    {block name='hook_before_body_closing_tag'}
      {hook h='displayBeforeBodyClosingTag'}
    {/block}

  </body>

</html>
