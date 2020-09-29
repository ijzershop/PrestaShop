<script>
  export let grid = {};

  import { PostHelper } from "@lib/utils/post-helper";
  import { getStore } from "@lib/utils/context";
  // noinspection ES6UnusedImports
  import { dp_trans } from "@lib/utils/trans-helper";
  // noinspection ES6UnusedImports
  import { selectAll } from "@lib/utils/directives";

  const grids = getStore("grids");
  const hover = getStore(`hover${grid.id}`);
  const postHelper = new PostHelper();

  async function addColumn() {
    const response = await postHelper.post(dp_product_grids, {
      action: "add_column",
      id_grid: grid.id
    });
    grids.updateGrid(response.grid);
  }

  async function saveColumn(column) {
    const response = await postHelper.post(dp_product_grids, {
      action: "save_column",
      column
    });
    grids.updateGrid(response.grid);
  }
</script>

{#each Object.values(grid.columns) as column}
  <div class="dp-grid-cell column-header">
    <input use:selectAll
           bind:value={column.value}
           on:change={() => saveColumn(column)}
           class:highlight={$hover.column === column.id}
    >
  </div>
{/each}

<div class="dp-grid-cell dp-grid-btn">
  <button class="btn btn-success btn-column"
          on:click|preventDefault={addColumn}
          title={dp_trans("Add a column")}
          data-cy="add_column">
    <i class="material-icons">add</i>
  </button>
</div>

<style>
  .column-header input {
    color: #FFF;
    background-color: #2196F3;
  }

  .column-header input::selection {
    color: #000;
    background-color: #FFEB3B;
  }

  .btn-column {
    background-color: #2196F3;
  }

  .highlight {
    background-color: #9c27b0 !important;
  }
</style>