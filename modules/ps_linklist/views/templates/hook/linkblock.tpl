{**
  * 2007-2018 PrestaShop.
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
  * @author    PrestaShop SA <contact@prestashop.com>
  * @copyright 2007-2018 PrestaShop SA
  * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
  * International Registered Trademark & Property of PrestaShop SA
  *}

{foreach $linkBlocks as $linkBlock}
  <h3>{$linkBlock.title|escape:'html':'UTF-8'}</h3>
  <ul>
    {foreach $linkBlock.links as $link}
      <li>
        <a
          id="{$link.id}-{$linkBlock.id}"
          class="{$link.class}"
          href="{$link.url|escape:'html':'UTF-8'}"
          title="{$link.description|escape:'html':'UTF-8'}"
          {if !empty($link.target)} target="{$link.target|escape:'html':'UTF-8'}" {/if}
        >
          {$link.title|escape:'html':'UTF-8'}
        </a>
      </li>
    {/foreach}
  </ul>
{/foreach}
