$(function () {
  $("#RECAPTCHA_SCORE").attr("type", "hidden");
  $("#RECAPTCHA_SCORE").after("<div id=\"slider-range\"><div id=\"custom-handle\" class=\"ui-slider-handle\"></div></div>");
  $("#slider-range").slider({
    range: "min",
    min: 0,
    max: 10,
    value: $("#RECAPTCHA_SCORE").val(),
    create: function() {
      $( "#custom-handle").text( $("#RECAPTCHA_SCORE").val() );
    },
    slide: function (event, ui) {
      $("#RECAPTCHA_SCORE").val(ui.value);
      $( "#custom-handle").text( ui.value );
    }
  });
});
