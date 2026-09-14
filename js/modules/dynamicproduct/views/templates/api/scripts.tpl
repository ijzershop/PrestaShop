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
<script>
  if (!window.tn_scripts) {
    window.tn_scripts = [];
  }

  for (var index in window.dp_scripts) {
    window.tn_scripts.push(window.dp_scripts[index]);
  }

  function loadTnScripts() {
    for (var index in window.tn_scripts) {
      System.import(window.tn_scripts[index]);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (window.scripts_loading) {
      return;
    }
    window.scripts_loading = true;
    if (typeof window.System === 'undefined') {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.15.1/system.min.js";
      script.onload = loadTnScripts;
      document.head.appendChild(script);
    } else {
      loadTnScripts();
    }
  });
</script>
