<script lang="ts">
  import type { PartProps } from '../../types.js';
  import { createChartContext } from './context.svelte.js';

  let { ref = $bindable(null), children, child, ...rest }: PartProps<HTMLDivElement> = $props();

  const uid = $props.id();
  const ctx = createChartContext(uid);

  const merged = $derived({
    'data-chart-root': '',
    role: 'group',
    'aria-labelledby': ctx.hasTitle ? ctx.titleId : undefined,
    ...rest
  });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <div bind:this={ref} {...merged}>{@render children?.()}</div>
{/if}
