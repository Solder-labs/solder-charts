<script lang="ts">
  import ChartCanvas from '../components/chart/chart-canvas.svelte';
  import { deepMerge } from '../theme.js';
  import type { CanvasProps } from './types.js';

  type Props = CanvasProps & {
    data: { name: string; value: number; color?: string }[];
    /** Inner/outer radius, e.g. ['62%', '88%']. */
    radius?: [string, string];
  };

  let { ref = $bindable(null), data, radius = ['62%', '88%'], option = {}, ...rest }: Props = $props();

  const built = $derived(
    deepMerge(
      {
        tooltip: { trigger: 'item' },
        series: [
          {
            type: 'pie',
            radius,
            padAngle: 2,
            itemStyle: { borderRadius: 6, borderWidth: 0 },
            label: { show: false },
            emphasis: { scaleSize: 4 },
            data: data.map((d) => ({
              name: d.name,
              value: d.value,
              ...(d.color ? { itemStyle: { color: d.color } } : {})
            }))
          }
        ]
      },
      option
    )
  );
</script>

<ChartCanvas bind:ref option={built} {...rest} />
