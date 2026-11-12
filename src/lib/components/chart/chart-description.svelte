<script lang="ts">
  import type { PartProps } from '../../types.js';
  import { getChartContext } from './context.svelte.js';

  let { ref = $bindable(null), children, child, ...rest }: PartProps<HTMLParagraphElement> = $props();
  const ctx = getChartContext();
  $effect(() => {
    if (!ctx) return;
    ctx.hasDescription = true;
    return () => (ctx.hasDescription = false);
  });
  const merged = $derived({ 'data-chart-description': '', id: ctx?.descriptionId, ...rest });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <p bind:this={ref} {...merged}>{@render children?.()}</p>
{/if}
