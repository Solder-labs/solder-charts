<script lang="ts">
  import ChartCanvas from '../components/chart/chart-canvas.svelte';
  import { deepMerge } from '../theme.js';
  import { cartesianOption } from './cartesian.js';
  import type { CartesianChartProps } from './types.js';

  /** Bars and lines on one plot. Set `type` ('bar' | 'line') and optionally `axis: 'right'` per series. */
  let { ref = $bindable(null), data, x, series, smooth, stacked, option = {}, ...rest }: CartesianChartProps = $props();

  const built = $derived(deepMerge(cartesianOption({ data, x, series, smooth, stacked, type: 'mixed' }), option));
</script>

<ChartCanvas bind:ref option={built} {...rest} />
