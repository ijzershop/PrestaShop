{*
* 2007-2020 PrestaShop
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
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2020 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

{if !$is_pdf}
    <a href="{$input_field->getFileUrl()|escape:'htmlall':'UTF-8'}" target="_blank">
        {if $input_field->isImage()}
            <img src="{$input_field->getThumbUrl()|escape:'htmlall':'UTF-8'}" width="29" alt="preview">
        {else}
            {l s='attachment' mod='dynamicproduct'}
        {/if}
    </a>
{else}
    {l s='attachment' mod='dynamicproduct'}
{/if}
