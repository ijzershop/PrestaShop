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
{if $errors|count}
{block name='form_errors'}
<aside id="notifications">
  <div class="row pl-1 pr-1 pt-1">

      {block name='notifications_error'}
        <article style="z-index: 999999;" class="alert alert-danger col-12 p-1 m-0" role="alert" data-alert="danger">
          <div class="row">
            <div class="col-2 my-auto"><i class="fasl fa-warning w-100 fa-4x"></i></div>
            <div class="col-10">
              <div class="row">
                <div class="col-12">
                  <div class="alert-heading">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button></div>
                  <ul class="list-unstyled mb-0">
                    {foreach $errors as $error}
                      <li><h5>{$error|nl2br nofilter}</h5></li>
                    {/foreach}
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <hr class="mt-1">
                  <p class="contact-msg">Komt u er niet uit? Neem dan even contact met ons op. We helpen u graag verder.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      {/block}
  </div>
</aside>
      {/block}

    {/if}

