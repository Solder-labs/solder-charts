import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

/**
 * bits-ui style part props: every part is a plain element that accepts `class`,
 * any HTML attribute, a bindable `ref`, and an optional `child` snippet that lets
 * you render your own element while receiving the merged props.
 */
export type PartProps<T extends HTMLElement = HTMLElement> = Omit<HTMLAttributes<T>, 'children'> & {
  ref?: T | null;
  children?: Snippet;
  child?: Snippet<[{ props: Record<string, unknown> }]>;
};
