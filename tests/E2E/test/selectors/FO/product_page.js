module.exports = {
  productPage: {
    first_product: '(//*[@id="content"]//h3[@itemprop="name"])[1]',
    first_product_size: '//*[@id="group_1"]',
    first_product_quantity: '//*[@id="quantity_wanted"]',
    first_product_color: '//*[@id="group_2"]/li[2]/label/input',
    first_product_discount: '//*[@id="content"]/section/div/article[1]//span[contains(@class, "discount-percentage")]',
    product_name: '(//*[@id="main"]//h1[@itemprop="name"])[1]',
    product_price: '(//*[@id="main"]//span[@itemprop="price"])[1]',
    product_reference: '(//*[@id="main"]//span[@itemprop="sku"])[1]',
    product_manufacturer: '//*[@id="product-details"]//div[@class="product-manufacturer"]/a',
    product_quantity: '//*[@id="product-details"]/div[@class="product-quantities"]/span',
    pack_product_name: '//*[@id="add-to-cart-or-refresh"]//article[%P]//div[@class="pack-product-name"]/a',
    pack_product_price: '//*[@id="add-to-cart-or-refresh"]//article[%P]//div[@class="pack-product-price"]',
    pack_product_quantity: '//*[@id="add-to-cart-or-refresh"]//article[%P]//div[@class="pack-product-quantity"]',
    product_size: '//*[@id="group_1"]',
    product_color: '(//*[@id="group_3"]//span)[2] | (//*[@id="group_2"]//span)[2]',
    see_all_products: '//*[@id="content"]//a[contains(@class, "all-product-link")]',
    first_product_all: '(//*[@id="js-product-list"]//article//a)[1]',
    pagination_next: '//*[@id="js-product-list"]//a[contains(@class, "next")]',
    pagination_previous: '//*[@id="js-product-list"]//a[contains(@class, "previous")]',
    current_page: '//*[@id="js-product-list"]//ul[contains(@class, "page-list")]/li[@class="current"]/a',
    product_discount_details: '//*[@id="main"]//span[contains(@class, "discount")]',
    quick_view_add_to_cart: '//*[@id="add-to-cart-or-refresh"]//button[contains(@data-button-action, "add-to-cart")]',
    products_number: '//*[@id="js-product-list-top"]//p',
    offline_warning_message: '//div[contains(@class, "alert-warning")]//p',
    product_discounts_table: '//*[@id="add-to-cart-or-refresh"]//tbody/tr[%R]/td[%D]',
    second_product: '(//*[@id="content"]//h3[@itemprop="name"])[2]',
    product_availability_message: '//*[@id="product-availability"]',
    product_summary: '(//*[@itemprop="description"]//p)[1]',
    product_description: '//*[@id="description"]',
    product_detail_tab: '//*[@role="tablist"]//li[2]',
    attachments_tab: '//*[@id="main"]//div[@class="product-information"]//a[@aria-controls="attachments"]',
    cloths_category: '//*[@id="category-3"]',
    second_product_clothes_category: '//*[@id="js-product-list"]//article[2]',
    product_footer_linkwidget:'//*[@id="main"]/div[2]//p[contains(text(),"%DISPLAYFOOTERPRODUCT")]',
    filename_link: '(//*[@id="attachments"]//a)[1]',
    product_tab_list: '//*[@role="tablist"]//li[%I]',
    second_product_footer_linkwidget:'//*[@id="main"]/div[2]/div/div[2]/p',
    widget_after_product_thumbs: '//*[@id="content"]//div[contains(@class,"links")]//p[contains(text(),"%NAME")]',
    second_widget_after_product_thumbs:'//*[@id="content"]//div[contains(@class,"links")]//div[2]/p',
    display_footer_product_linkwidget:'//*[@id="main"]/div[2]/div//p[contains(text(),"%DISPLAYFOOTERPRODUCT")]',
    display_second_footer_product_linkwidget:'//*[@id="main"]/div[2]/div/div[2]/p',
    product_page: '//*[@id="product"]',
    breadcrumb_nav: '//*[contains(@class, "breadcrumb")]',
    product_section: '//*[@id="main"]/div[1]/div[%I]',
    category_page: '//*[@id="category"]',
    left_column_block: '//*[@id="left-column"]',
    pagination_block: '//*[@id="js-product-list"]/nav',
    filename_link: '(//*[@id="attachments"]//a)[1]',
    productLink: '//*[@id="js-product-list"]//a[contains(text(), "%PRODUCTNAME")]'
  }
};
