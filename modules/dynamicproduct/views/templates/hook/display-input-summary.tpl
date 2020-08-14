{**
* 2010-2019 Tuni-Soft
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
*  @author
*  @copyright 2014-2015
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*}

<div class="dp_cart dp_seven_cart">
    <div class="dp_input_div dp_input_{$input->id|intval}">
        {if count($input->input_fields)}
            {foreach from=$input->input_fields item=input_field}
                {if $input_field->isSkipped()}{continue}{/if}
                <strong>{$input_field->label|escape:'htmlall':'UTF-8'}:</strong>
                {if is_file($input_field->getTemplatePath())}
                    {include file=$input_field->getTemplatePath()}
                {else}
                    {$input_field->displayValue()|escape:'htmlall':'UTF-8'}
                {/if}
                <br>
            {/foreach}
        {/if}

        {if $input->canDisplayWeight()}
            <strong>{l s='Weight' mod='dynamicproduct'}:</strong>
            {$input->weight|floatval} {Configuration::get('PS_WEIGHT_UNIT')|escape:'htmlall':'UTF-8'}
            <br>
        {/if}

        {if !$is_pdf}
            <br>
            <a class="dp_url"
               href="{$input->getEditLink()|escape:'htmlall':'UTF-8'}">{l s='Edit this customization' mod='dynamicproduct'}</a>
        {/if}
    </div>
</div>