<!--suppress UnnecessaryLabelJS, LabeledStatementJS, JSUnusedAssignment -->
<script>
  export let state;
  export let refresh;

  import { PostHelper } from "@lib/utils/post-helper";
  import { dp_trans } from "@lib/utils/trans-helper";

  let id_group;

  const postHelper = new PostHelper();

  async function insertGroup() {
    const response = await postHelper.post(dp_product_field_groups, {
      action: "insert_group",
      id_group,
    });
    $state.product_field_groups = response.product_field_groups;
  }

  $: groups_list = Object.values($state.field_groups || {});
</script>

<div class="groups-list dp-list-group">
    {#if groups_list.length}
      <label class="dp_main_label">{dp_trans("Available groups")}:</label>
      <div>
        <select bind:value={id_group} data-cy="field-groups">
            {#each groups_list as field_group}
              <option value={field_group.id}>{field_group.label}</option>
            {/each}
        </select>
        <button data-cy="insert-group" class="btn btn-primary" on:click={insertGroup}>{dp_trans("Insert field group")}</button>
        <a class="btn btn-default btn-outline-primary" href="{window.dp_module_link}#dp_field_groups_data" target="_blank">
            {dp_trans("Manage field groups")}
        </a>
        <button on:click={refresh} class="btn btn-default btn-small btn-primary" title={dp_trans("Refresh")}>
          <i class="material-icons">refresh</i>
        </button>
      </div>
    {:else}
      <p class="alert alert-info">
          {dp_trans("No field groups configured yet!")}
        <a class="btn btn-success" target="_blank" href="{window.dp_module_link}&display_add_field_group">{dp_trans("add a new field group")}</a>
      </p>
    {/if}
</div>