const {Menu} = require('../../selectors/BO/menu.js');
let promise = Promise.resolve();
const {ProductList} = require('../../selectors/BO/add_product_page');
const {AddProductPage} = require('../../selectors/BO/add_product_page');

/**** Example of product data ****
 * var productData = {
 *  name: 'product_name',
 *  reference: 'product_reference',
 *  quantity: 'product_quantity',
 *  price: 'product_price',
 *  image_name: 'picture_file_name',
 *  type: "product_type(standard, pack, virtual)",
 *  attribute: {
 *      name: 'attribute_name',
 *      variation_quantity: 'product_variation_quantity'
 *  },
 *  feature: {
 *      name: 'feature_name',
 *      value: 'feature_value'
 *  },
 *  pricing: {
 *      unitPrice: "product_unit_price",
 *      unity: "product_unity",
 *      wholesale: "product_wholesale",
 *      type: 'percentage',
 *      discount: 'product_discount'
 *  },
 *  categories :{
 *      0: {
 *          name:"name category",
 *          main_category: true/false
 *      }
 *  },
 *  options: {
 *      filename: "attached_filename"
 *  }
 * };
 */
module.exports = {
  createProduct: function (AddProductPage, productData) {
    scenario('Create a new product in the Back Office', client => {
      test('should go to "Products" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
      test('should click on "New Product" button', () => client.waitForExistAndClick(AddProductPage.new_product_button));
      test('should set the "Name" input', () => client.waitAndSetValue(AddProductPage.product_name_input, productData["name"] + date_time));
      test('should set the "Reference" input', () => client.waitAndSetValue(AddProductPage.product_reference, productData["reference"]));
      test('should set the "Quantity" input', () => client.waitAndSetValue(AddProductPage.quantity_shortcut_input, productData["quantity"]));
      test('should set the "Price" input', () => client.setPrice(AddProductPage.priceTE_shortcut, productData["price"]));
      test('should upload the first product picture', () => client.uploadPicture(productData["image_name"], AddProductPage.picture));

      if (productData.hasOwnProperty('type') && productData.type === 'pack') {
        scenario('Add the created product to pack', client => {
          test('should select the "Pack of products"', () => client.waitAndSelectByValue(AddProductPage.product_type, 1));
          test('should add products to the pack', () => client.addPackProduct(productData['product']['name'] + date_time, productData['product']['quantity']));
        }, 'product/product');
      }

      if (productData.hasOwnProperty('attribute')) {
        scenario('Add Attribute', client => {
          test('should select the "Product with combination" radio button', () => client.scrollWaitForExistAndClick(AddProductPage.variations_type_button));
          test('should go to "Combinations" tab', () => client.scrollWaitForExistAndClick(AddProductPage.variations_tab));
          test('should select the variation', () => {
            if (productData.type === 'combination') {
              return promise
                .then(() => client.createCombination(AddProductPage.combination_size_m, AddProductPage.combination_color_beige));
            } else {
              return promise
                .then(() => client.waitAndSetValue(AddProductPage.variations_input, productData['attribute']['name'] + date_time + " : All"))
                .then(() => client.waitForExistAndClick(AddProductPage.variations_select));
            }
          });
          test('should click on "Generate" button', () => {
            return promise
              .then(() => client.waitForExistAndClick(AddProductPage.variations_generate))
              .then(() => client.getCombinationData(1));
          });
          test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.validation_msg, 'Settings updated.'));
          test('should select all the generated variations', () => client.waitForVisibleAndClick(AddProductPage.var_selected));
          test('should set the "Variations quantity" input', () => client.setVariationsQuantity(AddProductPage, productData['attribute']['variation_quantity']));
        }, 'product/create_combinations');
      }

      if (productData.hasOwnProperty('feature')) {
        scenario('Add Feature', client => {
          test('should click on "Add feature" button', () => {
            return promise
              .then(() => client.scrollTo(AddProductPage.product_create_category_btn))
              .then(() => client.waitForExistAndClick(AddProductPage.add_feature_to_product_button));
          });
          test('should select the created feature', () => client.selectFeature(AddProductPage, productData['feature']['name'] + date_time, productData['feature']['value']));
        }, 'product/product');
      }

      if (productData.hasOwnProperty('pricing')) {
        scenario('Edit product pricing', client => {
          test('should click on "Pricing"', () => client.scrollWaitForExistAndClick(AddProductPage.product_pricing_tab, 50));
          test('should set the "Price per unit (tax excl.)"', () => client.waitAndSetValue(AddProductPage.unit_price, productData['pricing']['unitPrice']));
          test('should set the "Unit"', () => client.waitAndSetValue(AddProductPage.unity, productData['pricing']['unity']));
          test('should set the "Price (tax excl.)"', () => client.waitAndSetValue(AddProductPage.pricing_wholesale, productData['pricing']['wholesale']));
          test('should click on "Add specific price" button', () => client.waitForExistAndClick(AddProductPage.pricing_add_specific_price_button));
          test('should change the reduction type to "Percentage"', () => {
            return promise
              .then(() => client.pause(3000))
              .then(() => client.waitAndSelectByValue(AddProductPage.specific_price_reduction_type_select, productData['pricing']['type']));
          });
          test('should set the "Discount" input', () => client.waitAndSetValue(AddProductPage.specific_price_discount_input, productData['pricing']['discount']));
          test('should click on "Apply" button', () => client.waitForExistAndClick(AddProductPage.specific_price_save_button));
        }, 'product/product');
      }

      if (productData.hasOwnProperty('options')) {
        scenario('Edit product options', client => {
          test('should click on "Options"', () => client.scrollWaitForExistAndClick(AddProductPage.product_options_tab));
          test('should select the attached file to the product', () => {
            return promise
              .then(() => client.scrollTo(AddProductPage.options_add_new_file_button))
              .then(() => client.waitForExistAndClick(AddProductPage.attached_file_checkbox.replace('%FileName', productData.options.filename)))
          });
        }, 'product/product');
      }

      if (productData.hasOwnProperty('categories')) {
        scenario('Add category', client => {
          test('should search for the category', () => client.waitAndSetValue(AddProductPage.search_categories, productData.categories['1']['name'] + date_time));
          test('should select the category', () => client.waitForVisibleAndClick(AddProductPage.list_categories));
          test('should open all categories', () => client.openAllCategory());
          if (Object.keys(productData.categories).length > 1) {
            Object.keys(productData.categories).forEach(function (key) {
              if (productData.categories[key]["main_category"] && productData.categories[key]["name"] !== 'home') {
                test('should choose the created category as default', () => {
                  return promise
                    .then(() => client.scrollTo(AddProductPage.category_radio.replace('%S', productData.categories[key]["name"] + date_time)))
                    .then(() => client.waitForExistAndClick(AddProductPage.category_radio.replace('%S', productData.categories[key]["name"] + date_time), 4000));
                });
              }
            });
          } else {
            test('should delete the home category', () => client.waitForExistAndClick(AddProductPage.default_category));
          }
        }, 'product/product');
      }

      scenario('Save the created product', client => {
        test('should switch the product online', () => {
          return promise
            .then(() => client.isVisible(AddProductPage.symfony_toolbar, 3000))
            .then(() => {
              if (global.isVisible) {
                client.waitForExistAndClick(AddProductPage.symfony_toolbar)
              }
            })
            .then(() => client.waitForExistAndClick(AddProductPage.product_online_toggle, 2000));
        });
        test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 2000));
        test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.validation_msg, 'Settings updated.'));
      }, 'product/product');

    }, 'product/product');

  },
  checkProductBO(AddProductPage, productData) {
    scenario('Check the product creation in the Back Office', client => {
      test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
      test('should search for product by name', () => client.searchProductByName(productData.name + date_time));
      test('should check the existence of product name', () => client.checkTextValue(AddProductPage.catalog_product_name, productData.name + date_time));
      test('should check the existence of product reference', () => client.checkTextValue(AddProductPage.catalog_product_reference, productData.reference));
      test('should check the existence of product category', () => client.checkTextValue(AddProductPage.catalog_product_category, 'Home'));
      test('should check the existence of product price TE', () => client.checkProductPriceTE(productData.price));
      test('should check the existence of product quantity', () => client.checkTextValue(AddProductPage.catalog_product_quantity, productData.quantity));
      test('should check the existence of product status', () => client.checkTextValue(AddProductPage.catalog_product_online, 'check'));
      test('should click on "Reset button"', () => client.waitForExistAndClick(AddProductPage.catalog_reset_filter));
    }, 'product/check_product');
  },
  sortProduct: function (selector, sortBy) {
    scenario('Check the sort of products by "' + sortBy.toUpperCase() + '"', client => {
      test('should click on "Sort by ASC" icon', () => {
        let sortSelector = sortBy === 'name' || sortBy === 'reference' ? ProductList.sort_button.replace("%B", sortBy) : sortBy === 'id_product' ? ProductList.sort_by_icon.replace("%B", sortBy).replace("%W", "desc") : ProductList.sort_by_icon.replace("%B", sortBy).replace("%W", "asc");
        for (let j = 0; j < global.productsNumber; j++) {
          promise = client.getProductsInformation(selector, j);
        }
        return promise
          .then(() => client.moveToObject(sortSelector))
          .then(() => client.waitForExistAndClick(sortSelector));
      });
      test('should check that the products is well sorted by ASC', () => {
        for (let j = 0; j < global.productsNumber; j++) {
          promise = client.getProductsInformation(selector, j, true);
        }
        return promise
          .then(() => client.sortTable("ASC", sortBy))
          .then(() => client.checkSortProduct());
      });
      test('should click on "Sort by DESC" icon', () => {
        return promise
          .then(() => client.moveToObject(ProductList.sort_by_icon.replace("%B", sortBy).replace("%W", "asc")))
          .then(() => client.waitForExistAndClick(ProductList.sort_by_icon.replace("%B", sortBy).replace("%W", "asc")));
      });
      test('should check that the products is well sorted by DESC', () => {
        for (let j = 0; j < global.productsNumber; j++) {
          promise = client.getProductsInformation(selector, j, true);
        }
        return promise
          .then(() => client.sortTable("DESC", sortBy))
          .then(() => client.checkSortProduct());
      });
    }, 'product/product');
  },
  checkPaginationFO(client, productPage, buttonName, pageNumber) {
    let selectorButton = buttonName === 'Next' ? productPage.pagination_next : productPage.pagination_previous;
    test('should click on "' + buttonName + '" button', () => {
      return promise
        .then(() => client.isVisible(selectorButton))
        .then(() => client.clickNextOrPrevious(selectorButton));
    });
    test('should check that the current page number is equal to "' + pageNumber + '"', () => client.checkTextValue(productPage.current_page, pageNumber));
    test('should check that the page value in the URL is equal to "' + pageNumber + '"', () => client.checkParamFromURL('page', pageNumber));
  },

  checkPaginationBO(nextOrPrevious, pageNumber, itemPerPage, close = false, paginateBetweenPages = false) {
    scenario('Navigate between catalog pages and set the paginate limit equal to "' + itemPerPage + '"', client => {
      let selectorButton = nextOrPrevious === 'Next' ? ProductList.pagination_next : ProductList.pagination_previous;
      test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
      test('should set the "item per page" to "' + itemPerPage + '"', () => client.waitAndSelectByValue(ProductList.item_per_page, itemPerPage));
      test('should check that the current page is equal to "' + pageNumber + '"', () => client.checkAttributeValue(ProductList.page_active_number, 'value', pageNumber, 'contain', 3000));
      test('should check that the number of products is less or equal to "' + itemPerPage + '"', () => {
        return promise
          .then(() => client.getProductPageNumber('product_catalog_list'))
          .then(() => expect(global.productsNumber).to.be.at.most(itemPerPage));
      });
      if (paginateBetweenPages) {
        test('should close the symfony toolbar if exists', () => {
          return promise
            .then(() => client.isVisible(AddProductPage.symfony_toolbar))
            .then(() => {
              if (global.isVisible) {
                client.waitForExistAndClick(AddProductPage.symfony_toolbar);
              }
            });
        });
        test('should click on "' + nextOrPrevious + '" button', () => {
          return promise
            .then(() => client.isVisible(selectorButton))
            .then(() => client.clickNextOrPrevious(selectorButton));
        });
        test('should check that the current page is equal to 2', () => client.checkAttributeValue(ProductList.page_active_number, 'value', '2', 'contain', 3000));
        test('should set the "Page value" input to "' + pageNumber + '"', () => {
          return promise
            .then(() => client.waitAndSetValue(ProductList.page_active_number, pageNumber))
            .then(() => client.keys('Enter'));
        });
        test('should check that the current page is equal to "' + pageNumber + '"', () => client.checkAttributeValue(ProductList.page_active_number, 'value', pageNumber, 'contain', 3000));
      }
      if (close)
        test('should set the "item per page" to 20 (back to normal)', () => client.waitAndSelectByValue(ProductList.item_per_page, 20));
    }, 'product/product', close);
  },

  deleteProduct(AddProductPage, productData) {
    scenario('Delete the created product', client => {
      test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
      test('should search for the created product', () => client.searchProductByName(productData.name + date_time));
      test('should click on "Dropdown toggle" button', () => client.waitForExistAndClick(ProductList.dropdown_button.replace('%POS', '1')));
      test('should click on "Delete" action', () => client.waitForExistAndClick(ProductList.action_delete_button.replace('%POS', '1')));
      test('should click on "Delete now" modal button', () => client.waitForVisibleAndClick(ProductList.delete_now_modal_button, 1000));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.success_panel, 'Product successfully deleted.'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(AddProductPage.catalog_reset_filter));
    }, 'product/check_product');
  },

  checkProductInListFO(AccessPageFO, productPage, productData) {
    scenario('Check the created product in the Front Office', () => {

      scenario('Login in the Front Office', client => {
        test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
      }, 'product/product');

      scenario('Open the created product', client => {
        test('should set the language of shop to "English"', () => client.changeLanguage());
        test('should click on "SEE ALL PRODUCTS" link', () => client.scrollWaitForExistAndClick(productPage.see_all_products));
        for (let i = 0; i <= pagination; i++) {
          for (let j = 0; j < 4 ; j++) {
              test('should check the ' + productData[j].name + ' product existence in the ' + (Number(i) + 1) + ' page', () => {
                return promise
                  .then(() => client.pause(4000))
                  .then(() => client.isVisible(productPage.productLink.replace('%PRODUCTNAME', productData[j].name + date_time)));
              });
              test('should open the product in new tab if exist', () =>  client.middleClick(productPage.productLink.replace('%PRODUCTNAME', productData[j].name + date_time)));
          }
          if (i !== pagination) {
            test('should click on "NEXT" button', () => {
              return promise
                .then(() => client.isVisible(productPage.pagination_next))
                .then(() => {
                  if (global.isVisible) {
                    client.clickPageNext(productPage.pagination_next);
                  }
                });
            });
          }
        }
      }, 'product/product');
      scenario('Check "standard" product information', client => {
        test('should go to the "' + productData[0].name + '" product', () => client.switchWindow(4));
        test('should check that the product name is equal to "' + (productData[0].name + date_time).toUpperCase() + '"', () => client.checkTextValue(productPage.product_name, (productData[0].name + date_time).toUpperCase()));
        test('should check that the product price is equal to "€12.00"', () => client.checkTextValue(productPage.product_price, "€12.00", "contain"));
        test('should check that the product reference is equal to "' + productData[0].reference + '"', () => {
          return promise
            .then(() => client.scrollTo(productPage.product_reference))
            .then(() => client.checkTextValue(productPage.product_reference, productData[0].reference));
        });
        test('should check that the product quantity is equal to "5"', () => client.checkAttributeValue(productPage.product_quantity, 'data-stock', productData[0].quantity));
      }, 'product/product');

      scenario('Check "pack" product information', client => {
        test('should go to the "' + productData[1].name + '" product', () => client.switchWindow(3));
        test('should check that the product name is equal to "' + (productData[1].name + date_time).toUpperCase() + '"', () => client.checkTextValue(productPage.product_name, (productData[1].name + date_time).toUpperCase()));
        test('should check that the product price is equal to "€12.00"', () => client.checkTextValue(productPage.product_price, "€12.00", "contain"));
        test('should check that the first product pack name is equal to "standard"', () => client.checkTextValue(productPage.pack_product_name.replace('%P', 1), productData[0].name + date_time));
        test('should check that the first product pack price is equal to "€12.80"', () => client.checkTextValue(productPage.pack_product_price.replace('%P', 1), '€12.00'));
        test('should check that the first product pack quantity is equal to "1"', () => client.checkTextValue(productPage.pack_product_quantity.replace('%P', 1), 'x 1'));
        test('should check that the product reference is equal to "' + productData[1].reference + '"', () => {
          return promise
            .then(() => client.scrollTo(productPage.product_reference))
            .then(() => client.checkTextValue(productPage.product_reference, productData[1].reference));
        });
        test('should check that the product quantity is equal to "5"', () => client.checkAttributeValue(productPage.product_quantity, 'data-stock', productData[1].quantity));
      }, 'product/product');

      scenario('Check "combination" product information', client => {
        test('should go to the "' + productData[2].name + '" product', () => client.switchWindow(2));
        test('should check that the product name is equal to "' + (productData[2].name + date_time).toUpperCase() + '"', () => client.checkTextValue(productPage.product_name, (productData[2].name + date_time).toUpperCase()));
        test('should check that the product price is equal to "€12.00"', () => client.checkTextValue(productPage.product_price, "€12.00", "contain"));
        test('should check that the product reference is equal to "' + productData[2].reference + '"', () => {
          return promise
            .then(() => client.scrollTo(productPage.product_reference))
            .then(() => client.checkTextValue(productPage.product_reference, productData[2].reference));
        });
        test('should check that the product quantity is equal to "5"', () => client.checkAttributeValue(productPage.product_quantity, 'data-stock', productData[2].quantity));
      }, 'product/product');

      scenario('Check "virtual" product information', client => {
        test('should go to the "' + productData[3].name + '" product', () => client.switchWindow(1));
        test('should check that the product name is equal to "' + (productData[3].name + date_time).toUpperCase() + '"', () => client.checkTextValue(productPage.product_name, (productData[3].name + date_time).toUpperCase()));
        test('should check that the product price is equal to "€12.00"', () => client.checkTextValue(productPage.product_price, "€12.00", "contain"));
        test('should check that the product reference is equal to "' + productData[3].reference + '"', () => {
          return promise
            .then(() => client.scrollTo(productPage.product_reference))
            .then(() => client.checkTextValue(productPage.product_reference, productData[3].reference));
        });
        test('should check that the product quantity is equal to "5"', () => client.checkAttributeValue(productPage.product_quantity, 'data-stock', productData[3].quantity));
      }, 'product/product');

    }, 'product/product', true);
  },
  checkAllProduct(AccessPageFO, productPage) {
    scenario('Check the created product in the Front Office', () => {
      scenario('Login in the Front Office', client => {
        test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
      }, 'product/product');
      scenario('Check that all product are displayed in the Front Office', client => {
        test('should set the language of shop to "English"', () => client.changeLanguage());
        test('should click on "SEE ALL PRODUCTS" link', () => client.scrollWaitForExistAndClick(productPage.see_all_products));
        for (let i = 0; i <= pagination; i++) {
          for (let j = 0; j < global.productInfo.length; j++) {
            test('should check the ' + global.productInfo[j].name + ' existence in the ' + (Number(i) + 1) + ' page', () => {
              return promise
                .then(() => client.pause(4000))
                .then(() => client.isVisible(AccessPageFO.product_name.replace('%PAGENAME', global.productInfo[j].name.substring(0, 23))))
                .then(() => {
                  if (global.isVisible) {
                    global.productInfo[j].status = true;
                  }
                });
            });
          }
          if (i !== pagination) {
            test('should click on "NEXT" button', () => {
              return promise
                .then(() => client.isVisible(productPage.pagination_next))
                .then(() => {
                  if (global.isVisible) {
                    client.clickPageNext(productPage.pagination_next);
                  }
                });
            });
          }
        }
      }, 'product/product');
      scenario('Verify the existence of all product in the Front Office', client => {
        test('should check that the product doesn\'t contain false status', () => {
          return promise
            .then(() => {
              for (let i = 0; i < global.productInfo.length; i++) {
                expect(global.productInfo[i].status, 'the product ' + global.productInfo[i].name + ' doesn\'t in the Front Office').to.equal(true);
              }
            })
            .then(() => client.pause(2000));
        });
      }, 'product/product');
    }, 'product/product', true);
  }
};
