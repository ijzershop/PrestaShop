module.exports = {
  Localization: {
    Localization: {
      pack_select: '//*[@id="select2-import_localization_pack_iso_localization_pack-container"]',
      pack_search_input: '/html//input[@class="select2-search__field"]',
      pack_option: '//*[@id="select2-import_localization_pack_iso_localization_pack-results"]//li[contains(text(),"%B")]',
      import_button: '//*[@id="main-div"]//form[@name="import_localization_pack"]//button',
      advanced_language_identifier_input: '//*[@id="form_advanced_language_identifier"]',
      advanced_country_identifier_input: '//*[@id="form_advanced_country_identifier"]',
      advanced_save_button: '(//*[@id="main-div"]//div[@class="card"])[4]//button',
      alert_panel: '//*[@id="main-div"]//div[contains(@class, "%B")]',
      success_alert_panel: '//*[@id="main-div"]//div[contains(@class, "%B") and @role="alert"]/div[@class="alert-text"]',
      configuration_selected_option: '//*[@id="%ID"]/option[@selected="selected"]',
      download_pack_data_toggle_button: '//*[@id="main-div"]//form[@name="import_localization_pack"]//span[@class="ps-switch"]/label',
      content_import_checkbox: '//*[@id="import_localization_pack_content_to_import_%B"]',
      local_unit_input: '//*[@id="form_local_units_%D_unit"]',
      save_local_units_button: '(//*[@id="main-div"]//button[text()="Save"])[2]',
      default_language_list: '#form_configuration_default_language',
      default_country_list: '#form_configuration_default_country',
      default_currency_list: '#form_configuration_default_currency',
      time_zone_list: '#form_configuration_timezone',
      symfony_toolbar: '//*[contains (@id, "sfToolbarMainContent")]/a',
      save_configuration_btn: '(//*[@id="main-div"]//button)[2]',
      language_browser_no_label: '//label[@for="form_configuration_detect_language_from_browser_0"]',
      country_browser_no_label: '//label[@for="form_configuration_detect_country_from_browser_0"]',
      language_browser_yes_label: '//label[@for="form_configuration_detect_language_from_browser_1"]',
      country_browser_yes_label: '//label[@for="form_configuration_detect_country_from_browser_1"]',
    },
    languages: {
      add_new_language_button: '//*[@id="page-header-desc-configuration-add"]',
      name_input: '//*[@id="language_name"]',
      iso_code_input: '//*[@id="language_iso_code"]',
      language_code_input: '//*[@id="language_tag_ietf"]',
      date_format_input: '//*[@id="language_short_date_format"]',
      date_format_full_input: '//*[@id="language_full_date_format"]',
      flag_file: '//*[@id="language_flag_image"]',
      no_picture_file: '//*[@id="language_no_picture_image"]',
      is_rtl_button: '//*[@id="main-div"]//label[@for="language_is_rtl_%S"]',
      status_button: '//*[@id="main-div"]//label[@for="language_is_active_%S"]',
      save_button: '//*[@id="main-div"]//button[contains(text(),"Save")]',
      success_alert: '//*[@id="main-div"]//div[@class="alert-text"]/p',
      filter_name_input: '//*[@id="language_name"]',
      filter_search_button: '//*[@id="language_grid_table"]//button[contains(@name,"search")]',
      edit_button: '//*[@id="language_grid_table"]/tbody//a[@data-original-title="Edit"]',
      dropdown_button: '//*[@id="language_grid_table"]//a[@data-toggle="dropdown"]',
      delete_button: '//*[@id="language_grid_table"]//a[contains(@data-confirm-message,"Delete")]',
      reset_button: '//*[@id="language_grid_table"]//button[contains(@name,"reset")]',
      language_column: '//*[@id="language_grid_table"]//td[%ID]/a',
    },
    Currencies: {
      new_currency_button: '//*[@id="page-header-desc-currency-new_currency"] | //*[@id="page-header-desc-configuration-add"]',
      currency_select: '//*[@id="iso_code"] | //*[@id="currency_iso_code"]',
      exchange_rate_input: '//*[@id="conversion_rate"] | //*[@id="currency_exchange_rate"]',
      save_button: '//*[@id="currency_form_submit_btn"] | //*[@id="main-div"]//div[@class="card-footer"]//button',
      success_danger_panel: '//*[@id="main-div"]//div[contains(@class, "%B") and @role="alert"] //*[contains(@class,"alert-text")]/p',
      search_iso_code_input: '//*[@id="currency_iso_code"]',
      search_button: '//*[@id="submitFilterButtoncurrency"] | //*[@id="currency_grid_table"]//button',
      reset_button: '//*[@id="table-currency"]//button[@name="submitResetcurrency"] | //*[@id="currency_grid_table"]//button[@type="reset"]',
      currency_number_span: '//*[@id="currency_grid_panel"]//h3',
      currency_iso_code_column: '//*[@id="currency_grid_table"]//tbody/tr[%ID]/td[3]',
      sort_icon: '//*[@id="currency_grid_table"]//div[@data-sort-col-name="%B"]/span[@role="button"]',
      currency_exchange_rate: '//*[@id="currency_grid_table"]//tbody/tr[%ID]/td[4]',
      enabled_select: '//*[@id="currency_active"]',
      search_no_results: '//*[@id="currency_grid_table"]//tbody//td[1]//p[2]',
      check_icon: '//*[@id="currency_grid_table"]//tr[%ID]/td[5]//i[contains(@class,"%ICON")]',
      status_currency_toggle_button: '//*[@id="currencyStatus"] | //label[@for="currency_active_%ID"]',
      edit_button: '//*[@id="currency_grid_table"]//td[6]//a[contains(@href, "edit")]',
      cancel_button: '//*[@id="currency_form_cancel_btn"] | //*[@id="main-div"]//form[@name="currency"]//a',
      table_currencies: '//*[@id="table-currency"] | //*[@id="currency_grid_table"]',
      action_button: '//*[@id="currency_grid_table"]//a[contains(@class, "dropdown-toggle")]',
      delete_action_button: '//*[@id="currency_grid_table"]//a[contains(@data-confirm-message, "Delete selected")]',
      live_exchange_rate_toggle_button: '//label[@for="form_exchange_rates_live_exchange_rate_%ID"]',
      update_exchange_rate_button: '//*[@id="main-div"]//form[@name="exchange_rates"]//button'
    },
    Geolocation: {
      download_file_link: '//*[@id="main-div"]//a[contains(text(),"this file")]',
      ip_address_yes_label: '//label[@for="form_geolocation_by_id_address_geolocation_enabled_1"]',
      ip_address_no_label: '//label[@for="form_geolocation_by_id_address_geolocation_enabled_0"]',
      save_geolocation_ip_address_button: '(//*[@id="main-div"]//button[contains(text(),"Save")])[1]',
      alert_panel: '//*[@id="main-div"]//div[contains(@class, "%B") and @role="alert"]/div[@class="alert-text"]',
    }
  }
};