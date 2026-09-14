{*
* 2007-2026 TuniSoft
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
*  @copyright 2007-2026 TuniSoft
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

{**
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *}
{$componentName = 'product-customization-summary'}

{assign var=image_modals value=[]}

{foreach from=$product.customizations item="customization"}
    {foreach from=$customization.fields item="field"}
      <div class="{$componentName}__line{if !$field@last} mb-3{/if}">
        <p class="mb-2 text-dark">{$field.label}</p>

          {if $field.type == 'text'}
            <p class="mb-0">
                {if $field.id_module|intval}
                    {$field.text nofilter} {* html already sanitized by the module *}
                {else}
                    {$field.text}
                {/if}
            </p>
          {elseif $field.type == 'image'}
              {assign var=image_modal_id value="{$componentName}_image--{mt_rand()}"}
            <a href="#{$image_modal_id}" data-bs-toggle="modal" data-bs-dismiss="modal">
              <img class="rounded-3" src="{$field.image.small.url}">
            </a>
              {append var='image_modals'
              value=[
              "id"=>$image_modal_id,
              "title"=>$field.label,
              "image_url"=>$field.image.large.url,
              "image_info"=>getimagesize($field.image.large.url),
              "back_id"=>$customization_modal_id
              ]
              }
          {/if}
      </div>
    {/foreach}
{/foreach}

{if isset($image_modals) && count($image_modals)}
  <div class="{$componentName}__popup">
      {foreach from=$image_modals item="image_modal"}
        <div class="modal fade" id="{$image_modal['id']}" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down">
            <div class="modal-content">
              <div class="modal-header">
                <p class="h5 modal-title">{$image_modal['title']}</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="{l s='Close' d='Shop.Theme.Global'}"></button>
              </div>

              <div class="modal-body">
                <img class="img-fluid" src="{$image_modal['image_url']}">
              </div>

              <div class="modal-footer border-1 d-flex flex-wrap justify-content-between w-100">
                <div class="d-inline-flex">
                  <span>{$image_modal['image_info'][0]} x {$image_modal['image_info'][1]}</span>
                  <span class="text-muted ms-2">({$image_modal['image_info']['mime']})</span>
                </div>
                <button type="button" class="btn btn-primary"
                        data-bs-dismiss="modal"
                >
                    {l s='Back' d='Shop.Theme.Global'}
                </button>
              </div>
            </div>
          </div>
        </div>
      {/foreach}
  </div>
{/if}
