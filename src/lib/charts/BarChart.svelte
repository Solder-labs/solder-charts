<script lang="ts">
  import ChartCanvas from '../components/chart/chart-canvas.svelte';
  import { deepMerge } from '../theme.js';
  import { cartesianOption } from './cartesian.js';
  import type { CartesianChartProps } from './types.js';

  let { ref = $bindable(null), data, x, series, smooth, stacked, option = {}, ...rest }: CartesianChartProps = $props();

  const built = $derived(
    deepMerge(cartesianOption({ data, x, series, smooth, stacked, type: 'bar', area: false }), option)
  );
</script>

<ChartCanvas bind:ref option={built} {...rest} />
