<!--suppress JSUnusedAssignment, UnnecessaryLabelJS, LabeledStatementJS -->
<script>
  export let product_group;
  export let state;

  import { PostHelper } from "@lib/utils/post-helper";
  import { dp_trans } from "@lib/utils/trans-helper";
  import { draggable } from "./utils/draggable";
  import { sortable } from "./utils/sortable";
  import { reorder } from "@lib/utils/reorder";

  $: fields_list = reorder($state.fields);

  function getLabel(id_field_group) {
    if ($state.field_groups[id_field_group]) {
      return $state.field_groups[id_field_group].label;
    }
    return dp_trans("Unknown group");
  }

  const postHelper = new PostHelper();

  async function deleteGroup(id_group) {
    if (!confirm(dp_message.confirm)) {
      return false;
    }
    const response = await postHelper.post(dp_product_field_groups, {
      action: "delete_group",
      id_group,
    });
    $state.product_field_groups = response.product_field_groups;
  }
</script>

<div class="product-group">
  <div class="product-group-header">
    {getLabel(product_group.id_field_group)}
    <button on:click={() => deleteGroup(product_group.id)}
            class="btn btn-danger btn-small delete-group"
            data-cy="delete-group"
            title={dp_trans("Delete this group")}>
      <i class="material-icons">delete</i>
    </button>
    <button class="btn btn-primary btn-small reorder-group"
            title={dp_trans("Drag to reorder")}>
      <i class="material-icons">list</i>
    </button>
  </div>
  <div class="dp-fields-sortable" data-id_group={product_group.id} use:sortable={{id_group: product_group.id, state}}>
    {#each fields_list as field (field.id)}
      {#if field.id_group === product_group.id}
        <div class="dp_equation_field" data-id={field.id}>
          {field.name}
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .product-group {
    border: 1px solid #EEE;
    min-width: 200px;
    margin-bottom: 10px;
  }

  .product-group-header {
    background-color: #EEE;
    padding: 5px 10px;
    font-weight: bold;
  }

  .delete-group, .reorder-group {
    float: right;
    display: none;
    margin-left: 5px;
  }

  .product-group:hover .delete-group,
  .product-group:hover .reorder-group {
    display: inline-block;
  }

</style>