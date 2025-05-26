/*
 * csoft_phpunit  back-end module version 1.0 for Prestashop 1.6, 1.7
 * Support contact : prestashop@comonsoft.com.
 *
 * NOTICE OF LICENSE
 *
 * This source file is the property of Com'onSoft
 * that is bundled with this package.
 * It is also available through the world-wide-web at this URL:
 * https://boutique.comonsoft.com/
 *
 * @category  back-end
 * @package   csoft_phpunit
 * @author    Com'onSoft (http://www.comonsoft.com/)
 * @copyright 2016-2020 Com'onSoft and contributors
 * @version   1.0.0
 */

jQuery(document).ready(function () {
  const $ = jQuery;
  $('body').on('click', '.post-product-comment', function (event) {
    showPostCommentModal();
    event.preventDefault();
  });

  const postCommentModal = $('#post-product-comment-modal');
  postCommentModal.on('hidden.bs.modal', function () {
    postCommentModal.modal('hide');
    clearPostCommentForm();
  });

  const commentPostedModal = $('#product-comment-posted-modal');
  const commentPostErrorModal = $('#product-comment-post-error');

  function showPostCommentModal() {
    commentPostedModal.modal('hide');
    commentPostErrorModal.modal('hide');
    postCommentModal.modal('show');
  }

  function showCommentPostedModal() {
    postCommentModal.modal('hide');
    commentPostErrorModal.modal('hide');
    clearPostCommentForm();
    commentPostedModal.modal('show');
  }

  function showPostErrorModal(errorMessage) {
    postCommentModal.modal('hide');
    commentPostedModal.modal('hide');
    clearPostCommentForm();
    $('#product-comment-post-error-message').html(errorMessage);
    commentPostErrorModal.modal('show');
  }

  function clearPostCommentForm() {
    $('#post-product-comment-form input[type="text"]').removeClass('valid error');
    $('#post-product-comment-form textarea').val('');
    $('#post-product-comment-form textarea').removeClass('valid error');
    $('#post-product-comment-form .criterion-rating input').val(5).change();
  }

  function initCommentModal() {
    $('#post-product-comment-modal .grade-stars').rating();
    $('body').on('click', '.post-product-comment', function (event) {
      showPostCommentModal();
      event.preventDefault();
    });

    $('#post-product-comment-form').submit(submitCommentForm);
  }

  function submitCommentForm(event) {
    var formData = $(this).serializeArray();
    if (!validateFormData(formData)) {
      return false;
    }

    $.post($(this).attr('action'), $(this).serialize(), function(jsonResponse) {
      var jsonData = false;
      try {
        jsonData = JSON.parse(jsonResponse);
      } catch (e) {
      }
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
    event.preventDefault();
	return false;
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
