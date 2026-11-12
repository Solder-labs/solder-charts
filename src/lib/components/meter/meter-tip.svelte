<script lang="ts">
  import type { PartProps } from '../../types.js';

  let { ref = $bindable(null), children, child, ...rest }: PartProps<HTMLSpanElement> = $props();
  const merged = $derived({ 'data-meter-tip': '', ...rest });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <span bind:this={ref} {...merged}>{@render children?.()}</span>
{/if}
