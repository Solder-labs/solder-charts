import { getContext, setContext } from 'svelte';

export interface MeterContext {
  readonly value: number;
  readonly variant: 'bar' | 'blocks';
  readonly blocks: number;
  hasTitle: boolean;
  titleId: string;
}
const KEY = Symbol('solder-meter');
export const setMeterContext = (c: MeterContext) => setContext(KEY, c);
export const getMeterContext = () => getContext<MeterContext | undefined>(KEY);
