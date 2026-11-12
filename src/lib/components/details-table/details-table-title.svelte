<script lang="ts">
  import type { PartProps } from '../../types.js';

  let { ref = $bindable(null), children, child, ...rest }: PartProps<HTMLHeadingElement> = $props();
  const merged = $derived({ 'data-details-table-title': '', ...rest });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <h3 bind:this={ref} {...merged}>{@render children?.()}</h3>
{/if}
