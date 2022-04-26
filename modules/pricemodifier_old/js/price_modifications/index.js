/**
 * Price Modifier
 * Copyright since 2021 JB Stoker and Contributors
 * <JB Stoker> Property
 *

 * @author    JB Stoker
 * @copyright Since 2021 JB Stoker
 * @license   https://opensource.org/licenses/MIT
 */

import Grid from '@components/grid/grid';
import ReloadListActionExtension from '@components/grid/extension/reload-list-extension';
import ColumnTogglingExtension from '@components/grid/extension/column-toggling-extension';
import ExportToSqlManagerExtension from '@components/grid/extension/export-to-sql-manager-extension';
import FiltersResetExtension from '@components/grid/extension/filters-reset-extension';
import SortingExtension from '@components/grid/extension/sorting-extension';
import LinkRowActionExtension from '@components/grid/extension/link-row-action-extension';
import SubmitGridExtension from '@components/grid/extension/submit-grid-action-extension';
import SubmitBulkExtension from '@components/grid/extension/submit-bulk-action-extension';
import BulkActionCheckboxExtension from '@components/grid/extension/bulk-action-checkbox-extension';
import SubmitRowActionExtension from '@components/grid/extension/action/row/submit-row-action-extension';

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
});
