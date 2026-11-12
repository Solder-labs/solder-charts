<script lang="ts">
  import type { PartProps } from '../../types.js';

  let { ref = $bindable(null), children, child, ...rest }: PartProps<HTMLDListElement> = $props();
  const merged = $derived({ 'data-details-table-list': '', ...rest });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <dl bind:this={ref} {...merged}>{@render children?.()}</dl>
{/if}
