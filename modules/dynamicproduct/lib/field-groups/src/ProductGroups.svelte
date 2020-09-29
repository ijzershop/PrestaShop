<!--suppress UnnecessaryLabelJS, LabeledStatementJS, JSUnusedAssignment -->
<script>
  import ProductGroup from "./ProductGroup.svelte";

  export let state;

  import SortableList from "svelte-sortable-list";

  import { PostHelper } from "@lib/utils/post-helper";
  import { dp_trans } from "@lib/utils/trans-helper";
  import { reorder } from "@lib/utils/reorder";

  const postHelper = new PostHelper();

  $: product_groups_list = reorder($state.product_field_groups);

  async function sortList(ev) {
    product_groups_list = ev.detail.map((item, index) => {
      item.position = index + 1;
      return item;
    });
    await postHelper.post(dp_product_field_groups, {
      action: "reorder_groups",
      order: ev.detail.map(product_group => product_group.id),
    });
  }
</script>

<div class="product-groups-list dp-list-group">
  <label class="dp_main_label">{dp_trans("Field groups")}:</label>
  <div>
      <SortableList
        list={product_groups_list}
        key="id"
        on:sort={sortList}
        let:item={product_group}
      >
        <ProductGroup {product_group} {state} />
      </SortableList>
  </div>
</div>