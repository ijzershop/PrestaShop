/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
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
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */

export default function () {
  function updateVisibilityIcons(domainActions) {
    const visibilityOffIcon = domainActions.find('.visibility-off');
    const visibilityOnIcon = domainActions.find('.visibility-on');
    const showMessagesButton = domainActions.find('.btn-show-messages');
    const hideMessagesButton = domainActions.find('.btn-hide-messages');
    const expandedMessages = visibilityOffIcon.hasClass('hide');
    if (expandedMessages) {
      visibilityOffIcon.removeClass('hide');
      visibilityOnIcon.addClass('hide');
      showMessagesButton.addClass('hide');
      hideMessagesButton.removeClass('hide');
    } else {
      visibilityOnIcon.removeClass('hide');
      visibilityOffIcon.addClass('hide');
      showMessagesButton.removeClass('hide');
      hideMessagesButton.addClass('hide');
    }
  }

  function updateMissingTranslationsWarning(domainActions) {
    const subdomain = domainActions.parent().next('.subdomains');
    const missingTranslations = subdomain.find('[data-missing-translations]');
    let totalMissingTranslations = 0;

    $(missingTranslations).each((index, element) => {
      totalMissingTranslations += parseInt($(element).attr('data-missing-translations'), 10);
    });

    if (totalMissingTranslations > 0) {
      const missingTranslationsWarning = domainActions.find('.missing-translations');
      let warningMessage = missingTranslationsWarning.text();
      warningMessage = warningMessage.replace('%d', totalMissingTranslations);
      missingTranslationsWarning.text(warningMessage);
      missingTranslationsWarning.removeClass('hide');
    }

    return totalMissingTranslations;
  }

  let allDomainsMissingTranslations = 0;

  $('.domain-first-part').each((index, domainToggler) => {
    const domainActions = $(domainToggler).find('.domain-actions');

    allDomainsMissingTranslations += updateMissingTranslationsWarning(domainActions);

    $(domainToggler).click((event) => {
      let domainTitle;

      if ($(event.target).hasClass('domain-first-part')) {
        domainTitle = $(event.target);
      } else {
        domainTitle = $(event.target).parent();
      }

      domainTitle.find('i').toggleClass('expanded');
      $(domainTitle.nextAll().filter('.subdomains')[0]).toggleClass('hide');

      updateVisibilityIcons(domainActions);

      event.stopPropagation();

      return false;
    });
  });

  (function defineTranslations(totalTranslations, totalRemainingTranslations) {
    const totalTranslationsTemplate = $('.summary .total-translations').attr('data-template');
    const remainingTranslationsTemplate = $('.summary .total-remaining-translations').attr('data-template');

    if (totalRemainingTranslations > 0) {
      const remainingTranslationsMessage = remainingTranslationsTemplate.replace('%d', totalRemainingTranslations);
      $('.total-remaining-translations').text(remainingTranslationsMessage);
      $('.summary .separator').removeClass('hide');
    }

    if (totalTranslationsTemplate) {
      const totalTranslationsMessages = totalTranslationsTemplate.replace('%d', totalTranslations);
      $('.summary .total-translations').text(totalTranslationsMessages);
    }
  }($('#jetsContent form').length, allDomainsMissingTranslations));

  $('.domain-actions').click((event) => {
    let domainActions = $(event.target);
    if (!$(event.target).hasClass('domain-actions')) {
      domainActions = $(event.target).parent();
    }

    const domainFirstPart = domainActions.prev();
    domainFirstPart.click();
  });

  $('.btn-expand').click(() => {
    $('.domain-first-part').each((index, domainToggler) => {
      const domainTitle = $(domainToggler);
      const isDomainExpanded = domainTitle.find('i').hasClass('expanded');
      if (!isDomainExpanded) {
        $(domainTitle.find('i')).click();
      }
    });
  });

  $('.btn-reduce').click(() => {
    $('.domain-first-part').each((index, domainToggler) => {
      const domainTitle = $(domainToggler);
      const isDomainExpanded = domainTitle.find('i').hasClass('expanded');
      if (isDomainExpanded) {
        $(domainTitle.find('i')).click();
      }
    });
  });

  $($('.domain-first-part')[0]).click(); // Expand first domain in tree
  $($('.domain-part .delegate-toggle-messages')[0]).click(); // Show messages of first domain
}
