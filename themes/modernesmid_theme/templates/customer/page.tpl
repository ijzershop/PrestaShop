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
{extends file='page.tpl'}


{block name='page_content_container'}
  <section id="content" class="page-content col-12">

  <div class="row">
    {if $customer.is_logged}
    <div class="col-lg-4 col-md-4 col-sm-12 col-12" id="customer-account-navigation">
          {block name='page_menu'}
            {include file='customer/_partials/my-account-nav.tpl'}
          {/block}
    </div>
    {/if}
    <div class="{if $customer.is_logged}col-lg-8 col-md-8 col-sm-12 col-12{else}col-12{/if}">
      {block name='notifications'}{/block}
      {block name='page_content_top'}
      {/block}
      {block name='customer_notifications'}
        {include file='_partials/notifications.tpl'}
      {/block}
      {block name='page_content'}
        <!-- Page content -->
      {/block}
    </div>
  </div>
  </section>
{/block}

{block name='page_footer'}
{*   {block name='my_account_links'}
    {include file='customer/_partials/my-account-links.tpl'}
  {/block} *}
{/block}
