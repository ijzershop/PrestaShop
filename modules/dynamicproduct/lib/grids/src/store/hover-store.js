import { writable } from "svelte/store";

function createHoverStore(initial) {
  const {subscribe, set, update} = writable(initial);

  return {
    set,
    update,
    subscribe,
  };
}

export { createHoverStore };