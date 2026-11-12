<script lang="ts">
  import type { PartProps } from '../../types.js';

  let { ref = $bindable(null), children, child, ...rest }: PartProps<HTMLParagraphElement> = $props();
  const merged = $derived({ 'data-empty-description': '', ...rest });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <p bind:this={ref} {...merged}>{@render children?.()}</p>
{/if}
