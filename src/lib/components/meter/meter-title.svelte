<script lang="ts">
  import type { PartProps } from '../../types.js';
  import { getMeterContext } from './context.svelte.js';

  let { ref = $bindable(null), children, child, ...rest }: PartProps<HTMLSpanElement> = $props();
  const ctx = getMeterContext();
  $effect(() => {
    if (!ctx) return;
    ctx.hasTitle = true;
    return () => (ctx.hasTitle = false);
  });
  const merged = $derived({ 'data-meter-title': '', id: ctx?.titleId, ...rest });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <span bind:this={ref} {...merged}>{@render children?.()}</span>
{/if}
