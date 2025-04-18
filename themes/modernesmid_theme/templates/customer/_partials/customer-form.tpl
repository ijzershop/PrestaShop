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
* @author PrestaShop SA <contact@prestashop.com>
  * @copyright 2007-2019 PrestaShop SA and Contributors
  * @license https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
  * International Registered Trademark & Property of PrestaShop SA
  *}
  {block name='customer_form'}
  {block name='customer_form_errors'}
  {include file='_partials/form-errors.tpl' errors=$errors['']}
  {/block}
  {assign var="validate_email" value=false}
    <style>
      input[name="customer_privacy"], input[name="psgdpr"]{
        width: 15px!important;
        height: 15px!important;
        margin-right: 5px!important;
      }
      .custom-checkbox .form-check-label{
        width: calc(100% - 15px)!important;
      }
    </style>



  <form action="{block name='customer_form_actionurl'}{$action}{/block}" id="customer-form" class="js-customer-form" novalidate autocomplete="off" method="post">
    <section>
      {block "form_fields"}
      {foreach from=$formFields item="field"}
        {if $field.name === 'id_gender' || $field.name === 'company' || $field.name === 'vat'}

        {elseif $field.name != 'informer_identification'}
          {block "form_field"}
          {form_field field=$field}
          {/block}
        {/if}
      {/foreach}
      {$hook_create_account_form nofilter}
      {/block}
    </section>
    {block name='customer_form_footer'}
    <div class="row">
      <footer class="form-footer col-12 pt-3">
        <input type="hidden" name="submitCreate" value="1">
        {block "form_buttons"}
        <button name="submitMessage" class="btn btn-primary form-control-submit w-100" data-link-action="save-customer" type="submit">
          {l s='Save' d='Shop.Theme.Actions'}
        </button>
        {/block}
      </footer>
    </div>
    {/block}
  </form>
  {/block}


{block name='javascript_bottom'}
<script type="text/javascript">
  //Wrong password but existing customer at registration
  let checkoutLoginPassModal = [];
  {if isset(Context::getContext()->checkout)}
      checkoutLoginPassModal = JSON.parse('{Context::getContext()->checkout nofilter}');
  {/if}
</script>
{/block}
