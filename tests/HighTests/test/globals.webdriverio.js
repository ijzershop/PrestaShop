'use strict';
var common = require('./common.webdriverio.js');
var path = require('path');
var should = require('should');
var argv = require('minimist')(process.argv.slice(2));

global.date_time = new Date().getTime();
global.URL = argv.URL;
global.module_tech_name = argv.MODULE;
global.saucelabs = argv.SAUCELABS;
global.selenium_url = argv.SELENIUM;
global._projectdir = path.join(__dirname, '..', '..');
global.new_customer_email = 'pub' + date_time + '@prestashop.com';
global.categoryImage = path.join(__dirname, '', 'datas', 'category_image.png');
global.categoryThumb = path.join(__dirname, '', 'datas', 'category_miniature.png');
global.brandsImage = path.join(__dirname, '', 'datas', 'prestashop.png');

module.exports = {
  selector: {
    //Installation selector
    InstallationWizardPage: {
      language_select: '//*[@id="langList"]',
      next_step_button: '//*[@id="btNext"]',
      agree_checkbox: '//*[@id="set_license"]',
      test_result_compatibility_green_block: '//*[@id="sheet_"]/h3',
      shop_name_input: '//*[@id="infosShop"]',
      country_select: '//*[@id="infosCountry_chosen"]',
      country_france_option: '//*[@id="infosCountry_chosen"]/div/ul/li[2]',
      first_name_input: '//*[@id="infosFirstname"]',
      last_name_input: '//*[@id="infosName"]',
      email_address_input: '//*[@id="infosEmail"]',
      shop_password_input: '//*[@id="infosPassword"]',
      retype_password_input: '//*[@id="infosPasswordRepeat"]',
      database_address_input: '//*[@id="dbServer"]',
      database_name_input: '//*[@id="dbName"]',
      database_login_input: '//*[@id="dbLogin"]',
      database_password_input: '//*[@id="dbPassword"]',
      test_conection_button: '#btTestDB',
      dbResultCheck_green_block: '//*[@id="dbResultCheck"]',
      create_file_parameter_step: '//li[@id="process_step_generateSettingsFile" and @class="process_step success"]',
      create_database_step: '//li[@id="process_step_installDatabase" and @class="process_step success"]',
      create_default_shop_step: '//li[@id="process_step_installDefaultData" and @class="process_step success"]',
      create_database_table_step: '//li[@id="process_step_populateDatabase" and @class="process_step success"]',
      create_shop_informations_step: '//li[@id="process_step_configureShop" and @class="process_step success"]',
      create_demonstration_data_step: '//li[@id="process_step_installFixtures" and @class="process_step success"]',
      install_module_step: '//li[@id="process_step_installModules" and @class="process_step success"]',
      install_addons_modules_step: '//li[@id="process_step_installModulesAddons" and @class="process_step success"]',
      install_theme_step: '//li[@id="process_step_installTheme" and @class="process_step success"]',
      finish_step: '//*[@id="install_process_success"]/div[1]/h2'
    },

    BO: {
      // Back office login page selector
      AccessPage: {
        login_input: '#email',
        password_input: '#passwd',
        login_button: '[name="submitLogin"]'
      },
      //Product selector
      AddProductPage: {
        exit_welcome_button: '[class="btn btn-tertiary-outline btn-lg onboarding-button-shut-down"]',
        click_outside: '//*[@id="product_catalog_list"]/div[2]/div/table/thead/tr[1]/th[3]',
        logout: '#header_logout',
        products_subtab: '#subtab-AdminCatalog',
        go_to_catalog_button: '#form > div.product-footer > div.text-lg-right > div > div.dropdown-menu > a.dropdown-item.go-catalog.js-btn-save',
        more_option_button: '.btn.btn-primary.dropdown-toggle',
        new_product_button: '#page-header-desc-configuration-add',
        menu: '#nav-sidebar',
        product_name_input: '#form_step1_name_1',
        save_product_button: '//*[@id="form"]/div[4]/div[2]/div/button[1]',
        green_validation_notice: '[class="growl growl-notice growl-medium"]',
        close_validation_button: '.growl-close',
        validation_msg: '//*[@id="growls"]/div/div[3]',
        red_validation_notice: '[class="growl growl-error growl-medium"]',
        description_tab: '[href="#description"]',
        price_te_shortcut_input: '#form_step1_price_shortcut',
        quantity_shortcut_input: '#form_step1_qty_0_shortcut',
        picture: '[class="dz-hidden-input"]',
        picture_cover: '.iscover',
        product_online_toggle: '.switch-input ',
        catalogue_filter_by_name_input: '//input[@name="filter_column_name"]',
        catalogue_submit_filter_button: '//button[@name="products_filter_submit"]',
        variations_type_button: '//*[@id="show_variations_selector"]/div[2]/label/input',
        variations_tab: '//*[@id="tab_step3"]/a',
        variations_input: '//*[@id="form_step3_attributes-tokenfield"]',
        variations_generate: '//*[@id="create-combinations"]',
        variations_select: '//*[@id="attributes-generator"]/div[2]/div[1]/fieldset/div/span/div/div/div',
        var_selected: '//*[@id="toggle-all-combinations"]',
        var_selected_quantitie: '//*[@id="product_combination_bulk_quantity"]',
        save_quantitie_button: '//*[@id="apply-on-combinations"]',
        add_feature_to_product_button: '//*[@id="add_feature_button"]',
        feature_select: '//*[@id="features-content"]/div/div/div[1]/fieldset/span/span[1]/span',
        select_feature_created: '/html/body/span[4]/span/span[1]/input',
        feature_select_button:'//*[@id="features-content"]/div/div/div[1]/fieldset/span/span[1]/span',
        add_summary_textarea_button:'//*[@id="form_step1_description_short"]/div/div/div/div/div[1]/div/div/div/div/div/div[1]/button',
        add_summary_textarea:'/html/body/div[7]/div[2]/div[2]/div/textarea',
        save_summary_button:'/html/body/div[7]/div[3]/div/div[2]/button',
        tab_description:'//*[@id="tab_description"]/a',
        feature_value_select:'//*[@id="form_step1_features_0_value"]',
        product_create_category_btn: '//*[@id="add-category-button"]',
        product_type: '#form_step1_type_product',
        product_category_name_input: '//*[@id="form_step1_new_category_name"]',
        category_create_btn: '//*[@id="form_step1_new_category_save"]',
        category_home: '//*[@id="form_step1_categories"]/ul/li/div/label/input',
        product_add_brand_btn: '//*[@id="add_brand_button"]',
        product_brand_select: '//*[@id="manufacturer-content"]/div/div[1]/fieldset/span',
        product_brand_select_option: '//*[@id="select2-form_step1_id_manufacturer-results"]/li[2]',
        search_product_pack: '//*[@id="form_step1_inputPackItems"]',
        product_item_pack: '//*[@id="js_form_step1_inputPackItems"]/div/div[1]/span/div/div/div[1]/table/tbody/tr[1]',
        product_pack_item_quantity: '//*[@id="form_step1_inputPackItems-curPackItemQty"]',
        product_pack_add_button: '//*[@id="form_step1_inputPackItems-curPackItemAdd"]',
        add_related_product_btn: '//*[@id="add-related-product-button"]',
        search_add_related_product_input: '//*[@id="form_step1_related_products"]',
        related_product_item: '//*[@id="related-content"]/div[2]/fieldset/div/div[1]/span/div/div/div[1]',
        product_add_feature_btn: '//*[@id="add_feature_button"]',
        feature_select2: '//*[@id="features-content"]/div/div[2]/div[1]/fieldset/span/span[1]/span',
        feature_select3: '//*[@id="features-content"]/div/div[3]/div[1]/fieldset/span/span[1]/span',
        feature_select4: '//*[@id="features-content"]/div/div[4]/div[1]/fieldset/span/span[1]/span',
        feature_select5: '//*[@id="features-content"]/div/div[5]/div[1]/fieldset/span/span[1]/span',
        feature_select6: '//*[@id="features-content"]/div/div[6]/div[1]/fieldset/span/span[1]/span',
        feature_select7: '//*[@id="features-content"]/div/div[7]/div[1]/fieldset/span/span[1]/span',
        feature_select_option_height: '//*[@id="select2-form_step1_features_0_feature-results"]/li[2]',
        feature_custom_value_height: '//*[@id="form_step1_features_0_custom_value_1"]',
        priceTE_shortcut: '#form_step1_price_shortcut',
        product_reference: '//*[@id="form_step6_reference"]',
        product_quantities_tab: '//*[@id="tab_step3"]/a',
        product_quantity_input: '//*[@id="form_step3_qty_0"]',
        minimum_quantity_sale: '//*[@id="form_step3_minimal_quantity"]',
        pack_stock_type: '//*[@id="form_step3_pack_stock_type"]',
        virtual_associated_file: '#form_step3_virtual_product_is_virtual_file_0',
        virtual_select_file : '#form_step3_virtual_product_file',
        virtual_file_name: '#form_step3_virtual_product_name',
        virtual_file_number_download: '#form_step3_virtual_product_nb_downloadable',
        virtual_expiration_file_date: '#form_step3_virtual_product_expiration_date',
        virtual_number_days: '#form_step3_virtual_product_nb_days',
        virtual_save_attached_file: '#form_step3_virtual_product_save',
        pack_availability_preferences: '//*[@id="form_step3_out_of_stock_0"]',
        pack_label_in_stock: '//*[@id="form_step3_available_now_1"]',
        pack_label_out_stock: '//*[@id="form_step3_available_later_1"]',
        pack_availability_date: '//*[@id="form_step3_available_date"]',
        pack_unit_price: '//*[@id="form_step2_unit_price"]',
        product_shipping_tab: '//*[@id="tab_step4"]/a',
        shipping_width: '//*[@id="form_step4_width"]',
        shipping_height: '//*[@id="form_step4_height"]',
        shipping_depth: '//*[@id="form_step4_depth"]',
        shipping_weight: '//*[@id="form_step4_weight"]',
        shipping_fees: '//*[@id="form_step4_additional_shipping_cost"]',
        shipping_available_carriers: '//*[@id="form_step4_selectedCarriers_1"]',
        product_combinations_tab: '//*[@id="tab_step3"]/a',
        product_combinations: '//*[@id="show_variations_selector"]/div[2]/label/input',
        combination_size_s: '//*[@id="attribute-group-1"]/div/div[1]/label',
        combination_size_m: '//*[@id="attribute-group-1"]/div/div[2]/label',
        combination_color_gray: '//*[@id="attribute-group-3"]/div/div[1]/label',
        combination_color_beige: '//*[@id="attribute-group-3"]/div/div[3]/label',
        combination_generate_button: '//*[@id="create-combinations"]',
        combination_availability_preferences: '//*[@id="form_step3_out_of_stock_0"]',
        combination_label_in_stock: '//*[@id="form_step3_available_now_1"]',
        combination_label_out_stock: '//*[@id="form_step3_available_later_1"]',
        combination_panel:'//*[@id="accordion_combinations"]/tr[%NUMBER]',
        combination_quantity:'//*[@id="combination_%NUMBER_attribute_quantity"]',
        combination_available_date:'//*[@id="combination_%NUMBER_available_date_attribute"]',
        combination_min_quantity:'//*[@id="combination_%NUMBER_attribute_minimal_quantity"]',
        combination_reference:'//*[@id="combination_%NUMBER_attribute_reference"]',
        combination_whole_sale:'//*[@id="combination_%NUMBER_attribute_wholesale_price"]',
        combination_low_stock:'//*[@id="combination_%NUMBER_attribute_low_stock_threshold"]',
        combination_priceTI:'//*[@id="combination_%NUMBER_attribute_priceTI"]',
        combination_attribute_unity:'//*[@id="combination_%NUMBER_attribute_unity"]',
        combination_attribute_weight:'//*[@id="combination_%NUMBER_attribute_weight"]',
        combination_attribute_isbn:'//*[@id="combination_%NUMBER_attribute_isbn"]',
        combination_attribute_ean13:'//*[@id="combination_%NUMBER_attribute_ean13"]',
        combination_attribut_upc:'//*[@id="combination_%NUMBER_attribute_upc"]',
        combination_edit:'//*[@id="attribute_%NUMBER"]/td[7]/div[1]/a',
        back_to_product:'//*[@id="combination_form_%NUMBER"]/div[2]/div[1]/button',
        product_pricing_tab: '//*[@id="tab_step2"]/a',
        unit_price:'#form_step2_unit_price',
        unity:'#form_step2_unity',
        pricing_tax_rule_select: '//*[@id="step2"]/div/div/div/div/div[3]/div/div[1]/span',
        pricing_wholesale: '//*[@id="form_step2_wholesale_price"]',
        pricing_first_priorities_select: '//*[@id="form_step2_specificPricePriority_0"]',
        pricing_second_priorities_select: '//*[@id="form_step2_specificPricePriority_1"]',
        pricing_third_priorities_select: '//*[@id="form_step2_specificPricePriority_2"]',
        pricing_fourth_priorities_select: '//*[@id="form_step2_specificPricePriority_3"]',
        product_SEO_tab: '//*[@id="tab_step5"]/a',
        SEO_meta_title: '//*[@id="form_step5_meta_title_1"]',
        SEO_meta_description: '//*[@id="form_step5_meta_description_1"]',
        SEO_friendly_url: '//*[@id="form_step5_link_rewrite_1"]',
        product_options_tab: '//*[@id="tab_step6"]/a',
        options_visibility: '//*[@id="form_step6_visibility"]',
        options_online_only: '//*[@id="form_step6_display_options_online_only"]',
        options_condition_select: '//*[@id="form_step6_condition"]',
        options_isbn: '//*[@id="form_step6_isbn"]',
        options_ean13: '//*[@id="form_step6_ean13"]',
        options_upc: '//*[@id="form_step6_upc"]',
        options_add_customization_field_button: '//*[@id="custom_fields"]/a',
        options_first_custom_field_label: '//*[@id="form_step6_custom_fields_0_label_1"]',
        options_first_custom_field_type: '//*[@id="form_step6_custom_fields_0_type"]/option[1]',
        options_first_custom_field_require: '//*[@id="form_step6_custom_fields_0_require"]',
        options_second_custom_field_label: '//*[@id="form_step6_custom_fields_1_label_1"]',
        options_second_custom_field_type: '//*[@id="form_step6_custom_fields_1_type"]',
        options_add_new_file_button: '//*[@id="step6"]/div/div/div/div/div/div[11]/div/a',
        options_select_file: '//*[@id="form_step6_attachment_product_file"]',
        options_file_name: '//*[@id="form_step6_attachment_product_name"]',
        options_file_description: '//*[@id="form_step6_attachment_product_description"]',
        options_file_add_button: '//*[@id="form_step6_attachment_product_add"]',
        options_file_checkbox: '//*[@id="form_step6_attachments_0"]',
        options_choose_supplier: '//*[@id="form_step6_suppliers_0"]',
        catalog_product_name: '//*[@id="product_catalog_list"]/div[2]/div/table/tbody/tr/td[3]/a',
        catalog_product_reference: '//*[@id="product_catalog_list"]/div[2]/div/table/tbody/tr/td[4]',
        catalog_product_category: '//*[@id="product_catalog_list"]/div[2]/div/table/tbody/tr/td[5]',
        catalog_product_price: '//*[@id="product_catalog_list"]/div[2]/div/table/tbody/tr/td[6]',
        catalog_product_quantity: '//*[@id="product_catalog_list"]/div[2]/div/table/tbody/tr/td[7]',
        catalog_product_online: '//*[@id="product_catalog_list"]/div[2]/div/table/tbody/tr/td[8]/a/i',
        catalog_reset_filter: '//*[@id="product_catalog_list"]/div[2]/div/table/thead/tr[2]/th[9]/button[2]',
        catalog_home:'//*[@id="form_step1_categories"]/ul/li/div/label',
        catalog_first_element_radio:'//*[@id="form_step1_categories"]/ul/li/ul/li[1]/div',
        catalog_second_element_radio:'//*[@id="form_step1_categories"]/ul/li/ul/li[1]/ul/li[1]/div',
        catalog_third_element_radio:'//*[@id="form_step1_categories"]/ul/li/ul/li[1]/ul/li[2]/div',
      },
      ProductList:{
        first_product_id:'//*[@id="product_catalog_list"]/div[2]/div/table/tbody/tr[1]/td[1]/div/label',
        second_product_id:'//*[@id="product_catalog_list"]/div[2]/div/table/tbody/tr[2]/td[1]/div/label',
        third_product_id:'//*[@id="product_catalog_list"]/div[2]/div/table/tbody/tr[3]/td[1]/div/label',

      },
      //catalog selector
      CatalogPage: {
        menu_button: '//*[@id="subtab-AdminCatalog"]/a',
        success_panel: '//*[@id="content"]/div[3]/div',
        select_all_product_button: '//*[@id="bulk_action_select_all"]',
        action_group_button: '//*[@id="product_bulk_menu"]',
        disable_all_selected: '//*[@id="main-div"]/div[3]/div/div/div[2]/div/div[2]/div[2]/div/div/a[2]',
        enable_all_selected: '//*[@id="main-div"]/div[3]/div/div/div[2]/div/div[2]/div[2]/div/div/a[1]',
        succes_panel_all_item: '//*[@id="main-div"]/div[3]/div/div/div[2]',
        succes_panel_all_item_message: '//*[@id="main-div"]/div[3]/div/div/div[2]/ul/li',
        etat_first_product: '//*[@id="product_catalog_list"]/div[2]/div/table/tbody/tr[1]/td[8]/a/i',
        etat_last_product: '//*[@id="product_catalog_list"]/div[2]/div/table/tbody/tr[8]/td[8]/a/i',
        duplicate_button: '//*[@id="main-div"]/div[3]/div/div/div[2]/div/div[2]/div[2]/div/div/a[3]',
        CategorySubmenu: {
          submenu: '//*[@id="subtab-AdminCategories"]/a',
          new_category_button: '//*[@id="page-header-desc-category-new_category"]/div',
          name_input: '//*[@id="name_1"]',
          description_textarea: 'textarea#description_1',
          picture: '//*[@id="image"]',
          thumb_picture: '//*[@id="thumb"]',
          title: '//*[@id="meta_title_1"]',
          meta_description: '//*[@id="meta_description_1"]',
          keyswords: '//*[@id="fieldset_0"]/div[2]/div[10]/div/div/div[1]/div[1]/div/input',
          simplify_URL_input: '//*[@id="link_rewrite_1"]',
          save_button: '//*[@id="category_form_submit_btn"]',
          name_search_input: '//*[@id="table-category"]/thead/tr[2]/th[3]/input',
          search_button: '//*[@id="submitFilterButtoncategory"]',
          search_result: '//*[@id="table-category"]/tbody/tr/td[3]',
          update_button: '//*[@id="table-category"]/tbody/tr/td[7]/div/div',
          action_button: '//*[@id="table-category"]/tbody/tr/td[7]/div/div/button',
          delete_button: '//*[@id="table-category"]/tbody/tr/td[7]/div/div/ul/li[2]/a',
          image_link: '//*[@id="image-images-thumbnails"]/div/img',
          thumb_link: '//*[@id="thumb-images-thumbnails"]/div/img',
          second_delete_button: '//*[@id="content"]/div[5]/div/div[2]/div/form/div[5]/button[2]',
          select_category: '//*[@id="table-category"]/tbody/tr/td[1]/input',
          action_group_button: '//*[@id="form-category"]/div/div[3]/div/div/button',
          delete_action_group_button: '//*[@id="form-category"]/div/div[3]/div/div/ul/li[7]/a'
        },
        AttributeSubmenu: {
          submenu: '//*[@id="subtab-AdminParentAttributesGroups"]/a',
          add_new_attribute: '//*[@id="page-header-desc-attribute_group-new_attribute_group"]',
          name_input: '//*[@id="name_1"]',
          public_name_input: '//*[@id="public_name_1"]',
          type_select: '//*[@id="group_type"]',
          save_button: '//*[@id="attribute_group_form_submit_btn"]',
          search_input: '//*[@id="table-attribute_group"]/thead/tr[2]/th[3]/input',
          search_button: '//*[@id="submitFilterButtonattribute_group"]',
          selected_attribute: '//*[@id="table-attribute_group"]/tbody/tr/td[3]',
          add_value_button: '//*[@id="page-header-desc-attribute-new_value"]',
          save_and_add: '//*[@id="fieldset_0"]/div[3]/button[2]',
          save: '//*[@id="attribute_form_submit_btn"]',
          value_input: '//*[@id="name_1"]',
          value_action_group_button: '//*[@id="table-attribute"]/tbody/tr[1]/td[5]/div/div/button',
          delete_value_button: '//*[@id="table-attribute"]/tbody/tr[1]/td[5]/div/div/ul/li/a',
          group_action_button: '//*[@id="table-attribute_group"]/tbody/tr/td[6]/div/div/button',
          delete_attribut_button: '//*[@id="table-attribute_group"]/tbody/tr/td[6]/div/div/ul/li[3]/a',
          update_button: '//*[@id="table-attribute_group"]/tbody/tr/td[6]/div/div/ul/li[1]/a',
          update_value_button: '//*[@id="table-attribute"]/tbody/tr[1]/td[5]/div/div/a'
        },
        FeatureSubmenu: {
          tabmenu: '//*[@id="content"]/div[1]/div/div[2]/a[2]',
          add_new_feature: '//*[@id="page-header-desc-feature-new_feature"]/div',
          name_input: '//*[@id="name_1"]',
          save_button: '//*[@id="feature_form_submit_btn"]',
          search_input: '//*[@id="table-feature"]/thead/tr[2]/th[3]/input',
          search_button: '//*[@id="submitFilterButtonfeature"]',
          selected_feature: '//*[@id="table-feature"]/tbody/tr/td[6]/div/div/a',
          add_value_button: '//*[@id="page-header-desc-feature_value-new_feature_value"]',
          value_input: '//*[@id="value_1"]',
          save_value_button: '//*[@id="feature_value_form_submit_btn"]',
          select_option: '//*[@id="table-feature"]/tbody/tr/td[6]/div/div/button',
          update_feature_button: '//*[@id="table-feature"]/tbody/tr/td[6]/div/div/ul/li[1]/a',
          update_feature_value_button: '//*[@id="table-feature_value"]/tbody/tr/td[3]/div/div/a',
          delete_feature: '//*[@id="table-feature"]/tbody/tr/td[6]/div/div/ul/li[3]/a',
          public_name_input: '//*[@id="public_name_1"]',
          type_select: '//*[@id="group_type"]',
          selected_attribute: '//*[@id="table-attribute_group"]/tbody/tr/td[3]',
          save_and_add: '//*[@id="fieldset_0"]/div[3]/button[2]',
          save: '//*[@id="attribute_form_submit_btn"]',
          value_action_group_button: '//*[@id="table-attribute"]/tbody/tr[1]/td[5]/div/div/button',
          delete_value_button: '//*[@id="table-attribute"]/tbody/tr[1]/td[5]/div/div/ul/li/a',
          group_action_button: '//*[@id="table-attribute_group"]/tbody/tr/td[6]/div/div/button',
          delete_attribut_button: '//*[@id="table-attribute_group"]/tbody/tr/td[6]/div/div/ul/li[3]/a',
          update_button: '//*[@id="table-attribute_group"]/tbody/tr/td[6]/div/div/ul/li[1]/a',
          update_value_button: '//*[@id="table-attribute"]/tbody/tr[1]/td[5]/div/div/a'
        },
        Manufacturers: {
          submenu: '//*[@id="subtab-AdminParentManufacturers"]/a',
          Brands: {
            new_brand_button: '//*[@id="page-header-desc-address-new_manufacturer"]',
            name_input: '//*[@id="name"]',
            short_desc_textarea: '//*[@id="manufacturer_form"]/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/button',
            short_desc_source_code_modal: '/html/body/div[5]/div[2]/div[2]/div/textarea',
            short_desc_source_code_modal_confirmation: '/html/body/div[5]/div[3]/div/div[2]/button',
            desc_textarea: '//*[@id="manufacturer_form"]/div/div[2]/div[3]/div/div/div/div[1]/div/div/div/div/div/div[1]/button',
            image_input: '//*[@id="logo"]',
            meta_title_input: '//*[@id="meta_title_1"]',
            meta_description_input: '//*[@id="meta_description_1"]',
            meta_keywords_input:'//*[@id="fieldset_0"]/div[2]/div[7]/div/div/div[1]/div[1]/div/input',   // '//*[@id="manufacturer_form"]/div/div[2]/div[7]/div/div/input',
            active_button: '//*[@id="manufacturer_form"]/div/div[2]/div[8]/div/span/label[1]',
            save_button: '//*[@id="manufacturer_form_submit_btn"]',
          },
          BrandsAddress: {
            new_brand_address_button: '//*[@id="page-header-desc-address-new_manufacturer_address"]',
            branch_select: '//*[@id="id_manufacturer"]',
            last_name_input: '//*[@id="lastname"]',
            first_name_input: '//*[@id="firstname"]',
            address_input: '//*[@id="address1"]',
            secondary_address: '//*[@id="address2"]',
            postal_code_input: '//*[@id="postcode"]',
            city_input: '//*[@id="city"]',
            country: '//*[@id="id_country"]',
            phone_input: '//*[@id="phone"]',
            other_input: '//*[@id="other"]',
            save_button: '//*[@id="address_form_submit_btn"]'
          },
        },
        StockSubmenu: {
          Stock: {
            submenu: '//*[@id="collapse-9"]/li[8]/a',
            tabs: '//*[@id="tab"]/li[1]/a',
            first_product_quantity_input: '//*[@id="app"]/div[4]/section/table/tbody/tr[1]/td[8]/form/div/input',
            first_product_quantity: '//*[@id="app"]/div[4]/section/table/tbody/tr[1]/td[7]',
            first_product_quantity_modified: '//*[@id="app"]/div[4]/section/table/tbody/tr[1]/td[7]/span',
            second_product_quantity_input: '//*[@id="app"]/div[4]/section/table/tbody/tr[2]/td[8]/form/div/input',
            second_product_quantity: '//*[@id="app"]/div[4]/section/table/tbody/tr[2]/td[7]',
            second_product_quantity_modified: '//*[@id="app"]/div[4]/section/table/tbody/tr[2]/td[7]/span',
            third_product_quantity_input: '//*[@id="app"]/div[4]/section/table/tbody/tr[3]/td[8]/form/div/input',
            third_product_quantity: '//*[@id="app"]/div[4]/section/table/tbody/tr[3]/td[7]',
            third_product_quantity_modified: '//*[@id="app"]/div[4]/section/table/tbody/tr[3]/td[7]/span',
            save_third_product_quantity_button: '//*[@id="app"]/div[4]/section/table/tbody/tr[3]/td[8]/form/button',
            fourth_product_quantity_input: '//*[@id="app"]/div[4]/section/table/tbody/tr[4]/td[8]/form/div/input',
            fourth_product_quantity: '//*[@id="app"]/div[4]/section/table/tbody/tr[4]/td[7]',
            fourth_product_quantity_modified: '//*[@id="app"]/div[4]/section/table/tbody/tr[4]/td[7]/span',
            save_fourth_product_quantity_button: '//*[@id="app"]/div[4]/section/table/tbody/tr[4]/td[8]/form/button',
            group_apply_button: '//*[@id="app"]/div[4]/section/div/div[2]/button',
            add_quantity_button: '//*[@id="app"]/div[4]/section/table/tbody/tr[3]/td[8]/form/div/div/span[1]',
            remove_quantity_button: '//*[@id="app"]/div[4]/section/table/tbody/tr[4]/td[8]/form/div/div/span[2]',
            success_panel: '//*[@id="growls"]',
          },
          Movements: {
            tabs: '//*[@id="tab"]/li[2]/a',
            variation: '//*[@id="app"]/div[3]/section/table/tbody/tr[1]/td[4]/span/span'
          }
        }
      },
      //Customers
      Customers: {
        Customer: {
          customer_menu: '//*[@id="subtab-AdminParentCustomer"]/a',
          new_customer_button: '//*[@id="page-header-desc-customer-new_customer"]',
          social_title_button: '//*[@id="gender_1"]',
          first_name_input: '//*[@id="firstname"]',
          last_name_input: '//*[@id="lastname"]',
          email_address_input: '//*[@id="email"]',
          password_input: '//*[@id="passwd"]',
          days_select: '//*[@id="fieldset_0"]/div[2]/div[6]/div/div/div[1]/select',
          month_select: '//*[@id="fieldset_0"]/div[2]/div[6]/div/div/div[2]/select',
          years_select: '//*[@id="fieldset_0"]/div[2]/div[6]/div/div/div[3]/select',
          save_button: '//*[@id="customer_form_submit_btn"]'
        },
        addresses: {
          addresses_menu: '//*[@id="subtab-AdminAddresses"]/a',
          new_address_button:'//*[@id="page-header-desc-address-new_address"]',
          email_input: '//*[@id="email"]',
          id_number_input: '//*[@id="dni"]',
          address_alias_input: '//*[@id="alias"]',
          first_name_input: '//*[@id="firstname"]',
          last_name_input: '//*[@id="lastname"]',
          company: '//*[@id="company"]',
          VAT_number_input: '//*[@id="vat_number"]',
          address_input: '//*[@id="address1"]',
          address_second_input: '//*[@id="address2"]',
          zip_code_input: '//*[@id="postcode"]',
          city_input: '//*[@id="city"]',
          country_input: '//*[@id="id_country"]',
          phone_input: '//*[@id="phone"]',
          other_input: '//*[@id="other"]',
          save_button:'//*[@id="address_form_submit_btn"]'
        }
      },
      //Order selector
      OrderPage: {
        orders_subtab: '#subtab-AdminParentOrders',
        form: '#form-order',
        order_product_name_span: '.productName',
        order_product_quantity_span: '.product_quantity_show',
        order_product_total: '#total_order > td.amount.text-right.nowrap',
        order_reference_span: '((//div[@class="panel-heading"])[1]/span)[1]',
        first_order: '//*[@id="form-order"]/div/div[2]/table/tbody/tr[1]/td[12]/div/a',
        order_state_select: '//*[@id="id_order_state"]',
        update_status_button: '//*[@id="status"]/form/div/div[2]/button',
        order_quantity: '//*[@id="orderProducts"]/tbody/tr[1]/td[4]/span[1]'
      },
      //Module selector
      ModulePage: {
        modules_subtab: '#subtab-AdminParentModulesSf',
        search_input: 'div.pstaggerAddTagWrapper > input',
        search_button: '.btn.btn-primary.pull-right.search-button',
        page_loaded: '.module-search-result-wording',
        installed_modules_tabs: '(//div[@class="page-head-tabs"]/a)[2]',
        module_number_span: '[class="module-sorting-search-wording"]',
        module_tech_name: '//div[@data-tech-name="' + module_tech_name + '" and not(@style)]',
        install_module_btn: '//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//button[@data-confirm_modal="module-modal-confirm-' + module_tech_name + '-install"]',
        uninstall_module_list: '//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//button[@class="btn btn-primary-outline  dropdown-toggle"]',
        uninstall_module_btn: '//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//button[@class="dropdown-item module_action_menu_uninstall"]',
        modal_confirm_uninstall: '//*[@id="module-modal-confirm-' + module_tech_name + '-uninstall" and @class="modal modal-vcenter fade in"]//a[@class="btn btn-primary uppercase module_action_modal_uninstall"]'
      },
      // Popup - boutique Onboarding selector
      Onboarding: {
        popup: '.onboarding-popup',
        popup_close_button: '.onboarding-button-shut-down',
        stop_button: '.onboarding-button-stop'
      }
    },

    //FO
    FO: {
      common:{
        language_selector:'//*[@id="_desktop_language_selector"]/div/div/button',
        language_EN:'//*[@id="_desktop_language_selector"]/div/div/ul/li[1]/a',
        language_FR:'//*[@id="_desktop_language_selector"]/div/div/ul/li[2]/a'
      },
      //Access page selector
      AccessPage: {
        sign_in_button: 'div.user-info > a',
        login_input: '//*[@id="login-form"]/section/div[1]/div[1]/input',
        password_input: '//*[@id="login-form"]/section/div[2]/div[1]/div/input',
        login_button: '//*[@id="login-form"]/footer/button',
        sign_out_button: '.logout',
        logo_home_page: '.logo.img-responsive',
        product_list_button: '//*[@id="content"]/section/a'
      },
      //Account page selector
      AddAccountPage: {
        create_button: '[data-link-action="display-register-form"]',
        firstname_input: '[name="firstname"]',
        lastname_input: '[name="lastname"]',
        email_input: '[name="email"]',
        password_input: '[name="password"]',
        save_account_button: '[data-link-action="save-customer"]'
      },
      //Order Pages selector
      BuyOrderPage: {
        first_product_home_page: '.thumbnail.product-thumbnail',
        add_to_cart_button: '.btn.btn-primary.add-to-cart',
        first_product_home_page_name: '[itemprop="name"]',
        product_image: '#content',
        product_name_details: '[itemprop="name"]',
        product_price_details: '[itemprop="price"]',
        product_quantity_details: '#quantity_wanted',
        product_name: '(//div[@class="product-line-info"])[1]/a',
        product_price: '//span[@class="price"]',
        proceed_to_checkout_button: '//*[@id="main"]/div/div[2]/div[1]/div[2]/div/a',
        checkout_step2_continue_button: '//*[@id="checkout-addresses-step"]/div/div/form/div[2]/button',
        checkout_step3_continue_button: '//*[@id="js-delivery"]/button',
        checkout_step4_payment_radio: '//*[@id="payment-option-2"]',
        checkout_step4_cgv_checkbox: '//input[@id="conditions_to_approve[terms-and-conditions]"]',
        checkout_step4_order_button: '#payment-confirmation >div > button',
        checkout_total: '//div[@class="cart-summary-line cart-total"]/span[2]',
        order_confirmation_name: '#order-items > div > div > div.col-sm-4.col-xs-9.details > span',
        order_confirmation_price1: '#order-items > div > table > tbody > tr:nth-child(1) > td:nth-child(2)',
        order_confirmation_price2: '#content-hook_payment_return > div > div > div > dl > dd:nth-child(2)',
        order_confirmation_ref: '(//div[@id="order-details"]/ul/li)[1]'
      },
      //cart Pages selector
      LayerCartPage: {
        layer_cart: '//div[@id="blockcart-modal" and @style="display: block;"]',
        name_details: '//div[@id="blockcart-modal"]/div/div/div[2]/div/div[1]/div/div[2]/h6',
        price_details: '//div[@id="blockcart-modal"]/div/div/div[2]/div/div[1]/div/div[2]/p[1]',
        quantity_details: '//div[@id="blockcart-modal"]/div/div/div[2]/div/div[1]/div/div[2]/p[2]',
        command_button: '//*[@id="blockcart-modal"]/div/div/div[2]/div/div[2]/div/div/a'
      },
      //Search selector
      SearchProductPage: {
        category_list: '//*[@id="left-column"]/div[1]/ul/li[2]/ul/li',
        second_category_name: '//*[@id="left-column"]/div[1]/ul/li[2]/ul/li[2]/a',
        product_search_input: '.ui-autocomplete-input',
        product_search_button: '.material-icons.search',
        product_result_name: '.h3.product-title > a',
        product_result_price: '[itemprop="price"]',
        attribut_name: '//*[@id="add-to-cart-or-refresh"]/div[1]/div/span',
        feature_name: '//*[@id="product-details"]/section/dl/dt',
        feature_value: '//*[@id="product-details"]/section/dl/dd',
        attribut_value_1: '//*[@id="add-to-cart-or-refresh"]/div[1]/div/ul/li[1]/label/span',
        attribut_value_2: '//*[@id="add-to-cart-or-refresh"]/div[1]/div/ul/li[2]/label/span',
        attribut_value_3: '//*[@id="add-to-cart-or-refresh"]/div[1]/div/ul/li[3]/label/span'
     },
      //product page
      ProductPage: {
        title: '//*[@id="main"]/div[1]/div[2]/h1'
      }
    }

  },
  shouldExist: function (err, existing) {
    should(err).be.not.defined;
    should(existing).be.true;
  }
};
