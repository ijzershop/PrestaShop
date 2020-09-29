import App from "./App.svelte";

let app;


window.addEventListener("DOMContentLoaded", () => {
  // only inject when we're inside a product page
  if (typeof dp_id_product === "number") {
    app = new App({
      target: document.getElementById("dp_field_groups_container")
    });
  }
});
