<script module lang="ts">
  import { echarts } from '../echarts.js';
  import { CandlestickChart as EcCandlestickChart } from 'echarts/charts';
  echarts.use([EcCandlestickChart]);
</script>

<script lang="ts">
  import ChartCanvas from '../components/chart/chart-canvas.svelte';
  import { deepMerge, type ResolvedTheme } from '../theme.js';
  import type { CanvasProps } from './types.js';

  type Props = CanvasProps & {
    x: string[];
    /** Per category: `[open, close, low, high]`. Up candles use `--chart-positive`, down `--chart-negative`. */
    data: [number, number, number, number][];
    name?: string;
  };

  let { ref = $bindable(null), x, data, name = 'Price', option = {}, ...rest }: Props = $props();

  const built = $derived((t: ResolvedTheme) =>
    deepMerge(
      {
        xAxis: { type: 'category', data: x, boundaryGap: true },
        yAxis: { type: 'value', scale: true },
        series: [
          {
            type: 'candlestick',
            name,
            data,
            barMaxWidth: 16,
            itemStyle: { color: t.positive, color0: t.negative, borderColor: t.positive, borderColor0: t.negative }
          }
        ]
      },
      option
    )
  );
</script>

<ChartCanvas bind:ref option={built} {...rest} />
