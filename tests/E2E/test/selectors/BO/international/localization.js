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
      save_configuration_btn: '(//*[@id="main-div"]//button[text()="Save"])[1]',
      language_browser_no_label: '//label[@for="form_configuration_detect_language_from_browser_0"]',
      country_browser_no_label: '//label[@for="form_configuration_detect_country_from_browser_0"]',
      language_browser_yes_label: '//label[@for="form_configuration_detect_language_from_browser_1"]',
      country_browser_yes_label: '//label[@for="form_configuration_detect_country_from_browser_1"]',
    },
    languages: {
      add_new_language_button: '//*[@id="page-header-desc-lang-new_language"]',
      name_input: '//*[@id="name"]',
      iso_code_input: '//*[@id="iso_code"]',
      language_code_input: '//*[@id="language_code"]',
      date_format_input: '//*[@id="date_format_lite"]',
      date_format_full_input: '//*[@id="date_format_full"]',
      flag_file: '//*[@id="flag"]',
      no_picture_file: '//*[@id="no_picture"]',
      is_rtl_button: '//*[@id="fieldset_0"]//label[@for="is_rtl_%S"]',
      status_button: '//*[@id="fieldset_0"]//label[@for="active_%S"]',
      save_button: '//*[@id="lang_form_submit_btn"]',
      success_alert: '(//div[contains(@class,"alert-success")])[1]',
      filter_name_input: '//*[@id="table-lang"]//input[@name="langFilter_name"]',
      filter_search_button: '//*[@id="submitFilterButtonlang"]',
      edit_button: '//*[@id="table-lang"]/tbody//a[@title="Edit"]',
      dropdown_button: '//*[@id="table-lang"]/tbody//button[@data-toggle="dropdown"]',
      delete_button: '//*[@id="table-lang"]/tbody//a[@title="Delete"]',
      reset_button: '//*[@id="table-lang"]//button[contains(@name, "Reset")]',
      language_column: '//*[@id="table-lang"]//td[%ID]',

    },
    Currencies: {
      new_currency_button: '//*[@id="page-header-desc-currency-new_currency"]',
      currency_select: '//*[@id="iso_code"]',
      exchange_rate_input: '//*[@id="conversion_rate"]',
      save_button: '//*[@id="currency_form_submit_btn"]',
      success_danger_panel: '//*[@id="content"]/div[@class="bootstrap"]/div[contains(@class, "%B")]',
      search_iso_code_input: '(//*[@id="table-currency"]//input[@name="currencyFilter_iso_code"])[1]',
      search_button: '//*[@id="submitFilterButtoncurrency"]',
      reset_button: '//*[@id="table-currency"]//button[@name="submitResetcurrency"]',
      column_iso_code: '//*[@id="table-currency"]//td[3]',
      enable_icon: '//*[@id="table-currency"]//td[5]/a',
      currency_number_span: '//*[@id="form-currency"]//span[@class="badge"]',
      currency_iso_code_column: '//*[@id="table-currency"]//tbody/tr[%ID]/td[3]',
      sort_icon: '//*[@id="table-currency"]//span[contains(text(),"%B")]/a[%W]',
      currency_exchange_rate: '//*[@id="table-currency"]//tbody/tr[%ID]/td[4]',
      enabled_select: '//*[@id="table-currency"]//select[@name="currencyFilter_active"]',
      search_no_results: '//*[@id="table-currency"]//td[@class="list-empty"]',
      check_icon: '//*[@id="table-currency"]//tr[%ID]/td[5]/a/i[@class="%ICON"]',
      status_currency_toggle_button: '//*[@id="currencyStatus"]',
      column_exchange_rate: '//*[@id="table-currency"]//td[4]',
      edit_button: '//*[@id="table-currency"]//td[6]//a[contains(@class, "edit")]',
      cancel_button: '//*[@id="currency_form_cancel_btn"]',
      table_currencies: '//*[@id="table-currency"]',
      action_button: '//*[@id="table-currency"]//div[contains(@class, "pull-right")]/button[contains(@class, "dropdown-toggle")]',
      delete_action_button: '//*[@id="form-currency"]//a[contains(@onclick, "Delete selected")]',
      live_exchange_rate_toggle_button: '//*[@id="currencyCronjobLiveExchangeRate"]//div[contains(@class, "checkbox titatoggl")]',
      update_exchange_rate_button: '//*[@id="currency_form"]/button[@name="SubmitExchangesRates"]'
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
