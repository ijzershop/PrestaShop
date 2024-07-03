{*
* 2007-2024 TuniSoft
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
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
*  @author    TuniSoft <tunisoft.solutions@gmail.com>
*  @copyright 2007-2024 TuniSoft
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}
{$displayed_count = 1}

{if !$is_pdf}
    <div class="dp_cart dp_seven_cart"
         data-id_customization="{$input->id_customization|intval}"
    >
        <div class="dp_input_div dp_input_{$input->id|intval} {foreach from=$input->true_conditions_array item=cls}dp_condition_{$cls} {/foreach}">


          {if count($grouped_fields) > 0}
          {foreach from=$grouped_fields item=group}

          {if isset($group.label) && $group.label}
            <strong>{$group.label|escape:'htmlall':'UTF-8'}</strong>
            <br>
          {/if}
          {foreach from=$group.fields item=input_field}
          {assign var="field" value=$input_field->getDynamicField()}
          {if $input_field->isSkippedName()}{continue}{/if}
          {if !$field.active || $field.type == "2"}{continue}{/if}
            {if $input_field->name === "quantity" || ($input_field->name === "preview" && $is_order_detail)}{continue}{/if}
            <span class="dp-input-field-{$input_field->name|escape:'htmlall':'UTF-8'}"
                              style="{if $group.label}padding-left: 1em;{/if}">
                      {if $input_field->label}
                          <strong>{$input_field->getDynamicLabel($input->input_fields)|escape:'htmlall':'UTF-8'}:</strong>
                      {/if}
                            {if $input_field->getTemplatePath()}
                                {include file=$input_field->getTemplatePath()}
                            {else}
                                {$input_field->getDynamicValue($input->input_fields)|escape:'htmlall':'UTF-8'}
                            {/if}
                  </span>
                        <br class="field-br">
                    {/foreach}
                    {if count($grouped_fields) > 1}
                        <br>
                    {/if}
                {/foreach}
            {/if}

            {if $input->canDisplayWeight()}
                <br>
                <span>
          <strong>{l s='Weight' mod='dynamicproduct'}:</strong>
            {$input->getWeight()|floatval} {Configuration::get('PS_WEIGHT_UNIT')|escape:'htmlall':'UTF-8'}
        </span>
            {/if}

            {if isset($params['show_price']) && $params['show_price'] || isset($show_price) && $show_price}
                <br>
                <span>
          <strong>{l s='Price' mod='dynamicproduct'}:</strong>
          {$price|escape:'htmlall':'UTF-8'}
        </span>
            {/if}

            {if $input->is_editable}
                {assign var=show_edit value=(!isset($params['edit_button']) || $params['edit_button'] != false)}
                {if !$is_pdf && !$is_order_detail && $show_edit}
                    <br>
                    <div>
                        <a class="dp_url"
                           href="{$input->getEditLink()|escape:'htmlall':'UTF-8'}"
                        >{l s='Edit this customization' mod='dynamicproduct'}</a>
                    </div>
                {/if}
            {/if}
        </div>


    </div>
{else}
    <br>
  {if count($grouped_fields) > 0}
    {foreach from=$grouped_fields item=group}
      {if isset($group.label) && $group.label}
        <strong>{$group.label|escape:'htmlall':'UTF-8'}</strong>
        <br>
      {/if}
      {foreach from=$group.fields item=input_field}
        {assign var="field" value=$input_field->getDynamicField()}
        {if $input_field->isSkippedName()}{continue}{/if}
        {if !$field.active || $field.type == "2"}{continue}{/if}
        {if $input_field->name === "quantity" || ($input_field->name === "preview")}{continue}{/if}

                {$displayed_count = $displayed_count + 1}
                <span class="dp-input-field-{$input_field->name|escape:'htmlall':'UTF-8'}"
                      style="{if $group.label}padding-left: 1em;{/if}">
                      {if $input_field->label}
                        <strong><b>{$input_field->getDynamicLabel($input->input_fields)|escape:'htmlall':'UTF-8'}:</b></strong>
                      {/if}
                  {if $input_field->getTemplatePath()}
                    {include file=$input_field->getTemplatePath()}
                  {else}
                    {$input_field->getDynamicValue($input->input_fields)|escape:'htmlall':'UTF-8'}
                  {/if}
                  </span>
                <br class="field-br"/>
            {/foreach}
            {if count($grouped_fields) > 1}
                <br/>
            {/if}
        {/foreach}
    {/if}

{*    {if $input->canDisplayWeight()}*}
{*        <br>*}
{*        <span>*}
{*          <strong>{l s='Weight' mod='dynamicproduct'}:</strong>*}
{*            {$input->weight|floatval} {Configuration::get('PS_WEIGHT_UNIT')|escape:'htmlall':'UTF-8'}*}
{*        </span>*}
{*    {/if}*}

{*    {if isset($params['show_price']) && $params['show_price'] || isset($show_price) && $show_price}*}
{*        <br>*}
{*        <span>*}
{*          <strong>{l s='Price' mod='dynamicproduct'}:</strong>*}
{*          {$price|escape:'htmlall':'UTF-8'}*}
{*        </span>*}
{*    {/if}*}

{*    {if $input->is_editable}*}
{*        {assign var=show_edit value=(!isset($params['edit_button']) || $params['edit_button'] != false)}*}
{*        {if !$is_pdf && !$is_order_detail && $show_edit}*}
{*            <br>*}
{*            <div>*}
{*                <a class="dp_url"*}
{*                   href="{$input->getEditLink()|escape:'htmlall':'UTF-8'}"*}
{*                >{l s='Edit this customization' mod='dynamicproduct'}</a>*}
{*            </div>*}
{*        {/if}*}
{*    {/if}*}
{/if}
