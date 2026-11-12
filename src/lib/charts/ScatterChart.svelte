<script lang="ts">
  import { echarts } from '../echarts.js';
  import ChartCanvas from '../components/chart/chart-canvas.svelte';
  import { deepMerge } from '../theme.js';
  import type { CanvasProps } from './types.js';

  type Props = CanvasProps & {
    /** Each series is a named cloud of `[x, y]` points. */
    series: { name: string; data: [number, number][]; color?: string }[];
    symbolSize?: number;
  };

  let { ref = $bindable(null), series, symbolSize = 10, option = {}, ...rest }: Props = $props();

  const built = $derived(
    deepMerge(
      {
        tooltip: { trigger: 'item' },
        xAxis: { type: 'value', scale: true, splitLine: { show: false } },
        yAxis: { type: 'value', scale: true },
        series: series.map((s) => ({
          type: 'scatter',
          name: s.name,
          data: s.data,
          symbolSize,
          itemStyle: { opacity: 0.8, ...(s.color ? { color: s.color } : {}) },
          emphasis: { focus: 'series' }
        }))
      },
      option
    )
  );
</script>

<ChartCanvas bind:ref option={built} {...rest} />
