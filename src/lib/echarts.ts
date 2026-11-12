/**
 * Tree-shaken ECharts setup. Only the pieces this package needs are registered;
 * if you need more (radar, heatmap, ...) register them yourself via `echarts.use(...)`
 * from `echarts/core` — the registry is shared.
 */
import * as echarts from 'echarts/core';
import { LineChart, BarChart, PieChart, ScatterChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  AriaComponent,
  MarkLineComponent,
  MarkPointComponent
} from 'echarts/components';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';

echarts.use([
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  AriaComponent,
  MarkLineComponent,
  MarkPointComponent,
  CanvasRenderer,
  SVGRenderer
]);

/** Escapes user-provided text for use in tooltip HTML formatters. */
export const escapeHtml = (v: unknown) => echarts.format.encodeHTML(String(v));

export { echarts };
export type EChartsInstance = ReturnType<typeof echarts.init>;
export type EChartsOption = Parameters<EChartsInstance['setOption']>[0];
