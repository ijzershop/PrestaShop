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

<div class="form-group">
   <div class="col-lg-9">
      {foreach $converterName as $converter}
         <div class="checkbox">
            <label for="WK_WEBP_PNG_SKIP_CONVERTER[]_{$converter.id|escape:'htmlall':'UTF-8'}">
               <input type="checkbox" class="converterCheck" name="WK_WEBP_PNG_SKIP_CONVERTER[]_{$converter.id|escape:'htmlall':'UTF-8'}" id="WK_WEBP_PNG_SKIP_CONVERTER[]_{$converter.id|escape:'htmlall':'UTF-8'}" {if is_array($pngConverted)}{if in_array($converter.id, $pngConverted)}checked{/if}{/if} value="{$converter.id|escape:'htmlall':'UTF-8'}" {if $converter.disabled}disabled="disabled"{/if}>{$converter.name|escape:'htmlall':'UTF-8'}
               <a href="{$converter.href|escape:'htmlall':'UTF-8'}">{$converter.href|escape:'htmlall':'UTF-8'}</a>
            </label>
         </div>
      {/foreach}
   </div>
</div>
