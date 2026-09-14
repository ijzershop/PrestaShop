import type { Writable } from "svelte/store";

declare type Updater<T> = (value: T) => T;

export type SvelteStore<T> = Writable<T>

export interface VegemiteStore<T> extends SvelteStore<T> {
  on(event, handle: (state: T, event) => void, initial?: boolean);

  dispatch(topic, updater?: Updater<T> | T, event?);

  listen(subscriber: () => void);

  listen(event, subscriber: () => void);

  pick?<T>(path: string): SvelteStore<T>;
}
