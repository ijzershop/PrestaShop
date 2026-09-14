import type { CalculatorResult } from "../types/calculator"
import type { VegemiteStore } from "./svelte-store"

export interface CalculatorStore extends VegemiteStore<CalculatorResult> {
  updateData (res: CalculatorResult);
}
