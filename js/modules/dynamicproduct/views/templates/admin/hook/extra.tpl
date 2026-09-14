{*
* 2007-2026 TuniSoft
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
*  @author    TuniSoft <tunisoft.solutions@gmail.com>
*  @copyright 2007-2026 TuniSoft
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}
<div id="dp_product_config">
  <iframe
          id="dynamicproduct-product-config"
          src="{$iframe_uri|escape:'htmlall':'UTF-8'}"
          name="dp-product-config"
          style="background: #fff; height: 100vh"
  ></iframe>

  <div class="dp-open-btn-container">
    <a href="{$dev_link|escape:'htmlall':'UTF-8'}" class="btn btn-default" id="dp-open-btn"
       title="{l s='Open settings' mod='dynamicproduct'} ({l s='Ctrl+Click to open in new tab' mod='dynamicproduct'})">
      <img src="{$dp_uri|escape:'htmlall':'UTF-8'}/logo.png" width="48" height="48" alt="Logo">
      <div>
          {l s='Open settings' mod='dynamicproduct'}
      </div>
    </a>
  </div>
</div>

<script>
  window.dpa.app_uri = "{$iframe_uri|escape:'htmlall':'UTF-8'}";

  /** @type { HTMLIFrameElement } */
  const iframe = document.getElementById('dynamicproduct-product-config');

  window.dpa.close_iframe = () => {
    iframe.style.display = 'none';
    document.body.classList.remove('dp-iframe-open')
  };

  (function () {
    const tabBtn = document.getElementById('product_extra_modules-tab-nav');
    if (tabBtn) {
      const clone = tabBtn.cloneNode(true);
      clone.setAttribute('id', 'dp-opensettings-tab-nav');
      const inserted = tabBtn.parentNode.appendChild(clone);
      inserted.querySelector('a').innerHTML =
        `<img width="24" height="24"
                src="{$dp_uri|escape:'htmlall':'UTF-8'}logo.png"
                alt="{l s='Dynamic Product' mod='dynamicproduct'}"
            >`;
      inserted.querySelector('a').setAttribute('href', window.dpa.links.dev_link);
      inserted.setAttribute('title', '{l s='Open settings' mod='dynamicproduct'} {l s='(Ctrl+Shift+Click to open in a new tab)' mod='dynamicproduct'}');
      inserted.querySelector('a').addEventListener('click', function (e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
          e.stopPropagation();
          return;
        }
        document.querySelector('[href="#product_extra_modules-tab"]').click();
        document.querySelector('[data-target="module-dynamicproduct"]').click();
        iframe.style.display = 'block';
        document.body.classList.add('dp-iframe-open')
      });
    }
  }());

  document.getElementById('dp-open-btn')?.addEventListener('click', (e) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    iframe.style.display = 'block';
    document.body.classList.add('dp-iframe-open')
  });
</script>

<style>
    body.dp-iframe-open {
        overflow: hidden;
    }

    #dp-open-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .5rem;
        font-size: 1em;
    }

    iframe#dynamicproduct-product-config {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        border: 0;
        z-index: 20000;
    }

    .module-dynamicproduct h2 {
        display: inline-block;
        vertical-align: middle;
    }

    .module-dynamicproduct .top-logo {
        height: 48px;
        width: auto;
    }

    #module_dynamicproduct {
        margin: 0 !important;
    }

    #product_extra_modules .module-selection {
        margin-bottom: 1em;
    }
</style>
