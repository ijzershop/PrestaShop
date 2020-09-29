<script>
  import { onMount } from "svelte";
  import { saveStore } from "@lib/utils/context";
  // noinspection ES6UnusedImports
  import { dp_trans } from "@lib/utils/trans-helper";
  import Grids from "./Grids.svelte";
  import Importer from "./Importer.svelte";
  import { createGridsStore } from "./store/grids-store";

  import { PostHelper } from "@lib/utils/post-helper";

  const grids = createGridsStore({});
  saveStore("grids", grids);

  const postHelper = new PostHelper();

  async function fetchGrids() {
    const response = await postHelper.post(dp_product_grids, {
      action: "get_grids",
      no_msg: true
    });
    grids.set(response.grids);
  }

  async function addGrid() {
    const response = await postHelper.post(dp_product_grids, {
      action: "add_grid"
    });
    grids.updateGrid(response.grid);
  }

  let file_input = null;
  function triggerUpload() {
    if (file_input) {
      file_input.click();
    }
  }

  onMount(() => {
    fetchGrids();
  });
</script>

<div>
  <Grids {grids}/>
</div>

<div>
  <button class="btn btn-success" on:click={addGrid} data-cy="add_grid">
    <i class="material-icons">add</i> {dp_trans("Add a grid")}
  </button>
  <button class="btn btn-success" on:click={triggerUpload}>
    <i class="material-icons">add</i> {dp_trans("Import CSV")}
  </button>
  <Importer bind:file_input />
</div>

