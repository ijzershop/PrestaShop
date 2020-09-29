<script>
  export let grid = {};

  import ColumnHeader from "./ColumnHeader.svelte";
  import Rows from "./Rows.svelte";

  import { createEventDispatcher } from "svelte";
  import { getStore } from "@lib/utils/context";
  // noinspection ES6UnusedImports
  import { dp_trans } from "@lib/utils/trans-helper";
  // noinspection ES6UnusedImports
  import { fade } from "svelte/transition";
  import { PostHelper } from "@lib/utils/post-helper";
  import { shallow } from "@lib/utils/utils";
  import { saveStore } from "@lib/utils/context";
  import { createHoverStore } from "./store/hover-store";

  const grids = getStore("grids");

  const hover = createHoverStore({column: 0, row: 0});
  saveStore(`hover${grid.id}`, hover);

  let fields = window.dp_fields;
  const dispatcher = createEventDispatcher();
  const postHelper = new PostHelper();

  jQuery.subscribe([dpTopics.FIELD_SAVED, dpTopics.FIELD_DELETED, dpTopics.FIELDS_UPDATED].join(' '), () => {
    fields = window.dp_fields;
  });

  function deleteGrid() {
    if (!confirm(dp_message.grid.delete)) {
      return;
    }
    dispatcher("delete", grid);
  }

  async function saveGrid() {
    await postHelper.post(dp_product_grids, {
      action: "save_grid",
      grid: shallow(grid),
    });
    grids.updateGrid(grid);
  }

  async function deleteColumn(column) {
    if (!confirm(dp_message.grid.column_delete)) {
      return;
    }
    const response = await postHelper.post(dp_product_grids, {
      action: "delete_column",
      id_column: column.id
    });
    grids.updateGrid(response.grid);
  }

  // noinspection LabeledStatementJS, UnnecessaryLabelJS
  $: grid_columns_count = Object.values(grid.columns).length;
  // noinspection LabeledStatementJS, UnnecessaryLabelJS
  $: grid_style = `grid-template-columns: minmax(80px, auto) repeat(${grid_columns_count}, auto) 50px;`;

  function clearHover() {
    hover.set({column: 0, row: 0});
  }
</script>

<div class="grid-container" transition:fade>
  <button class="grid-delete btn btn-danger" on:click|preventDefault={deleteGrid} title={dp_trans("Delete grid")}
          data-cy="delete_grid">
    <i class="material-icons">delete</i>
  </button>

  <div class="fields">
    <div>
      <label>{dp_trans("Target field")}:</label>
      <select class="form-control" bind:value={grid.id_field_target} on:change={saveGrid} data-cy="target_field">
        <option value="0">--</option>
          {#each Object.values(fields) as field}
            <option value="{field.id}">{field.name}</option>
          {/each}
      </select>
    </div>
    <div>
      <label>{dp_trans("Column field")}</label>
      <select class="form-control" bind:value={grid.id_field_column} on:change={saveGrid} data-cy="column_field">
        <option value="0">--</option>
          {#each Object.values(fields) as field}
            <option value="{field.id}">{field.name}</option>
          {/each}
      </select>
    </div>
    <div>
      <label>{dp_trans("Row field")}</label>
      <select class="form-control" bind:value={grid.id_field_row} on:change={saveGrid} data-cy="row_field">
        <option value="0">--</option>
          {#each Object.values(fields) as field}
            <option value="{field.id}">{field.name}</option>
          {/each}
      </select>
    </div>
  </div>

  <div class="grid" on:mouseleave={clearHover} style={grid_style}>
    <div class="info">
      <div class="column-header">
          {fields[grid.id_field_column] ? fields[grid.id_field_column].name: '--'} <i class="material-icons">keyboard_arrow_right</i>
      </div>
      <div class="row-header">
          {fields[grid.id_field_row] ? fields[grid.id_field_row].name: '--'} <i class="material-icons">keyboard_arrow_down</i>
      </div>
    </div>
    <ColumnHeader {grid}/>
    <Rows {grid} {deleteColumn}/>
  </div>
</div>

<style>
  .grid-container {
    position: relative;
    border: 1px solid #eee;
    padding: 5px;
    margin-bottom: 15px;
  }

  .grid-delete {
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .grid-container:hover .grid-delete {
    display: block;
  }

  .fields {
    display: inline-flex;
    justify-content: flex-start;
  }

  .fields > div {
    margin-right: 10px;
  }

  select {
    width: 250px;
  }

  .grid {
    margin-top: 10px;
    display: grid;
  }

  .info {
    padding: 5px;
    background-color: #eee;
  }

  .info .column-header {
    color: #2196F3;
    text-align: right;
  }

  .info .row-header {
    color: #4CAF50;
  }
</style>