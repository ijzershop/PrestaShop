{if $field.type === 'select'}
  <label class='select-field {if $field.required} -required {/if}'>
    <div class="col-md-3  _tar _mtm">
      <span>{$field.label}</span>
    </div>
    <div class="col-md-9 _mtm">
      <select {if $field.required} required {/if} name="{$field.name}">
        <option value disabled selected>{l s='-- please choose --'}</option>
        {foreach from=$field.availableValues item="label" key="value"}
          <option value="{$value}" {if $value eq $field.value} selected {/if}>{$label}</option>
        {/foreach}
      </select>
    </div>
  </label>
{else if $field.type === 'radio-buttons'}
  <label class='radio-field {if $field.required} -required {/if}'>
    <div class="col-md-3  _tar">
      <span>{$field.label}</span>
    </div>
    <div class="col-md-9">
    {foreach from=$field.availableValues item="label" key="value"}
      <label class="_mrl">
        <input  name  = "{$field.name}"
                type  = "radio"
                value = "{$value}"
                {if $field.required} required {/if}
                {if $value eq $field.value} checked {/if}
        >
        {$label}
      </label>
    {/foreach}
  </div>
  </label>
  {elseif $field.type === 'checkbox'}
  <label class='checkbox-field {if $field.required} -required {/if}'>
    <div class="col-md-9 col-md-offset-3">
      <input  {if $field.required} required {/if}
              name="{$field.name}"
              type="{$field.type}"
              value="1"
              {if $field.value} checked {/if}
      >
      <span>{$field.label}</span>
    </div>
  </label>
{elseif $field.type === 'hidden'}
  <input type="hidden" name="{$field.name}" value="{$field.value}">
{elseif $field.type === 'password'}
  <div class="col-md-3  _mtm _tar">
    <span>{$field.label}</span>
  </div>
  <div class="col-md-9 _mtm">
    <input type="password" name="{$field.name}" value="{$field.value}">
    <small>{l s='Five characters minimum'}</small>
  </div>
{else}
  <label {if $field.required} class="-required" {/if}>
    <div class="col-md-3  _mtm _tar">
      <span>{$field.label}</span>
    </div>
    <div class="col-md-9 _mtm">
      <input {if $field.required} required {/if}
              name="{$field.name}"
              type="{$field.type}"
              value="{$field.value}"
      >
      {if $field.name === 'company'}
        <small class="_mls">{l s='Optional'}</small>
      {/if}
    </div>
</label>
{/if}

{include file='_partials/form-errors.tpl' errors=$field.errors}
