function reorder(objects) {
  let result = [];
  for (let id in objects) {
    const obj = objects[id];
    result[obj.position] = obj;
  }
  return Object.values(result);
}

export { reorder };
