/**
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
 */

$(document).ready(function () {
  $('body').on('click', '.post-product-comment', function (event) {
    event.preventDefault();
    showPostCommentModal();
  });

  $('#post-product-comment-modal button[data-dismiss="modal"]').on('click', function () {
    clearPostCommentForm();
  });

  function showPostCommentModal() {
    $('#product-comment-posted-modal').find('button[data-dismiss="modal"]').trigger('click');
    $('#post-product-comment-modal').modal('show');
  }

  function showCommentPostedModal() {
    var alert = $('#product-comment-message .alert');
    alert.addClass('alert-success')
    alert.html('Bedankt voor uw beoordeling!');

    $('#product-comment-message').removeClass('d-none').addClass('d-block');

    setTimeout(function(){
      $('#post-product-comment-modal').find('button[data-dismiss="modal"]').trigger('click');
      clearPostCommentForm();
    },1500);


  }

  function showPostErrorModal(errorMessage) {
    var alert = $('#product-comment-message .alert');
    alert.addClass('alert-danger')
    alert.html(errorMessage);
    $('#product-comment-message').removeClass('d-none').addClass('d-block');
  }

  function clearPostCommentForm() {
    $('#post-product-comment-form input[type="text"]').val('');
    $('#post-product-comment-form input[type="text"]').removeClass('valid error');
    $('#post-product-comment-form textarea').val('');
    $('#post-product-comment-form textarea').removeClass('valid error');
    $('#post-product-comment-form .criterion-rating input').val(3).change();

    var alert = $('#product-comment-message .alert');
    alert.removeClass('alert-danger alert-success')
    alert.html('');
    $('#product-comment-message').addClass('d-none').removeClass('d-block');

  }

  function initCommentModal() {
    $('#post-product-comment-modal .grade-stars').rating();
    $('body').on('click', '.post-product-comment', function (event) {
      event.preventDefault();
      showPostCommentModal();
    });

    $('#post-product-comment-form').submit(submitCommentForm);
  }

  function submitCommentForm(event) {
    event.preventDefault();
    var formData = $(this).serializeArray();
    if (!validateFormData(formData)) {
      return;
    }
    $.post($(this).attr('action'), $(this).serialize(), function(jsonData) {
      if (jsonData) {
        if (jsonData.success) {
          clearPostCommentForm();
          showCommentPostedModal();
        } else {
          if (jsonData.errors) {
            var errorList = '<ul>';
            for (var i = 0; i < jsonData.errors.length; ++i) {
              errorList += '<li>' + jsonData.errors[i] + '</li>';
            }
            errorList += '</ul>';
            showPostErrorModal(errorList);
          } else {
            const decodedErrorMessage = $("<div/>").html(jsonData.error).text();
            showPostErrorModal(decodedErrorMessage);
          }
        }
      } else {
        showPostErrorModal(productCommentPostErrorMessage);
      }
    }).fail(function() {
      showPostErrorModal(productCommentPostErrorMessage);
    });
  }

  function validateFormData(formData) {
    var isValid = true;
    formData.forEach(function(formField) {
      const fieldSelector = '#post-product-comment-form [name="'+formField.name+'"]';
      if (!formField.value) {
        $(fieldSelector).addClass('error');
        $(fieldSelector).removeClass('valid');
        isValid = false;
      } else {
        $(fieldSelector).removeClass('error');
        $(fieldSelector).addClass('valid');
      }
    });

    return isValid;
  }

  initCommentModal();
});
