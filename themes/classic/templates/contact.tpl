{**
 * 2007-2020 PrestaShop SA and Contributors
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
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
{extends file='page.tpl'}

{block name='page_header_container'}{/block}

{if $layout === 'layouts/layout-left-column.tpl'}
  {block name="left_column"}
    <div id="left-column" class="col-xs-12 col-sm-4 col-md-3">
      {widget name="ps_contactinfo" hook='displayLeftColumn'}
    </div>
  {/block}
{else if $layout === 'layouts/layout-right-column.tpl'}
  {block name="right_column"}
    <div id="right-column" class="col-xs-12 col-sm-4 col-md-3">
      {widget name="ps_contactinfo" hook='displayLeftColumn'}
    </div>
  {/block}
{/if}

{block name='page_content'}
  {widget name="contactform"}
{/block}
