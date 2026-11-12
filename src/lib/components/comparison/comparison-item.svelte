<script lang="ts">
  import type { PartProps } from '../../types.js';
  import { getComparisonContext } from './context.svelte.js';

  type Props = Omit<PartProps<HTMLDivElement>, 'children'> & {
    of: 'current' | 'previous';
    label?: string;
  };

  let { ref = $bindable(null), of, label, child, ...rest }: Props = $props();
  const ctx = getComparisonContext();
  const merged = $derived({ 'data-comparison-item': '', 'data-of': of, ...rest });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <div bind:this={ref} {...merged}>
    <span data-comparison-label="">{label ?? (of === 'current' ? 'Current' : 'Previous')}</span>
    <span data-comparison-value="">{ctx ? ctx.format(ctx[of]) : ''}</span>
  </div>
{/if}
