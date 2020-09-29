import { writable } from "svelte/store";

function createStore(exec_orders) {
  const {subscribe, set, update} = writable(exec_orders);

  return {
    set,
    update,
    subscribe,
    updateItem: (exec_order) => {
      return update((exec_orders) => {
        exec_orders[exec_order.id] = exec_order;
        return exec_orders;
      });
    },
    deleteItem: (exec_order) => {
      return update((exec_orders) => {
        delete exec_orders[exec_order.id];
        return exec_orders;
      });
    },
    resetToDefault: () => set({})
  };
}

export { createStore };