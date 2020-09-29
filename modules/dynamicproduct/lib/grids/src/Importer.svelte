<script>
  export let file_input;

  import "js/plugins/jquery.ajaxfileupload.js";
  import { getStore } from "@lib/utils/context";

  const grids = getStore('grids');

  function upload(node) {
    jQuery(node).ajaxfileupload({
      action: dp_product_grids,
      valid_extensions: ["csv"],
      params: {
        action: `import_csv`,
        id_product: dp_id_product,
        ajax: true
      },
      onStart: () => {
      },
      onComplete: (response) => {
        if (response.success) {
          grids.updateGrid(response.grid);
          showSuccessMessage(dsn_message.success);
        } else {
          showErrorMessage(response.message);
        }
        node.value = "";
      }
    });
  }
</script>

<div>
  <input type="file" name="csv" use:upload bind:this={file_input}/>
</div>

<style>
  input[type=file] {
    position: fixed;
    top: -10000px;
    left: -10000px;
  }
</style>