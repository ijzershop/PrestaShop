import type { Field } from "../types/field";
import type { Tooltip } from "../types/tooltip";
import type { VegemiteStore } from "./svelte-store";

export type UiStoreData = {
  loading: boolean;
  touched: boolean;
  error_message: string;
  success_message: string;
  blur_ui: boolean;
  force_display: boolean;
  tooltips: Record<number, Tooltip>
  oos: boolean;
}

export interface UiStore extends VegemiteStore<UiStoreData> {
  setLoading(loading: boolean, clearTouched?: boolean);

  setTouched(touched: boolean);

  isTooltipEmpty(id_field: number);

  setTooltipEmpty(field: Field, empty: boolean);

  setOOS(oos: boolean);
}

