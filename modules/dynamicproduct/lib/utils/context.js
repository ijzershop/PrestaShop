const dp_stores = window.dp_stores || {};

function getStore(name) {
  const store = dp_stores[name];
  if (!store) {
    throw `store ${name} not found`;
  }
  return store;
};

function saveStore(name, store) {
  dp_stores[name] = store;
}

export { getStore, saveStore };