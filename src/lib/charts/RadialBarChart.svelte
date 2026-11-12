<script module lang="ts">
  import { echarts } from '../echarts.js';
  import { PolarComponent } from 'echarts/components';
  echarts.use([PolarComponent]);
</script>

<script lang="ts">
  import ChartCanvas from '../components/chart/chart-canvas.svelte';
  import { deepMerge, type ResolvedTheme } from '../theme.js';
  import type { CanvasProps } from './types.js';

  type Props = CanvasProps & {
    /** One ring per entry. Values are measured against `max`. */
    data: { name: string; value: number; color?: string }[];
    max?: number;
  };

  let { ref = $bindable(null), data, max = 100, option = {}, ...rest }: Props = $props();

  const built = $derived((t: ResolvedTheme) =>
    deepMerge(
      {
        tooltip: { trigger: 'item' },
        polar: { radius: ['18%', '92%'] },
        angleAxis: { max, startAngle: 90, show: false },
        radiusAxis: { type: 'category', data: data.map((d) => d.name), show: false },
        series: [
          {
            type: 'bar',
            coordinateSystem: 'polar',
            colorBy: 'data',
            roundCap: true,
            showBackground: true,
            backgroundStyle: { color: t.grid, opacity: 0.5 },
            data: data.map((d) => ({ name: d.name, value: d.value, ...(d.color ? { itemStyle: { color: d.color } } : {}) }))
          }
        ]
      },
      option
    )
  );
</script>

<ChartCanvas bind:ref option={built} {...rest} />
