function draggable(node) {
  jQuery(node).draggable({
    revert: "invalid",
    helper: "clone",
  });
}

export { draggable };