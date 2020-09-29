function selectAll(node) {
  node.onclick = () => {
    node.select();
  };
}

export { selectAll };