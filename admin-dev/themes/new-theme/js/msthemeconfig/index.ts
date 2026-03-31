import initPrestashopComponents from "@app/utils/init-components";

/**
 * For the full copyright and license information, please view the
 * docs/licenses/LICENSE.txt file that was distributed with this source code.
 */

const {$} = window;
$(() => {
  initPrestashopComponents();

  window.prestashop.component.initComponents(
    [
      'TranslatableInput',
      'TranslatableField',
      'TinyMCEEditor',
    ],
  );
  const translatorInput = window.prestashop.instance.translatableInput;
});
