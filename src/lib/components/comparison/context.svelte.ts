import { getContext, setContext } from 'svelte';

export interface ComparisonContext {
  readonly current: number;
  readonly previous: number;
  readonly format: (v: number) => string;
  /** Percentage change, or null when `previous` is 0. */
  readonly delta: number | null;
}

const KEY = Symbol('solder-comparison');
export const setComparisonContext = (c: ComparisonContext) => setContext(KEY, c);
export const getComparisonContext = () => getContext<ComparisonContext | undefined>(KEY);
