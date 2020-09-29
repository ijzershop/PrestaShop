import { writable } from "svelte/store";

function createStore(items) {
  const {subscribe, set, update} = writable(items);

  return {
    set,
    update,
    subscribe,
    setFieldGroup: (id_field, id_group) => {
      return update((state) => {
        window.dp_fields[id_field].id_group = id_group;
        state.fields[id_field].id_group = id_group;
        return state;
      });
    },
    updateFields: (fields) => {
      return update((state) => {
        state.fields = fields;
        return state;
      });
    }
  };
}

export { createStore };