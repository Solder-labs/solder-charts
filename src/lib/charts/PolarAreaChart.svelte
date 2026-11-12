<script lang="ts">
  import ChartCanvas from '../components/chart/chart-canvas.svelte';
  import { deepMerge } from '../theme.js';
  import type { CanvasProps } from './types.js';

  type Props = CanvasProps & { data: { name: string; value: number; color?: string }[] };

  let { ref = $bindable(null), data, option = {}, ...rest }: Props = $props();

  const built = $derived(
    deepMerge(
      {
        tooltip: { trigger: 'item' },
        series: [
          {
            type: 'pie',
            roseType: 'area',
            radius: ['10%', '80%'],
            itemStyle: { borderRadius: 6 },
            label: { show: false },
            data: data.map((d) => ({ name: d.name, value: d.value, ...(d.color ? { itemStyle: { color: d.color } } : {}) }))
          }
        ]
      },
      option
    )
  );
</script>

<ChartCanvas bind:ref option={built} {...rest} />
