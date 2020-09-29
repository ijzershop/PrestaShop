import { writable } from "svelte/store";

function createGridsStore(grids) {
  const {subscribe, set, update} = writable(grids);

  return {
    set,
    update,
    subscribe,
    updateGrid: (grid) => {
      return update((grids) => {
        grids[grid.id] = grid;
        return grids;
      });
    },
    deleteGrid: (grid) => {
      return update((grids) => {
        delete grids[grid.id];
        return grids;
      });
    },

    getValue: (grids, id_grid, id_column, id_row) => {
      const grid = grids[id_grid];
      if (!grid) {
        return null;
      }
      const grid_value = Object.values(grid.values).find((value) => value.id_grid_column === id_column && value.id_grid_row === id_row);
      return grid_value ? grid_value.value : null;
    }
  };
}

export { createGridsStore };