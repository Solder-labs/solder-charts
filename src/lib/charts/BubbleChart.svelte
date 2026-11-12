<script lang="ts">
  import ChartCanvas from '../components/chart/chart-canvas.svelte';
  import { deepMerge } from '../theme.js';
  import type { CanvasProps } from './types.js';

  type Props = CanvasProps & {
    /** Each series is a named set of `[x, y, size]` points. Area scales with `size`. */
    series: { name: string; data: [number, number, number][]; color?: string }[];
    minSize?: number;
    maxSize?: number;
  };

  let { ref = $bindable(null), series, minSize = 8, maxSize = 48, option = {}, ...rest }: Props = $props();

  const built = $derived.by(() => {
    const sizes = series.flatMap((s) => s.data.map((d) => d[2]));
    const max = Math.max(1, ...sizes);
    const scale = (v: number[]) => minSize + (maxSize - minSize) * Math.sqrt(Math.max(0, v[2]) / max);
    return deepMerge(
      {
        tooltip: { trigger: 'item' },
        xAxis: { type: 'value', scale: true, splitLine: { show: false } },
        yAxis: { type: 'value', scale: true },
        series: series.map((s) => ({
          type: 'scatter',
          name: s.name,
          data: s.data,
          symbolSize: scale,
          itemStyle: { opacity: 0.6, ...(s.color ? { color: s.color } : {}) },
          emphasis: { focus: 'series', itemStyle: { opacity: 0.9 } }
        }))
      },
      option
    );
  });
</script>

<ChartCanvas bind:ref option={built} {...rest} />
