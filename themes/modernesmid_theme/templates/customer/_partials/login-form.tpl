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
{block name='login_form'}
  {block name='login_form_errors'}
    {include file='_partials/form-errors.tpl' errors=$errors['']}
  {/block}

  <form id="login-form" class="col-12" action="{block name='login_form_actionurl'}{$action}{/block}" method="post">
    <section>
      {block name='login_form_fields'}
        {foreach from=$formFields item="field"}
          {block name='form_field'}
            {form_field field=$field}
          {/block}
        {/foreach}
      {/block}
      <div class="forgot-password form-group row mt-4 mt-mb-0">
        <div class="col-md-3 form-control-label"></div>
        <div class="col-md-9">
          <a href="{$urls.pages.password}" class="w-100 btn btn-sm btn-outline-primary rounded-0" rel="nofollow">
            {l s='Forgot your password?' d='Shop.Theme.Customeraccount'}?
          </a>
        </div>
      </div>
    </section>
    <br>
    {block name='login_form_footer'}
      <footer class="form-footer form-group pt-2 pb-3 row">
        <div class="col-12">
          <input type="hidden" name="submitLogin" value="1">
          {block name='form_buttons'}
            <button id="submit-login" class="btn btn-primary col-12" data-link-action="sign-in" type="submit" class="form-control-submit">
              <i class="fasl fa-lock"></i> {l s='Sign in' d='Shop.Theme.Actions'}
            </button>
          {/block}
        </div>
      </footer>
    {/block}

  </form>
{/block}
