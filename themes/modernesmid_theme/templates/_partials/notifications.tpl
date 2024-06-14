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

<style>
  .alert{
    position: fixed;
    top:20%;
    left: calc(30% / 2);
    z-index: 99;
    width: 70%!important;
    font-size: 1rem;
    font-weight: bold;
  }
  .alert-heading{
    opacity: .5;
  }
  .alert .close{
    opacity: .5;
    color:#ffffff;
  }
  .alert .contact-msg{
    opacity: .5;
  }
</style>

{if isset($notifications)}
<aside id="notifications">
  <div class="row">
    {if $notifications.error}
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
                  {foreach $notifications.error as $notif}
                    <li>{$notif nofilter}</li>
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
    {/if}

    {if $notifications.warning}
      {block name='notifications_warning'}
        <article class="alert alert-warning col-12" role="alert" data-alert="warning">
          <div class="row">
            <div class="col-2 my-auto"><i class="fasl fa-exclamation-triangle w-100 fa-4x"></i></div>
            <div class="col-10">
              <div class="row">
                <div class="col-12">
                  <h4 class="alert-heading">Let op!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button></h4>
                  <ul class="list-unstyled mb-0">
                    {foreach $notifications.warning as $notif}
                      <li>{$notif nofilter}</li>
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
    {/if}

    {if $notifications.success}
      {block name='notifications_success'}
        <article class="alert alert-success col-12" role="alert" data-alert="success">
          <div class="row">
            <div class="col-2 my-auto"><i class="fasl fa-shield-check w-100 fa-4x"></i></div>
            <div class="col-10">
              <div class="row">
                <div class="col-12">
                  <h4 class="alert-heading">Succes!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button></h4>
                  <ul class="list-unstyled mb-0">
                    {foreach $notifications.success as $notif}
                      <li>{$notif nofilter}</li>
                    {/foreach}
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <hr class="mt-1">
                  <p class="contact-msg">Heeft u nog vragen? Neem dan even contact met ons op. We helpen u graag verder.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      {/block}
    {/if}

    {if $notifications.info}
      {block name='notifications_info'}
        <article class="alert alert-info col-12" role="alert" data-alert="info">
          <div class="row">
            <div class="col-2 my-auto">
              <i class="fasl fa-megaphone w-100 fa-4x"></i>
            </div>
            <div class="col-10">
              <div class="row">
                <div class="col-12">
                  <h4 class="alert-heading">Informatie!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button></h4>
                  <ul class="list-unstyled mb-0">
                    {foreach $notifications.info as $notif}
                      <li>{$notif nofilter}</li>
                    {/foreach}
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <hr class="mt-1">
                  <p class="contact-msg">Heeft u nog vragen? Neem dan even contact met ons op. We helpen u graag verder.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      {/block}
    {/if}
  </div>
</aside>
{/if}
