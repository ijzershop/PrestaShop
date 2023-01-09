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



  <form action="{block name='customer_form_actionurl'}{$action}{/block}" id="customer-form" class="js-customer-form" autocomplete="off" method="post">
    <section>
{*       {var_dump($action)} *}
      {block "form_fields"}
      {foreach from=$formFields item="field"}
        {if $field.name != 'informer_identification'}
          {block "form_field"}
          {form_field field=$field}
          {* Add email validation *}
          {if $field.name == 'email' && (strpos($action, 'create_account') !== false || strpos($action, 'bestelling') !== false || strpos($action, 'identiteit') !== false)}
            {assign var="validate_email" value=true}
          <div class="form-group row ">
            <label class="col-md-3 form-control-label required">
              Valideer E-mail
            </label>
            <div class="col-md-9">
              <input class="form-control" name="validate_email" type="email" value="" required="required" autocomplete="false">
            </div>
            <div class="col-md-3 form-control-comment">
            </div>
          </div>
          {/if}
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
        <button class="btn btn-primary form-control-submit w-100" data-link-action="save-customer" type="submit">
          {l s='Save' d='Shop.Theme.Actions'}
        </button>
        {/block}
      </footer>
    </div>
    {/block}
  </form>
  {/block}

{if $validate_email}
{literal}
<script type="text/javascript">
  function toggleInput(valid=true, msg, target){
        if(valid){
          target.classList.add('is-valid');
          target.classList.remove('is-invalid');
          var helpBox = document.getElementById('help-text-input-'+target.name);
          if(helpBox){
            helpBox.remove();
          }
          var msgBox = '<div class="valid-feedback" id="help-text-input-'+target.name+'">'+msg+'</div>';
        } else {
          target.classList.add('is-invalid');
          target.classList.remove('is-valid');
          var helpBox = document.getElementById('help-text-input-'+target.name);
          if(helpBox){
            helpBox.remove();
          }
          var msgBox = '<div class="invalid-feedback" id="help-text-input-'+target.name+'">'+msg+'</div>';
        }
        target.insertAdjacentHTML('afterend',msgBox);
  }
  function validateEmailString(emailInput) {
    var emailElem = emailInput[0];
    var validateEmailElem = emailInput[1];
    var regTestString = new RegExp("^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$");
    var submitBtn = document.getElementById('submitCreate');
    if(submitBtn == undefined){
      submitBtn = document.getElementsByName('continue')[0];
    }
    if(submitBtn == undefined){
      submitBtn = document.getElementsByClassName('form-control-submit')[0];
    }
      if(regTestString.test(emailElem.value) && validateEmailElem.value != ''){
        if(emailElem.value === validateEmailElem.value){
          toggleInput(true, 'Email adres is correct',emailElem);
          submitBtn.disabled = false;
        } else {
          toggleInput(false, 'De email addressen zijn niet hetzelfde',emailElem);
          submitBtn.disabled = true;
        }
      }

      if(regTestString.test(validateEmailElem.value) && emailElem.value != ''){
        if(emailElem.value === validateEmailElem.value){
          toggleInput(true, 'Email adres is gevalideerd',validateEmailElem);
          submitBtn.disabled = false;
        } else {
          toggleInput(false, 'De email addressen zijn niet hetzelfde',validateEmailElem);
          submitBtn.disabled = true;
        }
      }
     }
    var emailInput = [];
    emailInput.push(document.getElementsByName('email')[0]);
    emailInput.push(document.getElementsByName('validate_email')[0]);
    for (var i = emailInput.length - 1; i >= 0; i--) {
          emailInput[i].addEventListener('change', function(elem){
            validateEmailString(emailInput);
          });
    }
</script>
{/literal}
{/if}
