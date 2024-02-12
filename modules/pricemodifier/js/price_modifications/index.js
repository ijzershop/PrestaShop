import Grid from '@components/grid/grid';
import SortingExtension from '@components/grid/extension/sorting-extension';
import FiltersResetExtension from '@components/grid/extension/filters-reset-extension';
import ReloadListActionExtension from '@components/grid/extension/reload-list-extension';
import ColumnTogglingExtension from '@components/grid/extension/column-toggling-extension';
import SubmitRowActionExtension
  from '@components/grid/extension/action/row/product-price-modifier-submit-row-action-extension';
import SubmitBulkExtension from '@components/grid/extension/product-price-modifier-submit-bulk-action-extension';
import LinkRowActionExtension from '@components/grid/extension/link-row-action-extension';
import BulkActionCheckboxExtension from "@components/grid/extension/bulk-action-checkbox-extension";

const $ = window.$;

$(() => {
  const price_modificationsGrid = new Grid('price_modification');

  price_modificationsGrid.addExtension(new ReloadListActionExtension());
  price_modificationsGrid.addExtension(new ColumnTogglingExtension());
  price_modificationsGrid.addExtension(new ExportToSqlManagerExtension());
  price_modificationsGrid.addExtension(new FiltersResetExtension());
  price_modificationsGrid.addExtension(new SortingExtension());
  price_modificationsGrid.addExtension(new LinkRowActionExtension());
  price_modificationsGrid.addExtension(new SubmitGridExtension());
  price_modificationsGrid.addExtension(new SubmitBulkExtension());
  price_modificationsGrid.addExtension(new BulkActionCheckboxExtension());
  price_modificationsGrid.addExtension(new SubmitRowActionExtension());


  price_modificationsGrid.init();
});
