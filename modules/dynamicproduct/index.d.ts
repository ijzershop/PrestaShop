declare module "*.scss" {
  const css: { [key: string]: string };
  export default css;
}

declare module "*.svelte" {
  export { SvelteComponentDev as default } from "svelte/internal";
}

declare module "*.css";
