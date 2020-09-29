<!--suppress UnnecessaryLabelJS, LabeledStatementJS -->
<script>
  import { onMount } from "svelte";
  import { PostHelper } from "@lib/utils/post-helper";
  import { createStore } from "./store/store";
  import { dp_trans } from "@lib/utils/trans-helper";
  import { reorder } from "@lib/utils/reorder";
  import SortableList from 'svelte-sortable-list';
  import ExecItem from "./ExecItem.svelte";

  const exec_order = createStore({});
  const postHelper = new PostHelper();

  async function fetchExecOrders() {
    const response = await postHelper.post(dp_product_exec_order, {
      action: "get_exec_orders",
      no_msg: true
    });
    exec_order.set(response.exec_order);
  }

  let id_exec;

  async function addItem() {
    const response = await postHelper.post(dp_product_exec_order, {
      action: "add_item",
      id_exec,
    });
    exec_order.set(response.exec_order);
  }

  let exec_order_list;
  $: exec_order_list = reorder($exec_order);

  async function sortList(ev) {
    exec_order_list = ev.detail.map((item, index) => {
      item.position = index + 1;
      return item;
    });
    await postHelper.post(dp_product_exec_order, {
      action: "reorder_exec_order",
      order: ev.detail.map(exec_order => exec_order.id),
    });
  }

  async function resetToDefault() {
    if (!confirm(dp_message.confirm)) {
      return false;
    }

    await postHelper.post(dp_product_exec_order, {
      action: "reset_to_default",
    });
    exec_order.resetToDefault();
  }

  onMount(() => {
    fetchExecOrders();
  });
</script>

<div class="dp-exec-order-list">
  {#if !exec_order_list.length}
    <div class="alert alert-info" data-cy="empty">
      {dp_trans("No custom execution order is configured, the default order will be used")}
    </div>
  {/if}
  <SortableList
          list={exec_order_list}
          key="id"
          on:sort={sortList}
          let:item
  >
    <ExecItem {item} store={exec_order} />
  </SortableList>

  <button class="btn btn-success" on:click={addItem} data-cy="add_exec_item">
    {dp_trans("Add an execution item")}
  </button>

  <select bind:value={id_exec}>
    {#each window.dp_exec_labels as label, id_exec}
      <option value="{id_exec}">{label}</option>
    {/each}
  </select>

  <div style="margin-top: 10px;">
    <button class="btn btn-danger" on:click={resetToDefault} data-cy="reset_to_default" title={dp_trans("deletes all execution items")}>
      {dp_trans("Reset to default")}
    </button>
  </div>
</div>

<style>
  :global(.dp-exec-order-list .over) {
    display: inline-block;
    border-color: #25b9d7 !important;
  }
</style>