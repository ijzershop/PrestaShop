{**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
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
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 *}
{block name='step'}
  <style>
    #toggle-postcode-check .switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 12px;
      line-height: 12px;
      margin-top:.6rem;
    }

    /* Hide default HTML checkbox */
    #toggle-postcode-check .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* The slider */
    #toggle-postcode-check .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }

    #toggle-postcode-check .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 0px;
      bottom: -4px;
      border: 1px solid #ccc;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }

    #cart-postcode-check-toggle:checked+.slider {
      background-color: #2196F3;
    }

    #cart-postcode-check-toggle:focus+.slider {
      box-shadow: 0 0 1px #2196F3;
    }

    #cart-postcode-check-toggle:checked+.slider:before {
      border: 1px solid #2196F3;
      -webkit-transform: translateX(30px);
      -ms-transform: translateX(30px);
      transform: translateX(30px);
    }

    /* Rounded sliders */
    #toggle-postcode-check .slider.round {
      border-radius: 12px;
    }

    #toggle-postcode-check .slider.round:before {
      border-radius: 50%;
    }
    #toggle-postcode-check label:first-child {
      line-height: 27px;
    }
    #toggle-postcode-check label svg{
      vertical-align: -.3em!important;
    }
    #postcode-check-info{
      color:#3b56ad;
      display:none;
    }
    .selected{
      background-color: #f0f0f0;
    }
  </style>



  <section  id    = "{$identifier}"
            class = "{[
                        'checkout-step'   => true,
                        '-current'        => $step_is_current,
                        '-reachable'      => $step_is_reachable,
                        '-complete'       => $step_is_complete,
                        'js-current-step' => $step_is_current
                    ]|classnames}"
  >
    <h1 class="step-title js-step-title h3 p-2 pt-3 pb-3">
      <i class="fasl fa-check rtl-no-flip done pl-2 pr-1"></i>
      <span class="step-number m-0">{$position}</span>
      {$title}
      <span class="step-edit text-muted"><i class="fasl fa-pen-to-square edit"></i> <span class="d-none d-md-inline">{l s='Edit' d='Shop.Theme.Actions'}</span></span>
    </h1>

    <div class="content p-2">
      {block name='step_content'}DUMMY STEP CONTENT{/block}
    </div>
  </section>
{/block}
