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

<style>
.wk_tooltip {
    position: relative;
    display: inline-block;
    background-image: url({$dirMod|escape:'htmlall':'UTF-8'}wkwebp/views/img/icon/icon-help-circle.png);
    background-position: left center;
    background-repeat: no-repeat;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
}

.wk_tooltiptext {
    background-color: #363a41;
    border-bottom: medium none;
    border-radius: 4px;
    bottom: 130%;
    color: #fff;
    font-size: 0.7rem;
    font-style: normal;
    font-weight: 400;
    left: 50%;
    letter-spacing: normal;
    line-height: 1.5;
    margin-left: -127px;
    padding: 4px 14px;
    position: absolute;
    text-align: center;
    text-shadow: none;
    text-transform: none;
    visibility: hidden;
    white-space: normal;
    width: 255px;
    word-break: normal;
    word-spacing: normal;
    word-wrap: normal;
    z-index: 9;
}

.wk_tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #363a41 transparent transparent transparent;
}

.wk_tooltip:hover .wk_tooltiptext {
    visibility: visible;
    opacity: 1;
}

</style>

<div class="alert alert-info">{l s='If you change/update default images then make sure to regenerate WebP images again to refrect the changes.' mod='wkwebp'}</div>

<div class="checkDiv">
    {foreach $imageTypes as $imageType}
    <label for="{$imageType['id']|escape:'htmlall':'UTF-8'}"><input type="checkbox" name="convertImage" {if $imageType['id'] != 'all_images'} class="image_box" {/if} {if isset($imageType['psSliderDisabled']) && $imageType['psSliderDisabled']} disabled {/if} id="{$imageType['id']|escape:'htmlall':'UTF-8'}" class="" value="{$imageType['id']|escape:'htmlall':'UTF-8'}">{$imageType['name']|escape:'htmlall':'UTF-8'}
    </label>
    {if $imageType['id'] == 'ps_slider_images'}

    <div class="wk_tooltip">
        <span class="wk_tooltiptext">{l s='Prestashop Slider module must be enabled to convert the slider images.' mod='wkwebp'}</span>
    </div>
    {/if}
    <span class="
    {if $imageType['totalConv'] == $imageType['total']}badge badge-success{/if}
    {if $imageType['totalConv'] < $imageType['total']}{if $imageType['totalConv'] == 0}badge badge-danger{else}badge badge-warning{/if}{/if}" id="{$imageType['id']|escape:'htmlall':'UTF-8'}Badge">
    <span class="convertedImg" id="{$imageType['id']|escape:'htmlall':'UTF-8'}Number" value="{$imageType['totalConv']|escape:'htmlall':'UTF-8'}">{$imageType['totalConv']|escape:'htmlall':'UTF-8'}</span>
    <span class="totalImg" id="{$imageType['id']|escape:'htmlall':'UTF-8'}Total" value="{$imageType['total']|escape:'htmlall':'UTF-8'}">/{$imageType['total']|escape:'htmlall':'UTF-8'}</span>
    </span>
    <br>
    {/foreach}
    <p class="help-block">
        {l s='Tick the boxes for which you want to generate WebP images.' mod='wkwebp'}
    </p>
    <label for="regenerate"><input type="checkbox" name="regenerate" id="regenerate" class="" value=""> {l s='Regenerate webp image for the image types' mod='wkwebp'}
    </label>
    <p class="help-block">{l s='Check the box, if you want to regenerate webp image for the image types.' mod='wkwebp'}</p>

    <div class="progress" style="display: none; width: 70%;">
        <div class="progress-bar" id="webPProgress" role="progressbar" data-image-count="0" data-width="0" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
     <div class="progressbar-text" style="display:none;"><span class="progress-text-webp">0</span>%</div>
</div>
