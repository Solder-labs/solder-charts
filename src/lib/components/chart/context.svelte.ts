import { getContext, setContext } from 'svelte';
import type { EChartsInstance } from '../../echarts.js';

export interface LegendItem {
  name: string;
  color: string;
  active: boolean;
}

export interface ChartContext {
  chart: EChartsInstance | undefined;
  items: LegendItem[];
  /** Name of the series / slice currently hovered in the chart or the legend. */
  highlighted: string | null;
  hasTitle: boolean;
  hasDescription: boolean;
  toggle(name: string): void;
  highlight(name: string | null): void;
  titleId: string;
  descriptionId: string;
}

const KEY = Symbol('solder-chart');

/** Creates and registers the shared chart context. Used by `Chart.Root` and `Chart.LegendScope`. */
export function createChartContext(uid: string): ChartContext {
  const ctx: ChartContext = $state({
    chart: undefined,
    items: [],
    highlighted: null,
    hasTitle: false,
    hasDescription: false,
    toggle(name) {
      ctx.chart?.dispatchAction({ type: 'legendToggleSelect', name });
    },
    highlight(name) {
      ctx.highlighted = name;
    },
    titleId: `${uid}-title`,
    descriptionId: `${uid}-description`
  });
  setContext(KEY, ctx);
  return ctx;
}

export const getChartContext = (): ChartContext | undefined => getContext(KEY);
