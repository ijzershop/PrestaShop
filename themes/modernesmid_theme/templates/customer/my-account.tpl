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
{extends file='customer/page.tpl'}

{block name='page_title'}
  {l s='My account' d='Shop.Theme.Customeraccount'}
{/block}

{block name='page_content'}
{assign var="customer" value=Context::getContext()->customer}
  <div class="col-12">
      <div class="h4">Welkom {$customer->firstname} {$customer->lastname}</div>
      <p>
        {Configuration::get('MSTHEMECONFIG_MY_ACCOUNT_LANDING_TEXT',Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}
      </p>
  </div>
{/block}
