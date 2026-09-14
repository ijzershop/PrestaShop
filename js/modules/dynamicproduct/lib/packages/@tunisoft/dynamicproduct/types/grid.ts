export type Grid = {
  id: number;
  id_product: number;
  id_field_target: number;
  id_field_column: number;
  id_field_row: number;
  columns: Record<number, GridColumn>;
  rows: Record<number, GridRow>;
  values: Record<number, Record<number, GridValue>>;
}

export type GridColumn = {
  id: number;
  id_grid: number;
  value: number;
}

export type GridRow = {
  id: number;
  id_grid: number;
  value: number;
}

export type GridValue = {
  id: number;
  id_grid: number;
  id_grid_column: number;
  id_grid_row: number;
  value: number;
}
