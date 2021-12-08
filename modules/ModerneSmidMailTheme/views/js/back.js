/**
* 2007-2021 PrestaShop
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
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2021 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*
* Don't forget to prefix your containers with your own identifier
* to avoid any conflicts with others containers.
*/
let updateTableValue = function (input) {
  let configInput = document.getElementById('MODERNESMIDMAILTHEME_EMAIL_TEMPLATE_BLOCKS');
  var emailTemplateBlocks = JSON.parse(configInput.value);
  var name = input.getAttribute('data-name');
  var blockName = name.substring(name.lastIndexOf('_') + 1);
  var template = name.substring(0, name.lastIndexOf('_'));

  if(emailTemplateBlocks.hasOwnProperty(template)) {
    emailTemplateBlocks[template][blockName] = input.checked;
  } else {
    emailTemplateBlocks[template] = {};
    emailTemplateBlocks[template][blockName] = input.checked;
  }
  configInput.value = JSON.stringify(emailTemplateBlocks);
}

let fillTableValues = function (){
  let configInput = document.getElementById('MODERNESMIDMAILTHEME_EMAIL_TEMPLATE_BLOCKS');
  var emailTemplateBlocks = JSON.parse(configInput.value);
  document.querySelectorAll('table#email-blocks td input[type="checkbox"]').forEach((input) => {

    var name = input.getAttribute('data-name');
    var blockName = name.substring(name.lastIndexOf('_') + 1);
    var template = name.substring(0 ,name.lastIndexOf('_'));

    if(emailTemplateBlocks.hasOwnProperty(template)){
      input.checked = emailTemplateBlocks[template][blockName];
    }

    input.addEventListener('change', function(elem){
      updateTableValue(elem.target);
    });
  });
}

$(function() {
  fillTableValues();
});
