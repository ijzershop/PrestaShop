{**
 * 2007-2016 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2016 PrestaShop SA
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}


 {* {var_export($field)} *}
{if $field.type == 'hidden'}
  {block name='form_field_item_hidden'}
  <input type="hidden" name="{$field.name}" value="{$field.value}">
  {/block}
{else}
  <div class="form-group form-group-small 
      {if $field.name == 'company'}
        col-12 col-sm-12
      {elseif $field.name == 'alias'}
        col-12 col-sm-12
      {elseif $field.name == 'lastname'}
        col-12 col-sm-6
      {elseif $field.name == 'firstname'}
        col-12 col-sm-6
      {elseif $field.name == 'vat_number'}
        col-12 col-sm-12
      {elseif $field.name == 'address1'}
        col-8 col-sm-8
      {elseif $field.name == 'house_number'}
        col-8 col-sm-2 pr-0
      {elseif $field.name == 'house_number_extension'}
        col-4 col-sm-2 pl-1
      {elseif $field.name == 'postcode'}
        col-12 col-sm-4
      {elseif $field.name == 'city'}
        col-12
      {elseif $field.name == 'id_country'}
        col-12 col-sm-8
      {elseif $field.name == 'other'}
        col-12 col-sm-12
      {elseif $field.name == 'phone'}
        col-12 col-sm-6
      {elseif $field.name == 'phone_mobile'}
        col-12 col-sm-6
      {/if}

  {if !empty($field.errors)}has-error{/if}">
    {if $field.type !== 'checkbox'}
    <label class="{if $field.required || $field.name == 'phone'} required{/if}">
        {if $field.name == 'address1'}
          {"Straat" nofilter}
        {elseif $field.name == 'house_number'}
          {"Nr" nofilter}
        {elseif $field.name == 'house_number_extension'}
          {if $countryId == 13}
            {"Toev." nofilter}
          {else}
            {"Pand" nofilter}
          {/if}
        {else}
          {$field.label nofilter}
          {block name='form_field_comment'}
            {if (!$field.required && !in_array($field.type, ['radio-buttons', 'checkbox']))}
              {if $field.name != 'phone'} 
                 {l s='(Optional)' d='Shop.Forms.Labels'}
              {/if}
            {/if}
          {/block}
        {/if}

    </label>
    {/if}
    <div class="{if ($field.type === 'radio-buttons')} form-control-valign{/if}">

    {include file='_partials/form-fields-list.tpl' countryId=$countryId}

    </div> 
  </div>
  
{/if}
