<script lang="ts">
  import ChartCanvas from '../components/chart/chart-canvas.svelte';
  import { deepMerge } from '../theme.js';
  import type { CanvasProps } from './types.js';

  type Props = CanvasProps & {
    data: { name: string; value: number; color?: string }[];
    radius?: string | [string, string];
  };

  let { ref = $bindable(null), data, radius = '75%', option = {}, ...rest }: Props = $props();

  const built = $derived(
    deepMerge(
      {
        tooltip: { trigger: 'item' },
        series: [
          {
            type: 'pie',
            radius,
            padAngle: 1,
            itemStyle: { borderRadius: 4 },
            label: { show: false },
            emphasis: { scaleSize: 4 },
            data: data.map((d) => ({ name: d.name, value: d.value, ...(d.color ? { itemStyle: { color: d.color } } : {}) }))
          }
        ]
      },
      option
    )
  );
</script>

<ChartCanvas bind:ref option={built} {...rest} />
