{**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
{block name='address_selector_blocks'}
  {foreach $addresses as $address}
    <article
      class="address-item card {if $address.id == $selected} selected{/if} col-12 col-md-6"
      id="{$name|classname}-address-{$address.id}"
    >
      <header class="h6">
        <label class="radio-block p-2">
          <span class="custom-radio">
            <input
              type="radio"
              name="{$name}"
              value="{$address.id}"
              {if $address.id == $selected}checked{/if}
            >
            <span></span>
          </span>
          <span class="address-alias h6">{if $address.alias == "My Address"}Mijn Adres{else}{$address.alias}{/if}</span>
          <div class="address" style="font-size: .8rem;font-weight: normal;line-height: 1rem;padding-left: 18px!important;">{$address.formatted nofilter}</div>
        </label>
      </header>
      <hr>
      <footer class="address-footer p-2" style="left: 2rem!important;position: absolute;bottom:0px;">
        {if $interactive}
          <a
            class="edit-address btn btn-sm btn-outline-warning"
            data-link-action="edit-address"
            href="{url entity='order' params=['id_address' => $address.id, 'editAddress' => $type, 'token' => $token]}"
          >
            <i class="fasl fa-edit edit"></i> {l s='Edit' d='Shop.Theme.Actions'}
          </a>
          <a
            class="delete-address btn btn-sm btn-outline-danger"
            data-link-action="delete-address"
            href="{url entity='order' params=['id_address' => $address.id, 'deleteAddress' => true, 'token' => $token]}"
          >
            <i class="fasl fa-xmark delete"></i> {l s='Delete' d='Shop.Theme.Actions'}
          </a>
        {/if}
      </footer>
    </article>
  {/foreach}
  {if $interactive}
    <p>
      <button class="ps-hidden-by-js form-control-submit center-block" type="submit">{l s='Save' d='Shop.Theme.Actions'}</button>
    </p>
  {/if}
{/block}
