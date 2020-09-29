class PostHelper {

  post (url, data) {
    data.ajax = true;
    data.id_product = dp_id_product;
    return jQuery.post({
      url,
      data,
      dataType: "json",
      success: function (response) {
        if (!data.no_msg) {
          if (response.success) {
            showSuccessMessage(dp_message.success);
          } else {
            showErrorMessage(response.message);
          }
        }
      }
    });
  }

}

module.exports = {PostHelper};