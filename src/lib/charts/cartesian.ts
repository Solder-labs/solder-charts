import type { EChartsOption } from '../echarts.js';

export interface SeriesDef {
  /** Key in each data row. */
  key: string;
  /** Display name (legend / tooltip). Defaults to `key`. */
  label?: string;
  /** Explicit colour; otherwise taken from `--chart-color-N`. */
  color?: string;
  /** Per-series type, used by `MixedChart`. */
  type?: 'line' | 'bar';
  /** Plot against the right-hand value axis (`MixedChart`). */
  axis?: 'left' | 'right';
}

export type Row = Record<string, string | number | null>;

export interface CartesianOptions {
  data: Row[];
  /** Key of the category (x axis) field. */
  x: string;
  series: SeriesDef[];
  type: 'line' | 'bar' | 'mixed';
  area?: boolean;
  smooth?: boolean;
  stacked?: boolean;
}

export function cartesianOption(o: CartesianOptions): EChartsOption {
  const typeOf = (s: SeriesDef): 'line' | 'bar' => s.type ?? (o.type === 'mixed' ? 'line' : o.type);
  const hasBar = o.series.some((s) => typeOf(s) === 'bar');
  const hasRight = o.series.some((s) => s.axis === 'right');
  return {
    xAxis: { type: 'category', data: o.data.map((r) => r[o.x]), boundaryGap: hasBar },
    yAxis: hasRight ? [{ type: 'value' }, { type: 'value', splitLine: { show: false } }] : { type: 'value' },
    series: o.series.map((s) => ({
      type: typeOf(s),
      ...(s.axis === 'right' ? { yAxisIndex: 1 } : {}),
      name: s.label ?? s.key,
      data: o.data.map((r) => r[s.key]),
      ...(o.stacked ? { stack: 'total' } : {}),
      ...(typeOf(s) === 'line'
        ? {
            smooth: o.smooth ?? true,
            showSymbol: false,
            symbolSize: 8,
            lineStyle: { width: 2 },
            ...(o.area ? { areaStyle: { opacity: 0.12 } } : {})
          }
        : { barMaxWidth: 28, itemStyle: { borderRadius: o.stacked ? 0 : [4, 4, 0, 0] } }),
      ...(s.color ? { itemStyle: { color: s.color }, lineStyle: { color: s.color, width: 2 } } : {}),
      emphasis: { focus: 'series' }
    }))
  } as EChartsOption;
}
