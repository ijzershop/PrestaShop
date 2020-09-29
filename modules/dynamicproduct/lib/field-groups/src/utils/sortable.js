import { PostHelper } from "@lib/utils/post-helper";

const postHelper = new PostHelper();

let getNewPositions = function () {
  let newPositions = {};
  jQuery("#dp_field_groups_container .dp-fields-sortable .dp_equation_field").each((index, element) => {
    newPositions[index + 1] = $(element).data("id");
  });
  return newPositions;
};

async function saveNewPositions(newPositions) {
  await postHelper.post(dp_product_fields, {
    action: "save_fields_order",
    order: newPositions,
  });
  jQuery.publish(dpTopics.RELOAD_FIELDS);
}

function sortable(node, {id_group, state}) {
  const jqNode = jQuery(node);
  jqNode.sortable({
    placeholder: "dp_field_highlight dp_equation_field",
    revert: 200,
    opacity: .8,
    connectWith: ".dp-fields-sortable",
    start: (event, ui) => {
      ui.placeholder.html(ui.helper.html());
    },
    stop: (event, ui) => {
      const id_field = ui.item.data("id");
      if (jqNode.find(`.dp_equation_field[data-id=${id_field}]`).length) {
        const newPositions = getNewPositions();
        saveNewPositions(newPositions);
        updatePositions(state, newPositions);
      }
    },
    receive: async (event, ui) => {
      const id_field = ui.item.data("id");
      const current_group = dp_fields[id_field] && dp_fields[id_field].id_group;
      if (current_group !== id_group) {
        const newPositions = getNewPositions();
        await Promise.all([
          postHelper.post(dp_product_field_groups, {
            action: "save_field_group",
            no_msg: true,
            id_group,
            id_field,
          }),
          saveNewPositions(newPositions)
        ]);
        updatePositions(state, newPositions);
        state.setFieldGroup(id_field, id_group);
      }
    },
  }).disableSelection();
}

function updatePositions(state, newPositions) {
  for (const position in newPositions) {
    if (newPositions.hasOwnProperty(position)) {
      const id_field = newPositions[position];
      if (window.dp_fields[id_field]) {
        window.dp_fields[id_field].position = position;
      }
    }
  }
  state.updateFields(window.dp_fields);
}

export { sortable };