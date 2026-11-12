<script lang="ts">
  import type { PartProps } from '../../types.js';
  import { getChartContext } from './context.svelte.js';

  let { ref = $bindable(null), children, child, ...rest }: PartProps<HTMLHeadingElement> = $props();
  const ctx = getChartContext();
  $effect(() => {
    if (!ctx) return;
    ctx.hasTitle = true;
    return () => (ctx.hasTitle = false);
  });
  const merged = $derived({ 'data-chart-title': '', id: ctx?.titleId, ...rest });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <h3 bind:this={ref} {...merged}>{@render children?.()}</h3>
{/if}
