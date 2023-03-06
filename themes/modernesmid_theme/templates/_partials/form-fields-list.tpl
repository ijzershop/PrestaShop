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

 {if !isset($countryId)}{assign var="countryId" value=0}{/if}
      {if $field.type === 'select'}
        {block name='form_field_item_select'}
        <select autocomplete="off"
        class="form-control form-control-select" name="{$field.name}" {if $field.required}required{/if}>
          <option value disabled selected>{l s='-- please choose --' d='Shop.Forms.Labels'}</option>
          {foreach from=$field.availableValues item="label" key="value"}
            <option value="{$value}" {if $value eq $field.value} selected {/if}>{$label}</option>
          {/foreach}
        </select>
        {/block}

      {elseif $field.type === 'countrySelect'}
        {block name='form_field_item_country'}
        <select
          autocomplete="off"
          class="form-control form-control-select js-country"
          name="{$field.name}"
          {if $field.required}required{/if}
        >
          <option value disabled selected>{l s='-- please choose --' d='Shop.Forms.Labels'}</option>
          {foreach from=$field.availableValues item="label" key="value"}
            <option value="{$value}" {if $value eq $field.value} selected {/if}>{$label}</option>
          {/foreach}
        </select>
        {/block}
      {elseif $field.type === 'radio-buttons'}
        {block name='form_field_item_radio'}
        {foreach from=$field.availableValues item="label" key="value"}
          <label class="radio-inline">
            <span class="custom-radio">
              <input
                name="{$field.name}"
                type="radio"
                value="{$value}"
                {if $field.required}required{/if}
                {if $value eq $field.value} checked {/if}
              >
              <span></span>
            </span>
            <span>{$label}</span>
          </label>
        {/foreach}
        {/block}
      {elseif $field.type === 'checkbox'}
        {block name='form_field_item_checkbox'}
        <label class="checkbox-inline flex_container flex_start">
        <span class="custom-input-box">
          <input class="custom-input" name="{$field.name}" type="checkbox" value="1" {if $field.value}checked="checked"{/if} {if $field.required}required{/if}>
          <span class="custom-input-item custom-input-checkbox"><i class="fto-ok-1 checkbox-checked"></i></span>
        </span>
        <span class="flex_child">{$field.label nofilter}</span >
        </label>
        {/block}

      {elseif $field.type === 'date'}
        {block name='form_field_item_date'}
        <input name="{$field.name}" autocomplete="off"
        class="form-control" type="date" value="{$field.value}" placeholder="{if isset($field.availableValues.placeholder)}{$field.availableValues.placeholder}{/if}">
        {if isset($field.availableValues.comment)}
          <span autocomplete="off"
          class="form-control-comment">
            {$field.availableValues.comment}
          </span>
        {/if}
        {/block}

      {elseif $field.type === 'birthday'}
        {block name='form_field_item_birthday'}
        <div class="js-parent-focus">
          {html_select_date
          field_order=DMY
          time={$field.value}
          field_array={$field.name}
          prefix=false
          reverse_years=true
          field_separator='<br>'
          day_extra='autocomplete="off"
          class="form-control form-control-select"'
          month_extra='autocomplete="off"
          class="form-control form-control-select"'
          year_extra='autocomplete="off"
          class="form-control form-control-select"'
          day_empty={l s='-- day --' d='Shop.Forms.Labels'}
          month_empty={l s='-- month --' d='Shop.Forms.Labels'}
          year_empty={l s='-- year --' d='Shop.Forms.Labels'}
          start_year={'Y'|date}-100 end_year={'Y'|date}
          }
        </div>
        {/block}
      {elseif $field.type === 'password'}

        {block name='form_field_item_password'}
          <div class="input-group js-parent-focus input-group-with-border">
            <input
              autocomplete="off"
              class="form-control js-child-focus js-visible-password"
              name="{$field.name}"
              title="{l s='At least 5 characters long' d='Shop.Forms.Help'}"
              type="password"
              value=""
              pattern=".{literal}{{/literal}5,{literal}}{/literal}"
              {if $field.required}required{/if}
            >
            <span class="input-group-btn">
              <button
                class="btn show_password"
                type="button"
                data-action="show-password"
                data-text-show="{l s='Show' d='Shop.Theme.Actions'}"
                data-text-hide="{l s='Hide' d='Shop.Theme.Actions'}"
              >
                <i class="fasr fa-eye-slash"></i>
              </button>
            </span>
          </div>
        {/block}
      {else}

        {block name='form_field_item_other'}
        {if $field.name == 'house_number'}
          <input
            autocomplete="off"
            class="form-control"
            name="{$field.name}"
            type="{$field.type}"
            value="{$field.value}"
            {if isset($field.availableValues.placeholder)}placeholder="{$field.availableValues.placeholder}"{/if}
            {if $field.maxLength}maxlength="{$field.maxLength}"{/if}
            required>
        {elseif $field.name == 'phone'}
          <input
            autocomplete="off"
            class="form-control"
            name="{$field.name}"
            type="{$field.type}"
            value="{$field.value}"
            {if isset($field.availableValues.placeholder)}placeholder="{$field.availableValues.placeholder}"{/if}
            {if $field.maxLength}maxlength="{$field.maxLength}"{/if}
            required>
        {elseif $field.name == 'address1' && $countryId != 13}
          <input
            autocomplete="off"
            class="form-control"
            name="{$field.name}"
            type="{$field.type}"
            value="{$field.value}"
            {if isset($field.availableValues.placeholder)}placeholder="{$field.availableValues.placeholder}"{/if}
            {if $field.maxLength}maxlength="{$field.maxLength}"{/if}
            {if $field.required}required{/if}
          >
          <div id="suggesstion-box-street"></div>
          {elseif $field.name == 'address1' && $countryId == 13}
          <input
            autocomplete="off"
            class="form-control"
            name="{$field.name}"
            type="{$field.type}"
            value="{$field.value}"
            {if isset($field.availableValues.placeholder)}placeholder="{$field.availableValues.placeholder}"{/if}
            {if $field.maxLength}maxlength="{$field.maxLength}"{/if}
            {if $field.required}required{/if}
            readonly
          >
          <div id="suggesstion-box-street"></div>
          {else}
          <input
            autocomplete="off"
            class="form-control"
            name="{$field.name}"
            type="{$field.type}"
            value="{$field.value}"
            {if isset($field.availableValues.placeholder)}placeholder="{$field.availableValues.placeholder}"{/if}
            {if $field.maxLength}maxlength="{$field.maxLength}"{/if}
            {if $field.required}required{/if}
            {if $field.name == 'city'}readonly{/if}
          >
        {/if}
        <small class="text-danger address-error-msg"></small>
          {if isset($field.availableValues.comment)}
            <span autocomplete="off"
            class="form-control-comment">
              {$field.availableValues.comment}
            </span>
          {/if}
        {/block}
      {/if}
      {block name='form_field_errors'}
        {include file='_partials/form-errors.tpl' errors=$field.errors}
      {/block}
