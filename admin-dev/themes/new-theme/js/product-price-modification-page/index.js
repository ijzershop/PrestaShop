// admin-dev/themes/new-theme/js/pages/tax/index.js

// 1. import the grid component
import Grid from '@components/grid/grid';
import SortingExtension from '@components/grid/extension/sorting-extension';
import FiltersResetExtension from '@components/grid/extension/filters-reset-extension';
import ReloadListActionExtension from '@components/grid/extension/reload-list-extension';
import ColumnTogglingExtension from '@components/grid/extension/column-toggling-extension';
import SubmitRowActionExtension from '@components/grid/extension/action/row/product-price-modifier-submit-row-action-extension';
import SubmitBulkExtension from '@components/grid/extension/product-price-modifier-submit-bulk-action-extension';
import FiltersSubmitButtonEnablerExtension
  from '@components/grid/extension/filters-submit-button-enabler-extension';
import LinkRowActionExtension from '@components/grid/extension/link-row-action-extension';
import TranslatableInput from "@components/translatable-input";
import BulkActionCheckboxExtension from "@components/grid/extension/bulk-action-checkbox-extension";

const $ = window.$;

$(() => {
// 2. initialize the grid component by providing grid id
  const productPriceModificationGrid = new Grid('product_price_modification');


  productPriceModificationGrid.addExtension(new ReloadListActionExtension());
  productPriceModificationGrid.addExtension(new SortingExtension());
  productPriceModificationGrid.addExtension(new FiltersResetExtension());
  productPriceModificationGrid.addExtension(new ColumnTogglingExtension());
  productPriceModificationGrid.addExtension(new SubmitRowActionExtension());
  productPriceModificationGrid.addExtension(new SubmitBulkExtension());
  productPriceModificationGrid.addExtension(new BulkActionCheckboxExtension());
  productPriceModificationGrid.addExtension(new FiltersSubmitButtonEnablerExtension());
  productPriceModificationGrid.addExtension(new LinkRowActionExtension());

  new TranslatableInput();

});
