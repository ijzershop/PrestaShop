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
</div>

<script>
	window.dpa.app_uri = "{$iframe_uri|escape:'htmlall':'UTF-8'}";

	(function() {
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
			inserted.querySelector('a').addEventListener('click', function(e) {
				if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
					e.stopPropagation();
					return;
				}
				document.querySelector('[href="#product_extra_modules-tab"]').click();
				document.querySelector('[data-target="module-dynamicproduct"]').click();
			});
		}
	}());

	const container = document.getElementById('dp_product_config');
	const iframe = document.getElementById('dynamicproduct-product-config');

	if (!dpa.links.is_new_tab) {
		const resizeObserver = new ResizeObserver(() => {
			if (iframe?.contentDocument) {
				const height = iframe.contentDocument.body.scrollHeight;
				container.style.height = 'max(' + height + 'px, 100vh)';
				iframe.style.height = 'max(' + height + 'px, 100vh)';
			}
		});

		iframe.addEventListener('load', () => {
			resizeObserver.observe(iframe.contentDocument.body);
		});
	}
</script>

<style>
  iframe#dynamicproduct-product-config {
    width: 100%;
    border: 0;
  }

  .module-dynamicproduct h2 {
    display: inline-block;
    vertical-align: middle;
  }

  #module_dynamicproduct {
    margin: 0 !important;
  }

  #product_extra_modules .module-selection {
    margin-bottom: 1em;
  }
</style>
