<script>
  export let grid = {};
  export let deleteColumn;

  import { PostHelper } from "@lib/utils/post-helper";
  import { getStore } from "@lib/utils/context";
  // noinspection ES6UnusedImports
  import { dp_trans } from "@lib/utils/trans-helper";
  // noinspection ES6UnusedImports
  import { selectAll } from "@lib/utils/directives";

  const grids = getStore("grids");
  const hover = getStore(`hover${grid.id}`);

  const postHelper = new PostHelper();

  async function addRow() {
    const response = await postHelper.post(dp_product_grids, {
      action: "add_row",
      id_grid: grid.id
    });
    grids.updateGrid(response.grid);
  }

  async function saveRow(row) {
    const response = await postHelper.post(dp_product_grids, {
      action: "save_row",
      row
    });
    grids.updateGrid(response.grid);
  }

  async function deleteRow(row) {
    if (!confirm(dp_message.grid.row_delete)) {
      return;
    }
    const response = await postHelper.post(dp_product_grids, {
      action: "delete_row",
      id_row: row.id
    });
    grids.updateGrid(response.grid);
  }

  async function saveValue(value, id_column, id_row) {
    const response = await postHelper.post(dp_product_grids, {
      action: "save_value",
      id_grid: grid.id,
      value,
      id_column,
      id_row,
    });
    grids.updateGrid(response.grid);
  }

  const grid_list = $grids;

  function setHover(column, row) {
    // noinspection JSConstantReassignment
    $hover = {column: column, row: row};
  }

  function checkHover(state, column, row) {
    return (state.column === column.id && (state.row >= row.id || state.row === 0)) ||
      (state.row === row.id && (state.column >= column.id || state.column === 0));
  }
</script>

{#each Object.values(grid.rows) as row}
  <div class="dp-grid-cell row-header">
    <input use:selectAll
           bind:value={row.value}
           on:change={() => saveRow(row)}
           class:highlight={$hover.row === row.id}
    >
  </div>

  {#each Object.values(grid.columns) as column}
    <div class="dp-grid-cell dp-value-cell" data-cy={column.id + '-' + row.id}>
      <input use:selectAll
             value={grids.getValue(grid_list, grid.id, column.id, row.id)}
             on:change={(e) => saveValue(e.target.value, column.id, row.id)}
             on:mouseenter={() => setHover(column.id, row.id)}
               class:hover={checkHover($hover, column, row)}
      >
    </div>
  {/each}

  <div class="dp-grid-cell dp-grid-btn">
    <button class="btn btn-danger"
            on:click|preventDefault={() => deleteRow(row)}
            data-cy="delete_row"
            on:mouseenter={() => setHover(0, row.id)}
              class:hide-input={$hover.row !== row.id}
              title={dp_trans("Delete this row")}>
      <i class="material-icons">delete</i>
    </button>
  </div>

{/each}

<div class="dp-grid-cell dp-grid-btn">
  <button class="btn btn-success" on:click|preventDefault={addRow} title={dp_trans("Add a row")} data-cy="add_row">
    <i class="material-icons">add</i>
  </button>
</div>

{#each Object.values(grid.columns) as column}
  <div class="dp-grid-cell dp-grid-btn">
    <button class="btn btn-danger"
            on:click|preventDefault={() => deleteColumn(column)}
            data-cy="delete_column"
            on:mouseenter={() => setHover(column.id, 0)}
              class:hide-input={$hover.column !== column.id}
              title={dp_trans("Delete this column")}>
      <i class="material-icons">delete</i>
    </button>
  </div>
{/each}

<style>
  .row-header input {
    color: #000;
    background-color: #4CAF50;
  }

  .row-header input::selection {
    background-color: #FFEB3B;
  }

  .hover {
    background-color: #DDD;
  }

  .highlight {
    background-color: #FFC107 !important;
  }

  .hide-input {
    opacity: 0;
  }
</style>