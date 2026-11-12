<script module lang="ts">
  import { echarts } from '../echarts.js';
  import { BoxplotChart } from 'echarts/charts';
  echarts.use([BoxplotChart]);
</script>

<script lang="ts">
  import ChartCanvas from '../components/chart/chart-canvas.svelte';
  import { deepMerge, type ResolvedTheme } from '../theme.js';
  import type { CanvasProps } from './types.js';

  type Props = CanvasProps & {
    categories: string[];
    /** Per category: `[min, q1, median, q3, max]`. */
    data: [number, number, number, number, number][];
    name?: string;
  };

  let { ref = $bindable(null), categories, data, name = 'Distribution', option = {}, ...rest }: Props = $props();

  const built = $derived((t: ResolvedTheme) =>
    deepMerge(
      {
        tooltip: { trigger: 'item' },
        xAxis: { type: 'category', data: categories, boundaryGap: true },
        yAxis: { type: 'value', scale: true },
        series: [
          {
            type: 'boxplot',
            name,
            data,
            boxWidth: [12, 40],
            itemStyle: { color: 'transparent', borderColor: t.palette[0], borderWidth: 1.5 },
            emphasis: { itemStyle: { borderWidth: 2.5 } }
          }
        ]
      },
      option
    )
  );
</script>

<ChartCanvas bind:ref option={built} {...rest} />
