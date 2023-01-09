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
<div class="footer-container bg-light pt-1">
  <div class="container-fluid">
    <div class="bg-light">
      <div class="container-fluid d-none d-sm-none d-md-block">
          {block name='header-info-block'}
              {include file="custom_blocks/zekerheden-banner.tpl"}
          {/block}
      </div>
    {block name='footer-info-block'}
      {include file="custom_blocks/footer-info-top.tpl"}
    {/block}

    {block name='footer-info-block'}
      {include file="custom_blocks/footer-info-bottom.tpl"}
    {/block}
    </div>
    <div class="row bg-footer align-middle">
      <div class="container">
        <div class="row">
          <div class="col-12 d-flex d-sm-flex d-lg-none">
            <img class="mx-auto pt-2" rel="preload" as="image" width="50px" src="/themes/modernesmid_theme/assets/img/200818_Betalingsmethoden_YS_R01.svg" alt="{l s="payment options" d='Shop.Theme.Global'}" title="{l s="payment options from this shop" d='Shop.Theme.Global'}">
          </div>
          <div class="col-12 col-lg-9">
            <p class="text-center text-lg-left">
              {block name='copyright_link'}
                <a class="text-white">
                  <br>
                  {l s='%copyright% %year% %modernesmid% | %kvknummer% | %btw%' sprintf=['%modernesmid%' => 'De Moderne Smid BV', '%kvknummer%' => 'KvK nummer: 075220555', '%btw%' => 'BTW nr.: NL860193421B01', '%year%' => 'Y'|date, '%copyright%' => '©'] d='Shop.Theme.Global'}
                </a>
              {/block}
            </p>
          </div>
          <div class="d-none d-lg-block col-lg-3">
            <img class="float-right pt-2" rel="preload" as="image" width="50px" src="/themes/modernesmid_theme/assets/img/200818_Betalingsmethoden_YS_R01.svg" alt="{l s="payment options" d='Shop.Theme.Global'}" title="{l s="payment options from this shop" d='Shop.Theme.Global'}">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{hook h='displayFooter'}
