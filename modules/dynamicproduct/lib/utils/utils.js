function shallow(obj) {
  const copy = Object.assign({}, obj);
  for (let prop in copy) {
    if (typeof copy[prop] === "object") {
      delete copy[prop];
    }
  }
  return copy;
}

export { shallow };