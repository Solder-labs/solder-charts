<script module lang="ts">
  import { echarts } from '../echarts.js';
  import { HeatmapChart as EcHeatmapChart } from 'echarts/charts';
  import { VisualMapComponent } from 'echarts/components';
  echarts.use([EcHeatmapChart, VisualMapComponent]);
</script>

<script lang="ts">
  import { escapeHtml } from '../echarts.js';
  import ChartCanvas from '../components/chart/chart-canvas.svelte';
  import { deepMerge, type ResolvedTheme } from '../theme.js';
  import type { CanvasProps } from './types.js';

  type Props = CanvasProps & {
    x: string[];
    y: string[];
    /** Cells as `[xIndex, yIndex, value]`. */
    data: [number, number, number][];
    min?: number;
    max?: number;
    name?: string;
  };

  let { ref = $bindable(null), x, y, data, min, max, name = 'Value', option = {}, ...rest }: Props = $props();

  const built = $derived((t: ResolvedTheme) => {
    const values = data.map((d) => d[2]);
    return deepMerge(
      {
        grid: { left: 8, right: 8, top: 8, bottom: 8, containLabel: true },
        tooltip: {
          trigger: 'item',
          formatter: (p: { value: [number, number, number] }) =>
            `${escapeHtml(x[p.value[0]])} · ${escapeHtml(y[p.value[1]])}<br/><b>${escapeHtml(p.value[2])}</b>`
        },
        xAxis: { type: 'category', data: x, splitArea: { show: false }, axisLine: { show: false } },
        yAxis: { type: 'category', data: y, splitArea: { show: false }, axisLine: { show: false }, splitLine: { show: false } },
        visualMap: {
          show: false,
          min: min ?? Math.min(0, ...values),
          max: max ?? Math.max(1, ...values),
          inRange: { color: [t.grid, t.palette[0]] }
        },
        series: [
          {
            type: 'heatmap',
            name,
            data,
            itemStyle: { borderRadius: 4, borderColor: t.surface, borderWidth: 2 },
            emphasis: { itemStyle: { borderColor: t.text } }
          }
        ]
      },
      option
    );
  });
</script>

<ChartCanvas bind:ref option={built} {...rest} />
