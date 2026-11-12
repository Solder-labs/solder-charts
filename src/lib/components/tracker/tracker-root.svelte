<script lang="ts">
  import type { PartProps } from '../../types.js';

  let { ref = $bindable(null), children, child, ...rest }: PartProps<HTMLOListElement> = $props();
  const merged = $derived({ 'data-tracker-root': '', ...rest });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <ol bind:this={ref} {...merged}>{@render children?.()}</ol>
{/if}
