/*
 * csoft_invisible_recaptcha_v2 front-end module version 1.1.1 for Prestashop 1.7
 * Support contact : prestashop@comonsoft.com.
 *
 * NOTICE OF LICENSE
 *
 * This source file is the property of Com'onSoft
 * that is bundled with this package.
 * It is also available through the world-wide-web at this URL:
 * https://boutique.comonsoft.com/
 *
 * @category  front-end
 * @package   csoft_invisible_recaptcha_v2
 * @author    Com'onSoft (http://www.comonsoft.com/)
 * @copyright 2016-2020. Com'onSoft and contributors
 * @version   1.1.2
 */

$(document).ready(function () {
  if ($('.contact-form').length > 0 || $('.block_newsletter').length > 0 || $('#customer-form').length > 0) {

    $(".contact-form form").each(function () {
      var el = $(this);
      grecaptcha.ready(function () {
        grecaptcha.execute(recaptchaKey, {action: 'submit'}).then(function (token) {

          $(el).prepend('<input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" value="' + token + '">');
        });
      });
    });

    $(".block_newsletter form").each(function () {
      var el = $(this);
      grecaptcha.ready(function () {
        grecaptcha.execute(recaptchaKey, {action: 'submit'}).then(function (token) {
          $(el).prepend('<input type="hidden" id="g-recaptcha-response-nl" name="g-recaptcha-response" value="' + token + '">');
        });
      });
    });

    $("#customer-form").each(function () {
      var el = $(this);
      grecaptcha.ready(function () {
        grecaptcha.execute(recaptchaKey, {action: 'submit'}).then(function (token) {
          $(el).prepend('<input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" value="' + token + '">');
        });
      });
    });

    function refreshreCaptchaToken(){
      grecaptcha.execute(recaptchaKey, {action: 'refresh'}).then(function (token) {
        $('input[name="g-recaptcha-response"]').val(token);
      });
    };
    setInterval(refreshreCaptchaToken, 110000);
  }
});

