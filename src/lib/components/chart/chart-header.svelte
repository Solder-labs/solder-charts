<script lang="ts">
  import type { PartProps } from '../../types.js';
  import { getChartContext } from './context.svelte.js';

  let { ref = $bindable(null), children, child, ...rest }: PartProps<HTMLDivElement> = $props();
  const ctx = getChartContext();
  const merged = $derived({ 'data-chart-header': '', ...rest });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <div bind:this={ref} {...merged}>{@render children?.()}</div>
{/if}
