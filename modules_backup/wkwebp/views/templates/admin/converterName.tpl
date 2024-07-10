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


{* {if $converterName eq 'cwebp'}
   {l s='cwebp' mod='wkwebp'}
    <a href="https://developers.google.com/speed/webp/docs/cwebp">https://developers.google.com/speed/webp/docs/cwebp</a>
{/if}
{if $converterName eq 'vips'}
   {l s='vips' mod='wkwebp'} <a href="https://github.com/libvips/php-vips-ext">https://github.com/libvips/php-vips-ext</a>
{/if}
{if $converterName eq 'imagick'}
   {l s='imagick' mod='wkwebp'} <a href="https://github.com/Imagick/imagick">https://github.com/Imagick/imagick</a>
{/if}
{if $converterName eq 'gmagick'}
   {l s='gmagick' mod='wkwebp'} <a href="https://www.php.net/manual/en/book.gmagick.php">https://www.php.net/manual/en/book.gmagick.php</a>
{/if}
{if $converterName eq 'imagemagick'}
   {l s='imagemagick' mod='wkwebp'} <a href="https://imagemagick.org/index.php">https://imagemagick.org/index.php</a>
{/if}
{if $converterName eq 'graphicsmagick'}
   {l s='graphicsmagick' mod='wkwebp'} <a href="https://www.php.net/manual/en/book.gmagick.php">https://www.php.net/manual/en/book.gmagick.php</a>
{/if}
{if $converterName eq 'wpc'}
   {l s='wpc' mod='wkwebp'} <a href="https://github.com/rosell-dk/webp-convert-cloud-service/">https://github.com/rosell-dk/webp-convert-cloud-service/</a>
{/if}
{if $converterName eq 'ewww'}
   {l s='ewww' mod='wkwebp'} <a href="https://ewww.io/">https://ewww.io/</a>
{/if}
{if $converterName eq 'gd'}
    {l s='gd' mod='wkwebp'} <a href="https://www.php.net/manual/en/book.image.php">https://www.php.net/manual/en/book.image.php</a>
{/if} *}


<div class="form-group">
   <div class="col-lg-9">
      {foreach $converterName as $converter}
         <div class="checkbox">
            <label for="WK_WEBP_STACK_CONVERTERS[]_{$converter.id|escape:'htmlall':'UTF-8'}">
               <input type="checkbox" class="converterCheck" name="WK_WEBP_STACK_CONVERTERS[]_{$converter.id|escape:'htmlall':'UTF-8'}" id="WK_WEBP_STACK_CONVERTERS[]_{$converter.id|escape:'htmlall':'UTF-8'}" {if is_array($converted)}{if in_array($converter.id, $converted)}checked{/if}{/if} value="{$converter.id|escape:'htmlall':'UTF-8'}" {if $converter.disabled}disabled="disabled"{/if}>{$converter.name|escape:'htmlall':'UTF-8'}
               <a href="{$converter.href|escape:'htmlall':'UTF-8'}">{$converter.href|escape:'htmlall':'UTF-8'}</a>
            </label>
         </div>
      {/foreach}
   </div>
</div>
