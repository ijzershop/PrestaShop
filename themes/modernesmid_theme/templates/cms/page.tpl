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
* @author PrestaShop SA <contact@prestashop.com>
  * @copyright 2007-2019 PrestaShop SA and Contributors
  * @license https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
  * International Registered Trademark & Property of PrestaShop SA
  *}
  {extends file='page.tpl'}
  {include file='custom_blocks/notification.tpl'}
  {block name='page_title'}
  {* {$cms.meta_title} *}
  {/block}
  {block name='page_content_container'}
  <section id="content" class="page-content page-cms page-cms-{$cms.id}">
    {block name='cms_content'}
      {$cms.content nofilter}
    {/block}



    {if strpos(strtolower($cms.meta_title), 'faq') !== false || strpos(strtolower($cms.meta_title), 'veelgestelde') !== false}
      {if strpos(strtolower($urls.shop_domain_url), 'constructiebalk') !== false}
        {include file="../schema_org/faq-constructiebalk.tpl"}
      {/if}
      {if strpos(strtolower($urls.shop_domain_url), 'ijzershop') !== false}
        {include file="../schema_org/faq-ijzershop.tpl"}
      {/if}
      {if strpos(strtolower($urls.shop_domain_url), 'geroshop') !== false}
        {include file="../schema_org/faq-geroshop.tpl"}
      {/if}
      {if strpos(strtolower($urls.shop_domain_url), 'modernesmid') !== false}
        {include file="../schema_org/faq-modernesmid.tpl"}
      {/if}
      {if strpos(strtolower($urls.shop_domain_url), 'bouwstaalmat') !== false}
        {include file="../schema_org/faq-bouwstaalmat.tpl"}
      {/if}
      {if strpos(strtolower($urls.shop_domain_url), 'paneelhek') !== false}
        {include file="../schema_org/faq-paneelhek.tpl"}
      {/if}
      {if strpos(strtolower($urls.shop_domain_url), 'adapt2row') !== false}
        {include file="../schema_org/faq-adapt2row.tpl"}
      {/if}
      {if strpos(strtolower($urls.shop_domain_url), 'legpress') !== false}
        {include file="../schema_org/faq-legpress.tpl"}
      {/if}
    {/if}
  </section>
  {hook h='displayCMSDisputeInformation'}
  {/block}
