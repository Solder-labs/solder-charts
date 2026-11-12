<script lang="ts">
  import type { PartProps } from '../../types.js';

  let { ref = $bindable(null), children, child, ...rest }: PartProps<HTMLUListElement> = $props();
  const merged = $derived({ 'data-tracker-steps': '', ...rest });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <ul bind:this={ref} {...merged}>{@render children?.()}</ul>
{/if}
