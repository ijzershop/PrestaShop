import type { VegemiteStore } from "@tunisoft/dynamicproduct/stores/svelte-store";
import { cloneDeep } from "utils/utils";
import { writable } from "svelte/store";
import { isEqual } from "utils";
import type { Store } from "vegemite";
import vegemite from "vegemite";

export function writableStore<T>(value: T): VegemiteStore<T> {

  const veg: Store<any, any> = vegemite(value);

  let subscribeFunctions = [];

  function set(newValue, event = null) {
    value = newValue;
    veg.set(value, event);
    subscribeFunctions.forEach((func) => func(newValue));
  }

  function dispatch(topic, arg, event = null) {
    if (typeof arg !== "undefined") {
      if (typeof arg === "function") {
        value = arg(value);
        set(value, event);
      } else {
        if (typeof arg === "object") {
          set({ ...value, ...arg }, event);
        } else {
          set(arg, event);
        }
      }
    }
    veg.dispatch(topic, event);
  }

  function update(callback) {
    set(callback(value));
  }

  function subscribe(callback) {
    subscribeFunctions.push(callback);
    callback(value);

    return function() {
      subscribeFunctions =
        subscribeFunctions.filter((func) => callback !== func);
    };
  }

  function on(event, handle, initial = true) {
    if (initial) {
      handle(value);
    }
    return veg.on(event, (_, eventData) => {
      handle(value, eventData);
    });
  }

  function pick(path: string) {

    let current_val = pickValue(value, path);
    let previous_val = current_val;

    function pickValue(data, obj_path) {
      const keys = obj_path.split(".");
      let root = data;
      let current_val = null;
      keys.forEach(key => {
        if (root) {
          current_val = root[key];
          root = current_val;
        }
      });
      return current_val;
    }

    const store = writable(current_val);

    subscribe((data) => {
      current_val = pickValue(data, path);
      if (!isEqual(current_val, previous_val)) {
        store.set(current_val);
      }
      previous_val = cloneDeep(current_val);
    });

    return store;
  }

  return { ...veg, set, update, subscribe, dispatch, pick, on };
}
