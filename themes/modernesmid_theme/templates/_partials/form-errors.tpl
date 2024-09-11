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





<style>
  .alert:not('#custom-msg'){
    position: fixed;
    top:20%;
    left: calc(30% / 2);
    z-index: 99;
    width: 70%;
    font-size: 1rem;
    font-weight: bold;
  }
  .alert-heading{
    opacity: .5;
  }
  .alert:not('#custom-msg') .close{
    opacity: .5;
    color:#ffffff;
  }
  .alert:not('#custom-msg') .contact-msg{
    opacity: .5;
  }
</style>
{block name='form_errors'}
<aside id="notifications">
  <div class="row">

      {block name='notifications_error'}
        <article class="alert alert-danger col-12" role="alert" data-alert="danger">
          <div class="row">
            <div class="col-2 my-auto"><i class="fasl fa-warning w-100 fa-4x"></i></div>
            <div class="col-10">
              <div class="row">
                <div class="col-12">
                  <h4 class="alert-heading">Er ging iets fout!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button></h4>
                  <ul class="list-unstyled mb-0">
                    {foreach $errors as $error}
                      <li>{$error|nl2br nofilter}</li>
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

