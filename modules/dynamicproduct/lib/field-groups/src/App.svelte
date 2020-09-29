<!--suppress UnnecessaryLabelJS, LabeledStatementJS -->
<script>
  import { createStore } from "./store/store";
  import { PostHelper } from "@lib/utils/post-helper";
  import { dp_trans } from "@lib/utils/trans-helper";
  import Fields from "./Fields.svelte";
  import ProductGroups from "./ProductGroups.svelte";
  import Groups from "./Groups.svelte";

  const state = createStore({
    fields: window.dp_fields
  });
  const postHelper = new PostHelper();

  async function fetchGroups() {
    const response = await postHelper.post(dp_product_field_groups, {
      action: "get_field_groups",
      no_msg: true
    });
    $state.field_groups = response.field_groups;
    $state.product_field_groups = response.product_field_groups;
    return response;
  }

  jQuery.subscribe([dpTopics.FIELD_SAVED, dpTopics.FIELD_DELETED, dpTopics.FIELDS_UPDATED].join(" "), () => {
    $state.fields = window.dp_fields;
  });

</script>

<div>
  {#await fetchGroups()}
    <p class="alert alert-info">
      {dp_trans("Loading data")}...
    </p>
  {:then _}
    <Groups {state} refresh={fetchGroups} />
    <ProductGroups {state} />
    <Fields {state} />
  {/await}
</div>

<style>
  :global(.dp-list-group) {
    border: 1px solid #bbcdd2;
    padding: 20px;
    margin-bottom: 20px;
  }
</style>
