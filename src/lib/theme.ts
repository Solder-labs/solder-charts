import type { EChartsOption } from './echarts.js';

/** CSS custom properties read from the chart element. Override any of them in your own CSS. */
export interface ResolvedTheme {
  palette: string[];
  text: string;
  muted: string;
  grid: string;
  axis: string;
  surface: string;
  positive: string;
  negative: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipText: string;
  fontFamily: string;
  fontSize: number;
}

export const PALETTE_SIZE = 8;

function read(style: CSSStyleDeclaration, name: string, fallback: string): string {
  const v = style.getPropertyValue(name).trim();
  return v || fallback;
}

export function resolveTheme(el: Element): ResolvedTheme {
  const s = getComputedStyle(el);
  const palette = Array.from({ length: PALETTE_SIZE }, (_, i) =>
    read(s, `--chart-color-${i + 1}`, '#6366f1')
  );
  return {
    palette,
    text: read(s, '--chart-text', '#18181b'),
    muted: read(s, '--chart-muted', '#71717a'),
    grid: read(s, '--chart-grid', '#e4e4e7'),
    axis: read(s, '--chart-axis', '#d4d4d8'),
    surface: read(s, '--chart-surface', '#ffffff'),
    positive: read(s, '--chart-positive', '#059669'),
    negative: read(s, '--chart-negative', '#dc2626'),
    tooltipBg: read(s, '--chart-tooltip-bg', '#ffffff'),
    tooltipBorder: read(s, '--chart-tooltip-border', '#e4e4e7'),
    tooltipText: read(s, '--chart-tooltip-text', '#18181b'),
    fontFamily: read(s, '--chart-font', 'inherit'),
    fontSize: parseFloat(read(s, '--chart-font-size', '12')) || 12
  };
}

/** The base ECharts option derived from the CSS theme. User options are merged on top. */
export function baseOption(t: ResolvedTheme): EChartsOption {
  const axisLabel = { color: t.muted, fontFamily: t.fontFamily, fontSize: t.fontSize };
  return {
    color: t.palette,
    backgroundColor: 'transparent',
    textStyle: { fontFamily: t.fontFamily, fontSize: t.fontSize, color: t.text },
    animationDuration: 500,
    grid: { left: 8, right: 8, top: 16, bottom: 8, containLabel: true },
    categoryAxis: {
      axisLine: { lineStyle: { color: t.axis } },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel
    },
    valueAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: t.grid, type: [4, 4] } },
      axisLabel
    },
    legend: { show: false },
    tooltip: {
      trigger: 'axis',
      backgroundColor: t.tooltipBg,
      borderColor: t.tooltipBorder,
      borderWidth: 1,
      padding: [8, 12],
      textStyle: { color: t.tooltipText, fontFamily: t.fontFamily, fontSize: t.fontSize },
      axisPointer: { lineStyle: { color: t.axis }, crossStyle: { color: t.axis } },
      extraCssText:
        'border-radius: var(--chart-tooltip-radius, 8px); box-shadow: var(--chart-tooltip-shadow, 0 4px 12px rgb(0 0 0 / .08));'
    }
  } as EChartsOption;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v) && Object.getPrototypeOf(v) === Object.prototype;
}

/** Keys whose arrays are merged element-by-element (so `series: [{ smooth: false }]` tweaks the first series). */
const INDEXED = new Set(['series', 'xAxis', 'yAxis', 'visualMap', 'radar', 'polar']);

/**
 * Deep-merge plain objects. Arrays replace, except under {@link INDEXED} keys where
 * array items are merged by index and extra base items are kept.
 */
export function deepMerge<T>(a: T, b: unknown, key?: string): T {
  if (Array.isArray(a) && Array.isArray(b) && key && INDEXED.has(key)) {
    const out: unknown[] = [...a];
    b.forEach((item, i) => (out[i] = i < a.length ? deepMerge(a[i], item) : item));
    return out as T;
  }
  if (!isPlainObject(a) || !isPlainObject(b)) return (b === undefined ? a : b) as T;
  const out: Record<string, unknown> = { ...a };
  for (const k of Object.keys(b)) out[k] = deepMerge((a as Record<string, unknown>)[k], b[k], k);
  return out as T;
}

/** Clones plain objects/arrays (unwrapping Svelte proxies) while keeping functions and class instances as-is. */
export function toPlain<T>(v: T): T {
  if (Array.isArray(v)) return v.map(toPlain) as T;
  if (isPlainObject(v)) {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(v)) out[k] = toPlain(v[k]);
    return out as T;
  }
  return v;
}
