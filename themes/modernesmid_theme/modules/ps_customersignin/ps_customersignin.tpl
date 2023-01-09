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
<div id="_desktop_user_info p-0 p-sm-0" class="float-right btn btn-link">
  <div class="user-info">
    {if $logged}

<div class="dropdown">
  <a class="dropdown-toggle text-decoration-none text-white text-sm-white" href="#" data-target="customer-menu-dropdown-menu" role="button" id="customer-menu-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    <i class="fa-sharp fa-user-circle d-block d-sm-block d-md-none d-lg-none logged mr-1"></i> <span class="hidden-sm-down">{$customerName}</span>
  </a>
  <div class="dropdown-menu" id="customer-menu-dropdown-menu" aria-labelledby="customer-menu-dropdown">
      <a
        class="dropdown-item text-decoration-none account"
        href="{$my_account_url}"
        title="{l s='View my customer account' d='Shop.Theme.Customeraccount'}"
        rel="nofollow"
      >
        <i class="fa-sharp fa-user-circle logged mr-1"></i> {l s='Your account' d='Shop.Theme.Customeraccount'}
      </a>
      <a
        class="dropdown-item text-decoration-none logout"
        href="{$logout_url}"
        rel="nofollow"
      >
        <i class="fa-sharp fa-key mr-1"></i> {l s='Sign out' d='Shop.Theme.Actions'}
      </a>
  </div>
</div>
    {else}
      <a class="text-decoration-none text-white text-sm-white"
        href="{$my_account_url}"
        title="{l s='Log in to your customer account' d='Shop.Theme.Customeraccount'}"
        rel="nofollow"
      >
        <i class="fa-sharp fa-user-circle"></i>
        <span class="hidden-sm-down">{l s='Sign in' d='Shop.Theme.Actions'}</span>
      </a>
    {/if}
  </div>
</div>
