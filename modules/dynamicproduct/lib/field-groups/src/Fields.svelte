<!--suppress JSUnusedAssignment, UnnecessaryLabelJS, LabeledStatementJS -->
<script>
  export let state;

  import { dp_trans } from "@lib/utils/trans-helper";
  import { draggable } from "./utils/draggable";
  import { sortable } from "./utils/sortable";
  import { reorder } from "@lib/utils/reorder";
  import { PostHelper } from "@lib/utils/post-helper";

  $: fields_list = reorder($state.fields);
</script>

<div class="fields-list dp-list-group">
  <label class="dp_main_label">{dp_trans("Available fields")}:</label>
  <div class="dp-fields-sortable" data-id_group="0" use:sortable={{id_group: 0, state}}>
    {#each fields_list as field (field.id)}
      {#if field.id_group === 0 || !$state.product_field_groups[field.id_group]}
        <div class="dp_equation_field" data-id={field.id}>
          {field.name}
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  :global(.dp-fields-sortable) {
    border: 1px solid #EEE;
    min-height: 35px;
  }

  :global(.dp-fields-sortable .dp_equation_field) {
    border: 1px solid #32bef2;
  }

  :global(.dp-fields-sortable .dp_field_highlight) {
    border: 1px solid #fcefa1;
    background-color: #fbf9ee;
    color: #363636 !important;
  }
</style>