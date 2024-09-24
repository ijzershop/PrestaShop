{**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
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
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 *}
{block name='address_selector_blocks'}
  {foreach $addresses as $address}
    <article
      class="js-address-item address-item{if $address.id == $selected} selected{/if} border-1 p-1"
      id="{$name|classname}-address-{$address.id}"
    >
      <header class="h6 p-0 m-0">
        <label class="radio-block mb-0 p-1">
          <span class="custom-radio">
            <input
              type="radio"
              name="{$name}"
              value="{$address.id}"
              {if $address.id == $selected}checked{/if}
            >
            <span></span>
          </span>
          <span class="address-alias">
          <div class="address">{$address.firstname} {$address.lastname} | {$address.address1} {$address.house_number} {$address.house_number_extension} {$address.postcode} | {$address.city} - {$address.country} {if !empty($address.phone) || !empty($address.phone_mobile)}| {$address.phone} {$address.phone_mobile}{/if}</div>
        </span>
        </label>
      </header>
      <hr>
      <footer class="address-footer row">
        {if $interactive}
          <a
            class="edit-address col text-white btn btn-sm btn-warning"
            data-link-action="edit-address"
            href="{url entity='order' params=['id_address' => $address.id, 'editAddress' => $type, 'token' => $token]}"
          >
            <i class="fasl fa-pen-to-square edit"></i>{l s='Edit' d='Shop.Theme.Actions'}
          </a>
          <a
            class="delete-address  col text-white btn btn-sm btn-danger"
            data-link-action="delete-address"
            href="{url entity='order' params=['id_address' => $address.id, 'deleteAddress' => true, 'token' => $token]}"
          >
            <i class="fasl fa-times delete"></i>{l s='Delete' d='Shop.Theme.Actions'}
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
