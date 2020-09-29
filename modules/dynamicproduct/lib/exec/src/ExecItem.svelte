<script>
  export let store;
  export let item;

  import { PostHelper } from "@lib/utils/post-helper";
  import { dp_trans } from "@lib/utils/trans-helper";

  const postHelper = new PostHelper();

  async function deleteItem() {
    if (!confirm(dp_message.confirm)) {
      return;
    }
    await postHelper.post(dp_product_exec_order, {
      action: "delete_item",
      id_item: item.id,
    });
    store.deleteItem(item);
  }

</script>

<div class="dp-exec-item" data-cy="exec_item">
  <span>{item.position} - {window.dp_exec_labels[item.id_exec]}</span>
  <button class="btn btn-default btn-small btn-reorder-exec-item" title={dp_trans("Drag to reorder")}>
    <i class="material-icons">reorder</i>
  </button>
  <button class="btn btn-danger btn-small btn-delete-exec-item" on:click={deleteItem} data-cy="delete_item"
          title={dp_trans("Delete this item")}>
    <i class="material-icons">close</i>
  </button>
</div>

<style>
  .dp-exec-item {
    width: 400px;
    padding: 10px;
    display: flex;
    border: 1px solid #bbcdd2;
    background: #EEE;
  }

  span {
    flex-grow: 1;
  }

  .btn-delete-exec-item, .btn-reorder-exec-item {
    display: none;
    align-self: flex-end;
    margin-left: 5px;
  }

  .dp-exec-item:hover .btn-delete-exec-item,
  .dp-exec-item:hover .btn-reorder-exec-item {
    display: inline-block;
  }
</style>