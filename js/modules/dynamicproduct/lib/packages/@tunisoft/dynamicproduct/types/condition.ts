export type Condition = {
  id: number;
  name: string;
  formula: string;

  position: number;

  hidden_fields: number[];
  hidden_options: Record<number, number[]>;
  hidden_groups: number[];
  hidden_steps: number[];
}
