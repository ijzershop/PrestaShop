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
{extends file='page.tpl'}

{block name='page_title'}
{/block}



{block name='page_content'}
<div class="col-12">
  {block name='notifications'}
    {include file='_partials/notifications.tpl'}
  {/block}
</div>

<div class="col-12">
<div class="row">
  <div class="col-12 col-sm-12 col-md-6 col-lg-6 pt-3 pr-2">
    <div class="card card-block p-3 h-100">
    <header class="page-header">
      <div class="h4">{l s='New Customer' d='Shop.Theme.Customeraccount'}?</div>
    </header>
      <br>
      <p>
        {l s='Wilt u in het vervolg sneller afrekenen en uw bestelling volgen? maak dan een persoonlijk account' d='Shop.Theme.Customeraccount'}
      </p>
      <div class="no-account position-absolute col-12 pb-3" style="bottom:10px;left:0">
        <a href="{$urls.pages.register}" class="btn btn-primary w-100" data-link-action="display-register-form">
          <i class="fasr fa-user"></i>  {l s='No account? Create one here' d='Shop.Theme.Customeraccount'}
        </a>
      </div>
    </div>
  </div>

  <div class="col-12 col-sm-12 col-md-6 col-lg-6 pt-3 pr-2">
    <div class="card card-block p-3 h-100">
    <header class="page-header">
      <div class="h4">{l s='Log in to your account' d='Shop.Theme.Customeraccount'}</div>
    </header>
    <br>
    {block name='login_form_container'}
      <section class="login-form">
        {render file='customer/_partials/login-form.tpl' ui=$login_form}
      </section>
      <hr/>
      {block name='display_after_login_form'}
        {hook h='displayCustomerLoginFormAfter'}
      {/block}
    {/block}
  </div>
</div>
</div>
</div>




{/block}
