<script>
  import Grid from "./Grid.svelte";

  export let grids;

  import { PostHelper } from "@lib/utils/post-helper";

  const postHelper = new PostHelper();

  async function deleteGrid({detail: grid}) {
    await postHelper.post(dp_product_grids, {
      action: "delete_grid",
      id_grid: grid.id
    });
    grids.deleteGrid(grid);
  }

</script>

<div>
    {#each Object.values($grids) as grid}
      <Grid {grid} on:delete={deleteGrid}/>
    {/each}
</div>

<style>
  :global(.dp-grid-cell) {
    border: 1px solid #EEE;
  }
  :global(.dp-grid-cell) input {
    width: 80px;
    text-align: center;
    border: none;
    width: 100%;
    height: 100%;
  }
  :global(.dp-grid-btn) {
    padding: 5px;
    border: none;
    display: grid;
    justify-items: center;
    align-items: center;
  }
</style>