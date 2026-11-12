<script lang="ts">
  import { echarts, type EChartsInstance, type EChartsOption } from '../../echarts.js';
  import { baseOption, deepMerge, resolveTheme, toPlain, type ResolvedTheme } from '../../theme.js';
  import type { PartProps } from '../../types.js';
  import { getChartContext, type LegendItem } from './context.svelte.js';

  type Props = Omit<PartProps<HTMLDivElement>, 'children' | 'child'> & {
    /**
     * The ECharts option, merged on top of the CSS-variable derived base theme.
     * Pass a function to receive the resolved theme (palette, colours) and build theme-aware options.
     */
    option: EChartsOption | ((theme: ResolvedTheme) => EChartsOption);
    renderer?: 'canvas' | 'svg';
    /** The underlying ECharts instance (bindable) for imperative access. */
    chart?: EChartsInstance;
    onready?: (chart: EChartsInstance) => void;
  };

  let {
    ref = $bindable(null),
    chart = $bindable(),
    option,
    renderer = 'canvas',
    onready,
    ...rest
  }: Props = $props();

  const ctx = getChartContext();
  let theme = $state<ResolvedTheme>();
  let selected: Record<string, boolean> = {};

  $effect(() => {
    const el = ref;
    if (!el) return;
    const inst = echarts.init(el, null, { renderer });
    chart = inst;
    if (ctx) ctx.chart = inst;
    theme = resolveTheme(el);

    const refresh = () => (theme = resolveTheme(el));
    const resize = new ResizeObserver(() => inst.resize());
    resize.observe(el);
    const mutations = new MutationObserver(refresh);
    mutations.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-theme']
    });
    const media = matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', refresh);

    inst.on('legendselectchanged', (e: unknown) => {
      selected = (e as { selected: Record<string, boolean> }).selected;
      if (ctx) ctx.items = ctx.items.map((i) => ({ ...i, active: selected[i.name] !== false }));
    });
    const nameOf = (e: unknown) => {
      const p = e as { componentSubType?: string; name?: string; seriesName?: string };
      return p.componentSubType === 'pie' || p.componentSubType === 'radar' || byData ? p.name : p.seriesName;
    };
    inst.on('mouseover', (e: unknown) => ctx?.highlight(nameOf(e) ?? null));
    inst.on('mouseout', () => ctx?.highlight(null));
    onready?.(inst);

    return () => {
      resize.disconnect();
      mutations.disconnect();
      media.removeEventListener('change', refresh);
      inst.dispose();
      chart = undefined;
      if (ctx) ctx.chart = undefined;
    };
  });

  // Mirror the shared highlight (e.g. a hovered legend item) onto the chart.
  let lastHighlight: string | null = null;
  let byData = false;
  $effect(() => {
    const name = ctx?.highlighted ?? null;
    const inst = chart;
    if (!inst || !theme) return;
    const target = (n: string) =>
      byData ? { seriesIndex: 0, name: n } : { seriesName: n };
    if (lastHighlight && lastHighlight !== name) inst.dispatchAction({ type: 'downplay', ...target(lastHighlight) });
    if (name && name !== lastHighlight) inst.dispatchAction({ type: 'highlight', ...target(name) });
    lastHighlight = name;
  });

  function legendItems(merged: any, t: ResolvedTheme): LegendItem[] {
    const series: any[] = [merged.series ?? []].flat();
    const colorAt = (i: number) => t.palette[i % t.palette.length];
    const items: LegendItem[] = [];
    byData = series[0]?.type === 'pie' || series[0]?.type === 'radar' || series[0]?.colorBy === 'data';
    if (byData) {
      for (const [i, d] of ((series[0].data ?? []) as any[]).entries())
        items.push({ name: d.name, color: d.itemStyle?.color ?? colorAt(i), active: selected[d.name] !== false });
    } else {
      for (const [i, s] of series.entries()) {
        if (s.name == null) continue;
        const c = s.itemStyle?.color ?? s.lineStyle?.color;
        items.push({ name: s.name, color: typeof c === 'string' ? c : colorAt(i), active: selected[s.name] !== false });
      }
    }
    return items;
  }

  $effect(() => {
    if (!chart || !theme) return;
    const user = (typeof option === 'function' ? option(theme) : toPlain(option)) as EChartsOption;
    const merged: any = deepMerge(baseOption(theme), user);
    merged.legend = { ...merged.legend, show: false, selected };
    chart.setOption(merged, { notMerge: true });
    if (ctx) ctx.items = legendItems(merged, theme);
  });
</script>

<div bind:this={ref} data-chart-canvas="" role="img" aria-labelledby={ctx?.hasTitle ? ctx.titleId : undefined} aria-describedby={ctx?.hasDescription ? ctx.descriptionId : undefined} {...rest}></div>
