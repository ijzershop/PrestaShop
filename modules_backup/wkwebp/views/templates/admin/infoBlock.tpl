{*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License version 3.0
* that is bundled with this package in the file LICENSE.txt
* It is also available through the world-wide-web at this URL:
* https://opensource.org/licenses/AFL-3.0
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade this module to a newer
* versions in the future. If you wish to customize this module for your
* needs please refer to CustomizationPolicy.txt file inside our module for more information.
*
* @author Webkul IN
* @copyright Since 2010 Webkul
* @license https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
*}
{if isset($binaryInfoBlock)}
    <ul>
        <li>
            {l s='Please download cwebp binaries for your operating system' mod='wkwebp'}
            <a href="{$download_link|escape:'htmlall':'UTF-8'}" target="_blank"><b>{l s='from here' mod='wkwebp'}</b></a>
            {l s='and upload.' mod='wkwebp'}
        </li>
        <li>
            {l s='For linux operating system, please download all \'linux\' specific file for fallback in case one fails.' mod='wkwebp'}
        </li>
    </ul>
{else if isset($converterInfoBlock)}
    <ul>
        <li>
            {l s='For using cwebp converter, please download and upload required binaries from' mod='wkwebp'}
            <a href="#configuration_form_3">{l s='CONVERTERS BINARIES' mod='wkwebp'}</a>
        </li>
        <li>
            {l s='For Using converters, make sure the required extensions or libraries are installed on your server.' mod='wkwebp'}
        </li>
    </ul>
{/if}
