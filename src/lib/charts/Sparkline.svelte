<script lang="ts">
  import ChartCanvas from '../components/chart/chart-canvas.svelte';
  import { deepMerge } from '../theme.js';
  import type { CanvasProps } from './types.js';

  type Props = CanvasProps & {
    data: number[];
    area?: boolean;
    color?: string;
    smooth?: boolean;
  };

  let { ref = $bindable(null), data, area = true, color, smooth = true, option = {}, ...rest }: Props = $props();

  const built = $derived(
    deepMerge(
      {
        grid: { left: 0, right: 0, top: 2, bottom: 2, containLabel: false },
        xAxis: { type: 'category', show: false, boundaryGap: false, data: data.map((_, i) => i) },
        yAxis: { type: 'value', show: false, scale: true },
        tooltip: { show: false },
        series: [
          {
            type: 'line',
            data,
            smooth,
            showSymbol: false,
            silent: true,
            lineStyle: { width: 1.5, ...(color ? { color } : {}) },
            ...(color ? { itemStyle: { color } } : {}),
            ...(area ? { areaStyle: { opacity: 0.12 } } : {})
          }
        ]
      },
      option
    )
  );
</script>

<ChartCanvas bind:ref option={built} data-sparkline="" {...rest} />
