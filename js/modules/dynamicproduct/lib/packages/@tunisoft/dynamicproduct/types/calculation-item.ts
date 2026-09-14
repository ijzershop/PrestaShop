export type CalculationItem = {
  id: number
  id_product: number
  id_item: number
  type: CalculationItemType,
  position: number
}

export enum CalculationItemType {
  CONDITION_ITEM = "condition",
  FIELD_FORMULA_ITEM = "field_formula",
  INTERVAL_ITEM = "interval",
  GRID_ITEM = "grid",
}
