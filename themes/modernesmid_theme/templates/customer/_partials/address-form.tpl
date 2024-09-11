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

{block name="address_form"}
  <div class="js-address-form">
    {include file='_partials/form-errors.tpl' errors=$errors['']}
    <style>
      #toggle-postcode-check .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 12px;
        line-height: 12px;
        margin-top:.6rem;
      }

      /* Hide default HTML checkbox */
      #toggle-postcode-check .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      /* The slider */
      #toggle-postcode-check .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
      }

      #toggle-postcode-check .slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 0px;
        bottom: -4px;
        border: 1px solid #ccc;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }

      #cart-postcode-check-toggle:checked+.slider {
        background-color: #2196F3;
      }

      #cart-postcode-check-toggle:focus+.slider {
        box-shadow: 0 0 1px #2196F3;
      }

      #cart-postcode-check-toggle:checked+.slider:before {
        border: 1px solid #2196F3;
        -webkit-transform: translateX(30px);
        -ms-transform: translateX(30px);
        transform: translateX(30px);
      }

      /* Rounded sliders */
      #toggle-postcode-check .slider.round {
        border-radius: 12px;
      }

      #toggle-postcode-check .slider.round:before {
        border-radius: 50%;
      }
      #toggle-postcode-check label:first-child {
        line-height: 27px;
      }
      #toggle-postcode-check label svg{
        vertical-align: -.3em!important;
      }
      #postcode-check-info{
        color:#3b56ad;
        display:none;
      }
      .selected{
        background-color: #f0f0f0;
        color:#000000;
      }
    </style>


    {block name="address_form_url"}
    <form autocomplete="off"
      id="customer_address_form"
      method="POST"
      action="{url entity='address' params=['id_address' => $id_address]}"
      data-id-address="{$id_address}"
      data-refresh-url="{url entity='address' params=['ajax' => 1, 'action' => 'addressForm']}"
          novalidate
    >
    {/block}

{*      <div style="font-size: .8rem;min-height: 35px;display:none;" class="form-group d-block col-12 col-lg-6 p-0" id="toggle-postcode-check">*}
{*        <label class="col-7 p-0">*}
{*          <span class="info-icon-with-showhide-address" data-id="postcode-check-info-delivery">*}
{*            <i class="icon-info cart-info-btn"></i>*}
{*          </span>*}
{*          <span id="postcode-check-switch-label">Postcode validatie <b class="text-success"><i class="fasl fa-check fa-2x"></i></b></span>*}
{*        </label>*}
{*        <label class="switch col-5 float-right">*}
          <input type="checkbox" class="d-none" id="cart-postcode-check-toggle" checked>
{*          <span class="slider round"></span>*}
{*        </label>*}
{*      </div>*}
{*      <div  style="font-size: .8rem;text-transform: initial;display:none;" id="postcode-check-info-delivery" class="col-12 mt-2 p-0" >*}
{*        <p class="card p-2">Bij het invullen van uw postcode en bijhorende huisnummer wordt uw adres automatisch aangevuld en gevalideerd.*}
{*          Zo helpen we u fouten in uw adres voorkomen. <br/>Mocht u hiervan hinder ondervinden, dan kunt u deze Postcode check uitzetten.<br/>*}
{*          <span class="mt-1"><b>Let op!</b> Het adres wordt niet gevalideerd als de postcode check <b>uit</b> staat, dus kijk uw adres goed na voordat u de bestelling afrekent.</span</p>*}
{*      </div>*}

      {block name="address_form_fields"}
        <section class="form-fields row">
          {block name='form_fields'}
            {assign var="countryId" value='null'}
            {foreach from=$formFields item="field"}
              {block name='form_field'}
                {if $field.type == 'countrySelect'}
                  {assign var="countryId" value=$field.value}
                  {form_field field=$field countryId=$countryId  file="_partials/form-fields-address.tpl"}
                {elseif $field.name === 'id_gender'}
                {else}
                  {form_field field=$field countryId=$countryId  file="_partials/form-fields-address.tpl"}
                {/if}

              {/block}
            {/foreach}
          {/block}
        </section>
      {/block}

      {block name="address_form_footer"}
      <footer class="form-footer clearfix">
        <input type="hidden" name="submitAddress" value="1">
        {block name='form_buttons'}
          <button class="btn btn-dark float-xs-right w-100" name="confirm-addresses" type="button" class="form-control-submit">
            {l s='Save' d='Shop.Theme.Actions'}
          </button>
        {/block}
      </footer>
      {/block}

    </form>
  </div>
{/block}
<script type="text/javascript">

  if(typeof postcodeApiUrl === "undefined"){
    const postcodeApiUrl = "{url entity='module' name='msthemeconfig' controller='ajax'}";
  }


</script>
